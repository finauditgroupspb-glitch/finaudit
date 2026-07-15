import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 5;
const GLOBAL_WINDOW_MS = 60 * 1000;
const MAX_GLOBAL_REQUESTS = 120;
const MIN_FORM_FILL_MS = 1_500;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

type RateEntry = { count: number; resetAt: number };
type RateStore = Map<string, RateEntry>;

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
  topic: string;
  submittedAt: string;
};

const globalState = globalThis as typeof globalThis & {
  __finauditRateStore?: RateStore;
};

const rateStore = globalState.__finauditRateStore ?? new Map<string, RateEntry>();
globalState.__finauditRateStore = rateStore;

function json(body: Record<string, unknown>, status = 200, extraHeaders?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      ...extraHeaders,
    },
  });
}

function cleanExpiredEntries(now: number) {
  if (rateStore.size < 500) return;
  rateStore.forEach((entry, key) => {
    if (entry.resetAt <= now) rateStore.delete(key);
  });
}

function consumeRateLimit(key: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  cleanExpiredEntries(now);
  const current = rateStore.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    rateStore.set(key, { count: 1, resetAt });
    return { allowed: true, retryAfter: Math.ceil(windowMs / 1000) };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

function getClientIp(request: Request) {
  if (process.env.TRUST_PROXY_HEADERS !== "true") return "untrusted-proxy";

  const headers = request.headers;
  const candidate =
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  return candidate.replace(/[^a-fA-F0-9:.,]/g, "").slice(0, 64) || "unknown";
}

function isAllowedOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowedOrigins = new Set<string>([new URL(request.url).origin]);
  for (const value of (process.env.ALLOWED_ORIGINS ?? "").split(",")) {
    const normalized = value.trim().replace(/\/$/, "");
    if (normalized) allowedOrigins.add(normalized);
  }

  return allowedOrigins.has(origin.replace(/\/$/, ""));
}

function sanitize(value: unknown, maxLength: number, multiline = false) {
  if (typeof value !== "string") return "";
  const controls = multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  return value.replace(controls, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function parseAndValidate(input: unknown): { payload?: ContactPayload; bot?: boolean; error?: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "invalid_payload" };

  const data = input as Record<string, unknown>;
  if (sanitize(data.website, 200)) return { bot: true };

  const startedAt = typeof data.formStartedAt === "number" ? data.formStartedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < MIN_FORM_FILL_MS || elapsed > MAX_FORM_AGE_MS) return { bot: true };

  const name = sanitize(data.name, 80);
  const phone = sanitize(data.phone, 32);
  const email = sanitize(data.email, 254).toLowerCase();
  const message = sanitize(data.message, 2_000, true);
  const topic = sanitize(data.topic, 140) || "Общая заявка";
  const consent = data.consent === true;
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.length < 2 || name.length > 80) return { error: "invalid_name" };
  if (phoneDigits.length < 10 || phoneDigits.length > 15) return { error: "invalid_phone" };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "invalid_email" };
  if (!consent) return { error: "consent_required" };

  return {
    payload: {
      name,
      phone,
      email,
      message,
      topic,
      submittedAt: new Date().toISOString(),
    },
  };
}

async function deliver(payload: ContactPayload) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  const webhookToken = process.env.CONTACT_WEBHOOK_TOKEN?.trim();
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (webhookUrl) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6_000);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhookToken ? { Authorization: `Bearer ${webhookToken}` } : {}),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
      return true;
    } finally {
      clearTimeout(timeout);
    }
  }

  if (telegramBotToken && telegramChatId) {
    const text = [
      "Новая заявка с сайта FinAudit Group",
      `Тема: ${payload.topic}`,
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : "",
      payload.message ? `Сообщение: ${payload.message}` : "",
      `Время: ${payload.submittedAt}`,
    ]
      .filter(Boolean)
      .join("\n");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6_000);
    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text, disable_web_page_preview: true }),
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Telegram responded with ${response.status}`);
      return true;
    } finally {
      clearTimeout(timeout);
    }
  }

  return process.env.NODE_ENV !== "production";
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);

    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.startsWith("application/json")) {
      return json({ ok: false, error: "unsupported_media_type" }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: "payload_too_large" }, 413);
    }

    const ip = getClientIp(request);
    const globalLimit = consumeRateLimit("global:contact", MAX_GLOBAL_REQUESTS, GLOBAL_WINDOW_MS);
    const clientLimit = consumeRateLimit(`contact:${ip}`, MAX_REQUESTS_PER_IP, WINDOW_MS);

    if (!globalLimit.allowed || !clientLimit.allowed) {
      const retryAfter = Math.max(globalLimit.retryAfter, clientLimit.retryAfter);
      return json(
        { ok: false, error: "too_many_requests" },
        429,
        { "Retry-After": String(retryAfter) },
      );
    }

    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return json({ ok: false, error: "payload_too_large" }, 413);
    }

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: "bad_request" }, 400);
    }

    const result = parseAndValidate(data);
    if (result.bot) return json({ ok: true });
    if (!result.payload) return json({ ok: false, error: result.error ?? "invalid_payload" }, 400);

    const delivered = await deliver(result.payload);
    if (!delivered) return json({ ok: false, error: "delivery_not_configured" }, 503);

    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "service_unavailable" }, 503);
  }
}

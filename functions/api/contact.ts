// Cloudflare Pages Function: приём заявок с формы сайта.
// Деплоится автоматически вместе с сайтом (папка functions/).
//
// Способы доставки (Cloudflare Pages → Settings → Environment variables),
// работают одновременно — заявка уходит во все настроенные каналы:
//   Почта:    RESEND_API_KEY + CONTACT_EMAIL_TO (куда слать)
//             + опционально CONTACT_EMAIL_FROM (адрес отправителя на своём домене)
//   Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
//   Webhook:  CONTACT_WEBHOOK_URL (+ CONTACT_WEBHOOK_TOKEN)
//   Опционально: ALLOWED_ORIGINS — список разрешённых origin через запятую.
// Без настроенного способа доставки функция честно возвращает ошибку.

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_EMAIL_FROM?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  CONTACT_WEBHOOK_URL?: string;
  CONTACT_WEBHOOK_TOKEN?: string;
  ALLOWED_ORIGINS?: string;
};

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  consent?: boolean;
  topic?: string;
  formStartedAt?: number;
  website?: string;
};

type PagesContext = { request: Request; env: Env };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export const onRequestPost = async ({ request, env }: PagesContext): Promise<Response> => {
  // Защита от отправки с чужих сайтов.
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length > 0 && origin && !allowed.includes(origin)) {
    return json(403, { ok: false, error: "forbidden" });
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return json(400, { ok: false, error: "invalid json" });
  }

  // Honeypot и временная ловушка: ботам отвечаем «успехом», ничего не отправляя.
  const tooFast =
    typeof data.formStartedAt === "number" && Date.now() - data.formStartedAt < 3000;
  if ((data.website ?? "").trim() !== "" || tooFast) {
    return json(200, { ok: true });
  }

  const name = (data.name ?? "").trim().slice(0, 200);
  const phone = (data.phone ?? "").trim().slice(0, 50);
  const email = (data.email ?? "").trim().slice(0, 200);
  const message = (data.message ?? "").trim().slice(0, 4000);
  const topic = (data.topic ?? "Заявка с сайта").trim().slice(0, 200);

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10 || data.consent !== true) {
    return json(400, { ok: false, error: "validation" });
  }

  const text = [
    `🔔 ${topic}`,
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    email ? `Email: ${email}` : null,
    message ? `Задача: ${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // Заявка отправляется во все настроенные каналы; успех — если доставил хотя бы один.
  const deliveries: Promise<boolean>[] = [];

  // Почта через Resend.
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL_TO) {
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = [
      `<h2 style="margin:0 0 16px">${esc(topic)}</h2>`,
      `<p><b>Имя:</b> ${esc(name)}</p>`,
      `<p><b>Телефон:</b> ${esc(phone)}</p>`,
      email ? `<p><b>Email:</b> ${esc(email)}</p>` : "",
      message ? `<p><b>Задача:</b><br>${esc(message).replace(/\n/g, "<br>")}</p>` : "",
    ].join("");
    deliveries.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.CONTACT_EMAIL_FROM ?? "Заявки с сайта <onboarding@resend.dev>",
          to: env.CONTACT_EMAIL_TO.split(",").map((s) => s.trim()),
          reply_to: email || undefined,
          subject: `${topic} — ${name}, ${phone}`,
          html,
          text,
        }),
      }).then((r) => r.ok, () => false)
    );
  }

  // Собственный webhook / CRM.
  if (env.CONTACT_WEBHOOK_URL) {
    deliveries.push(
      fetch(env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(env.CONTACT_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${env.CONTACT_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify({ topic, name, phone, email, message }),
      }).then((r) => r.ok, () => false)
    );
  }

  // Telegram Bot API.
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    deliveries.push(
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
      }).then((r) => r.ok, () => false)
    );
  }

  // Доставка не настроена — не притворяемся, что заявка ушла.
  if (deliveries.length === 0) {
    return json(500, { ok: false, error: "delivery not configured" });
  }

  const results = await Promise.all(deliveries);
  return results.some(Boolean)
    ? json(200, { ok: true })
    : json(502, { ok: false, error: "delivery" });
};

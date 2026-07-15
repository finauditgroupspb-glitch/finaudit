"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<"name" | "phone" | "message" | "consent", string>>;

const inputBase =
  "field w-full rounded-xl border bg-white px-4 py-3.5 text-[0.95rem] text-navy caret-gold placeholder:text-graphite/45 focus:outline-none";

export default function ContactForm({
  compact = false,
  topic,
  dark = false,
}: {
  compact?: boolean;
  topic?: string;
  dark?: boolean;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "", consent: false });
  const [formStartedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");

  const set = (field: keyof typeof values, value: string | boolean) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Укажите имя — так мы поймём, к кому обращаться.";
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Укажите телефон в формате +7 (___) ___-__-__.";
    if (!compact && values.message.trim().length < 10)
      next.message = "Опишите задачу хотя бы в паре предложений.";
    if (!values.consent) next.consent = "Для отправки нужно согласие на обработку данных.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          topic: topic ?? "Общая заявка",
          formStartedAt,
          website,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setState("success");
    } catch {
      setState("error");
    }
  };

  const label = dark ? "text-silver" : "text-navy/80";
  const border = (field: keyof Errors) =>
    errors[field] ? "border-red-400 focus:border-red-500" : "border-navy/15 focus:border-gold";

  if (state === "success") {
    return (
      <div className={`flex flex-col items-center rounded-2xl px-8 py-12 text-center ring-1 ring-gold/25 ${dark ? "bg-white/5" : "bg-mist"}`}>
        <svg className="check-circle h-16 w-16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#B8963E" opacity="0.12" />
          <circle cx="32" cy="32" r="30" stroke="#B8963E" strokeWidth="2" />
          <path className="check-mark" d="M20 33l8 8 16-17" stroke="#B8963E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <p className={`mt-6 text-xl font-extrabold ${dark ? "text-white" : "text-navy"}`}>Заявка отправлена</p>
        <p className={`mt-2 max-w-sm text-[0.92rem] leading-relaxed ${dark ? "text-silver/85" : "text-graphite/80"}`}>
          Мы свяжемся с вами в рабочее время — обычно в течение двух часов. Если вопрос срочный, позвоните или напишите в Telegram.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`website-${topic ?? "g"}`}>Website</label>
        <input
          id={`website-${topic ?? "g"}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`name-${topic ?? "g"}`} className={`mb-1.5 block text-[0.82rem] font-bold ${label}`}>
            Ваше имя
          </label>
          <input
            id={`name-${topic ?? "g"}`}
            type="text"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={`${inputBase} ${border("name")}`}
          />
          {errors.name && <p className="mt-1.5 text-[0.78rem] font-medium text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`phone-${topic ?? "g"}`} className={`mb-1.5 block text-[0.82rem] font-bold ${label}`}>
            Телефон
          </label>
          <input
            id={`phone-${topic ?? "g"}`}
            type="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            className={`${inputBase} ${border("phone")}`}
          />
          {errors.phone && <p className="mt-1.5 text-[0.78rem] font-medium text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`email-${topic ?? "g"}`} className={`mb-1.5 block text-[0.82rem] font-bold ${label}`}>
          Email <span className={dark ? "text-silver/50" : "text-graphite/50"}>(необязательно)</span>
        </label>
        <input
          id={`email-${topic ?? "g"}`}
          type="email"
          autoComplete="email"
          placeholder="name@company.ru"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          className={`${inputBase} border-navy/15 focus:border-gold`}
        />
      </div>

      {!compact && (
        <div>
          <label htmlFor={`message-${topic ?? "g"}`} className={`mb-1.5 block text-[0.82rem] font-bold ${label}`}>
            Опишите задачу
          </label>
          <textarea
            id={`message-${topic ?? "g"}`}
            rows={4}
            placeholder="Например: нужен обязательный аудит за прошлый год, компания на ОСНО, обороты…"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            className={`${inputBase} resize-none ${border("message")}`}
          />
          {errors.message && <p className="mt-1.5 text-[0.78rem] font-medium text-red-500">{errors.message}</p>}
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 h-4.5 w-4.5 accent-[#B8963E]"
        />
        <span className={`text-[0.8rem] leading-relaxed ${dark ? "text-silver/75" : "text-graphite/70"}`}>
          Согласен на обработку персональных данных в соответствии с{" "}
          <a href="/privacy" className="underline decoration-gold/60 underline-offset-2 hover:text-gold">
            политикой конфиденциальности
          </a>
        </span>
      </label>
      {errors.consent && <p className="text-[0.78rem] font-medium text-red-500">{errors.consent}</p>}

      {state === "error" && (
        <div className="anim-shake rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] text-red-600">
          Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую: телефон и Telegram указаны ниже на странице.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        data-magnetic
        className="btn-sheen flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 text-[0.95rem] font-extrabold text-navy-deep shadow-[0_14px_30px_-12px_rgba(184,150,62,0.75)] transition-all hover:-translate-y-0.5 hover:bg-gold-light active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "loading" ? (
          <>
            <svg className="spinner h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Отправляем…
          </>
        ) : (
          "Отправить заявку"
        )}
      </button>
    </form>
  );
}

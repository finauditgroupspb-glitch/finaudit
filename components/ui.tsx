import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Ambient, { type AmbientVariant } from "@/components/fx/Ambient";
import { TelegramIcon } from "@/components/Header";
import { site } from "@/lib/site";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`eyebrow-line text-[0.72rem] font-bold uppercase tracking-caps ${
        light ? "text-gold-light" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

/** Тёмный заголовочный блок внутренних страниц с уникальной фоновой сценографией */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  variant = "aurora",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  variant?: AmbientVariant;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
      <div className="ledger-grid absolute inset-0" aria-hidden="true" />
      <Ambient variant={variant} />
      <div
        data-parallax="0.16"
        className="hero-glow absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(184,150,62,0.22), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        data-parallax="0.08"
        className="absolute -left-44 bottom-[-220px] h-[440px] w-[440px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(18,41,74,0.85), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-5 lg:px-8">
        <div className="hero-up hero-up-1"><Eyebrow light>{eyebrow}</Eyebrow></div>
        <h1 className="hero-up hero-up-2 mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="hero-up hero-up-3 mt-6 max-w-2xl text-lg leading-relaxed text-silver/90">
            {lead}
          </p>
        )}
        {children && <div className="hero-up hero-up-4 mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Финальный призыв к действию с контактами */
export function CTASection({
  title = "Обсудим вашу задачу?",
  text = "Первая консультация бесплатна: разберём ситуацию, предложим формат работы и назовём точную стоимость.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="hairline-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="ledger-grid absolute inset-0" aria-hidden="true" />
      <div
        data-parallax="0.1"
        className="hero-glow-slow absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(184,150,62,0.18), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        data-parallax="0.15"
        className="hero-glow absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(91,127,166,0.22), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-5 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-silver/90">{text}</p>
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.8rem] font-semibold text-silver/85">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-light" />
                </span>
                Отвечаем в рабочее время в течение двух часов
              </div>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-3">
              <Link
                href="/contacts"
                data-magnetic
                className="btn-sheen rounded-full bg-gold px-8 py-4 text-center text-[0.95rem] font-extrabold text-navy-deep shadow-[0_12px_30px_-10px_rgba(184,150,62,0.7)] transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Оставить заявку
              </Link>
              <div className="flex gap-3">
                <a
                  href={site.phoneHref}
                  className="flex-1 rounded-full border border-white/20 px-5 py-3.5 text-center text-[0.88rem] font-bold text-white transition-colors hover:border-gold-light hover:text-gold-light"
                >
                  {site.phone}
                </a>
                <a
                  href={site.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={site.telegramLabel}
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/20 text-white transition-all hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
                >
                  <TelegramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-[1.02rem] leading-relaxed ${light ? "text-silver/90" : "text-graphite/85"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

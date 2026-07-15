"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { TelegramIcon } from "@/components/Header";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-silver">
      <div className="hairline-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="ledger-grid absolute inset-0" aria-hidden="true" />
      <div
        className="hero-glow-slow absolute -left-40 bottom-[-260px] h-[520px] w-[520px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(184,150,62,0.16), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="mx-auto max-w-site px-5 pb-10 pt-16 lg:px-8 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <Link href="/" aria-label="AUDIT D — на главную" className="inline-block transition-transform duration-300 hover:scale-[1.03]">
                <Logo variant="light" />
              </Link>
              <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-silver/80">
                Аудит, бухгалтерия, налоги и право для бизнеса в России и странах СНГ.
                Отвечаем за результат — по договору.
              </p>
            </div>

            <nav aria-label="Услуги">
              <p className="eyebrow-line text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Услуги</p>
              <ul className="mt-5 space-y-3">
                {footerNav.services.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-[0.92rem] text-silver/90 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Компания">
              <p className="eyebrow-line text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Компания</p>
              <ul className="mt-5 space-y-3">
                {footerNav.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-[0.92rem] text-silver/90 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow-line text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Контакты</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <a href={site.phoneHref} className="text-lg font-extrabold text-white transition-colors hover:text-gold-light">
                    {site.phone}
                  </a>
                  <p className="mt-1 text-[0.8rem] text-silver/60">{site.workHours}</p>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="link-underline text-[0.92rem] text-silver/90 transition-colors hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-[0.88rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <TelegramIcon className="h-4 w-4 text-gold-light" />
                    Telegram
                  </a>
                </li>
                <li className="text-[0.88rem] text-silver/70">{site.city}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Обновленный фоновый водяной знак под новый бренд */}
        <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <p className="footer-mark mx-auto max-w-site translate-y-[18%] px-5 lg:px-8 tracking-[0.12em]">AUDIT D</p>
        </div>

        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-[0.82rem] text-silver/60 md:flex-row md:items-center md:justify-between">
            <p>© {year} {site.name}. Все права защищены.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerNav.legal.map((l) => (
                <Link key={l.href} href={l.href} className="link-underline hover:text-silver">
                  {l.label}
                </Link>
              ))}
              <a
                href="#top"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-semibold text-silver/80 transition-all hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
              >
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Наверх
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

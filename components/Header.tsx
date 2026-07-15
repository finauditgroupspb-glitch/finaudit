"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Icon, { serviceIcons } from "@/components/icons";
import { nav, site } from "@/lib/site";

const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinejoin="round" />
  </svg>
);

export const TelegramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.9 4.6 18.8 19c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6L18 6.9c.4-.3-.1-.5-.6-.2L7 13.2l-4.5-1.4c-1-.3-1-1 .2-1.4l17.7-6.8c.8-.3 1.6.2 1.5 1z" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Прозрачный хедер поверх тёмного hero — только на главной до прокрутки
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const services = nav.find((n) => n.children)?.children ?? [];

  const shell = overHero
    ? "bg-transparent"
    : "header-glass header-hairline shadow-[0_8px_32px_-16px_rgba(11,29,51,0.18)]";
  const linkTone = overHero ? "text-white/85 hover:text-white" : "text-navy/80 hover:text-navy";
  const activeTone = overHero ? "text-white" : "text-navy";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${shell}`}>
      <div className="mx-auto flex h-[76px] max-w-site items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" aria-label="AUDIT D — на главную" className="group shrink-0 transition-transform duration-300 hover:scale-[1.03]">
          <Logo variant={overHero ? "light" : "dark"} />
        </Link>

        {/* Десктопная навигация */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Основная навигация">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`nav-link flex items-center gap-1.5 text-[0.92rem] font-semibold transition-colors ${
                    pathname.startsWith("/services") ? `is-active ${activeTone}` : linkTone
                  }`}
                  aria-expanded={servicesOpen}
                >
                  {item.label}
                  <svg className={`h-3 w-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Мега-меню услуг */}
                <div
                  className={`menu-panel absolute left-1/2 top-full w-[580px] -translate-x-1/2 pt-4 transition-all duration-300 ${
                    servicesOpen
                      ? "menu-open visible translate-y-0 scale-100 opacity-100"
                      : "invisible -translate-y-1.5 scale-[0.985] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl bg-white/95 shadow-lift ring-1 ring-navy/5 backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {item.children.map((child, i) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="menu-item group flex gap-3.5 rounded-xl p-4 transition-colors hover:bg-mist"
                          style={{ "--i": i } as React.CSSProperties}
                        >
                          <span className="icon-badge mt-0.5 h-10 w-10 shrink-0 bg-gold-pale/70 text-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(184,150,62,0.6)]">
                            <Icon name={serviceIcons[child.href.split("/").pop() ?? ""] ?? "audit"} className="icon-drawn h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-[0.92rem] font-bold text-navy">{child.label}</span>
                            <span className="mt-1 block text-[0.8rem] leading-snug text-graphite/75">{child.note}</span>
                          </span>
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        className="menu-item btn-sheen col-span-2 flex items-center justify-between rounded-xl bg-navy px-5 py-4 text-[0.9rem] font-semibold text-white transition-colors hover:bg-navy-soft"
                        style={{ "--i": 5 } as React.CSSProperties}
                      >
                        Все услуги и форматы работы
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-[0.92rem] font-semibold transition-colors ${
                  pathname === item.href ? `is-active ${activeTone}` : linkTone
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Контакты + CTA */}
        <div className="hidden items-center gap-5 xl:flex">
          <a
            href={site.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.telegramLabel}
            className={`transition-all duration-300 hover:-translate-y-0.5 ${overHero ? "text-white/85 hover:text-gold-light" : "text-navy/70 hover:text-gold"}`}
          >
            <TelegramIcon className="h-5 w-5" />
          </a>
          <a
            href={site.phoneHref}
            className={`flex items-center gap-2 text-[0.92rem] font-bold tabular-nums transition-colors ${
              overHero ? "text-white hover:text-gold-light" : "text-navy hover:text-gold"
            }`}
          >
            <PhoneIcon />
            {site.phone}
          </a>
          <Link
            href="/contacts"
            data-magnetic
            className={`btn-sheen rounded-full px-5 py-2.5 text-[0.88rem] font-bold transition-all duration-300 ${
              overHero
                ? "bg-white text-navy hover:bg-gold-light hover:text-navy"
                : "bg-navy text-white shadow-[0_10px_24px_-10px_rgba(11,29,51,0.6)] hover:bg-navy-soft"
            }`}
          >
            Получить консультацию
          </Link>
        </div>

        {/* Кнопка мобильного меню */}
        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors xl:hidden ${
            overHero ? "text-white" : "text-navy"
          }`}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 top-[76px] z-40 overflow-y-auto bg-navy-deep/95 backdrop-blur-xl transition-opacity duration-300 xl:hidden ${
          mobileOpen ? "mobile-open opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="ledger-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <nav className="relative px-6 py-8" aria-label="Мобильная навигация">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="mobile-item" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-4 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/5"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-4 space-y-0.5 border-l border-white/10 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-[0.95rem] text-silver transition-colors hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-item mt-8 space-y-3 border-t border-white/10 pt-8" style={{ "--i": nav.length } as React.CSSProperties}>
            <a href={site.phoneHref} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3.5 font-bold text-white transition-colors hover:bg-white/10">
              <PhoneIcon className="h-5 w-5 text-gold-light" />
              {site.phone}
            </a>
            <a
              href={site.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
            >
              <TelegramIcon className="h-5 w-5 text-gold-light" />
              Telegram
            </a>
            <a href={`mailto:${site.email}`} className="block px-4 text-[0.9rem] text-silver">
              {site.email}
            </a>
            <Link
              href="/contacts"
              className="btn-sheen mt-4 block rounded-full bg-gold px-6 py-3.5 text-center font-bold text-navy-deep transition-colors hover:bg-gold-light"
            >
              Получить консультацию
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

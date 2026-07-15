"use client";

import { useState } from "react";
import { TelegramIcon } from "@/components/Header";
import { site } from "@/lib/site";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 lg:bottom-8 lg:right-8">
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <a
          href={site.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ transitionDelay: open ? "60ms" : "0ms" }}
          className="btn-sheen flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-4 pr-5 text-[0.88rem] font-bold text-navy shadow-lift ring-1 ring-navy/5 transition-all hover:-translate-y-0.5 hover:ring-gold/40"
        >
          <TelegramIcon className="h-4 w-4 text-[#2AABEE]" />
          Написать в Telegram
        </a>
        <a
          href={site.phoneHref}
          style={{ transitionDelay: open ? "120ms" : "0ms" }}
          className="btn-sheen flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-4 pr-5 text-[0.88rem] font-bold text-navy shadow-lift ring-1 ring-navy/5 transition-all hover:-translate-y-0.5 hover:ring-gold/40"
        >
          <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinejoin="round" />
          </svg>
          {site.phone}
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Скрыть контакты" : "Связаться с нами"}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-soft text-white shadow-lift ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:ring-gold/50 ${
          open ? "" : "fab-ping"
        }`}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12z" strokeLinejoin="round" />
            <circle cx="9" cy="12" r="0.5" fill="currentColor" />
            <circle cx="13" cy="12" r="0.5" fill="currentColor" />
            <circle cx="17" cy="12" r="0.5" fill="currentColor" />
          </svg>
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}

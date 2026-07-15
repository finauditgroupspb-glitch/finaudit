"use client";

import { useEffect } from "react";

/**
 * Премиальный экран загрузки: монограмма F+A с золотой диагональю,
 * линия прогресса и подпись. Показывается один раз за сессию
 * (атрибут data-intro ставит инлайн-скрипт в <head> до первой отрисовки),
 * длится ~1,7 с и уступает место контенту. При prefers-reduced-motion не показывается.
 */
export default function Preloader() {
  useEffect(() => {
    const t = window.setTimeout(() => {
      document.documentElement.removeAttribute("data-intro");
    }, 1900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="preloader" aria-hidden="true">
      <div className="flex flex-col items-center">
        <svg className="preloader-mark" width="72" height="72" viewBox="0 0 48 48" fill="none">
          <rect x="9" y="6" width="5" height="36" fill="#FFFFFF" />
          <rect x="9" y="6" width="27" height="5" fill="#FFFFFF" />
          <rect x="31" y="6" width="5" height="11" fill="#FFFFFF" opacity="0.45" />
          <path className="preloader-diag" d="M9 37.5 L33.5 15 L37 18.8 L12.5 41.3 Z" fill="#B8963E" />
        </svg>
        <div className="preloader-bar" />
        <p className="preloader-word">FinAudit Group</p>
      </div>
    </div>
  );
}

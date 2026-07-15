"use client";

import { useEffect } from "react";
import Logo from "@/components/Logo";

/**
 * Премиальный экран загрузки:
 * Показывает логотип, убирает атрибут data-intro через 1.9с.
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
        {/* Масштабируем логотип через класс, без передачи параметра size */}
        <div className="mb-6 scale-110">
          <Logo variant="light" />
        </div>
        
        <div className="preloader-bar" />
        <p className="preloader-word">AUDIT D</p>
      </div>
    </div>
  );
}

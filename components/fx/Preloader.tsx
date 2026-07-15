"use client";

import { useEffect } from "react";
import Logo from "@/components/Logo"; // Импортируем ваш новый компонент логотипа

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
        {/* Заменили старый SVG на новый компонент Logo */}
        <div className="mb-6 scale-110">
          <Logo variant="light" size={72} />
        </div>
        
        <div className="preloader-bar" />
        <p className="preloader-word">AUDIT D</p>
      </div>
    </div>
  );
}

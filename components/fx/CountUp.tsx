"use client";

import { useEffect, useRef } from "react";

/**
 * Анимированный счётчик: разбирает строку вида «300+», «98%», «12»,
 * плавно доводит число до значения при появлении в зоне видимости.
 * При prefers-reduced-motion сразу показывает финальное значение.
 */
export default function CountUp({
  value,
  duration = 1700,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const match = value.match(/^([^\d]*)(\d[\d\s]*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2].replace(/\s/g, ""), 10) : NaN;
  const suffix = match?.[3] ?? "";
  const format = (n: number) => n.toLocaleString("ru-RU").replace(/,/g, " ");

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(target);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (Number.isNaN(target)) return <span className={className}>{value}</span>;

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

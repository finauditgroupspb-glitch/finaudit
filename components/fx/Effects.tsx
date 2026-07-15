"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Глобальный слой премиальных микровзаимодействий:
 * — курсор-аура (только точный указатель);
 * — золотая полоса прогресса скролла;
 * — spotlight-подсветка карточек (.spot) вслед за мышью;
 * — лёгкий 3D-наклон карточек [data-tilt];
 * — «магнитные» кнопки [data-magnetic];
 * — мягкий параллакс декора [data-parallax].
 * Всё отключается при prefers-reduced-motion и на сенсорных устройствах.
 */
export default function Effects() {
  const pathname = usePathname();
  const auraRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const aura = auraRef.current;
    const bar = barRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ax = mx;
    let ay = my;
    let auraRaf = 0;
    let auraOn = false;

    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

    /* ——— Параллакс декоративных элементов ——— */
    let parallaxEls: { el: HTMLElement; speed: number }[] = [];
    const collectParallax = () => {
      parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map(
        (el) => ({ el, speed: parseFloat(el.dataset.parallax || "0.12") })
      );
    };

    let scrollRaf = 0;
    const onScrollFrame = () => {
      scrollRaf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      if (!reduced) {
        const vh = window.innerHeight;
        for (const { el, speed } of parallaxEls) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -160 || r.top > vh + 160) continue;
          const delta = r.top + r.height / 2 - vh / 2;
          el.style.transform = `translate3d(0, ${(-delta * speed).toFixed(1)}px, 0)`;
        }
      }
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(onScrollFrame);
    };

    /* ——— Курсор-аура ——— */
    const auraFrame = () => {
      ax += (mx - ax) * 0.22;
      ay += (my - ay) * 0.22;
      if (aura) aura.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0)`;
      auraRaf = requestAnimationFrame(auraFrame);
    };

    const resetTilt = () => {
      if (tiltEl) {
        tiltEl.style.transform = "";
        tiltEl = null;
      }
    };
    const resetMag = () => {
      if (magEl) {
        magEl.style.transform = "";
        magEl = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as Element | null;
      if (!target) return;

      if (aura && fine && !reduced) {
        if (!auraOn) {
          auraOn = true;
          aura.classList.add("is-on");
        }
        const interactive = target.closest(
          "a, button, [role='button'], summary, input, textarea, select, [data-magnetic]"
        );
        aura.classList.toggle("is-link", !!interactive);
      }

      /* spotlight: координаты курсора внутри карточки */
      const spot = target.closest<HTMLElement>(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
        spot.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
      }

      if (fine && !reduced) {
        /* наклон карточек */
        const tilt = target.closest<HTMLElement>("[data-tilt]");
        if (tilt !== tiltEl) resetTilt();
        if (tilt) {
          tiltEl = tilt;
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          const max = parseFloat(tilt.dataset.tilt || "6");
          tilt.style.transform = `perspective(950px) rotateX(${(-py * max).toFixed(
            2
          )}deg) rotateY(${(px * max * 1.15).toFixed(2)}deg) translateY(-4px)`;
        }

        /* магнитные кнопки */
        const mag = target.closest<HTMLElement>("[data-magnetic]");
        if (mag !== magEl) resetMag();
        if (mag) {
          magEl = mag;
          const r = mag.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          mag.style.transform = `translate(${(px * 10).toFixed(1)}px, ${(py * 8).toFixed(1)}px)`;
        }
      }
    };

    const onLeaveWindow = () => {
      auraOn = false;
      aura?.classList.remove("is-on");
      resetTilt();
      resetMag();
    };
    const onDown = () => aura?.classList.add("is-down");
    const onUp = () => aura?.classList.remove("is-down");

    collectParallax();
    onScrollFrame();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    if (fine && !reduced) auraRaf = requestAnimationFrame(auraFrame);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      if (auraRaf) cancelAnimationFrame(auraRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
    // Пересобираем список параллакс-элементов при смене маршрута
  }, [pathname]);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
    </>
  );
}

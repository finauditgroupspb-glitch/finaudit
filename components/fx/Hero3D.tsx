"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Обёртка 3D-сцены: three.js подгружается лениво (после idle),
 * до готовности сцены показан статичный «постер» — силуэт башни в SVG.
 * Если WebGL недоступен, постер остаётся финальным изображением.
 */
export default function Hero3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let idle = 0;
    let timer = 0;
    const start = () => setMounted(true);
    if (typeof w.requestIdleCallback === "function") {
      idle = w.requestIdleCallback(start, { timeout: 1400 });
    } else {
      timer = w.setTimeout(start, 400);
    }
    return () => {
      if (idle && typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idle);
      if (timer) w.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`scene-wrap ${ready ? "scene-ready" : ""} ${className}`} aria-hidden="true">
      {/* Статичный постер: башня, кольцо, восходящие линии */}
      <div className="scene-poster absolute inset-0 flex items-end justify-center">
        <svg viewBox="0 0 400 520" className="h-[92%] w-auto max-w-full" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="hp-glass" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#12294A" stopOpacity="0.9" />
              <stop offset="1" stopColor="#0B1D33" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="hp-gold" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#B8963E" />
              <stop offset="1" stopColor="#D7BC72" />
            </linearGradient>
            <radialGradient id="hp-halo" cx="0.5" cy="0.32" r="0.55">
              <stop offset="0" stopColor="#D7BC72" stopOpacity="0.28" />
              <stop offset="1" stopColor="#D7BC72" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="200" cy="180" rx="190" ry="170" fill="url(#hp-halo)" />

          {/* сегменты башни */}
          <g stroke="url(#hp-gold)" strokeOpacity="0.75" strokeWidth="1.2">
            <rect x="130" y="300" width="140" height="180" fill="url(#hp-glass)" />
            <rect x="145" y="185" width="110" height="115" fill="url(#hp-glass)" />
            <rect x="160" y="95" width="80" height="90" fill="url(#hp-glass)" />
            <rect x="178" y="42" width="44" height="53" fill="url(#hp-glass)" />
          </g>
          <line x1="200" y1="42" x2="200" y2="6" stroke="#F3EBD6" strokeWidth="1.4" strokeOpacity="0.9" />
          <circle cx="200" cy="6" r="3" fill="#D7BC72" />

          {/* окна */}
          <g fill="#D7BC72">
            <rect x="150" y="330" width="9" height="12" opacity="0.85" />
            <rect x="186" y="368" width="9" height="12" opacity="0.5" />
            <rect x="238" y="330" width="9" height="12" opacity="0.7" />
            <rect x="222" y="424" width="9" height="12" opacity="0.85" />
            <rect x="160" y="408" width="9" height="12" opacity="0.45" />
            <rect x="163" y="212" width="8" height="11" opacity="0.8" />
            <rect x="214" y="248" width="8" height="11" opacity="0.55" />
            <rect x="176" y="118" width="7" height="10" opacity="0.8" />
            <rect x="212" y="150" width="7" height="10" opacity="0.5" />
            <rect x="190" y="60" width="6" height="9" opacity="0.85" />
          </g>
          <g fill="#C4CDD8" opacity="0.5">
            <rect x="168" y="352" width="9" height="12" />
            <rect x="204" y="390" width="9" height="12" />
            <rect x="232" y="224" width="8" height="11" />
            <rect x="194" y="132" width="7" height="10" />
          </g>

          {/* сканирующая линия */}
          <rect className="poster-scan" x="130" y="90" width="140" height="2" fill="#D7BC72" opacity="0.5" />

          {/* кольцо основания */}
          <ellipse cx="200" cy="486" rx="150" ry="26" stroke="#B8963E" strokeOpacity="0.55" strokeWidth="1.4" />
          <ellipse cx="200" cy="486" rx="102" ry="17" stroke="#C4CDD8" strokeOpacity="0.2" strokeWidth="1" />

          {/* парящие документы */}
          <g className="float-a">
            <rect x="64" y="236" width="42" height="54" rx="3" fill="#F7F9FC" stroke="#B8963E" strokeWidth="1.3" transform="rotate(-8 85 263)" />
            <line x1="74" y1="252" x2="98" y2="249" stroke="#C9D3DE" strokeWidth="2.4" />
            <line x1="75" y1="261" x2="99" y2="258" stroke="#C9D3DE" strokeWidth="2.4" />
            <line x1="76" y1="270" x2="92" y2="268" stroke="#B8963E" strokeWidth="2.4" />
          </g>
          <g className="float-b">
            <rect x="300" y="150" width="40" height="52" rx="3" fill="#F7F9FC" stroke="#B8963E" strokeWidth="1.3" transform="rotate(7 320 176)" />
            <line x1="309" y1="168" x2="331" y2="171" stroke="#C9D3DE" strokeWidth="2.4" />
            <line x1="308" y1="177" x2="330" y2="180" stroke="#C9D3DE" strokeWidth="2.4" />
            <circle cx="327" cy="192" r="6" stroke="#B8963E" strokeWidth="1.6" fill="none" />
          </g>
          <g className="float-c">
            <rect x="296" y="340" width="44" height="56" rx="3" fill="#F7F9FC" stroke="#B8963E" strokeWidth="1.3" transform="rotate(-6 318 368)" />
            <line x1="306" y1="358" x2="330" y2="356" stroke="#C9D3DE" strokeWidth="2.4" />
            <line x1="307" y1="367" x2="331" y2="365" stroke="#C9D3DE" strokeWidth="2.4" />
            <path d="M306 384 q6 -8 11 0 t11 0" stroke="#0B1D33" strokeWidth="1.6" fill="none" />
          </g>
        </svg>
      </div>

      {mounted && <HeroScene onReady={() => setReady(true)} />}
    </div>
  );
}

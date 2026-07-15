/**
 * Уникальная фоновая сценография для каждой страницы.
 * Серверный компонент: чистый SVG + CSS-анимации, ноль JavaScript.
 * Варианты: orbits (о компании), beams (услуги), ledger (кейсы),
 * topo (отрасли), aurora (блог), constellation (вакансии),
 * signal (контакты), weave (FAQ), calm (юридические страницы).
 */

export type AmbientVariant =
  | "orbits"
  | "beams"
  | "ledger"
  | "topo"
  | "aurora"
  | "constellation"
  | "signal"
  | "weave"
  | "calm";

/* Детерминированная псевдослучайность — одинакова на сервере и клиенте */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function Particles({ count = 12, seed = 1 }: { count?: number; seed?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const r = (k: number) => rand(seed * 100 + i * 7 + k);
        const size = 2 + r(1) * 4;
        return (
          <span
            key={i}
            className={`pt ${r(5) > 0.6 ? "pt-silver" : ""}`}
            style={{
              left: `${(r(2) * 96 + 2).toFixed(1)}%`,
              width: size,
              height: size,
              ["--d" as string]: `${(9 + r(3) * 12).toFixed(1)}s`,
              ["--dl" as string]: `${(r(4) * 10).toFixed(1)}s`,
              ["--x" as string]: `${((r(6) - 0.5) * 90).toFixed(0)}px`,
              ["--o" as string]: (0.35 + r(7) * 0.45).toFixed(2),
            }}
          />
        );
      })}
    </>
  );
}

function Orbits() {
  return (
    <>
      {[420, 620, 860].map((size, i) => (
        <span
          key={size}
          className="amb-orbit"
          style={{
            width: size,
            height: size,
            right: -size / 3,
            top: `calc(50% - ${size / 2}px)`,
            ["--d" as string]: `${46 + i * 22}s`,
            animationDirection: i === 1 ? "reverse" : undefined,
            borderColor: i === 1 ? "rgba(196,205,216,0.12)" : undefined,
          }}
        >
          {i !== 1 && <i />}
        </span>
      ))}
    </>
  );
}

function Beams() {
  return (
    <>
      {[12, 38, 68, 88].map((left, i) => (
        <span
          key={left}
          className="amb-beam"
          style={{
            left: `${left}%`,
            width: 90 + i * 30,
            ["--d" as string]: `${10 + i * 3}s`,
            ["--dl" as string]: `${i * 1.4}s`,
            opacity: 0.8 - i * 0.12,
          }}
        />
      ))}
    </>
  );
}

function Ledger() {
  return (
    <>
      {[18, 41, 63, 84].map((top, i) => (
        <span
          key={`h${top}`}
          className="amb-run"
          style={{
            top: `${top}%`,
            ["--d" as string]: `${8 + i * 2.4}s`,
            ["--dl" as string]: `${i * 2.1}s`,
          }}
        />
      ))}
      {[24, 58, 82].map((left, i) => (
        <span
          key={`v${left}`}
          className="amb-run-v"
          style={{
            left: `${left}%`,
            ["--d" as string]: `${10 + i * 3}s`,
            ["--dl" as string]: `${1.2 + i * 2.6}s`,
          }}
        />
      ))}
    </>
  );
}

function Topo() {
  return (
    <svg viewBox="0 0 1440 620" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          className="amb-wave-path"
          style={{ ["--dl" as string]: `${i * 1.3}s` }}
          d={`M-60 ${420 + i * 52} C 240 ${350 + i * 46}, 480 ${480 + i * 40}, 760 ${400 + i * 48} S 1240 ${330 + i * 52}, 1520 ${430 + i * 44}`}
          fill="none"
          stroke={i % 2 ? "rgba(196,205,216,0.1)" : "rgba(215,188,114,0.16)"}
          strokeWidth={i === 0 ? 1.4 : 1}
        />
      ))}
      <circle cx="1080" cy="392" r="4" fill="#D7BC72" className="amb-twinkle" />
      <circle cx="420" cy="452" r="3" fill="#C4CDD8" className="amb-twinkle" style={{ ["--dl" as string]: "1.6s" }} />
    </svg>
  );
}

function Aurora() {
  return (
    <>
      <span
        className="hero-glow absolute -left-32 top-6 h-[420px] w-[520px] rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(91,127,166,0.28), transparent 70%)", filter: "blur(10px)" }}
      />
      <span
        className="hero-glow-slow absolute right-[8%] top-[30%] h-[360px] w-[460px] rounded-full opacity-80"
        style={{ background: "radial-gradient(closest-side, rgba(184,150,62,0.24), transparent 70%)", filter: "blur(12px)" }}
      />
      <span
        className="hero-glow absolute bottom-[-30%] left-[35%] h-[380px] w-[560px] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(18,41,74,0.9), transparent 70%)", filter: "blur(8px)", animationDelay: "-6s" }}
      />
    </>
  );
}

function Constellation() {
  const stars = Array.from({ length: 14 }, (_, i) => ({
    x: 60 + rand(i * 3 + 1) * 1320,
    y: 60 + rand(i * 3 + 2) * 460,
    r: 1.4 + rand(i * 3 + 3) * 2.2,
  }));
  const links = [
    [0, 3], [3, 7], [7, 11], [2, 5], [5, 9], [9, 13], [1, 6], [6, 10],
  ];
  return (
    <svg viewBox="0 0 1440 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a].x}
          y1={stars[a].y}
          x2={stars[b].x}
          y2={stars[b].y}
          stroke="rgba(196,205,216,0.14)"
          strokeWidth="1"
          className="amb-dash"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={i % 3 ? "#C4CDD8" : "#D7BC72"}
          className="amb-twinkle"
          style={{ ["--dl" as string]: `${(i * 0.4).toFixed(1)}s` }}
        />
      ))}
    </svg>
  );
}

function Signal() {
  return (
    <svg viewBox="0 0 1440 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="1180"
            cy="230"
            r="130"
            fill="none"
            stroke="rgba(215,188,114,0.4)"
            strokeWidth="1.2"
            className="amb-pulse-c"
            style={{ ["--dl" as string]: `${i * 1.15}s` }}
          />
        ))}
        <circle cx="1180" cy="230" r="5" fill="#D7BC72" />
        <circle cx="1180" cy="230" r="34" fill="none" stroke="rgba(215,188,114,0.35)" strokeWidth="1" />
      </g>
      <line x1="0" y1="230" x2="1440" y2="230" stroke="rgba(196,205,216,0.08)" strokeWidth="1" className="amb-dash" />
      <line x1="1180" y1="0" x2="1180" y2="580" stroke="rgba(196,205,216,0.08)" strokeWidth="1" className="amb-dash" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}

function Weave() {
  return (
    <svg viewBox="0 0 1440 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`a${i}`}
          x1={-100 + i * 340}
          y1="620"
          x2={260 + i * 340}
          y2="-40"
          stroke="rgba(215,188,114,0.1)"
          strokeWidth="1"
          className="amb-dash"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`b${i}`}
          x1={140 + i * 380}
          y1="-40"
          x2={-220 + i * 380}
          y2="620"
          stroke="rgba(196,205,216,0.08)"
          strokeWidth="1"
        />
      ))}
      {[
        [402, 262], [742, 262], [1082, 262], [572, 585 - 262],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#D7BC72" className="amb-twinkle" style={{ ["--dl" as string]: `${i * 0.9}s` }} />
      ))}
    </svg>
  );
}

export default function Ambient({ variant = "aurora" }: { variant?: AmbientVariant }) {
  return (
    <div className="amb" aria-hidden="true">
      {variant === "orbits" && <Orbits />}
      {variant === "beams" && <Beams />}
      {variant === "ledger" && <Ledger />}
      {variant === "topo" && <Topo />}
      {variant === "aurora" && <Aurora />}
      {variant === "constellation" && <Constellation />}
      {variant === "signal" && <Signal />}
      {variant === "weave" && <Weave />}
      {variant !== "calm" && <Particles count={variant === "aurora" ? 14 : 10} seed={variant.length} />}
    </div>
  );
}

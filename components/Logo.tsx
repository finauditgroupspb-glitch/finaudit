type LogoProps = {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

/**
 * Фирменный знак FinAudit Group.
 * Монограмма построена на пересечении букв F и A:
 * вертикаль и верхняя перекладина образуют F,
 * золотая восходящая диагональ — перекладину A и вектор роста.
 */
export function LogoMark({
  tone = "light",
  size = 40,
}: {
  tone?: "light" | "dark";
  size?: number;
}) {
  const primary = tone === "light" ? "#FFFFFF" : "#0B1D33";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="9" y="6" width="5" height="36" fill={primary} />
      <rect x="9" y="6" width="27" height="5" fill={primary} />
      <path d="M9 37.5 L33.5 15 L37 18.8 L12.5 41.3 Z" fill="#B8963E" />
      <rect x="31" y="6" width="5" height="11" fill={primary} opacity="0.45" />
    </svg>
  );
}

export default function Logo({ variant = "dark", compact = false, className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-navy";
  const sub = variant === "light" ? "text-silver/80" : "text-graphite/70";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark tone={variant === "light" ? "light" : "dark"} size={compact ? 32 : 38} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`text-[1.15rem] font-extrabold tracking-tight ${text}`}>
            FinAudit
          </span>
          <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-caps ${sub}`}>
            Group
          </span>
        </span>
      )}
    </span>
  );
}

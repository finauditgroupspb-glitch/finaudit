type LogoProps = {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

/**
 * Фирменный знак AUDIT D.
 * Минималистичный график роста показателей и аудита.
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
      {/* Сетка графика на фоне */}
      <rect x="6" y="38" width="36" height="2" rx="1" fill={primary} opacity="0.3" />
      <rect x="6" y="10" width="2" height="30" rx="1" fill={primary} opacity="0.3" />
      
      {/* Столбцы показателей */}
      <rect x="12" y="26" width="4" height="12" rx="1" fill={primary} />
      <rect x="20" y="18" width="4" height="20" rx="1" fill={primary} />
      <rect x="28" y="12" width="4" height="26" rx="1" fill="#B8963E" />
      
      {/* Стрелка роста вверх */}
      <path d="M14 28L22 16L30 10L38 15" stroke="#B8963E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 10H38V16" stroke="#B8963E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
            AUDIT D
          </span>
          <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-caps ${sub}`}>
            ООО
          </span>
        </span>
      )}
    </span>
  );
}

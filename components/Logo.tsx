type LogoProps = {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

/**
 * Премиальный фирменный знак AUDIT D.
 * Идеальная геометрическая буква D с лаконичным внутренним золотым графиком,
 * символизирующим точность финансового аудита и непрерывный рост.
 */
export function LogoMark({
  tone = "light",
  size = 40,
}: {
  tone?: "light" | "dark";
  size?: number;
}) {
  const primary = tone === "light" ? "#FFFFFF" : "#0B1D33";
  const accent = "#B8963E";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Идеальный внешний контур буквы D */}
      <path 
        d="M12 9H24C32.2843 9 39 15.7157 39 24C39 32.2843 32.2843 39 24 39H12V9Z" 
        stroke={primary} 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* Три чистых столбика графика внутри, растущие слева направо */}
      {/* Первый столбик (основной цвет) */}
      <rect x="17" y="25" width="3" height="7" rx="1" fill={primary} />
      
      {/* Второй столбик (основной цвет, повыше) */}
      <rect x="22" y="21" width="3" height="11" rx="1" fill={primary} />
      
      {/* Третий столбик (золотой акцентный, самый высокий — пик роста) */}
      <rect x="27" y="16" width="3" height="16" rx="1" fill={accent} />
    </svg>
  );
}

export default function Logo({ variant = "dark", compact = false, className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-navy";
  const sub = variant === "light" ? "text-silver/80" : "text-graphite/70";

  return (
    <span className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Логознак */}
      <LogoMark tone={variant === "light" ? "light" : "dark"} size={compact ? 34 : 40} />
      
      {/* Текстовая часть */}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`text-[1.25rem] font-black tracking-tight ${text}`}>
            AUDIT <span className="text-[#B8963E]">D</span> {/* Стильная золотая D */}
          </span>
          <span className={`mt-1.5 text-[0.65rem] font-bold uppercase tracking-caps ${sub}`}>
            ООО
          </span>
        </span>
      )}
    </span>
  );
}

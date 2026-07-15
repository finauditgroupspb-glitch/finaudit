type LogoProps = {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

/**
 * Фирменный знак AUDIT D.
 * Концепция «Перспектива Аудита»: стилизованная буква «D» с вектором роста,
 * символизирующая точность, движение вперед и экспертность.
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
      {/* 3D-эффект / Тень для придания объема (опционально, для крутости) */}
      <defs>
        <linearGradient id="markShadow" x1="24" y1="12" x2="24" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0.8" stopColor={primary} />
          <stop offset="1" stopColor={primary} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Основной контур буквы «D» */}
      <path 
        d="M10 12C10 9.79086 11.7909 8 14 8H28C36.8366 8 44 15.1634 44 24C44 32.8366 36.8366 40 28 40H14C11.7909 40 10 38.2091 10 36V12Z" 
        stroke={primary} 
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Переплетение / Вертикальный элемент */}
      <path 
        d="M10 12L10 36" 
        stroke={primary} 
        strokeWidth="3.5" 
        strokeLinecap="round"
      />

      {/* Золотой акцент: Вектор роста, переходящий в стрелку */}
      <path 
        d="M18 36L18 12C18 12 18 8 22 8M32 20V8H20" 
        stroke={accent} 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Деталь стрелки (самая вершина роста) */}
      <path 
        d="M32 8L36 12" 
        stroke={accent} 
        strokeWidth="3.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ variant = "dark", compact = false, className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-navy";
  const sub = variant === "light" ? "text-silver/80" : "text-graphite/70";
  const accentText = variant === "light" ? "text-gold" : "text-gold"; // Золотой текст для контраста

  return (
    <span className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Логознак */}
      <LogoMark tone={variant === "light" ? "light" : "dark"} size={compact ? 34 : 40} />
      
      {/* Текстовая часть (если не компактная версия) */}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`text-[1.25rem] font-black tracking-tighter ${text}`}>
            AUDIT <span className="text-gold">D</span> {/* Золотая «D» в тексте! */}
          </span>
          <span className={`mt-1.5 text-[0.65rem] font-bold uppercase tracking-caps ${sub}`}>
            ООО
          </span>
        </span>
      )}
    </span>
  );
}

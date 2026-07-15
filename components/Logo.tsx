type LogoProps = {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

/**
 * Фирменный знак AUDIT D.
 * Высокохудожественная монограмма "AD": 
 * Изящная классическая "A" с засечками и переплетенная с ней золотая "D".
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Буква "A" (классическая, с тонкими и толстыми линиями и засечками) */}
      <g>
        {/* Левый тонкий штрих А */}
        <path
          d="M 40 75 L 53 31"
          stroke={primary}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Правый мощный штрих А (с расширением книзу) */}
        <path
          d="M 51.5 29 L 66.5 73.5"
          stroke={primary}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        {/* Горизонтальный перешеек А */}
        <path
          d="M 43.5 61 H 58.5"
          stroke={primary}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Нижняя левая засечка А */}
        <path
          d="M 35 75 H 45"
          stroke={primary}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Нижняя правая засечка А */}
        <path
          d="M 60 75 H 72"
          stroke={primary}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Верхняя засечка А */}
        <path
          d="M 48 31 H 55"
          stroke={primary}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Золотая буква "D" (изящная округлая арка, переплетающаяся с А) */}
      <path
        d="M 52.5 35 C 57 35 78 35 78 54.5 C 78 71.5 59.5 74.5 54.5 74.5"
        stroke={accent}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Верхний декоративный хвостик D */}
      <path
        d="M 48 37 C 50 35.5 53 35 56 35"
        stroke={accent}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ variant = "dark", compact = false, className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-[#0B1D33]";
  const sub = variant === "light" ? "text-silver/80" : "text-[#B8963E]";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Логознак (монограмма AD) */}
      <LogoMark tone={variant === "light" ? "light" : "dark"} size={compact ? 44 : 54} />
      
      {/* Текстовая часть */}
      {!compact && (
        <span className="flex flex-col justify-center select-none" style={{ fontFamily: 'Georgia, serif' }}>
          {/* Главное название (Элегантный serif-шрифт) */}
          <span className={`text-[1.35rem] font-medium tracking-[0.05em] leading-tight ${text}`}>
            AUDIT <span className="text-[#B8963E]">D</span>
          </span>
          {/* Подзаголовок (Золотой, с большим межбуквенным интервалом) */}
          <span className={`text-[0.55rem] font-semibold uppercase tracking-[0.22em] leading-none mt-1 ${sub}`}>
            AUDIT COMPANY
          </span>
        </span>
      )}
    </span>
  );
}

type LogoProps = {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

/**
 * Фирменный знак AUDIT D.
 * Классическая монограмма "AD": строгая serif-буква A (синяя/белая)
 * поверх крупной золотой D с анимированным переливом золота и синевы.
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Переливающийся градиент: золото → блик → золото → глубокий синий */}
        <linearGradient
          id="adGoldShimmer"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="20"
          x2="100"
          y2="80"
        >
          <stop offset="0" stopColor="#B8963E" />
          <stop offset="0.25" stopColor="#EAD28C" />
          <stop offset="0.5" stopColor="#B8963E" />
          <stop offset="0.75" stopColor="#0B1D33" />
          <stop offset="1" stopColor="#B8963E" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-100 0; 100 0"
            dur="6s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      {/* Золотая D — крупная, позади буквы A */}
      <text
        x="34"
        y="79"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="78"
        fill="url(#adGoldShimmer)"
      >
        D
      </text>

      {/* Синяя (или белая) A — поверх, с наложением на D */}
      <text
        x="2"
        y="79"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="78"
        fill={primary}
      >
        A
      </text>
    </svg>
  );
}

export default function Logo({ variant = "dark", compact = false, className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-[#0B1D33]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Логознак (монограмма AD) */}
      <LogoMark tone={variant === "light" ? "light" : "dark"} size={compact ? 44 : 54} />

      {/* Текстовая часть */}
      {!compact && (
        <span className="flex flex-col justify-center select-none" style={{ fontFamily: 'Georgia, serif' }}>
          {/* Главное название: AUDIT синим/белым, D — с золотым переливом */}
          <span className={`text-[1.35rem] font-medium tracking-[0.05em] leading-tight ${text}`}>
            AUDIT <span className="logo-shimmer-gold font-semibold">D</span>
          </span>
          {/* Подзаголовок (золотой, с большим межбуквенным интервалом) */}
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] leading-none mt-1 text-[#B8963E]">
            AUDIT COMPANY
          </span>
        </span>
      )}
    </span>
  );
}

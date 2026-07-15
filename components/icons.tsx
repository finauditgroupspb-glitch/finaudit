import type { ReactElement, SVGProps } from "react";

/**
 * Единое фирменное семейство иконок FinAudit Group.
 * Геометрия: сетка 24px, штрих 1.6, скруглённые окончания.
 * Класс "i" — контур с анимацией прорисовки (pathLength=100),
 * класс "ia" — золотой акцент. Все иконки декоративные (aria-hidden).
 */

export type IconName =
  | "audit"
  | "ledger"
  | "tax"
  | "legal"
  | "strategy"
  | "contract"
  | "team"
  | "dialog"
  | "globe"
  | "cart"
  | "crane"
  | "code"
  | "factory"
  | "bell"
  | "routes"
  | "target"
  | "loop"
  | "seal"
  | "growth"
  | "mentor"
  | "focus"
  | "remote"
  | "spark"
  | "shield"
  | "handshake";

const paths: Record<IconName, ReactElement> = {
  /* Аудит: документ с печатью-галочкой */
  audit: (
    <>
      <path className="i" pathLength={100} d="M6 3.5h8.5L19 8v12.5H6z" />
      <path className="i" pathLength={100} d="M14.5 3.5V8H19" />
      <path className="i" pathLength={100} d="M8.8 8.8h3.4M8.8 12h2.4" />
      <circle className="i ia" pathLength={100} cx="14.4" cy="15.6" r="3.3" />
      <path className="i ia" pathLength={100} d="M13 15.7l1.1 1.1 1.9-2" />
    </>
  ),
  /* Бухгалтерия: гроссбух с колонками */
  ledger: (
    <>
      <path className="i" pathLength={100} d="M4.5 4.5h15v15h-15z" />
      <path className="i" pathLength={100} d="M4.5 8.5h15M9.5 8.5v11" />
      <path className="i ia" pathLength={100} d="M12 12h5M12 15.5h3.4" />
      <path className="i" pathLength={100} d="M6.5 12h1M6.5 15.5h1" />
    </>
  ),
  /* Налоги: процент в ромбе точности */
  tax: (
    <>
      <path className="i" pathLength={100} d="M12 3l9 9-9 9-9-9z" />
      <path className="i ia" pathLength={100} d="M9.4 14.6l5.2-5.2" />
      <circle className="i ia" pathLength={100} cx="9.7" cy="9.7" r="1.15" />
      <circle className="i ia" pathLength={100} cx="14.3" cy="14.3" r="1.15" />
    </>
  ),
  /* Право: весы */
  legal: (
    <>
      <path className="i" pathLength={100} d="M12 4v15.5M8.5 19.5h7" />
      <path className="i" pathLength={100} d="M5.5 7h13" />
      <path className="i ia" pathLength={100} d="M5.5 7l-2.3 5.2a2.6 2.6 0 0 0 4.6 0z" />
      <path className="i ia" pathLength={100} d="M18.5 7l-2.3 5.2a2.6 2.6 0 0 0 4.6 0z" />
    </>
  ),
  /* Консалтинг: восходящий график с узлами */
  strategy: (
    <>
      <path className="i" pathLength={100} d="M4 4.5v15h16" />
      <path className="i ia" pathLength={100} d="M7 15.5l3.6-4 3 2.4 4.4-5.6" />
      <circle className="i ia" pathLength={100} cx="18" cy="8.3" r="1.3" />
      <path className="i" pathLength={100} d="M15 7.5h3.3V10.8" />
    </>
  ),
  /* Договор: документ с подписью */
  contract: (
    <>
      <path className="i" pathLength={100} d="M6 3.5h8.5L19 8v12.5H6z" />
      <path className="i" pathLength={100} d="M14.5 3.5V8H19" />
      <path className="i" pathLength={100} d="M8.8 11h6.4M8.8 14h6.4" />
      <path className="i ia" pathLength={100} d="M8.8 17.3c1-.9 1.6.7 2.5 0s1.4.6 2.3 0 1.5.5 2 .1" />
    </>
  ),
  /* Команда */
  team: (
    <>
      <circle className="i" pathLength={100} cx="9" cy="8.6" r="3.1" />
      <path className="i" pathLength={100} d="M3.5 19.5c.5-3.3 2.7-5 5.5-5s5 1.7 5.5 5" />
      <circle className="i ia" pathLength={100} cx="16.6" cy="9.8" r="2.4" />
      <path className="i ia" pathLength={100} d="M16.4 14.4c2.3.2 3.8 1.7 4.2 4.1" />
    </>
  ),
  /* Понятный язык: диалог */
  dialog: (
    <>
      <path className="i" pathLength={100} d="M20 11.2a7 7 0 0 1-10.3 6L5 18.5l1.4-4A7 7 0 1 1 20 11.2z" />
      <path className="i ia" pathLength={100} d="M9.4 10h7M9.4 13h4.6" />
    </>
  ),
  /* География: глобус */
  globe: (
    <>
      <circle className="i" pathLength={100} cx="12" cy="12" r="8.3" />
      <path className="i" pathLength={100} d="M12 3.7c-5.6 4.8-5.6 11.8 0 16.6 5.6-4.8 5.6-11.8 0-16.6z" />
      <path className="i ia" pathLength={100} d="M4 12h16" />
    </>
  ),
  /* Торговля */
  cart: (
    <>
      <path className="i" pathLength={100} d="M4 5h2.2l2 10.4h9.6L20 8H7" />
      <circle className="i ia" pathLength={100} cx="9.4" cy="19" r="1.5" />
      <circle className="i ia" pathLength={100} cx="16.6" cy="19" r="1.5" />
    </>
  ),
  /* Стройка: башенный кран и здание */
  crane: (
    <>
      <path className="i" pathLength={100} d="M4.5 20.5V9.5h6v11" />
      <path className="i" pathLength={100} d="M7.5 9.5V4.5L19 6.8" />
      <path className="i ia" pathLength={100} d="M15.5 6.2v4.2m0 0a1.5 1.5 0 1 0 .01 0z" />
      <path className="i" pathLength={100} d="M13.5 20.5v-6h6v6M3 20.5h18" />
    </>
  ),
  /* IT */
  code: (
    <>
      <path className="i" pathLength={100} d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z" />
      <path className="i ia" pathLength={100} d="M9.3 9.6L7 12l2.3 2.4M14.7 9.6L17 12l-2.3 2.4" />
      <path className="i" pathLength={100} d="M12.8 8.8l-1.6 6.4" />
    </>
  ),
  /* Производство */
  factory: (
    <>
      <path className="i" pathLength={100} d="M3.5 20.5V9.5l5 3v-3l5 3V6l2-2.5 2 2.5v14.5z" />
      <path className="i" pathLength={100} d="M3 20.5h18" />
      <path className="i ia" pathLength={100} d="M13.5 16.5h4" />
    </>
  ),
  /* Услуги и HoReCa: сервисный колокольчик */
  bell: (
    <>
      <path className="i" pathLength={100} d="M4.5 17.5a7.5 7.5 0 0 1 15 0z" />
      <path className="i" pathLength={100} d="M3.5 20h17" />
      <path className="i ia" pathLength={100} d="M12 10V7.6m-1.6-0.1h3.2" />
    </>
  ),
  /* ВЭД: маршруты через границы */
  routes: (
    <>
      <circle className="i" pathLength={100} cx="12" cy="12" r="8.3" />
      <path className="i" pathLength={100} d="M4 9.5h16M4 14.5h16" />
      <path className="i ia" pathLength={100} d="M14.8 6.2L17.6 9l-2.8 2.8M9.2 11.7L6.4 14.5l2.8 2.8" />
    </>
  ),
  /* Формат «Проект»: цель */
  target: (
    <>
      <circle className="i" pathLength={100} cx="12" cy="12" r="8.3" />
      <circle className="i" pathLength={100} cx="12" cy="12" r="4.6" />
      <circle className="i ia" pathLength={100} cx="12" cy="12" r="1.2" />
      <path className="i ia" pathLength={100} d="M12 3.7v2.4M12 17.9v2.4M3.7 12h2.4M17.9 12h2.4" />
    </>
  ),
  /* Формат «Сопровождение»: непрерывный цикл */
  loop: (
    <>
      <path className="i" pathLength={100} d="M19.5 12a7.5 7.5 0 0 1-13.9 3.9" />
      <path className="i" pathLength={100} d="M4.5 12a7.5 7.5 0 0 1 13.9-3.9" />
      <path className="i ia" pathLength={100} d="M18.7 4.6v3.6h-3.6M5.3 19.4v-3.6h3.6" />
    </>
  ),
  /* Формат «Экспертиза»: печать-розетка */
  seal: (
    <>
      <path
        className="i"
        pathLength={100}
        d="M12 3.2l1.9 1.4 2.3-.3 1 2.1 2.1 1-.3 2.3 1.4 1.9-1.4 1.9.3 2.3-2.1 1-1 2.1-2.3-.3-1.9 1.4-1.9-1.4-2.3.3-1-2.1-2.1-1 .3-2.3L3.6 12 5 10.1l-.3-2.3 2.1-1 1-2.1 2.3.3z"
      />
      <path className="i ia" pathLength={100} d="M9 12.2l2.1 2.1 3.9-4.2" />
    </>
  ),
  /* Рост */
  growth: (
    <>
      <path className="i" pathLength={100} d="M4.5 19.5h15" />
      <path className="i" pathLength={100} d="M6.5 19.5v-5h3v5M13 19.5v-8.5h3v8.5" />
      <path className="i ia" pathLength={100} d="M6 8.5l4.5-3.5 3 2.2L18 3.8" />
      <path className="i ia" pathLength={100} d="M15.2 3.5H18v2.8" />
    </>
  ),
  /* Наставничество */
  mentor: (
    <>
      <circle className="i" pathLength={100} cx="12" cy="7.4" r="3" />
      <path className="i" pathLength={100} d="M6.2 19.5c.5-3.1 2.6-4.8 5.8-4.8s5.3 1.7 5.8 4.8" />
      <path className="i ia" pathLength={100} d="M12 12v2.7M9.3 20.4L12 17.6l2.7 2.8" />
    </>
  ),
  /* Осмысленные проекты: фокус на документе */
  focus: (
    <>
      <path className="i" pathLength={100} d="M4.5 8V5.5A1 1 0 0 1 5.5 4.5H8M16 4.5h2.5a1 1 0 0 1 1 1V8M19.5 16v2.5a1 1 0 0 1-1 1H16M8 19.5H5.5a1 1 0 0 1-1-1V16" />
      <path className="i ia" pathLength={100} d="M9 9.2h6M9 12h6M9 14.8h3.6" />
    </>
  ),
  /* Гибкий формат: удалёнка */
  remote: (
    <>
      <path className="i" pathLength={100} d="M4 5.5h16v10.5H4z" />
      <path className="i" pathLength={100} d="M9.5 19.5h5M12 16v3.5" />
      <path className="i ia" pathLength={100} d="M9.3 11.9c1.5-1.6 3.9-1.6 5.4 0M11 9.8a4.9 4.9 0 0 1 2 0" />
      <circle className="i ia" pathLength={100} cx="12" cy="13.4" r="0.4" />
    </>
  ),
  /* Новым клиентам: искра старта */
  spark: (
    <>
      <path className="i ia" pathLength={100} d="M12 3.5l1.7 4.9 4.9 1.7-4.9 1.7L12 16.7l-1.7-4.9-4.9-1.7 4.9-1.7z" />
      <path className="i" pathLength={100} d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  /* Ответственность: щит */
  shield: (
    <>
      <path className="i" pathLength={100} d="M12 3.5l7 2.6v5.4c0 4.4-2.9 7.5-7 9-4.1-1.5-7-4.6-7-9V6.1z" />
      <path className="i ia" pathLength={100} d="M9 11.8l2.2 2.2 4-4.4" />
    </>
  ),
  /* Долгосрочность: рукопожатие */
  handshake: (
    <>
      <path className="i" pathLength={100} d="M2.8 7.2L7 5.6l4 1.9-3.4 3.3a1.3 1.3 0 0 0 1.8 1.9L12.6 10l5 4.6c.9.8.1 2.4-1.1 2.1" />
      <path className="i" pathLength={100} d="M21.2 7.2L17 5.6l-2.6 1.2" />
      <path className="i ia" pathLength={100} d="M14.9 17.9c.6 1.2-.9 2.4-1.9 1.6l-.9-.8m.1-.1c.5 1.3-1.2 2.3-2.1 1.4l-.8-.8" />
    </>
  ),
};

export default function Icon({
  name,
  className = "h-6 w-6",
  ...rest
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-fx ${className}`}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/** Соответствие услуг фирменным иконкам */
export const serviceIcons: Record<string, IconName> = {
  "financial-audit": "audit",
  accounting: "ledger",
  "tax-consulting": "tax",
  "legal-support": "legal",
  "business-consulting": "strategy",
};

/** Соответствие отраслей фирменным иконкам (по порядку в lib/data.ts) */
export const industryIcons: IconName[] = ["cart", "crane", "code", "factory", "bell", "routes"];

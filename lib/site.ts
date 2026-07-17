// Чтобы изменить номер сразу во всех частях сайта, отредактируйте только эту строку.
const contactPhone = "+7 (791) 301-802-23";
const contactPhoneHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;

// Единый источник юридических данных компании для реквизитов и микроразметки.
export const company = {
  legalName: "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «АУДИТ Д»",
  shortName: "ООО «АУДИТ Д»",
  inn: "7814106351",
  ogrn: "1027807585002",
  kpp: "783801001",
  capital: "12 000 ₽",
  registrationDate: "17.01.2000",
  registrationDateIso: "2000-01-17",
  director: "Дзиркал Анатолий Львович",
  founders: ["Дзиркал Анатолий Львович", "Дзиркал Дмитрий Анатольевич"],
  registrationAuthority: "Межрайонная ИФНС России №15 по Санкт-Петербургу",
  address:
    "190121, г. Санкт-Петербург, вн.тер.г. муниципальный округ Коломна, пр-кт Римского-Корсакова, д. 61, литера А, помещ. 3-Н, офис 4",
} as const;

export const site = {
  name: "AUDIT D",
  legalName: company.shortName,
  url: "https://audit-d.ru",
  description:
    "Аудит, бухгалтерское сопровождение, налоговый и юридический консалтинг для бизнеса в России и странах СНГ.",
  email: "finauditgroupspb@gmail.com",
  phone: contactPhone,
  phoneHref: contactPhoneHref,
  telegramHref: "https://t.me/Vikksa21",
  telegramLabel: "Telegram",
  city: "Санкт-Петербург",
  workHours: "Пн–Пт, 9:00–19:00 (МСК)",
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const nav: NavItem[] = [
  { label: "О компании", href: "/about" },
  { label: "Реквизиты", href: "/company-info" },
  {
    label: "Услуги",
    href: "/services",
    children: [
      { label: "Финансовый аудит", href: "/services/financial-audit", note: "Обязательный и инициативный аудит отчётности" },
      { label: "Бухгалтерское сопровождение", href: "/services/accounting", note: "Полное ведение учёта и отчётности" },
      { label: "Налоговый консалтинг", href: "/services/tax-consulting", note: "Налоговое планирование и защита при проверках" },
      { label: "Юридическое сопровождение", href: "/services/legal-support", note: "Договоры, споры, корпоративное право" },
      { label: "Бизнес-консалтинг", href: "/services/business-consulting", note: "Финансовая модель, управленческий учёт, стратегия" },
    ],
  },
  { label: "Кейсы", href: "/cases" },
  { label: "Отрасли", href: "/industries" },
  { label: "Блог", href: "/blog" },
  { label: "Вакансии", href: "/vacancies" },
  { label: "Контакты", href: "/contacts" },
];

export const footerNav = {
  services: [
    { label: "Финансовый аудит", href: "/services/financial-audit" },
    { label: "Бухгалтерское сопровождение", href: "/services/accounting" },
    { label: "Налоговый консалтинг", href: "/services/tax-consulting" },
    { label: "Юридическое сопровождение", href: "/services/legal-support" },
    { label: "Бизнес-консалтинг", href: "/services/business-consulting" },
  ],
  company: [
    { label: "О компании", href: "/about" },
    { label: "Реквизиты", href: "/company-info" },
    { label: "Кейсы", href: "/cases" },
    { label: "Отрасли", href: "/industries" },
    { label: "Вакансии", href: "/vacancies" },
    { label: "Блог", href: "/blog" },
    { label: "Вопросы и ответы", href: "/faq" },
  ],
  legal: [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Пользовательское соглашение", href: "/terms" },
  ],
};

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Icon, { type IconName } from "@/components/icons";
import { TelegramIcon } from "@/components/Header";
import { PageHero, SectionTitle } from "@/components/ui";
import { vacancies, type Vacancy } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Вакансии",
  description:
    "Работа в AUDIT D: вакансии в Санкт-Петербурге и Москве, включая курьера по доставке документов в московский филиал.",
  alternates: { canonical: "/vacancies" },
};

const perks: { title: string; text: string; icon: IconName }[] = [
  { title: "Официальное оформление", text: "Трудовой договор с первого дня, белая зарплата, оплачиваемые отпуска и больничные.", icon: "contract" },
  { title: "Рост внутри практики", text: "Прозрачные грейды, наставничество и оплата профильного обучения — включая аттестат аудитора.", icon: "growth" },
  { title: "Осмысленные проекты", text: "Ограниченный портфель клиентов на специалиста: погружение в бизнес вместо конвейера.", icon: "focus" },
  { title: "Гибкий формат", text: "Часть ролей — полностью удалённые, часть — гибрид с офисом в Санкт-Петербурге.", icon: "remote" },
];

function VacancyCard({ vacancy, city, id }: { vacancy: Vacancy; city: "Санкт-Петербург" | "Москва"; id?: string }) {
  return (
    <details id={id} className="spot scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-card transition-shadow open:shadow-lift">
      <summary className="group flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 p-7 lg:p-8 [&::-webkit-details-marker]:hidden">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-navy transition-colors group-hover:text-navy-soft">
            {vacancy.title}
          </h3>
          <div className="mt-2.5 flex flex-wrap gap-2 text-[0.76rem] font-bold">
            <span className="rounded-full bg-mist px-3 py-1.5 text-navy/75">{vacancy.type}</span>
            <span className="rounded-full bg-mist px-3 py-1.5 text-navy/75">{city}</span>
            <span className="rounded-full bg-gold-pale px-3 py-1.5 text-gold">{vacancy.salary}</span>
          </div>
        </div>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 text-lg text-navy transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-navy-deep"
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      <div className="faq-a">
        <div>
          <div className="border-t border-navy/8 px-7 pb-8 pt-7 lg:px-8">
            <p className="max-w-3xl text-[0.98rem] leading-relaxed text-graphite">{vacancy.about}</p>
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {[
                { h: "Чем предстоит заниматься", items: vacancy.tasks },
                { h: "Что для нас важно", items: vacancy.requirements },
                { h: "Что предлагаем", items: vacancy.offer },
              ].map((col) => (
                <div key={col.h}>
                  <h4 className="text-[0.74rem] font-bold uppercase tracking-caps text-gold">{col.h}</h4>
                  <ul className="mt-4 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-graphite">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 rounded-2xl bg-mist p-7 lg:grid-cols-[1fr_1.3fr] lg:p-8">
              <div>
                <h4 className="text-lg font-extrabold text-navy">Откликнуться на вакансию</h4>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-graphite/85">
                  Оставьте контакты — наш специалист свяжется с вами и расскажет о следующих шагах.
                  Быстрее всего — написать сразу в Telegram.
                </p>
                <a
                  href={site.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen mt-5 inline-flex items-center gap-2.5 rounded-full bg-navy px-5 py-3 text-[0.86rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-soft"
                >
                  <TelegramIcon className="h-4 w-4 text-gold-light" />
                  Telegram
                </a>
              </div>
              <ContactForm compact topic={`Вакансия: ${vacancy.title}, город: ${city}`} />
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}

const courierGroups: { h: string; items: string[] }[] = [
  {
    h: "Чем предстоит заниматься",
    items: [
      "Доставка документов, договоров и служебных отправлений компании клиентам и в организации",
      "Личные встречи с клиентами и представителями компаний",
      "Получение корреспонденции и отправлений, адресованных компании",
      "Соблюдение согласованных маршрутов и сроков",
      "Подтверждение факта получения и передачи отправления",
      "Связь с руководителем в рабочее время",
    ],
  },
  {
    h: "График и рабочий день",
    items: [
      "График 5/2, рабочее время с 09:00 до 20:00",
      "Маршруты формируются утром и могут дополняться в течение дня",
      "Между поручениями сотрудник ожидает указаний руководителя — постоянно находиться в дороге не нужно",
      "Работа разъездная, по Москве",
      "Пока филиал на этапе запуска, ежедневно приезжать в офис не нужно; после открытия часть маршрутов может начинаться из офиса",
    ],
  },
  {
    h: "Оплата",
    items: [
      "Фиксированная ставка 5 000 ₽ за каждый рабочий день",
      "Бонус 1 500 ₽ за каждое успешно выполненное и подтверждённое поручение",
      "Выплаты на банковскую карту, формат согласуется при оформлении",
      "Все условия оплаты фиксируются в документах при трудоустройстве",
    ],
  },
  {
    h: "Стажировка",
    items: [
      "Первые три рабочих дня — ознакомительная стажировка",
      "Оплачивается в полном объёме, как обычные рабочие дни",
      "Знакомим с маршрутами, правилами получения и передачи отправлений и отчётностью",
      "Руководитель сопровождает и остаётся на связи",
      "Стажировка помогает обеим сторонам понять, подходит ли формат работы",
    ],
  },
  {
    h: "Рабочие расходы",
    items: [
      "Согласованные расходы по поручениям компания оплачивает заранее",
      "Такси и общественный транспорт по рабочим маршрутам",
      "Печать документов и служебная мобильная связь",
      "Тратить собственные деньги и ждать компенсации не требуется",
    ],
  },
  {
    h: "Требования к кандидату",
    items: [
      "Ответственность, пунктуальность, внимательность и аккуратность",
      "Честность, дисциплинированность, бережное отношение к документам",
      "Вежливое и корректное общение с клиентами",
      "Уверенное ориентирование по городу и работа с навигатором",
      "Быть на связи в рабочее время и вовремя сообщать о нестандартных ситуациях",
      "Соблюдение инструкций и конфиденциальности",
      "Готовность переносить отправления весом 2–3 кг",
      "Опыт курьером не обязателен: перед началом проводится инструктаж, на этапе адаптации поддерживает руководитель",
    ],
  },
  {
    h: "Внешний вид",
    items: [
      "Строгого делового дресс-кода нет: костюм и галстук не требуются",
      "Главное — аккуратный, опрятный и нейтральный вид: сотрудник встречается с клиентами и представляет компанию",
      "Подойдут: чистые джинсы или брюки, однотонная футболка, поло, рубашка, свитер или худи спокойного цвета, чистая закрытая обувь",
      "Не подойдут: шорты, майки и пляжная одежда, спортивные костюмы, яркие кислотные цвета, вещи с провокационными изображениями и надписями, открытая пляжная обувь",
    ],
  },
  {
    h: "Что нужно для работы",
    items: [
      "Исправный смартфон со стабильным мобильным интернетом",
      "Установленный навигатор",
      "Пауэрбанк и наушники или гарнитура",
      "Банковская карта для получения выплат",
      "Паспорт понадобится при официальном оформлении",
    ],
  },
  {
    h: "Оформление",
    items: [
      "На выбор: трудовой договор по ТК РФ или договор гражданско-правового характера",
      "Шаг 1. Знакомство с условиями вакансии",
      "Шаг 2. Заполнение анкеты кандидата",
      "Шаг 3. Выбор подходящего варианта оформления",
      "Шаг 4. Ознакомление с договором и необходимыми документами",
      "Шаг 5. Итоговое согласование с руководителем и даты выхода",
    ],
  },
];

function CourierCard({ id }: { id?: string }) {
  return (
    <details id={id} className="spot scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-card transition-shadow open:shadow-lift">
      <summary className="group flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 p-7 lg:p-8 [&::-webkit-details-marker]:hidden">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-navy transition-colors group-hover:text-navy-soft">
            Деловой курьер-представитель
          </h3>
          <div className="mt-2.5 flex flex-wrap gap-2 text-[0.76rem] font-bold">
            <span className="rounded-full bg-mist px-3 py-1.5 text-navy/75">График 5/2, 09:00–20:00</span>
            <span className="rounded-full bg-mist px-3 py-1.5 text-navy/75">Москва</span>
            <span className="rounded-full bg-gold-pale px-3 py-1.5 text-gold">5 000 ₽ за день + бонусы</span>
          </div>
        </div>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 text-lg text-navy transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-navy-deep"
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      <div className="faq-a">
        <div>
          <div className="border-t border-navy/8 px-7 pb-8 pt-7 lg:px-8">
            <p className="max-w-3xl text-[0.98rem] leading-relaxed text-graphite">
              Это не классическая доставка с тяжёлым рюкзаком и постоянной беготнёй. Деловой курьер-представитель
              выполняет представительские поручения компании: передаёт документы и служебные отправления, встречается
              с клиентами и представителями компаний. Вес отправлений обычно 2–3 кг.
            </p>
            <p className="mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-graphite">
              Каждое поручение согласуется заранее: сотруднику сообщают адреса, контактных лиц, состав отправления
              и порядок действий. Неизвестные и неразъяснённые поручения в работе не выполняются.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courierGroups.map((col) => (
                <div key={col.h}>
                  <h4 className="text-[0.74rem] font-bold uppercase tracking-caps text-gold">{col.h}</h4>
                  <ul className="mt-4 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-graphite">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 rounded-2xl bg-mist p-7 lg:grid-cols-[1fr_1.3fr] lg:p-8">
              <div>
                <h4 className="text-lg font-extrabold text-navy">Откликнуться на вакансию</h4>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-graphite/85">
                  Оставьте контакты — наш специалист свяжется с вами и расскажет о следующих шагах.
                  Быстрее всего — написать сразу в Telegram.
                </p>
                <a
                  href={site.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen mt-5 inline-flex items-center gap-2.5 rounded-full bg-navy px-5 py-3 text-[0.86rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-soft"
                >
                  <TelegramIcon className="h-4 w-4 text-gold-light" />
                  Telegram
                </a>
              </div>
              <ContactForm compact topic="Вакансия: Курьер по доставке документов, город: Москва" />
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}

export default function VacanciesPage() {
  return (
    <>
      <PageHero
        variant="constellation"
        eyebrow="Вакансии"
        title="Работа для тех, кто любит порядок в цифрах"
        lead="Мы растём и ищем специалистов, которым важно качество работы, а не только скорость. Ниже — открытые роли; если вашей нет, напишите нам: сильным кандидатам мы находим место."
      >
        <a
          href={site.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className="btn-sheen inline-flex items-center gap-2.5 rounded-full bg-white/10 px-6 py-3.5 text-[0.92rem] font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15"
        >
          <TelegramIcon className="h-4 w-4 text-gold-light" />
          Telegram
        </a>
      </PageHero>

      <section className="sheet bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="spot spot-border group h-full rounded-2xl bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="icon-badge h-11 w-11 bg-white text-gold shadow-card group-hover:bg-gold group-hover:text-white">
                    <Icon name={p.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <h2 className="mt-4 text-[1rem] font-extrabold text-navy">{p.title}</h2>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-graphite/85">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle eyebrow="Открытые роли" title="Вакансии в Санкт-Петербурге" />
          <div className="mt-12 space-y-5">
            {vacancies.map((vacancy, i) => (
              <Reveal key={`spb-${vacancy.slug}`} delay={Math.min(i * 60, 180)}>
                <VacancyCard vacancy={vacancy} city="Санкт-Петербург" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Новый филиал"
            title="Открытие филиала в Москве"
            lead="Мы формируем команду нового филиала компании в Москве."
          />
          <div className="mt-12 space-y-5">
            {vacancies.map((vacancy, i) => (
              <Reveal key={`moscow-${vacancy.slug}`} delay={Math.min(i * 60, 180)}>
                <VacancyCard vacancy={vacancy} city="Москва" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet-mist bg-mist py-20 lg:py-28" id="couriers">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Москва"
            title="Деловой курьер-представитель"
            lead="Московский филиал находится на этапе запуска, поэтому работа начинается без ежедневных визитов в офис: маршруты и поручения заранее согласует руководитель."
          />
          <div className="mt-12">
            <Reveal>
              <CourierCard id="courier-moscow" />
            </Reveal>
          </div>

          <Reveal delay={100} className="mt-12">
            <div className="spot spot-dark relative overflow-hidden rounded-3xl bg-navy-deep p-9 text-white lg:p-12">
              <div className="ledger-grid absolute inset-0" aria-hidden="true" />
              <div
                className="hero-glow absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full opacity-60"
                style={{ background: "radial-gradient(circle, rgba(184,150,62,0.2), transparent 65%)" }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-extrabold tracking-tight">Не нашли подходящую роль?</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-silver/90">
                    Пришлите резюме на{" "}
                    <a href={`mailto:${site.email}`} className="underline decoration-gold/60 underline-offset-2 hover:text-gold-light">
                      {site.email}
                    </a>{" "}
                    или напишите в Telegram — мы сохраняем контакты
                    сильных специалистов и возвращаемся, когда открывается подходящая позиция.
                  </p>
                </div>
                <a
                  href={`mailto:${site.email}?subject=Резюме`}
                  data-magnetic
                  className="btn-sheen rounded-full bg-gold px-7 py-3.5 text-[0.9rem] font-extrabold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Отправить резюме
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

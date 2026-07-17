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

function CourierCard({ id }: { id?: string }) {
  return (
    <Reveal className="h-full">
      <article id={id} className="spot scroll-mt-28 h-full rounded-3xl border border-navy/8 bg-white p-7 shadow-card lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-caps text-gold">Вакансия</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">Курьер по доставке документов</h3>
          </div>
          <span className="rounded-full bg-gold-pale px-4 py-2 text-[0.78rem] font-bold text-gold">Москва</span>
        </div>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="text-[0.74rem] font-bold uppercase tracking-caps text-gold">Чем предстоит заниматься</h4>
            <ul className="mt-4 space-y-3">
              {[
                "Доставка документов клиентам и в госорганы по Москве",
                "Получение подписанных экземпляров и передача в офис",
                "Согласование маршрута и времени с координатором",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-graphite">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[0.74rem] font-bold uppercase tracking-caps text-gold">Условия</h4>
            <ul className="mt-4 space-y-3">
              {[
                "Гибкий график по договорённости, занятость неполная",
                "Оплата обсуждается на собеседовании",
                "Компенсация проезда по рабочим маршрутам",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-graphite">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-navy/8 pt-7">
          <h4 className="text-lg font-extrabold text-navy">Откликнуться на вакансию</h4>
          <div className="mt-5">
            <ContactForm compact topic="Вакансия: Курьер по доставке документов, город: Москва" />
          </div>
        </div>
      </article>
    </Reveal>
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
            eyebrow="Московский филиал"
            title="Курьер по доставке документов"
            lead="Ищем курьера по доставке документов для работы в новом филиале в Москве."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <CourierCard id="courier-moscow" />
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

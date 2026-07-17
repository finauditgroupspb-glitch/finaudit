import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Icon, { serviceIcons, industryIcons, type IconName } from "@/components/icons";
import CountUp from "@/components/fx/CountUp";
import Hero3D from "@/components/fx/Hero3D";
import { Particles } from "@/components/fx/Ambient";
import { Eyebrow, SectionTitle } from "@/components/ui";
import { cases, generalFaq, industries, posts, services, stats, testimonials } from "@/lib/data";
import { site } from "@/lib/site";

const advantageIcons: IconName[] = ["shield", "team", "dialog", "globe"];

export default function HomePage() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="ledger-grid absolute inset-0" aria-hidden="true" />
        <div
          data-parallax="0.14"
          className="hero-glow absolute -right-48 top-[-120px] h-[640px] w-[640px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(184,150,62,0.24), transparent 62%)" }}
          aria-hidden="true"
        />
        <div
          data-parallax="0.07"
          className="hero-glow-slow absolute -left-40 bottom-[-200px] h-[520px] w-[520px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgba(18,41,74,0.9), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Particles count={12} seed={4} />
        </div>

        {/* Интерактивная 3D-сцена: стеклянная башня, документы, потоки данных */}
        <div className="pointer-events-none absolute inset-0 lg:left-auto lg:right-0 lg:w-[54%]" aria-hidden="true">
          <Hero3D className="absolute inset-0 opacity-45 md:opacity-70 lg:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/55 to-navy-deep/5 lg:from-navy-deep lg:via-navy-deep/10 lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-navy-deep to-transparent" />
        </div>

        <div className="relative mx-auto max-w-site px-5 pb-24 pt-44 lg:px-8 lg:pb-32 lg:pt-56">
          <div className="max-w-3xl lg:max-w-[46%]">
            <p className="hero-up hero-up-1 eyebrow-line text-[0.74rem] font-bold uppercase tracking-caps text-gold-light">
              Аудит · Бухгалтерия · Налоги · Право
            </p>
            <h1 className="hero-up hero-up-2 mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Порядок в финансах,
              <br />
              за который мы отвечаем
              <span className="text-shimmer"> по договору</span>
            </h1>
            <p className="hero-up hero-up-3 mt-7 max-w-xl text-lg leading-relaxed text-silver/90">
              AUDIT D — команда аудиторов, бухгалтеров, налоговых консультантов и юристов.
              Сопровождаем бизнес в России и странах СНГ: от ИП до групп компаний.
            </p>
            <div className="hero-up hero-up-4 mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contacts"
                data-magnetic
                className="btn-sheen rounded-full bg-gold px-8 py-4 text-center text-[0.95rem] font-extrabold text-navy-deep shadow-[0_16px_36px_-12px_rgba(184,150,62,0.75)] transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Получить консультацию
              </Link>
              <Link
                href="/services"
                data-magnetic
                className="rounded-full border border-white/25 bg-white/[0.03] px-8 py-4 text-center text-[0.95rem] font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
              >
                Смотреть услуги
              </Link>
            </div>
          </div>

          <div className="hero-up hero-up-4 pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden="true">
            <span className="scroll-cue block" />
          </div>
        </div>

        {/* Статистика */}
        <div className="relative border-t border-white/10 bg-navy-deep/40 backdrop-blur-sm">
          <div className="mx-auto grid max-w-site grid-cols-2 gap-px px-5 py-10 lg:grid-cols-4 lg:px-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="stat-cell group px-4 py-4 lg:px-6">
                <p className="text-4xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-gold-light md:text-[2.75rem]">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-[0.85rem] leading-snug text-silver/75">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— ВАКАНСИЯ КУРЬЕРА В МОСКВЕ ——— */}
      <section className="sheet bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <Reveal>
            <div className="spot spot-border relative overflow-hidden rounded-3xl border border-gold/25 bg-gold-pale/45 p-7 shadow-card lg:p-10">
              <div className="ledger-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <div
                className="hero-glow absolute -right-24 -top-28 h-[280px] w-[280px] rounded-full opacity-50"
                style={{ background: "radial-gradient(circle, rgba(184,150,62,0.22), transparent 65%)" }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-navy md:text-3xl">
                    Ищем курьеров по доставке документов в Москве
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-graphite/85">
                    В связи с открытием нового филиала мы набираем курьеров по доставке документов.
                  </p>
                </div>
                <Link
                  href="/vacancies#courier-moscow"
                  data-magnetic
                  className="btn-sheen shrink-0 rounded-full bg-navy px-7 py-3.5 text-center text-[0.9rem] font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-soft"
                >
                  Откликнуться на вакансию
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— ПРЕИМУЩЕСТВА ——— */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Почему нам доверяют"
            title="Финансовая функция бизнеса — в одних руках"
            lead="Четыре практики работают в связке: аудитор видит риски, налоговый консультант считает эффект, юрист закрепляет решения в документах, бухгалтерия внедряет их в учёт."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Ответственность деньгами",
                text: "Штрафы и пени по нашей вине компенсируем — обязательство закреплено в договоре, а не в обещаниях менеджера.",
              },
              {
                title: "Команда, а не один специалист",
                text: "За каждым клиентом закреплены ведущий специалист и контролирующий эксперт. Отпуска и болезни не останавливают работу.",
              },
              {
                title: "Понятный язык",
                text: "Каждое заключение переводим на язык бизнеса: что это значит для денег компании и какое решение нужно принять.",
              },
              {
                title: "Опыт в СНГ",
                text: "Сопровождаем операции между Россией, Казахстаном, Беларусью, Арменией и Кыргызстаном — включая НДС в ЕАЭС.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article
                  data-tilt="5"
                  className="spot spot-border group h-full rounded-2xl border border-navy/8 bg-white/80 p-7 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift"
                >
                  <span className="icon-badge h-12 w-12 bg-gold-pale/70 text-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_10px_24px_-8px_rgba(184,150,62,0.65)]">
                    <Icon name={advantageIcons[i]} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[1.08rem] font-extrabold text-navy">{item.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-graphite/85">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— О КОМПАНИИ ——— */}
      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto grid max-w-site items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <Eyebrow>О компании</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
              Работаем так, как хотели бы, чтобы работали с нашим бизнесом
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-graphite/85">
              Компания AUDIT D выросла из частной аудиторской практики. Мы видели сотни компаний,
              где учёт был «чёрным ящиком» для собственника, — и построили компанию, которая делает наоборот:
              прозрачные отчёты, зафиксированная ответственность и прямая связь с экспертом, а не с колл-центром.
            </p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-graphite/85">
              Сегодня мы сопровождаем компании из торговли, строительства, IT, производства и сферы услуг —
              в России и четырёх странах ЕАЭС.
            </p>
            <Link
              href="/about"
              className="link-underline mt-7 inline-block text-[0.95rem] font-bold text-navy"
            >
              Подробнее о компании →
            </Link>
          </Reveal>
          <Reveal variant="right" delay={120} className="relative">
            <div className="glow-card rounded-3xl shadow-lift">
              <div className="glow-inner overflow-hidden rounded-3xl bg-navy p-9 text-white lg:p-12">
                <div className="ledger-grid absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="text-[0.74rem] font-bold uppercase tracking-caps text-gold-light">Наш принцип</p>
                  <p className="mt-6 text-2xl font-bold leading-snug md:text-[1.7rem]">
                    «Цифрам, которые мы подписываем, должно быть можно верить. Всё остальное — производное от этого».
                  </p>
                  <div className="mt-8 h-px w-16 bg-gold" aria-hidden="true" />
                  <p className="mt-5 text-[0.9rem] text-silver/85">Партнёры AUDIT D</p>
                </div>
              </div>
            </div>
            <span
              className="float-a absolute -left-4 top-8 hidden rounded-full border border-navy/10 bg-white/85 px-4 py-2 text-[0.76rem] font-extrabold tracking-wide text-navy shadow-card backdrop-blur lg:inline-block"
              aria-hidden="true"
            >
              Аудит по МСА
            </span>
            <span
              className="float-b absolute -right-3 bottom-10 hidden rounded-full border border-navy/10 bg-white/85 px-4 py-2 text-[0.76rem] font-extrabold tracking-wide text-navy shadow-card backdrop-blur lg:inline-block"
              aria-hidden="true"
            >
              5 стран ЕАЭС
            </span>
          </Reveal>
        </div>
      </section>

      {/* ——— УСЛУГИ ——— */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Услуги"
              title="Пять практик для задач любого масштаба"
            />
            <Reveal delay={100}>
              <Link href="/services" className="link-underline pb-1 text-[0.95rem] font-bold text-navy">
                Все услуги →
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70} className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
                <Link
                  href={`/services/${s.slug}`}
                  data-tilt="4"
                  className="spot spot-border group flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <span className="icon-badge h-12 w-12 bg-gold-pale/70 text-gold transition-all group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_10px_24px_-8px_rgba(184,150,62,0.65)]">
                    <Icon name={serviceIcons[s.slug] ?? "audit"} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight text-navy">{s.name}</h3>
                  <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-graphite/85">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-bold text-gold transition-colors group-hover:text-navy">
                    Подробнее
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={350}>
              <div className="spot spot-dark relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-navy p-8 text-white shadow-card">
                <div className="ledger-grid absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <h3 className="text-xl font-extrabold tracking-tight">Не нашли свою задачу?</h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-silver/90">
                    Опишите ситуацию — предложим формат работы или честно скажем, к кому обратиться.
                  </p>
                </div>
                <Link
                  href="/contacts"
                  className="btn-sheen relative mt-6 inline-block rounded-full bg-gold px-6 py-3 text-center text-[0.88rem] font-extrabold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Задать вопрос
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— ОТРАСЛИ ——— */}
      <section className="sheet-dark relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28">
        <div className="ledger-grid absolute inset-0" aria-hidden="true" />
        <div
          data-parallax="0.1"
          className="hero-glow absolute -right-32 top-10 h-[440px] w-[440px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(184,150,62,0.16), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              light
              eyebrow="Отрасли"
              title="Знаем специфику вашего рынка"
              lead="Учёт в стройке не похож на учёт маркетплейс-продавца. Мы формируем команды под отрасль клиента."
            />
            <Reveal delay={100}>
              <Link href="/industries" className="link-underline pb-1 text-[0.95rem] font-bold text-gold-light">
                Все отрасли →
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 60}>
                <div className="spot spot-dark group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-white/[0.07]">
                  <div className="flex items-start gap-4">
                    <span className="icon-badge h-11 w-11 shrink-0 bg-white/[0.06] text-gold-light group-hover:bg-gold/20">
                      <Icon name={industryIcons[i] ?? "cart"} className="h-[22px] w-[22px]" />
                    </span>
                    <div>
                      <h3 className="text-[1.02rem] font-extrabold">{ind.name}</h3>
                      <p className="mt-2.5 text-[0.88rem] leading-relaxed text-silver/80">{ind.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— КАК МЫ РАБОТАЕМ ——— */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Как мы работаем"
            title="От первого разговора до результата — четыре шага"
            center
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Консультация", d: "Обсуждаем задачу, задаём вопросы, запрашиваем минимум документов для оценки. Бесплатно и без обязательств." },
              { n: "02", t: "Предложение", d: "Фиксируем объём работ, срок и стоимость в коммерческом предложении. Цена не меняется по ходу проекта." },
              { n: "03", t: "Работа", d: "Выделенная команда выполняет проект по согласованному плану. Вы всегда знаете статус и следующий шаг." },
              { n: "04", t: "Результат", d: "Передаём результат, разбираем его на встрече и остаёмся на связи по вопросам внедрения." },
            ].map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 90}>
                <div className="step-item h-full">
                  <span className="text-[0.78rem] font-extrabold tracking-caps text-gold">{step.n}</span>
                  <h3 className="mt-3 text-lg font-extrabold text-navy">{step.t}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-graphite/85">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— КЕЙСЫ ——— */}
      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Кейсы"
              title="Типовые проекты и их результаты"
            />
            <Reveal delay={100}>
              <Link href="/cases" className="link-underline pb-1 text-[0.95rem] font-bold text-navy">
                Все кейсы →
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {cases.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <article
                  data-tilt="4"
                  className="spot spot-border flex h-full flex-col rounded-2xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="flex flex-wrap gap-2 text-[0.72rem] font-bold uppercase tracking-wider">
                    <span className="rounded-full bg-navy/5 px-3 py-1.5 text-navy/70">{c.industry}</span>
                    <span className="rounded-full bg-gold-pale px-3 py-1.5 text-gold">{c.service}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug text-navy">{c.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-graphite/85">{c.problem}</p>
                  <p className="mt-5 border-t border-navy/8 pt-4 text-[0.88rem] font-semibold text-navy">
                    {c.result[0]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— ОТЗЫВЫ ——— */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle eyebrow="Отзывы" title="Что говорят клиенты" center />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 90}>
                <figure
                  data-tilt="4"
                  className="spot flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <svg className="h-8 w-8 text-gold/50 transition-colors duration-300 group-hover:text-gold" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M13 8v7c0 5-3 8-8 9v-4c2.4-.7 3.6-2.2 3.8-5H5V8h8zm14 0v7c0 5-3 8-8 9v-4c2.4-.7 3.6-2.2 3.8-5H19V8h8z" />
                  </svg>
                  <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-graphite">
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-navy/8 pt-4">
                    <p className="text-[0.9rem] font-extrabold text-navy">{t.author}</p>
                    <p className="mt-1 text-[0.8rem] text-graphite/70">{t.context}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <SectionTitle
            eyebrow="Вопросы и ответы"
            title="Коротко о главном"
            lead="Собрали вопросы, которые чаще всего задают на первой консультации."
          />
          <Reveal delay={120}>
            <div className="space-y-3">
              {generalFaq.slice(0, 4).map((f) => (
                <details key={f.q} className="group rounded-2xl bg-white p-6 shadow-card transition-shadow open:shadow-lift">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-extrabold text-navy [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-all duration-300 group-open:rotate-45 group-open:bg-gold group-open:text-white" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="faq-a">
                    <div>
                      <p className="mt-4 text-[0.93rem] leading-relaxed text-graphite/85">{f.a}</p>
                    </div>
                  </div>
                </details>
              ))}
              <Link href="/faq" className="link-underline inline-block pt-2 text-[0.95rem] font-bold text-navy">
                Все вопросы и ответы →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— БЛОГ ——— */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Блог" title="Разбираем финансы бизнеса простым языком" />
            <Reveal delay={100}>
              <Link href="/blog" className="link-underline pb-1 text-[0.95rem] font-bold text-navy">
                Все статьи →
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="spot group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
                >
                  <span
                    className="pointer-events-none absolute -right-1 -top-5 text-[4.6rem] font-extrabold leading-none text-navy/[0.045] transition-colors duration-300 group-hover:text-gold/15"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 text-[0.74rem] font-bold uppercase tracking-wider">
                    <span className="text-gold">{p.category}</span>
                    <span className="text-graphite/50">{p.dateLabel}</span>
                  </div>
                  <h3 className="mt-4 flex-1 text-[1.05rem] font-extrabold leading-snug text-navy group-hover:underline group-hover:decoration-gold/50 group-hover:underline-offset-4">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-graphite/80">{p.excerpt}</p>
                  <span className="mt-5 text-[0.78rem] font-semibold text-graphite/60">{p.readingTime} чтения</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— КОНТАКТНЫЙ БЛОК ——— */}
      <section className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28" id="contact">
        <div className="ledger-grid absolute inset-0" aria-hidden="true" />
        <div
          data-parallax="0.12"
          className="hero-glow absolute -right-40 top-0 h-[500px] w-[500px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(184,150,62,0.2), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Particles count={9} seed={11} />
        </div>
        <div className="relative mx-auto grid max-w-site gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <Eyebrow light>Свяжитесь с нами</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Расскажите о задаче — предложим решение и точную цену
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-silver/90">
              Первая консультация бесплатна. Отвечаем в рабочее время в течение двух часов.
            </p>
            <dl className="mt-10 space-y-5">
              <div>
                <dt className="text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Телефон</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="text-xl font-extrabold text-white transition-colors hover:text-gold-light">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="link-underline text-[1rem] text-silver hover:text-white">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Telegram</dt>
                <dd className="mt-1">
                  <a href={site.telegramHref} target="_blank" rel="noopener noreferrer" className="link-underline text-[1rem] text-silver hover:text-white">
                    Telegram
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.8rem] font-semibold text-silver/85 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-light" />
              </span>
              Сейчас на связи: {site.workHours}
            </div>
          </Reveal>
          <Reveal variant="right" delay={140}>
            <div className="glow-card rounded-3xl shadow-lift">
              <div className="glow-inner rounded-3xl bg-white p-7 lg:p-9">
                <h3 className="text-xl font-extrabold text-navy">Оставить заявку</h3>
                <p className="mt-1.5 text-[0.88rem] text-graphite/75">Заполните форму — мы перезвоним и всё обсудим.</p>
                <div className="mt-6">
                  <ContactForm topic="Главная страница" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

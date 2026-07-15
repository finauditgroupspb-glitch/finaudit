import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon, { type IconName } from "@/components/icons";
import CountUp from "@/components/fx/CountUp";
import { CTASection, Eyebrow, PageHero, SectionTitle } from "@/components/ui";
import { timeline, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "FinAudit Group — команда аудиторов, бухгалтеров, налоговых консультантов и юристов. История, ценности и принципы работы компании.",
  alternates: { canonical: "/about" },
};

const team: { role: string; text: string; icon: IconName }[] = [
  {
    role: "Аудиторская практика",
    text: "Аттестованные аудиторы с опытом проверок по МСА в торговле, производстве и строительстве. Отвечают за качество каждого заключения.",
    icon: "audit",
  },
  {
    role: "Бухгалтерское сопровождение",
    text: "Ведущие бухгалтеры и методологи. Каждый специалист ведёт ограниченный портфель клиентов, чтобы погружаться в бизнес, а не обрабатывать поток.",
    icon: "ledger",
  },
  {
    role: "Налоговая практика",
    text: "Консультанты с опытом работы в консалтинге и налоговых органах. Знают, как инспекция читает документы, — и готовят их соответственно.",
    icon: "tax",
  },
  {
    role: "Юридическая практика",
    text: "Юристы по договорному, корпоративному и налоговому праву. Работают в связке с финансистами, поэтому видят сделку целиком.",
    icon: "legal",
  },
];

const valueIcons: IconName[] = ["seal", "shield", "dialog", "handshake"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        variant="orbits"
        eyebrow="О компании"
        title="Компания, которую мы построили бы для собственного бизнеса"
        lead="FinAudit Group выросла из аудиторской практики. Годы проверок показали нам, как выглядит учёт, которому нельзя верить, — и мы построили компанию, которая делает наоборот."
      />

      {/* История и миссия */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-site gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <Eyebrow>История</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
              От частной практики — к команде четырёх направлений
            </h2>
            <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-graphite/85">
              <p>
                Мы начинали с аудита и восстановления учёта для малого бизнеса Санкт-Петербурга.
                Каждая вторая проверка заканчивалась одинаково: собственник впервые видел реальную картину
                своих финансов — и спрашивал, кто теперь наведёт порядок.
              </p>
              <p>
                Так появилось бухгалтерское сопровождение, затем налоговая и юридическая практики.
                Сегодня FinAudit Group закрывает финансовую и правовую функцию бизнеса целиком:
                клиенту не нужно согласовывать позиции трёх разных подрядчиков.
              </p>
              <p>
                Мы работаем с компаниями из России, Казахстана, Беларуси, Армении и Кыргызстана —
                и специализируемся на операциях внутри ЕАЭС, где ошибки в НДС и валютном контроле
                стоят особенно дорого.
              </p>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div className="glow-card h-full rounded-3xl shadow-lift">
              <div className="glow-inner relative overflow-hidden rounded-3xl bg-navy-deep p-9 text-white lg:p-12">
                <div className="ledger-grid absolute inset-0" aria-hidden="true" />
                <div className="relative flex h-full flex-col">
                  <p className="text-[0.74rem] font-bold uppercase tracking-caps text-gold-light">Миссия</p>
                  <p className="mt-6 flex-1 text-[1.55rem] font-bold leading-snug">
                    Делать финансы бизнеса прозрачными для его собственника — чтобы решения принимались
                    на достоверных цифрах, а не на надежде.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                    <div>
                      <p className="text-3xl font-extrabold text-gold-light"><CountUp value="4" /></p>
                      <p className="mt-1 text-[0.82rem] text-silver/80">практики под одной крышей</p>
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-gold-light"><CountUp value="5" /></p>
                      <p className="mt-1 text-[0.82rem] text-silver/80">стран, где работают наши клиенты</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ценности */}
      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Ценности"
            title="Четыре принципа, на которых держится работа"
            center
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <article
                  data-tilt="4"
                  className="spot spot-border group h-full rounded-2xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="flex items-center gap-4">
                    <span className="icon-badge h-12 w-12 shrink-0 bg-gold-pale/70 text-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_10px_24px_-8px_rgba(184,150,62,0.65)]">
                      <Icon name={valueIcons[i]} className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-extrabold text-navy">{v.title}</h3>
                  </div>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-graphite/85">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Команда"
            title="Четыре практики — одна команда"
            lead="Мы не делим клиентов между отделами. Под каждую задачу собирается команда из нужных специалистов, а координирует её один ответственный менеджер проекта."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal key={t.role} delay={i * 80}>
                <article className="spot group h-full rounded-2xl border border-navy/8 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card">
                  <span className="icon-badge h-11 w-11 bg-gold-pale/60 text-gold group-hover:bg-gold group-hover:text-white">
                    <Icon name={t.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-extrabold text-navy">{t.role}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite/85">{t.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Таймлайн */}
      <section className="sheet-dark relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28">
        <div className="ledger-grid absolute inset-0" aria-hidden="true" />
        <div
          data-parallax="0.1"
          className="hero-glow absolute -right-36 top-20 h-[420px] w-[420px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(184,150,62,0.16), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle light eyebrow="История развития" title="Ключевые вехи" />
          <ol className="mt-14 space-y-0">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 60}>
                <div className="tl-item group grid gap-4 py-6 pl-8 sm:grid-cols-[100px_1fr] sm:gap-10">
                  <span className="tl-dot" aria-hidden="true" />
                  <span className="text-2xl font-extrabold text-gold-light transition-transform duration-300 group-hover:translate-x-1">
                    {t.year}
                  </span>
                  <p className="max-w-2xl text-[0.98rem] leading-relaxed text-silver/90">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Познакомимся?"
        text="Расскажите о своём бизнесе — покажем, как можем быть полезны, и честно скажем, если пока не нужны."
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon, { serviceIcons, type IconName } from "@/components/icons";
import { CTASection, PageHero, SectionTitle } from "@/components/ui";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Финансовый аудит, бухгалтерское сопровождение, налоговый консалтинг, юридическое сопровождение и бизнес-консалтинг для компаний и ИП.",
  alternates: { canonical: "/services" },
};

const formats: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Проект",
    text: "Разовая задача с понятным результатом: аудит, налоговая диагностика, восстановление учёта, судебный спор. Фиксированная цена до начала работы.",
    icon: "target",
  },
  {
    title: "Сопровождение",
    text: "Регулярная работа по абонентскому договору: бухгалтерия, юридическая поддержка, финансовый директор на аутсорсе. Ежемесячная стоимость без сюрпризов.",
    icon: "loop",
  },
  {
    title: "Экспертиза",
    text: "Письменное заключение по конкретному вопросу: сделка, налоговый риск, спорная ситуация. Документ, на который можно опереться при принятии решения.",
    icon: "seal",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        variant="beams"
        eyebrow="Услуги"
        title="Пять практик для финансовых и правовых задач бизнеса"
        lead="Каждая услуга работает и отдельно, и в связке с остальными: аудит находит проблемы, бухгалтерия и юристы их устраняют, консультанты не дают им повториться."
      />

      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site space-y-6 px-5 lg:px-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 60, 180)}>
              <Link
                href={`/services/${s.slug}`}
                className="spot spot-border group grid gap-6 rounded-3xl border border-navy/8 bg-white/80 p-8 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:grid-cols-[1.1fr_1.6fr_auto] md:items-center md:gap-10 lg:p-10"
              >
                <div className="flex items-start gap-5">
                  <span className="icon-badge h-14 w-14 shrink-0 bg-gold-pale/70 text-gold transition-all group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_12px_28px_-8px_rgba(184,150,62,0.65)]">
                    <Icon name={serviceIcons[s.slug] ?? "audit"} className="h-7 w-7" />
                  </span>
                  <div>
                    <span className="text-[0.74rem] font-extrabold tracking-caps text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{s.name}</h2>
                  </div>
                </div>
                <div>
                  <p className="text-[0.95rem] leading-relaxed text-graphite/85">{s.short}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.deliverables.slice(0, 2).map((d) => (
                      <li key={d} className="rounded-full bg-mist px-3.5 py-1.5 text-[0.78rem] font-semibold text-navy/80 transition-colors group-hover:bg-gold-pale/60">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  className="hidden h-12 w-12 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep md:flex"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Форматы работы"
            title="Три формата под разные задачи"
            lead="Формат подбираем на первой консультации — исходя из задачи, а не из желания продать подороже."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <article
                  data-tilt="4"
                  className="spot spot-border group h-full rounded-2xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <span className="icon-badge h-12 w-12 bg-gold-pale/70 text-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_10px_24px_-8px_rgba(184,150,62,0.65)]">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-navy">{f.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-graphite/85">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

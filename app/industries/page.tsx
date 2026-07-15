import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon, { industryIcons } from "@/components/icons";
import { CTASection, PageHero, SectionTitle } from "@/components/ui";
import { industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Отрасли",
  description:
    "Отраслевая экспертиза FinAudit Group: торговля и e-commerce, строительство, IT, производство, услуги и внешнеэкономическая деятельность.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        variant="topo"
        eyebrow="Отрасли"
        title="Учёт и налоги говорят на языке отрасли"
        lead="Одинаковых компаний не бывает: у стройки — договоры подряда и субподряд, у маркетплейс-продавца — комиссии и возвраты, у IT — льготы и интеллектуальные права. Мы собираем команду под специфику клиента."
      />

      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={Math.min(i * 60, 180)}>
                <article
                  data-tilt="4"
                  className="spot spot-border group flex h-full flex-col rounded-3xl border border-navy/8 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <span className="icon-badge h-[52px] w-[52px] bg-gold-pale/70 text-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_10px_24px_-8px_rgba(184,150,62,0.65)]">
                    <Icon name={industryIcons[i] ?? "cart"} className="h-[26px] w-[26px]" />
                  </span>
                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-navy">{ind.name}</h2>
                  <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-graphite/85">{ind.text}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-navy/8 pt-5">
                    {ind.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-[0.86rem] font-semibold text-navy/85">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet-mist bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle
            eyebrow="Другая отрасль?"
            title="Работаем и за пределами этого списка"
            lead="Перечисленные отрасли — те, где у нас больше всего проектов. Если ваш бизнес из другой сферы, начнём с диагностики: изучим специфику и честно скажем, возьмёмся ли за задачу."
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}

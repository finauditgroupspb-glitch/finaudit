import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { CTASection, PageHero } from "@/components/ui";
import { cases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Примеры проектов FinAudit Group: аудит, восстановление учёта, налоговый консалтинг, юридические споры и постановка управленческого учёта.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        variant="ledger"
        eyebrow="Кейсы"
        title="Типовые проекты: задача, решение, результат"
        lead="Мы не раскрываем клиентов без их согласия, поэтому описываем проекты обезличенно — но именно так, как они происходят на практике."
      />

      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site space-y-8 px-5 lg:px-8">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 50, 150)} variant={i % 2 ? "right" : "left"}>
              <article className="spot spot-border group overflow-hidden rounded-3xl border border-navy/8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="grid lg:grid-cols-[1.1fr_1.9fr]">
                  {/* Левая колонка */}
                  <div className="relative overflow-hidden bg-navy-deep p-8 text-white lg:p-10">
                    <div className="ledger-grid absolute inset-0" aria-hidden="true" />
                    <span
                      className="pointer-events-none absolute -bottom-7 -right-2 text-[6.5rem] font-extrabold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-gold/10"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex h-full flex-col">
                      <div className="flex flex-wrap gap-2 text-[0.7rem] font-bold uppercase tracking-wider">
                        <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">{c.industry}</span>
                        <span className="rounded-full bg-gold/20 px-3 py-1.5 text-gold-light">{c.service}</span>
                      </div>
                      <h2 className="mt-6 flex-1 text-xl font-extrabold leading-snug md:text-2xl">
                        {c.title}
                      </h2>
                      <span className="mt-8 text-[0.72rem] font-bold uppercase tracking-caps text-silver/60">
                        Кейс {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Правая колонка */}
                  <div className="grid gap-8 bg-white p-8 md:grid-cols-2 lg:p-10">
                    <div className="space-y-7">
                      <div>
                        <h3 className="text-[0.74rem] font-bold uppercase tracking-caps text-graphite/60">Задача</h3>
                        <p className="mt-2.5 text-[0.93rem] leading-relaxed text-graphite">{c.problem}</p>
                      </div>
                      <div>
                        <h3 className="text-[0.74rem] font-bold uppercase tracking-caps text-graphite/60">Решение</h3>
                        <p className="mt-2.5 text-[0.93rem] leading-relaxed text-graphite">{c.solution}</p>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-mist p-6 transition-colors duration-300 group-hover:bg-gold-pale/40">
                      <h3 className="text-[0.74rem] font-bold uppercase tracking-caps text-gold">Результат</h3>
                      <ul className="mt-4 space-y-3.5">
                        {c.result.map((r) => (
                          <li key={r} className="flex gap-3 text-[0.9rem] font-semibold leading-relaxed text-navy">
                            <svg className="mt-1 h-4 w-4 shrink-0 text-gold" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path d="M3 8.5l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Узнаёте свою ситуацию?"
        text="Расскажите о задаче — оценим её и предложим план действий с понятной стоимостью."
      />
    </>
  );
}

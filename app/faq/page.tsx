import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { CTASection, PageHero } from "@/components/ui";
import { generalFaq, services } from "@/lib/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description:
    "Ответы на частые вопросы о работе с FinAudit Group: стоимость, форматы сотрудничества, ответственность, конфиденциальность.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        variant="weave"
        eyebrow="Вопросы и ответы"
        title="Всё, что обычно спрашивают перед началом работы"
        lead="Если вашего вопроса здесь нет — задайте его напрямую: по телефону, почте или в Telegram. Отвечаем в рабочее время в течение двух часов."
      />

      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="space-y-4">
            {generalFaq.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i * 50, 200)}>
                <details className="spot group rounded-2xl border border-navy/8 bg-white p-7 shadow-card transition-shadow open:shadow-lift">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.05rem] font-extrabold text-navy [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-all duration-300 group-open:rotate-45 group-open:bg-gold group-open:text-white" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-a">
                    <div>
                      <p className="mt-4 text-[0.96rem] leading-relaxed text-graphite/90">{f.a}</p>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="mt-14">
            <div className="spot spot-border rounded-3xl bg-mist p-8">
              <h2 className="text-lg font-extrabold text-navy">Вопросы по конкретным услугам</h2>
              <p className="mt-2 text-[0.9rem] text-graphite/85">
                На страницах услуг мы отвечаем на специализированные вопросы — о сроках аудита, восстановлении учёта, проверках и не только.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="inline-block rounded-full bg-white px-4 py-2 text-[0.84rem] font-bold text-navy shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Остался вопрос?" text="Спросите напрямую — консультация бесплатна и ни к чему не обязывает." />
    </>
  );
}

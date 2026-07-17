import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Icon, { serviceIcons } from "@/components/icons";
import { Eyebrow, PageHero, SectionTitle } from "@/components/ui";
import { services } from "@/lib/data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.name} — AUDIT D`, description: service.short },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["RU", "KZ", "BY", "AM", "KG"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: site.url },
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${site.url}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero variant="beams" eyebrow="Услуга" title={service.name} lead={service.lead}>
        <Link
          href="#service-form"
          data-magnetic
          className="btn-sheen inline-block rounded-full bg-gold px-8 py-4 text-[0.95rem] font-extrabold text-navy-deep shadow-[0_14px_32px_-12px_rgba(184,150,62,0.7)] transition-all hover:-translate-y-0.5 hover:bg-gold-light"
        >
          Обсудить задачу
        </Link>
      </PageHero>

      {/* Описание + для кого */}
      <section className="sheet bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <nav className="mb-10 text-[0.82rem] font-semibold text-graphite/60" aria-label="Хлебные крошки">
            <Link href="/" className="link-underline hover:text-navy">Главная</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/services" className="link-underline hover:text-navy">Услуги</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-navy">{service.name}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-site gap-14 px-5 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <Reveal variant="left">
            <Eyebrow>Об услуге</Eyebrow>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-graphite/90">
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <aside className="spot spot-border group rounded-3xl bg-mist p-8 lg:p-9">
              <div className="flex items-center gap-4">
                <span className="icon-badge h-12 w-12 shrink-0 bg-white text-gold shadow-card group-hover:bg-gold group-hover:text-white">
                  <Icon name={serviceIcons[service.slug] ?? "audit"} className="h-6 w-6" />
                </span>
                <h2 className="text-[0.78rem] font-bold uppercase tracking-caps text-gold">Кому подходит</h2>
              </div>
              <ul className="mt-6 space-y-4">
                {service.forWhom.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.93rem] leading-relaxed text-navy">
                    <svg className="mt-1 h-4 w-4 shrink-0 text-gold" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 8.5l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Преимущества */}
      <section className="sheet-dark relative overflow-hidden bg-navy-deep py-20 text-white lg:py-24">
        <div className="ledger-grid absolute inset-0" aria-hidden="true" />
        <div
          data-parallax="0.1"
          className="hero-glow absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(184,150,62,0.14), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle light eyebrow="Что вы получаете" title="Почему это работает" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {service.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <article className="spot spot-dark h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-gold/50">
                  <h3 className="text-[1.05rem] font-extrabold">{b.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-silver/85">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс */}
      <section className="sheet bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <SectionTitle eyebrow="Как проходит работа" title="Процесс по шагам" />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80}>
                <div className="step-item h-full">
                  <span className="text-[0.78rem] font-extrabold tracking-caps text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold text-navy">{step.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-graphite/85">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="mt-14">
            <div className="spot spot-border rounded-3xl bg-mist p-8 lg:p-10">
              <h3 className="text-[0.78rem] font-bold uppercase tracking-caps text-gold">Результат работы</h3>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-[0.95rem] font-semibold text-navy">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ услуги */}
      <section className="sheet-mist bg-mist py-20 lg:py-24">
        <div className="mx-auto grid max-w-site gap-12 px-5 lg:grid-cols-[1fr_1.5fr] lg:px-8">
          <SectionTitle eyebrow="Вопросы" title="Частые вопросы об услуге" />
          <Reveal delay={100}>
            <div className="space-y-3">
              {service.faq.map((f) => (
                <details key={f.q} className="group rounded-2xl bg-white p-6 shadow-card transition-shadow open:shadow-lift">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-extrabold text-navy [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist transition-all duration-300 group-open:rotate-45 group-open:bg-gold group-open:text-white" aria-hidden="true">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* Форма + другие услуги */}
      <section id="service-form" className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-24">
        <div className="ledger-grid absolute inset-0" aria-hidden="true" />
        <div
          data-parallax="0.12"
          className="hero-glow absolute -right-36 top-0 h-[460px] w-[460px] rounded-full opacity-55"
          style={{ background: "radial-gradient(circle, rgba(184,150,62,0.18), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-site gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <Eyebrow light>Следующий шаг</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Обсудим вашу задачу по направлению «{service.name.toLowerCase()}»
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-silver/90">
              Оставьте заявку — зададим несколько вопросов и назовём стоимость и сроки. Консультация бесплатна.
            </p>
            <div className="mt-10">
              <p className="text-[0.72rem] font-bold uppercase tracking-caps text-gold-light">Смежные услуги</p>
              <ul className="mt-4 space-y-2.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="link-underline text-[0.95rem] font-semibold text-silver hover:text-white">
                      {o.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="right" delay={140}>
            <div className="glow-card rounded-3xl shadow-lift">
              <div className="glow-inner rounded-3xl bg-white p-7 lg:p-9">
                <h3 className="text-xl font-extrabold text-navy">Оставить заявку</h3>
                <div className="mt-6">
                  <ContactForm topic={service.name} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

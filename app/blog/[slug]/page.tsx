import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Ambient from "@/components/fx/Ambient";
import { CTASection } from "@/components/ui";
import { posts } from "@/lib/data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "ru",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: site.url },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article>
        <header className="relative overflow-hidden bg-navy-deep pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
          <div className="ledger-grid absolute inset-0" aria-hidden="true" />
          <Ambient variant="aurora" />
          <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
            <nav className="hero-up hero-up-1 text-[0.82rem] font-semibold text-silver/70" aria-label="Хлебные крошки">
              <Link href="/blog" className="link-underline hover:text-white">Блог</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-gold-light">{post.category}</span>
            </nav>
            <h1 className="hero-up hero-up-2 mt-6 text-3xl font-extrabold leading-tight tracking-tight md:text-[2.6rem]">
              {post.title}
            </h1>
            <div className="hero-up hero-up-3 mt-6 flex flex-wrap items-center gap-4 text-[0.84rem] font-semibold text-silver/75">
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} чтения</span>
              <span aria-hidden="true">·</span>
              <span>Команда AUDIT D</span>
            </div>
          </div>
        </header>

        <div className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <p className="border-l-2 border-gold pl-6 text-lg font-semibold leading-relaxed text-navy">
              {post.excerpt}
            </p>

            <div className="mt-10 space-y-10">
              {post.body.map((section, i) => (
                <Reveal key={i} as="section">
                  {section.heading && (
                    <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-navy">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} className="text-[1.02rem] leading-[1.8] text-graphite">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <div className="rounded-3xl bg-mist p-8">
                <p className="text-[0.78rem] font-bold uppercase tracking-caps text-gold">От редакции</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-graphite">
                  Статья носит информационный характер и не заменяет консультацию по вашей конкретной
                  ситуации. Законодательство меняется — прежде чем принимать решение, сверьтесь с актуальными
                  нормами или задайте вопрос нашим специалистам.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Похожие статьи */}
        <section className="bg-mist py-16 lg:py-20">
          <div className="mx-auto max-w-site px-5 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy">Читайте также</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="text-[0.72rem] font-bold uppercase tracking-wider text-gold">{p.category}</span>
                  <h3 className="mt-3 flex-1 text-[1rem] font-extrabold leading-snug text-navy">{p.title}</h3>
                  <span className="mt-4 text-[0.78rem] font-semibold text-graphite/60">{p.dateLabel}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CTASection />
    </>
  );
}

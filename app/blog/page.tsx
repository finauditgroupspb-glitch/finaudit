import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { CTASection, PageHero } from "@/components/ui";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи AUDIT D об аудите, налогах, бухгалтерии и управленческом учёте — простым языком для собственников и руководителей.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        variant="aurora"
        eyebrow="Блог"
        title="Финансы бизнеса — простым языком"
        lead="Пишем о том, о чём нас спрашивают клиенты: налоги, проверки, учёт и управление деньгами. Без канцелярита и переписывания кодекса."
      />
      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <BlogList
            items={posts.map(({ slug, category, title, excerpt, dateLabel, readingTime }) => ({
              slug, category, title, excerpt, dateLabel, readingTime,
            }))}
          />
        </div>
      </section>
      <CTASection
        title="Вопрос по вашей ситуации?"
        text="Статьи дают общую картину, но каждая компания уникальна. Разберём именно ваш случай на бесплатной консультации."
      />
    </>
  );
}

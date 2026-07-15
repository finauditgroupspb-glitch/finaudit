"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogCard = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  readingTime: string;
};

const PAGE_SIZE = 4;

export default function BlogList({ items }: { items: BlogCard[] }) {
  const categories = useMemo(
    () => ["Все", ...Array.from(new Set(items.map((p) => p.category)))],
    [items]
  );
  const [category, setCategory] = useState("Все");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const byCat = category === "Все" || p.category === category;
      const byQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return byCat && byQuery;
    });
  }, [items, category, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div>
      {/* Панель поиска и фильтров */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Категории статей">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-[0.84rem] font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                category === c
                  ? "bg-navy text-white"
                  : "bg-mist text-navy/75 hover:bg-navy/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Поиск по статьям</span>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/50"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Поиск по статьям"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="field w-full rounded-full border border-navy/15 bg-white py-3 pl-11 pr-5 text-[0.9rem] text-navy caret-gold placeholder:text-graphite/45 focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      {/* Список статей */}
      {visible.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-mist p-12 text-center">
          <p className="text-lg font-extrabold text-navy">По запросу ничего не найдено</p>
          <p className="mt-2 text-[0.92rem] text-graphite/80">
            Измените запрос или выберите другую категорию.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="spot spot-border group flex h-full flex-col rounded-3xl border border-navy/8 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center gap-3 text-[0.74rem] font-bold uppercase tracking-wider">
                <span className="rounded-full bg-gold-pale px-3 py-1.5 text-gold">{p.category}</span>
                <span className="text-graphite/55">{p.dateLabel}</span>
              </div>
              <h2 className="mt-5 flex-1 text-[1.2rem] font-extrabold leading-snug text-navy">
                {p.title}
              </h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite/85">{p.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-navy/8 pt-4">
                <span className="text-[0.78rem] font-semibold text-graphite/60">
                  {p.readingTime} чтения
                </span>
                <span className="text-[0.86rem] font-bold text-gold transition-colors group-hover:text-navy">
                  Читать →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Пагинация */}
      {pages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Пагинация">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={`h-11 w-11 rounded-full text-[0.9rem] font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                n === current ? "bg-navy text-white" : "bg-mist text-navy/75 hover:bg-navy/10"
              }`}
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

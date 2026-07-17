import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { company, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Условия использования сайта AUDIT D.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

const sections = [
  {
    h: "1. Предмет соглашения",
    p: [
      "Настоящее соглашение регулирует порядок использования сайта AUDIT D. Получая доступ к сайту, вы принимаете условия соглашения в полном объёме. Если вы не согласны с условиями, пожалуйста, не используйте сайт.",
      `Владелец сайта и правообладатель его материалов — ${company.shortName}, ИНН ${company.inn}, ОГРН ${company.ogrn}. Адрес: ${company.address}.`,
    ],
  },
  {
    h: "2. Характер информации на сайте",
    p: [
      "Материалы сайта, включая статьи блога и описания услуг, носят информационный характер и не являются публичной офертой, индивидуальной консультацией или гарантией результата. Условия оказания услуг определяются договором, заключаемым с клиентом.",
      "Законодательство и правоприменительная практика меняются: прежде чем принимать решения на основе материалов сайта, сверьтесь с актуальными нормами или получите консультацию специалиста.",
    ],
  },
  {
    h: "3. Интеллектуальная собственность",
    p: [
      "Тексты, элементы дизайна, логотип и иные материалы сайта являются объектами интеллектуальных прав. Использование материалов допускается с указанием источника; коммерческое использование — только с письменного согласия правообладателя.",
    ],
  },
  {
    h: "4. Ограничение ответственности",
    p: [
      "Мы стремимся поддерживать точность информации на сайте, однако не гарантируем отсутствие неточностей и не несём ответственности за решения, принятые пользователем самостоятельно на основании материалов сайта, а также за временную недоступность сайта по техническим причинам.",
    ],
  },
  {
    h: "5. Обратная связь",
    p: [
      `Вопросы по работе сайта и настоящему соглашению направляйте на ${site.email} или по телефону ${site.phone}.`,
    ],
  },
];

// Email в тексте всегда рендерится рабочей mailto-ссылкой.
function linkifyEmail(text: string) {
  const parts = text.split(site.email);
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [
          part,
          <a key={i} href={`mailto:${site.email}`} className="underline decoration-gold/60 underline-offset-2 hover:text-gold">
            {site.email}
          </a>,
        ]
      : [part]
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHero variant="calm" eyebrow="Документы" title="Пользовательское соглашение" lead="Условия использования сайта и материалов AUDIT D." />
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-5 lg:px-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-extrabold tracking-tight text-navy">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.p.map((t) => (
                  <p key={t.slice(0, 24)} className="text-[0.98rem] leading-[1.8] text-graphite">{linkifyEmail(t)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

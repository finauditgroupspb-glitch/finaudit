import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Icon, { type IconName } from "@/components/icons";
import { TelegramIcon } from "@/components/Header";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с AUDIT D: телефон, email, Telegram. Бесплатная первичная консультация для компаний и предпринимателей.",
  alternates: { canonical: "/contacts" },
};

const audiences: { t: string; d: string; c: string; icon: IconName }[] = [
  { t: "Новым клиентам", d: "Оценка задачи, коммерческое предложение, договор.", c: "Заявка на сайте или телефон", icon: "spark" },
  { t: "Кандидатам", d: "Вакансии, резюме, вопросы о работе в компании.", c: "Telegram", icon: "mentor" },
  { t: "Действующим клиентам", d: "Вопросы по текущим проектам и документам.", c: "Ваш менеджер или email", icon: "loop" },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        variant="signal"
        eyebrow="Контакты"
        title="Мы на связи — выбирайте удобный канал"
        lead="Телефон, почта или Telegram: отвечаем в рабочее время в течение двух часов. Первая консультация бесплатна."
      />

      <section className="sheet bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-site gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          {/* Большая контактная карточка */}
          <Reveal variant="left">
            <div className="glow-card h-full rounded-3xl shadow-lift">
              <div className="glow-inner relative flex flex-col overflow-hidden rounded-3xl bg-navy-deep p-9 text-white lg:p-12">
                <div className="ledger-grid absolute inset-0" aria-hidden="true" />
                <div
                  className="hero-glow absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full opacity-60"
                  style={{ background: "radial-gradient(circle, rgba(184,150,62,0.22), transparent 65%)" }}
                  aria-hidden="true"
                />
                <div className="relative flex flex-1 flex-col">
                  <p className="eyebrow-line text-[0.74rem] font-bold uppercase tracking-caps text-gold-light">AUDIT D</p>

                  <div className="mt-8 space-y-8">
                    <div>
                      <p className="text-[0.78rem] font-semibold text-silver/70">Телефон</p>
                      <a href={site.phoneHref} className="mt-1 block text-3xl font-extrabold tracking-tight transition-colors hover:text-gold-light md:text-4xl">
                        {site.phone}
                      </a>
                      <p className="mt-1.5 text-[0.84rem] text-silver/70">{site.workHours}. Нажмите на номер, чтобы позвонить.</p>
                    </div>

                    <div>
                      <p className="text-[0.78rem] font-semibold text-silver/70">Email</p>
                      <a href={`mailto:${site.email}`} className="link-underline mt-1 inline-block text-xl font-bold hover:text-gold-light">
                        {site.email}
                      </a>
                    </div>

                    <div>
                      <p className="text-[0.78rem] font-semibold text-silver/70">Telegram</p>
                      <a
                        href={site.telegramHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-sheen mt-2 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 text-[1rem] font-bold backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15"
                      >
                        <TelegramIcon className="h-5 w-5 text-gold-light" />
                        Telegram
                      </a>
                      <p className="mt-2 text-[0.84rem] text-silver/70">
                        По вакансиям и общим вопросам напишите нам в Telegram.
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-white/10 pt-8">
                    <p className="text-[0.78rem] font-semibold text-silver/70">География</p>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-silver">
                      {site.city}, Россия · работаем дистанционно с клиентами по всей России,
                      в Казахстане, Беларуси, Армении и Кыргызстане.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Форма */}
          <Reveal variant="right" delay={130}>
            <div className="spot spot-border h-full rounded-3xl border border-navy/8 bg-white p-8 shadow-card lg:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Оставить заявку</h2>
              <p className="mt-2 text-[0.9rem] text-graphite/80">
                Опишите задачу — перезвоним, зададим вопросы и предложим формат работы с точной ценой.
              </p>
              <div className="mt-7">
                <ContactForm topic="Страница контактов" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Кому писать по каким вопросам */}
        <div className="mx-auto mt-10 grid max-w-site gap-5 px-5 md:grid-cols-3 lg:px-8">
          {audiences.map((x, i) => (
            <Reveal key={x.t} delay={i * 70}>
              <div className="spot spot-border group h-full rounded-2xl bg-mist p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="icon-badge h-11 w-11 bg-white text-gold shadow-card group-hover:bg-gold group-hover:text-white">
                  <Icon name={x.icon} className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-4 text-[1rem] font-extrabold text-navy">{x.t}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-graphite/85">{x.d}</p>
                <p className="mt-4 text-[0.82rem] font-bold text-gold">{x.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

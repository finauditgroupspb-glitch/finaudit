import Link from "next/link";
import Ambient from "@/components/fx/Ambient";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy-deep text-white">
      <div className="ledger-grid absolute inset-0" aria-hidden="true" />
      <Ambient variant="constellation" />
      <div
        className="hero-glow absolute -right-40 top-0 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(184,150,62,0.2), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-5 py-32 lg:px-8">
        <p className="hero-up hero-up-1 eyebrow-line text-[0.74rem] font-bold uppercase tracking-caps text-gold-light">
          Ошибка 404
        </p>
        <h1 className="hero-up hero-up-2 mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Эта страница не прошла аудит: её не существует
        </h1>
        <p className="hero-up hero-up-3 mt-6 max-w-xl text-lg leading-relaxed text-silver/90">
          Возможно, страница была перемещена или в адресе опечатка. Начните с главной — или напишите нам, если что-то сломалось.
        </p>
        <div className="hero-up hero-up-4 mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/" data-magnetic className="btn-sheen rounded-full bg-gold px-8 py-4 text-center text-[0.95rem] font-extrabold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light">
            На главную
          </Link>
          <Link href="/contacts" data-magnetic className="rounded-full border border-white/25 bg-white/[0.03] px-8 py-4 text-center text-[0.95rem] font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light">
            Связаться с нами
          </Link>
        </div>
        <p className="mt-12 text-[0.88rem] text-silver/60">
          Телефон: <a href={site.phoneHref} className="font-bold text-silver hover:text-white">{site.phone}</a>
        </p>
      </div>
    </section>
  );
}

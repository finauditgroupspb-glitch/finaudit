import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/ui";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Реквизиты",
  description: "Юридические реквизиты и сведения о регистрации ООО «АУДИТ Д».",
  alternates: { canonical: "/company-info" },
};

const companyDetails = [
  ["Полное наименование", company.legalName],
  ["ИНН", company.inn],
  ["ОГРН", company.ogrn],
  ["КПП", company.kpp],
  ["Уставный капитал", company.capital],
] as const;

const management = [
  ["Генеральный директор", company.director],
  ["Учредители", company.founders.join(", ")],
] as const;

const registration = [
  ["Дата регистрации", company.registrationDate],
  ["Регистрирующий орган", company.registrationAuthority],
] as const;

function InfoRows({ rows }: { rows: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className="divide-y divide-navy/8 overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-card">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-2 px-6 py-5 md:grid-cols-[minmax(220px,0.75fr)_1.5fr] md:gap-8 lg:px-8"
        >
          <dt className="text-[0.78rem] font-bold uppercase tracking-wider text-gold">{label}</dt>
          <dd className="break-words text-[0.95rem] font-semibold leading-relaxed text-navy">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function CompanyInfoPage() {
  const mapHref = `https://yandex.ru/maps/?mode=search&text=${encodeURIComponent(company.address)}`;

  return (
    <>
      <PageHero variant="ledger" eyebrow="Компания" title="Реквизиты" />

      <section className="sheet bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Основные сведения</h2>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <div className="mb-6 rounded-3xl border border-navy/8 bg-mist p-6 shadow-card lg:p-8">
              <p className="text-[0.78rem] font-bold uppercase tracking-wider text-gold">Юридический адрес</p>
              <div className="mt-3 grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
                <p className="max-w-4xl text-[0.98rem] font-semibold leading-relaxed text-navy">{company.address}</p>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Открыть на карте адрес: ${company.address}`}
                  className="btn-sheen inline-flex shrink-0 items-center justify-center rounded-full bg-navy px-6 py-3 text-[0.86rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-soft"
                >
                  Открыть на карте
                </a>
              </div>
            </div>
            <InfoRows rows={companyDetails} />
          </Reveal>
        </div>
      </section>

      <section className="sheet-mist bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Руководство</h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <InfoRows rows={management} />
          </Reveal>
        </div>
      </section>

      <section className="sheet bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Государственная регистрация
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <InfoRows rows={registration} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

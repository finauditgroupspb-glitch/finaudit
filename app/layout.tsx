import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import Effects from "@/components/fx/Effects";
import Preloader from "@/components/fx/Preloader";
import { company, site } from "@/lib/site";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "АУДИТ Д — аудит, бухгалтерия и налоговый консалтинг для бизнеса",
    template: "%s — AUDIT D",
  },
  description: site.description,
  keywords: [
    "аудит",
    "бухгалтерское сопровождение",
    "налоговый консалтинг",
    "юридическое сопровождение бизнеса",
    "аудиторская компания",
    "AUDIT D",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: site.name,
    title: "AUDIT D — аудит, бухгалтерия и налоговый консалтинг",
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: "AUDIT D",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#071425",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: company.legalName,
  taxID: company.inn,
  foundingDate: company.registrationDateIso,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  areaServed: ["RU", "KZ", "BY", "AM", "KG"],
  address: {
    "@type": "PostalAddress",
    postalCode: "190121",
    addressLocality: "Санкт-Петербург",
    streetAddress: "пр-кт Римского-Корсакова, д. 61, литера А, помещ. 3-Н, офис 4",
    addressCountry: "RU",
  },
};

/**
 * Крошечный блокирующий скрипт: до первой отрисовки решает,
 * показывать ли премиальный экран-интро (один раз за сессию,
 * не показывается при prefers-reduced-motion).
 */
const introScript = `try{if(!sessionStorage.getItem("fa-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-intro","1");sessionStorage.setItem("fa-intro","1")}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="font-sans" id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Preloader />
        <Effects />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}

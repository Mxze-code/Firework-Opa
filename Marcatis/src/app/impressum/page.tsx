import type { Metadata } from "next";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true },
};

export default function ImpressumPage() {
  return (
    <div className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-600">Rechtliches</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50">Impressum</h1>
        <div className="mt-12 space-y-10 text-sm leading-relaxed text-zinc-500">
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">Angaben gemäß § 5 TMG</h2>
            <p>
              {company.legalName}
              <br />
              {company.street}
              <br />
              {company.zip} {company.city}
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">Kontakt</h2>
            <p>
              Telefon: {company.phone}
              <br />
              Mobil: {company.mobile}
              <br />
              E-Mail: {company.email}
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">Vertretungsberechtigt</h2>
            <p>Geschäftsführender Gesellschafter: {company.managingDirector}</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">Registereintrag</h2>
            <p>
              Registergericht: {company.registerCourt}
              <br />
              Registernummer: {company.registerNumber}
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {company.vatId}</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">Steuer-Nr.</h2>
            <p>{company.taxNumber}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

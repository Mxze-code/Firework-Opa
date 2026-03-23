import type { Metadata } from "next";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: true },
};

export default function DatenschutzPage() {
  return (
    <div className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-600">Rechtliches</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50">Datenschutzerklärung</h1>
        <p className="mt-6 text-sm leading-relaxed text-zinc-500">
          Grundlage für den Relaunch — bitte durch eine Rechtsberatung finalisieren, sobald Hosting und Tracking-Tools
          feststehen.
        </p>
        <div className="mt-12 space-y-10 text-sm leading-relaxed text-zinc-500">
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">1. Verantwortlicher</h2>
            <p>
              {company.legalName}
              <br />
              {company.street}
              <br />
              {company.zip} {company.city}
              <br />
              {company.country}
              <br />
              <br />
              Telefon: {company.phone}
              <br />
              E-Mail: {company.email}
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">2. Hosting</h2>
            <p>
              Beim Aufruf werden serverseitig technisch notwendige Daten verarbeitet. Bitte ergänzen Sie Anbieter,
              Serverstandort und Auftragsverarbeitung.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">3. Kontaktaufnahme</h2>
            <p>
              Daten aus E-Mail oder Telefonat werden zur Bearbeitung der Anfrage genutzt (Art. 6 Abs. 1 lit. b bzw. f
              DSGVO).
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">4. Cookies & Analyse</h2>
            <p>Bitte konkretisieren oder „nicht eingesetzt“ bestätigen.</p>
          </section>
          <section className="space-y-2">
            <h2 className="font-medium text-zinc-200">5. Rechte</h2>
            <p>Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Beschwerde bei einer Aufsichtsbehörde.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

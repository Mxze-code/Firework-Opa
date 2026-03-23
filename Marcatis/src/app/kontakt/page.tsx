import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedContent } from "@/components/animations/AnimatedContent";
import { TextBlockReveal } from "@/components/animations/TextBlockReveal";
import { WhisperText } from "@/components/animations/WhisperText";
import { MarcatisLocationMap } from "@/components/industrial/MarcatisLocationMap";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt & Profil",
  description: `Kontakt zu ${company.brand}: Telefon, E-Mail und Standort in Aschaffenburg.`,
};

export default function KontaktPage() {
  return (
    <div className="border-t border-white/10 bg-black">
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <TextBlockReveal
            as="h1"
            text="Kontakt & Profil"
            className="font-[family-name:var(--font-display)] max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
          />
          <WhisperText className="mt-6 max-w-xl text-base leading-relaxed text-zinc-500" delay={0.06}>
            Kurze Wege, klare Kommunikation — von der Machbarkeitsprüfung bis zur Serienfertigung.
          </WhisperText>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <AnimatedContent className="lg:col-span-5">
            <div className="space-y-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-600">Unternehmen</p>
                <h2 className="mt-3 text-xl font-semibold text-zinc-100">{company.legalName}</h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                  Geschäftsführender Gesellschafter: {company.managingDirector}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                  {company.street}
                  <br />
                  {company.zip} {company.city}
                  <br />
                  {company.country}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-600">Erreichbarkeit</p>
                <div className="mt-4 space-y-2 text-sm">
                  <a className="block font-medium text-zinc-200 hover:text-red-500" href={`tel:${company.phoneTel}`}>
                    {company.phone}
                  </a>
                  <a className="block text-zinc-500 hover:text-red-500" href={`tel:${company.mobileTel}`}>
                    Mobil {company.mobile}
                  </a>
                  <a className="block text-zinc-500 hover:text-red-500" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-surface/50 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-600">Arbeiten mit uns</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  Anforderungen einreichen — wir prüfen Machbarkeit, benennen Formate (STEP, DXF, IGES, STL, PDF, AI/EPS/SVG)
                  und liefern ein nachvollziehbares Angebot. Von Prototyp bis MES/ERP-fähiger Anbindung.
                </p>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.08} className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-surface/30 p-8 sm:p-10">
              <h2 className="text-lg font-semibold text-zinc-100">Nachricht senden</h2>
              <p className="mt-2 text-sm text-zinc-500">Wir melden uns schnellstmöglich zurück.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>

      <MarcatisLocationMap insetClassName="mx-auto w-full max-w-6xl px-6" />
    </div>
  );
}

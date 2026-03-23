import { CapabilitiesPhotoCarousel } from "@/components/industrial/CapabilitiesPhotoCarousel";
import { FaqAccordion } from "@/components/industrial/FaqAccordion";
import { KundenstimmenGrid } from "@/components/industrial/KundenstimmenGrid";
import { sectionInset } from "@/components/industrial/sectionInset";
import { capabilitiesGallerySlides } from "@/content/marcatisPhotos";
import {
  capabilitiesKpis,
  faqCompact,
  faqSection,
  testimonials,
  trustSection,
  whyMarcatis,
} from "@/content/site";

/** Capabilities: kompakter Text, KPI-Zeile, Karussell statt mehrerer Vollbild-Blöcke, Referenzen, FAQ. */
export function SectionCapabilities() {
  return (
    <div className="w-full">
      <div className="w-full bg-m-red">
        <div className={`${sectionInset} py-16 md:py-20 lg:py-24`}>
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.35em] text-black/70">
            CAPABILITIES
          </p>
          <h2 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-tight text-black md:mt-8">
            Messbare Substanz.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/75 md:text-base">
            Beschriftung, Feinschneiden und 3D-Gravur — ein Qualitätsmaßstab für Prototyp, Kleinserie und Integration.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-black/25 pt-10 md:mt-12 md:gap-x-14 md:pt-12">
            {capabilitiesKpis.map((k) => (
              <div key={k.label} className="min-w-[7rem]">
                <p className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,3rem)] font-bold leading-none tracking-tight text-black">
                  {k.value}
                </p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-black/75">{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-black">
        <div className={`${sectionInset} py-16 md:py-20 lg:py-24`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
            <div className="lg:col-span-5">
              <h3 className="max-w-3xl font-[family-name:var(--font-display)] text-xl font-bold uppercase leading-tight tracking-tight text-white md:text-2xl">
                {whyMarcatis.headline}
              </h3>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500 md:mt-8 md:text-base md:leading-relaxed">
                {whyMarcatis.intro}
              </p>
              <ul className="mt-8 max-w-2xl space-y-4 border-l border-m-red/35 pl-6 text-sm leading-relaxed text-zinc-400 md:mt-10 md:text-[0.9375rem]">
                {whyMarcatis.highlights.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.3em] text-zinc-600">
                IMPRESSIONEN
              </p>
              <div className="mt-5 w-full">
                <CapabilitiesPhotoCarousel slides={capabilitiesGallerySlides} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="kundenstimmen"
        className="w-full border-t border-white/10 bg-black"
        aria-labelledby="kundenstimmen-heading"
      >
        <div className={`${sectionInset} py-16 md:py-20 lg:py-24`}>
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.35em] text-m-red">
            REFERENZEN · PRAXIS
          </p>
          <h2
            id="kundenstimmen-heading"
            className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-tight tracking-tight text-white md:mt-8"
          >
            {trustSection.headline}
          </h2>
          {trustSection.intro ? (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 md:mt-6 md:text-base">
              {trustSection.intro}
            </p>
          ) : null}

          <div className="mt-14 border-t border-white/10 pt-14 md:mt-16 md:pt-16">
            <KundenstimmenGrid items={testimonials} />
          </div>

          <div className="relative left-1/2 mt-24 w-screen -translate-x-1/2 border-t border-zinc-200 bg-paper text-zinc-900 md:mt-28 lg:mt-32">
            <div className={`${sectionInset} py-14 md:py-16 lg:py-20`}>
              <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.3em] text-m-red">
                {faqSection.kicker}
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight text-zinc-900 md:mt-5 md:text-3xl">
                {faqSection.title}
              </h3>
              <div className="mt-10 md:mt-12">
                <FaqAccordion items={faqCompact} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

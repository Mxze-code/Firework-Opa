import { company, companyMap } from "@/content/site";

type MarcatisLocationMapProps = {
  /** Horizontales Padding / Max-Breite — Standard wie Industrial-Sections. */
  insetClassName: string;
};

/**
 * Standort: Adresse, Route-CTA und eingebettete Karte im Industrial-Rahmen
 * (nicht „nacktes“ Embed).
 */
export function MarcatisLocationMap({ insetClassName }: MarcatisLocationMapProps) {
  return (
    <div className="border-t border-white/10 bg-black">
      <div className={`${insetClassName} py-16 md:py-20 lg:py-24`}>
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between lg:col-span-4 xl:col-span-3">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.35em] text-m-red">
                STANDORT
              </p>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold uppercase leading-tight tracking-tight text-white md:text-2xl">
                {company.legalName}
              </h3>
              <address className="mt-8 not-italic">
                <p className="text-sm font-medium leading-relaxed tracking-wide text-zinc-200 md:text-base">
                  {company.street}
                  <br />
                  {company.zip} {company.city}
                  <br />
                  {company.country}
                </p>
              </address>
              <p className="mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                <span className="inline-flex h-2 w-2 rounded-full bg-m-red shadow-[0_0_12px_rgba(220,38,38,0.55)]" aria-hidden />
                Standort in der Karte markiert
              </p>
            </div>

            <div className="mt-10 space-y-5 lg:mt-14">
              <div className="flex flex-col gap-1 text-sm text-zinc-400">
                <a
                  href={`tel:${company.phoneTel}`}
                  className="w-fit font-medium text-zinc-200 transition-colors hover:text-m-red"
                >
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="w-fit transition-colors hover:text-m-red"
                >
                  {company.email}
                </a>
              </div>
              <a
                href={companyMap.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-industrial-outline inline-flex"
              >
                Route planen
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-m-red"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-sm border border-white/12 bg-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="relative aspect-[5/3] w-full md:aspect-[16/9] lg:aspect-auto lg:min-h-[min(56vh,560px)]">
                  <iframe
                    title="Karte: Standort Marcatis, Aschaffenburg"
                    src={companyMap.embedSrc}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="mt-4 font-[family-name:var(--font-mono)] text-[9px] font-medium uppercase tracking-[0.28em] text-zinc-600">
                Interaktive Karte · Zoomen und Verschieben im Feld
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

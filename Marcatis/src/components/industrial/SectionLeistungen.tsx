import Image from "next/image";
import { coreServices, coreServicesSection } from "@/content/site";
import { marcatisPhotos } from "@/content/marcatisPhotos";
import { sectionInset } from "@/components/industrial/sectionInset";

type ProcedureId = keyof typeof marcatisPhotos.procedures;

/** Solutions: direkt die drei Kernverfahren (ohne separates Positionierungs-Panel). */
export function SectionLeistungen() {
  return (
    <section
      id="solutions"
      className="scroll-mt-[4.75rem] border-t border-white/10 bg-black text-white md:scroll-mt-[5.25rem]"
    >
      <div className={`${sectionInset} py-24 md:py-28 lg:py-32`}>
        <header className="max-w-4xl">
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.35em] text-m-red">
            {coreServicesSection.kicker}
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-tight text-white md:mt-6">
            {coreServicesSection.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-500 md:mt-6 md:max-w-3xl md:text-lg">
            {coreServicesSection.subtitle}
          </p>
        </header>

        <div className="mt-14 grid gap-px bg-white/10 md:mt-16 md:grid-cols-3 lg:mt-20">
          {coreServices.map((s, i) => {
            const photo = marcatisPhotos.procedures[s.id as ProcedureId];
            return (
              <article key={s.id} id={s.id} className="flex min-h-0 flex-col bg-black">
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-zinc-900 sm:aspect-[5/4] md:aspect-[5/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className={photo.imageObjectClass}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8 md:p-9 lg:p-10">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.35em] text-zinc-600">
                    VERFAHREN {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold uppercase leading-tight tracking-tight text-white md:mt-5 md:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-m-red md:text-xs">
                    {s.lead}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-400 md:mt-6 md:text-[0.9375rem] md:leading-relaxed">
                    {s.body}
                  </p>
                  <div className="mt-6 flex flex-1 flex-col border-t border-white/10 pt-6 md:mt-8 md:pt-7">
                    <p className="font-[family-name:var(--font-mono)] text-[9px] font-semibold tracking-[0.28em] text-zinc-600">
                      {coreServicesSection.pointsLabel}
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm leading-snug text-zinc-500 md:mt-4 md:space-y-3">
                      {s.points.map((pt) => (
                        <li key={pt} className="border-l border-m-red/40 pl-3.5">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

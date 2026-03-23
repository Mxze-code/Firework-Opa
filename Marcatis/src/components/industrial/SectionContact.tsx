import Link from "next/link";
import { contactTeaser, company } from "@/content/site";
import { MarcatisLocationMap } from "@/components/industrial/MarcatisLocationMap";
import { sectionInset } from "@/components/industrial/sectionInset";

export function SectionContact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden border-t border-white/10 bg-zinc-950">
      <div
        className={`${sectionInset} flex flex-col gap-12 py-20 md:flex-row md:items-end md:justify-between md:gap-16 md:py-24 lg:py-28`}
      >
        <div className="max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold tracking-[0.35em] text-m-red">
            KONTAKT
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white md:mt-8">
            {contactTeaser.headline}
          </h2>
          <p className="mt-8 text-base leading-relaxed text-zinc-500 md:mt-10 md:text-lg md:leading-relaxed">
            {contactTeaser.body}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-5 md:items-end">
          <Link href="/kontakt" className="btn-industrial">
            Projekt anfragen
          </Link>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            {company.phone} · {company.email}
          </p>
        </div>
      </div>

      <MarcatisLocationMap insetClassName={sectionInset} />
    </section>
  );
}

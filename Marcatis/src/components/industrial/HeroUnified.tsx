import Image from "next/image";
import Link from "next/link";
import heroLaser from "@/assets/makatis-hero-laser.png";

/**
 * Laser-Key-Visual dominiert; Marcatis-Wordmark als Main Stage (statisch), ohne Header-Duplikat.
 */
export function HeroUnified() {
  return (
    <section id="hero" className="relative min-h-hero-viewport overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroLaser}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center scale-[1.02]"
          aria-hidden
        />

        {/* Cinematic vignette: Laser bleibt dominant, nur Randzonen abgedunkelt */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_20%,rgba(0,0,0,0.05),rgba(0,0,0,0.72))]" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[min(60vh,640px)] bg-gradient-to-t from-black/70 via-black/35 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-hero-viewport max-w-[1600px] flex-col justify-end px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        {/* Safari-stabiles Zwei-Spalten-Layout (Flex mit Min-Width statt Grid-Squeeze) */}
        <div className="flex flex-1 flex-col items-start gap-y-10">
          {/* Text: links mit stabiler Lesebreite */}
          <div className="pb-10 md:flex-1 md:min-w-[30rem] md:max-w-[52rem]">
            <h1 className="font-[family-name:var(--font-display)] text-[2.6rem] leading-[0.84] tracking-[-0.075em] text-white drop-shadow-[0_22px_85px_rgba(0,0,0,0.85)] sm:text-[3.5rem] md:text-[5.75rem] lg:text-[8.25rem] xl:text-[9.5rem]">
              PRÄZISION,
              <br />
              <span className="text-white/95">
                <span className="block whitespace-nowrap">DIE SICHTBAR</span>
                <span className="block whitespace-nowrap">BLEIBT.</span>
              </span>
            </h1>

            <div className="mt-10 flex flex-wrap gap-3 md:mt-12 md:gap-4">
              <Link href="/kontakt" className="btn-industrial">
                Projekt anfragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

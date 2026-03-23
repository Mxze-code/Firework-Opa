import Image from "next/image";
import { HeroHeadlineReveal } from "@/components/industrial/HeroHeadlineReveal";
import { marcatisPhotos } from "@/content/marcatisPhotos";

type HeroWithOptionalMobile = (typeof marcatisPhotos.hero) & { mobileSrc?: string };

/**
 * Dominantes Hero: echtes Marcatis-Laserbild (Photos/image-laser.png), premium & kontrastreich.
 * Mobile: eigener Bildstreifen mit mehr Höhe, Fokus auf Laserkopf/Schnitt; Headline darunter auf Schwarz
 * (kein Überdecken des Key-Visuals). Desktop: klassische Vollfläche mit Overlay unten.
 */
export function HeroUnifiedStable() {
  const hero = marcatisPhotos.hero as HeroWithOptionalMobile;
  const mobileSrc = hero.mobileSrc;
  const useSplitAssets = Boolean(mobileSrc && mobileSrc !== hero.src);

  return (
    <section id="hero" className="relative overflow-hidden bg-black hero-min-h-desktop">
      <div className="relative z-0 h-[min(68svh,620px)] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:h-auto hero-min-h-desktop md:shrink">
        {useSplitAssets ? (
          <>
            <Image
              src={mobileSrc!}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center md:hidden"
              quality={92}
              aria-hidden
            />
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              className={`hidden md:block ${hero.imageObjectClassDesktopOnly}`}
              quality={92}
            />
          </>
        ) : (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className={hero.imageObjectClass}
            quality={92}
          />
        )}

        {/* Mobile: stärkerer Übergang in den Textblock; Desktop: dezentes Editorial-Overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black md:bg-gradient-to-t md:from-black/50 md:via-transparent md:to-black/15"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent md:hidden"
          aria-hidden
        />
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black px-5 pb-14 pt-11 sm:px-8 md:absolute md:inset-0 md:flex hero-min-h-desktop md:border-0 md:bg-transparent md:px-10 md:pb-20 md:pt-0 lg:px-14 lg:pb-24 xl:px-16 2xl:px-24">
        <div className="flex w-full flex-col justify-end md:min-h-0 md:flex-1">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-5 lg:col-span-5 xl:max-w-[42rem]">
              <HeroHeadlineReveal />
            </div>

            <div className="hidden md:block md:col-span-7 lg:col-span-7" />
          </div>
        </div>
      </div>
    </section>
  );
}

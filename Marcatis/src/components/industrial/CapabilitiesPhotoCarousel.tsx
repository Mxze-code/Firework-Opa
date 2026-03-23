"use client";

import { PublicFillImage } from "@/components/PublicFillImage";
import { useCallback, useId, useRef, useState } from "react";

export type CarouselSlide = {
  src: string;
  alt: string;
  caption: string;
  /** Volle `object-*`-Kette inkl. `md:` für zuverlässiges Tailwind-JIT. */
  imageObjectClass: string;
};

type Props = {
  slides: readonly CarouselSlide[];
};

export function CapabilitiesPhotoCarousel({ slides }: Props) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback(
    (i: number) => {
      setIndex(((i % n) + n) % n);
    },
    [n]
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  if (n === 0) return null;

  const current = slides[index]!;

  return (
    <div
      className="w-full"
      role="region"
      aria-roledescription="Karussell"
      aria-label="Impressionen aus der Fertigung"
      aria-live="polite"
    >
      <div
        id={`${id}-panel`}
        className="relative aspect-[3/4] w-full max-h-[min(88svh,720px)] overflow-hidden rounded-sm border border-white/10 bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-m-red/70 sm:aspect-[5/4] md:aspect-[16/10] md:max-h-[min(72vh,640px)]"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
          }
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          touchX.current = null;
          if (start == null) return;
          const end = e.changedTouches[0]?.clientX;
          if (end == null) return;
          const d = start - end;
          if (d > 52) next();
          if (d < -52) prev();
        }}
      >
        <PublicFillImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          className={current.imageObjectClass}
          sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
          priority={index === 0}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pt-24 pb-3"
          aria-hidden
        />
        <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 md:left-6 md:right-6">
          {current.caption}
        </p>

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 bg-black/55 text-lg text-white backdrop-blur-sm transition-colors hover:border-m-red/50 hover:bg-black/75 md:left-4 md:h-12 md:w-12"
          aria-label="Vorheriges Bild"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 bg-black/55 text-lg text-white backdrop-blur-sm transition-colors hover:border-m-red/50 hover:bg-black/75 md:right-4 md:h-12 md:w-12"
          aria-label="Nächstes Bild"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Galerie">
        {slides.map((s, i) => {
          const active = i === index;
          const tabId = `${id}-tab-${i}`;
          const panelId = `${id}-panel`;
          return (
            <button
              key={s.src}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={active}
              aria-controls={panelId}
              onClick={() => go(i)}
              className={`h-2 w-2 rounded-full transition-colors md:h-2.5 md:w-2.5 ${
                active ? "bg-m-red" : "bg-white/25 hover:bg-white/45"
              }`}
              aria-label={`Bild ${i + 1} von ${n}: ${s.caption}`}
            />
          );
        })}
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-6 md:justify-center [&::-webkit-scrollbar]:hidden">
        {slides.map((s, i) => (
          <button
            key={`thumb-${s.src}`}
            type="button"
            onClick={() => go(i)}
            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border transition-colors md:h-16 md:w-24 ${
              i === index ? "border-m-red ring-1 ring-m-red/40" : "border-white/15 opacity-70 hover:opacity-100"
            }`}
            aria-label={`${s.caption} anzeigen`}
            aria-current={i === index}
          >
            <PublicFillImage src={s.src} alt="" className="object-cover object-center" sizes="96px" />
          </button>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { FireworksBackground } from "@/components/ui/fireworks-background";

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] w-full flex items-center justify-center">
      <FireworksBackground className="absolute inset-0">
        {/* Leichteres Overlay – Feuerwerk sichtbarer, unten etwas dunkler */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,20,25,0.4) 0%, rgba(15,20,25,0.35) 30%, rgba(15,20,25,0.5) 70%, rgba(15,20,25,0.9) 100%)",
          }}
        />
        {/* Leichter Vignetten-Effekt hinter dem Textblock für Lesbarkeit */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 45%, transparent 0%, rgba(15,20,25,0.25) 70%, rgba(15,20,25,0.5) 100%)",
          }}
        />

        <div className="relative z-20 flex min-h-[95vh] w-full flex-col items-center justify-center px-6 py-24 text-center">
          {/* Dezente obere Linie – traditionelles Element */}
          <div className="mb-8 h-px w-16 bg-[#c9a227]/50" />

          {/* Pre-Title */}
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#94a3b8]">
            Tradition seit 1951
          </p>

          {/* Haupt-Headline */}
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#f0f4f8] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] xl:leading-[1.1]">
            Feuerwerk von Hartmann
          </h1>

          {/* Untertext – kompakter, eleganter */}
          <p className="mt-6 max-w-2xl text-base text-[#94a3b8] md:text-lg lg:text-xl lg:leading-relaxed">
            Tradition, Erfahrung und zuverlässiger Feuerwerksverkauf seit
            Jahrzehnten. An Weiterverkäufer.
          </p>

          {/* CTA-Button – veredelt mit dezentem Hover */}
          <Link
            href="/katalog"
            className="mt-12 inline-block border-2 border-[#c9a227] bg-[#c9a227]/5 px-12 py-4 text-base font-semibold text-[#c9a227] transition-all duration-300 ease-out hover:bg-[#c9a227] hover:text-[#0f1419] hover:shadow-[0_4px_20px_rgba(201,162,39,0.15)] hover:-translate-y-0.5"
          >
            Zum Katalog
          </Link>

          {/* Dezente untere Linie */}
          <div className="mt-12 h-px w-16 bg-[#c9a227]/30" />
        </div>
      </FireworksBackground>
    </section>
  );
}

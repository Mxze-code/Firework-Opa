import Link from "next/link";
import { FireworksBackground } from "@/components/ui/fireworks-background";

export function HeroSection() {
  return (
    <section className="home-hero relative min-h-[100vh] w-full flex items-center justify-center">
      <FireworksBackground className="absolute inset-0">
        {/* Bühnen-Overlay: Feuerwerk bleibt sichtbar, Content-Ebene bekommt mehr Tiefe */}
        <div
          className="absolute inset-0 hero-bg-entrance"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,20,25,0.22) 0%, rgba(15,20,25,0.32) 40%, rgba(15,20,25,0.56) 70%, rgba(15,20,25,0.88) 100%)",
          }}
        />
        {/* Tieferes Center-Vignette hinter Headline/CTA – ruhige Bühne */}
        <div
          className="absolute inset-0 pointer-events-none hero-bg-entrance"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(15,20,25,0.88) 0%, rgba(15,20,25,0.58) 33%, rgba(15,20,25,0.18) 62%, rgba(15,20,25,0.55) 100%)",
          }}
        />

        <div className="relative z-20 flex min-h-[100vh] w-full flex-col items-center justify-center px-6 py-24 text-center">
          {/* Dezente obere Linie – traditionelles Element */}
          <div className="mb-8 h-[2px] w-24 bg-[#c9a227]/60" />

          {/* Pre-Title */}
          <p className="hero-entrance hero-entrance-1 text-sm font-medium tracking-[0.2em] uppercase text-[#94a3b8]">
            Tradition seit 1951
          </p>

          {/* Haupt-Headline */}
          <h1
            className="hero-entrance hero-entrance-2 mt-4 font-heading text-4xl font-bold tracking-tight text-[#f7fafc] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] xl:leading-[1.02]"
            style={{
              // Subtile, hochwertige Lichtkante + Schatten (kein kitschiger Glow)
              textShadow:
                "0 14px 45px rgba(0,0,0,0.65), 0 3px 0 rgba(0,0,0,0.35), 0 0 40px rgba(201,162,39,0.10)",
            }}
          >
            Feuerwerk von Hartmann
          </h1>

          {/* Untertext – kompakter, eleganter */}
          <p className="hero-entrance hero-entrance-3 mt-6 max-w-3xl text-base text-[#94a3b8] md:text-lg lg:text-xl lg:leading-relaxed">
            Tradition, Erfahrung und zuverlässiger Feuerwerksverkauf seit
            Jahrzehnten. Ganzjähriger Verkauf für Weiterverkäufer.
          </p>

          {/* CTA-Button – veredelt mit dezentem Hover */}
          <Link
            href="/katalog"
            className="hero-entrance hero-entrance-4 mt-12 inline-block border border-[#c9a227] bg-[#c9a227]/10 px-12 py-4 text-base font-semibold text-[#c9a227] transition-all duration-300 ease-out shadow-[inset_0_0_0_1px_rgba(201,162,39,0.12),0_18px_45px_rgba(0,0,0,0.45)] hover:bg-[#c9a227]/18 hover:text-[#f7fafc] hover:shadow-[inset_0_0_0_1px_rgba(201,162,39,0.22),0_22px_55px_rgba(0,0,0,0.6)] hover:-translate-y-1"
          >
            Zum Katalog
          </Link>

          {/* Dezente untere Linie */}
          <div className="mt-12 h-[1.5px] w-20 bg-[#c9a227]/35" />
        </div>
      </FireworksBackground>
    </section>
  );
}

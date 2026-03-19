"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useCart } from "@/lib/cart-context";

const navItems = [
  { href: "/", label: "Start" },
  { href: "/katalog", label: "Katalog" },
  { href: "/kontakt", label: "Kontakt / Über mich" },
];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logoSrc = `${basePath}/logo-hartmann.png?v=20260318`;

type CartParticle = {
  dx: number;
  dy: number;
  w: number;
  h: number;
  rot: number;
  color: string;
  delay: number;
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  const [burstParticles, setBurstParticles] = useState<CartParticle[] | null>(null);
  const burstTimeoutRef = useRef<number | null>(null);

  const triggerCartBurst = useCallback(() => {
    if (typeof window === "undefined") return;
    if (burstTimeoutRef.current != null) {
      window.clearTimeout(burstTimeoutRef.current);
      burstTimeoutRef.current = null;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const colors = ["#f8fafc", "#c9a227", "#d4b03a"];
    const count = 10;
    const maxDist = 22; // klein & edel, aber spürbar

    const particles: CartParticle[] = Array.from({ length: count }).map(
      (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 8 + Math.random() * maxDist;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist * 0.7;
        const size = 2 + Math.random() * 2.2;
        const rot = (Math.random() * 60 - 30) + (angle * 180) / Math.PI;
        return {
          dx,
          dy,
          w: size,
          h: size * (0.7 + Math.random() * 0.8),
          rot,
          color: colors[i % colors.length],
          delay: i * 10,
        };
      }
    );

    setBurstParticles(particles);
    burstTimeoutRef.current = window.setTimeout(() => {
      setBurstParticles(null);
      burstTimeoutRef.current = null;
    }, 480);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = () => triggerCartBurst();
    window.addEventListener("cart:burst", handler);
    return () => window.removeEventListener("cart:burst", handler);
  }, [triggerCartBurst]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-[#0f1419]/95 backdrop-blur-sm py-3" : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="flex w-full items-center justify-between px-6 md:px-10 lg:px-12 xl:px-16">
        <Link
          href="/"
          className="flex items-center shrink-0 animate-logo-float transition-transform duration-300 hover:scale-[1.01]"
        >
          <img
            src={logoSrc}
            alt="Hartmann UG & Co. KG"
            data-hartmann-logo
            className="h-12 w-auto max-w-none object-contain md:h-14 lg:h-16 xl:h-[4.5rem]"
            width={360}
            height={72}
            draggable={false}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-2.5 text-sm font-medium text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-white/5 rounded transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-4 h-6 w-px bg-[#2d3a4d]" aria-hidden />
          <Link
            href="/warenkorb"
            onClick={() => triggerCartBurst()}
            className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-white/5 rounded transition"
            aria-label="Warenkorb"
            data-cart-icon
          >
            <span
              className={`relative inline-flex items-center justify-center w-6 h-6 ${
                burstParticles ? "cart-icon-burst-bounce" : ""
              }`}
            >
              <svg
                className="relative z-10 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {burstParticles && (
                <div className="pointer-events-none absolute inset-0 z-0">
                  {burstParticles.map((p, idx) => (
                    <span
                      key={idx}
                      className="cart-particle"
                      style={
                        {
                          ["--dx" as any]: `${p.dx}px`,
                          ["--dy" as any]: `${p.dy}px`,
                          ["--w" as any]: `${p.w}px`,
                          ["--h" as any]: `${p.h}px`,
                          ["--rot" as any]: `${p.rot}deg`,
                          ["--c" as any]: p.color,
                          ["--delay" as any]: `${p.delay}ms`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
              )}
            </span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 z-10 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#c9a227] px-1.5 text-xs font-semibold text-[#0f1419]">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#94a3b8] hover:text-[#f0f4f8]"
          aria-label="Menü"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#2d3a4d] bg-[#0f1419] px-6 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-white/5 rounded transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/warenkorb"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-white/5 rounded transition"
            >
              Warenkorb
              {totalItems > 0 && (
                <span className="rounded bg-[#c9a227] px-2 py-0.5 text-xs font-semibold text-[#0f1419]">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

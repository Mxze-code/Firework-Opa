"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

const navItems = [
  { href: "/", label: "Start" },
  { href: "/katalog", label: "Katalog" },
  { href: "/kontakt", label: "Kontakt / Über mich" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            src="/logo-hartmann.png?v=20260318"
            alt="Hartmann UG & Co. KG"
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
            className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-white/5 rounded transition"
            aria-label="Warenkorb"
          >
            <svg
              className="h-5 w-5"
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
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#c9a227] px-1.5 text-xs font-semibold text-[#0f1419]">
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

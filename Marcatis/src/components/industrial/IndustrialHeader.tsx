"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import marcatisWordmark from "@/assets/marcatis-logo.png";

export function IndustrialHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const scaleItems = useMemo(() => {
    return nav
      .map((item, idx) => {
        const hashIdx = item.href.indexOf("#");
        const sectionId =
          hashIdx >= 0 ? item.href.slice(hashIdx + 1) : undefined;
        return {
          ...item,
          sectionId,
          index: String(idx + 1).padStart(2, "0"),
        };
      })
      .filter((it) => Boolean(it.sectionId));
  }, []);

  const [activeSectionId, setActiveSectionId] = useState<string>(
    scaleItems[0]?.sectionId ?? "solutions"
  );

  useEffect(() => {
    if (pathname !== "/") return;

    const nodes = scaleItems
      .map((it) => document.getElementById(it.sectionId as string))
      .filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.target instanceof HTMLElement)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveSectionId(visible.target.id);
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [pathname, scaleItems]);

  /**
   * Ein Raster über die volle Breite: j/M, j = 1 … M−1 — überall gleicher Abstand.
   * M = 2·n·K, damit jede Hauptmarke bei (i+½)/n exakt auf einem Gitterpunkt liegt (K = Dichte).
   */
  const nNav = scaleItems.length;
  const rulerK = 8;
  const rulerM = Math.max(16, 2 * Math.max(nNav, 1) * rulerK);
  const rulerMinorTicks: { leftPct: number; heightPx: number }[] = [];
  for (let j = 1; j < rulerM; j++) {
    rulerMinorTicks.push({
      leftPct: (j / rulerM) * 100,
      heightPx: j % 5 === 0 ? 5 : 2,
    });
  }

  const navColsTemplate = `repeat(${scaleItems.length}, minmax(0, 1fr))`;

  return (
    <header className="fixed top-0 z-[500] w-full border-b-2 border-m-red/50 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex w-full items-center justify-between gap-6 px-5 py-3 sm:px-8 md:px-10 md:py-4 lg:px-14 xl:px-16 2xl:px-24">
        <Link
          href="/"
          className="group flex min-h-[2.5rem] min-w-[2.5rem] shrink-0 items-center justify-start outline-none ring-m-red/60 focus-visible:ring-2"
          aria-label="Startseite"
        >
          <Image
            src={marcatisWordmark}
            alt="Marcatis"
            priority
            sizes="220px"
            className="h-9 w-auto drop-shadow-[0_4px_26px_rgba(0,0,0,0.55)] brightness-[1.03] contrast-[1.08] md:h-11 lg:h-12"
          />
        </Link>

        <nav className="hidden flex-1 justify-center md:flex">
          <div className="mx-auto w-full max-w-[720px] px-4">
            {/* Lineal: eine Basislinie; Kleinstriche auf ganzer Strecke zwischen Hauptmarken; Hauptstriche auf Label-Mitten */}
            <div className="relative h-[18px] w-full" aria-hidden>
              <div className="pointer-events-none absolute inset-x-0 top-[6px] h-px bg-white/10" />
              {rulerMinorTicks.map((t, idx) => (
                <span
                  key={`ruler-min-${idx}`}
                  className="pointer-events-none absolute top-[6px] w-px -translate-x-1/2 bg-white/[0.09]"
                  style={{ left: `${t.leftPct}%`, height: t.heightPx }}
                />
              ))}
              {scaleItems.map((item, i) => {
                const active = activeSectionId === item.sectionId;
                const leftPct = ((i + 0.5) / scaleItems.length) * 100;
                return (
                  <span
                    key={`ruler-maj-${item.href}`}
                    className={`pointer-events-none absolute top-[6px] h-[12px] w-px -translate-x-1/2 bg-white/12 ${
                      active ? "bg-m-red/50" : ""
                    }`}
                    style={{ left: `${leftPct}%` }}
                  />
                );
              })}
            </div>

            <div className="grid w-full pt-0.5" style={{ gridTemplateColumns: navColsTemplate }}>
              {scaleItems.map((item) => {
                const active = activeSectionId === item.sectionId;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex min-w-0 flex-col items-center justify-start gap-1 text-center transition-colors"
                  >
                    <span className="flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
                      <span
                        className={`h-[7px] w-[7px] shrink-0 rounded-[1px] transition-colors ${
                          active ? "bg-m-red" : "bg-white/25"
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`text-[9px] font-semibold tabular-nums tracking-[0.22em] ${
                          active ? "text-m-red" : "text-zinc-500"
                        }`}
                      >
                        {item.index}
                      </span>
                      <span
                        className={`text-[10px] font-semibold tracking-[0.22em] ${
                          active ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="hidden shrink-0 md:block">
          <Link href="/kontakt" className="text-[10px] font-semibold tracking-[0.2em] text-m-red">
            PROJEKT ANFRAGEN
          </Link>
        </div>

        <button
          type="button"
          className="text-[10px] font-semibold tracking-widest text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "SCHLIESSEN" : "MENÜ"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold tracking-widest text-zinc-300"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/kontakt" className="text-xs font-semibold tracking-widest text-m-red" onClick={() => setOpen(false)}>
              PROJEKT ANFRAGEN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

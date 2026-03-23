"use client";

import { useCallback, useId, useState } from "react";

export type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

/** FAQ wie auf der klassischen Site: 2 Spalten, helle Karten, zentrierte Texte, +/- zum Aufklappen. */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = useCallback((index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  const renderCard = (f: FaqItem, globalIndex: number) => {
    const isOpen = open.has(globalIndex);
    const panelId = `${baseId}-panel-${globalIndex}`;
    const headerId = `${baseId}-header-${globalIndex}`;

    return (
      <div
        key={globalIndex}
        className="border border-zinc-200/90 bg-zinc-100/90 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      >
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(globalIndex)}
          className="flex w-full items-center gap-4 px-5 py-4 md:px-6 md:py-5"
        >
          <span className="min-w-0 flex-1 text-center font-semibold leading-snug text-zinc-800 md:text-[0.9375rem]">
            {f.q}
          </span>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-lg font-light leading-none text-zinc-600 transition-transform duration-200"
            aria-hidden
            style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
          >
            +
          </span>
        </button>
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="border-t border-zinc-200/80 px-5 pb-5 pt-1 text-center text-sm leading-relaxed text-zinc-600 md:px-8 md:pb-6 md:text-[0.9375rem]">
              {f.a}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
      <div className="flex flex-col gap-4 md:gap-5">
        {left.map((f, colIdx) => renderCard(f, colIdx * 2))}
      </div>
      <div className="flex flex-col gap-4 md:gap-5">
        {right.map((f, colIdx) => renderCard(f, colIdx * 2 + 1))}
      </div>
    </div>
  );
}

"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ElectricBorderProps = {
  children: ReactNode;
  className?: string;
};

/** Dezenter rot luminierender Rahmen — nur für eine Schlüsselkarte. */
export function ElectricBorder({ children, className = "" }: ElectricBorderProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative rounded-2xl p-px ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35]"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, rgba(244,63,94,0.55) 0deg, transparent 70deg, transparent 290deg, rgba(190,18,60,0.3) 360deg)",
          animation: reduce ? "none" : "electric-rotate 12s linear infinite",
        }}
        aria-hidden
      />
      <div className="relative rounded-[15px] bg-surface">{children}</div>
    </div>
  );
}

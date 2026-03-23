"use client";

import type { ReactNode } from "react";

type ShinyTextProps = {
  children: ReactNode;
  className?: string;
};

/** Punktueller Licht-/Laser-Akzent auf Text — sparsam einsetzen. */
export function ShinyText({ children, className = "" }: ShinyTextProps) {
  return <span className={`shiny-text font-semibold ${className}`}>{children}</span>;
}

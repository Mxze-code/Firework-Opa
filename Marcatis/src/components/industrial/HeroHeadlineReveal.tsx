"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DELAY_BASE = 0.12;
const STAGGER = 0.095;
const DURATION = 0.56;

function RevealWord({
  index,
  className,
  children,
  reduceMotion,
}: {
  index: number;
  className: string;
  children: ReactNode;
  reduceMotion: boolean;
}) {
  return (
    <motion.span
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.28em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              delay: DELAY_BASE + index * STAGGER,
              duration: DURATION,
              ease: EASE,
            }
      }
    >
      {children}
    </motion.span>
  );
}

/**
 * Einmaliger Split-Text-Einstieg (Wort-Stagger, leichter Aufstieg + Fade) — industriell, ohne Loop.
 */
export function HeroHeadlineReveal() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="font-[family-name:var(--font-display)] text-[2.5rem] leading-[0.86] tracking-[-0.075em] text-white drop-shadow-[0_18px_60px_rgba(0,0,0,0.75)] sm:text-[3.25rem] md:text-[5.75rem] md:drop-shadow-[0_22px_85px_rgba(0,0,0,0.85)] lg:text-[7.9rem] xl:text-[9.2rem]">
      <RevealWord index={0} className="block text-white" reduceMotion={!!reduceMotion}>
        PRÄZISION,
      </RevealWord>

      <span className="block whitespace-nowrap max-[360px]:whitespace-normal">
        <RevealWord index={1} className="inline-block text-white/95" reduceMotion={!!reduceMotion}>
          DIE
        </RevealWord>
        <RevealWord
          index={2}
          className="inline-block text-white/95 pl-[0.18em] max-[360px]:pl-[0.12em]"
          reduceMotion={!!reduceMotion}
        >
          SICHTBAR
        </RevealWord>
      </span>

      <RevealWord index={3} className="block text-white/95" reduceMotion={!!reduceMotion}>
        BLEIBT.
      </RevealWord>
    </h1>
  );
}

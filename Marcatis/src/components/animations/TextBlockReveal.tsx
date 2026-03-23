"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextBlockRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
};

/** 21st.dev „Text Block“-Anmutung: Wort-für-Wort Reveal für Headlines / Intro. */
export function TextBlockReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
}: TextBlockRevealProps) {
  const reduce = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1">
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "108%", opacity: 0.001 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
              transition={{
                duration: 0.58,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

type WhisperTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Subtiler Text-Reveal — „Whisper“-Anmutung für Unterzeilen und ruhige Intros. */
export function WhisperText({ children, className = "", delay = 0 }: WhisperTextProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      style={
        reduce
          ? undefined
          : {
              filter: "blur(0px)",
            }
      }
    >
      {reduce ? (
        children
      ) : (
        <motion.span
          className="inline-block"
          initial={{ filter: "blur(10px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>
      )}
    </motion.div>
  );
}

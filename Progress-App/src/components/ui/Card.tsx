"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  glow = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      className={`
        panel-frame rounded-lg border border-[var(--border-frame)] bg-[var(--bg-card)]
        p-5 backdrop-blur-sm
        ${glow ? "panel-frame-gold shadow-[0_0_30px_var(--gold-glow)]" : ""}
        ${onClick ? "text-left w-full cursor-pointer hover:border-[var(--accent-primary)]/30 transition-colors" : ""}
        ${className}
      `}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
    >
      {children}
    </motion.div>
  );
}

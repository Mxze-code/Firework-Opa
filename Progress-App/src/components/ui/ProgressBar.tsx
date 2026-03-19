"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "default" | "xp" | "success";
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  variant = "default",
  showLabel = false,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    default: "bg-[var(--accent-primary)]",
    xp: "bg-[var(--xp-accent)]",
    success: "bg-[var(--success)]",
  };

  const heights = {
    sm: "h-1.5",
    md: "h-2",
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`${heights[size]} w-full rounded-full bg-[var(--bg-elevated)] overflow-hidden`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${variants[variant]} ${variant === "xp" ? "shadow-[0_0_10px_var(--xp-glow)]" : ""}`}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between text-xs text-[var(--text-muted)]">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}

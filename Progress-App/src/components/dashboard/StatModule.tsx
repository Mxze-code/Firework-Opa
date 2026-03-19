"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatModuleProps {
  stat: string;
  value: number;
  icon: LucideIcon;
  todayGain?: number;
}

export default function StatModule({
  stat,
  value,
  icon: Icon,
  todayGain = 0,
}: StatModuleProps) {
  const gain = todayGain > 0 ? todayGain : value;
  const hasGain = gain > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border p-3 transition-colors ${
        hasGain
          ? "border-[var(--success)]/30 bg-[var(--success)]/5"
          : "border-[var(--border-subtle)] bg-[var(--bg-card)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            className={`w-4 h-4 ${hasGain ? "text-[var(--success)]" : "text-[var(--text-muted)]"}`}
          />
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {stat}
          </span>
        </div>
        {hasGain ? (
          <span className="text-sm font-bold text-[var(--success)]">+{gain}</span>
        ) : (
          <span className="text-sm text-[var(--text-muted)]">—</span>
        )}
      </div>
      <p className="text-[10px] text-[var(--text-muted)] mt-1">
        {hasGain ? "From today's actions" : "Log to gain"}
      </p>
    </motion.div>
  );
}

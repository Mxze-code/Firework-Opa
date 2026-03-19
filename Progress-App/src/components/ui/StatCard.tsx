"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  glow?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend = "neutral",
  glow = false,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        fantasy-card p-4 flex flex-col gap-2
        ${glow ? "border-[var(--accent-primary)]/40 shadow-[0_0_18px_rgba(201,162,39,0.22)]" : ""}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-muted)] fantasy-card-header">{label}</span>
        <Icon
          className={`w-5 h-5 ${
            glow ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)]"
          }`}
        />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-[var(--text-primary)]">
          {value}
        </span>
        {trend !== "neutral" && (
          <span
            className={`text-xs font-medium ${
              trend === "up"
                ? "text-[var(--success)]"
                : trend === "down"
                  ? "text-[var(--danger)]"
                  : ""
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : ""}
          </span>
        )}
      </div>
      <div className="h-1 w-full rounded-full bg-[var(--bg-elevated)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-[var(--accent-primary)] rounded-full"
        />
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { DbDailyTarget } from "@/lib/db";

interface TargetCardProps {
  target: DbDailyTarget;
  completed: boolean;
  onComplete?: () => void;
}

export default function TargetCard({
  target,
  completed,
  onComplete,
}: TargetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        fantasy-card p-4 transition-all
        ${
          completed
            ? "border-[var(--success)]/55"
            : "hover:border-[var(--accent-primary)]/45"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`
          flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
          ${completed ? "bg-[var(--success)]/20" : "bg-[var(--bg-elevated)]"}
        `}
        >
          {completed ? (
            <Check className="w-6 h-6 text-[var(--success)]" />
          ) : (
            <span className="text-lg font-bold text-[var(--accent-primary)]">
              +
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-semibold ${completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}
            >
              {target.title}
            </h3>
            <span className="text-xs text-[var(--xp-accent)] font-medium">
              +{target.xp_reward} XP
            </span>
          </div>
          {target.description && (
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {target.description}
            </p>
          )}
          {!completed && onComplete && (
            <button
              onClick={onComplete}
              className="mt-3 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              Complete target →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { Zap, Droplets, Leaf, Dumbbell, Snowflake, Sun, Brain, Flame } from "lucide-react";
import type { Buff } from "@/lib/buffs";

const BUFF_ICONS: Record<string, typeof Zap> = {
  Zap,
  Droplets,
  Leaf,
  Dumbbell,
  Snowflake,
  Sun,
  Brain,
  Flame,
};

export default function BuffCard({ buff }: { buff: Buff }) {
  const Icon = BUFF_ICONS[buff.icon] ?? Zap;

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20">
      <Icon className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
          {buff.label}
        </p>
        <p className="text-xs text-[var(--text-muted)] truncate">
          {buff.source}
        </p>
      </div>
    </div>
  );
}

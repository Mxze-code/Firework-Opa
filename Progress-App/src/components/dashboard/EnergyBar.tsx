"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";

interface EnergyBarProps {
  value: number; // 0-100
  fromSleep?: number;
  label?: string;
}

export default function EnergyBar({
  value,
  fromSleep = 0,
  label = "Energy",
}: EnergyBarProps) {
  const displayValue = Math.min(100, Math.max(0, value));

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[var(--xp-accent)]" />
          <span className="font-medium text-[var(--text-primary)]">{label}</span>
        </div>
        <span className="text-sm text-[var(--text-muted)]">
          {displayValue}%
          {fromSleep > 0 && (
            <span className="ml-1 text-[var(--success)]">
              (+{fromSleep} from sleep)
            </span>
          )}
        </span>
      </div>
      <ProgressBar value={displayValue} max={100} variant="xp" />
    </div>
  );
}

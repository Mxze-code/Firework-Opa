import type { PrimaryStat } from "@/types";

// XP required for each level (exponential curve)
const XP_BASE = 100;
const XP_MULTIPLIER = 1.5;

export function xpForLevel(level: number): number {
  return Math.floor(XP_BASE * Math.pow(XP_MULTIPLIER, level - 1));
}

export function levelFromTotalXP(totalXP: number): {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
} {
  let level = 1;
  let xpRemaining = totalXP;

  while (xpRemaining >= xpForLevel(level)) {
    xpRemaining -= xpForLevel(level);
    level++;
  }

  return {
    level,
    currentXP: xpRemaining,
    xpToNextLevel: xpForLevel(level),
  };
}

export function mergeStatChanges(
  current: Record<PrimaryStat, number>,
  changes: Partial<Record<PrimaryStat, number>>
): Record<PrimaryStat, number> {
  const result = { ...current };
  for (const [key, value] of Object.entries(changes)) {
    if (value !== undefined && key in result) {
      (result as Record<string, number>)[key] = Math.min(
        100,
        Math.max(0, (result as Record<string, number>)[key] + value)
      );
    }
  }
  return result;
}

export function calculateVitality(stats: Record<PrimaryStat, number>): number {
  const keys: PrimaryStat[] = [
    "strength",
    "endurance",
    "recovery",
    "discipline",
    "energy",
    "focus",
    "mobility",
    "vitality",
    "vision",
  ];
  const sum = keys.reduce((acc, k) => acc + stats[k], 0);
  return Math.round(sum / keys.length);
}

/**
 * Buff System - Temporary and long-term effects from real actions
 * Gamified interpretation. Not medical claims.
 */

export type BuffId =
  | "energy_restored"
  | "recovery_boost"
  | "hydration_efficiency"
  | "vitality_boost"
  | "strength_momentum"
  | "endurance_momentum"
  | "discipline_boost"
  | "focus_clarity"
  | "sleep_momentum"
  | "circadian_sync";

export interface Buff {
  id: BuffId;
  label: string;
  description: string;
  icon: string;
  duration: "day" | "session" | "permanent";
  source: string; // e.g. "Slept 8h"
  expiresAt?: string; // ISO for day buffs
}

// Buffs that activate from today's actions
export function computeActiveBuffs(actions: {
  sleepHours?: number;
  hydrationTargetMet?: boolean;
  vegetablesEaten?: number;
  workoutCompleted?: boolean;
  coldShower?: boolean;
  sunlightMinutes?: number;
  meditationMinutes?: number;
  streakDays?: number;
}): Buff[] {
  const buffs: Buff[] = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (actions.sleepHours !== undefined && actions.sleepHours >= 7) {
    buffs.push({
      id: "energy_restored",
      label: "Energy Restored",
      description: "Well-rested. Performance bonus active.",
      icon: "Zap",
      duration: "day",
      expiresAt: today.toISOString(),
      source: `Slept ${actions.sleepHours}h`,
    });
  }

  if (actions.hydrationTargetMet) {
    buffs.push({
      id: "hydration_efficiency",
      label: "Recovery Efficiency",
      description: "Hydration target met. Improved recovery.",
      icon: "Droplets",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Hydration target",
    });
  }

  if (actions.vegetablesEaten && actions.vegetablesEaten >= 2) {
    buffs.push({
      id: "vitality_boost",
      label: "Vitality Boost",
      description: "Vegetables in meals. Vitality improved.",
      icon: "Leaf",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Vegetables",
    });
  }

  if (actions.workoutCompleted) {
    buffs.push({
      id: "strength_momentum",
      label: "Training Momentum",
      description: "Workout completed. Build progress active.",
      icon: "Dumbbell",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Workout",
    });
  }

  if (actions.coldShower) {
    buffs.push({
      id: "discipline_boost",
      label: "Discipline Boost",
      description: "Cold exposure. Resilience improved.",
      icon: "Snowflake",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Cold shower",
    });
  }

  if (actions.sunlightMinutes && actions.sunlightMinutes >= 15) {
    buffs.push({
      id: "circadian_sync",
      label: "Circadian Sync",
      description: "Morning sunlight. Energy & rhythm support.",
      icon: "Sun",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Sunlight",
    });
  }

  if (actions.meditationMinutes && actions.meditationMinutes >= 10) {
    buffs.push({
      id: "focus_clarity",
      label: "Focus Clarity",
      description: "Meditation complete. Mental clarity.",
      icon: "Brain",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Meditation",
    });
  }

  if (actions.streakDays && actions.streakDays >= 7) {
    buffs.push({
      id: "sleep_momentum",
      label: "Build Momentum",
      description: `${actions.streakDays} day streak. Consistency bonus.`,
      icon: "Flame",
      duration: "day",
      expiresAt: today.toISOString(),
      source: "Streak",
    });
  }

  return buffs;
}

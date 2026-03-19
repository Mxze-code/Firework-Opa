"use client";

import { useMemo } from "react";
import type { PrimaryStat } from "@/types";
import {
  getFoodStatBonuses,
  WORKOUT_STAT_GAINS,
  RECOVERY_STAT_GAINS,
  getSleepEnergyRestore,
} from "@/lib/stat-engine";
import { computeActiveBuffs } from "@/lib/buffs";
import type { DbMeal, DbWorkout, DbRecoveryLog } from "@/lib/db";

const DEFAULT_STATS: Record<PrimaryStat, number> = {
  strength: 0,
  endurance: 0,
  recovery: 0,
  discipline: 0,
  energy: 0,
  focus: 0,
  mobility: 0,
  vitality: 0,
  vision: 0,
};

export function useBuildStats(
  meals: DbMeal[],
  workouts: DbWorkout[],
  recovery: DbRecoveryLog[],
  streak: number,
  preferences?: { water_target_glasses?: number }
) {
  return useMemo(() => {
    const stats = { ...DEFAULT_STATS };
    let sleepHours = 0;
    let waterGlasses = 0;
    let vegetablesCount = 0;
    let workoutCompleted = false;
    let coldShower = false;
    let sunlightMinutes = 0;
    let meditationMinutes = 0;

    // From meals
    for (const meal of meals) {
      const foods = (meal.foods || []) as { name?: string; category?: string }[];
      for (const food of foods) {
        const bonuses = getFoodStatBonuses(
          food.name || "",
          food.category || "other"
        );
        for (const b of bonuses) {
          if (b.stat in stats) {
            stats[b.stat as PrimaryStat] += b.amount;
          }
        }
        if (
          ["vegetables", "leafy_greens", "salad"].includes(
            (food.category || "").toLowerCase()
          )
        ) {
          vegetablesCount++;
        }
      }
    }

    // From workouts
    for (const w of workouts) {
      workoutCompleted = true;
      const gains = WORKOUT_STAT_GAINS[w.type]?.(w.intensity) ?? [];
      for (const g of gains) {
        if (g.stat in stats) {
          stats[g.stat as PrimaryStat] += g.amount;
        }
      }
    }

    // From recovery
    for (const r of recovery) {
      if (r.type === "sleep" && r.value) {
        sleepHours = r.value;
        const restore = getSleepEnergyRestore(r.value);
        stats.energy += Math.min(restore / 20, 5); // cap energy from sleep
        const gains = RECOVERY_STAT_GAINS.sleep ?? [];
        for (const g of gains) {
          if (g.stat in stats) stats[g.stat as PrimaryStat] += g.amount;
        }
      } else if (r.type === "water" && r.value) {
        waterGlasses = r.value;
        const gains = RECOVERY_STAT_GAINS.water ?? [];
        for (const g of gains) {
          if (g.stat in stats) stats[g.stat as PrimaryStat] += g.amount;
        }
      } else if (r.type === "cold_shower") {
        coldShower = true;
        const gains = RECOVERY_STAT_GAINS.cold_shower ?? [];
        for (const g of gains) {
          if (g.stat in stats) stats[g.stat as PrimaryStat] += g.amount;
        }
      } else if (r.type === "sunlight" && r.duration_minutes) {
        sunlightMinutes += r.duration_minutes;
        const gains = RECOVERY_STAT_GAINS.sunlight ?? [];
        for (const g of gains) {
          if (g.stat in stats) stats[g.stat as PrimaryStat] += g.amount;
        }
      } else if (r.type === "meditation" && r.duration_minutes) {
        meditationMinutes += r.duration_minutes;
        const gains = RECOVERY_STAT_GAINS.meditation ?? [];
        for (const g of gains) {
          if (g.stat in stats) stats[g.stat as PrimaryStat] += g.amount;
        }
      } else if (r.type in RECOVERY_STAT_GAINS) {
        const gains = RECOVERY_STAT_GAINS[r.type as keyof typeof RECOVERY_STAT_GAINS] ?? [];
        for (const g of gains) {
          if (g.stat in stats) stats[g.stat as PrimaryStat] += g.amount;
        }
      }
    }

    const waterTarget = preferences?.water_target_glasses ?? 8;
    const hydrationTargetMet = waterGlasses >= waterTarget;

    const buffs = computeActiveBuffs({
      sleepHours: sleepHours || undefined,
      hydrationTargetMet,
      vegetablesEaten: vegetablesCount,
      workoutCompleted,
      coldShower,
      sunlightMinutes: sunlightMinutes || undefined,
      meditationMinutes: meditationMinutes || undefined,
      streakDays: streak,
    });

    // Energy from sleep (for display)
    const energyFromSleep = sleepHours ? getSleepEnergyRestore(sleepHours) : 0;

    return {
      stats,
      buffs,
      energyFromSleep,
      sleepHours,
      hydrationTargetMet,
      vegetablesCount,
    };
  }, [meals, workouts, recovery, streak, preferences?.water_target_glasses]);
}

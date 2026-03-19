/**
 * Stat Engine - Real action -> stat gain mappings
 * Gamified interpretation layer. Not medical claims.
 */

export type PrimaryStat =
  | "strength"
  | "endurance"
  | "recovery"
  | "discipline"
  | "energy"
  | "focus"
  | "mobility"
  | "vitality"
  | "vision";

export type SecondaryStat =
  | "sleep_score"
  | "hydration"
  | "nutrition_quality"
  | "training_load"
  | "consistency"
  | "recovery_balance";

export type StatKey = PrimaryStat | SecondaryStat;

export interface StatGain {
  stat: PrimaryStat | SecondaryStat;
  amount: number;
  label: string; // e.g. "Strength +2"
}

// Food category -> stat bonuses (symbolic, gamified)
export const FOOD_STAT_BONUSES: Record<
  string,
  { stat: PrimaryStat; amount: number; label: string }[]
> = {
  carrots: [{ stat: "vision", amount: 1, label: "Vision +1" }],
  leafy_greens: [
    { stat: "vitality", amount: 2, label: "Vitality +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  salad: [
    { stat: "vitality", amount: 2, label: "Vitality +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  vegetables: [
    { stat: "vitality", amount: 1, label: "Vitality +1" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  berries: [
    { stat: "focus", amount: 1, label: "Focus +1" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  fish: [
    { stat: "recovery", amount: 2, label: "Recovery +2" },
    { stat: "focus", amount: 1, label: "Focus +1" },
  ],
  eggs: [
    { stat: "strength", amount: 1, label: "Strength +1" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  protein: [
    { stat: "strength", amount: 2, label: "Strength +2" },
    { stat: "vitality", amount: 1, label: "Vitality +1" },
  ],
  healthy_fats: [
    { stat: "energy", amount: 1, label: "Energy +1" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  processed: [], // reduced efficiency - no bonus
  junk: [], // no bonus
};

// Workout type -> stat gains
export const WORKOUT_STAT_GAINS: Record<
  string,
  (intensity: string) => StatGain[]
> = {
  strength: (intensity) => {
    const mult = intensity === "elite" ? 3 : intensity === "hard" ? 2 : 1;
    return [
      { stat: "strength", amount: 2 * mult, label: `Strength +${2 * mult}` },
      { stat: "discipline", amount: 1 * mult, label: `Discipline +${1 * mult}` },
    ];
  },
  cardio: (intensity) => {
    const mult = intensity === "elite" ? 3 : intensity === "hard" ? 2 : 1;
    return [
      { stat: "endurance", amount: 3 * mult, label: `Endurance +${3 * mult}` },
      { stat: "vitality", amount: 1 * mult, label: `Vitality +${1 * mult}` },
    ];
  },
  abs: (intensity) => {
    const mult = intensity === "elite" ? 2 : intensity === "hard" ? 1.5 : 1;
    return [
      { stat: "strength", amount: 1 * mult, label: `Strength +${Math.round(mult)}` },
      { stat: "discipline", amount: 2 * mult, label: `Discipline +${Math.round(2 * mult)}` },
    ];
  },
  mobility: () => [
    { stat: "mobility", amount: 2, label: "Mobility +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  stretching: () => [
    { stat: "mobility", amount: 2, label: "Mobility +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  steps: () => [
    { stat: "endurance", amount: 1, label: "Endurance +1" },
    { stat: "vitality", amount: 1, label: "Vitality +1" },
  ],
  hiit: (intensity) => {
    const mult = intensity === "elite" ? 2 : 1;
    return [
      { stat: "endurance", amount: 2 * mult, label: `Endurance +${2 * mult}` },
      { stat: "discipline", amount: 1 * mult, label: `Discipline +${1 * mult}` },
    ];
  },
};

// Recovery action -> stat gains
export const RECOVERY_STAT_GAINS: Record<string, StatGain[]> = {
  sleep: [
    { stat: "energy", amount: 3, label: "Energy Restored" },
    { stat: "recovery", amount: 2, label: "Recovery +2" },
  ],
  water: [
    { stat: "recovery", amount: 1, label: "Recovery +1" },
    { stat: "energy", amount: 1, label: "Energy +1" },
  ],
  cold_shower: [
    { stat: "discipline", amount: 2, label: "Discipline +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  sauna: [
    { stat: "recovery", amount: 3, label: "Recovery +3" },
    { stat: "vitality", amount: 1, label: "Vitality +1" },
  ],
  red_light: [
    { stat: "recovery", amount: 2, label: "Recovery +2" },
  ],
  sunlight: [
    { stat: "energy", amount: 2, label: "Energy +2" },
    { stat: "focus", amount: 1, label: "Focus +1" },
  ],
  meditation: [
    { stat: "focus", amount: 2, label: "Focus +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
  stretching: [
    { stat: "mobility", amount: 2, label: "Mobility +2" },
    { stat: "recovery", amount: 1, label: "Recovery +1" },
  ],
};

// Sleep hours -> energy restoration (for buff calculation)
export function getSleepEnergyRestore(hours: number): number {
  if (hours >= 8) return 100;
  if (hours >= 7) return 85;
  if (hours >= 6) return 70;
  if (hours >= 5) return 50;
  return Math.max(0, hours * 10);
}

// Map food name/category to stat bonuses
export function getFoodStatBonuses(
  foodName: string,
  category: string
): StatGain[] {
  const key = foodName.toLowerCase().replace(/\s+/g, "_");
  const categoryKey = (category || "").toLowerCase().replace(/\s+/g, "_");

  // Direct match: food name contains map key or vice versa
  for (const [foodKey, bonuses] of Object.entries(FOOD_STAT_BONUSES)) {
    if (
      key.includes(foodKey) ||
      foodKey.includes(key) ||
      categoryKey.includes(foodKey)
    ) {
      return bonuses.map((b) => ({ ...b, stat: b.stat as PrimaryStat }));
    }
  }

  // Category fallback
  const categoryMap: Record<string, string> = {
    vegetables: "vegetables",
    leafy_greens: "leafy_greens",
    protein: "protein",
    fruits: "berries",
    healthy_fats: "healthy_fats",
  };
  const mapped = categoryMap[categoryKey];
  if (mapped && FOOD_STAT_BONUSES[mapped]) {
    return FOOD_STAT_BONUSES[mapped].map((b) => ({
      ...b,
      stat: b.stat as PrimaryStat,
    }));
  }

  return [];
}

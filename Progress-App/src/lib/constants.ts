import type { PrimaryStat, SecondaryStat } from "@/types";

export const RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Elite",
  "Master",
  "Champion",
] as const;

export function getRankForLevel(level: number): string {
  const index = Math.min(Math.floor(level / 5), RANKS.length - 1);
  return RANKS[Math.max(0, index)];
}

export const PRIMARY_STAT_LABELS: Record<PrimaryStat, string> = {
  strength: "Strength",
  endurance: "Endurance",
  recovery: "Recovery",
  discipline: "Discipline",
  energy: "Energy",
  focus: "Focus",
  mobility: "Mobility",
  vitality: "Vitality",
  vision: "Vision",
};

export const SECONDARY_STAT_LABELS: Record<SecondaryStat, string> = {
  sleep_score: "Sleep Score",
  hydration: "Hydration",
  nutrition_quality: "Nutrition Quality",
  training_load: "Training Load",
  consistency: "Consistency",
  recovery_balance: "Recovery Balance",
};

export const STAT_LABELS = {
  ...PRIMARY_STAT_LABELS,
  ...SECONDARY_STAT_LABELS,
};

// Build focus options for onboarding (Choose Your Path)
export const BUILD_FOCUS_OPTIONS = [
  "Strength",
  "Speed",
  "Endurance",
  "Recovery",
  "Discipline",
  "Vitality",
  "Sleep",
  "Balanced",
] as const;

// Supporting priorities for character creation
export const SUPPORTING_PRIORITIES = [
  "better sleep",
  "muscle gain",
  "fat loss",
  "better nutrition",
  "more hydration",
  "more mobility",
  "more consistency",
  "better recovery",
  "more exercise",
  "better discipline",
] as const;

// Tracking systems - what the user chooses to track
export const TRACKING_SYSTEMS = [
  "workouts",
  "nutrition",
  "hydration",
  "sleep",
  "recovery",
  "steps",
  "mobility",
  "sunlight",
  "cold_showers",
  "meditation",
  "red_light",
  "custom_habits",
] as const;

export const TRACKING_SYSTEM_LABELS: Record<(typeof TRACKING_SYSTEMS)[number], string> = {
  workouts: "Workouts",
  nutrition: "Nutrition",
  hydration: "Hydration",
  sleep: "Sleep",
  recovery: "Recovery",
  steps: "Steps",
  mobility: "Mobility",
  sunlight: "Sunlight",
  cold_showers: "Cold Showers",
  meditation: "Meditation",
  red_light: "Red Light",
  custom_habits: "Custom Habits",
};

// Map tracking systems to habit template ids for daily targets
export const TRACKING_TO_HABIT: Record<string, string> = {
  workouts: "workout",
  nutrition: "protein",
  hydration: "water",
  sleep: "sleep",
  recovery: "recovery",
  steps: "steps",
  mobility: "mobility",
  sunlight: "sunlight",
  cold_showers: "cold_shower",
  meditation: "meditation",
  red_light: "red_light",
};

// Daily target templates with stat impact
export const HABIT_TEMPLATES = [
  { id: "sleep", title: "Sleep 7-8h", xp: 25, stat: "energy" as PrimaryStat },
  { id: "water", title: "Hydration target", xp: 15, stat: "recovery" as PrimaryStat },
  { id: "workout", title: "Complete workout", xp: 25, stat: "strength" as PrimaryStat },
  { id: "protein", title: "Hit protein target", xp: 25, stat: "strength" as PrimaryStat },
  { id: "vegetables", title: "Eat vegetables 2x", xp: 15, stat: "vitality" as PrimaryStat },
  { id: "steps", title: "10k steps", xp: 25, stat: "endurance" as PrimaryStat },
  { id: "mobility", title: "Stretch 10 min", xp: 15, stat: "mobility" as PrimaryStat },
  { id: "meditation", title: "Meditation 10 min", xp: 15, stat: "focus" as PrimaryStat },
  { id: "sunlight", title: "Morning sunlight", xp: 15, stat: "energy" as PrimaryStat },
  { id: "recovery", title: "Recovery session", xp: 25, stat: "recovery" as PrimaryStat },
  { id: "cold_shower", title: "Cold shower", xp: 20, stat: "recovery" as PrimaryStat },
  { id: "red_light", title: "Red light therapy", xp: 15, stat: "recovery" as PrimaryStat },
] as const;

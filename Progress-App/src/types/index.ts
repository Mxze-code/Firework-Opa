// Primary stats - core build attributes
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

// Secondary stats - derived/supporting
export type SecondaryStat =
  | "sleep_score"
  | "hydration"
  | "nutrition_quality"
  | "training_load"
  | "consistency"
  | "recovery_balance";

export type StatKey = PrimaryStat | SecondaryStat;

// Legacy alias for compatibility
export type PlayerStats = Record<PrimaryStat, number> &
  Partial<Record<SecondaryStat, number>>;

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  username: string;
  age?: number;
  weight?: number;
  height?: number;
  goals?: string[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Progression {
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  total_xp: number;
  rank: string;
  streak: number;
  longest_streak: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type FoodCategory =
  | "vegetables"
  | "leafy_greens"
  | "carrots"
  | "berries"
  | "fish"
  | "eggs"
  | "protein"
  | "healthy_fats"
  | "processed"
  | "other";

export interface FoodEntry {
  name: string;
  category: FoodCategory;
  protein?: number;
  carbs?: number;
  fats?: number;
  calories?: number;
  stat_bonus?: Partial<Record<PrimaryStat, number>>;
}

export interface Meal {
  id: string;
  meal_type: MealType;
  foods: FoodEntry[];
  logged_at: string;
  total_protein?: number;
  total_carbs?: number;
  total_fats?: number;
  total_calories?: number;
  stat_bonuses?: Partial<Record<PrimaryStat, number>>;
}

export type WorkoutType =
  | "strength"
  | "cardio"
  | "abs"
  | "mobility"
  | "stretching"
  | "steps"
  | "hiit"
  | "other";

export interface Workout {
  id: string;
  type: WorkoutType;
  duration_minutes: number;
  intensity: "light" | "moderate" | "hard" | "elite";
  notes?: string;
  sets?: number;
  reps?: number;
  logged_at: string;
  xp_earned?: number;
  stat_impacts?: Partial<Record<PrimaryStat, number>>;
}

export type RecoveryType =
  | "sleep"
  | "water"
  | "cold_shower"
  | "sauna"
  | "red_light"
  | "sunlight"
  | "meditation"
  | "stretching"
  | "rest";

export interface RecoveryLog {
  id: string;
  type: RecoveryType;
  duration_minutes?: number;
  value?: number;
  unit?: string;
  logged_at: string;
  xp_earned?: number;
  stat_impacts?: Partial<Record<PrimaryStat, number>>;
}

export interface PersonalGoal {
  id: string;
  title: string;
  description?: string;
  target?: string;
  progress?: number;
  is_active: boolean;
}

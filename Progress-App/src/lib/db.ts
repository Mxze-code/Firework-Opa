import { createClient } from "@/lib/supabase/client";
import { xpForLevel, levelFromTotalXP } from "./xp";

export type DbProfile = {
  id: string;
  email: string;
  display_name: string | null;
  username: string | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  gender: string | null;
  activity_level: string | null;
  goals: string[] | null;
  build_focus: string | null;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
};

export type DbProgression = {
  level: number;
  total_xp: number;
  streak: number;
  longest_streak: number;
  last_activity_date: string | null;
};

export type DbUserPreferences = {
  protein_target_g: number;
  water_target_glasses: number;
  sleep_target_hours: number;
  steps_target: number;
  selected_habit_categories: string[];
  build_focus: string | null;
  supporting_priorities: string[];
  selected_tracking_systems: string[];
};

export type DbMeal = {
  id: string;
  meal_type: string;
  foods: unknown[];
  total_protein: number | null;
  total_carbs: number | null;
  total_fats: number | null;
  total_calories: number | null;
  logged_at: string;
};

export type DbWorkout = {
  id: string;
  type: string;
  duration_minutes: number;
  intensity: string;
  notes: string | null;
  xp_earned: number | null;
  logged_at: string;
};

export type DbRecoveryLog = {
  id: string;
  type: string;
  duration_minutes: number | null;
  value: number | null;
  unit: string | null;
  xp_earned: number | null;
  logged_at: string;
};

export type DbDailyTarget = {
  id: string;
  target_type: string;
  title: string;
  description: string | null;
  target_value: number | null;
  unit: string | null;
  xp_reward: number;
  is_active: boolean;
};

export type DbTargetCompletion = {
  id: string;
  target_id: string;
  completed_at: string;
  xp_earned: number;
};

export async function getProfile(userId: string): Promise<DbProfile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error || !data) return null;
  return data as DbProfile;
}

export async function updateProfile(
  userId: string,
  updates: Partial<DbProfile>
): Promise<{ error: Error | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId);
  return { error: error ? new Error(error.message) : null };
}

export async function getProgression(
  userId: string
): Promise<DbProgression | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("progression")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error || !data) return null;
  const p = data as DbProgression & { user_id: string };
  return {
    level: p.level,
    total_xp: p.total_xp,
    streak: p.streak,
    longest_streak: p.longest_streak,
    last_activity_date: p.last_activity_date,
  };
}

export async function getUserPreferences(
  userId: string
): Promise<DbUserPreferences | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error || !data) return null;
  const d = data as DbUserPreferences & { user_id: string };
  return {
    protein_target_g: d.protein_target_g,
    water_target_glasses: d.water_target_glasses,
    sleep_target_hours: d.sleep_target_hours,
    steps_target: d.steps_target,
    selected_habit_categories: d.selected_habit_categories || [],
    build_focus: d.build_focus ?? null,
    supporting_priorities: d.supporting_priorities || [],
    selected_tracking_systems: d.selected_tracking_systems || [],
  };
}

export async function updateUserPreferences(
  userId: string,
  updates: Partial<DbUserPreferences>
): Promise<{ error: Error | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_preferences")
    .update(updates)
    .eq("user_id", userId);
  return { error: error ? new Error(error.message) : null };
}

export async function getMealsToday(userId: string): Promise<DbMeal[]> {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("meals")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_at", `${today}T00:00:00`)
    .lte("logged_at", `${today}T23:59:59`)
    .order("logged_at", { ascending: false });
  return (data || []) as DbMeal[];
}

export async function getWorkoutsToday(userId: string): Promise<DbWorkout[]> {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_at", `${today}T00:00:00`)
    .lte("logged_at", `${today}T23:59:59`)
    .order("logged_at", { ascending: false });
  return (data || []) as DbWorkout[];
}

export async function getRecoveryToday(userId: string): Promise<DbRecoveryLog[]> {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("recovery_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_at", `${today}T00:00:00`)
    .lte("logged_at", `${today}T23:59:59`)
    .order("logged_at", { ascending: false });
  return (data || []) as DbRecoveryLog[];
}

export async function getDailyTargets(userId: string): Promise<DbDailyTarget[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("daily_targets")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("sort_order");
  return (data || []) as DbDailyTarget[];
}

export async function getTargetCompletionsToday(
  userId: string
): Promise<DbTargetCompletion[]> {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("target_completions")
    .select("*")
    .eq("user_id", userId)
    .gte("completed_at", `${today}T00:00:00`)
    .lte("completed_at", `${today}T23:59:59`);
  return (data || []) as DbTargetCompletion[];
}

export function computeProgressionFromXP(totalXp: number) {
  const { level, currentXP, xpToNextLevel } = levelFromTotalXP(totalXp);
  return {
    level,
    current_xp: currentXP,
    xp_to_next_level: xpToNextLevel,
    total_xp: totalXp,
  };
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getProfile,
  getProgression,
  getUserPreferences,
  getMealsToday,
  getWorkoutsToday,
  getRecoveryToday,
  getDailyTargets,
  getTargetCompletionsToday,
  computeProgressionFromXP,
  type DbProfile,
  type DbProgression,
  type DbUserPreferences,
  type DbMeal,
  type DbWorkout,
  type DbRecoveryLog,
  type DbDailyTarget,
  type DbTargetCompletion,
} from "@/lib/db";
import { getRankForLevel } from "@/lib/constants";

export type ProgressionData = {
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  total_xp: number;
  rank: string;
  streak: number;
  longest_streak: number;
};

export type UserData = {
  profile: DbProfile | null;
  progression: ProgressionData;
  preferences: DbUserPreferences | null;
  meals: DbMeal[];
  workouts: DbWorkout[];
  recovery: DbRecoveryLog[];
  targets: DbDailyTarget[];
  completedTargetIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const DEFAULT_PROGRESSION: ProgressionData = {
  level: 1,
  current_xp: 0,
  xp_to_next_level: 100,
  total_xp: 0,
  rank: "Bronze",
  streak: 0,
  longest_streak: 0,
};

export function useUserData(): UserData {
  const { user, isConfigured } = useAuth();
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [progression, setProgression] = useState<DbProgression | null>(null);
  const [preferences, setPreferences] = useState<DbUserPreferences | null>(null);
  const [meals, setMeals] = useState<DbMeal[]>([]);
  const [workouts, setWorkouts] = useState<DbWorkout[]>([]);
  const [recovery, setRecovery] = useState<DbRecoveryLog[]>([]);
  const [targets, setTargets] = useState<DbDailyTarget[]>([]);
  const [completions, setCompletions] = useState<DbTargetCompletion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!user?.id || !isConfigured || !isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const [p, prog, pref, m, w, r, t, c] = await Promise.all([
        getProfile(user.id).catch(() => null),
        getProgression(user.id).catch(() => null),
        getUserPreferences(user.id).catch(() => null),
        getMealsToday(user.id).catch(() => []),
        getWorkoutsToday(user.id).catch(() => []),
        getRecoveryToday(user.id).catch(() => []),
        getDailyTargets(user.id).catch(() => []),
        getTargetCompletionsToday(user.id).catch(() => []),
      ]);
      setProfile(p);
      setProgression(prog);
      setPreferences(pref);
      setMeals(m);
      setWorkouts(w);
      setRecovery(r);
      setTargets(t);
      setCompletions(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isConfigured]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const prog: ProgressionData = progression
    ? (() => {
        const { level, current_xp, xp_to_next_level, total_xp } =
          computeProgressionFromXP(progression.total_xp);
        return {
          level,
          current_xp,
          xp_to_next_level,
          total_xp,
          rank: getRankForLevel(level),
          streak: progression.streak,
          longest_streak: progression.longest_streak,
        };
      })()
    : DEFAULT_PROGRESSION;

  const completedTargetIds = new Set(completions.map((c) => c.target_id));

  return {
    profile,
    progression: prog,
    preferences,
    meals,
    workouts,
    recovery,
    targets,
    completedTargetIds,
    isLoading,
    error,
    refetch: fetch,
  };
}

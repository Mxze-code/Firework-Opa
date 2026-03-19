"use client";

import { Dumbbell, Heart, Activity, Footprints, Flame } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/empty/EmptyState";
import { useUserData } from "@/hooks/useUserData";
import type { WorkoutType } from "@/types";

const WORKOUT_ICONS: Record<string, typeof Dumbbell> = {
  strength: Dumbbell,
  cardio: Heart,
  abs: Activity,
  mobility: Activity,
  steps: Footprints,
  other: Flame,
};

const WORKOUT_LABELS: Record<string, string> = {
  strength: "Strength",
  cardio: "Cardio",
  abs: "Abs",
  mobility: "Mobility",
  steps: "Steps",
  other: "Other",
};

export default function TrainingPage() {
  const { workouts, isLoading, error } = useUserData();

  const totalXp = workouts.reduce((s, w) => s + (w.xp_earned ?? 0), 0);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 rounded-lg bg-[var(--danger)]/10 text-[var(--danger)]">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 world-panel rounded-lg px-4 py-6 border-2 border-[var(--stone-mid)]">
        <span className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          TRAINING GROUND
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          Training
        </h1>
        <p className="text-[var(--text-muted)]">
          Log workouts. Strength training → Strength, cardio → Endurance,
          mobility → Mobility. Train your build.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <p className="text-sm text-[var(--text-muted)]">Workouts today</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {workouts.length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-[var(--text-muted)]">XP earned</p>
          <p className="text-2xl font-bold text-[var(--xp-accent)]">
            +{totalXp} XP
          </p>
        </Card>
      </div>

      <div className="mb-6">
        <Button variant="primary">Log workout</Button>
      </div>

      {workouts.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="No workouts logged today"
          description="Log workouts to grow your build. Strength → Strength gain, cardio → Endurance, abs → Discipline."
          actionLabel="Log workout"
        />
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => {
            const Icon = WORKOUT_ICONS[workout.type] ?? Dumbbell;
            return (
              <Card key={workout.id}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {WORKOUT_LABELS[workout.type] ?? workout.type}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                      {workout.duration_minutes} min • {workout.intensity}{" "}
                      intensity
                    </p>
                    {workout.xp_earned && (
                      <p className="text-sm text-[var(--xp-accent)] mt-1 font-medium">
                        +{workout.xp_earned} XP
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

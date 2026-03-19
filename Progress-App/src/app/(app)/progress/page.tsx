"use client";

import { TrendingUp, Calendar, Zap } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import EmptyState from "@/components/empty/EmptyState";
import { useUserData } from "@/hooks/useUserData";

export default function ProgressPage() {
  const { progression, isLoading, error } = useUserData();

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
          STATUS BOARD
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          Progress
        </h1>
        <p className="text-[var(--text-muted)]">
          Your level, XP, and consistency over time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[var(--accent-primary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Total XP</p>
              <p className="text-2xl font-bold text-[var(--xp-accent)]">
                {progression.total_xp} XP
              </p>
            </div>
          </div>
          <ProgressBar
            value={progression.current_xp}
            max={progression.xp_to_next_level || 1}
            variant="xp"
            showLabel
          />
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Level {progression.level} •{" "}
            {progression.xp_to_next_level - progression.current_xp} XP to next
            level
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[var(--accent-primary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Current streak</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {progression.streak} days
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            Longest streak: {progression.longest_streak} days
          </p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 text-[var(--text-muted)] py-8">
          <Calendar className="w-8 h-8" />
          <p>
            Activity history will appear here as you log workouts, meals, and
            recovery.
          </p>
        </div>
      </Card>
    </div>
  );
}

"use client";

import TargetCard from "@/components/quests/TargetCard";
import EmptyState from "@/components/empty/EmptyState";
import { useUserData } from "@/hooks/useUserData";
import { Target } from "lucide-react";

export default function QuestsPage() {
  const { targets, completedTargetIds, isLoading, error } = useUserData();

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
          QUEST BOARD
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          Daily targets
        </h1>
        <p className="text-[var(--text-muted)]">
          Complete targets to earn XP and build your streak. Based on your
          goals.
        </p>
      </div>

      {targets.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No targets set"
          description="Set up your daily targets in your profile. You can add workout, nutrition, hydration, sleep, and more."
          actionLabel="Set up targets"
          actionHref="/profile"
        />
      ) : (
        <div className="space-y-4">
          {targets.map((target) => (
            <TargetCard
              key={target.id}
              target={target}
              completed={completedTargetIds.has(target.id)}
              onComplete={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

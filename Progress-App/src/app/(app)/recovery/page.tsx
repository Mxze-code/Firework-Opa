"use client";

import {
  Moon,
  Droplets,
  Snowflake,
  Flame,
  Sun,
  Activity,
  Brain,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/empty/EmptyState";
import { useUserData } from "@/hooks/useUserData";
import type { RecoveryType } from "@/types";

const RECOVERY_ICONS: Record<string, typeof Moon> = {
  sleep: Moon,
  water: Droplets,
  cold_shower: Snowflake,
  sauna: Flame,
  red_light: Flame,
  sunlight: Sun,
  meditation: Brain,
  stretching: Activity,
  rest: Moon,
};

const RECOVERY_LABELS: Record<string, string> = {
  sleep: "Sleep",
  water: "Water",
  cold_shower: "Cold shower",
  sauna: "Sauna",
  red_light: "Red light",
  sunlight: "Sunlight",
  meditation: "Meditation",
  stretching: "Stretching",
  rest: "Rest",
};

export default function RecoveryPage() {
  const { recovery, isLoading, error } = useUserData();

  const totalXp = recovery.reduce((s, r) => s + (r.xp_earned ?? 0), 0);

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
          REST CAMP
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          Recovery
        </h1>
        <p className="text-[var(--text-muted)]">
          Sleep restores Energy. Water aids Recovery. Cold showers boost
          Discipline. Log to grow.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card>
          <p className="text-sm text-[var(--text-muted)]">Logged today</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {recovery.length}
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
        <Button variant="primary">Log recovery</Button>
      </div>

      {recovery.length === 0 ? (
        <EmptyState
          icon={Droplets}
          title="No recovery logged today"
          description="Sleep restores Energy. Hydration improves Recovery. Cold showers boost Discipline. Log to activate buffs."
          actionLabel="Log recovery"
        />
      ) : (
        <div className="space-y-4">
          {recovery.map((log) => {
            const Icon = RECOVERY_ICONS[log.type] ?? Moon;
            return (
              <Card key={log.id}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {RECOVERY_LABELS[log.type] ?? log.type}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                      {log.duration_minutes
                        ? `${log.duration_minutes} min`
                        : log.value
                          ? `${log.value} ${log.unit ?? ""}`
                          : "Logged"}
                    </p>
                    {log.xp_earned && (
                      <p className="text-sm text-[var(--xp-accent)] mt-1 font-medium">
                        +{log.xp_earned} XP
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

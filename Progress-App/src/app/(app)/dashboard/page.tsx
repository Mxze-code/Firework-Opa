"use client";

import Link from "next/link";
import {
  Dumbbell,
  UtensilsCrossed,
  Droplets,
  Target,
  Zap,
  Flame,
  Heart,
  Eye,
  Brain,
  Activity,
} from "lucide-react";
import PlayerStatusCard from "@/components/dashboard/PlayerStatusCard";
import EnergyBar from "@/components/dashboard/EnergyBar";
import BuffCard from "@/components/dashboard/BuffCard";
import StatModule from "@/components/dashboard/StatModule";
import TargetCard from "@/components/quests/TargetCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/empty/EmptyState";
import { useUserData } from "@/hooks/useUserData";
import { useBuildStats } from "@/hooks/useBuildStats";
import { PRIMARY_STAT_LABELS } from "@/lib/constants";
import type { PrimaryStat } from "@/types";

const STAT_ICONS: Record<PrimaryStat, typeof Dumbbell> = {
  strength: Dumbbell,
  endurance: Flame,
  recovery: Heart,
  discipline: Target,
  energy: Zap,
  focus: Brain,
  mobility: Activity,
  vitality: Heart,
  vision: Eye,
};

const PRIMARY_STATS: PrimaryStat[] = [
  "strength",
  "endurance",
  "recovery",
  "energy",
  "discipline",
  "vitality",
  "focus",
  "mobility",
  "vision",
];

export default function DashboardPage() {
  const {
    profile,
    progression,
    meals,
    workouts,
    recovery,
    targets,
    completedTargetIds,
    preferences,
    isLoading,
    error,
  } = useUserData();

  const { stats, buffs, energyFromSleep, sleepHours } = useBuildStats(
    meals,
    workouts,
    recovery,
    progression.streak,
    preferences ?? undefined
  );

  const completedCount = completedTargetIds.size;
  const hasAnyData =
    meals.length > 0 || workouts.length > 0 || recovery.length > 0;

  const energyValue = sleepHours
    ? Math.min(100, 50 + (energyFromSleep / 100) * 50)
    : 50;

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div
          className="text-[var(--text-muted)] animate-pulse"
          style={{ fontFamily: "var(--font-pixelify)" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-4 border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]">
          {error}
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Game status hub header - quest board style */}
      <div className="mb-6 world-panel rounded-lg px-4 py-6 border-2 border-[var(--stone-mid)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
            HOME BASE
          </span>
        </div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-pixelify)" }}
        >
          Your Lobby
        </h1>
        <p className="text-[var(--text-muted)]">
          {hasAnyData
            ? `${completedCount} quests completed • Real actions = stat gains`
            : "Log actions to grow your build"}
        </p>
      </div>

      {/* Top row: Character card + Energy + Buffs */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PlayerStatusCard profile={profile} progression={progression} />
        </div>
        <div className="space-y-4">
          <EnergyBar
            value={energyValue}
            fromSleep={sleepHours ? Math.round(energyFromSleep) : undefined}
          />
          {buffs.length > 0 && (
            <div>
              <h3
                className="text-xs font-medium text-[var(--text-muted)] mb-2"
                style={{ fontFamily: "var(--font-pixelify)" }}
              >
                Active Buffs
              </h3>
              <div className="flex flex-wrap gap-2">
                {buffs.map((buff) => (
                  <BuffCard key={buff.id} buff={buff} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stat modules - Build overview */}
      <div className="mb-6">
        <h2
          className="text-sm font-medium text-[var(--text-muted)] mb-3"
          style={{ fontFamily: "var(--font-pixelify)" }}
        >
          Build Stats
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {PRIMARY_STATS.map((key) => (
            <StatModule
              key={key}
              stat={PRIMARY_STAT_LABELS[key]}
              value={stats[key]}
              icon={STAT_ICONS[key]}
              todayGain={stats[key] > 0 ? stats[key] : undefined}
            />
          ))}
        </div>
      </div>

      {/* Daily quests + Quick actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Daily Quests
            </h2>
            <Link href="/quests">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          {targets.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No quests set"
              description="Complete onboarding or set targets to see daily goals. Each completed quest boosts your build."
              actionLabel="Set targets"
              actionHref="/profile"
            />
          ) : (
            <div className="space-y-3">
              {targets.slice(0, 6).map((target) => (
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
        <div>
          <h2
            className="text-lg font-semibold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-pixelify)" }}
          >
            Log Action
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Real actions = stat gains. Log to grow your build.
          </p>
          <div className="space-y-3">
            <Link href="/nutrition">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border-frame)] bg-[var(--bg-card)] hover:border-[var(--accent-primary)]/30 transition-colors cursor-pointer panel-frame">
                <UtensilsCrossed className="w-6 h-6 text-[var(--accent-primary)]" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    Log meal
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Food → Vitality, Strength, Vision
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/training">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border-frame)] bg-[var(--bg-card)] hover:border-[var(--accent-primary)]/30 transition-colors cursor-pointer panel-frame">
                <Dumbbell className="w-6 h-6 text-[var(--accent-primary)]" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    Log workout
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Training → Strength, Endurance
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/recovery">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border-frame)] bg-[var(--bg-card)] hover:border-[var(--accent-primary)]/30 transition-colors cursor-pointer panel-frame">
                <Droplets className="w-6 h-6 text-[var(--accent-primary)]" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    Log recovery
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Sleep, water, cold → Energy, Recovery
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

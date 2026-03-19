"use client";

import { motion } from "framer-motion";
import ProgressBar from "@/components/ui/ProgressBar";
import type { DbProfile } from "@/lib/db";
import type { ProgressionData } from "@/hooks/useUserData";

interface PlayerStatusCardProps {
  profile: DbProfile | null;
  progression: ProgressionData;
}

export default function PlayerStatusCard({
  profile,
  progression,
}: PlayerStatusCardProps) {
  const displayName = profile?.display_name || profile?.email?.split("@")[0] || "Traveler";
  const buildFocus = profile?.build_focus || profile?.username;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fantasy-card p-6 overflow-hidden relative"
    >
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center text-2xl font-bold text-[var(--accent-primary)] border border-[var(--accent-primary)]/40">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1
              className="text-xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              {displayName}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/35">
                {progression.rank}
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                Level {progression.level}
              </span>
              {buildFocus && (
                <span className="text-xs text-[var(--text-muted)]">
                  • {buildFocus}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-muted)]">Progress</span>
            <span className="text-[var(--xp-accent)] font-medium">
              {progression.current_xp} / {progression.xp_to_next_level} XP
            </span>
          </div>
          <ProgressBar
            value={progression.current_xp}
            max={progression.xp_to_next_level || 1}
            variant="xp"
          />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🔥</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {progression.streak}
            </span>
            <span className="text-sm text-[var(--text-muted)]">day streak</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { User, Mail, Target, Award, Flame } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { profile, progression, isLoading, error } = useUserData();

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

  const displayName =
    profile?.display_name || profile?.email?.split("@")[0] || "You";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 world-panel rounded-lg px-4 py-6 border-2 border-[var(--stone-mid)]">
        <span className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          CHARACTER SHRINE
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-pixelify)" }}>
          Profile
        </h1>
        <p className="text-[var(--text-muted)]">
          Your account and progress overview.
        </p>
      </div>

      <Card className="mb-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center text-4xl font-bold text-[var(--accent-primary)] border-2 border-[var(--accent-primary)]/30">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {displayName}
            </h2>
            {profile?.username && (
              <p className="text-[var(--text-muted)]">@{profile.username}</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-lg text-sm font-medium bg-[var(--accent-subtle)] text-[var(--accent-primary)]">
                {progression.rank}
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                Level {progression.level}
              </span>
            </div>
            <div className="mt-4">
              <ProgressBar
                value={progression.current_xp}
                max={progression.xp_to_next_level || 1}
                variant="xp"
                showLabel
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Details
          </h3>
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Email</span>
                <span className="text-[var(--text-primary)]">
                  {profile?.email ?? "—"}
                </span>
              </div>
              {profile?.age && (
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Age</span>
                  <span className="text-[var(--text-primary)]">
                    {profile.age}
                  </span>
                </div>
              )}
              {profile?.weight && (
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Weight</span>
                  <span className="text-[var(--text-primary)]">
                    {profile.weight} kg
                  </span>
                </div>
              )}
              {profile?.height && (
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Height</span>
                  <span className="text-[var(--text-primary)]">
                    {profile.height} cm
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5" />
            Consistency
          </h3>
          <Card>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔥</span>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {progression.streak} days
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Longest: {progression.longest_streak} days
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-[var(--text-muted)]">
          Profile and targets can be updated in account settings.
        </p>
      </div>

      <div>
        <Button variant="ghost" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

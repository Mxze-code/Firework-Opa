"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import WorldLayout from "@/components/world/WorldLayout";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import {
  BUILD_FOCUS_OPTIONS,
  SUPPORTING_PRIORITIES,
  TRACKING_SYSTEMS,
  TRACKING_SYSTEM_LABELS,
  TRACKING_TO_HABIT,
  HABIT_TEMPLATES,
} from "@/lib/constants";

const STEPS = [
  "welcome",
  "identity",
  "path",
  "priorities",
  "tracking",
  "summary",
] as const;

const GENDER_OPTIONS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
  { id: "prefer_not", label: "Prefer not to say" },
];

export default function OnboardingPage() {
  const { user, isConfigured } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [buildFocus, setBuildFocus] = useState<string>("");
  const [supportingPriorities, setSupportingPriorities] = useState<string[]>([]);
  const [selectedTracking, setSelectedTracking] = useState<string[]>([]);
  const [proteinTarget, setProteinTarget] = useState("150");
  const [waterTarget, setWaterTarget] = useState("8");
  const [sleepTarget, setSleepTarget] = useState("7");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePriority = (p: string) => {
    setSupportingPriorities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const toggleTracking = (id: string) => {
    setSelectedTracking((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleComplete = async () => {
    if (!user?.id || !isConfigured) return;
    setError("");
    setIsLoading(true);
    try {
      const supabase = createClient();

      await supabase.from("profiles").update({
        display_name: displayName || null,
        username: username || null,
        age: age ? parseInt(age, 10) : null,
        gender: gender || null,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        goals: supportingPriorities,
        build_focus: buildFocus || null,
        onboarding_complete: true,
        updated_at: new Date().toISOString(),
      }).eq("id", user.id);

      await supabase.from("user_preferences").update({
        build_focus: buildFocus || null,
        supporting_priorities: supportingPriorities,
        selected_tracking_systems: selectedTracking,
        protein_target_g: parseInt(proteinTarget, 10) || 150,
        water_target_glasses: parseInt(waterTarget, 10) || 8,
        sleep_target_hours: parseFloat(sleepTarget) || 7,
        selected_habit_categories: selectedTracking
          .map((t) => TRACKING_TO_HABIT[t])
          .filter(Boolean),
        updated_at: new Date().toISOString(),
      }).eq("user_id", user.id);

      await supabase.from("daily_targets").delete().eq("user_id", user.id);

      const habitIds = selectedTracking
        .map((t) => TRACKING_TO_HABIT[t])
        .filter((id) => id && HABIT_TEMPLATES.some((h) => h.id === id));

      for (let i = 0; i < habitIds.length; i++) {
        const t = HABIT_TEMPLATES.find((h) => h.id === habitIds[i]);
        if (t) {
          await supabase.from("daily_targets").insert({
            user_id: user.id,
            target_type: t.id,
            title: t.title,
            xp_reward: t.xp,
            is_active: true,
            sort_order: i,
          });
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user && isConfigured) {
    router.replace("/login");
    return null;
  }

  const currentStep = STEPS[step];

  return (
    <WorldLayout variant="full" fitnessObjects={["shrine", "dumbbell", "campfire", "meal", "water", "bed"]}>
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-pixelify)" }}
          >
            <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] bg-clip-text text-transparent">
              Ascend
            </span>
          </span>
        </div>

        <div className="mb-8 h-1 rounded-full bg-[var(--bg-elevated)] overflow-hidden panel-frame">
          <div
            className="h-full bg-[var(--accent-primary)] transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--danger)]/10 text-[var(--danger)] text-sm panel-frame">
            {error}
          </div>
        )}

        {/* Step 1: Welcome / World Entry - game intro */}
        {currentStep === "welcome" && (
          <Card className="space-y-6 world-panel panel-corner">
            <div className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
              THE WORLD AWAITS
            </div>
            <h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Welcome, Traveler
            </h1>
            <p className="text-[var(--text-muted)]">
              The path ahead awaits. Create your character, choose your build, and
              forge your path. Your journey begins now.
            </p>
            <Button onClick={() => setStep(1)} variant="primary">
              Enter the World
            </Button>
          </Card>
        )}

        {/* Step 2: Character Identity */}
        {currentStep === "identity" && (
          <Card className="space-y-6 world-panel">
            <div className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
              CREATE YOUR CHARACTER
            </div>
            <h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Character Identity
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Display name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                  placeholder="username"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                    placeholder="—"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                  >
                    <option value="">—</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                    placeholder="—"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                    placeholder="—"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Choose Your Path / Build */}
        {currentStep === "path" && (
          <Card className="space-y-6 world-panel">
            <div className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
              CHOOSE YOUR PATH
            </div>
            <h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Choose Your Path
            </h1>
            <p className="text-[var(--text-muted)]">
              Select your primary build focus. This shapes your stat priorities
              and daily targets.
            </p>
            <div className="space-y-2">
              {BUILD_FOCUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBuildFocus(opt)}
                  className={`w-full flex items-center justify-center p-4 rounded-lg border text-left transition-colors panel-frame ${
                    buildFocus === opt
                      ? "border-[var(--accent-primary)] bg-[var(--accent-subtle)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-default)]"
                  }`}
                >
                  <span className="font-medium text-[var(--text-primary)]">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Supporting Priorities */}
        {currentStep === "priorities" && (
          <Card className="space-y-6 world-panel">
            <div className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
              YOUR PRIORITIES
            </div>
            <h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Supporting Priorities
            </h1>
            <p className="text-[var(--text-muted)]">
              What else matters to you? Select all that apply.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUPPORTING_PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePriority(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize panel-frame ${
                    supportingPriorities.includes(p)
                      ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)]"
                      : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {p.replace(/_/g, " ")}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setStep(4)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 5: Choose What to Track */}
        {currentStep === "tracking" && (
          <Card className="space-y-6 world-panel">
            <div className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
              DAILY TARGETS
            </div>
            <h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Choose What to Track
            </h1>
            <p className="text-[var(--text-muted)]">
              Select the systems you want to track. These become your daily
              targets.
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {TRACKING_SYSTEMS.filter((t) => t !== "custom_habits").map(
                (id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleTracking(id)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors panel-frame ${
                      selectedTracking.includes(id)
                        ? "border-[var(--accent-primary)]/50 bg-[var(--accent-subtle)]"
                        : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-default)]"
                    }`}
                  >
                    <span className="text-[var(--text-primary)]">
                      {TRACKING_SYSTEM_LABELS[id]}
                    </span>
                    {selectedTracking.includes(id) && (
                      <span className="text-sm text-[var(--xp-accent)] font-medium">
                        ✓
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Protein target (g)
                </label>
                <input
                  type="number"
                  value={proteinTarget}
                  onChange={(e) => setProteinTarget(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Water (glasses)
                </label>
                <input
                  type="number"
                  value={waterTarget}
                  onChange={(e) => setWaterTarget(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Sleep target (hours)
                </label>
                <input
                  type="number"
                  value={sleepTarget}
                  onChange={(e) => setSleepTarget(e.target.value)}
                  step="0.5"
                  className="w-full h-11 px-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] panel-frame"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setStep(5)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 6: Character Summary */}
        {currentStep === "summary" && (
          <Card className="space-y-6 world-panel panel-corner">
            <div className="text-xs tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--font-pixelify)" }}>
              YOUR BUILD IS READY
            </div>
            <h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              Character Summary
            </h1>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-[var(--text-muted)]">Name:</span>{" "}
                {displayName || "—"}
              </p>
              <p>
                <span className="text-[var(--text-muted)]">Path:</span>{" "}
                {buildFocus || "—"}
              </p>
              <p>
                <span className="text-[var(--text-muted)]">Priorities:</span>{" "}
                {supportingPriorities.length > 0
                  ? supportingPriorities.join(", ")
                  : "—"}
              </p>
              <p>
                <span className="text-[var(--text-muted)]">Tracking:</span>{" "}
                {selectedTracking.length > 0
                  ? selectedTracking
                      .map((t) => TRACKING_SYSTEM_LABELS[t as keyof typeof TRACKING_SYSTEM_LABELS])
                      .join(", ")
                  : "—"}
              </p>
            </div>
            <p className="text-[var(--text-muted)]">
              Your character is ready. Begin your journey.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button
                variant="primary"
                isLoading={isLoading}
                onClick={handleComplete}
              >
                Begin Journey
              </Button>
            </div>
          </Card>
        )}
        </div>
      </div>
    </WorldLayout>
  );
}

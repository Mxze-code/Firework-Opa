"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import GameMenuWindow from "@/components/ui/GameMenuWindow";

export default function ForgotPasswordPage() {
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!isConfigured) {
      setError("Supabase is not configured.");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setSuccess("Check your email for a link to reset your password.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GameMenuWindow
      title="Recover Path"
      subtitle="Restore access to your character"
    >
      <p className="text-[var(--text-muted)] mb-4">
        Enter your email and we&apos;ll send a link to restore your journey.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-[var(--danger)]/10 text-[var(--danger)] text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-[var(--success)]/10 text-[var(--success)] text-sm">
            {success}
          </div>
        )}
        <div className="game-input-group">
          <label className="game-input-label">Email</label>
          <div className="game-input-shell">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="game-input"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          variant="primary"
        >
          Send Reset Link
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
        <Link href="/login" className="text-[var(--accent-primary)] hover:underline">
          Back to Continue Journey
        </Link>
      </p>
    </GameMenuWindow>
  );
}

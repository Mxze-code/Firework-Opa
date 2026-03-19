"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import GameMenuWindow from "@/components/ui/GameMenuWindow";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { isConfigured } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    if (!isConfigured) {
      setError("Supabase is not configured.");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setSuccess("Password updated. Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GameMenuWindow
      title="Set New Password"
      subtitle="Secure your path forward"
    >
      <p className="text-[var(--text-muted)] mb-4">
        Enter your new password to restore your journey.
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
          <label className="game-input-label">New Password</label>
          <div className="game-input-shell">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="game-input"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="game-input-group">
          <label className="game-input-label">Confirm Password</label>
          <div className="game-input-shell">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="game-input"
              placeholder="••••••••"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          variant="primary"
        >
          Update Password
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import GameMenuWindow from "@/components/ui/GameMenuWindow";

export default function RegisterPage() {
  const router = useRouter();
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (err) throw err;

      if (data.user?.identities?.length === 0) {
        setError("An account with this email already exists.");
        setIsLoading(false);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      if (data.user) {
        setSuccess(
          "Check your email to confirm your account. Click the link in the confirmation email to continue."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <GameMenuWindow title="Configuration Required">
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Configuration Required
          </h1>
          <p className="text-[var(--text-muted)] mb-4">
            Add your Supabase URL and anon key to .env.local.
          </p>
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
      </GameMenuWindow>
    );
  }

  return (
    <GameMenuWindow
      title="Create Character"
      subtitle="Shape the traveler who will enter this world"
    >
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
          <label className="game-input-label">Display Name</label>
          <div className="game-input-shell">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="game-input"
              placeholder="Your name"
            />
          </div>
        </div>
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
        <div className="game-input-group">
          <label className="game-input-label">Password</label>
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
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Minimum 6 characters
          </p>
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          variant="primary"
        >
          Begin Journey
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
        Already have a character?{" "}
        <Link
          href="/login"
          className="text-[var(--accent-primary)] hover:underline"
        >
          Continue Journey
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-[var(--text-muted)]">
        <Link href="/">Back to lobby</Link>
      </p>
    </GameMenuWindow>
  );
}

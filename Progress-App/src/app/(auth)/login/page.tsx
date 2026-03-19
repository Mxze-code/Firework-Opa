"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import GameMenuWindow from "@/components/ui/GameMenuWindow";

export default function LoginPage() {
  const router = useRouter();
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!isConfigured) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) throw err;
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
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
            Add your Supabase URL and anon key to .env.local to enable authentication.
          </p>
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
      </GameMenuWindow>
    );
  }

  return (
    <GameMenuWindow
      title="Continue Journey"
      subtitle="Return to the character you forged"
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
              className="game-input"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          variant="primary"
        >
          Enter World
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
        New traveler?{" "}
        <Link
          href="/register"
          className="text-[var(--accent-primary)] hover:underline"
        >
          Create Character
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-[var(--text-muted)]">
        <Link href="/">Back to lobby</Link>
      </p>
    </GameMenuWindow>
  );
}

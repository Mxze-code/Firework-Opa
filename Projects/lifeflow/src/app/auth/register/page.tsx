import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useState, useTransition, FormEvent } from "react";

export default function RegisterPage() {
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      redirect("/dashboard");
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-black/40 p-6 shadow-soft backdrop-blur-xl">
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-lg font-semibold tracking-tight">Willkommen bei LifeFlow</h1>
          <p className="text-xs text-muted-foreground">
            Lege dein Life-Dashboard in wenigen Sekunden an.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">E-Mail-Adresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border/70 bg-black/40 px-3 py-2 text-sm outline-none ring-offset-[hsl(var(--background))] focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2"
              placeholder="du@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border/70 bg-black/40 px-3 py-2 text-sm outline-none ring-offset-[hsl(var(--background))] focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2"
              placeholder="Mindestens 8 Zeichen"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-1 w-full rounded-xl"
            disabled={isPending}
          >
            {isPending ? "Account wird erstellt..." : "Account erstellen"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Bereits registriert?{" "}
          <Link href="/auth/login" className="text-sky-400 hover:underline">
            Zum Login
          </Link>
        </p>
      </div>
    </div>
  );
}


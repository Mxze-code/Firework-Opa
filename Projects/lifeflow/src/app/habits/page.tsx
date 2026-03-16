import { AppShell } from "@/components/layout/shell";

export default function HabitsPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Habit Tracker
            </h1>
            <p className="text-xs text-muted-foreground">
              Kleine Gewohnheiten, die sich auszahlen – mit Streaks, Kalender und Fortschritt.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Tägliche Habits</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Wasser: 6 Gläser</li>
              <li>• Bewegung: 20 Minuten</li>
              <li>• Fokus: 1 Block ohne Unterbrechung</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Wöchentliche Habits</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Weekly Review</li>
              <li>• Meal Prep</li>
              <li>• Finanzen kurz checken</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Streaks & Übersicht</h2>
            <p className="mt-3 text-xs text-muted-foreground">
              Hier siehst du deine Streaks, Erfolgsquoten und die Tage, an denen du bewusst
              aufgeladen hast.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


import { AppShell } from "@/components/layout/shell";

export default function WeeklyReviewPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Weekly Review
            </h1>
            <p className="text-xs text-muted-foreground">
              Ein ruhiger Blick zurück, ein klarer Blick nach vorn – für eine Woche mit Absicht.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Was lief gut?</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Ort für Highlights, kleine Siege und Dinge, die wiederholt werden sollten.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Was war zäh?</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Raum für Reibungspunkte, übervolle Tage und Muster, aus denen du lernen kannst.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Nächste Woche</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Offene Aufgaben, Ziel-Fortschritt, Habit-Auswertung und drei Klarheiten für die nächste Woche.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


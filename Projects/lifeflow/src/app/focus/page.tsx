import { AppShell } from "@/components/layout/shell";

export default function FocusPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Fokus & Deep Work
            </h1>
            <p className="text-xs text-muted-foreground">
              Pomodoro, Fokus-Sessions, Deep-Work-Timer – mit klarer Zuordnung zu deinen Aufgaben.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Fokus-Timer</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Hier entsteht dein Pomodoro- bzw. Deep-Work-Timer mit Auswahl einer Aufgabe, Session-
              Historie und wöchentlicher Fokusstatistik.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Ablenkungsfreier Modus</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Vollbild-Fokus, klare Restzeit-Anzeige und nur das, was gerade wirklich zählt.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


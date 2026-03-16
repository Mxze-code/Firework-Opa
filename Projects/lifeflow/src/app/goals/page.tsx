import { AppShell } from "@/components/layout/shell";

export default function GoalsPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Ziele & Fortschritt
            </h1>
            <p className="text-xs text-muted-foreground">
              Verbinde Jahresziele mit Monats- und Wochenzielen und den konkreten nächsten Schritten.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Jahresziele</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Große Linien für das Jahr – mit Klarheit, warum sie wichtig sind.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Monats- & Wochenziele</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Runtergebrochen in realistische Schritte, die in deinen Kalender passen.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Fortschritt & Verknüpfung</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Aufgaben, Habits und Fokusblöcke knüpfen direkt an deine Ziele an – sichtbar im
              Dashboard.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


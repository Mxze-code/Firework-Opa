import { AppShell } from "@/components/layout/shell";

export default function HealthPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Health & Wellbeing
            </h1>
            <p className="text-xs text-muted-foreground">
              Schlaf, Wasser, Bewegung, Stimmung – ein leichtes tägliches Check‑In, kein medizinisches Tool.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Schlaf</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Dauer, Qualität, Einschlafzeit – genug Daten, um Muster zu erkennen.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Wasser</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Simple Tracker für Gläser, Flaschen oder Liter – schnell auf dem Handy tippbar.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Bewegung</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Schritte, Training ja/nein, kleine Einheiten – fern von Perfektionismus.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Stimmung & Energie</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Kurze Skala für Stimmung, Stress und Energie, um deinen Alltag besser einzuordnen.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


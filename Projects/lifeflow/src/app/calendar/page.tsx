import { AppShell } from "@/components/layout/shell";

export default function CalendarPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Kalender & Zeitblöcke
            </h1>
            <p className="text-xs text-muted-foreground">
              Tages-, Wochen- und Monatsüberblick über Termine, Aufgaben und Fokuszeiten.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">
              Hier entsteht deine visuelle Kalenderansicht mit Tages-, Wochen- und Monatsmodus.
              Bereits vorbereitet: Platz für Time-Blocking, Fokusfenster und freie Slots.
            </p>
          </section>

          <section className="space-y-3 rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Nächste Fokusfenster</h2>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>09:00–11:00 · Deep Work</span>
                <span className="text-emerald-300">Heute</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <span>14:00–15:30 · Projekt</span>
                <span className="text-sky-300">Heute</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


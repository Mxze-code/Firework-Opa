import { AppShell } from "@/components/layout/shell";

const focusBlocks = [
  { label: "Deep Work", time: "09:00–11:00", status: "geplant" },
  { label: "Project Window", time: "14:00–16:00", status: "fokus" },
];

export default function DashboardPage() {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Willkommen zurück
            </p>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Dein LifeFlow für heute
            </h1>
            <p className="text-xs text-muted-foreground">
              {formatter.format(today)} · Ein klarer Überblick über Aufgaben, Energie und Fokus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/70 bg-black/40 px-3 py-1">
              „Was ist heute am wichtigsten?“ → oben rechts für dich hervorgehoben.
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-black/40 px-4 py-3 shadow-soft">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Heute am wichtigsten
                </p>
                <p className="mt-1 text-sm font-medium">
                  3 Tiefenaufgaben, 1 Fokusblock, 1 bewusster Abschluss.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-black/40 px-4 py-3 shadow-soft">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Aufgaben
                </p>
                <p className="mt-1 text-sm font-medium">5 von 12 heute geplant</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-black/40 px-4 py-3 shadow-soft">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Habits
                </p>
                <p className="mt-1 text-sm font-medium">
                  4 von 6 auf Kurs · 3‑Tage-Streak
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold tracking-tight">
                    Nächste Schritte heute
                  </h2>
                  <span className="text-[11px] text-muted-foreground">
                    aus deinen Aufgaben & Zielen
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <p>• Abschluss: eine klare Aufgabe „done“ + Review.</p>
                  <p>• Fokus: 90 Minuten ununterbrochene Arbeit an einem Thema.</p>
                  <p>• Energie: Wasser, Bewegung, digitale Ruhe vor dem Schlafen.</p>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold tracking-tight">
                    Fokusblöcke
                  </h2>
                  <span className="text-[11px] text-muted-foreground">Time Blocking</span>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  {focusBlocks.map((b) => (
                    <div
                      key={b.label}
                      className="flex items-center justify-between rounded-xl border border-border/70 bg-white/5 px-3 py-2"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-medium text-foreground">
                          {b.label}
                        </span>
                        <span>{b.time}</span>
                      </div>
                      <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] text-emerald-300">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
              <h2 className="text-sm font-semibold tracking-tight">
                Health & Energy Quick-Tracking
              </h2>
              <div className="mt-3 grid gap-3 text-xs text-muted-foreground md:grid-cols-2">
                <div className="space-y-1 rounded-xl border border-border/70 bg-white/5 px-3 py-2">
                  <p>Schlaf</p>
                  <p className="text-sm font-medium text-foreground">7 h · leicht erholsam</p>
                </div>
                <div className="space-y-1 rounded-xl border border-border/70 bg-white/5 px-3 py-2">
                  <p>Wasser</p>
                  <p className="text-sm font-medium text-foreground">2 von 6 Gläsern</p>
                </div>
                <div className="space-y-1 rounded-xl border border-border/70 bg-white/5 px-3 py-2">
                  <p>Bewegung</p>
                  <p className="text-sm font-medium text-foreground">10 min eingeplant</p>
                </div>
                <div className="space-y-1 rounded-xl border border-border/70 bg-white/5 px-3 py-2">
                  <p>Stimmung</p>
                  <p className="text-sm font-medium text-foreground">ruhig fokussiert</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
              <h2 className="text-sm font-semibold tracking-tight">
                Daily Insight
              </h2>
              <p className="mt-2 text-xs text-muted-foreground">
                Die beste Tagesplanung ist nicht voll, sondern präzise. Drei klar definierte
                Ergebnisse schlagen eine Liste mit 20 diffusen Aufgaben – LifeFlow hilft dir, genau
                diese drei zu sehen.
              </p>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


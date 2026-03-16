import { AppShell } from "@/components/layout/shell";

export default function RoutinesPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Morgen- & Abendroutinen
            </h1>
            <p className="text-xs text-muted-foreground">
              Baue konsistente Routinen für deinen Start in den Tag und einen ruhigen Abschluss.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Morning Flow</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Aufstehen ohne Scrollen</li>
              <li>• Wasser & kurzes Stretching</li>
              <li>• 3 Klarheiten für den Tag definieren</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Evening Reset</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Offene Loops notieren</li>
              <li>• Morgen grob vormarkieren</li>
              <li>• Digital runterfahren</li>
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


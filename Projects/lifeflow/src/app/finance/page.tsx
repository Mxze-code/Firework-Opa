import { AppShell } from "@/components/layout/shell";

export default function FinancePage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Finanzen light
            </h1>
            <p className="text-xs text-muted-foreground">
              Ausgaben, Kategorien, Monatsüberblick – ein klarer persönlicher Blick ohne Banking‑Komplexität.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Monatsübersicht</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Orte für „Fixkosten“, „Flexibel“, „Nice to have“ – inkl. simpler Budgetbalken pro Kategorie.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Kurz-Insights</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Kleine Hinweise wie „diese Woche höher als Durchschnitt“ oder „ungewöhnlich viele
              Restaurantbesuche“ – ohne Judgment, nur Orientierung.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


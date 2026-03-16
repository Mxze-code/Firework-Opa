import { AppShell } from "@/components/layout/shell";

export default function MealsPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Mahlzeiten & Meal Planning
            </h1>
            <p className="text-xs text-muted-foreground">
              Plane deine Woche mit einfachen, gesunden und wiederkehrenden Mahlzeiten.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Wochenplanung</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Eine klare Wochenmatrix für Frühstück, Mittag und Abend – inkl. Tags wie „Quick“,
              „Meal Prep“, „Healthy“.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Rezepte & Einkauf</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Rezepte speichern, Mahlzeiten planen und automatisch Einkaufslisten generieren – alles
              an einem Ort.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


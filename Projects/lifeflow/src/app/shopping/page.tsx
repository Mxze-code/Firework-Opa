import { AppShell } from "@/components/layout/shell";

export default function ShoppingPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Einkaufslisten
            </h1>
            <p className="text-xs text-muted-foreground">
              Klare, mobile-taugliche Listen für Einkäufe – mit Kategorien, Favoriten und Routinen.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Lebensmittel</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Standardprodukte, Meal-Prep-Basics und schnelle Ergänzungen für den Alltag.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Haushalt</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Putzmittel, Papier, Kleinigkeiten – gesammelt statt auf tausend Post-its.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Drogerie</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Wiederkehrende Artikel, die du nie wieder „spontan“ vergessen möchtest.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


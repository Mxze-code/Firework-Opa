import { AppShell } from "@/components/layout/shell";

export default function NotesPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Notizen & Brain Dump
            </h1>
            <p className="text-xs text-muted-foreground">
              Ein klarer Raum für Gedanken, Ideen und schnelle Notizen – verknüpfbar mit Aufgaben.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">
              Hier entsteht dein Notizbereich mit Kategorien, Suche, Favoriten und Markdown-Unterstützung.
              Perfekt für Brain Dumps, Projektideen und Journals.
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-black/40 p-4 shadow-soft">
            <h2 className="text-sm font-semibold tracking-tight">Schnelle Gedanken</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Leere deinen Kopf in Sekunden, verknüpfe Notizen mit Aufgaben oder Zielen und sorge
              dafür, dass nichts Wichtiges verloren geht.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}


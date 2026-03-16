import { AppShell } from "@/components/layout/shell";

const demoTasks = [
  {
    id: 1,
    title: "Projektstruktur für LifeFlow prüfen",
    priority: "hoch",
    due: "Heute",
    section: "Heute",
  },
  {
    id: 2,
    title: "Review: Week Plan",
    priority: "mittel",
    due: "Morgen",
    section: "Diese Woche",
  },
  {
    id: 3,
    title: "Haushalt – Einkauf vorbereiten",
    priority: "niedrig",
    due: "Offen",
    section: "Später",
  },
];

export default function TasksPage() {
  return (
    <AppShell>
      <div className="container py-5 md:py-7">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Aufgaben</h1>
            <p className="text-xs text-muted-foreground">
              Sammle, strukturiere und priorisiere alles, was deinen Kopf belastet.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {["Heute", "Diese Woche", "Später"].map((column) => (
            <div
              key={column}
              className="rounded-2xl border border-border/70 bg-black/40 p-3 shadow-soft"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-medium">{column}</h2>
                <span className="text-[11px] text-muted-foreground">
                  {demoTasks.filter((t) => t.section === column).length} Einträge
                </span>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                {demoTasks
                  .filter((t) => t.section === column)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="rounded-xl border border-border/70 bg-white/5 px-3 py-2"
                    >
                      <p className="text-sm font-medium text-foreground">{t.title}</p>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span>{t.due}</span>
                        <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-sky-300">
                          {t.priority}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}


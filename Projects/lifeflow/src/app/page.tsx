import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const heroStats = [
  { label: "Heute", value: "klar", hint: "Tagesfokus & Prioritäten" },
  { label: "Woche", value: "strukturiert", hint: "Aufgaben, Termine & Ziele" },
  { label: "Leben", value: "ausgerichtet", hint: "Routinen, Habits & Energie" },
];

export default function LandingPage() {
  return (
    <div className="lifeflow-shell">
      <header className="border-b border-border/70 bg-black/40 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-blue-500 via-sky-400 to-emerald-400 shadow-soft" />
            <span className="text-sm font-semibold tracking-tight">LifeFlow</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/register">Kostenlos starten</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid gap-10 py-10 md:grid-cols-[1.1fr_0.9fr] md:py-16 lg:py-20">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/40 px-3 py-1 text-xs text-muted-foreground shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.45)]" />
              LifeFlow · Organisiere dein ganzes Leben an einem Ort.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
              className="space-y-4"
            >
              <h1 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Dein persönliches Life OS –{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  klar, ruhig, fokussiert
                </span>
                .
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                LifeFlow bündelt Aufgaben, Kalender, Routinen, Habits, Finanzen, Gesundheit und mehr
                in einem aufgeräumten Dashboard. Nicht noch ein Tool – sondern dein zentraler
                Startpunkt für jeden Tag.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button size="lg" className="rounded-xl px-6" asChild>
                <Link href="/auth/register">LifeFlow kostenlos testen</Link>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-xl" asChild>
                <Link href="/dashboard">Demo-Dashboard ansehen</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
              className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3"
            >
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/60 bg-gradient-to-b from-white/5 to-white/[0.02] px-3 py-3 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-emerald-400/90">{item.hint}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="relative"
          >
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sky-500/40 blur-3xl" />
            <div className="absolute -right-6 bottom-0 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />

            <div className="relative rounded-3xl border border-border/70 bg-black/40 p-3 shadow-soft backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 rounded-2xl border border-border/60 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 px-3 py-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.45)]" />
                  <span className="text-muted-foreground">LifeFlow · Heute</span>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-muted-foreground">
                  Fokus-Block 2 · 14:00–16:00
                </span>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-3 rounded-2xl border border-border/60 bg-slate-950/80 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Heute, 12. März
                  </p>
                  <p className="text-sm font-semibold">
                    Klarer Tag, klare Kanten – drei Dinge, die heute zählen:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    <li>• Abschließen: 3 wichtigste Aufgaben</li>
                    <li>• Schützen: 1 Fokus-Block ohne Störungen</li>
                    <li>• Nähren: Wasser, Bewegung, ein ruhiger Abend</li>
                  </ul>
                </div>

                <div className="space-y-3 rounded-2xl border border-border/60 bg-slate-950/80 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Heute auf deinem Radar</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span>Deep-Work Block</span>
                      <span className="text-emerald-400">14:00</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span>Weekly Review</span>
                      <span className="text-sky-400">20:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 text-xs text-muted-foreground md:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Fokus
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">2 von 3 Blöcken geplant</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Habits
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">4 von 6 im grünen Bereich</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Energie
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    7/10 · stabil, mit Luft nach oben
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}


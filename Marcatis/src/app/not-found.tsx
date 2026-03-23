import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col justify-center border-t border-white/10 bg-black px-6 py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-600">404</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
          Seite nicht gefunden
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          Die angeforderte Seite existiert nicht. Zurück zur Startseite oder zum Kontakt.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-industrial">
            Startseite
          </Link>
          <Link href="/kontakt" className="btn-industrial-outline">
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}

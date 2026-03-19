import Link from "next/link";

export default function NotFound() {
  // #region agent log: app_not_found_rendered
  try {
    fetch("http://127.0.0.1:7476/ingest/b6242a0e-a692-4f5b-a25d-021bcf953343", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "44401b",
      },
      body: JSON.stringify({
        sessionId: "44401b",
        id: `app_not_found_${Date.now()}`,
        timestamp: Date.now(),
        location: "app/not-found.tsx:render",
        message: "Not found boundary rendered",
        hypothesisId: "H2",
        runId: "pre_debug",
        data: {},
      }),
    }).catch(() => {});
  } catch {
    // ignore
  }
  // #endregion

  return (
    <div className="min-h-[50vh] py-16 md:py-24">
      <div className="mx-auto max-w-xl px-6">
        <h1 className="font-heading text-2xl font-bold text-[#f0f4f8] md:text-3xl">
          Seite nicht gefunden
        </h1>
        <p className="mt-3 text-[#94a3b8]">
          Das angefragte Produkt oder die Seite existiert leider nicht.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/katalog"
            className="border border-[#c9a227] px-6 py-3 text-center text-sm font-medium text-[#c9a227] hover:bg-[#c9a227]/10 transition"
          >
            Zurueck zum Katalog
          </Link>
          <Link
            href="/"
            className="border border-[#2d3a4d] px-6 py-3 text-center text-sm font-medium text-[#94a3b8] hover:border-[#c9a227]/50 hover:text-[#f0f4f8] hover:bg-white/5 transition"
          >
            Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}


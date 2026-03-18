import Link from "next/link";

const cards = [
  {
    title: "Feuerwerksverkauf an Weiterverkäufer",
    description:
      "Professioneller Feuerwerksverkauf an Weiterverkäufer.",
  },
  {
    title: "Feuerwerksverkauf seit 1951",
    description:
      "Verkauf seit über sieben Jahrzehnten.",
  },
  {
    title: "Zum Katalog",
    description: "Übersicht unseres aktuellen Sortiments.",
    href: "/katalog",
    isLink: true,
  },
];

export function FeatureCardsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {/* Dezente Trennlinie */}
        <div className="mb-16 h-px w-24 bg-[#2d3a4d]" />
        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {cards.map((card) => {
            const content = (
              <div className="flex h-full flex-col rounded border border-[#2d3a4d] bg-[#1a2332] p-8 lg:p-10 transition-all duration-300 ease-out hover:border-[#c9a227]/40 hover:bg-[#243044] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1">
                <h3 className="font-heading text-lg font-semibold text-[#f0f4f8]">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[#94a3b8]">{card.description}</p>
                {card.isLink && (
                  <span className="mt-4 text-sm font-medium text-[#c9a227]">
                    Mehr erfahren →
                  </span>
                )}
              </div>
            );

            return card.href ? (
              <Link key={card.title} href={card.href}>
                {content}
              </Link>
            ) : (
              <div key={card.title}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

type Props = {
  items: readonly TestimonialItem[];
};

/**
 * Kundenstimmen: festes Spalten-Grid (wie klassische marcatis.de-Anmutung) — kein Slider.
 */
export function KundenstimmenGrid({ items }: Props) {
  return (
    <ul
      className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-4 xl:gap-8"
      role="list"
    >
      {items.map((t) => (
        <li key={`${t.name}-${t.role}`} className="min-h-0">
          <figure className="flex h-full min-h-0 flex-col border border-white/12 bg-zinc-950/35 p-6 md:p-7">
            <blockquote className="min-h-0 flex-1 whitespace-pre-line text-[0.9375rem] leading-[1.65] text-zinc-300 md:leading-relaxed">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 shrink-0 border-t border-white/10 pt-6 md:mt-9 md:pt-7">
              <span className="block font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-tight text-white md:text-sm">
                {t.name}
              </span>
              <span className="mt-2 block text-[11px] leading-snug text-zinc-500 md:text-xs md:leading-relaxed">
                {t.role}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

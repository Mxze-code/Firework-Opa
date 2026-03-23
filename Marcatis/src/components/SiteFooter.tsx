import Link from "next/link";
import { company } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex w-full flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14 xl:px-16 2xl:px-24">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-zinc-500">{company.legalName}</p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-600">
            {company.street} · {company.zip} {company.city}
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
          <Link href="/impressum" className="transition hover:text-m-red">
            Impressum
          </Link>
          <Link href="/datenschutz" className="transition hover:text-m-red">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LifeFlow — Dein zentrales Life OS",
  description: "Organisiere Aufgaben, Termine, Gewohnheiten, Finanzen und mehr in einem klaren, modernen Life Dashboard.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-[radial-gradient(1200px_800px_at_0%_0%,rgba(59,130,246,0.35),transparent_60%),radial-gradient(1000px_700px_at_100%_10%,rgba(45,212,191,0.28),transparent_55%),radial-gradient(900px_700px_at_50%_100%,rgba(129,140,248,0.22),transparent_60%),hsl(var(--background))] text-foreground">
        {children}
      </body>
    </html>
  );
}


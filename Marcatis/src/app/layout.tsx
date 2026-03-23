import type { Metadata } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { IndustrialHeader } from "@/components/industrial/IndustrialHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { company } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marcatis.de"),
  title: {
    default: `${company.brand} · Industrielle Laserbearbeitung`,
    template: `%s · ${company.brand}`,
  },
  description:
    "Laserbeschriftung, Laserfeinschneiden und 3D-Lasergravur — präzise und prozesssicher. Aschaffenburg.",
  openGraph: {
    title: `${company.brand} · Industrielle Laserbearbeitung`,
    description:
      "Präzision für Metall, Kunststoff und Spezialwerkstoffe — mit moderner Technik und über zehn Jahren Erfahrung.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${space.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black text-zinc-100 antialiased">
        <IndustrialHeader />
        <main className="flex-1 pt-[var(--site-header-h)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

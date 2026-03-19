"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import WorldLayout from "@/components/world/WorldLayout";

type ZoneType = "training" | "nutrition" | "recovery" | "progress" | "default";

const ZONE_OBJECTS: Record<string, ("dumbbell" | "campfire" | "meal" | "water" | "bed" | "sun" | "shrine")[]> = {
  "/training": ["dumbbell", "shrine", "water", "meal"],
  "/nutrition": ["meal", "campfire", "water", "sun"],
  "/recovery": ["bed", "campfire", "water", "sun"],
  "/progress": ["shrine", "dumbbell", "meal", "bed"],
  "/profile": ["shrine", "dumbbell", "meal", "water"],
  "/quests": ["shrine", "dumbbell", "meal", "campfire"],
  "/dashboard": ["dumbbell", "campfire", "meal", "water", "bed", "sun", "shrine"],
};

const PATH_TO_ZONE: Record<string, ZoneType> = {
  "/training": "training",
  "/nutrition": "nutrition",
  "/recovery": "recovery",
  "/progress": "progress",
  "/profile": "progress",
  "/quests": "progress",
};

const DEFAULT_OBJECTS = ["dumbbell", "campfire", "meal", "water", "bed", "sun", "shrine"] as const;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const fitnessObjects = ZONE_OBJECTS[pathname] ?? DEFAULT_OBJECTS;
  const zone = PATH_TO_ZONE[pathname] ?? "default";

  return (
    <WorldLayout variant="app" fitnessObjects={fitnessObjects} zone={zone}>
      <div className="min-h-screen flex">
        <aside className="hidden md:block w-20 lg:w-56 flex-shrink-0 relative z-20">
          <div className="fixed top-0 left-0 h-screen w-20 lg:w-56 border-r-4 border-[var(--stone-mid)] bg-[var(--bg-secondary)]/95 backdrop-blur-sm world-panel">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-6 border-b border-[var(--border-frame)]"
          >
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-pixelify)" }}
            >
              <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] bg-clip-text text-transparent">
                Ascend
              </span>
            </span>
          </Link>
          <Navbar />
        </div>
      </aside>
        <main className="flex-1 md:ml-20 lg:ml-56 pb-20 md:pb-0 min-h-screen">
          {children}
        </main>
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20">
          <Navbar />
        </div>
      </div>
    </WorldLayout>
  );
}

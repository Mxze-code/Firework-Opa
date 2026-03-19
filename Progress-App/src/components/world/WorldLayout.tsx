"use client";

import PixelSky from "./PixelSky";
import PixelGround from "./PixelGround";
import PixelDecorations from "./PixelDecorations";
import FitnessObjects from "./FitnessObjects";

export type ZoneType =
  | "training"
  | "nutrition"
  | "recovery"
  | "progress"
  | "default";

interface WorldLayoutProps {
  children: React.ReactNode;
  variant?: "full" | "app" | "minimal";
  fitnessObjects?: ("dumbbell" | "campfire" | "bed" | "water" | "meal" | "sun" | "shrine")[];
  zone?: ZoneType;
}

const ZONE_OVERLAYS: Record<ZoneType, string> = {
  training:
    "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(201, 162, 39, 0.08) 0%, transparent 50%)",
  nutrition:
    "radial-gradient(ellipse 50% 50% at 80% 70%, rgba(90, 143, 90, 0.1) 0%, transparent 50%)",
  recovery:
    "radial-gradient(ellipse 70% 50% at 50% 90%, rgba(74, 122, 201, 0.06) 0%, transparent 50%)",
  progress:
    "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201, 162, 39, 0.05) 0%, transparent 60%)",
  default: "none",
};

export default function WorldLayout({
  children,
  variant = "full",
  fitnessObjects,
  zone = "default",
}: WorldLayoutProps) {
  const showFitness =
    fitnessObjects ??
    (variant === "full"
      ? ["dumbbell", "campfire", "meal", "water", "bed", "sun"]
      : ["dumbbell", "campfire", "meal", "water"]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Sky - always at top */}
      <PixelSky />

      {/* Mid section - gradient transition: sky to lush forest (reference style) */}
      <div
        className="absolute top-32 md:top-48 left-0 right-0 bottom-32 md:bottom-40"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            rgba(45, 90, 60, 0.4) 20%,
            var(--forest-deep) 40%,
            var(--forest-dark) 70%,
            rgba(26, 45, 26, 0.98) 95%,
            transparent 100%)`,
        }}
      />

      {/* Subtle world texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h2v2H0zm4 4h2v2H4zm8 8h2v2h-2zM4 0h2v2H4zm8 4h2v2h-2zM0 8h2v2H0z' fill='%23fff'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Zone-specific atmospheric overlay */}
      {ZONE_OVERLAYS[zone] !== "none" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: ZONE_OVERLAYS[zone] }}
        />
      )}

      {/* Ground - always at bottom */}
      <PixelGround />

      {/* Decorative elements */}
      <PixelDecorations />

      {/* Fitness-themed world objects */}
      <FitnessObjects objects={showFitness} />

      {/* Content - sits in the world */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}

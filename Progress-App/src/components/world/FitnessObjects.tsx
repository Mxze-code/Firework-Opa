"use client";

type FitnessObjectType =
  | "dumbbell"
  | "campfire"
  | "bed"
  | "water"
  | "meal"
  | "sun"
  | "shrine";

const OBJECTS: Record<
  FitnessObjectType,
  { svg: string; w: number; h: number }
> = {
  /* Barbell station - two barbells on wooden bench (reference) */
  dumbbell: {
    w: 24,
    h: 12,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12'%3E%3Crect x='0' y='8' width='24' height='4' fill='%234a3d2a'/%3E%3Crect x='2' y='6' width='5' height='6' fill='%235a4d3a'/%3E%3Crect x='17' y='6' width='5' height='6' fill='%235a4d3a'/%3E%3Crect x='0' y='4' width='4' height='4' fill='%235c5c58'/%3E%3Crect x='4' y='3' width='2' height='6' fill='%238a8a84'/%3E%3Crect x='6' y='2' width='4' height='8' fill='%235c5c58'/%3E%3Crect x='10' y='3' width='2' height='6' fill='%238a8a84'/%3E%3Crect x='12' y='4' width='4' height='4' fill='%235c5c58'/%3E%3Crect x='18' y='3' width='2' height='6' fill='%238a8a84'/%3E%3Crect x='20' y='2' width='4' height='8' fill='%235c5c58'/%3E%3C/svg%3E`,
  },
  /* Canvas tent with glowing fire inside (reference) */
  campfire: {
    w: 16,
    h: 14,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 14'%3E%3Crect x='2' y='6' width='12' height='8' fill='%23d4b88a'/%3E%3Crect x='4' y='4' width='8' height='6' fill='%23e8d4a8'/%3E%3Crect x='6' y='2' width='4' height='4' fill='%23c9a86a'/%3E%3Crect x='5' y='8' width='2' height='4' fill='%234a3d2a'/%3E%3Crect x='9' y='8' width='2' height='4' fill='%234a3d2a'/%3E%3Crect x='6' y='6' width='4' height='4' fill='%23e6c84a'/%3E%3Crect x='7' y='5' width='2' height='2' fill='%23f0d050'/%3E%3Crect x='7' y='7' width='2' height='2' fill='%23c94a4a'/%3E%3C/svg%3E`,
  },
  /* Bed / recovery corner */
  bed: {
    w: 14,
    h: 8,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 8'%3E%3Crect x='0' y='4' width='14' height='4' fill='%23e8e0d4'/%3E%3Crect x='0' y='2' width='4' height='4' fill='%234a3d2a'/%3E%3Crect x='2' y='0' width='2' height='2' fill='%235a8f5a'/%3E%3Crect x='4' y='4' width='2' height='2' fill='%23e8e0d4'/%3E%3Crect x='8' y='4' width='2' height='2' fill='%23e8e0d4'/%3E%3Crect x='12' y='4' width='2' height='2' fill='%23e8e0d4'/%3E%3C/svg%3E`,
  },
  /* Water bottle / station */
  water: {
    w: 10,
    h: 12,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 12'%3E%3Crect x='2' y='4' width='6' height='8' fill='%234a7ac9'/%3E%3Crect x='2' y='2' width='6' height='2' fill='%235a8ac9'/%3E%3Crect x='3' y='6' width='4' height='2' fill='%233d6ab9'/%3E%3Crect x='1' y='8' width='2' height='4' fill='%235c5c58'/%3E%3Crect x='7' y='8' width='2' height='4' fill='%235c5c58'/%3E%3C/svg%3E`,
  },
  /* Meal table with steaming bowl, plates, food (reference) */
  meal: {
    w: 20,
    h: 14,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 14'%3E%3Crect x='0' y='10' width='20' height='4' fill='%234a3d2a'/%3E%3Crect x='2' y='8' width='16' height='4' fill='%235a4d3a'/%3E%3Crect x='4' y='4' width='8' height='6' fill='%23e8e0d4'/%3E%3Crect x='5' y='2' width='6' height='4' fill='%23f8f8f8'/%3E%3Crect x='6' y='0' width='4' height='2' fill='%23e0e0e0'/%3E%3Crect x='14' y='6' width='4' height='4' fill='%23c9a227'/%3E%3Crect x='15' y='5' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='8' width='2' height='2' fill='%235a8f5a'/%3E%3Crect x='16' y='8' width='2' height='2' fill='%23c94a4a'/%3E%3Crect x='18' y='8' width='2' height='2' fill='%23e6c84a'/%3E%3C/svg%3E`,
  },
  sun: {
    w: 10,
    h: 10,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect x='4' y='0' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='4' y='8' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='0' y='4' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='8' y='4' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='6' y='2' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='6' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='6' y='6' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='4' y='4' width='2' height='2' fill='%23f0d050'/%3E%3C/svg%3E`,
  },
  shrine: {
    w: 12,
    h: 14,
    svg: `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 14'%3E%3Crect x='2' y='10' width='8' height='4' fill='%235c5c58'/%3E%3Crect x='3' y='6' width='6' height='4' fill='%234a4a46'/%3E%3Crect x='4' y='2' width='4' height='4' fill='%235c5c58'/%3E%3Crect x='5' y='0' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='4' y='4' width='1' height='2' fill='%23e6c84a'/%3E%3Crect x='7' y='4' width='1' height='2' fill='%23e6c84a'/%3E%3C/svg%3E`,
  },
};

interface FitnessObjectsProps {
  objects?: FitnessObjectType[];
  className?: string;
}

export default function FitnessObjects({
  objects = ["dumbbell", "campfire", "meal", "water", "bed", "sun"],
  className = "",
}: FitnessObjectsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {objects.includes("dumbbell") && (
        <div
          className="absolute bottom-14 left-[14%] w-12 h-6 opacity-90"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.dumbbell.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
      {objects.includes("campfire") && (
        <div
          className="absolute bottom-16 right-[3%] w-8 h-7 opacity-90 animate-ambient-glow"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.campfire.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
      {objects.includes("bed") && (
        <div
          className="absolute bottom-12 right-[18%] w-7 h-4 opacity-85"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.bed.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
      {objects.includes("water") && (
        <div
          className="absolute bottom-14 left-[12%] w-5 h-6 opacity-90"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.water.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
      {objects.includes("meal") && (
        <div
          className="absolute bottom-16 left-[28%] w-10 h-7 opacity-90"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.meal.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
      {objects.includes("sun") && (
        <div
          className="absolute bottom-20 right-[28%] w-5 h-5 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.sun.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
      {objects.includes("shrine") && (
        <div
          className="absolute bottom-12 left-[35%] w-6 h-7 opacity-85"
          style={{
            backgroundImage: `url("data:image/svg+xml,${OBJECTS.shrine.svg}")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      )}
    </div>
  );
}

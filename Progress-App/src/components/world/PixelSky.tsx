"use client";

export default function PixelSky() {
  return (
    <div className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none overflow-hidden">
      {/* Bright clear blue daytime sky - reference style */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #5a9ad9 0%, 
            #6aaae9 15%,
            #7ab8f0 35%,
            #6aa8d8 55%,
            #4a8ab8 75%,
            #2d5a7a 90%,
            #1a3d5a 100%)`,
        }}
      />
      {/* Fluffy white pixel clouds */}
      <div
        className="absolute top-6 left-[8%] w-28 h-10 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 10'%3E%3Crect x='0' y='6' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='8' y='2' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='12' y='0' width='4' height='4' fill='%23f8f8f8'/%3E%3Crect x='16' y='2' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='20' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='24' y='6' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute top-14 right-[12%] w-24 h-8 opacity-85"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 8'%3E%3Crect x='2' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='6' y='2' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='10' y='0' width='4' height='4' fill='%23f8f8f8'/%3E%3Crect x='14' y='2' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='18' y='4' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute top-24 left-[35%] w-20 h-6 opacity-75"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 6'%3E%3Crect x='0' y='2' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='0' width='4' height='4' fill='%23f8f8f8'/%3E%3Crect x='8' y='2' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='12' y='0' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='16' y='2' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Sun - bright and prominent */}
      <div
        className="absolute top-4 right-[20%] w-14 h-14 animate-ambient-glow"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Crect x='5' y='0' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='5' y='10' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='0' y='5' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='10' y='5' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='2' y='2' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='8' y='2' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='2' y='8' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%23f5e050'/%3E%3Crect x='5' y='5' width='4' height='4' fill='%23fff8a0'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

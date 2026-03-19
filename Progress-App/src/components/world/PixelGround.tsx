"use client";

export default function PixelGround() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-36 md:h-44 pointer-events-none overflow-hidden">
      {/* Dirt path - brown gradient (reference: dirt path leading into scene) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(80, 55, 35, 0.4) 25%, #5a4030 50%, #4a3525 75%, #3d2d1a 100%)`,
        }}
      />
      {/* Stone steps - bottom edge */}
      <div
        className="absolute bottom-0 left-[15%] right-[15%] h-6"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 6'%3E%3Cdefs%3E%3Cpattern id='s' width='8' height='6' patternUnits='userSpaceOnUse'%3E%3Crect x='0' y='2' width='4' height='4' fill='%235c5c58'/%3E%3Crect x='2' y='0' width='4' height='4' fill='%234a4a46'/%3E%3Crect x='4' y='2' width='4' height='4' fill='%236a6a64'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='64' height='6' fill='url(%23s)'/%3E%3C/svg%3E")`,
          backgroundSize: "auto 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Lush vibrant grass - borders path (reference: heavily bordered grass) */}
      <div
        className="absolute bottom-6 left-0 right-0 h-16"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 16'%3E%3Cdefs%3E%3Cpattern id='g' width='8' height='16' patternUnits='userSpaceOnUse'%3E%3Crect x='0' y='6' width='8' height='10' fill='%234a3d2a'/%3E%3Crect x='0' y='0' width='8' height='6' fill='%234a8f4a'/%3E%3Crect x='0' y='2' width='8' height='2' fill='%234a7c4a'/%3E%3Crect x='2' y='0' width='2' height='3' fill='%235aaf5a'/%3E%3Crect x='4' y='1' width='2' height='2' fill='%234a8f4a'/%3E%3Crect x='2' y='0' width='2' height='2' fill='%236aaf6a'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='64' height='16' fill='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "auto 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Exposed roots in dirt */}
      <div
        className="absolute bottom-14 left-[8%] w-6 h-4 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 4'%3E%3Crect x='0' y='2' width='2' height='2' fill='%234a3d2a'/%3E%3Crect x='2' y='1' width='2' height='2' fill='%23c9a227'/%3E%3Crect x='4' y='2' width='2' height='2' fill='%234a3d2a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute bottom-12 right-[12%] w-6 h-4 opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 4'%3E%3Crect x='0' y='1' width='2' height='2' fill='%234a3d2a'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23c9a227'/%3E%3Crect x='4' y='1' width='2' height='2' fill='%234a3d2a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Stone accents */}
      <div
        className="absolute bottom-2 left-[5%] w-8 h-6 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 6'%3E%3Crect x='0' y='2' width='4' height='4' fill='%235c5c58'/%3E%3Crect x='2' y='0' width='4' height='4' fill='%234a4a46'/%3E%3Crect x='4' y='2' width='4' height='4' fill='%236a6a64'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute bottom-4 right-[10%] w-6 h-5 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 5'%3E%3Crect x='0' y='1' width='4' height='4' fill='%235c5c58'/%3E%3Crect x='2' y='0' width='4' height='4' fill='%234a4a46'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

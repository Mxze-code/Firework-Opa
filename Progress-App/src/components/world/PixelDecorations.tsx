"use client";

export default function PixelDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Distant pixel mountains - blue/purple hues (reference) */}
      <div
        className="absolute top-24 left-0 right-0 h-32 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 32'%3E%3Crect x='0' y='20' width='12' height='12' fill='%235a7a9a'/%3E%3Crect x='8' y='16' width='12' height='16' fill='%234a6a8a'/%3E%3Crect x='18' y='22' width='10' height='10' fill='%236a8aaa'/%3E%3Crect x='24' y='14' width='16' height='18' fill='%234a5a7a'/%3E%3Crect x='36' y='18' width='12' height='14' fill='%235a6a8a'/%3E%3Crect x='44' y='22' width='12' height='10' fill='%234a5a7a'/%3E%3Crect x='52' y='18' width='12' height='14' fill='%235a7a9a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Flowers - white (reference) */}
      <div
        className="absolute bottom-20 left-[6%] w-5 h-7 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 7'%3E%3Crect x='1' y='3' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='0' y='1' width='2' height='2' fill='%23ffffff'/%3E%3Crect x='2' y='1' width='2' height='2' fill='%23ffffff'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%23f8f8f8'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Flowers - purple (reference) */}
      <div
        className="absolute bottom-18 left-[12%] w-5 h-7 opacity-90 animate-ambient-float"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 7'%3E%3Crect x='1' y='3' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='0' y='1' width='2' height='2' fill='%238a5a9a'/%3E%3Crect x='2' y='1' width='2' height='2' fill='%239a6aaa'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%237a4a8a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Flowers - left side (yellow, red) */}
      <div
        className="absolute bottom-16 left-[8%] w-6 h-8 animate-ambient-float opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 8'%3E%3Crect x='2' y='4' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='1' y='2' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='3' y='2' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='0' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23c9a227'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute bottom-20 left-[15%] w-5 h-7 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 7'%3E%3Crect x='1' y='3' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='0' y='1' width='2' height='2' fill='%23c94a6a'/%3E%3Crect x='2' y='1' width='2' height='2' fill='%23c94a6a'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%23c94a6a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Flowers - right side */}
      <div
        className="absolute bottom-14 right-[12%] w-6 h-8 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 8'%3E%3Crect x='2' y='4' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='1' y='2' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='3' y='2' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='0' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23c9a227'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute bottom-24 right-[8%] w-5 h-7 opacity-75 animate-ambient-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 7'%3E%3Crect x='1' y='3' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='0' y='1' width='2' height='2' fill='%234a7ac9'/%3E%3Crect x='2' y='1' width='2' height='2' fill='%234a7ac9'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%234a7ac9'/%3E%3C/svg%3E")`,
            backgroundSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        />
      </div>
      {/* Mushroom */}
      <div
        className="absolute bottom-12 left-[3%] w-6 h-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 8'%3E%3Crect x='2' y='4' width='2' height='4' fill='%23e8e0d4'/%3E%3Crect x='0' y='2' width='6' height='4' fill='%23c94a4a'/%3E%3Crect x='1' y='2' width='1' height='2' fill='%23e8e0d4'/%3E%3Crect x='4' y='2' width='1' height='2' fill='%23e8e0d4'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Torch / lantern */}
      <div
        className="absolute bottom-20 left-[1%] w-4 h-10 opacity-90 animate-ambient-glow"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 10'%3E%3Crect x='0' y='6' width='4' height='4' fill='%234a3d2a'/%3E%3Crect x='1' y='2' width='2' height='4' fill='%235c5c58'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%23e6c84a'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%23f0d050' fill-opacity='0.7'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      <div
        className="absolute bottom-20 right-[1%] w-4 h-10 opacity-85 animate-ambient-glow"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 10'%3E%3Crect x='0' y='6' width='4' height='4' fill='%234a3d2a'/%3E%3Crect x='1' y='2' width='2' height='4' fill='%235c5c58'/%3E%3Crect x='1' y='0' width='2' height='2' fill='%23e6c84a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Vine */}
      <div
        className="absolute top-32 left-[2%] w-4 h-24 opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 24'%3E%3Crect x='1' y='0' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='0' y='4' width='2' height='4' fill='%232d5a2d'/%3E%3Crect x='2' y='8' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='1' y='12' width='2' height='4' fill='%232d5a2d'/%3E%3Crect x='0' y='16' width='2' height='4' fill='%233d6b3d'/%3E%3Crect x='2' y='20' width='2' height='4' fill='%232d5a2d'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Wooden bulletin board - quest board style (reference) */}
      <div
        className="absolute bottom-16 left-[2%] w-12 h-14 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 14'%3E%3Crect x='0' y='8' width='12' height='6' fill='%234a3d2a'/%3E%3Crect x='1' y='4' width='10' height='6' fill='%235a4d3a'/%3E%3Crect x='2' y='2' width='8' height='4' fill='%23e8e0d4'/%3E%3Crect x='3' y='3' width='2' height='2' fill='%23c9a227'/%3E%3Crect x='7' y='3' width='2' height='2' fill='%23c9a227'/%3E%3Crect x='1' y='0' width='2' height='4' fill='%234a3d2a'/%3E%3Crect x='9' y='0' width='2' height='4' fill='%234a3d2a'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Wooden signpost */}
      <div
        className="absolute bottom-14 right-[22%] w-8 h-6 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 6'%3E%3Crect x='0' y='2' width='8' height='4' fill='%234a3d2a'/%3E%3Crect x='1' y='1' width='6' height='4' fill='%235a4d3a'/%3E%3Crect x='2' y='0' width='4' height='2' fill='%234a3d2a'/%3E%3Crect x='2' y='2' width='1' height='2' fill='%23c9a227'/%3E%3Crect x='7' y='2' width='1' height='2' fill='%23c9a227'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      />
      {/* Leaf particles */}
      <div className="absolute top-24 left-[20%] w-2 h-2 bg-[var(--moss-light)]/40 rounded-sm animate-ambient-float" />
      <div className="absolute top-32 right-[25%] w-1.5 h-1.5 bg-[var(--moss)]/50 rounded-sm animate-ambient-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 left-[40%] w-2 h-2 bg-[var(--forest-light)]/30 rounded-sm animate-ambient-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-40 left-[70%] w-1 h-1 bg-[var(--gold)]/30 rounded-sm animate-ambient-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-40 right-[35%] w-2 h-2 bg-[var(--moss)]/50 rounded-sm animate-ambient-float" style={{ animationDelay: "1.5s" }} />
    </div>
  );
}

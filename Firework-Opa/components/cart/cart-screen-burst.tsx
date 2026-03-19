"use client";

import { useEffect, useMemo, useRef } from "react";

type CartBurstDetail = {
  originX?: number;
  originY?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  lifeMs: number;
  ageMs: number;
  huePick: number; // 0..1
  sparkle: number; // 0..1
  prevX: number;
  prevY: number;
  spawnAtMs: number;
  started: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function CartScreenBurst() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startAtRef = useRef<number>(0);
  const burstIdRef = useRef<number>(0);
  const lastFrameAtRef = useRef<number>(0);
  const originRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const palette = useMemo(
    () => [
      { color: "#f8fafc", glow: "rgba(248,250,252,0.55)" }, // warm white
      { color: "#c9a227", glow: "rgba(201,162,39,0.55)" }, // gold
      { color: "#d4b03a", glow: "rgba(212,176,58,0.5)" }, // warm amber
    ],
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio ?? 1));
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const prefersReducedMotion = window
      .matchMedia?.("(prefers-reduced-motion: reduce)")
      ?.matches;

    const sparkleEase = (s: number) => {
      const x = clamp(s, 0, 1);
      return x * x * (3 - 2 * x); // smoothstep
    };

      const drawFrame = (now: number, burstIdAtStart: number) => {
      if (burstIdRef.current !== burstIdAtStart) return;

      const t = now - startAtRef.current;
      const durationMs = 820; // cover the whole multi-burst sequence
      const progress = clamp(t / durationMs, 0, 1);

      // Clear fully; then use additive blending for the glow.
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";

      const gravity = 110; // px/s^2 (gentle)

      const dt = (() => {
        const last = lastFrameAtRef.current || now;
        lastFrameAtRef.current = now;
        const s = (now - last) / 1000;
        return clamp(s, 0, 0.05);
      })();

      // Subtle "flash" rings at each burst time to make it feel like fireworks.
      // We draw them as simple additive circles (no heavy effects).
      const flashTimes = [0, 170, 350];
      const flashWindow = 95;
      for (const ft of flashTimes) {
        const dtFlash = t - ft;
        if (dtFlash < 0 || dtFlash > flashWindow) continue;
        const lt = 1 - dtFlash / flashWindow; // 1 -> 0
        const alpha = clamp(lt, 0, 1) * 0.35 * (1 - progress * 0.35);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "rgba(201,162,39,0.9)";
        ctx.lineWidth = 1 + lt * 2.2;
        ctx.beginPath();
        ctx.arc(
          originRef.current.x,
          originRef.current.y,
          18 + lt * 60,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      for (const p of particlesRef.current) {
        if (t < p.spawnAtMs) continue;

        if (!p.started) {
          p.started = true;
          p.prevX = p.x;
          p.prevY = p.y;
        }

        if (p.ageMs >= p.lifeMs) continue;

        p.prevX = p.x;
        p.prevY = p.y;

        // Time-based fade (sparks die out quickly)
        p.ageMs += dt * 1000;
        p.vx *= 0.985;
        p.vy += gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const lifeT = clamp(p.ageMs / p.lifeMs, 0, 1);
        const alpha = (1 - lifeT) * (1 - progress * 0.9);

        const pal = palette[Math.floor(p.huePick * palette.length) % palette.length];

        const tail = 0.35 + p.sparkle * 0.65;
        const tx = p.x - (p.x - p.prevX) * (1 + tail);
        const ty = p.y - (p.y - p.prevY) * (1 + tail);

        ctx.shadowBlur = 10 + p.sparkle * 16;
        ctx.shadowColor = pal.glow;
        ctx.strokeStyle = pal.glow;
        ctx.lineWidth = 1 + p.sparkle * 1.2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = pal.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.75 + sparkleEase(p.sparkle) * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";

      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame((n) => drawFrame(n, burstIdAtStart));
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onBurst = (e: Event) => {
      if (prefersReducedMotion) return;

      const now = performance.now();
      burstIdRef.current += 1;
      const burstIdAtStart = burstIdRef.current;
      startAtRef.current = now;
      lastFrameAtRef.current = now;

      const detail = (e as CustomEvent<CartBurstDetail>).detail ?? {};
      const originX = typeof detail.originX === "number" ? detail.originX : window.innerWidth / 2;
      const originY = typeof detail.originY === "number" ? detail.originY : window.innerHeight / 2;
      originRef.current = { x: originX, y: originY };

      particlesRef.current = [];

      // Multi-burst: 2–3 short "firework reactions"
      const burstTimes = [0, 170, 350];
      const burstsEnabled = burstTimes.length;

      for (let b = 0; b < burstsEnabled; b++) {
        const spawnAtMs = burstTimes[b];

        // A bit fewer particles per burst for a cleaner, higher-end look.
        const count = 110;
        const baseSpeed = 600; // px/s
        const speedJitter = 360;

        for (let i = 0; i < count; i++) {
          const u = Math.random();
          const angle = Math.random() * Math.PI * 2;

          // Bias upwards so it reads as a burst, not a confetti rain.
          const upBias = 0.42 + Math.random() * 0.25;
          const speed = baseSpeed + u * speedJitter;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed - (baseSpeed * upBias) / 1.9;

          // Larger initial sparks, shorter life.
          const size = 0.8 + Math.random() * 2.0;
          const lifeMs = 320 + Math.random() * 240;
          const sparkle = Math.random();

          // Slightly vary the origin for a natural "second burst" feel.
          const ox = originX + (Math.random() - 0.5) * 40;
          const oy = originY + (Math.random() - 0.5) * 26;

          particlesRef.current.push({
            x: ox,
            y: oy,
            vx,
            vy,
            size,
            lifeMs,
            ageMs: 0,
            huePick: Math.random(),
            sparkle,
            prevX: ox,
            prevY: oy,
            spawnAtMs,
            started: false,
          });
        }
      }

      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = window.requestAnimationFrame((n) => drawFrame(n, burstIdAtStart));
    };

    window.addEventListener("cart:burst", onBurst as EventListener);

    return () => {
      window.removeEventListener("cart:burst", onBurst as EventListener);
      window.removeEventListener("resize", resize);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [palette]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[80]"
      aria-hidden
    />
  );
}


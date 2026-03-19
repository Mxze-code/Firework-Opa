"use client";

import { useEffect, useRef } from "react";

type RocketAddDetail = {
  productId?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function getQuadraticBezierPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

function getQuadraticBezierTangent(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return {
    x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  };
}

export function CartRocketAddToCart() {
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const impactRef = useRef<HTMLDivElement | null>(null);
  const runIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const onRocketAdd = (e: Event) => {
      if (reduceMotionRef.current) return;

      const detail = (e as CustomEvent<RocketAddDetail>).detail ?? {};
      // detail.productId isn't strictly needed; it's here to help future debugging/analytics.
      void detail.productId;

      const rocketEl = rocketRef.current;
      const impactEl = impactRef.current;
      if (!rocketEl || !impactEl) return;

      const logoEl = document.querySelector("[data-hartmann-logo]") as HTMLElement | null;
      const cartEl = document.querySelector("[data-cart-icon]") as HTMLElement | null;
      if (!logoEl || !cartEl) return;

      runIdRef.current += 1;
      const runId = runIdRef.current;

      // Cancel any running animation.
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);

      const logoRect = logoEl.getBoundingClientRect();
      const cartRect = cartEl.getBoundingClientRect();

      const P0 = {
        x: logoRect.left + logoRect.width * 0.25,
        y: logoRect.top + logoRect.height * 0.55,
      };
      const P2 = {
        x: cartRect.left + cartRect.width / 2,
        y: cartRect.top + cartRect.height / 2,
      };

      // Make the path feel elegant: a gentle curve upward/downward based on geometry.
      const dx = P2.x - P0.x;
      const dy = P2.y - P0.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const curveLift = clamp(dist * 0.18, 36, 120);
      const direction = dy > 0 ? -1 : 1; // if target is below, curve upwards; otherwise curve downwards

      const P1 = {
        x: (P0.x + P2.x) / 2 + clamp(dx * 0.04, -40, 40),
        y: (P0.y + P2.y) / 2 + direction * curveLift,
      };

      // Rocket sizes (responsive-ish).
      const isMobile = window.innerWidth < 640;
      const durationMs = isMobile ? 760 : 860;
      const rocketScale = isMobile ? 0.86 : 0.96;

      // Initial positioning
      rocketEl.style.opacity = "1";
      rocketEl.style.pointerEvents = "none";
      rocketEl.style.transform = `translate3d(${P0.x}px, ${P0.y}px, 0) translate(-50%, -50%) rotate(-8deg) scale(${rocketScale})`;

      impactEl.style.opacity = "0";

      const startAt = performance.now();

      const step = (now: number) => {
        if (runIdRef.current !== runId) return;

        const t = clamp((now - startAt) / durationMs, 0, 1);
        const te = easeInOutCubic(t);

        const pos = getQuadraticBezierPoint(te, P0, P1, P2);
        const tangent = getQuadraticBezierTangent(te, P0, P1, P2);
        const angle = (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI;

        // Subtle "breathing" to avoid a rigid feel.
        const scale = rocketScale * (1 + 0.02 * Math.sin(Math.PI * t));
        rocketEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;

        if (t < 1) {
          rafRef.current = window.requestAnimationFrame(step);
          return;
        }

        // Impact
        impactEl.style.setProperty("--ix", `${P2.x}px`);
        impactEl.style.setProperty("--iy", `${P2.y}px`);
        impactEl.classList.remove("cart-rocket-impact");
        // Force reflow so animation restarts.
        impactEl.offsetHeight;
        impactEl.classList.add("cart-rocket-impact");

        // Trigger the existing small cart feedback burst.
        // navbar listens to this event.
        window.dispatchEvent(new Event("cart:burst"));

        // Fade out rocket quickly after impact.
        rocketEl.style.opacity = "0";
      };

      rafRef.current = window.requestAnimationFrame(step);
    };

    window.addEventListener("cart:rocket-add", onRocketAdd as EventListener);
    return () => {
      window.removeEventListener("cart:rocket-add", onRocketAdd as EventListener);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={rocketRef}
        className="cart-rocket"
        aria-hidden
        style={{
          opacity: 0,
        }}
      >
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M34 7C42.5 14.5 48 24.5 50 34C48 43.5 42.5 53.5 34 61C25.5 53.5 20 43.5 18 34C20 24.5 25.5 14.5 34 7Z"
            fill="rgba(201,162,39,0.12)"
            stroke="#F8FAFC"
            strokeWidth="1.3"
          />
          <path
            d="M34 12C40.7 18.8 44.7 26.5 46 34C44.7 41.5 40.7 49.2 34 56C27.3 49.2 23.3 41.5 22 34C23.3 26.5 27.3 18.8 34 12Z"
            fill="rgba(201,162,39,0.18)"
          />
          <path
            d="M30 33.5C30 38.1 33 41.2 34 42C35 41.2 38 38.1 38 33.5C38 29.2 35 26 34 25.2C33 26 30 29.2 30 33.5Z"
            fill="#C9A227"
            stroke="#F8FAFC"
            strokeWidth="0.8"
            opacity="0.95"
          />
          <path
            d="M34 7C27 16 26 25 26 34C26 43 27 52 34 61"
            stroke="#D4B03A"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <path
            d="M18 34L6 30L10 41L18 34Z"
            fill="rgba(201,162,39,0.16)"
            stroke="#F8FAFC"
            strokeWidth="0.9"
            opacity="0.95"
          />
          <path
            d="M50 34L62 30L58 41L50 34Z"
            fill="rgba(201,162,39,0.16)"
            stroke="#F8FAFC"
            strokeWidth="0.9"
            opacity="0.95"
          />
        </svg>
      </div>

      <div
        ref={impactRef}
        className="cart-rocket-impact"
        aria-hidden
      />
    </>
  );
}


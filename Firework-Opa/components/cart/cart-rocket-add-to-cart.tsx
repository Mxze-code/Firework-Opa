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
  const flameRef = useRef<SVGGElement | null>(null);
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

        // Flame intensity: stronger near the beginning, then fades smoothly.
        const flame = flameRef.current;
        if (flame) {
          const flameT = 1 - t;
          const opacity = 0.35 + 0.55 * flameT;
          const flameScale = 0.9 + 0.25 * Math.sin(Math.PI * (1 - t));
          flame.style.opacity = String(opacity);
          flame.style.transform = `scale(${flameScale})`;
        }

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
        <svg
          width="76"
          height="76"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rocket body */}
          <defs>
            <linearGradient id="r_gold" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F8FAFC" stopOpacity="0.95" />
              <stop offset="0.5" stopColor="#C9A227" stopOpacity="0.9" />
              <stop offset="1" stopColor="#D4B03A" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="f_gold" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 92) rotate(90) scale(28 26)">
              <stop offset="0" stopColor="#F8FAFC" stopOpacity="0.95" />
              <stop offset="0.35" stopColor="#C9A227" stopOpacity="0.75" />
              <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Flame group (behind rocket) */}
          <g ref={flameRef} style={{ opacity: 0.5, transformOrigin: "60px 95px" }}>
            <path
              d="M60 92C48 104 45 112 60 114C75 112 72 104 60 92Z"
              fill="url(#f_gold)"
            />
            <path
              d="M60 92C53 100 50 106 60 108C70 106 67 100 60 92Z"
              fill="#C9A227"
              opacity="0.45"
            />
          </g>

          {/* Fins */}
          <path d="M39 78L30 92L48 92L39 78Z" fill="#C9A227" opacity="0.25" />
          <path d="M81 78L72 92L90 92L81 78Z" fill="#C9A227" opacity="0.25" />

          {/* Nose cone */}
          <path
            d="M60 10C45 28 43 42 43 55C43 68 48 78 60 86C72 78 77 68 77 55C77 42 75 28 60 10Z"
            fill="url(#r_gold)"
            opacity="0.9"
            stroke="#F8FAFC"
            strokeOpacity="0.65"
            strokeWidth="1.2"
          />

          {/* Main body outline */}
          <path
            d="M60 18C48 34 48 48 48 58C48 69 52 76 60 81C68 76 72 69 72 58C72 48 72 34 60 18Z"
            stroke="#C9A227"
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />

          {/* Window / label */}
          <circle cx="60" cy="57" r="8.5" fill="rgba(248,250,252,0.12)" stroke="#F8FAFC" strokeOpacity="0.55" strokeWidth="1.1" />
          <circle cx="60" cy="57" r="4.2" fill="#C9A227" opacity="0.55" />

          {/* Exhaust shimmer */}
          <path
            d="M52 92C56 86 64 86 68 92"
            stroke="#F8FAFC"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeLinecap="round"
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


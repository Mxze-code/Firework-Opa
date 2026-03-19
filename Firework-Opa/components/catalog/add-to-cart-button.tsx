"use client";

import { useCallback, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  variant?: "default" | "compact";
  className?: string;
};

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const lastVibrateAtRef = useRef<number>(0);

  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 border border-[#2d3a4d] text-[#c9a227] hover:border-[#c9a227] hover:bg-[#c9a227]/10 hover:-translate-y-0.5";

  const styles =
    variant === "compact" ? `px-3 py-1.5 text-sm ${base}` : `w-full px-4 py-3 text-sm ${base}`;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      addItem(product, quantity);

      const isMobile = window.innerWidth < 640;

      // Mobile-only haptic feedback.
      // Keep it short and unobtrusive; never affect desktop.
      try {
        const navAny = navigator as any;
        const vibrateFn = typeof navAny?.vibrate === "function" ? navAny.vibrate : null;

        const touchCapable =
          (typeof navAny?.maxTouchPoints === "number" ? navAny.maxTouchPoints > 0 : false) ||
          "ontouchstart" in window;

        const now = Date.now();
        const minGapMs = 650; // prevents repeated vibrations on quick double-clicks

        if (
          vibrateFn &&
          isMobile &&
          touchCapable &&
          now - lastVibrateAtRef.current > minGapMs
        ) {
          lastVibrateAtRef.current = now;
          vibrateFn.call(navAny, 18); // very short, pleasant pulse
        }
      } catch {
        // ignore: vibration is an enhancement
      }

      if (isMobile) {
        // Mobile: no rocket flight. Instead trigger the elegant full-screen
        // fireworks burst (CartScreenBurst listens to this event on mobile).
        const cartEl = document.querySelector(
          "[data-cart-icon]"
        ) as HTMLElement | null;
        const rect = cartEl?.getBoundingClientRect();
        const originX =
          rect != null ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const originY =
          rect != null ? rect.top + rect.height / 2 : window.innerHeight / 2;

        window.dispatchEvent(
          new CustomEvent("cart:burst", {
            detail: { originX, originY },
          })
        );
      } else {
        // Desktop: keep existing rocket animation.
        window.dispatchEvent(
          new CustomEvent("cart:rocket-add", {
            detail: {
              productId: product.id,
            },
          })
        );
      }
    },
    [addItem, product, quantity]
  );

  return (
    <button type="button" onClick={handleClick} className={`${styles} ${className}`}>
      In den Warenkorb
    </button>
  );
}

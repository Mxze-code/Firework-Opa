"use client";

import { useCallback } from "react";
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

  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 border border-[#2d3a4d] text-[#c9a227] hover:border-[#c9a227] hover:bg-[#c9a227]/10 hover:-translate-y-0.5";

  const styles =
    variant === "compact" ? `px-3 py-1.5 text-sm ${base}` : `w-full px-4 py-3 text-sm ${base}`;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Capture click origin so the screen-wide burst feels anchored to the UI.
      const rect = e.currentTarget.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      addItem(product, quantity);

      window.dispatchEvent(
        new CustomEvent("cart:burst", {
          detail: {
            originX,
            originY,
          },
        })
      );
    },
    [addItem, product, quantity]
  );

  return (
    <button type="button" onClick={handleClick} className={`${styles} ${className}`}>
      In den Warenkorb
    </button>
  );
}

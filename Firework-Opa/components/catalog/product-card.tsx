import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductImagePlaceholder } from "./product-image-placeholder";
import { AddToCartButton } from "./add-to-cart-button";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col rounded border border-[#2d3a4d] bg-[#1a2332] transition-all duration-300 ease-out hover:border-[#c9a227]/40 hover:bg-[#243044] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1">
      <Link href={`/katalog/${product.slug}`} className="flex flex-1 flex-col">
        <div className="h-56 w-full rounded-t border-b border-[#2d3a4d] bg-[#f8fafc] p-4 md:h-60 md:p-5">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain object-center transition group-hover:opacity-95"
            />
          ) : (
            <ProductImagePlaceholder className="h-full w-full rounded bg-[#f8fafc] text-[#94a3b8]" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#64748b]">
            {product.category}
          </span>
          <h2 className="mt-1 line-clamp-2 font-heading text-lg font-semibold text-[#f0f4f8] transition group-hover:text-[#c9a227]">
            {product.name}
          </h2>
          <p className="mt-0.5 line-clamp-1 text-xs text-[#64748b]">{product.type}</p>
          <p className="mt-2 line-clamp-2 text-sm text-[#94a3b8]">
            {product.shortDescription}
          </p>
          <p className="mt-auto pt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-heading text-lg font-semibold tracking-tight text-[#c9a227] md:text-xl">
            {product.price.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
            {product.priceNote && (
              <span className="text-xs md:text-sm font-normal tracking-normal text-[#64748b]">
                {product.priceNote}
              </span>
            )}
          </p>
        </div>
      </Link>
      <div className="border-t border-[#2d3a4d] p-4">
        <div className="flex gap-3">
          <Link
            href={`/katalog/${product.slug}`}
            className="flex-1 border border-[#2d3a4d] px-4 py-2.5 text-center text-sm font-medium text-[#94a3b8] transition-all duration-200 hover:border-[#3d4a5d] hover:text-[#f0f4f8] hover:bg-white/5 hover:-translate-y-0.5"
          >
            Details
          </Link>
          <AddToCartButton product={product} className="flex-1" />
        </div>
      </div>
    </article>
  );
}

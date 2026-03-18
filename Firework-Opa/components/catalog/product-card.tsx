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
      <Link href={`/katalog/${product.slug}`} className="block flex-1">
        <div className="aspect-[4/3] overflow-hidden rounded-t">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition group-hover:opacity-95"
            />
          ) : (
            <ProductImagePlaceholder className="h-full w-full rounded-t" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-medium uppercase tracking-wide text-[#64748b]">
            {product.category}
          </span>
          <h2 className="mt-1 font-heading text-lg font-semibold text-[#f0f4f8] group-hover:text-[#c9a227] transition">
            {product.name}
          </h2>
          <p className="mt-0.5 text-xs text-[#64748b]">{product.type}</p>
          <p className="mt-2 line-clamp-2 text-sm text-[#94a3b8]">
            {product.shortDescription}
          </p>
          <p className="mt-3 text-sm font-medium text-[#c9a227]">
            {product.price.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
            {product.priceNote && (
              <span className="ml-1 text-[#64748b] font-normal">
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

"use client";

import Link from "next/link";
import type { Product } from "@/src/data/products";
import { useCart } from "@/src/contexts/CartContext";
import { formatInr } from "@/src/lib/currency";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 flex flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-[4/3] w-full rounded-md bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 grid place-items-center text-5xl">
          {/* Fallback emoji as product visual */}
          <span aria-hidden>📦</span>
        </div>
        <h3 className="mt-3 font-medium line-clamp-1">{product.name}</h3>
      </Link>
      <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2 mt-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-semibold">{formatInr(product.priceInr)}</span>
        <button
          onClick={() => addItem(product, 1)}
          className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-3 py-1.5 text-sm hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
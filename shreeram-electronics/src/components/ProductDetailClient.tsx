"use client";

import { useState } from "react";
import type { Product } from "@/src/data/products";
import { useCart } from "@/src/contexts/CartContext";

export default function AddToCartClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState<number>(1);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm" htmlFor="qty">Qty</label>
      <input
        id="qty"
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        className="w-20 rounded-md border border-black/20 dark:border-white/20 bg-transparent px-2 py-1"
      />
      <button
        onClick={() => addItem(product, qty)}
        className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-3 py-1.5 text-sm hover:opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
}
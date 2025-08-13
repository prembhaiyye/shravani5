"use client";

import Link from "next/link";
import { useCart } from "@/src/contexts/CartContext";
import { formatInr } from "@/src/lib/currency";

export default function CartPage() {
  const { products, subtotal, updateItem, removeItem } = useCart();

  if (products.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link href="/products" className="inline-flex rounded-md bg-foreground text-background px-4 py-2 text-sm">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {products.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4 border border-black/10 dark:border-white/10 rounded-md p-4">
            <div className="size-24 rounded bg-slate-200 dark:bg-slate-700 grid place-items-center text-3xl">📦</div>
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-black/70 dark:text-white/70">{formatInr(product.priceInr)}</div>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm" htmlFor={`qty-${product.id}`}>Qty</label>
                <input
                  id={`qty-${product.id}`}
                  className="w-20 rounded-md border border-black/20 dark:border-white/20 bg-transparent px-2 py-1"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateItem(product.id, Math.max(1, Number(e.target.value) || 1))}
                />
                <button onClick={() => removeItem(product.id)} className="text-sm text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            <div className="font-medium">{formatInr(product.priceInr * quantity)}</div>
          </div>
        ))}
      </div>
      <aside className="space-y-4 border border-black/10 dark:border-white/10 rounded-md p-4 h-fit">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="flex items-center justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatInr(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex items-center justify-between font-semibold pt-2 border-t border-black/10 dark:border-white/10">
          <span>Total</span>
          <span>{formatInr(subtotal)}</span>
        </div>
        <Link href="/checkout" className="block text-center rounded-md bg-foreground text-background px-4 py-2 text-sm">Proceed to Checkout</Link>
      </aside>
    </div>
  );
}
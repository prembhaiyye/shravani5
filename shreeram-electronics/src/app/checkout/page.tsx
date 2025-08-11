"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/src/contexts/CartContext";
import { formatInr } from "@/src/lib/currency";

export default function CheckoutPage() {
  const router = useRouter();
  const { products, subtotal, clear } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (products.length === 0) return;
    const orderId = `SR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    try {
      await fetch("/api/notify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: subtotal,
          customer: form,
          items: products.map(({ product, quantity }) => ({
            name: product.name,
            quantity,
            priceInr: product.priceInr,
          })),
        }),
      });
    } catch (err) {
      console.error("Failed to notify order", err);
    }

    clear();
    router.push(`/order-success?orderId=${orderId}&amount=${subtotal}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <form onSubmit={placeOrder} className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm">Full name</label>
            <input className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Phone</label>
            <input className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm">Address</label>
            <textarea className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">City</label>
            <input className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Pincode</label>
            <input className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm">Payment method</label>
            <select className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={products.length === 0} className="rounded-md bg-foreground text-background px-4 py-2 text-sm disabled:opacity-50">Place Order</button>
      </form>

      <aside className="space-y-4 border border-black/10 dark:border-white/10 rounded-md p-4 h-fit">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="space-y-2 text-sm">
          {products.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between">
              <span>
                {product.name} × {quantity}
              </span>
              <span>{formatInr(product.priceInr * quantity)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-semibold pt-2 border-t border-black/10 dark:border-white/10">
          <span>Total</span>
          <span>{formatInr(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
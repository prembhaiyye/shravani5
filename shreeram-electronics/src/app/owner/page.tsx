"use client";

import { useState } from "react";
import { useCatalog } from "@/src/contexts/CatalogContext";
import type { Product } from "@/src/data/products";

export default function OwnerPage() {
  const { allProducts, hiddenProductIds, addProduct, removeCustomProduct, hideProduct, unhideProduct, clearAllCustom } = useCatalog();
  const [form, setForm] = useState<Partial<Product>>({ name: "", description: "", priceInr: 0, tags: [] });

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.priceInr) return;
    addProduct({
      name: form.name!,
      description: form.description!,
      priceInr: Number(form.priceInr),
      image: form.image || null,
      specs: form.specs || [],
      tags: form.tags || [],
    });
    setForm({ name: "", description: "", priceInr: 0, tags: [] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Owner Controls</h1>
        <p className="text-sm text-black/70 dark:text-white/70">Add new products, hide defaults, or remove custom products.</p>
      </div>

      <form onSubmit={onAdd} className="space-y-3 border border-black/10 dark:border-white/10 rounded-md p-4">
        <h2 className="font-medium">Add Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <input className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Price (INR)</label>
            <input type="number" min={0} className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required value={form.priceInr || 0} onChange={(e) => setForm({ ...form, priceInr: Number(e.target.value) })} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm">Description</label>
            <textarea className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" required rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm">Tags (comma separated)</label>
            <input className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2" value={(form.tags as string[] | undefined)?.join(", ") || ""} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-md bg-foreground text-background px-4 py-2 text-sm">Add product</button>
          <button type="button" onClick={() => clearAllCustom()} className="rounded-md border border-black/20 dark:border-white/20 px-4 py-2 text-sm">Clear all custom</button>
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="font-medium">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allProducts.map((p) => {
            const isHidden = hiddenProductIds.includes(p.id);
            const isCustom = Boolean(p.isCustom);
            return (
              <div key={p.id} className="border border-black/10 dark:border-white/10 rounded-md p-4 space-y-2">
                <div className="text-sm text-black/70 dark:text-white/70">{isCustom ? "Custom" : "Default"}</div>
                <div className="font-medium line-clamp-1">{p.name}</div>
                <div className="text-sm line-clamp-2">{p.description}</div>
                <div className="flex items-center gap-3 pt-1">
                  {isCustom ? (
                    <button onClick={() => removeCustomProduct(p.id)} className="text-sm text-red-600 hover:underline">Remove</button>
                  ) : isHidden ? (
                    <button onClick={() => unhideProduct(p.id)} className="text-sm hover:underline">Unhide</button>
                  ) : (
                    <button onClick={() => hideProduct(p.id)} className="text-sm hover:underline">Hide</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
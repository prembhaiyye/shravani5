"use client";

import { useMemo, useState } from "react";
import { products } from "@/src/data/products";
import ProductCard from "@/src/components/ProductCard";

export default function ProductCatalogClient() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.description, ...(p.tags || []), ...(p.specs || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-sm underline">Clear</button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-black/60 dark:text-white/60">No products found.</div>
        )}
      </div>
    </div>
  );
}
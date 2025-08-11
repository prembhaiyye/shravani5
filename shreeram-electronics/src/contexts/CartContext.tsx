"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/src/data/products";
import { products as productCatalog } from "@/src/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartProduct = {
  product: Product;
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  products: CartProduct[];
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "shreeram-electronics:cart";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((i) => typeof i?.productId === "string" && typeof i?.quantity === "number");
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { productId: product.id, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateItem = useCallback((productId: string, quantity: number) => {
    setItems((prev) => prev
      .map((i) => (i.productId === productId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const idToProduct = new Map(productCatalog.map((p) => [p.id, p] as const));

    const detailed: CartProduct[] = items
      .map((i) => {
        const product = idToProduct.get(i.productId);
        if (!product) return undefined;
        return { product, quantity: i.quantity } as CartProduct;
      })
      .filter(Boolean) as CartProduct[];

    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = detailed.reduce((acc, { product, quantity }) => acc + product.priceInr * quantity, 0);

    return { items, addItem, removeItem, updateItem, clear, count, products: detailed, subtotal };
  }, [items, addItem, removeItem, updateItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
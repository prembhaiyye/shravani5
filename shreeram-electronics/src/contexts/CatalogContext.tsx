"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/src/data/products";
import { products as defaultProducts } from "@/src/data/products";
import { slugify } from "@/src/lib/slug";

export type CatalogContextValue = {
  visibleProducts: Product[];
  allProducts: Product[];
  hiddenProductIds: string[];
  addProduct: (input: Omit<Product, "id" | "slug"> & { slug?: string }) => void;
  removeCustomProduct: (productId: string) => void;
  hideProduct: (productId: string) => void;
  unhideProduct: (productId: string) => void;
  clearAllCustom: () => void;
};

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

const STORAGE_CUSTOM = "shreeram-electronics:custom-products";
const STORAGE_HIDDEN = "shreeram-electronics:hidden-products";

function loadCustom(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_CUSTOM);
    const list = raw ? (JSON.parse(raw) as Product[]) : [];
    if (!Array.isArray(list)) return [];
    return list.filter((p) => typeof p?.id === "string" && typeof p?.name === "string").map((p) => ({ ...p, isCustom: true }));
  } catch {
    return [];
  }
}

function saveCustom(custom: Product[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_CUSTOM, JSON.stringify(custom));
  } catch {}
}

function loadHidden(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_HIDDEN);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    if (!Array.isArray(list)) return [];
    return list.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
}

function saveHidden(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_HIDDEN, JSON.stringify(ids));
  } catch {}
}

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [hiddenProductIds, setHiddenProductIds] = useState<string[]>([]);

  useEffect(() => {
    setCustomProducts(loadCustom());
    setHiddenProductIds(loadHidden());
  }, []);

  useEffect(() => {
    saveCustom(customProducts);
  }, [customProducts]);

  useEffect(() => {
    saveHidden(hiddenProductIds);
  }, [hiddenProductIds]);

  const addProduct = useCallback((input: Omit<Product, "id" | "slug"> & { slug?: string }) => {
    const id = `custom-${Math.random().toString(36).slice(2, 10)}`;
    const slug = input.slug ? slugify(input.slug) : slugify(input.name);
    const newProduct: Product = { ...input, id, slug, isCustom: true } as Product;
    setCustomProducts((prev) => [newProduct, ...prev]);
  }, []);

  const removeCustomProduct = useCallback((productId: string) => {
    setCustomProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const hideProduct = useCallback((productId: string) => {
    setHiddenProductIds((prev) => Array.from(new Set([...prev, productId])));
  }, []);

  const unhideProduct = useCallback((productId: string) => {
    setHiddenProductIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearAllCustom = useCallback(() => setCustomProducts([]), []);

  const value = useMemo<CatalogContextValue>(() => {
    const allProducts: Product[] = [...customProducts, ...defaultProducts];
    const visibleProducts = allProducts.filter((p) => !hiddenProductIds.includes(p.id));
    return {
      visibleProducts,
      allProducts,
      hiddenProductIds,
      addProduct,
      removeCustomProduct,
      hideProduct,
      unhideProduct,
      clearAllCustom,
    };
  }, [customProducts, hiddenProductIds, addProduct, removeCustomProduct, hideProduct, unhideProduct, clearAllCustom]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
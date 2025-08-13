"use client";

import Link from "next/link";
import { useCart } from "@/src/contexts/CartContext";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Shreeram Electronics
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/cart" className="hover:underline">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
import Link from "next/link";
import ProductGrid from "@/src/components/ProductGrid";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Shreeram Electronics</h1>
        <p className="mt-2 text-white/90 max-w-2xl">Your trusted store for smartphones, laptops, TVs, audio, and home appliances. Great prices. Genuine products. Fast delivery.</p>
        <div className="mt-6">
          <Link href="/products" className="inline-flex rounded-md bg-white text-blue-700 px-5 py-2.5 text-sm font-medium hover:opacity-90">Shop now</Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold">Featured products</h2>
          <Link href="/products" className="text-sm hover:underline">View all</Link>
        </div>
        <ProductGrid />
      </section>
    </div>
  );
}

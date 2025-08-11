import { notFound } from "next/navigation";
import { products } from "@/src/data/products";
import { formatInr } from "@/src/lib/currency";
import AddToCartClient from "@/src/components/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-[4/3] w-full rounded-md bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 grid place-items-center text-7xl">
        <span aria-hidden>📦</span>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-black/80 dark:text-white/80">{product.description}</p>
        <div className="text-xl font-semibold">{formatInr(product.priceInr)}</div>
        <AddToCartClient product={product} />
      </div>
    </div>
  );
}
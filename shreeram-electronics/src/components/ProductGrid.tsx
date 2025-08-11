import { products } from "@/src/data/products";
import ProductCard from "@/src/components/ProductCard";

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
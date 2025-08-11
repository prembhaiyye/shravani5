import ProductCatalogClient from "@/src/components/ProductCatalogClient";

export const metadata = {
  title: "Products – Shreeram Electronics",
};

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-sm text-black/70 dark:text-white/70">Explore our latest electronics</p>
      </div>
      <ProductCatalogClient />
    </div>
  );
}
import type { MetadataRoute } from "next";
import { products } from "@/src/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${site}/`, lastModified: now },
    { url: `${site}/products`, lastModified: now },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site}/product/${p.slug}`,
    lastModified: now,
  }));

  return [...pages, ...productPages];
}
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceInr: number;
  image?: string | null;
  specs?: string[];
  tags?: string[];
  isCustom?: boolean;
};

export const products: Product[] = [
  {
    id: "p-smartphone-001",
    slug: "shreeram-smartphone-x1",
    name: "Shreeram Smartphone X1",
    description: "6.5\" AMOLED, 8GB RAM, 128GB storage, 50MP camera, 5G",
    priceInr: 19999,
    image: "/images/smartphone.png",
    specs: ["AMOLED 120Hz", "Snapdragon", "5000mAh"],
    tags: ["smartphone", "5g"],
  },
  {
    id: "p-laptop-001",
    slug: "shreeram-laptop-pro-14",
    name: "Shreeram Laptop Pro 14",
    description: "14\" FHD, Intel i5, 16GB RAM, 512GB SSD, Backlit keyboard",
    priceInr: 56999,
    image: "/images/laptop.png",
    specs: ["Intel i5", "16GB RAM", "512GB SSD"],
    tags: ["laptop"],
  },
  {
    id: "p-headphones-001",
    slug: "shreeram-anc-headphones",
    name: "Shreeram ANC Headphones",
    description: "Active Noise Cancelling, 30h battery, Type-C",
    priceInr: 4999,
    image: "/images/headphones.png",
    specs: ["ANC", "Bluetooth 5.3", "30h battery"],
    tags: ["audio"],
  },
  {
    id: "p-tv-001",
    slug: "shreeram-smart-tv-55",
    name: "Shreeram Smart TV 55\" 4K",
    description: "4K HDR10, Dolby Audio, Built-in Chromecast",
    priceInr: 34999,
    image: "/images/tv.png",
    specs: ["4K HDR10", "55 inches", "Dolby Audio"],
    tags: ["tv", "smart-tv"],
  },
  {
    id: "p-speaker-001",
    slug: "shreeram-bluetooth-speaker",
    name: "Shreeram Bluetooth Speaker",
    description: "Portable, IPX7 waterproof, 12h battery",
    priceInr: 2999,
    image: "/images/speaker.png",
    specs: ["IPX7", "12h battery"],
    tags: ["audio", "portable"],
  },
  {
    id: "p-powerbank-001",
    slug: "shreeram-powerbank-20000",
    name: "Shreeram Power Bank 20000mAh",
    description: "22.5W fast charging, dual USB-A + USB-C",
    priceInr: 1899,
    image: "/images/powerbank.png",
    specs: ["20000mAh", "22.5W"],
    tags: ["accessories"],
  },
  {
    id: "p-camera-001",
    slug: "shreeram-dslr-xt",
    name: "Shreeram DSLR XT",
    description: "24MP APS-C, 18-55mm lens kit, Wi-Fi",
    priceInr: 42999,
    image: "/images/camera.png",
    specs: ["24MP", "Wi-Fi"],
    tags: ["camera"],
  },
  {
    id: "p-ac-001",
    slug: "shreeram-inverter-ac-1-5-ton",
    name: "Shreeram Inverter AC 1.5 Ton",
    description: "5 Star, Copper condenser, Turbo cool",
    priceInr: 33999,
    image: "/images/ac.png",
    specs: ["5 Star", "Inverter"],
    tags: ["home-appliance"],
  },
];
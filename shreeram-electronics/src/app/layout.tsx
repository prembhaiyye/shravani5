import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { CartProvider } from "@/src/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Shreeram Electronics – Online Electronic Store",
  description: "Shop smartphones, laptops, TVs, audio and more at Shreeram Electronics.",
  openGraph: {
    title: "Shreeram Electronics – Online Electronic Store",
    description: "Shop smartphones, laptops, TVs, audio and more at Shreeram Electronics.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreeram Electronics",
    description: "Electronics at great prices",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

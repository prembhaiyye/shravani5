import Link from "next/link";
import { redirect } from "next/navigation";
import { formatInr } from "@/src/lib/currency";

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string; amount?: string }> }) {
  const sp = await searchParams;
  const orderId = sp.orderId;
  const amount = Number(sp.amount || 0);

  if (!orderId) {
    redirect("/");
  }

  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-semibold">Thank you! Your order is placed.</h1>
      <p className="text-black/70 dark:text-white/70">Order ID: <span className="font-mono">{orderId}</span></p>
      <p className="text-black/70 dark:text-white/70">Amount: {formatInr(amount)}</p>
      <div className="space-x-3">
        <Link href="/products" className="inline-flex rounded-md bg-foreground text-background px-4 py-2 text-sm">Continue shopping</Link>
        <Link href="/" className="inline-flex rounded-md border border-black/20 dark:border-white/20 px-4 py-2 text-sm">Go home</Link>
      </div>
    </div>
  );
}
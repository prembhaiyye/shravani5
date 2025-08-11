import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderId,
      amount,
      customer,
      items,
    }: {
      orderId: string;
      amount: number;
      customer: { name: string; phone: string; address: string; city: string; pincode: string; payment: string };
      items: { name: string; quantity: number; priceInr: number }[];
    } = body;

    const adminPhone = process.env.ADMIN_PHONE || "+919766229269";
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM_NUMBER;

    const summaryLines = [
      `Order ${orderId} — ₹${amount} by ${customer.name}`,
      `Addr: ${customer.address}, ${customer.city} ${customer.pincode}`,
      `Phone: ${customer.phone} | Pay: ${customer.payment}`,
      ...items.slice(0, 6).map((it) => `- ${it.name} x${it.quantity} (₹${it.priceInr * it.quantity})`),
    ];

    if (sid && token && from) {
      const client = twilio(sid, token);
      await client.messages.create({
        body: summaryLines.join("\n"),
        to: adminPhone,
        from,
      });
    } else {
      console.log("[Order Notification]", summaryLines.join(" | "));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send order SMS", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
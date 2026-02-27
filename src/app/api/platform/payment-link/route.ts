import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type PaymentLinkRequest = {
  packageName?: string;
  email?: string;
  amount?: string;
};

function buildReference() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `KASI-${timestamp}-${random}`;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as PaymentLinkRequest;
  const baseCheckout = process.env.PAYMENT_CHECKOUT_URL || '';
  const reference = buildReference();
  const amount = String(body.amount || '1299');

  const paymentUrl = baseCheckout
    ? `${baseCheckout}${baseCheckout.includes('?') ? '&' : '?'}reference=${reference}&amount=${encodeURIComponent(amount)}`
    : `/book?reference=${reference}`;

  return NextResponse.json(
    {
      ok: true,
      reference,
      paymentUrl,
      packageName: body.packageName || 'AI Foundations',
      email: body.email || '',
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

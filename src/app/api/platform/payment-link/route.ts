import { NextResponse } from 'next/server';
import { captureApiError } from '@/lib/observability';
import {
  cleanText,
  enforceRateLimit,
  getClientIp,
  isValidEmail,
  rateLimitErrorResponse,
} from '@/lib/request-security';
import { getPaymentCheckoutUrl } from '@/lib/external-links';

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
  const limit = enforceRateLimit(req, { key: 'platform_payment_link', maxRequests: 40, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many payment link requests. Please retry shortly.');
  }

  try {
    const body = (await req.json().catch(() => ({}))) as PaymentLinkRequest;
    const packageName = cleanText(body.packageName, 80) || 'AI Foundations';
    const email = cleanText(body.email, 180).toLowerCase();
    const amountText = cleanText(body.amount, 20) || '1299';

    if (email && !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email format.' }, { status: 400 });
    }

    const numericAmount = Number(amountText);
    if (!Number.isFinite(numericAmount) && amountText !== 'custom') {
      return NextResponse.json({ ok: false, error: 'Amount must be numeric or "custom".' }, { status: 400 });
    }

    const reference = buildReference();
    const baseCheckout = getPaymentCheckoutUrl();
    const paymentUrl = baseCheckout
      ? `${baseCheckout}${baseCheckout.includes('?') ? '&' : '?'}reference=${reference}&amount=${encodeURIComponent(amountText)}`
      : `/book?reference=${reference}`;

    return NextResponse.json(
      {
        ok: true,
        reference,
        paymentUrl,
        packageName,
        email,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    await captureApiError('/api/platform/payment-link', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

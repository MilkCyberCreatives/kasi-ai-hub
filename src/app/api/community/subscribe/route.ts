// src/app/api/community/subscribe/route.ts
import { NextResponse } from 'next/server';
import { getCommunityWelcome } from '@/lib/ai-automation';
import { captureApiError, trackEvent } from '@/lib/observability';
import {
  cleanText,
  enforceRateLimit,
  getClientIp,
  isValidEmail,
  rateLimitErrorResponse,
} from '@/lib/request-security';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const limit = enforceRateLimit(req, { key: 'community_subscribe', maxRequests: 20, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many subscriptions from this network. Please wait a minute.');
  }

  try {
    const ip = getClientIp(req);
    const { email = '', name = '' } = await req.json().catch(() => ({}));
    const safeEmail = cleanText(email, 180).toLowerCase();
    const safeName = cleanText(name, 100);

    if (!safeEmail || !isValidEmail(safeEmail)) {
      return NextResponse.json({ ok: false, error: 'A valid email is required.' }, { status: 400 });
    }

    const welcome = getCommunityWelcome(safeName, safeEmail);
    const webhook = process.env.ADMIN_WEBHOOK_URL;

    if (webhook) {
      const isSlack = webhook.includes('hooks.slack.com');
      const payload = isSlack
        ? { text: `Newsletter signup: ${safeName || 'Anonymous'} <${safeEmail}>` }
        : { type: 'newsletter_signup', submittedAt: new Date().toISOString(), email: safeEmail, name: safeName };

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    await trackEvent({
      event: 'community_subscribe',
      source: 'api',
      clientId: ip,
      properties: { hasName: Boolean(safeName) },
    });

    return NextResponse.json({ ok: true, message: welcome }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    await captureApiError('/api/community/subscribe', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

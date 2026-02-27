// src/app/api/track/route.ts
import { NextResponse } from 'next/server';
import { captureApiError, trackEvent } from '@/lib/observability';
import { cleanText, enforceRateLimit, getClientIp, rateLimitErrorResponse } from '@/lib/request-security';

type TrackPayload = {
  name?: string;
  [key: string]: unknown;
};

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const limit = enforceRateLimit(req, { key: 'track', maxRequests: 120, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many tracking requests. Please slow down.');
  }

  try {
    const data = (await req.json().catch(() => ({}))) as TrackPayload;
    const name = cleanText(data.name, 80);
    if (!name) {
      return NextResponse.json({ ok: false, error: 'Tracking event name is required.' }, { status: 400 });
    }

    const properties = { ...data };
    delete properties.name;
    await trackEvent({
      event: name,
      source: 'web',
      clientId: getClientIp(req),
      properties,
    });

    return NextResponse.json({ ok: true, event: name }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    await captureApiError('/api/track', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

import { NextResponse } from 'next/server';
import { getProgramRecommendation } from '@/lib/ai-automation';
import { captureApiError } from '@/lib/observability';
import { cleanText, enforceRateLimit, getClientIp, rateLimitErrorResponse } from '@/lib/request-security';

export const runtime = 'nodejs';

type RecommendRequest = {
  role?: string;
  goal?: string;
  time?: string;
  budget?: string;
};

export async function POST(req: Request) {
  const limit = enforceRateLimit(req, { key: 'ai_recommend', maxRequests: 40, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many recommendation requests. Please wait before retrying.');
  }

  try {
    const body = (await req.json().catch(() => ({}))) as RecommendRequest;
    const recommendation = await getProgramRecommendation({
      role: cleanText(body.role, 120),
      goal: cleanText(body.goal, 120),
      time: cleanText(body.time, 120),
      budget: cleanText(body.budget, 120),
    });

    return NextResponse.json(recommendation, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    await captureApiError('/api/ai-recommend', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

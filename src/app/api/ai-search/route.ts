import { NextResponse } from 'next/server';
import { getAiSearchAnswer } from '@/lib/ai-automation';
import { captureApiError } from '@/lib/observability';
import { cleanText, enforceRateLimit, getClientIp, rateLimitErrorResponse } from '@/lib/request-security';

export const runtime = 'nodejs';

type SearchRequest = { question?: string };

export async function POST(req: Request) {
  const limit = enforceRateLimit(req, { key: 'ai_search', maxRequests: 40, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many search requests. Please try again shortly.');
  }

  try {
    const body = (await req.json().catch(() => ({}))) as SearchRequest;
    const question = cleanText(body.question, 600);

    if (!question || question.length < 3) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a longer question.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const result = await getAiSearchAnswer(question);
    return NextResponse.json({ ok: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    await captureApiError('/api/ai-search', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

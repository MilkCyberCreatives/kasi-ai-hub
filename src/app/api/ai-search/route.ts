import { NextResponse } from 'next/server';
import { getAiSearchAnswer } from '@/lib/ai-automation';

export const runtime = 'nodejs';

type SearchRequest = { question?: string };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as SearchRequest;
  const question = String(body.question || '').trim();

  if (!question) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a question.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const result = await getAiSearchAnswer(question);
  return NextResponse.json({ ok: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
}


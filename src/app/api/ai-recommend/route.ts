import { NextResponse } from 'next/server';
import { getProgramRecommendation } from '@/lib/ai-automation';

export const runtime = 'nodejs';

type RecommendRequest = {
  role?: string;
  goal?: string;
  time?: string;
  budget?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as RecommendRequest;
  const recommendation = await getProgramRecommendation({
    role: body.role,
    goal: body.goal,
    time: body.time,
    budget: body.budget,
  });

  return NextResponse.json(recommendation, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}


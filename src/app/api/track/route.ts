// src/app/api/track/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  console.log('[ANALYTICS]', JSON.stringify(data));
  // Hook this to a data warehouse or Google Analytics 4 via Measurement Protocol if desired.
  return NextResponse.json({ ok: true });
}

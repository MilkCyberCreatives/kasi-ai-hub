// src/app/api/lead/route.ts
import { NextResponse } from 'next/server';

// In a real app, forward this to your CRM/email/webhook.
// For now, we just log it so you can see it in the terminal.
export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  console.log('[LEAD] ', JSON.stringify(data));
  // TODO: send to email/SMS/CRM/webhook here

  return NextResponse.json({ ok: true });
}

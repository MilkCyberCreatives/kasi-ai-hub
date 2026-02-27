// src/app/api/community/subscribe/route.ts
import { NextResponse } from 'next/server';
import { getCommunityWelcome } from '@/lib/ai-automation';

export async function POST(req: Request) {
  try {
    const { email = '', name = '' } = await req.json().catch(() => ({}));
    const welcome = getCommunityWelcome(String(name), String(email));
    const webhook = process.env.ADMIN_WEBHOOK_URL;

    if (webhook) {
      const isSlack = webhook.includes('hooks.slack.com');
      const payload = isSlack
        ? { text: `Newsletter signup: ${name || 'Anonymous'} <${email}>` }
        : { type: 'newsletter_signup', submittedAt: new Date().toISOString(), email, name };

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, message: welcome }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


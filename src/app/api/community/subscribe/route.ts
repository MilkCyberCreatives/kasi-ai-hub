// src/app/api/community/subscribe/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email = '', name = '' } = await req.json().catch(() => ({}))
    const webhook = process.env.ADMIN_WEBHOOK_URL
    if (webhook) {
      const isSlack = webhook.includes('hooks.slack.com')
      const payload = isSlack
        ? { text: `📰 Newsletter signup: ${name || 'Anonymous'} <${email}>` }
        : { type: 'newsletter_signup', submittedAt: new Date().toISOString(), email, name }
      await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {})
    }
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

// src/app/api/lead/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({} as any))
    const {
      name = '',
      email = '',
      whatsapp = '',
      company = '',
      role = '',
      industry = '',
      goals = '',
      skillLevel = 'Beginner',
      timePreference = '',
      notes = '',
    } = data || {}

    const webhook = process.env.ADMIN_WEBHOOK_URL
    if (webhook) {
      const isSlack = webhook.includes('hooks.slack.com')
      const text = `📝 New 1:1 session request — ${name || 'Anonymous'}`
      const blocks = [
        { type: 'header', text: { type: 'plain_text', text: 'New 1:1 Session Request' } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Name:* ${name || '—'}\n*Email:* ${email || '—'}\n*WhatsApp:* ${whatsapp || '—'}` } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Company:* ${company || '—'}\n*Role:* ${role || '—'}\n*Industry:* ${industry || '—'}` } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Goals:* ${goals || '—'}` } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Skill:* ${skillLevel}  •  *Time preference:* ${timePreference || '—'}` } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Notes:* ${notes || '—'}` } },
        { type: 'actions', elements: [
          { type: 'button', text: { type: 'plain_text', text: 'Open Admin' }, url: 'https://kasiaihub.com/admin' }
        ] }
      ]
      const payload = isSlack ? { text, blocks } : { type: 'lead', submittedAt: new Date().toISOString(), data }

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

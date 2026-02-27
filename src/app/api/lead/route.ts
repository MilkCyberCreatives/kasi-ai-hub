import { NextResponse } from 'next/server';
import { automateLead } from '@/lib/ai-automation';

export const runtime = 'nodejs';

type LeadPayload = Record<string, unknown>;

function toText(value: unknown) {
  return String(value ?? '').trim();
}

function buildWebhookPayload(data: LeadPayload, automation: Awaited<ReturnType<typeof automateLead>>) {
  const name = toText(data.name) || 'Anonymous';
  const email = toText(data.email) || '-';
  const whatsapp = toText(data.whatsapp) || '-';
  const company = toText(data.company) || '-';
  const role = toText(data.role) || '-';
  const goals = toText(data.goals || data.note) || '-';

  const text = `New AI lead: ${name} (${automation.priority.toUpperCase()})`;

  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: 'New AI-Automated Lead' } },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Name:* ${name}\n*Email:* ${email}\n*WhatsApp:* ${whatsapp}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Company:* ${company}\n*Role:* ${role}\n*Goals:* ${goals}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*AI Score:* ${automation.score}/100 (${automation.priority})\n*Segment:* ${automation.segment}\n*Next Step:* ${automation.nextStep}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Recommended Program:* ${automation.recommendation.title} (${automation.recommendation.price})\n*Path:* ${automation.recommendation.path}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Internal Summary:* ${automation.internalSummary}`,
      },
    },
  ];

  return { text, blocks };
}

export async function POST(req: Request) {
  try {
    const data = (await req.json().catch(() => ({}))) as LeadPayload;

    const honeypot = toText(data._honeypot || data.website);
    if (honeypot) {
      return NextResponse.json({ ok: true, ignored: true }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const automation = await automateLead(data);
    const webhook = process.env.ADMIN_WEBHOOK_URL;

    if (webhook) {
      const payload = webhook.includes('hooks.slack.com')
        ? buildWebhookPayload(data, automation)
        : {
            type: 'lead',
            submittedAt: new Date().toISOString(),
            data,
            automation,
          };

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        ok: true,
        score: automation.score,
        priority: automation.priority,
        segment: automation.segment,
        recommendation: automation.recommendation,
        message: automation.followUpMessage,
        nextStep: automation.nextStep,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


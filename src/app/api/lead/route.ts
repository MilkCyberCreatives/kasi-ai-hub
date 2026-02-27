import { NextResponse } from 'next/server';
import { automateLead } from '@/lib/ai-automation';
import { captureApiError, trackEvent } from '@/lib/observability';
import {
  cleanText,
  enforceRateLimit,
  getClientIp,
  isValidEmail,
  rateLimitErrorResponse,
} from '@/lib/request-security';

export const runtime = 'nodejs';

type LeadPayload = Record<string, unknown>;

function toText(value: unknown) {
  return String(value ?? '').trim();
}

function validateLeadInput(data: LeadPayload) {
  const email = cleanText(data.email, 180).toLowerCase();
  const name = cleanText(data.name, 100);
  const goals = cleanText(data.goals || data.note, 800);
  const role = cleanText(data.role, 80);
  const company = cleanText(data.company, 120);

  if (!email || !isValidEmail(email)) {
    return { ok: false as const, error: 'A valid email is required.' };
  }
  if (!name) {
    return { ok: false as const, error: 'Name is required.' };
  }
  if (!goals || goals.length < 8) {
    return { ok: false as const, error: 'Please provide your main goal in at least 8 characters.' };
  }

  return {
    ok: true as const,
    value: {
      email,
      name,
      goals,
      role,
      company,
    },
  };
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
  const limit = enforceRateLimit(req, { key: 'lead', maxRequests: 25, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many lead submissions. Please wait before trying again.');
  }

  try {
    const data = (await req.json().catch(() => ({}))) as LeadPayload;
    const ip = getClientIp(req);

    const honeypot = toText(data._honeypot || data.website);
    if (honeypot) {
      return NextResponse.json({ ok: true, ignored: true }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const validated = validateLeadInput(data);
    if (!validated.ok) {
      return NextResponse.json({ ok: false, error: validated.error }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    }

    const normalizedData: LeadPayload = {
      ...data,
      email: validated.value.email,
      name: validated.value.name,
      goals: validated.value.goals,
      role: validated.value.role,
      company: validated.value.company,
    };

    const automation = await automateLead(normalizedData);
    const webhook = process.env.ADMIN_WEBHOOK_URL;

    if (webhook) {
      const payload = webhook.includes('hooks.slack.com')
        ? buildWebhookPayload(normalizedData, automation)
        : {
            type: 'lead',
            submittedAt: new Date().toISOString(),
            data: normalizedData,
            automation,
          };

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    await trackEvent({
      event: 'lead_submitted',
      source: 'api',
      clientId: ip,
      properties: {
        priority: automation.priority,
        score: automation.score,
        segment: automation.segment,
        recommendation: automation.recommendation.title,
      },
    });

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
    await captureApiError('/api/lead', error, { ip: getClientIp(req) });
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

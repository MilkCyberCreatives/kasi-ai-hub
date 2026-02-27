import { NextResponse } from 'next/server';
import { getAiSearchAnswer } from '@/lib/ai-automation';
import { captureApiError } from '@/lib/observability';
import { cleanText, enforceRateLimit, getClientIp, rateLimitErrorResponse } from '@/lib/request-security';

export const runtime = 'nodejs';

type CopilotRequest = {
  objective?: string;
  industry?: string;
  currentTools?: string;
  urgency?: string;
};

type CopilotAction = {
  title: string;
  detail: string;
};

function createActionPlan(input: CopilotRequest): CopilotAction[] {
  const objective = String(input.objective || '').toLowerCase();
  const urgency = String(input.urgency || '').toLowerCase();

  const base: CopilotAction[] = [
    {
      title: 'Map Process',
      detail: 'List the current process from trigger to completion and identify manual steps.',
    },
    {
      title: 'Build Prompt Stack',
      detail: 'Create a reusable prompt system for intake, analysis, and final output.',
    },
    {
      title: 'Automate Handoffs',
      detail: 'Send outputs to your CRM, spreadsheet, or messaging channel automatically.',
    },
  ];

  if (objective.includes('customer') || objective.includes('sales')) {
    base[1] = {
      title: 'Build Response Library',
      detail: 'Create tone-safe response templates for inquiries, objections, and follow-ups.',
    };
  }

  if (objective.includes('report') || objective.includes('operations')) {
    base[2] = {
      title: 'Automate Reporting',
      detail: 'Trigger weekly summary generation and delivery to stakeholders.',
    };
  }

  if (urgency.includes('today') || urgency.includes('asap')) {
    base.unshift({
      title: 'Launch Quick Win',
      detail: 'Ship one production-ready automation in under 60 minutes.',
    });
  }

  return base.slice(0, 4);
}

function buildPrompts(input: CopilotRequest) {
  const objective = String(input.objective || 'improve team productivity');
  const industry = String(input.industry || 'business');
  return [
    `You are an AI operations lead for a ${industry} company. Build a step-by-step workflow to ${objective}. Include tools, owners, and measurable outcomes.`,
    `Rewrite this output for WhatsApp with concise language and a clear call to action. Keep tone professional and friendly.`,
    `Review this workflow for risks, privacy concerns, and missing edge cases. Return a corrected final version.`,
  ];
}

export async function POST(req: Request) {
  const limit = enforceRateLimit(req, { key: 'platform_copilot', maxRequests: 30, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many copilot requests. Please wait before retrying.');
  }

  try {
    const body = (await req.json().catch(() => ({}))) as CopilotRequest;
    const objective = cleanText(body.objective, 600);
    const industry = cleanText(body.industry, 120);
    const currentTools = cleanText(body.currentTools, 220);
    const urgency = cleanText(body.urgency, 80);

    if (!objective || objective.length < 8) {
      return NextResponse.json(
        { ok: false, error: 'Objective is required and should be at least 8 characters.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const normalizedBody: CopilotRequest = {
      objective,
      industry,
      currentTools,
      urgency,
    };

    const search = await getAiSearchAnswer(objective);
    const actions = createActionPlan(normalizedBody);
    const prompts = buildPrompts(normalizedBody);

    return NextResponse.json(
      {
        ok: true,
        summary: search.answer,
        actions,
        prompts,
        resources: search.results,
        automatedBy: search.automatedBy,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    await captureApiError('/api/platform/copilot', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

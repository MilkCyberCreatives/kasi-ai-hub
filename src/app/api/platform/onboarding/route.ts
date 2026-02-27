import { NextResponse } from 'next/server';
import { getProgramRecommendation } from '@/lib/ai-automation';
import { captureApiError } from '@/lib/observability';
import { cleanText, enforceRateLimit, getClientIp, rateLimitErrorResponse } from '@/lib/request-security';

export const runtime = 'nodejs';

type OnboardingRequest = {
  role?: string;
  primaryGoal?: string;
  timeline?: string;
  budget?: string;
  teamSize?: string;
};

function normalizeGoal(goal: string) {
  const value = goal.toLowerCase();
  if (value.includes('marketing') || value.includes('content')) return 'content';
  if (value.includes('sales') || value.includes('customers')) return 'customers';
  if (value.includes('operations') || value.includes('ops')) return 'ops';
  return 'learning';
}

function normalizeTimeline(timeline: string) {
  const value = timeline.toLowerCase();
  if (value.includes('today') || value.includes('asap')) return 'today';
  if (value.includes('week')) return 'thisweek';
  return 'thismonth';
}

function buildFirstActions(input: OnboardingRequest) {
  const actions = [
    'Connect your primary workflow tools in one place.',
    'Define your top repetitive task and expected time savings.',
    'Set your first 7-day implementation checkpoint.',
  ];

  const teamSize = Number(input.teamSize || '1');
  if (teamSize > 1) {
    actions.splice(1, 0, 'Assign one workflow owner and one reviewer for weekly rollout.');
  }

  if ((input.primaryGoal || '').toLowerCase().includes('customers')) {
    actions.push('Activate response templates for customer replies and follow-ups.');
  }

  return actions.slice(0, 4);
}

export async function POST(req: Request) {
  const limit = enforceRateLimit(req, { key: 'platform_onboarding', maxRequests: 40, windowMs: 60_000 });
  if (!limit.allowed) {
    return rateLimitErrorResponse(limit, 'Too many onboarding requests. Please try again in a minute.');
  }

  try {
    const body = (await req.json().catch(() => ({}))) as OnboardingRequest;
    const role = cleanText(body.role, 80);
    const primaryGoal = cleanText(body.primaryGoal, 120);
    const timeline = cleanText(body.timeline, 80);
    const budget = cleanText(body.budget, 80).toLowerCase();
    const teamSizeRaw = cleanText(body.teamSize, 10);
    const teamSize = Math.min(500, Math.max(1, Number(teamSizeRaw || '1')));

    if (!role) {
      return NextResponse.json({ ok: false, error: 'Role is required.' }, { status: 400 });
    }
    if (!primaryGoal) {
      return NextResponse.json({ ok: false, error: 'Primary goal is required.' }, { status: 400 });
    }

    const normalizedBody: OnboardingRequest = {
      role,
      primaryGoal,
      timeline,
      budget,
      teamSize: String(Number.isFinite(teamSize) ? teamSize : 1),
    };

    const recommendation = await getProgramRecommendation({
      role: normalizedBody.role,
      goal: normalizeGoal(normalizedBody.primaryGoal || ''),
      time: normalizeTimeline(normalizedBody.timeline || ''),
      budget: normalizedBody.budget?.toLowerCase(),
    });

    return NextResponse.json(
      {
        ok: true,
        recommendation,
        track: recommendation.path === '/community' ? 'community' : 'implementation',
        firstActions: buildFirstActions(normalizedBody),
        automationLevel: teamSize > 5 ? 'team-scale' : 'starter',
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    await captureApiError('/api/platform/onboarding', error, { ip: getClientIp(req) });
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

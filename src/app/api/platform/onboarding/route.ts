import { NextResponse } from 'next/server';
import { getProgramRecommendation } from '@/lib/ai-automation';

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
  const body = (await req.json().catch(() => ({}))) as OnboardingRequest;

  const recommendation = await getProgramRecommendation({
    role: body.role,
    goal: normalizeGoal(body.primaryGoal || ''),
    time: normalizeTimeline(body.timeline || ''),
    budget: (body.budget || '').toLowerCase(),
  });

  return NextResponse.json(
    {
      ok: true,
      recommendation,
      track: recommendation.path === '/community' ? 'community' : 'implementation',
      firstActions: buildFirstActions(body),
      automationLevel: body.teamSize && Number(body.teamSize) > 5 ? 'team-scale' : 'starter',
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

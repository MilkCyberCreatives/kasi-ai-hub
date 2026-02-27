import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type SuccessRequest = {
  hoursSaved?: number;
  leadsCaptured?: number;
  conversions?: number;
  teamAdoption?: number;
};

function safeNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as SuccessRequest;

  const hoursSaved = safeNumber(body.hoursSaved);
  const leadsCaptured = safeNumber(body.leadsCaptured);
  const conversions = safeNumber(body.conversions);
  const teamAdoption = safeNumber(body.teamAdoption);

  const conversionRate = leadsCaptured > 0 ? Math.round((conversions / leadsCaptured) * 100) : 0;
  const momentumScore = Math.min(
    100,
    Math.round(hoursSaved * 2 + conversionRate * 0.7 + Math.min(teamAdoption, 100) * 0.6)
  );

  const priorityActions: string[] = [];

  if (hoursSaved < 8) {
    priorityActions.push('Automate one repetitive workflow end-to-end this week.');
  }
  if (conversionRate < 20) {
    priorityActions.push('Tighten follow-up timing and response templates for new leads.');
  }
  if (teamAdoption < 60) {
    priorityActions.push('Run a 30-minute team enablement session and assign process owners.');
  }
  if (priorityActions.length === 0) {
    priorityActions.push('Scale current automations to one additional team workflow.');
  }

  const health =
    momentumScore >= 75 ? 'strong' : momentumScore >= 45 ? 'growing' : 'needs-focus';

  return NextResponse.json(
    {
      ok: true,
      health,
      conversionRate,
      momentumScore,
      priorityActions: priorityActions.slice(0, 3),
      nextReviewInDays: health === 'strong' ? 14 : 7,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

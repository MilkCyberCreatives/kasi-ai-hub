// src/app/api/ai-recommend/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { role, goal, time, budget } = body as {
    role?: string; goal?: string; time?: string; budget?: string;
  };

  // Simple rules for now (fast + reliable without external keys)
  let title = 'AI Foundations (3 Hours)';
  let path = '/programs';
  let price = 'R1299';
  const why: string[] = [];
  let summary = 'Quickstart session to build one workflow that saves time immediately.';
  let roiNote = 'Most attendees report saving 3–5 hours in their first week.';

  if (role === 'team' || budget === 'custom') {
    title = 'Team Workshop (1 Day)';
    path = '/programs';
    price = 'Custom';
    summary = 'Tailored workshop for your team with playbooks, prompt library, and rollout plan.';
    roiNote = 'Teams typically automate 3–7 repetitive tasks within the first month.';
  }

  if (budget === 'free') {
    title = 'Monthly AI Clinic';
    path = '/community';
    price = 'Free';
    summary = 'Live community session. Bring your challenge; leave with a template and next steps.';
    roiNote = 'Great to test ideas before booking a paid session.';
  }

  if (goal === 'content') {
    why.push('You mentioned content & marketing: we’ll set up captions, posts, and email drafts.');
  } else if (goal === 'customers') {
    why.push('We’ll set up an intake → summary → reply workflow for leads & customer service.');
  } else if (goal === 'ops') {
    why.push('We’ll automate checklists and weekly reports with clear approvals.');
  } else if (goal === 'learning') {
    why.push('We’ll cover the fundamentals and give you a practical starter kit.');
  }

  if (time === 'today') {
    why.push('Designed to show value within hours, not weeks.');
  } else if (time === 'thisweek') {
    why.push('We’ll target a workflow you can run this week.');
  } else if (time === 'thismonth') {
    why.push('We’ll plan for repeatable wins over the month.');
  }

  // Final shape
  return NextResponse.json({
    title, summary, why, path, price, roiNote
  }, { status: 200 });
}

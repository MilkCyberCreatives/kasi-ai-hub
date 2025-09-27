// src/app/api/ai-search/route.ts
import { NextResponse } from 'next/server';

// Stubbed “AI” search. Upgrade later to call your LLM/RAG.
// For now we do a tiny rules-based mapping so the UX feels smart.
export async function POST(req: Request) {
  const { question = '' } = await req.json().catch(() => ({ question: '' }));
  const q = String(question).toLowerCase();

  let answer =
    "I’d start with the AI Foundations guide and the Weekly Ops Report template. They’re fast wins for most teams.";

  if (q.includes('post') || q.includes('social')) {
    answer = "Use “AI Post Generator – 30 posts in 3 hours”. It includes prompt patterns and batching tips.";
  } else if (q.includes('report')) {
    answer = "Try the “Weekly Ops Report – Template”. It turns raw notes into tidy summaries with next steps.";
  } else if (q.includes('website')) {
    answer = "Grab “One-Page Website Outline (SEO-ready)”. It’s a quick structure with keyword hints.";
  } else if (q.includes('fund')) {
    answer = "See “Funding Research with AI”. It shows sources to check and a starter proposal outline.";
  } else if (q.includes('intake') || q.includes('reply')) {
    answer = "Check “Service Intake → Reply Workflow”. It maps intake → summary → suggested reply.";
  }

  return NextResponse.json({ answer });
}

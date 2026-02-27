import 'server-only';

export type ProgramRecommendation = {
  title: string;
  summary: string;
  why: string[];
  path: string;
  price: string;
  roiNote: string;
  automatedBy: 'llm' | 'rules';
};

export type SearchLink = {
  title: string;
  href: string;
  snippet: string;
  type: 'Resource' | 'Program' | 'Blog';
};

export type SearchAnswer = {
  answer: string;
  results: SearchLink[];
  automatedBy: 'llm' | 'rules';
};

export type LeadAutomation = {
  score: number;
  priority: 'high' | 'medium' | 'low';
  recommendation: ProgramRecommendation;
  internalSummary: string;
  followUpMessage: string;
  nextStep: string;
  segment: string;
};

type RecommendationInput = {
  role?: string;
  goal?: string;
  time?: string;
  budget?: string;
};

type ProgramOption = {
  title: string;
  path: '/programs' | '/community';
  price: string;
  summary: string;
  roiNote: string;
};

const PROGRAMS = [
  {
    title: 'AI Foundations (3 Hours)',
    path: '/programs',
    price: 'R1299',
    summary: 'Quickstart session to build one workflow that saves time immediately.',
    roiNote: 'Most attendees report saving 3-5 hours in their first week.',
  },
  {
    title: 'Team Workshop (1 Day)',
    path: '/programs',
    price: 'Custom',
    summary: 'Tailored workshop for your team with playbooks, prompt library, and rollout plan.',
    roiNote: 'Teams typically automate 3-7 repetitive tasks within the first month.',
  },
  {
    title: 'Monthly AI Clinic',
    path: '/community',
    price: 'Free',
    summary: 'Live community session. Bring your challenge and leave with a template and next steps.',
    roiNote: 'Great to validate use-cases before booking a paid session.',
  },
] as const satisfies readonly ProgramOption[];

const SEARCH_CATALOG: SearchLink[] = [
  {
    title: 'AI Foundations Program',
    href: '/programs',
    snippet: 'Hands-on training to build practical workflows quickly.',
    type: 'Program',
  },
  {
    title: 'Team Workshop Program',
    href: '/programs',
    snippet: 'Custom workshop format for teams and organizations.',
    type: 'Program',
  },
  {
    title: 'Resources Library',
    href: '/resources',
    snippet: 'Curated tools, docs, and practical playbooks.',
    type: 'Resource',
  },
  {
    title: 'AI for SMEs',
    href: '/blog/ai-for-smes',
    snippet: 'How small businesses can implement AI with clear wins.',
    type: 'Blog',
  },
  {
    title: 'AI in Marketing',
    href: '/blog/ai-in-marketing',
    snippet: 'Ways to speed up content and campaign workflows.',
    type: 'Blog',
  },
  {
    title: 'AI in Operations',
    href: '/blog/ai-in-operations',
    snippet: 'Automate reporting and process-heavy operations.',
    type: 'Blog',
  },
  {
    title: 'AI in Sales',
    href: '/blog/ai-in-sales',
    snippet: 'Improve response time and lead handling with AI.',
    type: 'Blog',
  },
  {
    title: 'Prompt Engineering Basics',
    href: '/blog/prompt-engineering-basics',
    snippet: 'Prompt patterns you can reuse in daily business tasks.',
    type: 'Blog',
  },
];

type ChatMessage = {
  role: 'system' | 'user';
  content: string;
};

function getApiConfig() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || '';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  return { apiKey, baseUrl, model };
}

function extractJson(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as Record<string, unknown>;
  } catch {
    const first = trimmed.indexOf('{');
    const last = trimmed.lastIndexOf('}');
    if (first < 0 || last <= first) return null;
    const slice = trimmed.slice(first, last + 1);
    try {
      return JSON.parse(slice) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

async function callLlmJson(messages: ChatMessage[]): Promise<Record<string, unknown> | null> {
  const { apiKey, baseUrl, model } = getApiConfig();
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 700,
        messages,
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = body.choices?.[0]?.message?.content;
    if (!content) return null;

    return extractJson(content);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function keywordExists(source: string, values: string[]) {
  return values.some((value) => source.includes(value));
}

function recommendByRules(input: RecommendationInput): ProgramRecommendation {
  const role = String(input.role || '').toLowerCase();
  const goal = String(input.goal || '').toLowerCase();
  const time = String(input.time || '').toLowerCase();
  const budget = String(input.budget || '').toLowerCase();

  let selected: (typeof PROGRAMS)[number] = PROGRAMS[0];
  if (budget === 'free') selected = PROGRAMS[2];
  if (budget === 'custom' || role === 'team') selected = PROGRAMS[1];

  const why: string[] = [];

  if (goal === 'content') {
    why.push('Matches content and marketing workflows for faster output.');
  } else if (goal === 'customers') {
    why.push('Designed for intake, replies, and customer response automation.');
  } else if (goal === 'ops') {
    why.push('Targets process-heavy operations and recurring reports.');
  } else if (goal === 'learning') {
    why.push('Provides practical fundamentals with guided implementation.');
  }

  if (time === 'today') {
    why.push('Optimized for immediate same-day outcomes.');
  } else if (time === 'thisweek') {
    why.push('Structured to deliver measurable results within a week.');
  } else if (time === 'thismonth') {
    why.push('Supports staged rollout over the month.');
  }

  if (why.length === 0) {
    why.push('Best fit based on your current context and intended outcomes.');
  }

  return {
    title: selected.title,
    summary: selected.summary,
    why,
    path: selected.path,
    price: selected.price,
    roiNote: selected.roiNote,
    automatedBy: 'rules',
  };
}

function normalizeRecommendation(raw: Record<string, unknown>, fallback: ProgramRecommendation): ProgramRecommendation {
  const title = String(raw.title || fallback.title);
  const summary = String(raw.summary || fallback.summary);
  const path = String(raw.path || fallback.path);
  const price = String(raw.price || fallback.price);
  const roiNote = String(raw.roiNote || fallback.roiNote);

  const whyRaw = raw.why;
  const why =
    Array.isArray(whyRaw) && whyRaw.length > 0
      ? whyRaw.slice(0, 5).map((item) => String(item)).filter(Boolean)
      : fallback.why;

  const allowedPaths = new Set<string>(PROGRAMS.map((program) => program.path));

  return {
    title,
    summary,
    why,
    path: allowedPaths.has(path) ? path : fallback.path,
    price,
    roiNote,
    automatedBy: 'llm',
  };
}

export async function getProgramRecommendation(input: RecommendationInput): Promise<ProgramRecommendation> {
  const fallback = recommendByRules(input);

  const ai = await callLlmJson([
    {
      role: 'system',
      content:
        'You are an AI automation planner for Kasi AI Hub. Return strict JSON only with fields: title, summary, why (string[]), path, price, roiNote. Keep it concise and business-focused.',
    },
    {
      role: 'user',
      content: JSON.stringify({
        input,
        options: PROGRAMS,
      }),
    },
  ]);

  if (!ai) return fallback;
  return normalizeRecommendation(ai, fallback);
}

function pickLinksByRules(question: string): SearchLink[] {
  const q = question.toLowerCase();
  const links: SearchLink[] = [];

  if (keywordExists(q, ['post', 'social', 'content', 'marketing'])) {
    links.push(SEARCH_CATALOG.find((item) => item.href === '/blog/ai-in-marketing') as SearchLink);
  }
  if (keywordExists(q, ['report', 'operations', 'ops', 'process'])) {
    links.push(SEARCH_CATALOG.find((item) => item.href === '/blog/ai-in-operations') as SearchLink);
  }
  if (keywordExists(q, ['sales', 'reply', 'intake', 'lead', 'customer'])) {
    links.push(SEARCH_CATALOG.find((item) => item.href === '/blog/ai-in-sales') as SearchLink);
  }
  if (keywordExists(q, ['sme', 'small business', 'entrepreneur'])) {
    links.push(SEARCH_CATALOG.find((item) => item.href === '/blog/ai-for-smes') as SearchLink);
  }

  if (links.length === 0) {
    links.push(SEARCH_CATALOG.find((item) => item.href === '/resources') as SearchLink);
  }

  links.push(SEARCH_CATALOG.find((item) => item.title === 'AI Foundations Program') as SearchLink);
  links.push(SEARCH_CATALOG.find((item) => item.title === 'Team Workshop Program') as SearchLink);

  const unique = new Map<string, SearchLink>();
  links.forEach((link) => unique.set(link.href, link));
  return Array.from(unique.values()).slice(0, 5);
}

function searchByRules(question: string): SearchAnswer {
  const q = question.toLowerCase();
  let answer =
    'Start with the AI Foundations program and the Resources library. These are usually the fastest way to get practical wins.';

  if (keywordExists(q, ['post', 'social', 'content'])) {
    answer = 'For content speed, use the AI in Marketing guide plus the Resources library for reusable templates.';
  } else if (keywordExists(q, ['report', 'ops', 'operations'])) {
    answer = 'For operations, begin with AI in Operations and then deploy a repeatable weekly reporting workflow.';
  } else if (keywordExists(q, ['sales', 'lead', 'reply', 'customer'])) {
    answer = 'For customer response and sales, start with AI in Sales and then use the Programs page to map rollout.';
  } else if (keywordExists(q, ['prompt', 'prompting'])) {
    answer = 'Use Prompt Engineering Basics first, then choose a program to apply it to your own workflows.';
  }

  return {
    answer,
    results: pickLinksByRules(question),
    automatedBy: 'rules',
  };
}

function normalizeSearch(raw: Record<string, unknown>, fallback: SearchAnswer): SearchAnswer {
  const answer = String(raw.answer || fallback.answer);
  const refs = Array.isArray(raw.links) ? raw.links.map((item) => String(item)) : [];

  const byHref = new Map(SEARCH_CATALOG.map((item) => [item.href, item]));
  const selected = refs
    .map((ref) => byHref.get(ref))
    .filter((item): item is SearchLink => Boolean(item))
    .slice(0, 5);

  return {
    answer,
    results: selected.length ? selected : fallback.results,
    automatedBy: 'llm',
  };
}

export async function getAiSearchAnswer(question: string): Promise<SearchAnswer> {
  const fallback = searchByRules(question);

  const ai = await callLlmJson([
    {
      role: 'system',
      content:
        'You are an AI search planner for Kasi AI Hub. Return strict JSON with fields: answer (string), links (string[] of href values from catalog). Keep answer under 40 words.',
    },
    {
      role: 'user',
      content: JSON.stringify({
        question,
        catalog: SEARCH_CATALOG,
      }),
    },
  ]);

  if (!ai) return fallback;
  return normalizeSearch(ai, fallback);
}

function computeLeadScore(input: {
  email: string;
  whatsapp: string;
  company: string;
  role: string;
  goals: string;
  sessionType: string;
  budget: string;
}) {
  let score = 20;

  if (input.email) score += 20;
  if (input.whatsapp) score += 15;
  if (input.company) score += 10;
  if (input.role) score += 10;
  if (input.goals.length > 24) score += 15;
  if (keywordExists(input.goals.toLowerCase(), ['urgent', 'today', 'asap'])) score += 10;
  if (keywordExists(input.sessionType, ['team', 'workshop']) || input.budget === 'custom') score += 10;

  const bounded = Math.max(0, Math.min(100, score));
  const priority: LeadAutomation['priority'] = bounded >= 75 ? 'high' : bounded >= 50 ? 'medium' : 'low';
  return { score: bounded, priority };
}

function buildLeadSegment(role: string, goals: string) {
  if (keywordExists(role, ['team', 'manager', 'operations'])) return 'team-ops';
  if (keywordExists(goals, ['marketing', 'social', 'content'])) return 'growth-marketing';
  if (keywordExists(goals, ['sales', 'customer', 'reply', 'intake'])) return 'sales-support';
  return 'foundations';
}

export async function automateLead(raw: Record<string, unknown>): Promise<LeadAutomation> {
  const name = String(raw.name || '').trim();
  const email = String(raw.email || '').trim();
  const whatsapp = String(raw.whatsapp || '').trim();
  const company = String(raw.company || '').trim();
  const role = String(raw.role || '').trim().toLowerCase();
  const goals = String(raw.goals || raw.note || '').trim();
  const sessionType = String(raw.sessionType || '').trim().toLowerCase();
  const budget = String(raw.budget || '').trim().toLowerCase();
  const time = String(raw.time || raw.timePreference || '').trim().toLowerCase();
  const goal = goals.toLowerCase();

  const recommendation = await getProgramRecommendation({
    role,
    goal: keywordExists(goal, ['marketing', 'social', 'content'])
      ? 'content'
      : keywordExists(goal, ['customer', 'sales', 'reply', 'intake'])
        ? 'customers'
        : keywordExists(goal, ['ops', 'operations', 'report'])
          ? 'ops'
          : 'learning',
    time: keywordExists(time, ['today', 'asap']) ? 'today' : keywordExists(time, ['week']) ? 'thisweek' : 'thismonth',
    budget: budget || (keywordExists(sessionType, ['clinic']) ? 'free' : keywordExists(sessionType, ['team']) ? 'custom' : 'under1500'),
  });

  const scored = computeLeadScore({
    email,
    whatsapp,
    company,
    role,
    goals,
    sessionType,
    budget,
  });

  const segment = buildLeadSegment(role, goal);
  const nextStep = recommendation.path === '/community' ? 'Invite to clinic + send starter checklist' : 'Share schedule slots + tailored plan';

  const fallbackSummary = `${name || 'Lead'} requested help with ${goals || 'AI workflow setup'}. Recommended: ${recommendation.title}. Priority: ${scored.priority.toUpperCase()} (${scored.score}/100).`;
  const fallbackFollowUp = `Thanks ${name || 'there'}! We recommend "${recommendation.title}" based on your goals. Next step: ${nextStep}.`;

  const ai = await callLlmJson([
    {
      role: 'system',
      content:
        'You are an assistant that drafts lead triage output. Return strict JSON with keys: internalSummary, followUpMessage. Keep each under 220 characters and professional.',
    },
    {
      role: 'user',
      content: JSON.stringify({
        name,
        role,
        company,
        goals,
        recommendation,
        priority: scored.priority,
        score: scored.score,
        nextStep,
      }),
    },
  ]);

  const internalSummary = String(ai?.internalSummary || fallbackSummary);
  const followUpMessage = String(ai?.followUpMessage || fallbackFollowUp);

  return {
    score: scored.score,
    priority: scored.priority,
    recommendation,
    internalSummary,
    followUpMessage,
    nextStep,
    segment,
  };
}

export function getCommunityWelcome(name: string, email: string) {
  const domain = email.includes('@') ? email.split('@')[1].toLowerCase() : '';
  const learnerType = domain.endsWith('.edu') || domain.includes('university') ? 'learner' : 'builder';
  const firstName = name.trim().split(' ')[0] || 'there';
  return `Welcome ${firstName}! You are in. We tagged your profile as ${learnerType} and will send AI workflows you can apply immediately.`;
}

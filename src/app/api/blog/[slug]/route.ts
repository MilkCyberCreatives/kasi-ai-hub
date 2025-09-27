// src/app/api/blog/[slug]/route.ts
import { NextResponse } from 'next/server';

const DB: Record<string, any> = {
  'ai-post-generator': {
    slug: 'ai-post-generator',
    title: 'AI Post Generator: Create 30 Social Posts in 3 Hours',
    cover: '/images/blog/ai-post-generator.jpg',
    author: 'kasiAIhub',
    date: '2025-09-10',
    tags: ['Marketing', 'Templates'],
    readMins: 7,
    body: '<p>…post body…</p>',
  },
  'weekly-ops-report-template': {
    slug: 'weekly-ops-report-template',
    title: 'Weekly Ops Report Template (with AI)',
    cover: '/images/blog/weekly-ops.jpg',
    author: 'kasiAIhub',
    date: '2025-08-20',
    tags: ['Automation', 'Operations'],
    readMins: 6,
    body: '<p>…post body…</p>',
  },
  'service-intake-reply-workflow': {
    slug: 'service-intake-reply-workflow',
    title: 'Service Intake → Summary → Reply Workflow',
    cover: '/images/blog/intake-reply.jpg',
    author: 'kasiAIhub',
    date: '2025-08-05',
    tags: ['Customer Service', 'Automation'],
    readMins: 8,
    body: '<p>…post body…</p>',
  },
};

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const post = DB[params.slug];
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

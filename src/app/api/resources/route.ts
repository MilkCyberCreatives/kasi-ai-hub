// src/app/api/resources/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Demo dataset — replace with your CMS later
  const data = [
    {
      id: 'r1',
      title: 'AI Post Generator – 30 posts in 3 hours',
      summary: 'A step-by-step guide + prompt patterns to batch create social posts.',
      tag: 'Guide',
      topic: 'Marketing',
      level: 'Beginner',
      href: '/blog/ai-post-generator',
      image: '/images/resources/ai-posts.jpg',
      updated: '2025-09-01',
      minutes: 8,
    },
    {
      id: 'r2',
      title: 'Weekly Ops Report – Template',
      summary: 'A reusable doc and prompt to generate tidy weekly operations reports.',
      tag: 'Template',
      topic: 'Automation',
      level: 'Beginner',
      href: '/blog/weekly-ops-report-template',
      image: '/images/resources/ops-report.jpg',
      updated: '2025-08-15',
      minutes: 5,
    },
    {
      id: 'r3',
      title: 'Service Intake → Reply Workflow',
      summary: 'Turn new WhatsApps or emails into summaries + suggested replies.',
      tag: 'Checklist',
      topic: 'Automation',
      level: 'Intermediate',
      href: '/blog/service-intake-reply-workflow',
      image: '/images/resources/intake-reply.jpg',
      updated: '2025-08-22',
      minutes: 7,
    },
    {
      id: 'r4',
      title: 'One-Page Website Outline (SEO-ready)',
      summary: 'A simple outline with keywords and sections to launch fast.',
      tag: 'Template',
      topic: 'Websites',
      level: 'Beginner',
      href: '/blog/one-page-website-outline',
      image: '/images/resources/onepager.jpg',
      updated: '2025-07-30',
      minutes: 6,
    },
    {
      id: 'r5',
      title: 'Funding Research with AI',
      summary: 'How to find opportunities and draft a basic proposal quickly.',
      tag: 'Guide',
      topic: 'Funding',
      level: 'Intermediate',
      href: '/blog/funding-research-with-ai',
      image: '/images/resources/funding.jpg',
      updated: '2025-06-28',
      minutes: 9,
    },
  ];

  return NextResponse.json(data);
}

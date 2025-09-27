// src/data/posts.ts
export type Post = {
  slug: string
  title: string
  excerpt: string
  cover: string   // path in /public
  author: string
  date: string    // ISO date
  tags: string[]
  readMins: number
}

export const posts: Post[] = [
  {
    slug: 'ai-post-generator',
    title: 'AI Post Generator – 30 Social Posts in 3 Hours',
    excerpt:
      'A practical system + prompt patterns to batch-create a month of content in one afternoon.',
    cover: '/images/blog/ai-post-generator.jpg',
    author: 'kasiAIhub',
    date: '2025-09-10',
    tags: ['Marketing', 'Templates'],
    readMins: 7,
  },
  {
    slug: 'weekly-ops-report-template',
    title: 'Weekly Ops Report Template (with AI)',
    excerpt:
      'Turn raw notes into tidy weekly reports with a repeatable checklist.',
    cover: '/images/blog/weekly-ops.jpg',
    author: 'kasiAIhub',
    date: '2025-08-20',
    tags: ['Automation', 'Operations'],
    readMins: 6,
  },
  {
    slug: 'service-intake-reply-workflow',
    title: 'Service Intake → Reply Workflow',
    excerpt:
      'Capture, summarise, and draft responses for leads and support in minutes.',
    cover: '/images/blog/intake-reply.jpg',
    author: 'kasiAIhub',
    date: '2025-08-05',
    tags: ['Customer Service', 'Automation'],
    readMins: 8,
  },
]

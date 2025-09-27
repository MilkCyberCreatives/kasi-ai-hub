export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string   // ISO YYYY-MM-DD
  tags: string[]
  cover?: string
  content: string // simple HTML for now
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "intro-to-ai-for-entrepreneurs",
    title: "AI for Entrepreneurs: Start Here",
    excerpt: "A practical overview of where AI can add value in township and small businesses—from content to customer service.",
    author: "kasiAIhub Team",
    date: "2025-09-01",
    tags: ["AI Basics", "Entrepreneurship"],
    cover: "/images/blog/ai-intro.jpg",
    content: `
      <p>AI can save time and unlock new opportunities. In this guide, we explain the basics, show real examples, and
      outline the first steps you can take this week—no technical background required.</p>
      <h2>Where to use AI first</h2>
      <ul>
        <li>Content & marketing: captions, emails, posters</li>
        <li>Customer service: FAQs and support summaries</li>
        <li>Operations: checklists, SOPs, quick reports</li>
      </ul>
      <p>Start small, measure results, and improve your prompts as you go.</p>
    `
  },
  {
    slug: "best-prompts-for-small-business",
    title: "Best Prompt Patterns for Small Business",
    excerpt: "Five reusable prompt templates that consistently produce useful outputs for marketing and operations.",
    author: "kasiAIhub Team",
    date: "2025-09-08",
    tags: ["Prompts", "Marketing"],
    cover: "/images/blog/prompt-patterns.jpg",
    content: `
      <p>Prompts are processes. These five patterns work across industries:</p>
      <ol>
        <li><strong>Role</strong> + <strong>Goal</strong> + <strong>Constraints</strong></li>
        <li><strong>Example</strong> + <strong>Critique</strong> + <strong>Improve</strong></li>
        <li><strong>Checklist</strong> + <strong>Fill</strong> + <strong>Review</strong></li>
        <li><strong>Audience</strong> + <strong>Tone</strong> + <strong>Channel</strong></li>
        <li><strong>Brief</strong> → <strong>Draft</strong> → <strong>Rewrite</strong> → <strong>Polish</strong></li>
      </ol>
      <p>Copy, adapt, and save them in your notes app for fast reuse.</p>
    `
  }
]

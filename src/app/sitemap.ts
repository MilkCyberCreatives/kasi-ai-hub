import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/data/blogs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://kasiaihub.com'
  const now = new Date().toISOString()

  const staticRoutes = [
    '', 'programs', 'resources', 'community', 'about', 'ai-search', 'book', 'blog'
  ].map(r => ({
    url: `${base}/${r}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8
  }))

  const blogRoutes = BLOG_POSTS.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...staticRoutes, ...blogRoutes]
}

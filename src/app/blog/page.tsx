// src/app/blog/page.tsx
import Script from 'next/script'
import BreadcrumbHero from '@/components/BreadcrumbHero'
import BlogCard, { type BlogPost } from '@/components/BlogCard'

export const metadata = {
  title: 'Blog',
  description: 'Guides, updates, and case studies from kasiAIhub.',
}

async function getPosts(): Promise<BlogPost[]> {
  // Build an absolute URL that works in dev and prod
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL?.startsWith('http')
      ? process.env.VERCEL_URL
      : `http://localhost:${process.env.PORT || 3000}`

  const url =
    typeof origin === 'string' && origin.startsWith('http')
      ? new URL('/api/blog', origin).toString()
      : `http://localhost:3000/api/blog`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  return (await res.json()) as BlogPost[]
}

export default async function BlogPage() {
  const posts = await getPosts()

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://kasiaihub.com/blog' },
    ],
  }
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 10).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://kasiaihub.com/blog/${p.slug}`,
      name: p.title,
    })),
  }

  return (
    <main className="min-h-screen">
      <Script id="ld-bc-blog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-il-blog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <BreadcrumbHero title="Blog" subtitle="Guides, updates, and case studies from kasiAIhub." currentPage="Blog" />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-white/70">No posts yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

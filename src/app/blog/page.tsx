// src/app/blog/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import BreadcrumbHero from '@/components/BreadcrumbHero'
import { posts } from '@/data/posts'

export const metadata = {
  title: 'Blog',
  description: 'Short, practical reads with real examples.',
}

// Static + revalidate for speed
export const dynamic = 'force-static'
export const revalidate = 60 * 60 // 1 hour

export default function BlogPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://kasiaihub.com/blog' },
    ],
  }

  return (
    <main className="min-h-screen">
      <JsonLd id="ld-bc-blog" data={breadcrumbLd} />

      <BreadcrumbHero title="Blog" subtitle="Short reads with real examples." currentPage="Blog" />

      <section className="mx-auto max-w-7xl px-4 py-10">
        {posts.length === 0 ? (
          <p className="text-white/70">No posts yet. Please check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="glass rounded-2xl overflow-hidden hover:bg-white/5 transition"
              >
                <div className="h-44 w-full relative">
                  <Image
                    src={p.cover || '/og/default.jpg'}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-white/60">
                    {new Date(p.date).toLocaleDateString()} {p.readMins ? `• ${p.readMins} min` : null}
                  </div>
                  <h2 className="mt-1 text-white font-semibold">{p.title}</h2>
                  <p className="mt-1 text-white/75 text-sm">{p.excerpt}</p>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-3 inline-block rounded-lg px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
                  >
                    Read
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

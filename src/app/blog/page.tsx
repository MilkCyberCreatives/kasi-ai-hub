// src/app/blog/page.tsx
import Script from 'next/script';
import Link from 'next/link';
import BreadcrumbHero from '@/components/BreadcrumbHero';
import { posts } from '@/data/posts';

export const metadata = {
  title: 'Blog',
  description: 'Short, practical reads with real examples.',
};

// Fully static to avoid server exceptions on Vercel
export const dynamic = 'force-static';

export default function BlogPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://kasiaihub.com/blog' },
    ],
  };

  return (
    <main className="min-h-screen">
      <Script id="ld-bc-blog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <BreadcrumbHero
        title="Blog"
        subtitle="Short reads with real examples."
        currentPage="Blog"
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        {posts.length === 0 ? (
          <p className="text-white/70">No posts yet. Please check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="glass rounded-2xl overflow-hidden hover:bg-white/5 transition">
                {/* Using plain <img> to keep your existing styles; swap to next/image if you prefer */}
                <img
                  src={p.cover || '/og/default.jpg'}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <div className="text-xs text-white/60">
                    {new Date(p.date).toLocaleDateString()} • {p.readMins} min
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
  );
}

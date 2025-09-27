// src/app/blog/[slug]/page.tsx
import 'server-only';
import type { Metadata } from 'next';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/data/posts'; // uses fs + gray-matter (server-only)

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = getPostBySlug(params.slug);
  const title = `${data.title ?? params.slug} | Kasi AI Hub`;
  const description = (data.excerpt as string) || '';
  const url = `https://kasiaihub.com/blog/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: data.cover ? [{ url: data.cover, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: (data.canonical as string) || url,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { data: meta, content } = getPostBySlug(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title ?? params.slug,
    image: meta.cover,
    author: { '@type': 'Organization', name: 'Kasi AI Hub' },
    datePublished: meta.date,
    publisher: {
      '@type': 'Organization',
      name: 'Kasi AI Hub',
      logo: { '@type': 'ImageObject', url: '/logo.svg' },
    },
    description: meta.excerpt,
    mainEntityOfPage: `https://kasiaihub.com/blog/${params.slug}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold">{(meta.title as string) ?? params.slug}</h1>
      {meta.date && (
        <p className="text-neutral-500 mt-2">
          {new Date(meta.date as string).toLocaleDateString()}
        </p>
      )}

      {meta.cover ? (
        <div className="mt-6">
          <Image
            src={meta.cover as string}
            alt={(meta.title as string) ?? ''}
            width={1200}
            height={630}
            className="w-full rounded-xl"
            priority
          />
        </div>
      ) : null}

      <article className="prose prose-invert max-w-none mt-8">
        {/* ✅ Render compiled MDX, not a raw object */}
        <MDXRemote source={content} />
      </article>
    </main>
  );
}

// src/app/blog/[slug]/page.tsx
import 'server-only'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPostSlugs } from '@/data/posts'

// Static + revalidate
export const dynamic = 'force-static'
export const revalidate = 60 * 60 // 1 hour

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  // Ensure posts are pre-rendered at build time
  const slugs = getAllPostSlugs?.() ?? []
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const { data } = post
  const title = `${(data.title as string) ?? params.slug} | Kasi AI Hub`
  const description = (data.excerpt as string) || ''
  const url = `https://kasiaihub.com/blog/${params.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: data.cover ? [{ url: data.cover as string, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: (data.canonical as string) || url,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const { data: meta, content } = post

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: (meta.title as string) ?? params.slug,
    image: meta.cover,
    author: { '@type': 'Person', name: (meta.author as string) || 'AI Admin' },
    datePublished: meta.date,
    publisher: {
      '@type': 'Organization',
      name: 'Kasi AI Hub',
      logo: { '@type': 'ImageObject', url: 'https://kasiaihub.com/logo.svg' },
    },
    description: meta.excerpt,
    mainEntityOfPage: `https://kasiaihub.com/blog/${params.slug}`,
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-3xl font-bold">{(meta.title as string) ?? params.slug}</h1>

      <p className="text-neutral-500 mt-2">
        {(meta.date && new Date(meta.date as string).toLocaleDateString()) || ''}
        {meta.author ? ` • ${meta.author as string}` : ''}
      </p>

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
        <MDXRemote source={content} />
      </article>
    </main>
  )
}

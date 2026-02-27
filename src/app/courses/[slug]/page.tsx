// src/app/courses/[slug]/page.tsx
import 'server-only'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCourseBySlug, getCourseSlugs } from '@/data/courses'

// Static + revalidate
export const dynamic = 'force-static'
export const revalidate = 60 * 60 // 1 hour

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = getCourseBySlug(params.slug)
  if (!c) return {}
  const title = `${(c.data.title as string) ?? params.slug} | Course`
  const description = (c.data.summary as string) || ''
  const ogImage =
    typeof c.data.cover === 'string'
      ? [{ url: c.data.cover as string, width: 1200, height: 630 }]
      : []

  return {
    title,
    description,
    openGraph: { title, description, images: ogImage },
    alternates: {
      canonical: `https://kasiaihub.com/courses/${params.slug}`,
    },
  }
}

export default async function CoursePage({ params }: Props) {
  const c = getCourseBySlug(params.slug)
  if (!c) return notFound()

  const { data, content } = c
  const level = (data.level as string) || 'All levels'
  const duration = (data.duration as string) || ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: (data.title as string) ?? params.slug,
    description: (data.summary as string) || '',
    provider: { '@type': 'Organization', name: 'Kasi AI Hub', sameAs: 'https://kasiaihub.com' },
    educationalLevel: level,
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-bold">{(data.title as string) ?? params.slug}</h1>
      <p className="text-white/70 mt-2">{(data.summary as string) || ''}</p>

      {typeof data.cover === 'string' && data.cover && (
        <div className="mt-6">
          <Image
            src={data.cover as string}
            alt={(data.title as string) ?? ''}
            width={1200}
            height={630}
            className="w-full rounded-xl"
            priority={false}
          />
        </div>
      )}

      <article className="prose prose-invert max-w-none mt-8">
        <MDXRemote source={content} />
      </article>

      <div className="mt-8 glass rounded-xl p-4 flex items-center justify-between">
        <div className="text-white/80">
          <div>
            {level} {duration ? `• ${duration}` : ''}
          </div>
          <div className="text-white/60 text-sm">Request pricing after intake</div>
        </div>

        <a
          href={`/book?course=${params.slug}`}
          className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10"
        >
          Start now
        </a>
      </div>
    </main>
  )
}

// src/app/courses/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import BreadcrumbHero from '@/components/BreadcrumbHero'
import { courses } from '@/data/courses'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 // 1h

export const metadata = {
  title: 'Courses',
  description: 'Self-paced AI courses you can take in your own time.',
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbHero title="Courses" subtitle="Learn AI at your own pace." currentPage="Courses" />
      <section className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3">
        {courses.length === 0 && (
          <p className="text-white/70">Courses coming soon.</p>
        )}
        {courses.map(c => (
          <article key={c.slug} className="glass rounded-2xl overflow-hidden hover:bg-white/5 transition">
            <div className="relative h-44">
              <Image src={c.cover || '/og/default.jpg'} alt={c.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-5">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="text-white/70 text-sm mt-1">{c.summary}</p>
              <p className="text-white/60 text-xs mt-2">
                {c.level ? `${c.level} • ` : ''}{c.duration || ''}{c.lessonsCount ? ` • ${c.lessonsCount} lessons` : ''}
              </p>
              {c.price && <p className="mt-2 font-semibold">{c.price}</p>}
              <Link href={`/courses/${c.slug}`} className="mt-3 inline-block rounded-lg px-4 py-2 text-sm border border-white/20 hover:bg-white/10">
                View course
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

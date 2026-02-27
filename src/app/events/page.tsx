// src/app/events/page.tsx
import Image from 'next/image'
import BreadcrumbHero from '@/components/BreadcrumbHero'
import { events, getUpcoming } from '@/data/events'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 12 // 12h

export const metadata = {
  title: 'Events',
  description: 'Seminars and workshops — online and in person.',
}

export default function EventsPage() {
  const list = getUpcoming().length ? getUpcoming() : events

  return (
    <main className="min-h-screen">
      <BreadcrumbHero title="Events" subtitle="Seminars & workshops — online and in person." currentPage="Events" />

      <section className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-2">
        {list.map(ev => {
          const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: ev.name,
            description: ev.description,
            startDate: ev.startDate,
            endDate: ev.endDate || ev.startDate,
            eventAttendanceMode: ev.location.online ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: ev.location.online
              ? { '@type': 'VirtualLocation', url: ev.location.url || 'https://kasiaihub.com/events' }
              : {
                  '@type': 'Place',
                  name: ev.location.name,
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: ev.location.address,
                    addressLocality: ev.location.city || '',
                    addressCountry: ev.location.country || 'ZA'
                  }
                },
            image: ev.image ? [`https://kasiaihub.com${ev.image}`] : undefined,
            organizer: { '@type': 'Organization', name: 'Kasi AI Hub', url: 'https://kasiaihub.com' },
          }

          return (
            <article key={ev.slug} className="glass rounded-2xl overflow-hidden">
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
              <div className="relative h-48">
                <Image src={ev.image || '/og/default.jpg'} alt={ev.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold">{ev.name}</h2>
                <p className="text-white/70 mt-1">{ev.description}</p>
                <p className="text-white/60 text-sm mt-2">
                  {new Date(ev.startDate).toLocaleString()} • {ev.location.name}
                </p>
                {ev.cta && (
                  <a href={ev.cta.url} className="mt-3 inline-block rounded-lg px-4 py-2 text-sm border border-white/20 hover:bg-white/10">
                    {ev.cta.label}
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

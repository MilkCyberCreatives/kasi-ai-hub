// src/app/community/page.tsx
import Script from 'next/script'
import BreadcrumbHero from '@/components/BreadcrumbHero'

export const metadata = {
  title: 'Community',
  description:
    'Join kasiAIhub community clinics and WhatsApp groups. Learn practical AI together, share wins, and get help.',
}

// Simple data — change anytime
const CLINICS = [
  {
    name: 'Johannesburg Clinic',
    date: '2025-10-05T10:00:00+02:00',
    end: '2025-10-05T12:00:00+02:00',
    where: 'Braamfontein Library, Johannesburg',
  },
  {
    name: 'Pretoria Clinic',
    date: '2025-10-12T10:00:00+02:00',
    end: '2025-10-12T12:00:00+02:00',
    where: 'Innovation Hub, Pretoria',
  },
  {
    name: 'Cape Town Clinic',
    date: '2025-10-19T10:00:00+02:00',
    end: '2025-10-19T12:00:00+02:00',
    where: 'Woodstock Exchange, Cape Town',
  },
]

// Helper to post to your /api/lead route
async function createLead(formData: FormData) {
  'use server'
  const payload = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    whatsapp: String(formData.get('whatsapp') || ''),
    source: 'community-page',
    note: String(formData.get('note') || ''),
  }

  try {
    await fetch(process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/lead` : 'http://localhost:3000/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
  } catch {
    // Fail silently on dev; your API can log/alert
  }
}

export default function CommunityPage() {
  // JSON-LD: breadcrumbs + upcoming events
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Community', item: 'https://kasiaihub.com/community' },
    ],
  }

  const eventsLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CLINICS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: c.name,
        startDate: c.date,
        endDate: c.end,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: c.where,
          address: { '@type': 'PostalAddress', addressLocality: c.where },
        },
        organizer: { '@type': 'Organization', name: 'kasiAIhub' },
      },
    })),
  }

  return (
    <main className="min-h-screen">
      <Script id="ld-bc-community" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-events-community" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }} />

      {/* Shared breadcrumb hero (same image as other pages) */}
      <BreadcrumbHero
        title="Community"
        subtitle="Free monthly clinics, WhatsApp groups, and local meetups to learn practical AI together."
        currentPage="Community"
      />

      {/* Page content */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Clinics */}
        <div className="grid gap-6 md:grid-cols-3">
          {CLINICS.map((c) => (
            <article key={c.name} className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg">{c.name}</h3>
              <p className="mt-1 text-white/80">
                {new Date(c.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
              <p className="text-white/70 text-sm">{c.where}</p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://wa.me/message"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
                >
                  WhatsApp group
                </a>
                <a
                  href="/book"
                  className="rounded-xl px-4 py-2 text-sm text-black"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  Book a seat
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Invite to host */}
        <section className="mt-10 glass rounded-2xl p-6 md:p-8">
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold text-lg">Host a clinic in your community</h3>
              <p className="mt-2 text-white/80">
                We partner with libraries, colleges, and community centers across South Africa. You bring the venue;
                we bring the training.
              </p>
            </div>
            <a
              href="/book"
              className="mt-4 md:mt-0 inline-flex rounded-xl px-5 py-3 text-black font-medium"
              style={{ background: 'var(--brand-primary)' }}
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* Signup form */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg">Join the community list</h3>
            <p className="mt-2 text-white/80">
              Get clinic dates, templates, and new guides. We send helpful, short emails — no spam.
            </p>

            <form action={createLead} className="mt-5 grid gap-3">
              <input
                name="name"
                required
                placeholder="Your name"
                className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              />
              <input
                name="whatsapp"
                placeholder="WhatsApp (optional)"
                className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              />
              <textarea
                name="note"
                rows={3}
                placeholder="What do you want to learn or build?"
                className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              />
              <button
                type="submit"
                className="rounded-xl px-5 py-3 text-black font-medium"
                style={{ background: 'var(--brand-primary)' }}
              >
                Join the list
              </button>
              <p className="text-xs text-white/60">
                By submitting, you agree we can email you community updates. Unsubscribe anytime.
              </p>
            </form>
          </article>

          {/* Quick links */}
          <article className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold text-lg">Quick links</h3>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>
                <a href="/resources" className="underline underline-offset-4">
                  Guides & templates
                </a>
              </li>
              <li>
                <a href="/blog" className="underline underline-offset-4">
                  Blog & case studies
                </a>
              </li>
              <li>
                <a href="/book" className="underline underline-offset-4">
                  Book a session
                </a>
              </li>
              <li>
                <a href="https://wa.me/message" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  WhatsApp support
                </a>
              </li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}

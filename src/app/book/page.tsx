// src/app/book/page.tsx
import Script from 'next/script'
import BreadcrumbHero from '@/components/BreadcrumbHero'
import BookingForm from '@/components/BookingForm'

export const metadata = {
  title: 'Book a Session',
  description:
    'Schedule a 3-hour build session or a custom team workshop. Leave with a working AI workflow, templates, and next steps.',
}

export default function BookPage() {
  // SEO JSON-LD
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Book', item: 'https://kasiaihub.com/book' },
    ],
  }

  const offerLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Training – 3-Hour Build Session',
    provider: { '@type': 'Organization', name: 'kasiAIhub' },
    areaServed: 'ZA',
    description:
      'Hands-on AI training for entrepreneurs and teams. Build a working workflow in 3 hours with templates and SOPs.',
    offers: {
      '@type': 'Offer',
      price: '1299',
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      url: 'https://kasiaihub.com/book',
    },
  }

  return (
    <main className="min-h-screen">
      <Script id="ld-breadcrumbs-book" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-offer-book" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />

      {/* Shared breadcrumb hero (same background as other pages) */}
      <BreadcrumbHero
        title="Book a Session"
        subtitle="Pick your session, tell us your goal, and we’ll confirm the best time and venue."
        currentPage="Book"
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Options + Form */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Options / What you get */}
          <aside className="md:col-span-1 space-y-6">
            <article className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg">Sessions</h3>
              <ul className="mt-3 space-y-2 text-white/85">
                <li>• 3-Hour Build Session — <strong>R1299</strong></li>
                <li>• Custom Team Workshop — <strong>On request</strong></li>
                <li>• Monthly AI Clinic — <strong>Free</strong></li>
              </ul>
            </article>

            <article className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg">What you’ll leave with</h3>
              <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
                <li>One working workflow</li>
                <li>Templates + SOP checklist</li>
                <li>Prompt patterns you can reuse</li>
                <li>Next-30-days plan</li>
              </ul>
            </article>

            <article className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg">Locations</h3>
              <p className="mt-2 text-white/80">
                Johannesburg, Sandton, Pretoria, Durban, Cape Town, Soweto, Alexandra, Mamelodi — and group bookings at your venue.
              </p>
            </article>
          </aside>

          {/* Booking form */}
          <div className="md:col-span-2">
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  )
}

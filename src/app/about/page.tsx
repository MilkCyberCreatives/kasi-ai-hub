// src/app/about/page.tsx
import Script from 'next/script'
import BreadcrumbHero from '@/components/BreadcrumbHero'
import Link from 'next/link'

export const metadata = {
  title: 'About',
  description:
    'kasiAIhub helps entrepreneurs, teams, and communities learn practical AI fast. Build real workflows in hours, not weeks.',
}

export default function AboutPage() {
  // SEO JSON-LD
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'kasiAIhub',
    url: 'https://kasiaihub.com/about',
    logo: 'https://kasiaihub.com/favicon.svg',
    sameAs: [],
    foundingLocation: 'South Africa',
    description:
      'Hands-on AI training and templates for entrepreneurs, teams, and communities.',
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://kasiaihub.com/about' },
    ],
  }

  return (
    <main className="min-h-screen">
      {/* JSON-LD */}
      <Script id="ld-org-about" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Script id="ld-breadcrumbs-about" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Shared hero-breadcrumb (uses the same background as other pages) */}
      <BreadcrumbHero
        title="About"
        subtitle="We teach practical AI with real examples from community businesses."
        currentPage="About"
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Mission */}
        <div className="grid gap-6 md:grid-cols-3">
          <article className="md:col-span-2 glass rounded-2xl p-6">
            <h2 className="text-white text-xl font-semibold">Our mission</h2>
            <p className="mt-2 text-white/80">
              Make AI <em>useful</em> for everyday work. We help entrepreneurs and teams build
              workflows they can run today—marketing, customer service, operations, and reports.
            </p>
            <p className="mt-2 text-white/80">
              Every session is designed to deliver a working result in 3 hours, plus templates and
              a prompt library you can reuse.
            </p>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="text-white text-lg font-semibold">At a glance</h3>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>✅ 200+ entrepreneurs trained</li>
              <li>⚡ 3-hour build sessions</li>
              <li>🧰 Templates & playbooks included</li>
              <li>🛡️ Privacy-first guidance</li>
            </ul>
          </article>
        </div>

        {/* What we teach */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold">How we teach</h3>
            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
              <li>Structured prompting: role → goal → constraints</li>
              <li>Hands-on builds with your real tasks</li>
              <li>Checklists + SOPs for repeatability</li>
              <li>Simple automations and report templates</li>
            </ul>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold">Who it’s for</h3>
            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
              <li>Entrepreneurs & multipreneurs</li>
              <li>Small/medium teams</li>
              <li>Community leaders & NPOs</li>
              <li>Students and career changers</li>
            </ul>
          </article>
        </section>

        {/* Team (placeholder – swap images later if you’d like) */}
        <section className="mt-10">
          <h3 className="text-white font-semibold text-lg">Team</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {[
              { name: 'Program Lead', role: 'Training & Playbooks', img: '/images/team/lead.jpg' },
              { name: 'Automation Coach', role: 'Workflows & SOPs', img: '/images/team/coach.jpg' },
              { name: 'Community Coordinator', role: 'Partners & Clinics', img: '/images/team/community.jpg' },
            ].map((t) => (
              <article key={t.name} className="glass rounded-2xl p-5 text-center">
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-white/5">
                  <img src={t.img} alt={t.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 text-white/90 font-semibold">{t.name}</div>
                <div className="text-white/70 text-sm">{t.role}</div>
              </article>
            ))}
          </div>
        </section>

        {/* Locations summary (links to Home locations section if needed) */}
        <section className="mt-10 glass rounded-2xl p-6">
          <h3 className="text-white font-semibold">Where we operate</h3>
          <p className="mt-2 text-white/80">
            We host sessions across South Africa—Johannesburg, Pretoria, Sandton, Cape Town, Durban,
            Soweto, Alexandra, Mamelodi—and travel for group bookings.
          </p>
          <div className="mt-4">
            <Link
              href="/book"
              className="rounded-xl px-4 py-2 text-black"
              style={{ background: 'var(--brand-primary)' }}
            >
              Book a Session
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h3 className="text-white text-xl font-semibold">Ready to build with AI?</h3>
          <p className="mt-2 text-white/80">Pick a session and leave with a working workflow.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link
              href="/programs"
              className="rounded-xl px-5 py-3 text-black font-medium"
              style={{ background: 'var(--brand-primary)' }}
            >
              See Programs
            </Link>
            <Link
              href="/book"
              className="rounded-xl px-5 py-3 text-sm border border-white/20 text-white hover:bg-white/10"
            >
              Book a Session
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}

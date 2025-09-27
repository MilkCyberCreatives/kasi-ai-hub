// src/components/ServicesGrid.tsx
'use client';

import Link from 'next/link';

const SERVICES = [
  {
    slug: '/ai-websites', // you can change the route later
    title: 'Website Development',
    blurb:
      'Fast, conversion-focused sites with AI content workflows built-in.',
    img: '/images/home/services/website.png',
  },
  {
    slug: '/ai-social-media-marketing-training',
    title: 'Social Media Marketing',
    blurb:
      'Plan, generate, and schedule 30 posts in 3 hours with AI templates.',
    img: '/images/home/services/marketing.png',
  },
  {
    slug: '/ai-business-automation-training',
    title: 'Business Automation',
    blurb:
      'Automate intake, replies, and weekly reports. Checklists + approvals.',
    img: '/images/home/services/automation.png',
  },
  {
    slug: '/ai-market-research-funding-training',
    title: 'Market Research & Funding',
    blurb:
      'Use AI to research markets, draft proposals, and prep funding decks.',
    img: '/images/home/services/research.png',
  },
];

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            What we help you build
          </h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Practical services designed for community businesses and teams.
          </p>
        </div>
        <Link
          href="/programs"
          className="hidden md:inline-flex rounded-xl px-4 py-2 text-sm text-black"
          style={{ background: 'var(--brand-primary)' }}
        >
          View training programs
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <article key={s.title} className="glass rounded-2xl overflow-hidden flex flex-col">
            <div className="h-36 w-full bg-black/30">
              <img src={s.img} alt={s.title} className="h-full w-full object-cover opacity-90" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-white font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80 text-sm">{s.blurb}</p>
              <div className="mt-4">
                <Link href={s.slug} className="text-sm underline underline-offset-4 text-white/90">
                  Learn more
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Link
          href="/programs"
          className="inline-flex rounded-xl px-4 py-2 text-sm text-black"
          style={{ background: 'var(--brand-primary)' }}
        >
          View training programs
        </Link>
      </div>
    </section>
  );
}

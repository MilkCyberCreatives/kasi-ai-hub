// src/components/ApplyBanner.tsx
'use client';

import Link from 'next/link';

export default function ApplyBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Apply for training
          </h2>
          <p className="mt-1 text-white/80">
            Cohorts, workshops, and custom sessions for your team or business.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/book"
            className="rounded-xl px-5 py-3 text-black font-medium"
            style={{ background: 'var(--brand-primary)' }}
          >
            Book a Session
          </Link>
          <Link
            href="/programs"
            className="rounded-xl px-5 py-3 text-sm border border-white/20 text-white hover:bg-white/10"
          >
            Explore Programs
          </Link>
        </div>
      </div>
    </section>
  );
}

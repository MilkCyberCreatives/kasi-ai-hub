// src/components/FinalCTA.tsx
'use client';

import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="glass rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Ready to <span className="text-[var(--brand-primary)]">learn & build</span> with AI?
        </h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Join a session and leave with a working workflow, templates, and a plan for the next 30 days.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/book"
            className="rounded-xl px-6 py-3 text-black font-medium"
            style={{ background: 'var(--brand-primary)' }}
          >
            Book a Session
          </Link>
          <Link
            href="/programs"
            className="rounded-xl px-6 py-3 text-sm border border-white/20 text-white hover:bg-white/10"
          >
            See Programs
          </Link>
        </div>
      </div>
    </section>
  );
}

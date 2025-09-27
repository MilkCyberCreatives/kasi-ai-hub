// src/components/ProgramsTeaser.tsx
'use client';

import Link from 'next/link';

export default function ProgramsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Programs</h2>
          <p className="mt-2 text-white/80 max-w-2xl">
            Learn fast with focused, practical sessions. Build a real workflow in 3 hours.
          </p>
        </div>
        <Link
          href="/programs"
          className="hidden md:inline-flex rounded-xl px-4 py-2 text-sm text-black"
          style={{ background: 'var(--brand-primary)' }}
        >
          View all programs
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="glass rounded-2xl overflow-hidden">
          <img src="/images/programs/foundations.jpg" alt="AI Foundations" className="h-40 w-full object-cover" />
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg">AI Foundations (3 Hours)</h3>
            <p className="mt-2 text-white/80">Prompts, tools, and a working workflow you can use the same day.</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-white/90 font-semibold">R1299</span>
              <Link href="/book" className="text-sm underline underline-offset-4 text-white/90">Book</Link>
            </div>
          </div>
        </article>

        <article className="glass rounded-2xl overflow-hidden">
          <img src="/images/programs/team.jpg" alt="Team Workshop" className="h-40 w-full object-cover" />
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg">Team Workshop (1 Day)</h3>
            <p className="mt-2 text-white/80">On-site or remote workshop tailored to your industry & tools.</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-white/90 font-semibold">Custom</span>
              <Link href="/book" className="text-sm underline underline-offset-4 text-white/90">Enquire</Link>
            </div>
          </div>
        </article>

        <article className="glass rounded-2xl overflow-hidden">
          <img src="/images/programs/clinic.jpg" alt="Monthly AI Clinic" className="h-40 w-full object-cover" />
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg">Monthly AI Clinic</h3>
            <p className="mt-2 text-white/80">Bring your challenge. We’ll solve it live and give you a template.</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-white/90 font-semibold">Free</span>
              <Link href="/community" className="text-sm underline underline-offset-4 text-white/90">Join</Link>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-6 md:hidden">
        <Link
          href="/programs"
          className="inline-flex rounded-xl px-4 py-2 text-sm text-black"
          style={{ background: 'var(--brand-primary)' }}
        >
          View all programs
        </Link>
      </div>
    </section>
  );
}

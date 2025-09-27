'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* Full-bleed background image from /public */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home/hero.jpg')" }}
        aria-hidden="true"
      />
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
        <p className="text-sm md:text-base text-white/80">AI Training South Africa</p>

        <h1 className="mt-2 text-3xl leading-tight md:text-5xl md:leading-[1.15] font-semibold">
          <span className="block">kasi<span className="text-brand-primary">AI</span>hub</span>
          <span className="mt-4 block">
            AI Training South Africa – <span className="text-brand-primary">Learn and Build in 3 Hours</span>
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-white/85 md:text-lg">
          Transform your community business with practical AI tools. Master the technology AND create
          your solutions – all for <strong>R1299</strong>.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/programs"
            className="rounded-xl px-5 py-3 font-medium text-black"
            style={{ background: 'var(--brand-primary)' }}
          >
            Choose Your Training Session
          </Link>

          <Link
            href="/book"
            className="rounded-xl border border-white/20 px-5 py-3 font-medium text-white hover:bg-white/10"
          >
            Start Application
          </Link>
        </div>

        {/* Trust badge (glass) */}
        <div className="mt-8">
          <div className="glass rounded-xl px-5 py-4 text-sm">
            ✅ Trusted by <strong>200+ Gauteng Community Entrepreneurs</strong>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient into page */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[var(--brand-bg)]" />
    </section>
  );
}

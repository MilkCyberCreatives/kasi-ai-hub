import Link from 'next/link';
import Script from 'next/script';
import { PLATFORM_FEATURES } from '@/lib/platform-features';

export const metadata = {
  title: 'Platform',
  description: 'Unified AI automation platform for onboarding, delivery, growth, and measurable outcomes.',
};

export const dynamic = 'force-static';
export const revalidate = 60 * 60;

export default function PlatformPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PLATFORM_FEATURES.map((feature, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://kasiaihub.com${feature.href}`,
      name: feature.title,
    })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Script
        id="ld-platform-features"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <div className="pointer-events-none absolute -top-32 left-[-15%] h-[420px] w-[420px] rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] top-20 h-[380px] w-[380px] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

      <section className="container-x relative z-10 py-16 md:py-20">
        <div className="glass rounded-3xl border border-white/15 p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/90">KasiAI Platform</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
            Fully connected AI workspace for growth, automation, and execution.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">
            Every core workflow is live and linked: onboarding, booking, team operations, CRM automation, and success
            analytics.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/platform/dashboard"
              className="inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-black"
              style={{ background: 'var(--brand-primary)' }}
            >
              Open Dashboard
            </Link>
            <Link
              href="/platform/onboarding"
              className="inline-flex rounded-xl border border-white/20 px-5 py-3 text-sm text-white/90 hover:bg-white/10"
            >
              Start Onboarding
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PLATFORM_FEATURES.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="glass group rounded-2xl border border-white/10 p-6 transition hover:border-emerald-300/40"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Feature {index + 1}</p>
                <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-1 text-xs text-emerald-100">
                  {feature.metricLabel}: {feature.metricValue}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-2 text-sm text-white/75">{feature.summary}</p>
              <span className="mt-5 inline-flex text-sm font-medium text-emerald-200 group-hover:text-white">
                Open module
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

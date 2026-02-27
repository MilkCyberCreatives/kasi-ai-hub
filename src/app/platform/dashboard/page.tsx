'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';
import { PLATFORM_FEATURES } from '@/lib/platform-features';

type DailyMetric = {
  label: string;
  value: number;
  suffix?: string;
};

const START_METRICS: DailyMetric[] = [
  { label: 'Automations Live', value: 12 },
  { label: 'Leads Captured', value: 48 },
  { label: 'Hours Saved', value: 96, suffix: 'h' },
  { label: 'Response SLA', value: 92, suffix: '%' },
];

export default function PlatformDashboardPage() {
  const [metrics, setMetrics] = useState(START_METRICS);
  const [syncing, setSyncing] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string>('Not synced yet');

  const momentum = useMemo(() => {
    const score = Math.round(metrics.reduce((acc, item) => acc + item.value, 0) / metrics.length);
    return Math.min(100, score);
  }, [metrics]);

  async function runSync() {
    setSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 850));
    setMetrics((prev) =>
      prev.map((item, idx) => ({
        ...item,
        value: item.value + (idx === 1 ? 3 : 2),
      }))
    );
    setSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setSyncing(false);
  }

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Dashboard"
        title="Operations command center"
        description="Monitor platform performance, run quick automations, and navigate every workflow from one place."
      />

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="glass rounded-2xl border border-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-white/65">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {metric.value}
              <span className="text-base text-white/70">{metric.suffix || ''}</span>
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <article className="glass rounded-2xl border border-white/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/60">Momentum</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Weekly execution score</h2>
            </div>
            <button
              type="button"
              onClick={runSync}
              disabled={syncing}
              className="rounded-xl px-4 py-2 text-sm font-medium text-black disabled:opacity-70"
              style={{ background: 'var(--brand-primary)' }}
            >
              {syncing ? 'Syncing...' : 'Run Daily Sync'}
            </button>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-emerald-300" style={{ width: `${momentum}%` }} />
          </div>
          <p className="mt-3 text-sm text-white/75">
            Current momentum: <span className="font-semibold text-white">{momentum}%</span>. Last sync: {syncedAt}.
          </p>
        </article>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Quick actions</p>
          <div className="mt-4 grid gap-2">
            {PLATFORM_FEATURES.slice(0, 5).map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
              >
                {feature.title}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

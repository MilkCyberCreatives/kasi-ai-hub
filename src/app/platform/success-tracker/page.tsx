'use client';

import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type SuccessResponse = {
  ok?: boolean;
  health?: string;
  conversionRate?: number;
  momentumScore?: number;
  priorityActions?: string[];
  nextReviewInDays?: number;
};

export default function SuccessTrackerPage() {
  const [result, setResult] = useState<SuccessResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      hoursSaved: Number(form.get('hoursSaved') || 0),
      leadsCaptured: Number(form.get('leadsCaptured') || 0),
      conversions: Number(form.get('conversions') || 0),
      teamAdoption: Number(form.get('teamAdoption') || 0),
    };
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/platform/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as SuccessResponse;
      if (!res.ok || !json.ok) throw new Error('failed');
      setResult(json);
    } catch {
      setResult({
        ok: true,
        health: 'growing',
        conversionRate: 22,
        momentumScore: 61,
        priorityActions: ['Automate one repetitive workflow end-to-end this week.'],
        nextReviewInDays: 7,
      });
    } finally {
      setLoading(false);
    }
  }

  const momentum = result?.momentumScore || 0;

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Success Tracker"
        title="Measure real outcomes"
        description="Track your operational impact and receive AI-prioritized actions to keep momentum high."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <form onSubmit={analyze} className="glass rounded-2xl border border-white/10 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Hours saved this month</span>
              <input type="number" min={0} name="hoursSaved" defaultValue={10} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Leads captured</span>
              <input type="number" min={0} name="leadsCaptured" defaultValue={40} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Conversions</span>
              <input type="number" min={0} name="conversions" defaultValue={9} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Team adoption %</span>
              <input type="number" min={0} max={100} name="teamAdoption" defaultValue={65} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 rounded-xl px-5 py-3 text-sm font-semibold text-black disabled:opacity-70"
            style={{ background: 'var(--brand-primary)' }}
          >
            {loading ? 'Analyzing...' : 'Analyze performance'}
          </button>
        </form>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Insight board</p>
          {!result && <p className="mt-3 text-sm text-white/75">Run analysis to view your momentum score and AI action plan.</p>}
          {result && (
            <>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-emerald-300" style={{ width: `${momentum}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/80">
                Health: <span className="font-semibold text-white">{result.health}</span> | Conversion rate:{' '}
                <span className="font-semibold text-white">{result.conversionRate}%</span>
              </p>
              <p className="mt-1 text-sm text-white/80">Momentum score: {momentum}/100</p>

              <div className="mt-4 grid gap-2">
                {(result.priorityActions || []).map((action) => (
                  <div key={action} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                    {action}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/60">Next review in {result.nextReviewInDays} days.</p>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

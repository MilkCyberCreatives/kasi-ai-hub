'use client';

import Link from 'next/link';
import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type OnboardingResponse = {
  ok?: boolean;
  recommendation?: {
    title?: string;
    summary?: string;
    price?: string;
    path?: string;
    why?: string[];
  };
  firstActions?: string[];
  automationLevel?: string;
};

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OnboardingResponse | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/platform/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as OnboardingResponse;
      if (!res.ok || !json.ok) throw new Error('Onboarding failed');
      setResult(json);
    } catch {
      setResult({
        ok: true,
        recommendation: {
          title: 'AI Foundations (3 Hours)',
          summary: 'Quickstart session to build one workflow that saves time immediately.',
          price: 'R1299',
          path: '/programs',
          why: ['Strong fit for first-time implementation and immediate workflow gains.'],
        },
        firstActions: ['Map your repetitive tasks.', 'Launch one workflow in seven days.', 'Review results weekly.'],
        automationLevel: 'starter',
      });
    } finally {
      setLoading(false);
    }
  }

  const recommendation = result?.recommendation;

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Onboarding"
        title="Smart onboarding quiz"
        description="Answer a few questions and get an AI-matched path with immediate first actions."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/10 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Role</span>
              <select name="role" defaultValue="entrepreneur" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
                <option value="entrepreneur">Entrepreneur</option>
                <option value="team">Team Lead</option>
                <option value="student">Student</option>
                <option value="community">Community Builder</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Primary goal</span>
              <select
                name="primaryGoal"
                defaultValue="content"
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-3"
              >
                <option value="content">Content & marketing</option>
                <option value="customers">Customers & sales</option>
                <option value="operations">Operations & reporting</option>
                <option value="learning">General upskilling</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Timeline</span>
              <select name="timeline" defaultValue="thisweek" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
                <option value="today">Today</option>
                <option value="thisweek">This week</option>
                <option value="thismonth">This month</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Budget</span>
              <select name="budget" defaultValue="under1500" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
                <option value="under1500">Under R1500</option>
                <option value="custom">Custom budget</option>
                <option value="free">Free options</option>
              </select>
            </label>
          </div>
          <label className="mt-4 grid gap-2">
            <span className="text-sm text-white/80">Team size</span>
            <input
              type="number"
              name="teamSize"
              min={1}
              defaultValue={1}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-3"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 rounded-xl px-5 py-3 text-sm font-semibold text-black disabled:opacity-70"
            style={{ background: 'var(--brand-primary)' }}
          >
            {loading ? 'Generating plan...' : 'Generate my AI path'}
          </button>
        </form>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Personalized result</p>
          {!recommendation && (
            <p className="mt-4 text-sm text-white/75">Submit the quiz to receive your recommended path and first action list.</p>
          )}
          {recommendation && (
            <>
              <h2 className="mt-3 text-xl font-semibold text-white">{recommendation.title}</h2>
              <p className="mt-2 text-sm text-white/80">{recommendation.summary}</p>
              <p className="mt-3 text-sm text-emerald-100">Estimated investment: {recommendation.price}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/55">
                Automation level: {result?.automationLevel || 'starter'}
              </p>

              <ul className="mt-4 grid gap-2">
                {(recommendation.why || []).slice(0, 3).map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                    {item}
                  </li>
                ))}
                {(result?.firstActions || []).map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={recommendation.path || '/programs'}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-black"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  Open recommendation
                </Link>
                <Link href="/book" className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10">
                  Continue to booking
                </Link>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

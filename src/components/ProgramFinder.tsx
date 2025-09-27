// src/components/ProgramFinder.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';

type Result = {
  title: string;
  summary: string;
  why: string[];
  path: string;   // recommended page
  price?: string; // optional
  roiNote?: string;
};

export default function ProgramFinder() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  // form state
  const [role, setRole] = useState<'entrepreneur'|'team'|'student'|'community'|'other'|''>('');
  const [goal, setGoal] = useState<'content'|'customers'|'ops'|'learning'|''>('');
  const [time, setTime] = useState<'today'|'thisweek'|'thismonth'|''>('');
  const [budget, setBudget] = useState<'free'|'under1500'|'custom'|''>('');

  const canNext1 = !!role;
  const canNext2 = !!goal;
  const canNext3 = !!time;
  const canNext4 = !!budget;

  async function onSubmit() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, goal, time, budget })
      });

      const data = (await res.json()) as Result;
      setResult(data);

      // OPTIONAL tracking (recommended)
      void track('program_finder_result', {
        role, goal, time, budget,
        title: data?.title, price: data?.price
      });
    } catch {
      // Fallback result (no external keys needed)
      const data: Result = {
        title: 'AI Foundations (3 Hours)',
        summary: 'Quickstart session to build one workflow that saves time immediately.',
        why: [
          'Fast: you said you want results soon.',
          'Practical: we build with your real tasks.',
          'Repeatable: you leave with templates & prompts.'
        ],
        path: '/programs',
        price: 'R1299',
        roiNote: 'Most attendees report saving 3–5 hours in their first week.'
      };
      setResult(data);
      void track('program_finder_result_fallback', { role, goal, time, budget, title: data.title });
    } finally {
      setLoading(false);
      setStep(5);
    }
  }

  // OPTIONAL: track step selections (lightweight)
  function selectAndTrack(setter: (v: any)=>void, field: string, value: string) {
    setter(value);
    void track('program_finder_select', { field, value });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Find your <span className="text-[var(--brand-primary)]">perfect AI session</span>
        </h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Answer 4 quick questions. Get a tailored plan with clear next steps.
        </p>
      </div>

      {/* Card */}
      <div className="glass mt-8 rounded-2xl p-6 md:p-8">
        {/* Steps */}
        {step === 1 && (
          <Step
            title="Who are you mainly learning for?"
            hint="So we can pick the best format."
            options={[
              ['entrepreneur','Entrepreneur / Founder'],
              ['team','Team / Department'],
              ['student','Student / Jobseeker'],
              ['community','Community / NPO'],
              ['other','Other']
            ]}
            value={role}
            onChange={(v) => selectAndTrack(setRole, 'role', v)}
            onNext={() => { setStep(2); void track('program_finder_next', { step: 1 }); }}
            canNext={canNext1}
          />
        )}

        {step === 2 && (
          <Step
            title="What’s your immediate goal?"
            hint="We’ll align the workflow to this goal."
            options={[
              ['content','Content & Marketing'],
              ['customers','Leads & Customer Service'],
              ['ops','Operations & Reports'],
              ['learning','Learn the Fundamentals']
            ]}
            value={goal}
            onChange={(v) => selectAndTrack(setGoal, 'goal', v)}
            onBack={() => setStep(1)}
            onNext={() => { setStep(3); void track('program_finder_next', { step: 2 }); }}
            canNext={canNext2}
          />
        )}

        {step === 3 && (
          <Step
            title="How soon do you need results?"
            hint="We’ll match the time-to-value."
            options={[
              ['today','Today / Within 24h'],
              ['thisweek','This Week'],
              ['thismonth','This Month']
            ]}
            value={time}
            onChange={(v) => selectAndTrack(setTime, 'time', v)}
            onBack={() => setStep(2)}
            onNext={() => { setStep(4); void track('program_finder_next', { step: 3 }); }}
            canNext={canNext3}
          />
        )}

        {step === 4 && (
          <Step
            title="What’s your budget level?"
            hint="There’s always a path—free clinic to custom."
            options={[
              ['free','Free (Clinic)'],
              ['under1500','± R1299'],
              ['custom','Custom (Team / Org)']
            ]}
            value={budget}
            onChange={(v) => selectAndTrack(setBudget, 'budget', v)}
            onBack={() => setStep(3)}
            onNext={onSubmit}
            canNext={canNext4}
            ctaLabel="Get my plan"
            loading={loading}
          />
        )}

        {step === 5 && result && (
          <ResultCard
            res={result}
            onRestart={() => { setStep(1); setResult(null); void track('program_finder_restart', {}); }}
          />
        )}
      </div>
    </section>
  );
}

function Step(props: {
  title: string;
  hint?: string;
  options: [string,string][];
  value: string;
  onChange: (v:string)=>void;
  onBack?: ()=>void;
  onNext?: ()=>void;
  canNext?: boolean;
  ctaLabel?: string;
  loading?: boolean;
}) {
  const { title, hint, options, value, onChange, onBack, onNext, canNext, ctaLabel='Next', loading } = props;
  return (
    <div>
      <h3 className="text-white text-xl font-semibold">{title}</h3>
      {hint && <p className="mt-1 text-white/70">{hint}</p>}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {options.map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={`rounded-xl border px-4 py-3 text-left transition
              ${value === val ? 'border-[var(--brand-primary)] bg-white/10 text-white' : 'border-white/15 text-white/85 hover:bg-white/5'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-white/75 hover:text-white underline underline-offset-4"
              type="button"
            >
              Back
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext || loading}
          className="rounded-xl px-5 py-2 text-black disabled:opacity-50"
          style={{ background: 'var(--brand-primary)' }}
        >
          {loading ? 'Thinking…' : ctaLabel}
        </button>
      </div>
    </div>
  );
}

function ResultCard({ res, onRestart }: { res: Result; onRestart: ()=>void }) {
  return (
    <div>
      <h3 className="text-white text-xl font-semibold">Your recommended path:</h3>
      <div className="mt-4 glass rounded-xl p-5">
        <div className="text-white/80 text-sm">Recommendation</div>
        <div className="mt-1 text-white text-lg font-semibold">{res.title}</div>
        {res.price && <div className="mt-1 text-white/90">Typical price: <strong>{res.price}</strong></div>}
        <p className="mt-3 text-white/85">{res.summary}</p>
        {res.roiNote && <p className="mt-2 text-white/70 italic">{res.roiNote}</p>}
        <ul className="mt-4 list-disc pl-5 text-white/85 space-y-1">
          {res.why.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={res.path}
            className="rounded-xl px-4 py-2 text-black"
            style={{ background: 'var(--brand-primary)' }}
            onClick={() => void track('program_finder_view_details_click', { title: res.title })}
          >
            View details
          </Link>
          <Link
            href="/book"
            className="rounded-xl px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
            onClick={() => void track('program_finder_book_click', { title: res.title })}
          >
            Book a session
          </Link>
          <button onClick={onRestart} className="text-white/75 hover:text-white underline underline-offset-4 text-sm">
            Start over
          </button>
        </div>
      </div>

      {/* Trust nudges */}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="glass rounded-xl p-4 text-white/85 text-sm">🎯 You’ll leave with a working workflow</div>
        <div className="glass rounded-xl p-4 text-white/85 text-sm">🧰 Includes templates & prompt library</div>
        <div className="glass rounded-xl p-4 text-white/85 text-sm">🛡️ Privacy-first guidance for your data</div>
      </div>
    </div>
  );
}

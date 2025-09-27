// src/components/HowItWorks.tsx
'use client';

const STEPS = [
  {
    n: '01',
    title: 'Choose your session',
    text: 'Pick a program (or use the AI Finder) based on your immediate goal.',
  },
  {
    n: '02',
    title: 'Build in the session',
    text: 'We set up a working workflow together with prompts, templates, and checks.',
  },
  {
    n: '03',
    title: 'Launch & iterate',
    text: 'Use it the same day. Get follow-up tips and optional team rollout.',
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">How it works</h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Simple path to results. No heavy theory.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <article key={s.n} className="glass rounded-2xl p-6">
            <div className="text-white/70 text-sm">{s.n}</div>
            <h3 className="mt-2 text-white font-semibold text-lg">{s.title}</h3>
            <p className="mt-1 text-white/80">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

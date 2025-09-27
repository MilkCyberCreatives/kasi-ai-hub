// src/components/HomeFAQ.tsx
'use client';

import { useState } from 'react';

const FAQ = [
  {
    q: 'Do I need a technical background?',
    a: 'No. We teach by example. If you can use email/WhatsApp, you can learn our workflows.',
  },
  {
    q: 'What will I leave with?',
    a: 'A working workflow tailored to your goal, plus templates and a prompt library to reuse.',
  },
  {
    q: 'Which AI tools do you use?',
    a: 'We focus on accessible tools and show free/low-cost options. We also cover data privacy.',
  },
  {
    q: 'Can you train my team?',
    a: 'Yes. Our Team Workshop is designed for small/medium teams with industry-specific examples.',
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">FAQ</h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Quick answers to common questions.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {FAQ.map((item, i) => {
          const isOpen = i === open;
          return (
            <details
              key={i}
              open={isOpen}
              className="glass rounded-2xl p-5"
              onClick={(e) => {
                e.preventDefault(); // make entire card toggle
                setOpen(isOpen ? null : i);
              }}
            >
              <summary className="list-none flex cursor-pointer items-center justify-between">
                <span className="text-white font-semibold">{item.q}</span>
                <span className="text-white/70">{isOpen ? '–' : '+'}</span>
              </summary>
              <p className="mt-3 text-white/80">{item.a}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
}

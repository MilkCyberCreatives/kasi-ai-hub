// src/app/community/page.tsx
'use client';

import { useState } from 'react';
import BreadcrumbHero from '@/components/BreadcrumbHero';

const WHATSAPP = process.env.NEXT_PUBLIC_COMMUNITY_WHATSAPP_URL || '#';
const SLACK = process.env.NEXT_PUBLIC_COMMUNITY_SLACK_URL || '#';

type SubscribeResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
};

export default function CommunityPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setMsg('Signing up...');
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/community/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as SubscribeResponse;
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Failed');
      setStatus('ok');
      setMsg(json.message || "Thanks! You're on the list.");
      e.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMsg(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <main className="min-h-screen">
      <BreadcrumbHero title="Community" subtitle="Learn together. Share wins. Get help fast." currentPage="Community" />

      <section className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <a className="glass rounded-2xl p-5 hover:bg-white/5 transition" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          <h3 className="font-semibold">Join WhatsApp Group</h3>
          <p className="text-white/70 text-sm mt-1">Daily tips, quick help, and event updates.</p>
        </a>
        <a className="glass rounded-2xl p-5 hover:bg-white/5 transition" href={SLACK} target="_blank" rel="noopener noreferrer">
          <h3 className="font-semibold">Join Slack Workspace</h3>
          <p className="text-white/70 text-sm mt-1">Deeper threads, files, and templates.</p>
        </a>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Newsletter</h3>
          <p className="text-white/70 text-sm mt-1">Weekly, no spam. Tactics that worked for African SMEs.</p>
          <form onSubmit={subscribe} className="mt-3 flex gap-2">
            <input name="name" placeholder="Your name" className="bg-white/10 rounded px-3 py-2 w-36" />
            <input name="email" type="email" required placeholder="Email" className="bg-white/10 rounded px-3 py-2 flex-1" />
            <button disabled={status === 'sending'} className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10 disabled:opacity-60">
              {status === 'sending' ? 'Joining...' : 'Join'}
            </button>
          </form>
          {msg && <p className="text-sm mt-2">{msg}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold">Member perks</h3>
          <ul className="list-disc list-inside text-white/80 mt-2">
            <li>Templates and prompt libraries</li>
            <li>Monthly community build sessions (online)</li>
            <li>Early access to seminars and discounts</li>
            <li>Spotlight on your wins (get featured)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}


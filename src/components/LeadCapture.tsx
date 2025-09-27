// src/components/LeadCapture.tsx
'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

export default function LeadCapture() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); // optional
  const [note, setNote] = useState('I want help choosing the right AI program.');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (!started) {
      setStarted(true);
      void track('lead_started', {});
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp, note, source: 'program_finder' })
      });
      setSent(true);

      // OPTIONAL tracking (recommended)
      await track('lead_sent', {
        source: 'program_finder',
        has_whatsapp: Boolean(whatsapp),
        email_domain: email.split('@')[1] || ''
      });
    } catch {
      setSent(true);
      void track('lead_send_error', { source: 'program_finder' });
    } finally {
      setLoading(false);
    }
  }

  const waText = encodeURIComponent(
    `Hi kasiAIhub 👋\n\nMy name is ${name || '(your name)'}.\n${note}\n\nEmail: ${email || '(optional)'}\nWhatsApp: ${whatsapp || '(this number)'}`
  );
  const waHref = `https://wa.me/${(whatsapp || '').replace(/\D/g, '')}?text=${waText}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Send my <span className="text-[var(--brand-primary)]">AI plan</span> & next steps
        </h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Get your recommendation by email or WhatsApp, plus a checklist to start today.
        </p>
      </div>

      <form onSubmit={submit} className="glass mt-8 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm text-white/80 mb-1">Name</label>
            <input
              required
              value={name}
              onChange={(e) => { setName(e.target.value); markStarted(); }}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); markStarted(); }}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              placeholder="you@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80 mb-1">WhatsApp (optional)</label>
            <input
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value); markStarted(); }}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
              placeholder="+27 82 000 0000"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80 mb-1">Note</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => { setNote(e.target.value); markStarted(); }}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-5 py-2 text-black disabled:opacity-50"
            style={{ background: 'var(--brand-primary)' }}
            onClick={() => void track('lead_submit_click', { source: 'program_finder' })}
          >
            {loading ? 'Sending…' : 'Send plan to my email'}
          </button>

        {whatsapp && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
            onClick={() => void track('lead_whatsapp_click', { source: 'program_finder' })}
          >
            Send via WhatsApp
          </a>
        )}

          {sent && <span className="text-white/70 text-sm">✅ Thanks! We’ll be in touch soon.</span>}
        </div>

        <p className="mt-3 text-xs text-white/60">
          By sending, you agree we may contact you about training. We don’t sell your data.
        </p>
      </form>
    </section>
  );
}

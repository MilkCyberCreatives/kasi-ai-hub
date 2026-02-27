// src/components/BookingForm.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Payload = {
  name: string;
  email: string;
  whatsapp?: string;
  sessionType: '3-hour' | 'team-workshop' | 'clinic';
  goal: string;
  location?: string;
  when?: string;
  source?: string;
  utm?: Record<string, string>;
};

type LeadResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
  nextStep?: string;
  priority?: 'high' | 'medium' | 'low';
};

export default function BookingForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const utm = useMemo(() => {
    if (typeof window === 'undefined') return {};
    const p = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'source', 'location', 'event'];
    const out: Record<string, string> = {};
    keys.forEach((key) => {
      const value = p.get(key);
      if (value) out[key] = value;
    });
    return out;
  }, []);

  const [session, setSession] = useState<'3-hour' | 'team-workshop' | 'clinic'>((utm.session as '3-hour' | 'team-workshop' | 'clinic') || '3-hour');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [goal, setGoal] = useState('');
  const [location, setLocation] = useState(utm.location || '');
  const [when, setWhen] = useState('');

  useEffect(() => {
    track('book_page_view', { utm });
  }, [utm]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setMessage(null);

    const payload: Payload = {
      name,
      email,
      whatsapp,
      sessionType: session,
      goal,
      location,
      when,
      source: utm.source || 'book-page',
      utm,
    };

    try {
      const leadRes = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const leadJson = (await leadRes.json().catch(() => ({}))) as LeadResponse;
      if (!leadRes.ok || !leadJson?.ok) throw new Error(leadJson?.error || 'Failed to submit');

      track('book_submit', payload);
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'book_submit', book_payload: payload });
      }
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', { value: session === '3-hour' ? 1299 : 0, currency: 'ZAR' });
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      setStatus('success');
      setMessage(leadJson.message || "Thanks! We've received your request. We'll confirm your time and venue shortly by email/WhatsApp.");
      setName('');
      setEmail('');
      setWhatsapp('');
      setGoal('');
      setLocation('');
      setWhen('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again or WhatsApp us.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 md:p-8">
      <h2 className="text-white font-semibold text-xl">Tell us what you want to build</h2>
      <p className="mt-1 text-white/80 text-sm">We&apos;ll reach out with available times closest to you.</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <label className="rounded-xl border border-white/15 bg-white/5 p-4 cursor-pointer">
          <input type="radio" name="session" className="mr-2 align-middle" checked={session === '3-hour'} onChange={() => setSession('3-hour')} />
          <span className="text-white/90 font-medium">3-Hour Build</span>
          <div className="text-white/70 text-xs">R1299</div>
        </label>
        <label className="rounded-xl border border-white/15 bg-white/5 p-4 cursor-pointer">
          <input
            type="radio"
            name="session"
            className="mr-2 align-middle"
            checked={session === 'team-workshop'}
            onChange={() => setSession('team-workshop')}
          />
          <span className="text-white/90 font-medium">Team Workshop</span>
          <div className="text-white/70 text-xs">Custom</div>
        </label>
        <label className="rounded-xl border border-white/15 bg-white/5 p-4 cursor-pointer">
          <input type="radio" name="session" className="mr-2 align-middle" checked={session === 'clinic'} onChange={() => setSession('clinic')} />
          <span className="text-white/90 font-medium">Monthly Clinic</span>
          <div className="text-white/70 text-xs">Free</div>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="grid gap-3">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
          />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp (optional)"
            className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        <div className="grid gap-3">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white focus:outline-none focus:border-[var(--brand-primary)]"
          >
            <option value="">Preferred location</option>
            {['Johannesburg Central', 'Sandton', 'Pretoria', 'Durban', 'Cape Town', 'Soweto', 'Alexandra', 'Mamelodi', 'Your Community'].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            placeholder="Ideal date/time (or day of week)"
            className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
          />
          <textarea
            required
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What do you want to learn or build? (e.g., batch social posts, automate replies, weekly report)"
            rows={3}
            className="rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-xl px-6 py-3 text-black font-medium disabled:opacity-60"
          style={{ background: 'var(--brand-primary)' }}
        >
          {status === 'submitting' ? 'Sending...' : 'Request Booking'}
        </button>
        <span className="text-xs text-white/60">We typically reply within a few hours.</span>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            status === 'success'
              ? 'border-emerald-400/40 text-emerald-200 bg-emerald-400/10'
              : status === 'error'
                ? 'border-red-400/40 text-red-200 bg-red-400/10'
                : 'border-white/20 text-white/80 bg-white/5'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}

async function track(name: string, data: Record<string, unknown>) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ...data }),
      keepalive: true,
    });
  } catch {
    // ignore
  }
}

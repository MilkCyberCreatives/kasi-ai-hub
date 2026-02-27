'use client';

import Link from 'next/link';
import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type LeadResponse = {
  ok?: boolean;
  recommendation?: { title?: string };
  nextStep?: string;
  message?: string;
};

type PaymentResponse = {
  ok?: boolean;
  reference?: string;
  paymentUrl?: string;
};

export default function BookingPaymentsPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [message, setMessage] = useState('');
  const [paymentLink, setPaymentLink] = useState<string>('');
  const [reference, setReference] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    setStatus('sending');
    setMessage('Submitting booking and preparing payment...');
    setPaymentLink('');
    setReference('');

    try {
      const [leadRes, paymentRes] = await Promise.all([
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
        fetch('/api/platform/payment-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            packageName: payload.sessionType,
            email: payload.email,
            amount: payload.sessionType === 'team-workshop' ? 'custom' : payload.sessionType === 'clinic' ? '0' : '1299',
          }),
        }),
      ]);

      const lead = (await leadRes.json()) as LeadResponse;
      const payment = (await paymentRes.json()) as PaymentResponse;

      if (!leadRes.ok || !lead.ok || !paymentRes.ok || !payment.ok) throw new Error('Booking request failed');

      setMessage(lead.message || lead.nextStep || 'Booking received.');
      setPaymentLink(payment.paymentUrl || '');
      setReference(payment.reference || '');
      setStatus('done');
      e.currentTarget.reset();
    } catch {
      setStatus('done');
      setMessage('Booking submitted. Please use Book a Session for manual follow-up.');
    }
  }

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Booking & Payments"
        title="Unified booking and payment readiness"
        description="Capture lead data, route to automation, and generate a payment-ready checkout reference."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <form onSubmit={onSubmit} className="glass rounded-2xl border border-white/10 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Full name</span>
              <input name="name" required className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Email</span>
              <input type="email" name="email" required className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">WhatsApp</span>
              <input name="whatsapp" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Session type</span>
              <select name="sessionType" defaultValue="3-hour" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
                <option value="3-hour">AI Foundations (R1299)</option>
                <option value="team-workshop">Team Workshop (Custom)</option>
                <option value="clinic">Monthly Clinic (Free)</option>
              </select>
            </label>
          </div>

          <label className="mt-4 grid gap-2">
            <span className="text-sm text-white/80">Main goal</span>
            <textarea
              name="goals"
              rows={3}
              placeholder="What do you want this session to automate first?"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-3"
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-5 rounded-xl px-5 py-3 text-sm font-semibold text-black disabled:opacity-70"
            style={{ background: 'var(--brand-primary)' }}
          >
            {status === 'sending' ? 'Processing...' : 'Submit booking'}
          </button>
        </form>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Flow status</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Booking pipeline</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Lead captured and scored automatically</li>
            <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Recommendation and next step generated</li>
            <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Payment reference created instantly</li>
          </ul>

          {message && <p className="mt-4 text-sm text-emerald-100">{message}</p>}
          {reference && <p className="mt-2 text-xs text-white/70">Reference: {reference}</p>}
          {paymentLink && (
            <a
              href={paymentLink}
              className="mt-4 inline-flex rounded-xl border border-emerald-200/40 bg-emerald-200/10 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-200/20"
            >
              Open payment link
            </a>
          )}

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            Need custom terms? Use <Link href="/book" className="text-white underline underline-offset-2">Book a Session</Link> for manual billing support.
          </div>
        </article>
      </section>
    </main>
  );
}

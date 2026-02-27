// src/app/questionnaire/page.tsx
'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Status = 'idle' | 'sending' | 'ok' | 'error';

type LeadResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
  nextStep?: string;
};

function QuestionnaireForm() {
  const sp = useSearchParams();
  const prefillCourse = sp.get('course') || '';
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const [nextStep, setNextStep] = useState('');
  const statusRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (status !== 'idle') statusRef.current?.focus();
  }, [status]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setMsg('Submitting...');
    setNextStep('');

    const form = new FormData(e.currentTarget);
    const hp = (form.get('website') as string) || '';
    const data = Object.fromEntries(form.entries()) as Record<string, FormDataEntryValue>;

    const payload: Record<string, string> = {
      ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)])),
      source: 'questionnaire',
      course: String(data.course || prefillCourse || ''),
      _honeypot: hp,
    };

    if (!payload.name || !payload.email) {
      setStatus('error');
      setMsg('Please fill in your name and email.');
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const json = (await res.json().catch(() => ({}))) as LeadResponse;
      if (!res.ok || !json.ok) throw new Error(json?.error || 'Failed to submit');

      setStatus('ok');
      setMsg(json.message || 'Thanks! Our team will email/WhatsApp you shortly with a tailored plan.');
      setNextStep(json.nextStep || '');
      e.currentTarget.reset();
    } catch (error) {
      const aborted = error instanceof DOMException && error.name === 'AbortError';
      setStatus('error');
      setMsg(aborted ? 'Network is slow - please try again.' : error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">AI Skills Questionnaire</h1>
      <p className="text-white/70 mt-2">Tell us about your goals. We&apos;ll follow up with a custom plan.</p>

      <p
        ref={statusRef}
        className={`mt-4 text-sm ${status === 'ok' ? 'text-green-300' : status === 'error' ? 'text-red-300' : 'text-white/70'}`}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        {status !== 'idle' ? msg : null}
      </p>
      {nextStep && status === 'ok' && <p className="mt-2 text-sm text-white/70">Next step: {nextStep}</p>}

      <form onSubmit={submit} className="mt-6 grid gap-4">
        <div className="hidden" aria-hidden>
          <label>
            Website
            <input name="website" autoComplete="off" tabIndex={-1} />
          </label>
        </div>

        {prefillCourse ? (
          <div>
            <label className="block text-sm text-white/70 mb-1">Selected course</label>
            <input name="course" defaultValue={prefillCourse} readOnly className="bg-white/10 rounded px-3 py-2 w-full opacity-80" />
          </div>
        ) : (
          <div>
            <label className="block text-sm text-white/70 mb-1">Course (optional)</label>
            <input name="course" placeholder="If you have a course in mind" className="bg-white/10 rounded px-3 py-2 w-full" />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Name*</label>
            <input name="name" required placeholder="Your name" className="bg-white/10 rounded px-3 py-2 w-full" autoComplete="name" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Email*</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="bg-white/10 rounded px-3 py-2 w-full"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">WhatsApp</label>
            <input name="whatsapp" placeholder="+27..." className="bg-white/10 rounded px-3 py-2 w-full" inputMode="tel" autoComplete="tel" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Role</label>
            <input name="role" placeholder="Founder / Manager / Marketer" className="bg-white/10 rounded px-3 py-2 w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Industry</label>
            <input name="industry" placeholder="e.g., Retail, Services" className="bg-white/10 rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Current tools</label>
            <input name="currentTools" placeholder="ChatGPT, Sheets, Zapier..." className="bg-white/10 rounded px-3 py-2 w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Skill level</label>
            <select name="skillLevel" className="bg-white/10 rounded px-3 py-2 w-full" defaultValue="Beginner">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Time per week</label>
            <select name="timePerWeek" className="bg-white/10 rounded px-3 py-2 w-full" defaultValue="2-3 hours">
              <option>1-2 hours</option>
              <option>2-3 hours</option>
              <option>4-6 hours</option>
              <option>8+ hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Learning style</label>
            <select name="learningStyle" className="bg-white/10 rounded px-3 py-2 w-full" defaultValue="Hands-on projects">
              <option>Hands-on projects</option>
              <option>Reading + references</option>
              <option>Video-led</option>
              <option>Group workshops</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Goals with AI</label>
          <textarea name="goals" placeholder="What outcomes do you want?" className="bg-white/10 rounded px-3 py-2 w-full" rows={3} />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Biggest challenges</label>
          <textarea name="challenges" placeholder="Where are you stuck?" className="bg-white/10 rounded px-3 py-2 w-full" rows={3} />
        </div>

        <button disabled={status === 'sending'} className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10 disabled:opacity-60">
          {status === 'sending' ? 'Submitting...' : 'Submit'}
        </button>

        <p className="text-xs text-white/60">Pricing is shared after we review your responses.</p>
      </form>
    </main>
  );
}

function QuestionnaireFallback() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">AI Skills Questionnaire</h1>
      <p className="text-white/70 mt-2">Loading...</p>
    </main>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={<QuestionnaireFallback />}>
      <QuestionnaireForm />
    </Suspense>
  );
}

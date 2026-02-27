'use client';

import Link from 'next/link';
import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type CopilotResponse = {
  ok?: boolean;
  summary?: string;
  automatedBy?: 'llm' | 'rules';
  actions?: Array<{ title: string; detail: string }>;
  prompts?: string[];
  resources?: Array<{ href: string; title: string; snippet?: string; type?: string }>;
};

export default function AICopilotPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CopilotResponse | null>(null);

  async function runCopilot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/platform/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as CopilotResponse;
      if (!res.ok || !json.ok) throw new Error('Copilot failed');
      setResult(json);
    } catch {
      setResult({
        ok: true,
        summary: 'Start with one high-frequency process and automate it fully before scaling.',
        automatedBy: 'rules',
        actions: [
          { title: 'Map Process', detail: 'List every step from input to final output.' },
          { title: 'Build Prompt Stack', detail: 'Create reusable prompts for repeated tasks.' },
          { title: 'Automate Handoffs', detail: 'Route output to your CRM, sheets, or team channel.' },
        ],
        prompts: ['Create a practical workflow for this business objective with clear ownership.'],
        resources: [{ href: '/resources', title: 'Resources Library', type: 'Resource' }],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / AI Copilot"
        title="Copilot for strategy and execution"
        description="Describe your business objective and receive a practical action plan, prompt stack, and relevant resources."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <form onSubmit={runCopilot} className="glass rounded-2xl border border-white/10 p-6">
          <label className="grid gap-2">
            <span className="text-sm text-white/80">Objective</span>
            <textarea
              name="objective"
              rows={4}
              required
              placeholder="Example: automate customer follow-ups after enquiry forms"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-3"
            />
          </label>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Industry</span>
              <input name="industry" placeholder="Retail, Education, Services..." className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Urgency</span>
              <select name="urgency" defaultValue="thisweek" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
                <option value="today">Today</option>
                <option value="thisweek">This week</option>
                <option value="thismonth">This month</option>
              </select>
            </label>
          </div>
          <label className="mt-4 grid gap-2">
            <span className="text-sm text-white/80">Current tools</span>
            <input name="currentTools" placeholder="WhatsApp, Google Sheets, CRM..." className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 rounded-xl px-5 py-3 text-sm font-semibold text-black disabled:opacity-70"
            style={{ background: 'var(--brand-primary)' }}
          >
            {loading ? 'Generating...' : 'Run AI Copilot'}
          </button>
        </form>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Copilot output</p>
          {!result && <p className="mt-3 text-sm text-white/75">Submit an objective to generate your implementation brief.</p>}

          {result && (
            <>
              <p className="mt-3 text-sm text-white/85">{result.summary}</p>
              <p className="mt-2 text-xs text-white/55">Engine: {result.automatedBy === 'llm' ? 'live-ai' : 'smart-rules'}</p>

              <div className="mt-5 grid gap-2">
                {(result.actions || []).map((action) => (
                  <div key={action.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-semibold text-white">{action.title}</p>
                    <p className="mt-1 text-sm text-white/75">{action.detail}</p>
                  </div>
                ))}
              </div>

              {(result.prompts || []).length > 0 && (
                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Prompt pack</p>
                  <ul className="mt-2 space-y-2">
                    {(result.prompts || []).map((prompt) => (
                      <li key={prompt} className="text-sm text-white/75">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(result.resources || []).length > 0 && (
                <div className="mt-5 grid gap-2">
                  {(result.resources || []).slice(0, 3).map((resource) => (
                    <Link
                      key={`${resource.href}-${resource.title}`}
                      href={resource.href}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </article>
      </section>
    </main>
  );
}

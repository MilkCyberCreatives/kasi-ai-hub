'use client';

import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type CopilotResponse = {
  ok?: boolean;
  summary?: string;
  actions?: Array<{ title: string; detail: string }>;
  prompts?: string[];
};

export default function CrmAutomationPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [script, setScript] = useState('');
  const [testStatus, setTestStatus] = useState('');

  async function generateFlow(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const objective = String(form.get('objective') || 'automate follow-up');
    setLoading(true);
    setSummary('');
    setScript('');

    try {
      const res = await fetch('/api/platform/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective,
          industry: form.get('industry'),
          urgency: 'thisweek',
          currentTools: form.get('tools'),
        }),
      });
      const data = (await res.json()) as CopilotResponse;
      if (!res.ok || !data.ok) throw new Error('failed');

      setSummary(data.summary || '');
      const steps = (data.actions || []).map((action) => `- ${action.title}: ${action.detail}`).join('\n');
      const prompts = (data.prompts || []).map((prompt) => `- ${prompt}`).join('\n');
      setScript(`Automation Sequence\n${steps}\n\nWhatsApp Prompt Pack\n${prompts}`);
    } catch {
      setSummary('Use AI lead scoring, trigger WhatsApp responses, and escalate high-intent leads to booking.');
      setScript('- Qualify lead\n- Send WhatsApp reply\n- Book session');
    } finally {
      setLoading(false);
    }
  }

  async function sendTestLead() {
    setTestStatus('Sending test lead...');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'CRM Test Lead',
          email: 'test@example.com',
          whatsapp: '+27710000000',
          goals: 'Automate customer onboarding messages',
          role: 'owner',
          company: 'Demo Co',
        }),
      });
      const data = (await res.json()) as { ok?: boolean; nextStep?: string };
      setTestStatus(data.ok ? `Test complete: ${data.nextStep || 'lead automation working'}` : 'Test failed');
    } catch {
      setTestStatus('Test failed');
    }
  }

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / CRM & WhatsApp"
        title="Lead automation and response flows"
        description="Generate CRM workflows, WhatsApp templates, and test your lead automation in real time."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <form onSubmit={generateFlow} className="glass rounded-2xl border border-white/10 p-6">
          <label className="grid gap-2">
            <span className="text-sm text-white/80">Automation objective</span>
            <textarea
              name="objective"
              rows={3}
              placeholder="Example: auto-reply to enquiries and route qualified leads to booking"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-3"
            />
          </label>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input name="industry" placeholder="Industry" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            <input name="tools" placeholder="Tools (CRM, Sheets, WhatsApp)" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" disabled={loading} className="rounded-xl px-5 py-3 text-sm font-semibold text-black disabled:opacity-70" style={{ background: 'var(--brand-primary)' }}>
              {loading ? 'Generating...' : 'Generate automation flow'}
            </button>
            <button type="button" onClick={sendTestLead} className="rounded-xl border border-white/20 px-4 py-3 text-sm text-white/85 hover:bg-white/10">
              Send test lead
            </button>
          </div>
          {testStatus && <p className="mt-3 text-sm text-white/80">{testStatus}</p>}
        </form>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Automation output</p>
          <p className="mt-3 text-sm text-white/85">{summary || 'Generate a flow to preview your CRM and WhatsApp automation plan.'}</p>
          {script && (
            <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/80">{script}</pre>
          )}
        </article>
      </section>
    </main>
  );
}

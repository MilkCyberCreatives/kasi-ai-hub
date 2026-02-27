'use client';

import { useMemo, useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type DownloadItem = {
  title: string;
  category: 'Playbook' | 'Template' | 'Checklist' | 'Script';
  href: string;
  size: string;
};

const DOWNLOADS: DownloadItem[] = [
  { title: 'AI Launch Checklist', category: 'Checklist', href: '/downloads/ai-launch-checklist.txt', size: '9 KB' },
  { title: 'Weekly Ops Review Template', category: 'Template', href: '/downloads/weekly-ops-review.csv', size: '6 KB' },
  { title: 'Prompt Quality Rubric', category: 'Playbook', href: '/downloads/prompt-quality-rubric.md', size: '7 KB' },
  { title: 'WhatsApp Follow-up Scripts', category: 'Script', href: '/downloads/whatsapp-followup-scripts.txt', size: '8 KB' },
  { title: 'Team Rollout Playbook', category: 'Playbook', href: '/downloads/team-rollout-playbook.md', size: '12 KB' },
  { title: 'Automation QA Checklist', category: 'Checklist', href: '/downloads/automation-qa-checklist.txt', size: '5 KB' },
];

export default function DownloadsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | DownloadItem['category']>('All');

  const filtered = useMemo(() => {
    return DOWNLOADS.filter((item) => {
      const categoryMatch = category === 'All' || item.category === category;
      const queryMatch = !query || item.title.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Download Center"
        title="Ready-to-use assets library"
        description="High-quality templates and playbooks for immediate implementation across your workflows."
      />

      <section className="mt-7 glass rounded-2xl border border-white/10 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 md:max-w-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'All' | DownloadItem['category'])}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-3"
          >
            <option value="All">All categories</option>
            <option value="Playbook">Playbook</option>
            <option value="Template">Template</option>
            <option value="Checklist">Checklist</option>
            <option value="Script">Script</option>
          </select>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {filtered.map((item) => (
            <a
              key={item.href}
              href={item.href}
              download
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-white">{item.title}</h2>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/70">{item.category}</span>
              </div>
              <p className="mt-2 text-xs text-white/55">Size: {item.size}</p>
            </a>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              No assets match your current filter. Try another keyword or category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

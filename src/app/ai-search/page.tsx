// src/app/ai-search/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import BreadcrumbHero from '@/components/BreadcrumbHero';

type Result = {
  title: string;
  href: string;
  snippet?: string;
  type?: 'Resource' | 'Program' | 'Blog';
};

// optional client tracker (uses your /api/track route if present)
async function track(name: string, data: Record<string, any> = {}) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ...data }),
      keepalive: true,
    });
  } catch {
    // ignore in dev
  }
}

export default function AISearchPage() {
  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    track('ai_search_page_view', {});
  }, []);

  async function ask(e?: React.FormEvent) {
    e?.preventDefault();
    const question = q.trim();
    if (!question) return;
    setLoading(true);
    setAnswer(null);
    setResults([]);
    try {
      // Ask your AI stub
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data?.answer || 'Try rephrasing your question.');

      // Quick, local heuristic results (link to your content)
      const lower = question.toLowerCase();
      const r: Result[] = [];

      if (lower.includes('post') || lower.includes('social')) {
        r.push({
          title: 'AI Post Generator – 30 posts in 3 hours',
          href: '/resources#ai-post-generator',
          snippet: 'Batch-create 30 social posts in one afternoon.',
          type: 'Resource',
        });
      }
      if (lower.includes('report')) {
        r.push({
          title: 'Weekly Ops Report – Template',
          href: '/resources#weekly-ops-report-template',
          snippet: 'Turn raw notes into tidy weekly updates.',
          type: 'Resource',
        });
      }
      if (lower.includes('website')) {
        r.push({
          title: 'One-Page Website Outline (SEO-ready)',
          href: '/resources#one-page-website-outline',
          snippet: 'Launch a fast, SEO-ready page quickly.',
          type: 'Resource',
        });
      }
      if (lower.includes('fund') || lower.includes('proposal')) {
        r.push({
          title: 'Funding Research with AI',
          href: '/resources#funding-research-with-ai',
          snippet: 'Find opportunities and draft proposals.',
          type: 'Resource',
        });
      }
      // Always include programs as next steps
      r.push(
        {
          title: 'AI Foundations (3 Hours)',
          href: '/programs',
          snippet: 'Hands-on session to build your first workflow.',
          type: 'Program',
        },
        {
          title: 'Team Workshop (1 Day)',
          href: '/programs',
          snippet: 'Custom team training with playbooks.',
          type: 'Program',
        }
      );

      setResults(r);
      track('ai_search_query', { q: question });
    } catch {
      setAnswer('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function useSuggestion(s: string) {
    setQ(s);
    setTimeout(() => ask(), 0);
  }

  // JSON-LD: Sitelinks SearchBox + Breadcrumbs
  const searchLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://kasiaihub.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kasiaihub.com/ai-search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'AI Search', item: 'https://kasiaihub.com/ai-search' },
    ],
  };

  return (
    <main className="min-h-screen">
      <Script id="ld-searchbox" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchLd) }} />
      <Script id="ld-breadcrumbs-ai" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Shared breadcrumb hero (same background as other pages) */}
      <BreadcrumbHero
        title="AI Search"
        subtitle="Ask a question and get the best guide, template, or program to achieve it."
        currentPage="AI Search"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        {/* Search form */}
        <form onSubmit={ask} className="glass rounded-2xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. ‘create 30 social posts’, ‘weekly report template’, ‘automate replies’"
              className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl px-5 py-3 text-black font-medium disabled:opacity-60"
              style={{ background: 'var(--brand-primary)' }}
            >
              {loading ? 'Thinking…' : 'Ask'}
            </button>
          </div>

          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              'template for weekly report',
              'create 30 social posts fast',
              'draft funding proposal',
              'automate service replies',
              'one-page website outline',
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => useSuggestion(s)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        </form>

        {/* Answer */}
        {answer && (
          <div className="mt-6 glass rounded-2xl p-6">
            <h3 className="text-white font-semibold">Suggested plan</h3>
            <p className="mt-2 text-white/85">{answer}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6 grid gap-4">
            {results.map((r, i) => (
              <a
                key={i}
                href={r.href}
                className="glass rounded-2xl p-4 hover:bg-white/10 transition-colors"
                onClick={() => track('ai_search_click', { q, href: r.href, pos: i })}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{r.title}</div>
                    {r.snippet ? <div className="text-white/75 text-sm mt-1">{r.snippet}</div> : null}
                  </div>
                  {r.type ? (
                    <span className="text-xs text-white/70 border border-white/20 rounded-full px-2 py-0.5">{r.type}</span>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Help strip */}
        <div className="mt-10 glass rounded-2xl p-6 text-center">
          <p className="text-white/80">Not sure where to start?</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <a
              href="/programs"
              className="rounded-xl px-5 py-3 text-black font-medium"
              style={{ background: 'var(--brand-primary)' }}
            >
              See Programs
            </a>
            <a
              href="/book"
              className="rounded-xl px-5 py-3 text-sm border border-white/20 text-white hover:bg-white/10"
            >
              Book a Session
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

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

type SearchResponse = {
  ok?: boolean;
  answer?: string;
  results?: Result[];
  automatedBy?: string;
};

async function track(name: string, data: Record<string, unknown> = {}) {
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

function buildFallbackResults(question: string): Result[] {
  const lower = question.toLowerCase();
  const results: Result[] = [];

  if (lower.includes('post') || lower.includes('social') || lower.includes('content')) {
    results.push({
      title: 'AI in Marketing',
      href: '/blog/ai-in-marketing',
      snippet: 'Practical marketing workflows to accelerate content output.',
      type: 'Blog',
    });
  }
  if (lower.includes('report') || lower.includes('ops') || lower.includes('operations')) {
    results.push({
      title: 'AI in Operations',
      href: '/blog/ai-in-operations',
      snippet: 'Turn recurring reports into repeatable automated workflows.',
      type: 'Blog',
    });
  }
  if (lower.includes('sales') || lower.includes('reply') || lower.includes('customer')) {
    results.push({
      title: 'AI in Sales',
      href: '/blog/ai-in-sales',
      snippet: 'Improve response speed and lead handling with AI.',
      type: 'Blog',
    });
  }

  results.push(
    {
      title: 'Resources Library',
      href: '/resources',
      snippet: 'Curated tools, templates, and practical playbooks.',
      type: 'Resource',
    },
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

  const unique = new Map(results.map((item) => [item.href, item]));
  return Array.from(unique.values()).slice(0, 5);
}

export default function AISearchPage() {
  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [automatedBy, setAutomatedBy] = useState<'llm' | 'rules' | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    void track('ai_search_page_view', {});
  }, []);

  async function ask(e?: React.FormEvent, directQuestion?: string) {
    e?.preventDefault();
    const question = (directQuestion ?? q).trim();
    if (!question) return;

    setLoading(true);
    setAnswer(null);
    setResults([]);
    setAutomatedBy(null);

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = (await res.json()) as SearchResponse;

      if (!res.ok || !data?.ok) throw new Error('AI search failed');

      setAnswer(data.answer || 'Try rephrasing your question.');
      setResults(Array.isArray(data.results) && data.results.length ? data.results : buildFallbackResults(question));
      setAutomatedBy(data.automatedBy === 'llm' ? 'llm' : 'rules');
      void track('ai_search_query', { q: question, automatedBy: data.automatedBy || 'rules' });
    } catch {
      setAnswer('Something went wrong. Please try again.');
      setResults(buildFallbackResults(question));
      setAutomatedBy('rules');
    } finally {
      setLoading(false);
    }
  }

  function applySuggestion(value: string) {
    setQ(value);
    void ask(undefined, value);
  }

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

      <BreadcrumbHero
        title="AI Search"
        subtitle="Ask a question and get the best guide, template, or program to achieve it."
        currentPage="AI Search"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <form onSubmit={ask} className="glass rounded-2xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. create 30 social posts, weekly report template, automate replies"
              className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl px-5 py-3 text-black font-medium disabled:opacity-60"
              style={{ background: 'var(--brand-primary)' }}
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              'template for weekly report',
              'create 30 social posts fast',
              'draft funding proposal',
              'automate service replies',
              'one-page website outline',
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => applySuggestion(suggestion)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        {answer && (
          <div className="mt-6 glass rounded-2xl p-6">
            <h3 className="text-white font-semibold">Suggested plan</h3>
            <p className="mt-2 text-white/85">{answer}</p>
            {automatedBy && <p className="mt-2 text-xs text-white/60">Engine: {automatedBy === 'llm' ? 'live-ai' : 'smart-rules'}</p>}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6 grid gap-4">
            {results.map((item, index) => (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                className="glass rounded-2xl p-4 hover:bg-white/10 transition-colors"
                onClick={() => void track('ai_search_click', { q, href: item.href, pos: index })}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    {item.snippet ? <div className="text-white/75 text-sm mt-1">{item.snippet}</div> : null}
                  </div>
                  {item.type ? (
                    <span className="text-xs text-white/70 border border-white/20 rounded-full px-2 py-0.5">{item.type}</span>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        )}

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
            <a href="/book" className="rounded-xl px-5 py-3 text-sm border border-white/20 text-white hover:bg-white/10">
              Book a Session
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

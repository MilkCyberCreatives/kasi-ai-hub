// src/app/resources/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';

import BreadcrumbHero from '@/components/BreadcrumbHero';
import ResourceCard, { type Resource } from '@/components/ResourceCard';
import ResourceFilters from '@/components/ResourceFilters';

export default function ResourcesPage() {
  const [all, setAll] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('All');
  const [topic, setTopic] = useState('All');
  const [level, setLevel] = useState('All');

  // AI mini-search
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/resources');
        const data = (await res.json()) as Resource[];
        setAll(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return all.filter((r) => {
      const okQ = !ql || r.title.toLowerCase().includes(ql) || r.summary.toLowerCase().includes(ql);
      const okTag = tag === 'All' || r.tag === tag;
      const okTopic = topic === 'All' || r.topic === topic;
      const okLevel = level === 'All' || r.level === level;
      return okQ && okTag && okTopic && okLevel;
    });
  }, [all, q, tag, topic, level]);

  function onReset() {
    setQ('');
    setTag('All');
    setTopic('All');
    setLevel('All');
    setAiAnswer(null);
  }

  async function onAskAI(question: string) {
    if (!question?.trim()) return;
    setAiLoading(true);
    setAiAnswer(null);
    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAiAnswer(data?.answer ?? 'Try rephrasing your question.');
    } catch {
      setAiAnswer('Something went wrong. Please try again.');
    } finally {
      setAiLoading(false);
    }
  }

  // SEO JSON-LD
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kasiaihub.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://kasiaihub.com/resources' },
    ],
  };
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.slice(0, 12).map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://kasiaihub.com${r.href}`,
      name: r.title,
    })),
  };

  return (
    <main className="min-h-screen">
      {/* JSON-LD */}
      <Script id="ld-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      {/* Shared breadcrumb hero (uses the same background for all pages) */}
      <BreadcrumbHero
        title="Resources"
        subtitle="Guides, templates, and checklists to help you learn & ship faster."
        // bgImage omitted on purpose so all pages use the same default image
        currentPage="Resources"
      />

      {/* Page content */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <ResourceFilters
          q={q}
          setQ={setQ}
          tag={tag}
          setTag={setTag}
          topic={topic}
          setTopic={setTopic}
          level={level}
          setLevel={setLevel}
          onReset={onReset}
          onAskAI={onAskAI}
          aiAnswer={aiAnswer}
          aiLoading={aiLoading}
        />

        {loading ? (
          <p className="mt-10 text-white/70 text-center">Loading…</p>
        ) : (
          <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.length ? (
              list.map((r) => <ResourceCard key={r.id} r={r} />)
            ) : (
              <p className="col-span-full text-center text-white/70">No results. Try adjusting filters.</p>
            )}
          </section>
        )}

        {/* Optional: small bottom help link */}
        <div className="mt-10 text-center text-sm text-white/70">
          Can’t find what you need?{' '}
          <Link href="/ai-search" className="underline underline-offset-4 text-white/90">
            Ask our AI Search
          </Link>
          .
        </div>
      </section>
    </main>
  );
}

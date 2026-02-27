'use client'

import { useMemo, useState } from 'react'

type Item = {
  label: string
  url: string
  description: string
  tags: string[]
  category: string
}

export default function ClientGrid({
  items,
}: {
  items: Item[]
}) {
  const [q, setQ] = useState('')
  const [tag, setTag] = useState<string>('all')
  const [cat, setCat] = useState<string>('all')

  const allTags = useMemo(() => {
    const s = new Set<string>()
    items.forEach(i => i.tags?.forEach(t => s.add(t)))
    return Array.from(s).sort()
  }, [items])

  const categories = useMemo(() => {
    const s = new Set<string>()
    items.forEach(i => s.add(i.category))
    return ['all', ...Array.from(s)]
  }, [items])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return items.filter(i => {
      const matchQ =
        !query ||
        i.label.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query) ||
        i.tags.some(t => t.toLowerCase().includes(query))
      const matchTag = tag === 'all' || i.tags.includes(tag)
      const matchCat = cat === 'all' || i.category === cat
      return matchQ && matchTag && matchCat
    })
  }, [items, q, tag, cat])

  return (
    <>
      {/* Controls */}
      <div className="mx-auto max-w-7xl px-4 pt-6 grid gap-3 md:grid-cols-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources…"
          className="bg-white/10 rounded px-3 py-2 md:col-span-2"
          aria-label="Search resources"
        />
        <div className="flex gap-2">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="bg-white/10 rounded px-3 py-2 w-1/2"
            aria-label="Filter by category"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="bg-white/10 rounded px-3 py-2 w-1/2"
            aria-label="Filter by tag"
          >
            <option value="all">all</option>
            {allTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {filtered.map((r) => (
            <a
              key={`${r.category}-${r.label}`}
              href={r.url}
              target={r.url.startsWith('http') ? '_blank' : undefined}
              rel={r.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass rounded-2xl p-5 hover:bg-white/5 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{r.label}</h3>
                  <p className="text-white/70 text-sm mt-1">{r.description}</p>
                </div>
                <span className="text-xs text-white/60 shrink-0">↗</span>
              </div>
              {r.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.slice(0, 6).map((t) => (
                    <span key={t} className="text-xs text-white/70 bg-white/10 rounded px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </a>
          ))}
        </div>
        {!filtered.length && (
          <p className="text-white/70 mt-6">No results. Try a different search or tag.</p>
        )}
      </section>
    </>
  )
}

// src/app/book/page.tsx
'use client'

import { useState } from 'react'
import BreadcrumbHero from '@/components/BreadcrumbHero'

export default function BookPage() {
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle')
  const [msg, setMsg] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = Object.fromEntries(form.entries())

    setStatus('sending'); setMsg('Sending…')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j?.error || 'Failed')
      setStatus('ok'); setMsg('Thanks! We’ll get back to you shortly.')
      e.currentTarget.reset()
    } catch (err: any) {
      setStatus('error'); setMsg(err?.message || 'Something went wrong')
    }
  }

  return (
    <main className="min-h-screen">
      <BreadcrumbHero title="Book a 1:1 Session" subtitle="Tell us where you are and what you want to achieve." currentPage="Book" />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" placeholder="Your name" className="bg-white/10 rounded px-3 py-2" />
            <input name="email" type="email" placeholder="Email" className="bg-white/10 rounded px-3 py-2" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="whatsapp" placeholder="WhatsApp (incl. country code)" className="bg-white/10 rounded px-3 py-2" />
            <input name="company" placeholder="Company (optional)" className="bg-white/10 rounded px-3 py-2" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="role" placeholder="Your role" className="bg-white/10 rounded px-3 py-2" />
            <input name="industry" placeholder="Industry" className="bg-white/10 rounded px-3 py-2" />
          </div>
          <textarea name="goals" rows={3} placeholder="What do you want to achieve with AI?" className="bg-white/10 rounded px-3 py-2" />
          <div className="grid md:grid-cols-3 gap-4">
            <select name="skillLevel" className="bg-white/10 rounded px-3 py-2">
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
            <input name="timePreference" placeholder="Preferred time (e.g., mornings)" className="bg-white/10 rounded px-3 py-2" />
            <input name="currentTools" placeholder="Current tools (optional)" className="bg-white/10 rounded px-3 py-2" />
          </div>
          <textarea name="notes" rows={3} placeholder="Anything else we should know?" className="bg-white/10 rounded px-3 py-2" />
          <button disabled={status==='sending'} className="mt-1 rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10 disabled:opacity-60">
            {status==='sending' ? 'Sending…' : 'Request session'}
          </button>
          {msg && <p className="text-sm mt-2">{msg}</p>}
          <p className="text-xs text-white/60 mt-3">No prices shown here — we’ll tailor a plan first, then share options.</p>
        </form>
      </section>
    </main>
  )
}

'use client';

import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

export default function CertificatesPage() {
  const [name, setName] = useState('');
  const [track, setTrack] = useState('AI Foundations');
  const [certificateId, setCertificateId] = useState('');

  function generateCertificate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const generated = `KASI-${Date.now().toString(36).toUpperCase()}`;
    setCertificateId(generated);
  }

  function downloadCertificate() {
    if (!certificateId) return;
    const lines = [
      'KasiAI Hub Completion Certificate',
      `Recipient: ${name}`,
      `Track: ${track}`,
      `Certificate ID: ${certificateId}`,
      `Issued: ${new Date().toISOString().slice(0, 10)}`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kasi-certificate-${certificateId}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Certificates & Badges"
        title="Generate certificates and badges"
        description="Issue proof-of-completion records with share-ready IDs for your learners and team members."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <form onSubmit={generateCertificate} className="glass rounded-2xl border border-white/10 p-6">
          <label className="grid gap-2">
            <span className="text-sm text-white/80">Recipient name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
          </label>
          <label className="mt-4 grid gap-2">
            <span className="text-sm text-white/80">Track</span>
            <select value={track} onChange={(e) => setTrack(e.target.value)} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
              <option>AI Foundations</option>
              <option>Team Workshop</option>
              <option>Monthly AI Clinic</option>
            </select>
          </label>
          <button type="submit" className="mt-5 rounded-xl px-5 py-3 text-sm font-semibold text-black" style={{ background: 'var(--brand-primary)' }}>
            Generate certificate
          </button>
        </form>

        <article className="glass rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Certificate preview</p>
          {!certificateId && <p className="mt-3 text-sm text-white/75">Generate a certificate to preview and download.</p>}
          {certificateId && (
            <div className="mt-4 rounded-2xl border border-emerald-300/35 bg-gradient-to-br from-emerald-200/10 to-cyan-200/10 p-5">
              <p className="text-sm text-emerald-100">KasiAI Hub</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Certificate of Completion</h2>
              <p className="mt-3 text-sm text-white/80">This certifies that</p>
              <p className="mt-1 text-lg font-semibold text-white">{name}</p>
              <p className="mt-2 text-sm text-white/80">has successfully completed the {track} track.</p>
              <p className="mt-3 text-xs text-white/60">Certificate ID: {certificateId}</p>

              <button
                type="button"
                onClick={downloadCertificate}
                className="mt-4 rounded-xl border border-emerald-200/40 bg-emerald-200/10 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-200/20"
              >
                Download certificate
              </button>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

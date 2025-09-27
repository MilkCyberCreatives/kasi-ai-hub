// src/components/StatsStrip.tsx
'use client';

export default function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold text-white">200+</div>
          <div className="mt-1 text-white/70 text-sm">Community Entrepreneurs trained</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold text-white">3 hrs</div>
          <div className="mt-1 text-white/70 text-sm">Build-time per session</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold text-white">4</div>
          <div className="mt-1 text-white/70 text-sm">Core services offered</div>
        </div>
      </div>
    </section>
  );
}

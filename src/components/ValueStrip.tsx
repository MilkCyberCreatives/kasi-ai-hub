// src/components/ValueStrip.tsx
'use client';

export default function ValueStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Why learn AI with <span className="text-[var(--brand-primary)]">kasiAIhub</span>?
        </h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Practical, fast, and made for real community businesses.
        </p>
      </div>

      {/* Value props */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="glass rounded-2xl p-6">
          <div className="text-white/70 text-sm">01</div>
          <h3 className="mt-2 text-white font-semibold text-lg">Build in 3 Hours</h3>
          <p className="mt-1 text-white/80">
            Short, focused sessions. Leave with a working workflow you can use the same day.
          </p>
        </article>

        <article className="glass rounded-2xl p-6">
          <div className="text-white/70 text-sm">02</div>
          <h3 className="mt-2 text-white font-semibold text-lg">Local & Practical</h3>
          <p className="mt-1 text-white/80">
            Examples from township and SME businesses—marketing, service, operations, reports.
          </p>
        </article>

        <article className="glass rounded-2xl p-6">
          <div className="text-white/70 text-sm">03</div>
          <h3 className="mt-2 text-white font-semibold text-lg">Tools + Templates</h3>
          <p className="mt-1 text-white/80">
            Reusable prompts, checklists, and playbooks—save time every week.
          </p>
        </article>
      </div>

      {/* Trust bar */}
      <div className="mt-12 glass rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/85 text-sm text-center md:text-left">
            ✅ Trusted by <strong>200+ Gauteng Community Entrepreneurs</strong>
          </div>

          {/* Partner logos */}
          <div className="flex items-center justify-center gap-10">
            <img
              src="/images/home/partners/partner-1.png"
              alt="Partner 1"
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
            <img
              src="/images/home/partners/partner-2.png"
              alt="Partner 2"
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
            <img
              src="/images/home/partners/partner-3.png"
              alt="Partner 3"
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

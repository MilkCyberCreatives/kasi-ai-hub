// src/components/ResourceCard.tsx
'use client';

export type Resource = {
  id: string;
  title: string;
  summary: string;
  tag: 'Guide' | 'Template' | 'Checklist';
  topic: 'Marketing' | 'Automation' | 'Websites' | 'Funding' | 'General';
  level: 'Beginner' | 'Intermediate';
  href: string;          // link to blog or downloadable
  image?: string;        // /images/resources/filename.jpg
  updated?: string;      // ISO date
  minutes?: number;      // read/usage time
};

export default function ResourceCard({ r }: { r: Resource }) {
  return (
    <article className="glass rounded-2xl overflow-hidden flex flex-col">
      {r.image ? (
        <img src={r.image} alt={r.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-white/5" />
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="rounded-full border border-white/20 px-2 py-0.5">{r.tag}</span>
          <span>•</span>
          <span>{r.topic}</span>
          {r.minutes ? (
            <>
              <span>•</span>
              <span>{r.minutes} min</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-2 text-white font-semibold">{r.title}</h3>
        <p className="mt-1 text-white/80 text-sm">{r.summary}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-white/60">
          {r.updated && <span>Updated {new Date(r.updated).toLocaleDateString()}</span>}
          <a href={r.href} className="underline underline-offset-4 text-white/90">Open</a>
        </div>
      </div>
    </article>
  );
}

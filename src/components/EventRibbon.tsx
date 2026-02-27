// src/components/EventRibbon.tsx
import Link from 'next/link';

export default function EventRibbon() {
  const e = {
    title: 'Township Entrepreneurs: AI Clinic',
    startsAt: '2025-10-19T10:00:00+02:00',
    location: 'Johannesburg Hub',
    href: '/book',
    cta: 'Join the clinic',
  };

  const dateStr = new Date(e.startsAt).toLocaleString(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div
      className="absolute inset-x-0 z-[70] ribbon-surface"
      // top is driven entirely by --header-h (which we now measure)
      role="region"
      aria-label="Upcoming event"
    >
      <div className="container-x">
        <div className="ribbon-row grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center">
          <div className="hidden lg:block" aria-hidden />
          <div className="flex items-center justify-center gap-3">
            <span
              className="inline-flex items-center gap-2 text-sm text-white/90"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,.55)' }}
            >
              <span aria-hidden>🚀</span>
              <span className="font-semibold truncate max-w-[52vw]" title={e.title}>{e.title}</span>
              <span className="text-white/75 whitespace-nowrap">• {dateStr}</span>
              {e.location ? (
                <span className="text-white/65 truncate max-w-[28vw]" title={e.location}>• {e.location}</span>
              ) : null}
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <Link
              href={e.href}
              className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md px-3 text-xs border border-white/22 bg-white/5 hover:bg-white/10 transition"
              style={{ backdropFilter: 'blur(2px)' }}
              aria-label={`Open event: ${e.title}`}
            >
              {e.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

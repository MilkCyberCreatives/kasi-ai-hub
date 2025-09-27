// src/components/Testimonials.tsx
'use client';

const TESTIMONIALS = [
  {
    name: 'Thandi M.',
    role: 'Community Entrepreneur',
    quote:
      'In one afternoon I set up a content workflow that saves me hours every week.',
    avatar: '/images/home/testimonials/thandi.jpg',
  },
  {
    name: 'Sizwe K.',
    role: 'Cafe Owner',
    quote:
      'We built a simple lead + reply system. Bookings increased the same week.',
    avatar: '/images/home/testimonials/sizwe.jpg',
  },
  {
    name: 'Lerato P.',
    role: 'Events Coordinator',
    quote:
      'Clear, practical, and fun. The templates make it easy to keep improving.',
    avatar: '/images/home/testimonials/lerato.jpg',
  },
  {
    name: 'Neo R.',
    role: 'Freelance Marketer',
    quote:
      'The prompt patterns alone were worth it. I reuse them for every client.',
    avatar: '/images/home/testimonials/neo.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          What our learners say
        </h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">
          Real wins from real community businesses.
        </p>
      </div>

      {/* Marquee wrapper */}
      <div className="relative mt-8 overflow-hidden">
        <div className="track flex gap-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <article
              key={i}
              className="glass min-w-[300px] max-w-sm rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name} avatar`}
                  className="h-10 w-10 rounded-full object-cover brightness-110"
                />
                <div>
                  <div className="text-white/90 font-semibold">{t.name}</div>
                  <div className="text-white/60 text-xs">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 text-white/85">“{t.quote}”</div>
              <div className="mt-3 flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="18" height="18" viewBox="0 0 24 24" className="text-[var(--brand-primary)]">
                    <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </article>
          ))}
        </div>

        <style jsx>{`
          .track {
            width: max-content;
            animation: slide 28s linear infinite;
          }
          .track:hover { animation-play-state: paused; }
          @keyframes slide {
            0% { transform: translateX(0) }
            100% { transform: translateX(-50%) }
          }
          @media (prefers-reduced-motion: reduce) {
            .track { animation: none; }
          }
        `}</style>
      </div>
    </section>
  );
}

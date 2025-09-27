// src/components/TrainingLocations.tsx
'use client';

type Location = {
  title: string;
  subtitle: string;
  emoji?: string;
};

const LOCATIONS: Location[] = [
  { title: 'Johannesburg Central', subtitle: 'Main training facility', emoji: '📍' },
  { title: 'Sandton', subtitle: 'Business district location', emoji: '📍' },
  { title: 'Pretoria', subtitle: 'Capital city training center', emoji: '📍' },
  { title: 'Durban', subtitle: 'KwaZulu-Natal hub', emoji: '📍' },
  { title: 'Cape Town', subtitle: 'Western Cape location', emoji: '📍' },
  { title: 'Soweto', subtitle: 'Community center partnerships', emoji: '📍' },
  { title: 'Mamelodi', subtitle: 'Weekend group sessions', emoji: '📍' },
  { title: 'Alexandra', subtitle: 'Local venue partnerships', emoji: '📍' },
  { title: 'Your Community', subtitle: 'We come to you for groups of 10+', emoji: '🏡' },
];

export default function TrainingLocations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Training Available Across <span className="text-[var(--brand-primary)]">South Africa</span>
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((loc) => (
          <article
            key={loc.title}
            className="glass rounded-2xl p-6 text-center border border-white/10"
          >
            <div className="text-3xl">{loc.emoji ?? '📍'}</div>
            <h3 className="mt-2 text-lg font-semibold text-[var(--brand-primary)]">{loc.title}</h3>
            <p className="mt-1 text-white/80">{loc.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

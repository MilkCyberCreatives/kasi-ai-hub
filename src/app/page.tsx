// src/app/page.tsx
import EventRibbon from '@/components/EventRibbon';
import Hero from '@/components/Hero';

export const dynamic = 'force-static';
export const revalidate = 60 * 60;

export default function Page() {
  return (
    <main className="no-safe-top">
      {/* This wrapper must be relative so the ribbon can sit exactly under the header */}
      <section className="relative">
        <EventRibbon />
        <Hero />
      </section>
    </main>
  );
}

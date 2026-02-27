// src/components/ServiceDetailPage.tsx
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbHero from '@/components/BreadcrumbHero';
import type { Service } from '@/data/services';

type Props = {
  service: Service;
};

export default function ServiceDetailPage({ service }: Props) {
  return (
    <main className="min-h-screen">
      <BreadcrumbHero title={service.title} subtitle={service.blurb} currentPage={service.title} />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <article className="glass overflow-hidden rounded-2xl">
            <Image
              src={service.img}
              alt={service.title}
              width={960}
              height={540}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-56 w-full object-cover md:h-full"
            />
          </article>

          <article className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white">What you will achieve</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-white/85">
              {service.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">What is included</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-white/85">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Next step</h3>
            <p className="mt-3 text-white/80">Book a session and we will tailor this service to your business goals, tools, and timeline.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="rounded-xl px-5 py-2 text-black"
                style={{ background: 'var(--brand-primary)' }}
              >
                Book a Session
              </Link>
              <Link
                href="/programs"
                className="rounded-xl border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
              >
                View Programs
              </Link>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}


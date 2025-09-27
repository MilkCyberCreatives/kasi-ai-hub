// src/components/BreadcrumbHero.tsx
'use client';

import Link from 'next/link';

type Props = {
  title: string;
  subtitle?: string;
  bgImage?: string; // fallback if not provided
  currentPage?: string;
};

export default function BreadcrumbHero({
  title,
  subtitle,
  bgImage = '/images/hero/breadcrumb-bg.jpg',
  currentPage,
}: Props) {
  return (
    <section
      className="relative h-60 md:h-72 flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        )}

        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mt-4">
          <ol className="flex justify-center items-center gap-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li className="text-white/50">/</li>
            <li className="text-white">{currentPage || title}</li>
          </ol>
        </nav>
      </div>
    </section>
  );
}

// src/components/BreadcrumbHero.tsx
'use client';

import Link from 'next/link';

type Props = {
  title: string;
  subtitle?: string;
  bgImage?: string; // defaults to shared image
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
      className="relative flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // add padding top so it never sits under the fixed header
        paddingTop: 'calc(var(--header-h, 64px) + 12px)',
        minHeight: '220px',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-4 w-full">
        <h1 className="text-[clamp(22px,4.8vw,40px)] font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-white/85 text-[clamp(13px,2.6vw,18px)] max-w-3xl mx-auto">{subtitle}</p>
        )}
        <nav aria-label="Breadcrumb" className="mt-3">
          <ol className="flex justify-center items-center gap-2 text-sm text-white/75">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li className="text-white/50">/</li>
            <li className="text-white">{currentPage || title}</li>
          </ol>
        </nav>
      </div>
    </section>
  );
}

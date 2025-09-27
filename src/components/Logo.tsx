// src/components/Logo.tsx
'use client';

import Link from 'next/link';

type Props = {
  className?: string;
};

export default function Logo({ className = '' }: Props) {
  return (
    <Link href="/" aria-label="kasiAIhub home" className={`inline-flex items-center ${className}`}>
      <span
        className="font-bold tracking-tight leading-none text-3xl md:text-4xl"
        style={{ letterSpacing: '-0.02em' }}
      >
        <span className="text-current">kasi</span>
        <span className="text-[var(--brand-primary)]">AI</span>
        <span className="text-current">hub</span>
      </span>
    </Link>
  );
}

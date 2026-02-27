// src/components/Logo.tsx
'use client';

import { useState } from 'react';

type LogoProps = {
  size?: number;
  className?: string;
};

const LOGO_ASPECT_RATIO = 32 / 5.31;

export default function Logo({ size = 30, className = '' }: LogoProps) {
  const [failed, setFailed] = useState(false);
  const width = Math.round(size * LOGO_ASPECT_RATIO);

  if (failed) {
    return (
      <span className={`inline-flex items-center text-lg font-semibold text-white ${className}`}>
        kasi<span className="text-[var(--brand-primary)]">AI</span>hub
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-md bg-black/30 px-1.5 py-1 ${className}`}
      style={{ minWidth: `${width + 12}px` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="KasiAI Hub"
        width={width}
        height={size}
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
        className="block select-none"
        style={{ width: `${width}px`, height: `${size}px`, maxWidth: 'none' }}
      />
    </span>
  );
}

// src/components/Logo.tsx
'use client';

/** Inline SVG — avoids next/image & any icon recursion */
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <div aria-label="KasiAI Hub" style={{ width: size, height: size }} className="shrink-0 select-none">
      <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#43d787" />
            <stop offset="100%" stopColor="#2aa86b" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="64" height="64" rx="14" fill="#0f1722" />
        <path d="M18 17h6v30h-6zM24 33l12-16h7l-12 16 12 14h-7L24 33z" fill="url(#g)" />
        <circle cx="46" cy="19" r="3" fill="#43d787" />
      </svg>
    </div>
  );
}

// src/components/MobileNav.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/nav';

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock page scroll when open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = 'hidden';
    else root.style.overflow = '';
    return () => { root.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        aria-label="Open menu"
        className="md:hidden rounded-lg p-2 hover:bg-white/10 text-white"
        onClick={() => setOpen(true)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* scrim */}
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-xs bg-black/80 border-l border-white/10 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
              <span className="font-bold text-xl text-white">
                <span className="text-white">kasi</span>
                <span className="text-[var(--brand-primary)]">AI</span>
                <span className="text-white">hub</span>
              </span>
              <button
                aria-label="Close"
                className="rounded-lg p-2 text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.41 6.29 6.29-6.3 6.3 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.3 6.3-6.29z" />
                </svg>
              </button>
            </div>

            <nav className="px-3 py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`block rounded-lg px-3 py-3 ${
                          active ? 'text-white font-medium bg-white/10' : 'text-white/90 hover:bg-white/10'
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 grid gap-2 px-3">
                <Link
                  href="/ai-search"
                  className="text-center rounded-lg px-4 py-2 border border-white/20 text-white hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  AI Search
                </Link>
                <Link
                  href="/book"
                  className="text-center rounded-lg px-4 py-2 text-black font-medium"
                  style={{ background: 'var(--brand-primary)' }}
                  onClick={() => setOpen(false)}
                >
                  Book a Session
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

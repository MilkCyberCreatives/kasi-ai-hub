// src/components/MobileNav.tsx
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/nav';

const DRAWER_Z = 9999;

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Mount flag for portal (SSR-safe)
  useEffect(() => setMounted(true), []);

  // Close drawer whenever route changes (ensures consistency across pages)
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock page scroll when drawer is open (preserve original styles to avoid layout jumps)
  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    if (open) {
      // prevent background scroll
      body.style.overflow = 'hidden';

      // avoid content shift when scrollbar disappears
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        body.style.paddingRight = `${scrollBarWidth}px`;
      }

      // focus the close button for accessibility
      closeBtnRef.current?.focus();
    } else {
      body.style.overflow = prevOverflow || '';
      body.style.paddingRight = prevPaddingRight || '';
    }

    return () => {
      body.style.overflow = prevOverflow || '';
      body.style.paddingRight = prevPaddingRight || '';
    };
  }, [open, mounted]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const Drawer = (
    <div
      className="fixed inset-0 md:hidden"
      style={{ zIndex: DRAWER_Z }}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        className="absolute right-0 top-0 h-full w-[86%] max-w-xs bg-[#0a0f1a] border-l border-white/10 shadow-2xl outline-none"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <span className="font-bold text-xl text-white">
            <span className="text-white">kasi</span>
            <span className="text-[var(--brand-primary)]">AI</span>
            <span className="text-white">hub</span>
          </span>
          <button
            ref={closeBtnRef}
            aria-label="Close"
            className="rounded-lg p-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={() => setOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.41 6.29 6.29-6.3 6.3 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.3 6.3-6.29z" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }) => {
              // Mark active for exact + nested paths (e.g. /blog and /blog/slug)
              const active =
                pathname === href ||
                (href !== '/' && pathname?.startsWith(href + '/'));

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-3 transition ${
                      active
                        ? 'text-white font-medium bg-white/10'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="mt-4 grid gap-2 px-3">
            <Link
              href="/ai-search"
              className="text-center rounded-lg px-4 py-2 border border-white/20 text-white hover:bg-white/10 transition"
              onClick={() => setOpen(false)}
            >
              AI Search
            </Link>
            <Link
              href="/book"
              className="text-center rounded-lg px-4 py-2 text-black font-medium transition"
              style={{ background: 'var(--brand-primary)' }}
              onClick={() => setOpen(false)}
            >
              Book a Session
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        aria-label="Open menu"
        className="md:hidden rounded-lg p-2 hover:bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        onClick={() => setOpen(true)}
        style={{ zIndex: DRAWER_Z }} // ensure above headers on all pages
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
      </button>

      {/* Portal for consistent stacking across ALL pages */}
      {mounted && open && createPortal(Drawer, document.body)}
    </>
  );
}

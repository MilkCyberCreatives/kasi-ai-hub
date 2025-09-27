'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/nav';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-lg border border-black/10 px-3 py-2"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-xs bg-white shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="mt-6 space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-black/5">
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 grid gap-3">
              <Link href="/ai-search" className="w-full text-center rounded-lg px-4 py-2 bg-black text-white">
                AI Search
              </Link>
              <Link href="/book" className="w-full text-center rounded-lg px-4 py-2 border border-black/10">
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

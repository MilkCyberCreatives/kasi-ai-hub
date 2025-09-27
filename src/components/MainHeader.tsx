// src/components/MainHeader.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import MobileNav from '@/components/MobileNav';
import ScrollTop from '@/components/ScrollTop';
import { NAV_LINKS } from '@/lib/nav';

export default function MainHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Transparent only on home above the fold
  const overHero = pathname === '/' && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all h-16 ${
          overHero ? 'bg-transparent' : 'glass'
        }`}
        data-agent-track="header"
      >
        {/* expose header height to CSS for breadcrumb spacing */}
        <style>{`:root{--header-h:64px;}`}</style>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    active ? 'font-semibold text-white' : 'text-white/80 hover:text-white'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/ai-search"
              className="rounded-lg px-3 py-2 text-sm border border-white/20 text-white/90 hover:bg-white/10"
              data-agent-hook="open-ai-search"
            >
              AI Search
            </Link>
            <Link
              href="/book"
              className="rounded-lg px-4 py-2 text-sm text-black"
              style={{ background: 'var(--brand-primary)' }}
              data-agent-hook="open-booking"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile hamburger + drawer */}
          <MobileNav />
        </div>
      </header>

      {/* Back-to-top FAB */}
      <ScrollTop />
    </>
  );
}

// src/components/MainHeader.tsx
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

const LINKS = [
  { href: '/', label: 'home' },
  { href: '/programs', label: 'programs' },
  { href: '/events', label: 'events' },
  { href: '/blog', label: 'blog' },
  { href: '/contact', label: 'contact' },
];

export default function MainHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Keep --header-h exactly in sync with the real rendered height
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };

    setVar(); // initial
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('load', setVar);
    window.addEventListener('orientationchange', setVar);
    window.addEventListener('resize', setVar);

    return () => {
      ro.disconnect();
      window.removeEventListener('load', setVar);
      window.removeEventListener('orientationchange', setVar);
      window.removeEventListener('resize', setVar);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overHero = pathname === '/' && !scrolled;
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      ref={headerRef}
      className={[
        'fixed inset-x-0 top-0 z-[80] isolate backdrop-blur-md transition-colors',
        'header-glass',
        overHero ? 'over-hero' : 'is-scrolled',
      ].join(' ')}
      // do not force height here; let it size naturally and we measure it
    >
      <div className="container-x h-full">
        <div className="flex min-h-[84px] items-center justify-between gap-6">
          <Link href="/" aria-label="KasiAI Hub home" className="flex items-center shrink-0">
            <Logo size={44} />
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
            {LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'rounded-md px-3 py-2 text-[15px] leading-none transition',
                    active ? 'font-semibold text-white' : 'text-white/85 hover:text-white',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/ai-search"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 text-sm border border-white/20 text-white/90 hover:bg-white/10"
            >
              AI Search
            </Link>
            <Link
              href="/book"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 text-sm text-black"
              style={{ background: 'var(--brand-primary)' }}
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

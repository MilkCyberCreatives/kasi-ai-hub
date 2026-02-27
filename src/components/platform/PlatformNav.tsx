'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PLATFORM_FEATURES } from '@/lib/platform-features';

const ROOT_ITEM = { href: '/platform', title: 'Overview' };

export default function PlatformNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/platform') return pathname === '/platform';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const items = [ROOT_ITEM, ...PLATFORM_FEATURES.map((feature) => ({ href: feature.href, title: feature.title }))];

  return (
    <nav aria-label="Platform modules" className="relative z-20">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-2">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition',
                active
                  ? 'border-emerald-200/50 bg-emerald-200/15 text-emerald-50'
                  : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white',
              ].join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// src/lib/nav.ts
export type NavLink = { href: string; label: string }

export const NAV_LINKS: NavLink[] = [
  { href: '/',          label: 'Home' },
  { href: '/platform',  label: 'Platform' },
  { href: '/programs',  label: 'Programs' },
  { href: '/courses',   label: 'Courses' },
  { href: '/blog',      label: 'Blog' },
  { href: '/community', label: 'Community' },
  { href: '/events',    label: 'Events' },
  { href: '/podcast',   label: 'Podcast' },
  { href: '/resources', label: 'Resources' }
]

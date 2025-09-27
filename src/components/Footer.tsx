// src/components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-transparent to-black/30">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-4 place-items-center md:place-items-start text-center md:text-left">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <span
                className="font-bold tracking-tight leading-none text-3xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                <span className="text-white">kasi</span>
                <span className="text-[var(--brand-primary)]">AI</span>
                <span className="text-white">hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-white/70 max-w-sm">
              Practical AI training for entrepreneurs, teams, and communities.
            </p>

            {/* Socials */}
            <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
              <a
                href="https://wa.me/message"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-lg p-2 hover:bg-white/10 text-white/80 hover:text-white"
              >
                {/* WhatsApp icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.79 11.79 0 0 0 12.02 0C5.42 0 .06 5.36.06 11.96c0 2.1.54 4.15 1.57 5.97L0 24l6.2-1.6a11.9 11.9 0 0 0 5.82 1.52h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.47-8.48ZM12 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.67.95.98-3.58-.23-.37A9.83 9.83 0 0 1 2.2 12C2.2 6.99 6.99 2.2 12 2.2c2.62 0 5.09 1.02 6.95 2.87A9.73 9.73 0 0 1 21.8 12c0 5.01-4.79 9.8-9.8 9.8Zm5.66-7.35c-.31-.16-1.84-.91-2.13-1.02-.29-.11-.51-.16-.73.16-.21.31-.83 1.02-1.02 1.24-.19.21-.38.24-.69.08-.31-.16-1.32-.49-2.51-1.56-.93-.83-1.56-1.84-1.74-2.16-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.73-1.76-1-2.4-.27-.64-.53-.55-.73-.56-.19-.01-.41-.01-.63-.01-.21 0-.55.08-.83.39-.29.31-1.1 1.07-1.1 2.61 0 1.54 1.13 3.03 1.29 3.24.16.21 2.23 3.4 5.41 4.76.76.33 1.35.52 1.81.67.76.24 1.46.2 2.01.12.61-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37Z"/></svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-lg p-2 hover:bg-white/10 text-white/80 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.06 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.87c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.44h-1.25c-1.23 0-1.62.76-1.62 1.55v1.86h2.76l-.44 2.91h-2.32V22C18.34 21.21 22 17.06 22 12.06Z"/></svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="rounded-lg p-2 hover:bg-white/10 text-white/80 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.37.56A3.02 3.02 0 0 0 .5 6.2 31.65 31.65 0 0 0 0 12a31.65 31.65 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14C4.3 20.5 12 20.5 12 20.5s7.7 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14A31.65 31.65 0 0 0 24 12a31.65 31.65 0 0 0-.5-5.8ZM9.75 15.5V8.5l6.25 3.5-6.25 3.5Z"/></svg>
              </a>
            </div>
          </div>

          {/* Programs & Services */}
          <div>
            <h4 className="text-white/90 font-semibold">Programs & Services</h4>
            <ul className="mt-3 space-y-2 text-white/80">
              <li><Link href="/programs" className="hover:text-white">Programs</Link></li>
              <li><Link href="/ai-websites" className="hover:text-white">Website Development</Link></li>
              <li><Link href="/ai-social-media-marketing-training" className="hover:text-white">Social Media Marketing</Link></li>
              <li><Link href="/ai-business-automation-training" className="hover:text-white">Business Automation</Link></li>
              <li><Link href="/ai-market-research-funding-training" className="hover:text-white">Market Research & Funding</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white/90 font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-white/80">
              <li><Link href="/resources" className="hover:text-white">Guides & Templates</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/ai-search" className="hover:text-white">AI Search</Link></li>
              <li><Link href="/community" className="hover:text-white">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/90 font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-white/80">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/book" className="hover:text-white">Book a Session</Link></li>
              <li><a href="mailto:hello@kasiaihub.com" className="hover:text-white">hello@kasiaihub.com</a></li>
            </ul>
            <p className="mt-3 text-xs text-white/60">South Africa</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} kasiAIhub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <Link href="/privacy" className="hover:text-white/80">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white/80">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

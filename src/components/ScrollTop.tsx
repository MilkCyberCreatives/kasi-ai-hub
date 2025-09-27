// src/components/ScrollTop.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99] glass rounded-full p-3 hover:bg-white/10"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
        <path d="M12 5l7 7-1.41 1.41L13 9.83V20h-2V9.83l-4.59 4.58L5 12l7-7z" />
      </svg>
    </button>
  );
}

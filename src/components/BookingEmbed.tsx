// src/components/BookingEmbed.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';

export default function BookingEmbed({ calUrl }: { calUrl: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Track page view on mount
  useEffect(() => {
    void track('booking_page_view', { calUrl });
  }, [calUrl]);

  // Track when the scheduler iframe finishes loading
  function onLoad() {
    if (!loaded) {
      setLoaded(true);
      void track('booking_iframe_loaded', { calUrl });
    }
  }

  // Optional: listen for postMessage events (Calendly/Cal.com) for deeper analytics later
  useEffect(() => {
    function handler(e: MessageEvent) {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        // These events vary by provider; we just log anything that looks useful.
        if (data?.event?.toString()?.toLowerCase?.().includes('booking')) {
          void track('booking_embed_message', data);
        }
      } catch {
        // ignore unknown messages
      }
    }
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="text-white/70 text-sm">
          {loaded ? '✅ Scheduler loaded' : 'Loading scheduler…'}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-3 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
            onClick={() => void track('booking_open_new_tab_click', { calUrl })}
          >
            Open in new tab
          </a>
          <a
            href="https://wa.me/message"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-3 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
            onClick={() => void track('booking_whatsapp_assist_click', {})}
          >
            Need help? WhatsApp
          </a>
        </div>
      </div>

      <iframe
        ref={iframeRef}
        title="Scheduler"
        src={calUrl}
        className="w-full h-[820px] rounded-xl border-0"
        onLoad={onLoad}
      />
    </div>
  );
}

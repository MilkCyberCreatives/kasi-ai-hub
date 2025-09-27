// src/lib/analytics.ts
export async function track(event: string, payload: Record<string, any> = {}) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload, ts: Date.now() })
    });
  } catch {
    // no-op
  }
}

import { cleanText } from '@/lib/request-security';

type AnyRecord = Record<string, unknown>;

type TrackOptions = {
  event: string;
  properties?: AnyRecord;
  clientId?: string;
  source?: string;
};

async function postJson(url: string, payload: AnyRecord) {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function safeClientId(seed = '') {
  const cleaned = cleanText(seed, 120).replace(/[^a-zA-Z0-9._-]/g, '');
  if (cleaned) return cleaned;
  return `${Date.now()}.${Math.floor(Math.random() * 1000000)}`;
}

export async function trackEvent(options: TrackOptions) {
  const event = cleanText(options.event, 80) || 'unknown_event';
  const properties = options.properties || {};
  const source = cleanText(options.source || 'api', 50);
  const analyticsWebhook = process.env.ANALYTICS_WEBHOOK_URL || '';
  const measurementId = process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  const apiSecret = process.env.GA_API_SECRET || '';
  const clientId = safeClientId(options.clientId || String(properties.ip || ''));

  if (analyticsWebhook) {
    await postJson(analyticsWebhook, {
      event,
      source,
      clientId,
      properties,
      recordedAt: new Date().toISOString(),
    });
  }

  if (measurementId && apiSecret) {
    const gaPayload = {
      client_id: clientId,
      events: [
        {
          name: event.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 40) || 'event',
          params: {
            source,
            ...properties,
          },
        },
      ],
    };

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
      measurementId
    )}&api_secret=${encodeURIComponent(apiSecret)}`;

    await postJson(url, gaPayload);
  }
}

export async function captureApiError(route: string, error: unknown, context: AnyRecord = {}) {
  const message = error instanceof Error ? error.message : String(error);
  const payload = {
    route: cleanText(route, 120),
    message: cleanText(message, 500),
    context,
    recordedAt: new Date().toISOString(),
  };

  const errorWebhook = process.env.ERROR_WEBHOOK_URL || process.env.ADMIN_WEBHOOK_URL || '';
  if (errorWebhook) {
    await postJson(errorWebhook, { type: 'api_error', ...payload });
  }

  await trackEvent({
    event: 'api_error',
    source: 'api',
    properties: payload,
    clientId: String(context.ip || ''),
  });
}

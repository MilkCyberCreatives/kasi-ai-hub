import { NextResponse } from 'next/server';

type RateLimitOptions = {
  key: string;
  maxRequests: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

type GlobalRateState = typeof globalThis & {
  __kasiRateLimiter?: Map<string, Bucket>;
};

const globalRateState = globalThis as GlobalRateState;
const rateBuckets = globalRateState.__kasiRateLimiter ?? new Map<string, Bucket>();
globalRateState.__kasiRateLimiter = rateBuckets;

export function getClientIp(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const realIp = req.headers.get('x-real-ip') || '';
  const candidate = forwarded.split(',')[0]?.trim() || realIp.trim() || 'unknown';
  return candidate.slice(0, 120);
}

export function enforceRateLimit(req: Request, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const ip = getClientIp(req);
  const bucketKey = `${options.key}:${ip}`;
  const existing = rateBuckets.get(bucketKey);

  if (!existing || now >= existing.resetAt) {
    rateBuckets.set(bucketKey, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    };
  }

  if (existing.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, options.maxRequests - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function rateLimitErrorResponse(result: RateLimitResult, message = 'Too many requests. Please try again shortly.') {
  return NextResponse.json(
    {
      ok: false,
      error: message,
    },
    {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'Retry-After': String(result.retryAfterSeconds),
      },
    }
  );
}

export function cleanText(value: unknown, maxLength = 240) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

export function isHttpsUrl(value: string) {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

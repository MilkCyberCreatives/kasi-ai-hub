function isHttpUrl(value: string) {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function fromEnv(value: string | undefined, fallback: string) {
  if (value && isHttpUrl(value)) return value;
  return fallback;
}

export const EXTERNAL_LINKS = {
  whatsapp: fromEnv(process.env.NEXT_PUBLIC_COMMUNITY_WHATSAPP_URL, 'https://wa.me/message'),
  slack: fromEnv(process.env.NEXT_PUBLIC_COMMUNITY_SLACK_URL, 'https://slack.com'),
  facebook: fromEnv(process.env.NEXT_PUBLIC_FACEBOOK_URL, 'https://facebook.com'),
  youtube: fromEnv(process.env.NEXT_PUBLIC_YOUTUBE_URL, 'https://youtube.com'),
};

export function getPaymentCheckoutUrl() {
  const configured = process.env.PAYMENT_CHECKOUT_URL || '';
  return isHttpUrl(configured) ? configured : '';
}

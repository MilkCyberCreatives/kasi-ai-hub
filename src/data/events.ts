// src/data/events.ts
// Keep this file PURE data + pure functions.
// Do NOT import from '@/components' or any UI code here.

export type EventLocation = {
  name: string;
  online?: boolean;
  url?: string;
  address?: string;
  city?: string;
  country?: string;
};

export type EventCTA = {
  label: string;
  url: string;
};

export type EventItem = {
  slug: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: EventLocation;
  image?: string;
  cta?: EventCTA;
};

export const events: EventItem[] = [
  {
    slug: 'ai-for-business-growth-online-seminar',
    name: 'AI for Business Growth (Online Seminar)',
    description: 'Practical seminar on using AI to improve revenue, operations, and customer response.',
    startDate: '2025-10-05T16:00:00+02:00',
    location: {
      name: 'Online (Zoom)',
      online: true,
      url: 'https://kasiaihub.com/book',
    },
    cta: {
      label: 'Reserve your seat',
      url: '/book',
    },
  },
  {
    slug: 'township-entrepreneurs-ai-clinic',
    name: 'Township Entrepreneurs: AI Clinic',
    description: 'Hands-on clinic to apply AI in real township business workflows.',
    startDate: '2025-10-19T10:00:00+02:00',
    location: {
      name: 'Johannesburg Hub',
      online: false,
      address: 'Community Innovation Hub',
      city: 'Johannesburg',
      country: 'ZA',
    },
    cta: {
      label: 'Join the clinic',
      url: '/book',
    },
  },
];

export function getUpcoming(referenceTimeMs = Date.now()): EventItem[] {
  return events
    .filter((event) => Date.parse(event.startDate) >= referenceTimeMs)
    .sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
}

// Backward-compatible alias used by older callers.
export const listUpcoming = getUpcoming;

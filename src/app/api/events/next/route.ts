// src/app/api/events/next/route.ts
import { NextResponse } from 'next/server'
import { getUpcoming } from '@/data/events'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 // 1h

export async function GET() {
  const next = getUpcoming()[0] || null
  return NextResponse.json({ next })
}

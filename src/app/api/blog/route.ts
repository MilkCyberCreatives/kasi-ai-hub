// src/app/api/blog/route.ts
import { NextResponse } from 'next/server'
import { posts } from '@/data/posts'

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json(posts)
}

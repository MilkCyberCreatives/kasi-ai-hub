// src/data/courses.ts
import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { cache } from 'react'

export type CourseItem = {
  slug: string
  title: string
  summary: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | string
  duration?: string
  price?: string
  cover?: string
  lessonsCount?: number
}

const DIR = path.join(process.cwd(), 'content', 'courses')

export function getCourseSlugs(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx?$/i, ''))
}

export function getCourseBySlug(slug: string): { data: Record<string, any>, content: string } | null {
  const file = ['.mdx', '.md'].map(ext => path.join(DIR, `${slug}${ext}`)).find(p => fs.existsSync(p))
  if (!file) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

function listInternal(): CourseItem[] {
  return getCourseSlugs().map(slug => {
    const c = getCourseBySlug(slug)!
    const { title = slug, summary = '', level = '', duration = '', price = '', cover = '' } = c.data as any
    const lessonsCount = (c.data?.lessons && Array.isArray(c.data.lessons)) ? c.data.lessons.length : undefined
    return { slug, title, summary, level, duration, price, cover, lessonsCount }
  })
}

export const listCourses = cache(() => listInternal())
export const courses: CourseItem[] = listCourses()

// src/data/posts.ts
import 'server-only'; // ✅ guarantees this file never enters the client bundle
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';

export type PostItem = {
  slug: string;
  title: string;
  date: string;      // ISO
  excerpt: string;
  cover: string;     // URL path to image
  tags: string[];
  readMins: number;  // estimated reading time in minutes
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const DEFAULT_COVER = '/og/default.jpg';

function wordCount(text: string) {
  return (text || '').trim().split(/\s+/).filter(Boolean).length;
}

function estimateReadMins(content: string) {
  // ~220 words per minute, min 2 mins to keep UI tidy
  const mins = Math.round(wordCount(content) / 220);
  return Math.max(mins || 2, 2);
}

function safeExcerpt(text: string, max = 155) {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max - 1) + '…' : t;
}

/** Read a single post and return its raw MD/MDX content + frontmatter */
export function getPostBySlug(slug: string): { content: string; data: Record<string, any> } {
  const base = path.join(BLOG_DIR, slug.replace(/\.mdx?$/i, ''));
  const mdxPath = `${base}.mdx`;
  const mdPath = `${base}.md`;

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

/** Return available slugs (without extension) */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/i, ''));
}

function getPostsInternal(): PostItem[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  const items = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/i, '');
    const fullPath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    const title = (data.title as string) || slug;
    const date =
      (data.date as string) || new Date(fs.statSync(fullPath).mtime).toISOString();
    const excerpt = (data.excerpt as string) || safeExcerpt(content);
    const cover = (data.cover as string) || DEFAULT_COVER;
    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];

    return {
      slug,
      title,
      date,
      excerpt,
      cover,
      tags,
      readMins: estimateReadMins(content),
    };
  });

  // newest first
  items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return items;
}

/** Memoized list for server usage */
export const listPosts = cache((): PostItem[] => getPostsInternal());

/** Keep this if your pages currently import `posts` directly */
export const posts: PostItem[] = listPosts();

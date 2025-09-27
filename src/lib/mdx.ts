import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  cover?: string;
  canonical?: string;
  slug: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}

export function readPostFile(slug: string) {
  const fp = path.join(BLOG_DIR, `${slug}.mdx`);
  const src = fs.readFileSync(fp, 'utf8');
  const { data, content } = matter(src);
  return { data, content };
}

export async function getPost(slug: string) {
  const { data, content } = readPostFile(slug);
  const { content: MdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
      }
    }
  });
  const meta: PostMeta = {
    title: data.title,
    date: data.date,
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    cover: data.cover ?? '',
    canonical: data.canonical ?? '',
    slug
  };
  return { meta, MdxContent };
}

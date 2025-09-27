// src/components/BlogCard.tsx
'use client';

import Link from 'next/link';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;     // /images/blog/slug.jpg
  author?: string;
  date: string;       // ISO
  tags?: string[];
  readMins?: number;
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass rounded-2xl overflow-hidden flex flex-col">
      {post.cover ? (
        <img src={post.cover} alt={post.title} className="h-44 w-full object-cover" />
      ) : (
        <div className="h-44 w-full bg-white/5" />
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-white/70 flex items-center gap-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          {post.readMins ? (<><span>•</span><span>{post.readMins} min</span></>) : null}
        </div>
        <h3 className="mt-1 text-white font-semibold">{post.title}</h3>
        <p className="mt-1 text-white/80 text-sm">{post.excerpt}</p>

        {post.tags && post.tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span key={t} className="text-xs text-white/70 border border-white/20 rounded-full px-2 py-0.5">{t}</span>
            ))}
          </div>
        ) : null}

        <div className="mt-4">
          <Link href={`/blog/${post.slug}`} className="underline underline-offset-4 text-white/90 text-sm">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}

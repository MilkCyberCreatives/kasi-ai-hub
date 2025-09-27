import { getAllPostSlugs, readPostFile } from './mdx';

export function posts() {
  const slugs = getAllPostSlugs();
  const items = slugs.map(slug => {
    const { data } = readPostFile(slug);
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: (data.excerpt || '') as string,
      cover: (data.cover || '') as string,
      tags: (data.tags || []) as string[]
    };
  });
  return items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

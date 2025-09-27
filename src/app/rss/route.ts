import { NextResponse } from 'next/server';
import { posts } from '@/lib/blog-index';

export async function GET() {
  const items = posts().slice(0, 50);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Kasi AI Hub</title>
  <link>https://kasiaihub.com</link>
  <description>AI training & insights for entrepreneurs</description>
  ${items.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>https://kasiaihub.com/blog/${p.slug}</link>
      <guid>https://kasiaihub.com/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`).join('')}
</channel></rss>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' }});
}

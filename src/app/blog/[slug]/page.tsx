import { getPost } from '@/lib/mdx';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const { meta } = await getPost(params.slug);
  return {
    title: `${meta.title} | Kasi AI Hub`,
    description: meta.excerpt,
    openGraph: {
      title: `${meta.title} | Kasi AI Hub`,
      description: meta.excerpt,
      images: meta.cover ? [{ url: meta.cover, width: 1200, height: 630 }] : []
    },
    alternates: {
      canonical: meta.canonical || `https://kasiaihub.com/blog/${params.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, MdxContent } = await getPost(params.slug);

  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"BlogPosting",
    "headline": meta.title,
    "image": meta.cover,
    "author": { "@type":"Organization","name":"Kasi AI Hub" },
    "datePublished": meta.date,
    "publisher": { "@type":"Organization","name":"Kasi AI Hub","logo":{"@type":"ImageObject","url":"/logo.svg"} },
    "description": meta.excerpt,
    "mainEntityOfPage": `https://kasiaihub.com/blog/${meta.slug}`
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      <p className="text-neutral-500 mt-2">{new Date(meta.date).toLocaleDateString()}</p>

      {meta.cover ? (
        <img src={meta.cover} alt={meta.title} className="w-full rounded-xl mt-6" />
      ) : null}

      <article className="prose prose-invert max-w-none mt-8">
        {/* MDX content */}
        <MdxContent />
      </article>
    </main>
  );
}

export const metadata = {
  title: 'Kasi AI Hub – AI Training South Africa | Practical AI for Entrepreneurs',
  description: 'Practical AI programme for SMEs and teams in South Africa. Learn real tools, prompts and workflows to grow sales and productivity.',
  openGraph: {
    title: 'Kasi AI Hub',
    description: 'Practical AI programme for SMEs and teams in South Africa.',
    url: 'https://kasiaihub.com',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }]
  },
  alternates: { canonical: 'https://kasiaihub.com' }
};

export default function HomePage() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kasi AI Hub",
    "url": "https://kasiaihub.com",
    "logo": "https://kasiaihub.com/logo.svg",
    "sameAs": [
      "https://www.facebook.com/kasiaihub",
      "https://www.instagram.com/kasiaihub",
      "https://www.linkedin.com/company/kasiaihub",
      "https://x.com/kasiaihub",
      "https://www.youtube.com/@kasiaihub",
      "https://www.tiktok.com/@kasiaihub",
      "https://medium.com/@kasiaihub",
      "https://github.com/kasiaihub",
      "https://www.threads.net/@kasiaihub",
      "https://www.pinterest.com/kasiaihub"
    ]
  };

  const local = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kasi AI Hub",
    "image": "https://kasiaihub.com/og/default.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "🔶 Street & Unit",
      "addressLocality": "Johannesburg",
      "addressRegion": "Gauteng",
      "postalCode": "🔶",
      "addressCountry": "ZA"
    },
    "telephone": "🔶 +27-..-...-....",
    "url": "https://kasiaihub.com"
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(local) }} />

      <section className="text-center">
        <h1 className="text-4xl font-extrabold">AI Training for Entrepreneurs in South Africa</h1>
        <p className="mt-4 text-lg text-neutral-400">
          Hands-on workshops and an 8-week programme to turn AI into growth for your business.
        </p>
        <a href="/blog" className="inline-block mt-6 rounded-lg px-5 py-3 bg-white/10 border border-white/15">
          Read the latest AI articles
        </a>
      </section>
    </main>
  );
}

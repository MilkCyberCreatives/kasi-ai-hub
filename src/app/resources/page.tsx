import BreadcrumbHero from '@/components/BreadcrumbHero'
import { resources } from '@/data/resources'
import ClientGrid from './ClientGrid'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24 * 7 // 7 days

export const metadata = {
  title: 'Resources',
  description: 'Curated tools, docs, tutorials, and playbooks to level up your AI skills.',
}

export default function ResourcesPage() {
  // For SEO: simple ItemList JSON-LD of everything
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kasi AI Hub Resources',
    itemListElement: resources.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: r.url.startsWith('http') ? r.url : `https://kasiaihub.com${r.url}`,
      name: r.label
    })),
  }

  // Pass plain JSON to client component
  const items = resources.map(r => ({
    label: r.label,
    url: r.url,
    description: r.description,
    tags: r.tags,
    category: r.category,
  }))

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbHero
        title="Resources"
        subtitle="Curated tools, docs, tutorials, and playbooks to level up your AI skills."
        currentPage="Resources"
      />
      <ClientGrid items={items} />
    </main>
  )
}

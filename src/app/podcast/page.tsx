// src/app/podcast/page.tsx
import Image from 'next/image'
import BreadcrumbHero from '@/components/BreadcrumbHero'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 6 // 6h

type YTItem = {
  id: { videoId: string }
  snippet: { title: string; description: string; thumbnails: { medium: { url: string; width: number; height: number } }; publishedAt: string }
}

async function getVideos(): Promise<YTItem[] | null> {
  const key = process.env.YOUTUBE_API_KEY
  const channel = process.env.YOUTUBE_CHANNEL_ID
  if (!key || !channel) return null

  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('key', key)
  url.searchParams.set('channelId', channel)
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('order', 'date')
  url.searchParams.set('maxResults', '12')
  url.searchParams.set('type', 'video')

  const res = await fetch(url.toString(), { next: { revalidate: 60 * 60 * 6 } })
  if (!res.ok) return null
  const data = await res.json()
  return (data.items as YTItem[]) || null
}

export default async function PodcastPage() {
  const items = await getVideos()

  return (
    <main className="min-h-screen">
      <BreadcrumbHero title="Podcast" subtitle="Latest episodes from our YouTube channel." currentPage="Podcast" />

      {!items ? (
        <section className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-white/80">
            Episodes will appear here once we connect YouTube. In the meantime, visit our channel:
          </p>
          <a className="underline mt-2 inline-block" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            Open YouTube
          </a>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
          {items.map((v) => {
            const id = v.id.videoId
            const t = v.snippet
            return (
              <a
                key={id}
                className="glass rounded-2xl overflow-hidden hover:bg-white/5 transition"
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative h-44">
                  <Image
                    src={t.thumbnails.medium.url}
                    alt={t.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold">{t.title}</h2>
                  <p className="text-xs text-white/60 mt-1">
                    {new Date(t.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            )
          })}
        </section>
      )}
    </main>
  )
}

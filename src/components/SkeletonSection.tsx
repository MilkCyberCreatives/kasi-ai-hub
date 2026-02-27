// src/app/components/SkeletonSection.tsx
export default function SkeletonSection({ title }: { title: string }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="h-6 w-48 bg-white/10 rounded mb-6" aria-hidden />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-28 bg-white/10 rounded" aria-hidden />
        <div className="h-28 bg-white/10 rounded" aria-hidden />
        <div className="h-28 bg-white/10 rounded" aria-hidden />
      </div>
      <span className="sr-only">Loading {title}…</span>
    </section>
  )
}

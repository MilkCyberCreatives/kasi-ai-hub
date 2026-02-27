'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <pre className="whitespace-pre-wrap text-sm bg-black/30 rounded p-3 border border-white/10">
        {error?.message || 'Unknown error'}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-white/10 border border-white/20 px-4 py-2 hover:bg-white/15"
      >
        Retry
      </button>
    </div>
  )
}

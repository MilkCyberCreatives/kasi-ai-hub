'use client'

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <div className="mx-auto max-w-2xl p-6">
          <h1 className="text-xl font-bold mb-2">App Error</h1>
          <pre className="whitespace-pre-wrap text-sm bg-black/30 rounded p-3 border border-white/10">
            {error?.message || 'Unknown error'}
          </pre>
        </div>
      </body>
    </html>
  )
}

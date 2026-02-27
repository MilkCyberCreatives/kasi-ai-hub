'use client'

import Script from 'next/script'

export default function JsonLd({
  id,
  data,
}: {
  id: string
  data: Record<string, any>
}) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      // Stringify once here in the client to avoid server crashes
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

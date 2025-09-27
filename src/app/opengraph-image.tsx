import { ImageResponse } from 'next/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0f19',
          color: 'white',
          fontSize: 64,
          fontWeight: 700
        }}
      >
        kasiAIhub
      </div>
    ),
    { ...size }
  )
}

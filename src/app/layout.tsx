// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import MainHeader from '../components/MainHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://kasiaihub.com'),
  title: { default: 'kasiAIhub – Learn Practical AI', template: '%s | kasiAIhub' },
  description: 'Hands-on AI training for entrepreneurs and teams.',
  openGraph: {
    type: 'website',
    siteName: 'kasiAIhub',
    title: 'kasiAIhub – Learn Practical AI',
    description: 'Hands-on AI training for entrepreneurs and teams.',
    url: 'https://kasiaihub.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kasiAIhub – Learn Practical AI',
    description: 'Hands-on AI training for entrepreneurs and teams.',
  },
  alternates: { canonical: 'https://kasiaihub.com' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <meta name="theme-color" content="#0a0f1a" />
      </head>
      <body>
        <MainHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}

// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import MainHeader from '@/components/MainHeader';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'KasiAI Hub',
  description: 'AI-powered township learning hub',
  metadataBase: new URL('https://kasiaihub.com'),
  icons: { icon: '/icon.svg' }, // uses /app/icon.svg
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#0a0f1a] text-white antialiased`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}

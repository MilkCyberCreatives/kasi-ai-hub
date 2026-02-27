/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    formats: ['image/avif', 'image/webp'] // smaller images by default
  },
  // Drop console logs in production bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/book',
        permanent: false
      },
      {
        source: '/blog/ai-post-generator',
        destination: '/blog/ai-in-marketing',
        permanent: false
      },
      {
        source: '/blog/weekly-ops-report-template',
        destination: '/blog/ai-in-operations',
        permanent: false
      },
      {
        source: '/blog/service-intake-reply-workflow',
        destination: '/blog/ai-in-sales',
        permanent: false
      },
      {
        source: '/blog/one-page-website-outline',
        destination: '/blog/building-workflows',
        permanent: false
      },
      {
        source: '/blog/funding-research-with-ai',
        destination: '/blog/ai-for-smes',
        permanent: false
      }
    ];
  },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false }
};

export default nextConfig;

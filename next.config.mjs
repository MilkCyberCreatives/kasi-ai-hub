/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false }
};

export default nextConfig;

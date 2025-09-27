/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'kasiaihub.com' }
    ]
  }
};
module.exports = nextConfig;

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://kasiaihub.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
  },
  transform: async (config, path) => {
    // defaults
    let changefreq = 'weekly'
    let priority = 0.7

    if (path === '/') { changefreq = 'daily'; priority = 1.0 }
    if (['/blog', '/courses', '/events', '/community', '/resources', '/podcast'].includes(path)) {
      changefreq = 'daily'; priority = 0.9
    }
    if (path.startsWith('/blog/')) { changefreq = 'daily'; priority = 0.8 }
    if (path.startsWith('/courses/')) { changefreq = 'weekly'; priority = 0.8 }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

export default config

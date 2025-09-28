/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kasiaihub.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000
};

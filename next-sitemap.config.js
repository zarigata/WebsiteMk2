/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourdomain.com', // Replace with your production URL
  generateRobotsTxt: true, // Generate robots.txt
  generateIndexSitemap: false, // Set to true if you have many pages
  exclude: ['/server-sitemap.xml'], // Exclude these paths from the sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Add any additional configuration options here
};

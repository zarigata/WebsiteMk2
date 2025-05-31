/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'source.unsplash.com'], // Add your image domains here
  },
  
  // Add trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  
  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://yourusername.github.io/catchy-website',
    CONTACT_EMAIL: 'info@catchy.sa',
    PHONE_NUMBER: '+966 12 345 6789',
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Webpack configuration (optional)
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations here if needed
    return config;
  },
  
  // Enable source maps in production (optional)
  productionBrowserSourceMaps: false,
  
  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

// Configuration for next-sitemap
const withSitemap = require('next-sitemap');
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://yourusername.github.io/catchy-website',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

module.exports = withSitemap(nextConfig)(sitemapConfig);

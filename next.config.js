/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const githubUsername = 'zarigata';
const repository = 'WebsiteMk2'; // Your repository name
const assetPrefix = isProd ? `/${repository}/` : '';
const basePath = isProd ? `/${repository}` : '';

const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Set asset prefix for GitHub Pages
  assetPrefix,
  basePath,
  
  // Configure images for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    path: isProd ? `${basePath}/_next/image` : '/_next/image',
  },
  
  // Add trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  
  // Environment variables
  env: {
    SITE_URL: isProd 
      ? `https://${githubUsername}.github.io/${repository}` 
      : 'http://localhost:3000',
    BASE_PATH: isProd ? `/${repository}` : '',
    CONTACT_EMAIL: 'info@catchy.sa',
    PHONE_NUMBER: '+966 12 345 6789',
  },
  
  // Public runtime configuration (available on both server and client)
  publicRuntimeConfig: {
    basePath: isProd ? `/${repository}` : '',
    siteUrl: isProd 
      ? `https://${githubUsername}.github.io/${repository}` 
      : 'http://localhost:3000',
  },
  
  // Make environment variables available to the browser
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repository}` : '',
    NEXT_PUBLIC_SITE_URL: isProd 
      ? `https://${githubUsername}.github.io/${repository}` 
      : 'http://localhost:3000',
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
  siteUrl: `https://${githubUsername}.github.io/${repository}`,
  generateRobotsTxt: true,
  outDir: 'out',
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `https://${githubUsername}.github.io/${repository}/sitemap.xml`,
      `https://${githubUsername}.github.io/${repository}/server-sitemap.xml`,
    ],
  },
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

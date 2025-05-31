/**
 * Site-wide configuration
 * This file contains all the site-wide configuration variables
 * that are used throughout the application.
 */

// Site information
export const siteConfig = {
  // Basic site info
  name: 'Catchy',
  title: 'Catchy - Creative Marketing Solutions',
  description:
    'Catchy is a leading marketing company based in Saudi Arabia, specializing in creative solutions to help businesses grow their online presence.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://catchy-sa.com',
  defaultLocale: 'en',
  locale: 'en_US',
  author: 'Catchy Team',
  themeColor: '#2C3E50',
  backgroundColor: '#FFFFFF',
  keywords: [
    'marketing',
    'Saudi Arabia',
    'digital marketing',
    'web development',
    'branding',
    'social media',
    'SEO',
    'content creation',
  ],

  // Company information
  company: {
    name: 'Catchy Marketing Co.',
    legalName: 'Catchy Marketing Company',
    address: '123 Business District, Riyadh, Saudi Arabia',
    email: 'info@catchy.sa',
    phone: '+966 12 345 6789',
    vat: '123456789',
    cr: '1012345678',
  },

  // Social media links
  social: {
    twitter: 'https://twitter.com/catchy-sa',
    facebook: 'https://facebook.com/catchy-sa',
    instagram: 'https://instagram.com/catchy-sa',
    linkedin: 'https://linkedin.com/company/catchy-sa',
    youtube: 'https://youtube.com/c/catchy-sa',
    tiktok: 'https://tiktok.com/@catchy-sa',
  },

  // Default OpenGraph configuration
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://catchy-sa.com',
    site_name: 'Catchy',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Catchy - Creative Marketing Solutions',
      },
    ],
  },

  // Default Twitter card configuration
  twitter: {
    handle: '@catchy-sa',
    site: '@catchy-sa',
    cardType: 'summary_large_image',
  },

  // Navigation
  navigation: {
    header: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    footer: [
      {
        name: 'Company',
        links: [
          { name: 'About Us', href: '/about' },
          { name: 'Our Team', href: '/about#team' },
          { name: 'Careers', href: '/careers' },
          { name: 'Contact', href: '/contact' },
        ],
      },
      {
        name: 'Services',
        links: [
          { name: 'Web Development', href: '/services/web-development' },
          { name: 'Digital Marketing', href: '/services/digital-marketing' },
          { name: 'SEO', href: '/services/seo' },
          { name: 'Social Media', href: '/services/social-media' },
        ],
      },
      {
        name: 'Legal',
        links: [
          { name: 'Privacy Policy', href: '/privacy' },
          { name: 'Terms of Service', href: '/terms' },
          { name: 'Cookie Policy', href: '/cookies' },
        ],
      },
    ],
  },

  // Features
  features: {
    darkMode: true,
    newsletter: true,
    blog: true,
    contactForm: true,
    testimonials: true,
    pricing: true,
  },

  // API routes
  api: {
    contact: '/api/contact',
    newsletter: '/api/newsletter',
  },

  // Revalidation time in seconds for ISR (Incremental Static Regeneration)
  revalidate: 60 * 60 * 24, // 24 hours
} as const;

// Export the default config
export default siteConfig;

/**
 * Path utilities for handling GitHub Pages deployment
 * Ensures proper path resolution in both development and production environments
 */

/**
 * Get the base path for the application
 * @returns The base path (e.g., '/repository-name' in production, '' in development)
 */
export const getBasePath = (): string => {
  // Handle client-side and server-side scenarios
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  return process.env.BASE_PATH || '';
};

/**
 * Prefix a path with the base path if needed
 * @param path - The path to prefix
 * @returns The prefixed path
 */
export const withBasePath = (path: string): string => {
  const basePath = getBasePath();
  // Ensure path starts with a slash and doesn't have duplicate slashes
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`.replace(/([^:]\/)\/+/g, '$1');
};

/**
 * Create a Next.js Link component with the correct base path
 * @param href - The href for the link
 * @param as - Optional as prop for dynamic routes
 * @returns An object with href and as props for Next.js Link
 */
export const createLinkProps = (
  href: string,
  as?: string
): { href: string; as?: string } => {
  const basePath = getBasePath();
  
  // Handle external URLs
  if (href.startsWith('http') || href.startsWith('//')) {
    return { href };
  }
  
  // Handle hash links
  if (href.startsWith('#')) {
    return { href };
  }
  
  // Handle dynamic routes
  if (as) {
    return {
      href: withBasePath(href),
      as: withBasePath(as),
    };
  }
  
  return {
    href: withBasePath(href),
  };
};

/**
 * Format a URL for use in the application
 * Handles both internal and external URLs
 */
export const formatUrl = (url: string): string => {
  // Return external URLs as-is
  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('mailto:')) {
    return url;
  }
  
  // Handle hash links
  if (url.startsWith('#')) {
    return url;
  }
  
  // Add base path to internal URLs
  return withBasePath(url);
};

/**
 * Format an image URL for use in the application
 * Handles both local and external images
 */
export const formatImageUrl = (url: string): string => {
  // Return external image URLs as-is
  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) {
    return url;
  }
  
  // Add base path to local image URLs
  return withBasePath(url);
};

/**
 * String utility functions
 * Provides helper functions for working with strings in the application
 */

/**
 * Capitalize the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert a string to title case
 * @param str - The string to convert
 * @returns The string in title case
 */
export const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Convert a string to kebab-case
 * @param str - The string to convert
 * @returns The string in kebab-case
 */
export const toKebabCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Convert a string to camelCase
 * @param str - The string to convert
 * @returns The string in camelCase
 */
export const toCamelCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/[\s-]+/g, '');
};

/**
 * Convert a string to PascalCase
 * @param str - The string to convert
 * @returns The string in PascalCase
 */
export const toPascalCase = (str: string): string => {
  if (!str) return '';
  return (` ${str}`)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

/**
 * Convert a string to snake_case
 * @param str - The string to convert
 * @returns The string in snake_case
 */
export const toSnakeCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};

/**
 * Truncate a string to a specified length and add an ellipsis if needed
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the string
 * @param ellipsis - The ellipsis string to append (default: '...')
 * @returns The truncated string
 */
export const truncate = (
  str: string,
  maxLength: number,
  ellipsis: string = '...'
): string => {
  if (!str || str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}${ellipsis}`;
};

/**
 * Generate a random string of a specified length
 * @param length - The length of the random string
 * @param chars - The characters to use for generation (default: alphanumeric)
 * @returns A random string
 */
export const randomString = (
  length: number = 8,
  chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string => {
  let result = '';
  const charsLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  
  return result;
};

/**
 * Remove HTML tags from a string
 * @param str - The string to remove HTML tags from
 * @returns The string with HTML tags removed
 */
export const stripHtml = (str: string): string => {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '');
};

/**
 * Count the number of words in a string
 * @param str - The string to count words in
 * @returns The number of words in the string
 */
export const countWords = (str: string): number => {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
};

/**
 * Count the number of characters in a string (supports Unicode)
 * @param str - The string to count characters in
 * @returns The number of characters in the string
 */
export const countChars = (str: string): number => {
  if (!str) return 0;
  return [...str].length;
};

/**
 * Generate a slug from a string
 * @param str - The string to convert to a slug
 * @param separator - The separator to use (default: '-')
 * @returns A URL-friendly slug
 */
export const slugify = (str: string, separator: string = '-'): string => {
  if (!str) return '';
  
  return str
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove all non-alphanumeric characters
    .replace(/[\s-]+/g, separator) // replace spaces and hyphens with the separator
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // remove leading/trailing separators
};

/**
 * Check if a string is a valid email address
 * @param email - The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
};

/**
 * Check if a string is a valid URL
 * @param url - The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Mask sensitive information in a string (e.g., credit card numbers, emails)
 * @param str - The string to mask
 * @param options - Masking options
 * @returns The masked string
 */
export const maskSensitive = (
  str: string,
  options: {
    type?: 'email' | 'phone' | 'ssn' | 'credit-card' | 'custom';
    maskChar?: string;
    showFirst?: number;
    showLast?: number;
    customPattern?: RegExp;
  } = {}
): string => {
  if (!str) return '';
  
  const {
    type = 'custom',
    maskChar = '*',
    showFirst = 3,
    showLast = 4,
    customPattern,
  } = options;
  
  let pattern: RegExp;
  
  switch (type) {
    case 'email':
      const [local, domain] = str.split('@');
      if (!domain) return str; // Invalid email format
      const maskedLocal = local ? `${local.substring(0, showFirst)}${maskChar.repeat(3)}` : '';
      const [domainName, ...domainParts] = domain.split('.');
      const maskedDomain = domainName ? `${domainName.substring(0, showFirst)}${maskChar.repeat(3)}` : '';
      return `${maskedLocal}@${maskedDomain}.${domainParts.join('.')}`;
      
    case 'phone':
      pattern = /(\d{3})\d*(\d{4})/;
      return str.replace(pattern, `$1${maskChar.repeat(3)}$2`);
      
    case 'ssn':
      return str.replace(/\d/g, maskChar).replace(/^(\*{3}-\*{2}-)(\*{4})$/, 'XXX-XX-$2');
      
    case 'credit-card':
      return str.replace(/\d(?=\d{4})/g, maskChar);
      
    case 'custom':
    default:
      if (customPattern) {
        return str.replace(customPattern, maskChar);
      }
      if (str.length <= showFirst + showLast) return str;
      return `${str.substring(0, showFirst)}${maskChar.repeat(4)}${str.slice(-showLast)}`;
  }
};

/**
 * Remove diacritics (accents) from a string
 * @param str - The string to remove diacritics from
 * @returns The string with diacritics removed
 */
export const removeDiacritics = (str: string): string => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Generate a hash code from a string
 * @param str - The string to generate a hash from
 * @returns A numeric hash code
 */
export const hashCode = (str: string): number => {
  if (!str) return 0;
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash;
};

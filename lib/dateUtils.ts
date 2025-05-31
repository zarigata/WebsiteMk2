/**
 * Date and time utility functions
 * Provides helper functions for working with dates and times in the application
 */

/**
 * Format a date string or Date object into a localized string
 * @param date - The date to format (string, number, or Date object)
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a date string or Date object into a relative time string (e.g., "2 days ago")
 * @param date - The date to format
 * @returns Relative time string
 */
export function formatRelativeTime(
  date: string | number | Date
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  
  // Find the largest interval that fits
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    
    if (interval >= 1) {
      return interval === 1 
        ? `${interval} ${unit} ago` 
        : `${interval} ${unit}s ago`;
    }
  }
  
  return 'just now';
}

/**
 * Calculate the difference between two dates in the specified unit
 * @param date1 - First date
 * @param date2 - Second date (default: current date)
 * @param unit - Unit of time to return ('days', 'hours', 'minutes', 'seconds', 'milliseconds')
 * @returns The difference between the two dates in the specified unit
 */
export function dateDiff(
  date1: Date | string | number,
  date2: Date | string | number = new Date(),
  unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' = 'milliseconds'
): number {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number' 
    ? new Date(date1) 
    : date1;
    
  const d2 = typeof date2 === 'string' || typeof date2 === 'number'
    ? new Date(date2)
    : date2;
  
  const diffInMs = d2.getTime() - d1.getTime();
  
  switch (unit) {
    case 'days':
      return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    case 'hours':
      return Math.floor(diffInMs / (1000 * 60 * 60));
    case 'minutes':
      return Math.floor(diffInMs / (1000 * 60));
    case 'seconds':
      return Math.floor(diffInMs / 1000);
    case 'milliseconds':
    default:
      return diffInMs;
  }
}

/**
 * Check if a date is today
 * @param date - The date to check
 * @returns Boolean indicating if the date is today
 */
export function isToday(date: Date | string | number): boolean {
  const d = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  const today = new Date();
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 * @param date - The date to check
 * @returns Boolean indicating if the date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const d = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  return d < new Date();
}

/**
 * Check if a date is in the future
 * @param date - The date to check
 * @returns Boolean indicating if the date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  const d = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  return d > new Date();
}

/**
 * Add time to a date
 * @param date - The base date
 * @param amount - The amount of time to add
 * @param unit - The unit of time to add ('days', 'months', 'years', 'hours', 'minutes', 'seconds')
 * @returns A new Date with the time added
 */
export function addTime(
  date: Date | string | number,
  amount: number,
  unit: 'days' | 'months' | 'years' | 'hours' | 'minutes' | 'seconds'
): Date {
  const d = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : new Date(date);
    
  const result = new Date(d);
  
  switch (unit) {
    case 'days':
      result.setDate(result.getDate() + amount);
      break;
    case 'months':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'years':
      result.setFullYear(result.getFullYear() + amount);
      break;
    case 'hours':
      result.setHours(result.getHours() + amount);
      break;
    case 'minutes':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'seconds':
      result.setSeconds(result.getSeconds() + amount);
      break;
  }
  
  return result;
}

/**
 * Format a duration in milliseconds into a human-readable string
 * @param ms - Duration in milliseconds
 * @param includeMs - Whether to include milliseconds in the output
 * @returns Formatted duration string (e.g., "2h 30m 45s")
 */
export function formatDuration(ms: number, includeMs: boolean = false): string {
  if (ms < 0) return '0s';
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  
  const parts: string[] = [];
  
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  
  if (includeMs && ms < 1000) {
    parts.push(`${ms}ms`);
  }
  
  return parts.slice(0, 3).join(' ');
}

/**
 * Get the start of the day for a given date
 * @param date - The date
 * @returns A new Date set to the start of the day (00:00:00.000)
 */
export function startOfDay(date: Date | string | number): Date {
  const d = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : new Date(date);
    
  const result = new Date(d);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of the day for a given date
 * @param date - The date
 * @returns A new Date set to the end of the day (23:59:59.999)
 */
export function endOfDay(date: Date | string | number): Date {
  const d = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : new Date(date);
    
  const result = new Date(d);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Check if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Boolean indicating if the dates are the same day
 */
export function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number' 
    ? new Date(date1) 
    : date1;
    
  const d2 = typeof date2 === 'string' || typeof date2 === 'number'
    ? new Date(date2)
    : date2;
    
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

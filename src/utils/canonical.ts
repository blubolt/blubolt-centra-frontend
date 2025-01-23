/**
 * Utility functions for managing canonical URLs
 */

// Get base URL from environment variable
const getBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Generate canonical URL for a given path
 * @param path - The path segment of the URL (without domain)
 * @returns Full canonical URL
 */
export const getCanonicalUrl = (path: string = ''): string => {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generate alternate URLs for different locales/versions
 * @param path - The path segment of the URL
 * @param locales - Array of locale codes
 * @returns Array of alternate URLs with their locales
 */
export const getAlternateUrls = (path: string = '', locales: string[] = ['en']): Array<{ locale: string; url: string }> => {
  return locales.map(locale => ({
    locale,
    url: getCanonicalUrl(`/${locale}${path}`)
  }));
};

/**
 * Check if current URL is canonical
 * @param currentUrl - Current page URL
 * @param canonicalUrl - Expected canonical URL
 * @returns Boolean indicating if current URL is canonical
 */
export const isCanonicalUrl = (currentUrl: string, canonicalUrl: string): boolean => {
  const normalizedCurrent = currentUrl.toLowerCase().replace(/\/$/, '');
  const normalizedCanonical = canonicalUrl.toLowerCase().replace(/\/$/, '');
  return normalizedCurrent === normalizedCanonical;
};
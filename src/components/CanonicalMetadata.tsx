import { Metadata } from 'next';
import { getCanonicalUrl, getAlternateUrls } from '@/utils/canonical';

interface CanonicalMetadataProps {
  /** Current page path (without domain) */
  path: string;
  /** Page title */
  title: string;
  /** Page description */
  description: string;
  /** Supported locales */
  locales?: string[];
  /** Additional metadata */
  additionalMetadata?: Partial<Metadata>;
}

/**
 * Generate metadata with canonical URL and alternates
 */
export function generateMetadata({
  path,
  title,
  description,
  locales = ['en'],
  additionalMetadata = {}
}: CanonicalMetadataProps): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const alternateUrls = getAlternateUrls(path, locales);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        alternateUrls.map(({ locale, url }) => [locale, url])
      ),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Your Site Name',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    ...additionalMetadata,
  };
}

/**
 * Example usage in a page:
 *
 * export const metadata = generateMetadata({
 *   path: '/about',
 *   title: 'About Us',
 *   description: 'Learn more about our company',
 *   locales: ['en', 'es', 'fr'],
 * });
 */
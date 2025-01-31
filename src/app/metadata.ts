import type { Metadata, Viewport } from "next";
import { generateMetadata } from "@/components/CanonicalMetadata";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = generateMetadata({
  path: '/',
  title: 'Blubolt x Centra',
  description: 'Blubolt Centra accelerator ecommerce platform',
  locales: ['en'],
  additionalMetadata: {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    manifest: '/manifest.json',
    icons: {
      icon: '/favicon.ico'
    },
  },
});

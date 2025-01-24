import React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { generateMetadata } from "@/components/CanonicalMetadata";
import Header from "@/components/layout/Header";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}

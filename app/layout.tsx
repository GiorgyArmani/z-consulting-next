import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Space_Grotesk, Manrope } from 'next/font/google';
import { SITE } from '../lib/site';
import './globals.css';

// Self-hosted, preloaded fonts (replaces the render-blocking Google Fonts
// @import). Exposed as CSS variables consumed throughout globals.css.
const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const textFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-text',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-ES': '/?lang=es',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
    alternateLocale: [SITE.altLocale],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#CB4E22',
  colorScheme: 'light',
};

// Organization / professional-service structured data so search engines can
// identify the studio, its offerings and its social profiles.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: SITE.email,
  slogan: SITE.tagline,
  image: `${SITE.url}/opengraph-image`,
  areaServed: 'Worldwide',
  knowsLanguage: ['en', 'es'],
  sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.github],
  makesOffer: [
    'Web apps',
    'Product design',
    'Design systems',
    'Lending & fintech platforms',
    'Healthcare software',
    'Brand sites',
  ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-dir="d3" className={`${displayFont.variable} ${textFont.variable}`}>
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

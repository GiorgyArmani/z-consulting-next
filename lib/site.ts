/**
 * Central site configuration — single source of truth for SEO-related values.
 * Imported by metadata, sitemap, robots, manifest and JSON-LD.
 */
export const SITE = {
  name: 'Z. Consulting',
  shortName: 'Z. Consulting',
  url: 'https://zconsulting.com',
  email: 'hello@zconsulting.dev',
  locale: 'en_US',
  altLocale: 'es_ES',
  tagline: 'Solutions from the A to the Z',
  description:
    'Z. Consulting is a tailor-made software studio. We design and engineer the exact product each client needs — from healthcare scheduling platforms to lending and fintech systems and brand sites.',
  keywords: [
    'software studio',
    'custom software development',
    'web app development',
    'product design',
    'design systems',
    'lending platform development',
    'fintech software',
    'healthcare software',
    'SaaS MVP development',
    'consulting',
  ],
  // Replace with real handles when available.
  social: {
    linkedin: 'https://www.linkedin.com/company/zconsulting',
    instagram: 'https://www.instagram.com/zconsulting',
    github: 'https://github.com/zconsulting',
  },
} as const;

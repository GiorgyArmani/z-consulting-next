import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site';

// Single-page site: the home route plus its in-page section anchors.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: SITE.url,
          es: `${SITE.url}/?lang=es`,
        },
      },
    },
  ];
}

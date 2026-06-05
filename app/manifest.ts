import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} | ${SITE.tagline}`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F4EFE7',
    theme_color: '#CB4E22',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}

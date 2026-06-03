import { ImageResponse } from 'next/og';
import { SITE } from '../lib/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Render on demand instead of prerendering: avoids a Windows-only next/og
// build-time font-path bug; renders correctly at runtime on Vercel.
export const dynamic = 'force-dynamic';

// Branded social share card (OpenGraph + Twitter). Rendered at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(120% 120% at 80% 10%, #6e2a12 0%, #1A1714 60%)',
          color: '#FCF7EF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 700 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#CB4E22',
              color: '#1A1714',
            }}
          >
            Z.
          </div>
          <span>{SITE.name}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: 900 }}>
            Solutions from the A to the Z.
          </div>
          <div style={{ fontSize: 34, color: 'rgba(252,247,239,0.72)', maxWidth: 880, lineHeight: 1.3 }}>
            Tailor-made software studio — healthcare, lending &amp; fintech, and brand sites, built end to end.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#F7C08A', letterSpacing: '0.04em' }}>
          {SITE.url.replace('https://', '')}
        </div>
      </div>
    ),
    { ...size },
  );
}

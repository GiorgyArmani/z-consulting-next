import { useState } from 'react';
import Image from 'next/image';
import { DATA } from '../data';
import { t } from '../lib/locale';
import CardSwap, { Card } from './CardSwap';
import { Placeholder } from './Placeholder';
import { Arrow } from './Arrow';
import type { Lang } from '../types';

export function Work({ lang }: { lang: Lang }) {
  const D = DATA.work;
  const [filter, setFilter] = useState('all');
  const items = filter === 'all' ? D.items : D.items.filter((it) => it.ind === filter);

  return (
    <section className="section work-section" id="work">
      <div className="wrap work-layout">
        <div className="work-intro">
          <div className="reveal">
            <p className="eyebrow">{t(D.tag, lang)}</p>
            <h2 style={{ marginTop: '18px' }}>{t(D.h2, lang)}</h2>
            <p className="lead" style={{ marginTop: '20px' }}>{t(D.lead, lang)}</p>
          </div>
          <div className="filters reveal" style={{ marginTop: '30px', marginBottom: 0 }}>
            {D.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={filter === f.id ? 'on' : ''}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {t(f, lang)}
              </button>
            ))}
          </div>
        </div>
        <div className="work-stage reveal">
          {/* key forces a clean remount of the swap stack when the filter/lang changes */}
          <CardSwap
            key={filter + lang}
            width={420}
            height={460}
            cardDistance={56}
            verticalDistance={64}
            delay={4200}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
          >
            {items.map((it) => {
              const indLabel = D.filters.find((f) => f.id === it.ind);
              const alt = it.alt ? t(it.alt, lang) : (lang === 'es' ? it.es_t : it.en_t);
              return (
                <Card key={it.en_t}>
                  <div className="swap-thumb">
                    {it.img ? (
                      <Image
                        src={it.img}
                        alt={alt}
                        fill
                        sizes="(max-width: 980px) 90vw, 420px"
                        className="swap-img"
                      />
                    ) : (
                      <Placeholder label={it.ph ?? ''} dark={it.dark} />
                    )}
                  </div>
                  <div className="swap-meta">
                    <div className="top">
                      <span className="ind">{indLabel ? t(indLabel, lang) : ''}</span>
                      <span className="yr">{it.year}</span>
                    </div>
                    <h3>{lang === 'es' ? it.es_t : it.en_t}</h3>
                    <p>{t(it, lang)}</p>
                    {it.url && (
                      <a
                        className="swap-visit"
                        href={it.url}
                        target={it.url.startsWith('#') ? undefined : '_blank'}
                        rel={it.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                      >
                        {lang === 'es' ? 'Visitar sitio' : 'Visit site'} <Arrow />
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}

import { DATA } from '../data';
import { t } from '../lib/locale';
import type { Lang } from '../types';

export function Industries({ lang }: { lang: Lang }) {
  const D = DATA.industries;
  return (
    <section className="section" id="industries">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <p className="eyebrow">{t(D.tag, lang)}</p>
            <h2 style={{ marginTop: '18px' }}>{t(D.h2, lang)}</h2>
          </div>
          <p className="lead">{t(D.lead, lang)}</p>
        </div>
        <div className="ind-grid">
          {D.cards.map((c, i) => (
            <div className="ind-card reveal" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="ico">{c.icon}</span>
              <h3>{lang === 'es' ? c.es_t : c.en_t}</h3>
              <p>{t(c, lang)}</p>
              <div className="tags">
                {c.tags[lang].map((tag, j) => (
                  <span className="tag" key={j}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

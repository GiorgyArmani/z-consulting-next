import { DATA } from '../data';
import { t } from '../lib/locale';
import type { Lang } from '../types';

export function Services({ lang }: { lang: Lang }) {
  const D = DATA.services;
  return (
    <section className="section" id="services" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ marginBottom: '38px' }}>
          <div>
            <p className="eyebrow">{t(D.tag, lang)}</p>
            <h2 style={{ marginTop: '18px' }}>{t(D.h2, lang)}</h2>
          </div>
        </div>
        <div className="caps reveal">
          {D.items[lang].map((c, i) => (
            <span className="cap" key={i}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

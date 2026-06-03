import { DATA } from '../data';
import { t } from '../lib/locale';
import type { Lang } from '../types';

export function Process({ lang }: { lang: Lang }) {
  const D = DATA.process;
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <p className="eyebrow">{t(D.tag, lang)}</p>
            <h2 style={{ marginTop: '18px' }}>{t(D.h2, lang)}</h2>
          </div>
          <p className="lead">{t(D.lead, lang)}</p>
        </div>
        <div className="proc">
          {D.steps.map((s, i) => (
            <div className="proc-step reveal" key={s.n} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="n">{s.n}</span>
              <h3>{lang === 'es' ? s.es_t : s.en_t}</h3>
              <p>{t(s, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

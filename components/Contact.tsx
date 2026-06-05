import { DATA } from '../data';
import { t } from '../lib/locale';
import { Arrow } from './Arrow';
import type { Lang } from '../types';

export function Contact({ lang, onStart }: { lang: Lang; onStart: () => void }) {
  const D = DATA.cta;
  const [a, b, c] = D.h2[lang];
  return (
    <section className="section" id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <span className="glow" aria-hidden="true" />
          <h2>
            {a}
            <span className="acc">{b}</span>
            {c}
          </h2>
          <p>{t(D.p, lang)}</p>
          <div className="cta-row">
            <a className="email" href={`mailto:${D.email}`}>
              {D.email}
            </a>
          </div>
          <div className="cta-row" style={{ marginTop: '22px' }}>
            <button className="btn btn-accent" onClick={onStart}>
              {t(D.btn, lang)} <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

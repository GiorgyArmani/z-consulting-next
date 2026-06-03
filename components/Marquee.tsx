import { DATA } from '../data';
import { t } from '../lib/locale';
import type { Lang } from '../types';

export function Marquee({ lang }: { lang: Lang }) {
  const row = [...DATA.marquee, ...DATA.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((it, i) => (
          <span className="item" key={i}>
            <span className="d" />
            {t(it, lang)}
          </span>
        ))}
      </div>
    </div>
  );
}

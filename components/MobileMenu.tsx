import { DATA } from '../data';
import { t } from '../lib/locale';
import type { Lang } from '../types';

export function MobileMenu({
  lang,
  open,
  onClose,
}: {
  lang: Lang;
  open: boolean;
  onClose: () => void;
}) {
  const D = DATA.nav;
  return (
    <div className={`mobile-menu${open ? ' open' : ''}`}>
      <button className="close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      {D.links.map((l) => (
        <a key={l.id} href={`#${l.id}`} onClick={onClose}>
          {t(l, lang)}
        </a>
      ))}
      <a href="#contact" onClick={onClose}>
        {t(D.cta, lang)}
      </a>
    </div>
  );
}

import { DATA } from '../data';
import { t } from '../lib/locale';
import type { Lang } from '../types';

export function MobileMenu({
  lang,
  open,
  onClose,
  onStart,
}: {
  lang: Lang;
  open: boolean;
  onClose: () => void;
  onStart: () => void;
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
      <button
        className="mm-cta"
        onClick={() => {
          onClose();
          onStart();
        }}
      >
        {t(D.cta, lang)}
      </button>
    </div>
  );
}

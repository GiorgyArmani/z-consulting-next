import { DATA } from '../data';
import { t } from '../lib/locale';
import { useTheme } from '../theme';
import FlowingMenu from './FlowingMenu';
import type { Lang } from '../types';

export function Footer({ lang }: { lang: Lang }) {
  const D = DATA.footer;
  const nav = DATA.nav;
  const { theme } = useTheme();

  const items = [
    ...nav.links.map((l) => ({ text: t(l, lang), link: `#${l.id}` })),
    { text: lang === 'es' ? 'Contacto' : 'Contact', link: '#contact' },
  ];

  return (
    <footer className="footer-dark" id="menu">
      <div className="wrap flow-head">
        <p className="eyebrow" style={{ color: theme.accent }}>
          {lang === 'es' ? 'Explora' : 'Explore'}
        </p>
        <span className="flow-note">{lang === 'es' ? 'Pasa el cursor' : 'Hover to explore'}</span>
      </div>
      <FlowingMenu items={items} speed={16} accent={theme.accent} />
      <div className="wrap footer-bottom-dark">
        <div className="fb-brand">
          <a className="brand" href="#top">
            <span className="mark">Z.</span>
            <span>Consulting</span>
          </a>
          <p>{t(D.tagline, lang)}</p>
        </div>
        <div className="fb-meta">
          <a href={`mailto:${DATA.cta.email}`}>{DATA.cta.email}</a>
          <span>{t(D.rights, lang)}</span>
        </div>
      </div>
    </footer>
  );
}

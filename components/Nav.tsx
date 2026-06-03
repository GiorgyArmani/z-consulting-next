import { useEffect, useState } from 'react';
import { DATA } from '../data';
import { t } from '../lib/locale';
import { Brand } from './Brand';
import { Arrow } from './Arrow';
import type { Lang } from '../types';

export function Nav({
  lang,
  setLang,
  onMenu,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onMenu: () => void;
}) {
  const D = DATA.nav;
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('top');
      const threshold = hero ? hero.offsetHeight - 90 : window.innerHeight * 0.8;
      setPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={`nav ${pastHero ? 'solid' : 'on-hero'}`}>
      <div className="nav-pill">
        <Brand />
        <nav className="nav-links">
          {D.links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {t(l, lang)}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
          </div>
          <a className="btn btn-primary" href="#contact">
            {t(D.cta, lang)} <Arrow />
          </a>
          <button className="menu-btn" aria-label="Menu" onClick={onMenu}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

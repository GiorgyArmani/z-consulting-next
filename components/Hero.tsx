import { useMemo } from 'react';
import { DATA } from '../data';
import { t } from '../lib/locale';
import { useTheme } from '../theme';
import { Arrow } from './Arrow';
import { Typewriter } from './Typewriter';
import Lightfall from './Lightfall';
import type { Lang } from '../types';

export function Hero({ lang }: { lang: Lang }) {
  const D = DATA.hero;
  const { theme } = useTheme();
  const colors = useMemo(
    () => [theme.accent, '#F7C08A', '#FFE7C7', '#E8843E'],
    [theme.accent],
  );

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        {theme.heroFx && (
          <Lightfall
            colors={colors}
            backgroundColor="#6e2a12"
            speed={0.5}
            streakCount={3}
            streakWidth={1.1}
            streakLength={1.15}
            glow={1.05}
            density={0.72}
            twinkle={1}
            zoom={2.7}
            backgroundGlow={0.7}
            opacity={1}
            mouseInteraction
            mouseStrength={0.7}
            mouseRadius={0.95}
            mouseDampening={0.18}
          />
        )}
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="wrap hero-inner">
        <h1 className="hero-type">
          <Typewriter key={lang} phrases={D.typePhrases[lang]} />
        </h1>
        <p className="hero-sub">{t(D.sub, lang)}</p>
        <div className="hero-cta">
          <a className="btn btn-accent cta-impact" href="#contact">
            {t(D.primary, lang)} <Arrow />
          </a>
          <a className="btn btn-glass" href="#work">
            {t(D.secondary, lang)}
          </a>
        </div>
        <div className="hero-stats">
          {D.meta.map((m, i) => (
            <div className="hero-stat" key={i}>
              <span className="num">{m.num}</span>
              <span className="lbl">{t(m, lang)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

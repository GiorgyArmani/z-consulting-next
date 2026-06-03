'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '../theme';
import { useReveal } from '../hooks/useReveal';
import { Nav } from '../components/Nav';
import { MobileMenu } from '../components/MobileMenu';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Industries } from '../components/Industries';
import { Work } from '../components/Work';
import { Process } from '../components/Process';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import type { Lang } from '../types';

function Site() {
  const [lang, setLang] = useState<Lang>('en');
  const [menu, setMenu] = useState(false);
  useReveal();

  // Keep the document language in sync with the toggle for a11y + SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <Nav lang={lang} setLang={setLang} onMenu={() => setMenu(true)} />
      <MobileMenu lang={lang} open={menu} onClose={() => setMenu(false)} />
      <main>
        <Hero lang={lang} />
        <Marquee lang={lang} />
        <Industries lang={lang} />
        <Work lang={lang} />
        <Process lang={lang} />
        <Services lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  );
}

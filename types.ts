// Shared types for Z. Consulting

export type Lang = 'en' | 'es';

/** A string localised into the supported languages. */
export type Loc = Record<Lang, string>;
/** A string array localised into the supported languages. */
export type LocArr = Record<Lang, string[]>;

export interface NavLink extends Loc {
  id: string;
}

export interface HeroMeta extends Loc {
  num: string;
}

export interface IndustryCard {
  icon: string;
  en_t: string;
  es_t: string;
  en: string;
  es: string;
  tags: LocArr;
}

export interface WorkFilter extends Loc {
  id: string;
}

export interface WorkItem {
  ind: string;
  dark?: boolean;
  year: string;
  en_t: string;
  es_t: string;
  en: string;
  es: string;
  /** Real screenshot under /public (e.g. "/projects/mediclock.png"). */
  img?: string;
  /** Localised alt text for the screenshot (a11y + SEO). */
  alt?: Loc;
  /** External link to the live project; renders a "Visit site" CTA when set. */
  url?: string;
  /** Fallback placeholder caption — used only when `img` is absent. */
  ph?: string;
}

export interface ProcessStep {
  n: string;
  en_t: string;
  es_t: string;
  en: string;
  es: string;
}

export interface FooterCol {
  h: Loc;
  links: Loc[];
}

/** Copy for the "Start a project" modal form. */
export interface FormCopy {
  tag: Loc;
  h2: Loc;
  p: Loc;
  name: Loc;
  email: Loc;
  company: Loc;
  message: Loc;
  namePh: Loc;
  emailPh: Loc;
  companyPh: Loc;
  messagePh: Loc;
  submit: Loc;
  sending: Loc;
  sentH: Loc;
  sentP: Loc;
  done: Loc;
  error: Loc;
}

export interface SiteData {
  nav: { links: NavLink[]; cta: Loc };
  hero: {
    tag: Loc;
    typePhrases: LocArr;
    sub: Loc;
    primary: Loc;
    secondary: Loc;
    meta: HeroMeta[];
  };
  marquee: Loc[];
  industries: { tag: Loc; h2: Loc; lead: Loc; cards: IndustryCard[] };
  work: { tag: Loc; h2: Loc; lead: Loc; filters: WorkFilter[]; items: WorkItem[] };
  process: { tag: Loc; h2: Loc; lead: Loc; steps: ProcessStep[] };
  services: { tag: Loc; h2: Loc; items: LocArr };
  cta: { h2: LocArr; p: Loc; btn: Loc; email: string };
  form: FormCopy;
  footer: { tagline: Loc; cols: FooterCol[]; rights: Loc };
}

// ── Theme ────────────────────────────────────────────────────────────────
export type Direction = 'd1' | 'd2' | 'd3';
export type Density = 'compact' | 'regular' | 'comfy';

export interface ThemeState {
  direction: Direction;
  accent: string;
  displayFont: string;
  density: Density;
  heroFx: boolean;
}

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { ThemeState, Density } from './types';

const DENSITY: Record<Density, { pad: string; gap: string }> = {
  compact: { pad: '30px', gap: '18px' },
  regular: { pad: '40px', gap: '24px' },
  comfy: { pad: '56px', gap: '34px' },
};

export const DEFAULT_THEME: ThemeState = {
  direction: 'd3',
  accent: '#CB4E22',
  displayFont: 'Space Grotesk',
  density: 'regular',
  heroFx: true,
};

interface ThemeCtxValue {
  theme: ThemeState;
  set: <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => void;
}

const ThemeCtx = createContext<ThemeCtxValue | null>(null);

export function ThemeProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: Partial<ThemeState>;
}) {
  const [theme, setTheme] = useState<ThemeState>({ ...DEFAULT_THEME, ...initial });

  const set = useCallback(
    <K extends keyof ThemeState>(key: K, value: ThemeState[K]) =>
      setTheme((prev) => ({ ...prev, [key]: value }) as ThemeState),
    [],
  );

  // Apply theme to <html> so the body background follows the active direction.
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.dir = theme.direction;
    const d = DENSITY[theme.density] ?? DENSITY.regular;
    el.style.setProperty('--accent', theme.accent);
    el.style.setProperty('--accent-soft', `color-mix(in srgb, ${theme.accent} 22%, var(--paper))`);
    el.style.setProperty('--accent-2', `color-mix(in srgb, ${theme.accent} 72%, #25180f)`);
    el.style.setProperty('--on-accent', '#FCF7EF');
    // --font-display is owned by next/font (see app/layout.tsx); do not override.
    el.style.setProperty('--pad', d.pad);
    el.style.setProperty('--gap', d.gap);
  }, [theme.direction, theme.accent, theme.displayFont, theme.density]);

  return <ThemeCtx.Provider value={{ theme, set }}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeCtxValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}

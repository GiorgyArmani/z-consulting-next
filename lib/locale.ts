import type { Lang, Loc } from '../types';

/** Pick a localised string. Accepts a {en,es} object or a plain string. */
export function t(field: Loc | string | undefined, lang: Lang): string {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] ?? field.en ?? '';
}

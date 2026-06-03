# Z. Consulting — Landing Page (Next.js + Tailwind)

A bold, modern studio landing page for **Z. Consulting** — a tailor-made software studio.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Bilingual (EN/ES),
three switchable visual directions, and three integrated [React Bits](https://reactbits.dev)
effects:

- **Lightfall** — WebGL "light-rain" hero background (`ogl`)
- **CardSwap** — 3D auto-swapping project deck (`gsap`)
- **FlowingMenu** — animated hover-marquee footer nav (`gsap`)

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Requires Node 18.18+.

---

## How Tailwind is set up (hybrid)

This is a **hybrid** styling approach — and a deliberate one:

- **Tailwind v4 is installed and ready** (`app/globals.css` starts with `@import "tailwindcss";`,
  wired through `postcss.config.mjs`). Use utility classes anywhere you like.
- **The bespoke design system lives in `app/globals.css`** — the colour tokens, the three
  `[data-dir]` direction themes, keyframes, the WebGL hero veil, and the CardSwap /
  FlowingMenu / marquee styling. These rely on CSS custom properties, complex selectors
  and `@keyframes` that are far cleaner as plain CSS than as utility soup.

Tailwind v4 is config-light: there is **no `tailwind.config.js`** — extend the theme with
`@theme { … }` inside `globals.css` if you want your tokens exposed as Tailwind utilities.

> If you'd prefer a *full* utility-class rewrite of the components, say the word — it's a
> larger change but doable.

---

## Project structure

```
z-consulting-next/
├─ app/
│  ├─ layout.tsx        # root layout, metadata, <html data-dir="d3">, imports globals.css
│  ├─ page.tsx          # 'use client' — page composition + language state
│  └─ globals.css       # Tailwind import + Google Fonts + full design system
├─ components/          # all UI (React Bits + sections + primitives)
├─ data.ts              # all bilingual copy (typed) — EDIT CONTENT HERE
├─ types.ts             # shared types
├─ theme.tsx            # ThemeProvider — direction/accent/font/density → CSS vars
├─ lib/locale.ts        # t(field, lang) helper
├─ hooks/useReveal.ts   # scroll-reveal hook
├─ next.config.mjs      # transpiles `ogl`
├─ postcss.config.mjs   # Tailwind v4 PostCSS plugin
└─ tsconfig.json
```

### Server vs client

`app/page.tsx` is a **client component** (`'use client'`) because the page is interactive
(theme context, language toggle, WebGL/GSAP). Everything it imports is part of the client
bundle. `app/layout.tsx` stays a server component for metadata. The context module
(`theme.tsx`) and the three browser-only effects are also marked `'use client'` so you can
drop them into any server tree safely.

---

## Theming & directions

`ThemeProvider` holds `{ direction, accent, displayFont, density, heroFx }` and writes them
onto `<html>` as `data-dir` + CSS variables. Directions:

| id | name |
|----|------|
| d1 | Editorial |
| d2 | Bold Blocks |
| d3 | Soft Tactile (default) |

**To lock to one direction:** set `direction` in `DEFAULT_THEME` (`theme.tsx`), update
`data-dir` in `app/layout.tsx`, remove `<DirectionSwitcher />` from `app/page.tsx`, and
(optionally) delete the unused `[data-dir]` blocks in `globals.css`.

---

## Swapping in real assets

- **Project images** — replace `<Placeholder />` in `components/Work.tsx` with a real
  `<img>` (or `next/image`). Captions live in `data.ts` (`ph`).
- **Logo** — replace the `.mark` ("Z.") in `components/Brand.tsx` / `components/Footer.tsx`.
- **Contact email** — `DATA.cta.email` in `data.ts`.
- **Copy** — all text is in `data.ts`, keyed `en` / `es`.

---

## Notes

- The Lightfall hero is a real-time shader, toggleable via `theme.heroFx`.
- React Bits components are MIT-licensed; adapted here to plain CSS (no Tailwind required)
  to match this design system.
- Using `next/image` for real project art is recommended for optimisation.

---

© 2026 Z. Consulting.

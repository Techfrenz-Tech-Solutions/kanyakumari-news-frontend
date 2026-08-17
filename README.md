# Tamizhan Today — News Portal (Phase 1)

Enterprise-style newspaper/news-portal frontend built with React 18 + Vite, matching the Dinamalar / Dinathanthi / The Hindu / BBC style brief.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build → dist/
npm run lint
```

## What's included (Phase 1 — fully built)

- **Home**: breaking ticker, hero slider (Swiper, autoplay + share/bookmark), latest news grid, category rails (Politics/Sports/Business/Cinema), video strip, photo gallery preview, weather widget, live-look stock market widget (Recharts sparklines), trending sidebar, most-read widget
- **Article page**: full layout with author, tags, like/bookmark/share/print, comments (local state), related articles
- **Category page**: per-category listing with load-more pagination
- **Search page**: query + category filter + sort
- **Photo Gallery**: masonry layout + lightbox
- **Video News**: featured player + playlist
- **E-Paper**: date-picker archive + PDF placeholder
- **Login**: Email, OTP (demo code `123456`), and Google button (UI only)
- **Dark/light theme**, fully responsive (mobile mega-menu drawer, desktop mega menu), SEO meta tags in `index.html`, lazy-loaded images throughout, sticky header, top utility bar (date, weather, gold/petrol rates, language toggle)

All data comes from `src/services/newsService.js`, an async mock layer with the exact same call shape as a real API (`axios.get(...)` ready) — pages never touch `src/data/newsData.js` directly, so swapping in a live CMS/API later means editing one file only.

## What's stubbed for Phase 2

The full brief also specified a CMS-grade **Admin Panel** (analytics, articles/authors/roles CRUD, ad management, push notifications, polls, E-Paper upload), **Firebase Authentication/Storage wiring**, **Live TV page**, **Election Dashboard**, and **PWA/offline mode**. These are large, separate subsystems (auth guards, role-based routing, a rich-text editor, file uploads) — flagging them here rather than shipping half-built stubs. Say the word and I'll build any of these next as a standalone phase.

## Stack

React 18 · Vite · React Router DOM v6 · Tailwind CSS · Framer Motion · React Icons · Swiper · Recharts · Axios-ready service layer

## Folder structure

```
src/
  components/{layout,news,widgets,ui}
  pages/
  context/        (theme)
  data/           (mock dataset)
  services/       (mock API layer — swap point for real backend)
  utils/          (formatters)
```

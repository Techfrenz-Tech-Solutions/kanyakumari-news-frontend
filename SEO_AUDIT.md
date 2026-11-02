# SEO / AEO / GEO Audit — Kanyakumari Today (kanyakumari-news-frontend)

> Read-only audit. No source code, JSX, routes, props, or design were modified. The only file written is this report.
> Stack confirmed from source: **Vite + React 18 SPA with client-side routing (react-router-dom v7)**. This is **not** Next.js, Astro, or any SSR/SSG framework.

---

## Executive Summary

The repository has a genuinely strong **homepage-level** SEO foundation: a hand-tuned `index.html` shell with 60+ head tags, a JSON-LD `@graph` (NewsMediaOrganization, WebSite, WebPage, BreadcrumbList, ItemList), canonical/OG/Twitter tags, `robots.txt`, a static sitemap, a Google News sitemap stub, a PWA manifest, Netlify redirects, a sitemap-generation script, and a noscript crawler fallback.

The single biggest problem, and the thing that blocks serious AEO/GEO ranking, is architectural: **this is a client-rendered SPA, and all article/category content is fetched inside `useEffect` after mount.** The server returns an HTML shell containing only `<div id="root"></div>` plus a noscript block that covers the homepage only. For any crawler that does not execute JavaScript — which is most social bots, AEO answer engines, and many indexers — article text, per-article titles, per-article canonicals, and per-article `NewsArticle` JSON-LD are **invisible**. Googlebot does execute JS (delayed "second wave"), so it can eventually see content, but it is slower and the per-page metadata is still incomplete.

Compounding this: **only the Article page sets per-route head tags** (via a custom DOM-manipulation helper in `src/utils/seo.js`). Every other route — Home, Category, Search, Jobs, TouristInfo, About, Contact, all legal pages — reuses the **homepage** head tags, so they all have `canonical = https://www.kanyakumaritoday.com/` (a canonicalization conflict), the homepage `<title>`, and homepage OG tags. No head-management library (react-helmet / react-helmet-async) is installed.

Recommended direction (consistent with the repo's own README §9 and SEO-NOTES): **add build-time prerendering / SSG** to bake head tags, JSON-LD, and article text into static HTML per route, while leaving the SPA design and component code untouched. Feasibility is assessed in §9.

---

## 1. Stack

Read from `package.json`, `package-lock.json` (lockfileVersion 3), and `vite.config.js`.

| Concern | Finding |
|---|---|
| Build tool | **Vite `5.4.21`** (`vite.config.js`, `@vitejs/plugin-react` `4.7.0`) |
| Framework | **React `18.3.1`** + `react-dom` `18.3.1` |
| Routing | **`react-router-dom` `7.18.3`**, client-side `BrowserRouter` (see `src/main.jsx`) |
| Language | **JavaScript (JSX)** — no TypeScript anywhere |
| Package manager | **npm** (`package-lock.json` present, lockfileVersion 3) |
| HTTP client | `axios` (used in `src/api/client.js`) |
| Other UI deps | `swiper` `12.1.2`, `framer-motion`, `recharts`, `react-chartjs-2`, `chart.js`, `react-icons` |
| CSS | `tailwindcss` `3.4.19` + PostCSS/autoprefixer |
| Deployment target | **Netlify** — `public/_redirects` present (API proxy + http→https/www 301 + SPA catch-all). **No `netlify.toml`, no `vercel.json`, no `next.config.js`, no `middleware.ts`.** README §1 confirms Netlify auto-deploys on push to main. |
| Rendering model | **Client-rendered SPA (CSR).** `src/main.jsx` calls `ReactDOM.createRoot(document.getElementById('root')).render(...)` and mounts `BrowserRouter`. `index.html` body is `<div id="root"></div>` + scripts. |

Confirmed CSR: every page fetches data inside `useEffect` (see §3–§4). There is no SSR, no SSG, no `getStaticProps`/`generateMetadata`, no server functions in this repo.

---

## 2. Every Route

Enumerated from `src/App.jsx` (`<Routes>`). Page components live under `src/pages/*.jsx`. All are client-rendered; "fetch" rows below name the `useEffect` call in each.

| Route | Component file | How it renders | Data fetch (client-side) |
|---|---|---|---|
| `/` | `src/pages/Home.jsx` | CSR | `getHome`, `getByCategory` (×4 cols), `getJobs`, `getTouristAttractions` — all in `useEffect` |
| `/article/:slug` | `src/pages/Article.jsx` | CSR | `getArticleBySlug(slug)` in `useEffect`; then a second `useEffect` injects head tags via `applyArticleMetadata` |
| `/category/:slug` | `src/pages/Category.jsx` | CSR | `getLatest({ category: slug })` in `useEffect` |
| `/search` | `src/pages/Search.jsx` | CSR | `search(q)` in `useEffect` (reads `?q=` from `useSearchParams`) |
| `/tourist-info` | `src/pages/TouristInfo.jsx` | CSR | `getTouristAttractions` in `useEffect` |
| `/jobs` | `src/pages/Jobs.jsx` | CSR | `getJobs` in `useEffect` |
| `/links` | `src/pages/StaticPage.jsx` (title "Useful Links") | CSR (static text) | none (renders "coming soon" text) |
| `/e-paper` | `src/pages/EPaper.jsx` | CSR (static text) | none |
| `/about` | `src/pages/AboutUs.jsx` | CSR (i18n text) | none |
| `/contact` | `src/pages/Contact.jsx` | CSR | reads `site.address` from context; `submitContact` on submit |
| `/advertise` | `src/pages/Advertise.jsx` | CSR (static text) | none |
| `/careers` | `src/pages/Careers.jsx` | CSR (i18n text) | none |
| `/privacy` | `src/pages/PrivacyPolicy.jsx` | CSR (i18n text) | none |
| `/terms` | `src/pages/TermsOfUse.jsx` | CSR (i18n text) | none |
| `/disclaimer` | `src/pages/Disclaimer.jsx` | CSR (i18n text) | none |
| `/cookies` | `src/pages/CookiePolicy.jsx` | CSR (i18n text) | none |
| `/rss` | `src/pages/StaticPage.jsx` (title "RSS Feed") | CSR | none (renders "coming soon") |
| `*` (404) | `src/pages/NotFound.jsx` | CSR (static text) | none |

Top-level providers (in `src/main.jsx`): `BrowserRouter > ThemeProvider > LanguageProvider > PublicContentProvider > App`. The `PublicContentProvider` (`src/context/PublicContentContext.jsx`) itself fetches `getCategories`, `getKanyakumariAreas`, `getSiteSettings` in a `useEffect` on mount — client-side.

Note on the 404 catch-all: Netlify's `/* /index.html 200` rule means unknown paths serve the SPA shell and React Router renders `<NotFound />` after JS boot — a non-JS crawler gets the empty shell with a `200` (soft 404) instead of a real `404` status. Flagged in §7.

---

## 3. Data Source for Articles / News

Data flow: **`src/api/client.js` → `src/services/newsService.js` → page `useEffect` hooks → `src/context/PublicContentContext.jsx`.**

- `src/api/client.js`: creates an `axios` instance with `baseURL = '/api'` (relative, same-origin). Envelope contract enforced: responses must be `{ success: true, data }`. 10s timeout. The backend URL is **never** in the browser bundle.
- `src/services/newsService.js`: thin wrapper exposing `getHome`, `getHero`, `getBreakingHeadlines`, `getLatest`, `getTrending`, `getByCategory`, `getCategories`, `getKanyakumariAreas`, `getArticleBySlug`, `search`, `getSiteSettings`, `getAds`, `getStockData`, `getWeather`, `getRates`, `getJobs`, `getTouristAttractions`, `submitContact`.
- `src/context/PublicContentContext.jsx`: wraps the whole app; on mount fetches categories/areas/site settings into context.

**API base URL / backend resolution (from `.env.example`):**
- Browser always calls `/api` (relative).
- Dev: Vite proxies `/api` and `/uploads` → `VITE_DEV_API_PROXY_TARGET` (`vite.config.js` `server.proxy`).
- Prod (Netlify): `public/_redirects` rewrites `/api/*` and `/uploads/*` → `:API_PROXY_TARGET` (set in the Netlify dashboard, never committed).

**This is unambiguously client-side fetching after mount.** `getArticleBySlug` runs in `Article.jsx`'s `useEffect`; the article body, title, and metadata exist in the DOM only after the fetch resolves. This is the core CSR SEO problem (detailed in §4).

---

## 4. Problem Check — Pages whose main content is client-only

Every page's main content is produced by JavaScript after page load. The initial server HTML is the SPA shell.

- `index.html` body contains only `<div id="root"></div>` and `<script type="module" src="/src/main.jsx">`. There is **no real article/category content** in the served HTML.
- `index.html` includes a `<noscript>` block, but it covers **the homepage only** — a header, a category nav list, and a welcome paragraph (English + Tamil). There is **no article content, no category listing, and no per-article metadata** in the noscript fallback.
- Pages where the primary content is loaded inside `useEffect` (invisible to non-JS crawlers):
  - `src/pages/Article.jsx` — `getArticleBySlug` in `useEffect` (article body is injected via `dangerouslySetInnerHTML` only after fetch).
  - `src/pages/Home.jsx` — `getHome` + `getByCategory` + `getJobs` + `getTouristAttractions`.
  - `src/pages/Category.jsx` — `getLatest`.
  - `src/pages/Search.jsx` — `search`.
  - `src/pages/Jobs.jsx` — `getJobs`.
  - `src/pages/TouristInfo.jsx` — `getTouristAttractions`.
  - `src/components/news/HeroSlider.jsx` — `getHero` (when `articles` prop is not passed).
  - `src/components/ui/AdBanner.jsx` — `getAds`.
  - `src/context/PublicContentContext.jsx` — categories/areas/site settings.
- Even the static-text pages (About, Privacy, Terms, etc.) render their text through React into `#root`, so a non-JS crawler sees an empty page for those too (the noscript fallback only contains homepage content).

Article page specifics (`src/pages/Article.jsx`): head tags are applied by a **second** `useEffect` that runs *after* the article object exists:
```jsx
useEffect(() => {
  if (!article) return
  applyArticleMetadata(buildArticleMetadata(article, lang, shareUrl))
}, [article, lang, shareUrl])
```
So `<title>`, `<meta description>`, `<link rel=canonical>`, OG/Twitter, and `NewsArticle` JSON-LD are injected into `<head>` only after JS executes **and** the API responds. A non-JS crawler therefore sees the **homepage** head tags on an article URL (wrong canonical, wrong title, wrong OG, no NewsArticle).

---

## 5. Existing SEO Assets

### 5.1 `index.html` (the SPA shell — head tags live here)

Extensive and well-ordered. Present and correct:
- `<title>`, `meta description` (~158 chars), large `meta keywords`, `meta robots` (`index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`), `googlebot`, `googlebot-news`.
- Canonical: `<link rel="canonical" href="https://www.kanyakumaritoday.com/">`.
- hreflang: `en-IN`, `en`, `x-default` — **all three point to the same homepage URL** (redundant for a single-locale site; see open question §10).
- Geo meta: `geo.region=IN-TN`, `geo.placename`, `geo.position=8.0883;77.5385`, `ICBM`.
- `google-site-verification` = `NxxrDNw42FGmfOHpXggbBkJhrimufkWYAmHcWU8Bbms` (preserved per README).
- Open Graph: `og:site_name`, `og:type=website`, `og:url`, `og:title`, `og:description`, `og:image` (1200×630, `/og-image.jpg`), `og:image:alt`, `og:locale=en_IN`, `og:locale:alternate=ta_IN`.
- Twitter Card: `summary_large_image`, `twitter:site`/`twitter:creator` = `@kanyakumaritoday` with an inline `<!-- TODO: replace with real handle -->` comment.
- Icons: `logo.png` used for `icon`/`apple-touch-icon` (named favicons referenced by README are **not present** — see §5.6). `manifest` → `/site.webmanifest`. `sitemap` link → `/sitemap.xml`. RSS link → `https://www.kanyakumaritoday.com/rss.xml`.
- JSON-LD: one `<script type="application/ld+json">` with an `@graph` of five nodes — `NewsMediaOrganization` (#organization), `WebSite` (#website, with `SearchAction`), `WebPage` (#webpage, `dateModified: 2026-10-10`), `BreadcrumbList` (#breadcrumb), `ItemList` (#categories, 12 hardcoded category links). `sameAs` lists Facebook/Twitter/YouTube profile URLs flagged as placeholders in the README.
- Analytics: GTM `GTM-KLMXK79Q` (head script + body `<noscript>` iframe) and GA4 gtag `G-DE3CXJZT6R`.
- `<noscript>` crawler fallback: homepage-only header + category nav + welcome text.

### 5.2 Head-management library — **NOT installed**

`package.json` and `package-lock.json` contain **no** `react-helmet`, `react-helmet-async`, or any equivalent. Confirmed by lockfile scan (resolved versions extracted: vite 5.4.21, react 18.3.1, react-router-dom 7.18.3, etc.; helmet packages absent).

Instead there is a **custom** DOM-manipulation helper:
- `src/utils/seo.js` — exports `buildArticleMetadata(article, lang, pageUrl)` and `applyArticleMetadata(metadata)`. The latter sets `document.title`, upserts `description`/OG/Twitter metas, sets/creates the canonical `<link>`, removes any prior `#article-jsonld` script and appends a new `<script type="application/ld+json">` with `NewsArticle` JSON-LD.
- It is imported and used **only** in `src/pages/Article.jsx` (line 10 import; line 79 call inside `useEffect`).

**Gap:** Home, Category, Search, Jobs, TouristInfo, About, Contact, and all legal/static pages do **not** manage per-route head tags. They inherit `index.html`'s homepage tags verbatim. Consequences:
- Every non-article page has `canonical = https://www.kanyakumaritoday.com/` (homepage) → duplicate/canonicalization conflict.
- Every non-article page has the homepage `<title>` and OG tags.
- Category and other pages get no `CollectionPage`/`ItemList` JSON-LD specific to that category.

There is a unit test for the helper: `test/article.test.js` asserts `buildArticleMetadata` returns canonical, social data, and a valid `NewsArticle` JSON-LD. Run via `npm test` (Node built-in test runner). (Not run during this read-only audit.)

### 5.3 `public/robots.txt`

```
User-agent: *  Allow: /  Disallow: /admin/ /api/ /search? /*?utm_
GPTBot, ChatGPT-User, CCBot, anthropic-ai, Claude-Web → Disallow: /
Googlebot, Googlebot-News, Googlebot-Image → Allow: /
Crawl-delay: 5
Sitemap: https://www.kanyakumaritoday.com/sitemap.xml
Sitemap: https://www.kanyakumaritoday.com/news-sitemap.xml
```
Observations: AI-training crawlers are blocked (note: this also blocks them from any future AEO/GEO indexing — a deliberate choice; flagged as an open question for AEO goals). `/api/` and `/search?` disallows are correct. `Crawl-delay: 5` is honored by few modern crawlers (Bing) and ignored by Google.

### 5.4 `public/sitemap.xml`

Static sitemap, 25 URLs, all on `https://www.kanyakumaritoday.com`. Covers `/`, 12 `/category/*`, `/search`, `/tourist-info`, `/jobs`, `/e-paper`, `/about`, `/contact`, `/advertise`, `/careers`, and 4 legal pages. Priorities 1.0 → 0.3. **All `<lastmod>` are `2026-10-10`** (a hardcoded/stale value; the committed file is not regenerated — see §5.8). No article URLs are present (the generator adds them only when `SITEMAP_API_BASE_URL` is set at run time).

### 5.5 `public/news-sitemap.xml`

Stub only — an empty `<urlset>` with a comment that it must be regenerated daily from the backend, containing only articles from the last 48h. No `<url>` entries committed.

### 5.6 `public/site.webmanifest`

Valid PWA manifest: name "Kanyakumari Today", short_name "KK Today", standalone display, theme `#C8102E`, icons via `/logo.png` (192/512). Declares `lang: en-IN`.

### 5.7 Referenced assets that are MISSING (verified on disk)

| Referenced in | Asset | Present? |
|---|---|---|
| `index.html` OG/Twitter/JSON-LD | `public/og-image.jpg` (1200×630) | **No** |
| `index.html` `<link rel="alternate" type="application/rss+xml">`, robots, `/rss` route | `public/rss.xml` | **No** (the `/rss` route shows "coming soon") |
| README/SEO-NOTES | `public/favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` | **No** (icons fall back to `logo.png`, which exists) |

Also present in `public/`: `googlea388f524c83ec952.html` (a Google Search Console HTML verification file — an alternative verification method), `logo.png`, `news-placeholder.svg`.

### 5.8 `scripts/generate-sitemap.mjs`

Node 18+ script. Builds `public/sitemap.xml` from a hardcoded `staticRoutes` array and optionally fetches articles (via `SITEMAP_API_BASE_URL` or fallback `VITE_DEV_API_PROXY_TARGET`) to append `/article/:slug` URLs and to build `news-sitemap.xml` (48h window). Wired to `npm run generate:sitemap` but **not** to `npm run build` (build is just `vite build`). `BASE_URL` is **hardcoded** to `https://www.kanyakumaritoday.com` (not read from an env var). Minor doc inconsistency: the file's top comment says "Set VITE_API_BASE_URL env var" but the code reads `SITEMAP_API_BASE_URL`.

---

## 6. Per-Page Heading + Image Audit

### 6.1 Heading order (H1 > H2 > H3)

Every page renders **exactly one H1** (good). `Home.jsx` uses a visually-hidden `<h1 className="sr-only">` (line 106) — present in the DOM, acceptable. `Article.jsx` has a second H1 in its `notFound` early-return branch (line 84), but it is mutually exclusive with the main H1 (line 119), so only one H1 ever renders.

Heading-order issues (skipped levels / out-of-order):

| Page | Issue | Lines |
|---|---|---|
| `src/pages/Article.jsx` | H1 (line 119) → H3 "Related News" (line 174) — **skips H2** | 119, 174 |
| `src/pages/Category.jsx` | H1 (line 83) → featured `NewsCard` renders H3 — **skips H2** (list titles are `<p>`, not headings) | 83; NewsCard.jsx large variant H3 (~line 38) |
| `src/pages/Search.jsx` | H1 (line 41) → result `NewsCard` renders H3 — **skips H2** | 41; NewsCard.jsx medium H3 (~line 91) |
| `src/pages/AboutUs.jsx` | H1 (line 16) → H3 mission cards (line 25) → H2 contact (line 33) — **H1→H3 skip and H2 after H3** | 16, 25, 33 |
| `src/pages/Careers.jsx` | H1 (line 14) → H3 "why join" cards (line 23) → H2 current openings (line 30) — **H1→H3 skip and H2 after H3** | 14, 23, 30 |

Pages with clean order: `Home` (H1 sr-only → H2 → H3), `TouristInfo` (H1 → H2 → H3), `PrivacyPolicy`/`TermsOfUse`/`Disclaimer`/`CookiePolicy` (H1 → H2), `Jobs`/`EPaper`/`Contact`/`Advertise`/`NotFound`/`StaticPage` (H1 only).

### 6.2 Image `alt` audit (no attributes were added — listing only)

`next/image` is not used (not a Next.js project). All `<img>` tags found have an `alt` attribute. No image is missing `alt`. Specifics:

| File:line | `alt` value | Notes |
|---|---|---|
| `src/components/news/NewsCard.jsx` (4 variants) | `alt={title}` | Has alt; `loading="lazy"` present on all variants. Good. |
| `src/components/news/HeroSlider.jsx:56` | `alt={titleOf(a)}` | Has alt; no `loading="lazy"` (above-the-fold hero — acceptable). |
| `src/components/layout/Footer.jsx:76` | `alt={site?.siteName \|\| 'Kanyakumari Today'}` | Has alt. |
| `src/components/layout/Header.jsx:165` | `alt="Kanyakumari Today"` | Has alt. |
| `src/components/ui/AdBanner.jsx` | `alt={ad.title \|\| 'Advertisement'}` | Has alt; no `loading="lazy"`. |
| `src/pages/Article.jsx:142` | `alt={titleOf(article)}` (main image) | Has alt; no `loading="lazy"` (LCP image — acceptable). |
| `src/pages/Article.jsx:179` | `alt={titleOf(a)}` (related sidebar) | Has alt; **no `loading="lazy"`** (below-the-fold — recommend lazy). |
| `src/pages/Article.jsx:124` | `alt=""` (author avatar) | **Empty/decorative alt.** Present, but for an avatar representing a person, carrying the author name would be more descriptive. |
| `src/pages/Category.jsx:149` | `alt={titleOf(a)}` (list thumbs) | Has alt; **no `loading="lazy"`** (below-the-fold — recommend lazy). |
| `src/pages/TouristInfo.jsx:25` | `alt="Kanyakumari"` (hero) | Has alt; no `loading="lazy"` (above fold — acceptable). |
| `src/pages/TouristInfo.jsx:46` | `alt={place.name}` (grid) | Has alt; **no `loading="lazy"`** (below-the-fold — recommend lazy). |

Other image notes: no `<img>` carries explicit `width`/`height`; most rely on Tailwind `aspect-[...]` containers which reserve box space and largely mitigate CLS, but intrinsic dimensions would be safer. All article images use `onError` fallback to `/news-placeholder.svg` (present on disk).

---

## 7. Routing / Middleware / Headers

- **No `middleware.ts`, no `next.config.js`** — this is Vite, not Next.js.
- `vite.config.js`: **no headers, no redirects, no `X-Robots-Tag` config.** Only `server.proxy` (dev) and `build` options (`outDir: dist`, `sourcemap: false`, `chunkSizeWarningLimit: 1000`).
- `public/_redirects` (Netlify):
  - `/api/*` and `/uploads/*` → `:API_PROXY_TARGET/...` (status 200, server-side proxy; backend URL hidden from the browser).
  - `http://...kanyakumaritoday.com/*`, `https://kanyakumaritoday.com/*` → `https://www.kanyakumaritoday.com/:splat 301!` (force https + www canonical).
  - Static passthroughs (`/sitemap.xml`, `/news-sitemap.xml`, `/robots.txt`, `/site.webmanifest` → 200) **before** the SPA catch-all.
  - `/* /index.html 200` (SPA catch-all, last).
  - **No `X-Robots-Tag`** anywhere (not in `_redirects`, not in Vite). The only crawler control is `robots.txt` and the `<meta name="robots">` in `index.html` (`index, follow`).
- Soft-404 concern: the `/* /index.html 200` rule returns HTTP 200 for unknown paths. A non-JS crawler hitting a missing URL gets a 200 shell, not a 404. React Router renders `<NotFound/>` only after JS boot.

---

## 8. Environment Variables

From `.env.example`:

| Variable | Purpose | Default in `.env.example` |
|---|---|---|
| `VITE_DEV_API_PROXY_TARGET` | Vite dev-server proxy target for `/api` and `/uploads` | empty |
| `SITEMAP_API_BASE_URL` | `scripts/generate-sitemap.mjs` live-article fetch (server-side only) | empty |
| `API_PROXY_TARGET` | Netlify `_redirects` proxy to the real backend (set in Netlify dashboard, not committed) | — |

There is **no `VITE_SITE_URL`** (or any site-URL env var). The canonical site URL `https://www.kanyakumaritoday.com` is **hardcoded** in: `index.html` (canonical/OG/JSON-LD), `public/robots.txt` (Sitemap lines), `public/sitemap.xml` and `public/news-sitemap.xml` (all `<loc>`), `public/_redirects` (redirect targets), and `scripts/generate-sitemap.mjs` (`BASE_URL` constant). The backend URL is correctly kept out of the browser bundle (same-origin `/api` + server-side proxy).

---

## 9. Prerender / SSG Feasibility (chosen direction)

Goal: generate static HTML per route at build time — baking head tags, JSON-LD, and article text for crawlers — **without changing the SPA design or component JSX**.

### What exists today
- Pure CSR SPA. `BrowserRouter` (client-side). Data from same-origin `/api` (proxied server-side). All fetching in `useEffect` with `AbortController`.
- A sitemap generator that already demonstrates the build-time "fetch article list from the backend" pattern (`scripts/generate-sitemap.mjs` via `SITEMAP_API_BASE_URL`).

### Viable approaches
1. **`vite-ssg` / `vite-react-ssg`** (React SPA prerender): renders each route to static HTML at build time, hydrates to the existing SPA on the client. Highest fidelity to "no design change."
   - Needs: wrap the app in the plugin's provider (entry change in `src/main.jsx`); provide the route list; allow effects to run during prerender.
   - Build-time data: static routes (home, categories, legal, about, etc.) prerender fine with **no backend access** (they render skeletons/loading, but at least the head tags + noscript content get baked). To bake **article text and per-article JSON-LD**, the build must fetch each article from the backend → requires a build-time API URL env var (e.g. reuse `SITEMAP_API_BASE_URL`); the `/api` relative path won't resolve during a Node-based build because the Vite/Netlify dev proxy isn't active there.
2. **Custom prerender crawl** (e.g. `vite-plugin-prerender`, Rendertron, or a Playwright step): crawl known routes (sitemap static list + article slugs from the backend) and dump static HTML. Reuses the existing article-list fetch. Same build-time API reachability requirement.
3. **On-demand edge SSR** (Netlify Edge/Functions for bot requests): no build step; render per request at the CDN. Compatible with CSR but adds a server function and cost/complexity.

### Concrete risks to the "no design change" rule
- **SSR-safety of `src/main.jsx`.** It runs `document.addEventListener('contextmenu', ...)` and `window.addEventListener(...)` plus a `setInterval(...)` at **module top level**. These touch `window`/`document` at import time and will break a Node-based prerender unless guarded with `typeof window !== 'undefined'` or moved into an effect. This is a **code change**, but it is logic/boilerplate, not design/JSX/visual — acceptable under the no-design-change constraint, but it is a real edit and must be flagged.
- **`AbortController` + `useEffect` cleanup** in fetchers is generally SSG-compatible (prerender engines execute effects then tear down).
- **`BrowserRouter`** works for client nav after hydration; prerendered per-route HTML files take precedence over the SPA fallback on Netlify (static files are served first), which **improves** SEO without breaking client-side navigation. No routing change needed.
- **Dynamic article routes** cannot be prerendered unless the build can enumerate article slugs (needs backend reachability at build). If the build environment cannot reach the backend, article pages remain CSR and only their client-side `NewsArticle` JSON-LD (already implemented) helps Googlebot's second wave.
- **Build pipeline change**: `package.json` build script would change (e.g. `vite build && <prerender>`) and a new dev dependency added. Not a design change.

### Recommendation (direction only — not implemented)
- **Phase 1 (low risk, high value):** Add `vite-ssg` (or equivalent) and prerender the **static routes** (home, 12 categories, legal pages, about/contact/advertise/careers, jobs, tourist-info, search, 404). This bakes correct per-route `<title>`/canonical/OG and homepage JSON-LD into HTML for every non-JS crawler, with no backend dependency. Requires only SSR-safety guards in `src/main.jsx` and per-route head tags for the currently-unmanaged pages (Category, Search, Jobs, TouristInfo, static pages) — extend the existing `src/utils/seo.js` pattern rather than introducing react-helmet.
- **Phase 2 (needs build-time backend access):** Prerender **article pages** by enumerating slugs via the backend (reuse `SITEMAP_API_BASE_URL`) and fetching each article at build time, baking the article body + `NewsArticle` JSON-LD. If the build cannot reach the backend, keep article pages CSR (the existing client-side `NewsArticle` JSON-LD covers Googlebot).
- **Fallback / complement:** on-demand edge SSR for article URLs when prerendered output is missing or stale.

Dependencies needed: `vite-ssg` (or `vite-plugin-prerender`/custom crawl). `axios` already present. No change to the visual design or component JSX is required.

---

## Prioritised Recommendations

> Implement nothing now — this audit only recommends.

### Critical
1. **Prerender static routes at build time** (home, categories, legal, about, contact, jobs, tourist-info, search, 404) so crawlers receive real per-route HTML instead of an empty shell. Bake correct per-route `<title>`, canonical, OG, and JSON-LD. (§4, §9)
2. **Add per-route head management to every page**, not just Article. Today every non-article page inherits the homepage canonical (`https://www.kanyakumaritoday.com/`) and homepage title → duplicate-content/canonicalization across all routes. Either extend `src/utils/seo.js` to every page or adopt `react-helmet-async`. (§5.2)
3. **Prerender article pages at build time** (when the build can reach the backend) so article body text and `NewsArticle` JSON-LD are in the initial HTML for non-JS/AEO crawlers. Until then, article content is invisible to crawlers that don't run JS. (§3, §4)
4. **Create the missing `public/og-image.jpg`** (1200×630) — it is referenced in OG/Twitter/JSON-LD but does not exist, so social/AEO share cards are broken. (§5.7)

### Important
5. **Fix heading order** where levels are skipped: Article (H1→H3, needs an H2), Category and Search (featured/result cards render H3 with no H2), AboutUs and Careers (H1→H3 then H2 — re-order/re-level). (§6.1)
6. **Add `loading="lazy"`** to below-the-fold images: Article related-sidebar (`:179`), Category list thumbs (`:149`), TouristInfo grid (`:46`). (§6.2)
7. **Generate sitemaps in the build** (wire `generate-sitemap` into `npm run build`) and **regenerate `news-sitemap.xml` daily** (currently an empty stub). Set `SITEMAP_API_BASE_URL` in CI so article URLs appear in both sitemaps. (§5.4, §5.5, §5.8)
8. **Replace placeholder social handles/profiles** (`@kanyakumaritoday`, `sameAs` Facebook/Twitter/YouTube) and confirm they are real before relying on them for entity/AEO signals. (§5.1)
9. **Resolve the future-dated `lastmod`/`dateModified`** (`2026-10-10`) in `sitemap.xml` and the homepage JSON-LD `WebPage.dateModified` — these are hardcoded/stale and should be generated from real timestamps. (§5.1, §5.4)
10. **Return a real 404** for unknown URLs instead of the `200` SPA shell (consider a Netlify redirect/rule or prerendered 404 page) to avoid soft-404s. (§7)
11. **Reconsider AI-crawler blocks in `robots.txt`** if AEO/GEO visibility is a goal — blocking GPTBot/CCBot/anthropic-ai/Claude-Web prevents those answer engines from indexing the site. (§5.3)

### Nice-to-have
12. Add intrinsic `width`/`height` (or rely on the existing `aspect-[...]` boxes) to all `<img>` to eliminate residual CLS risk. (§6.2)
13. Give the Article author avatar a descriptive `alt` (author name) instead of empty `alt=""`, or keep empty only if truly decorative. (§6.2)
14. Consolidate the hardcoded site URL into one env var (`VITE_SITE_URL`) used by `index.html` injection, sitemap generator, robots, and redirects — currently duplicated across 5 files. (§8)
15. Provide a real `public/rss.xml` (or remove the RSS `<link>` and `/rss` route) — the link currently points to a non-existent file. (§5.7)
16. Fix the `generate-sitemap.mjs` header comment (`VITE_API_BASE_URL`) to match the code (`SITEMAP_API_BASE_URL`). (§5.8)
17. Validate the JSON-LD `ItemList` category slugs against the backend's actual `getCategories` slugs — they are hardcoded in `index.html` and will be wrong if the backend uses different slugs. (§5.1)

---

## 10. Open Questions

- **Future-dated metadata**: `sitemap.xml` `<lastmod>` and JSON-LD `WebPage.dateModified` are `2026-10-10`. Is this an intentional placeholder, or stale data that should be regenerated? (No fix applied — flagged.)
- **Backend category slugs**: the `index.html` JSON-LD `ItemList` and `sitemap.xml` hardcode category slugs (e.g. `kanyakumari`, `nagercoil`, `tamil-nadu`, `crime`, `politics`). These must match the backend's `getCategories` response; if they differ, structured data and sitemap entries are wrong. Cannot verify without the backend.
- **hreflang**: three hreflang entries (`en-IN`, `en`, `x-default`) all point to the same homepage URL. Acceptable for a single-locale site but redundant; confirm whether a Tamil (`ta-IN`) variant URL is planned.
- **AI-crawler policy**: `robots.txt` blocks GPTBot/CCBot/anthic-ai/Claude-Web. This directly conflicts with an AEO/GEO goal of being cited by answer engines. Confirm whether the block is intended.
- **Real contact details**: `src/pages/Contact.jsx` hardcodes `kanyakumaritoday2026@gmail.com` and phone `88700 05541` (read from source, not invented). Confirm these are the intended public contact values before relying on them for local-business SEO/NAP consistency.

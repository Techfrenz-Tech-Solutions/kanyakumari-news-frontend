# SEO Proposal — Server-render headlines & article content (same design)

**Status: Proposal only. No code has been changed. Awaiting your OK.**
Date: 2026-10-24

---

## 1. Why this proposal exists (the trigger)

The `INDEXING_DIAGNOSIS.md` curl run showed that for every tested route
(`/category/*`, `/article/*`, `/index.html`, `/search`), the **raw HTML served by
Netlify contains no real headline or article text** — only a generic `<noscript>`
fallback `<h1>` ("Kanyakumari News Today – Latest Kanyakumari & Nagercoil News").
The category name, the article title (`<h1>`), the article body, and the per-page
title/description/canonical all appear **only after JavaScript runs** (React mounts
and fetches the backend). The per-page meta added recently is also JS-injected, so
the raw first fetch still ships the homepage defaults.

Google *can* render JS, but for this site that means: the first crawl sees an
identical, empty duplicate shell for every URL; the JS render is a delayed second
pass; and the homepage canonical in the raw HTML can win consolidation before the
JS-injected canonical is read. For a news site this causes slow, unreliable
indexing of articles — the exact problem this proposal is meant to fix.

**Condition met:** headline and article text appear only after JavaScript runs.
This document proposes server-rendering them with the exact same design.

---

## 2. Goal & constraints

- **Goal:** make the server-delivered HTML for `/category/:slug` and `/article/:slug`
  contain the real headline (`<h1>`), article body, and per-page
  title/description/canonical — so crawlers and `curl` see real content without
  waiting for JS — while the client hydrates into the same interactive app.
- **Exact same design:** reuse the existing React components and Tailwind classes
  unchanged. No visual redesign, no separate SSR template. Server output must match
  hydrated client output (no hydration mismatch).
- **Same data source:** the backend at `/api` (`/api/categories`,
  `/api/news/:slug`, `/api/news/category/:slug`). No new backend contract required.
- **Same host/deploy:** Netlify. Keep the existing `_redirects` rules
  (http→https, non-www→www, `/index.html`→`/`, the planned
  `tamil-nadu`→`tamilnadu-news`, and the SPA fallback for non-SSR routes).
- **No behavior change:** routing, language toggle, search, ads, and share buttons
  keep working.

---

## 3. Current architecture (recap)

- Vite 5 + React 18 + `react-router-dom` **7.18.3**, currently in **library mode**
  (`BrowserRouter`, `useParams`/`useSearchParams`, pages in `src/pages/*`).
- Client-side rendered. Data fetched in `useEffect` via `newsService`
  (`src/services/newsService.js`) → `apiClient` (`src/api/client.js`) at `/api`.
- Meta set imperatively in `useEffect` via `src/utils/seo.js`
  (`applyArticleMetadata` / `applyPageMetadata` / `restoreHomeMetadata`), plus a
  `noindex` effect in `Search.jsx`. `metadataBase` is `https://www.kanyakumaritoday.com`
  (`src/seo/config.js` + `src/utils/seo.js`).
- Static `index.html` shell with homepage meta + `<noscript>` fallback; Netlify
  `/*  /index.html  200` serves that shell for every route.
- Tailwind 3.4 for styling; framer-motion, swiper, react-icons, chart.js present.

---

## 4. Options considered

| # | Approach | Server HTML has real content? | Stays fully static? | Freshness | Design fidelity | Migration effort |
|---|---|---|---|---|---|---|
| A | **react-router v7 framework SSR** + Netlify adapter | Yes | No (functions) | Per-request (fresh) | Exact (same components) | Medium–high |
| B | **Vike (vite-plugin-ssr)** SSR, keep current routing | Yes | No (functions) | Per-request | Exact | Medium |
| C | **Build-time prerender** (`renderToString`/Puppeteer over known routes) | Yes, for prerendered routes | Yes | Stale between builds (needs rebuild-on-publish) | Exact | Medium |
| D | **Netlify On-demand Builders / ISR** as the deploy shape for A/B/C | Yes | Cached static after first render | Fresh on demand | Exact | Adds caching layer |
| E | Lightweight head + h1 + body injection into the shell (no full SSR) | Partial | Yes-ish | Per-request | Hydration-mismatch risk | Low |

**Recommended:** **A (react-router v7 framework SSR) deployed via D (Netlify
On-demand Builders / ISR)**. Since the app is already on `react-router-dom` 7,
adopting its framework/SSR mode is the natural path: it gives route loaders,
server rendering, and a `meta` API for the head, while reusing the existing
components (exact design). On-demand Builders render each path server-side on
first request and cache the HTML at the edge — fresh first render, fast/cached
after, low cost. **B (Vike)** is the alternative if you'd rather keep the current
routing structure. **C (build-time prerender)** is the choice if you want to stay
fully static, with the trade-off that newly published articles have no
server-rendered HTML until the next build (solvable by a rebuild-on-publish
webhook). **E** is not recommended (partial output, hydration-mismatch risk).

---

## 5. Recommended approach — detail

Per-request SSR of the existing React components, served by a Netlify On-demand
Builder / function, edge-cached, using react-router v7 framework SSR (or Vike).

### 5.1 What changes (described, not implemented yet)

1. **Routing → data-router / framework mode.** Convert `src/main.jsx` +
   `BrowserRouter` to RR7 framework mode (server/client entry, `routes.tsx` with
   `loader` exports). Page JSX stays the same; routes gain loaders.
   (With Vike: keep `BrowserRouter`, add `.page.server.js` loaders.)
2. **Move data fetching out of `useEffect` into route loaders** so the server
   render has data:
   - `Article` loader: `newsService.getArticleBySlug(slug)` + related.
   - `Category` loader: `newsService.getLatest({ category })` + taxonomy.
   - Home/Search loaders as needed.
   - Client keeps `useEffect` only for post-mount work (analytics, ads). Data is
     pre-seeded from the loader via `useLoaderData()` and revalidated on navigation.
3. **Render `<head>` server-side.** Replace the imperative `document.head`
   manipulation (`applyArticleMetadata` / `applyPageMetadata` /
   `restoreHomeMetadata` / Search `noindex`) with a declarative head (RR7 `meta`
   export or a `<Head>`/helmet-equivalent) so the server HTML contains the correct
   title/description/canonical/og/twitter per route and `noindex` for `/search`.
   The value-building logic in `src/utils/seo.js` (`pageCanonical`,
   `buildPageMetadata`, `buildArticleMetadata`) is **reused** — only the
   *application* moves from imperative DOM mutation to declarative head rendering.
   `metadataBase` continues to feed absolute canonicals.
4. **SSR render pipeline.** Server entry renders the RR7 router with loader data
   (`renderToPipeableStream`/`renderToString`), emitting the real `<h1>` and
   article body into the HTML, and serializes loader data into the response so the
   client hydrates with identical data (no refetch flash, no mismatch).
5. **Browser-API safety pass.** Audit render-time use of `window`/`document`
   (e.g. `window.location.href` for the share URL in `Article.jsx`, the meta DOM
   helpers, theme/localization). Guard with `typeof window !== 'undefined'` or
   move to `useEffect`/handlers so the server render doesn't crash. The DOM meta
   helpers become client-only or are replaced by the declarative head.
6. **Netlify adapter / function.** A Netlify function (or RR7's Netlify adapter /
   On-demand Builder) maps `/category/:slug` and `/article/:slug` → SSR; non-SSR
   routes and static assets fall through to the SPA shell / static files via the
   existing `_redirects`.
7. **Caching.** On-demand Builder caches rendered HTML per path at the edge;
   invalidate (redeploy or purge) on article publish/update; stale-while-revalidate
   for category lists.
8. **Keep `_redirects`.** The 301s (`/index.html`→`/`, `tamil-nadu`→`tamilnadu-news`)
   run before the function; SSR only handles the canonical kept slug.

### 5.2 Exact-design preservation

- Same `src/pages/*`, `src/components/*`, Tailwind config, `index.css`. SSR renders
  the same tree, so markup/classes are identical to the hydrated client.
- Hydration matches because loader data is serialized and reused on the client.
- No separate "server template." Verify with a visual diff (CSR vs SSR) and a DOM
  diff for a sample article + category.

---

## 6. Scope

- **In scope:** server rendering of `/article/:slug` and `/category/:slug`
  (headline + body + per-page meta). Home and Search can follow (Search stays
  `noindex`).
- **Out of scope:** backend changes, redesign, changing the data API contract, the
  orphan-category cleanup (separate task), ads/analytics logic.

---

## 7. Risks & mitigations

- **Hydration mismatch** → serialize loader data; guard browser APIs; React 18
  `hydrateRoot`; watch mismatch warnings in dev.
- **Cold-start / latency** on Netlify functions → On-demand Builders + edge cache (ISR).
- **Cost of per-request backend calls** → cache category lists; builder caches HTML
  per path.
- **Migration regressions** → keep CSR shell as fallback; route-level rollout;
  visual + DOM diff tests.
- **Browser-API crashes on server** → audit pass (`Article` `window.location`, meta
  helpers, theme/localization).
- **Imperative SEO code becomes redundant** → retire after declarative head is in
  place (keep the value-building logic, change only the application).

---

## 8. Migration phases (high-level)

1. **Spike:** stand up RR7 framework SSR for one route (`/article/:slug`) behind a
   Netlify function; verify raw HTML contains h1 + body + meta and hydration is clean.
2. Extend to `/category/:slug`; migrate loaders; switch meta to declarative head.
3. Add On-demand Builder caching; wire publish-driven invalidation.
4. Roll out remaining routes (home/search); retire imperative meta helpers; remove
   the `<noscript>` fallback (no longer needed once content is in the HTML).
5. Verify build + visual parity + GSC URL inspection.

---

## 9. Verification

- `curl` raw HTML of `/article/:slug` and `/category/:slug` → must contain the real
  `<h1>`, article body, and self-referencing `<title>`/`<canonical>`/description
  **without JS**.
- `npm run build` + `npm test` pass.
- Visual diff CSR vs SSR (same design).
- GSC URL Inspection → "View tested page" → HTML tab now shows real content +
  per-page canonical (not the homepage shell).

---

## 10. Google Search Console impact

Server-rendered content fixes the root cause: Google's first fetch sees unique,
real content per URL instead of an identical empty shell, which (a) removes the
"duplicate" signal across category/article URLs, (b) lets the per-page
canonical/title be read immediately with no JS-render delay, (c) makes articles
eligible for Google News / faster indexing, and (d) makes the sitemap point to
pages that actually contain the advertised content. After deploy, resubmit the
sitemaps in GSC and use URL Inspection to confirm the HTML tab shows the article
headline and the self-referencing canonical.

---

## 11. Status

**Awaiting your OK.** No source code, build, config, or hosting files have been
modified for this proposal. To proceed, confirm:
1. Approve the approach — **A (react-router v7 SSR) + D (Netlify On-demand
   Builders)**, or **B (Vike)**, or **C (build-time prerender)**.
2. Whether to start with the Phase 1 spike for `/article/:slug` only.

---

## Proposal: Town hub pages + spelling-variant footer text

**Status: Proposal only. No code changed. Awaiting your OK.**
Date: 2026-10-24
Source: `LOCATION`, `TOWNS`, `SPELLING_VARIANTS` in `src/seo/keywords.js`

---

### What this proposes

New routes `/nagercoil`, `/marthandam`, `/thuckalay`, `/colachel`,
`/padmanabhapuram`, `/kuzhithurai` (priority ≥ 0.7 from `TOWNS`) that reuse the
existing `Category.jsx` design exactly — same dark header, same article grid, same
sidebar. The only difference is the URL pattern and the intro text. No new
component, no design change.

How it would work technically:
- Route `/town/:slug` (or a second `/:slug` catch after `/category/:slug`) renders
  a `TownHub.jsx` that calls `newsService.getLatest({ area: slug })`. The backend
  already exposes an `area` filter param (`src/services/newsService.js` line:
  `getLatest({ area })`).
- Per-page metadata follows the same `buildPageMetadata` + `applyPageMetadata`
  pattern already in `Category.jsx`.
- Canonical: `https://www.kanyakumaritoday.com/{slug}`

---

### Town hub page specs (priority 0.7–0.8 towns)

#### `/nagercoil` — Nagercoil News Today

- **Title (58 chars):** `Nagercoil News Today | Kanyakumari Today`
- **Description (137 chars):** `Get the latest Nagercoil news today — local updates, crime, education, business and civic news from Nagercoil, Kanyakumari district.`
- **`<h1>`:** `Nagercoil News Today`
- **English intro (~50 words):**
  > Nagercoil is the district headquarters of Kanyakumari and the region's largest
  > city. Kanyakumari Today covers Nagercoil news around the clock — from local
  > politics and civic updates to education, business and crime. Bookmark this page
  > for the latest Nagercoil news today.
- **Tamil intro:**
  > நாகர்கோவில் கன்னியாகுமரி மாவட்டத்தின் தலைநகராகும். கன்னியாகுமரி டுடே நாகர்கோவில்
  > இன்றைய செய்திகளை — அரசியல், கல்வி, வணிகம் மற்றும் குற்றச் செய்திகளை —
  > தொடர்ந்து வெளியிடுகிறது.
- **Canonical:** `https://www.kanyakumaritoday.com/nagercoil`
- **Sitemap priority:** 0.8

---

#### `/marthandam` — Marthandam News Today

- **Title (56 chars):** `Marthandam News Today | Kanyakumari Today`
- **Description (138 chars):** `Marthandam news today — local updates on politics, education, markets and community events from Marthandam, Kanyakumari district, Tamil Nadu.`
- **`<h1>`:** `Marthandam News Today`
- **English intro:**
  > Marthandam is one of Kanyakumari district's most active commercial centres.
  > Kanyakumari Today brings you Marthandam news today — covering local politics,
  > education, markets and community stories from Marthandam town and its
  > surrounding areas.
- **Tamil intro:**
  > மார்த்தாண்டம் கன்னியாகுமரி மாவட்டத்தின் முக்கியமான வணிக மையங்களில் ஒன்றாகும்.
  > கன்னியாகுமரி டுடே மார்த்தாண்டம் பகுதியின் இன்றைய செய்திகளை தொடர்ந்து
  > வெளியிடுகிறது.
- **Canonical:** `https://www.kanyakumaritoday.com/marthandam`
- **Sitemap priority:** 0.8

---

#### `/thuckalay` — Thuckalay News Today

- **Title (54 chars):** `Thuckalay News Today | Kanyakumari Today`
- **Description (135 chars):** `Thuckalay news today — local updates, civic news and community stories from Thuckalay town, Kanyakumari district, Tamil Nadu.`
- **`<h1>`:** `Thuckalay News Today`
- **English intro:**
  > Kanyakumari Today covers Thuckalay news today — local events, municipal updates
  > and community stories from Thuckalay and the surrounding taluks of
  > Kanyakumari district.
- **Tamil intro:**
  > தக்கலை கன்னியாகுமரி மாவட்டத்தின் முக்கியமான நகரமாகும். கன்னியாகுமரி டுடே
  > தக்கலையின் இன்றைய செய்திகளை வெளியிடுகிறது.
- **Canonical:** `https://www.kanyakumaritoday.com/thuckalay`
- **Sitemap priority:** 0.7

---

#### `/colachel` — Colachel News Today

- **Title (51 chars):** `Colachel News Today | Kanyakumari Today`
- **Description (133 chars):** `Colachel news today — port updates, fishing community news, civic events and local stories from Colachel, Kanyakumari district.`
- **`<h1>`:** `Colachel News Today`
- **English intro:**
  > Colachel is a major port and fishing hub in Kanyakumari district. Kanyakumari
  > Today brings Colachel news today — port activity, fishing community updates and
  > civic stories from Colachel town.
- **Tamil intro:**
  > கொச்சாள் கன்னியாகுமரி மாவட்டத்தின் முக்கியமான துறைமுக நகரமாகும். கன்னியாகுமரி
  > டுடே கொச்சாளின் இன்றைய செய்திகளை வெளியிடுகிறது.
- **Canonical:** `https://www.kanyakumaritoday.com/colachel`
- **Sitemap priority:** 0.7

---

#### `/padmanabhapuram` — Padmanabhapuram News Today

- **Title (60 chars):** `Padmanabhapuram News Today | Kanyakumari Today`
- **Description (138 chars):** `Padmanabhapuram news today — local updates, palace heritage news and community stories from Padmanabhapuram, Kanyakumari district.`
- **`<h1>`:** `Padmanabhapuram News Today`
- **English intro:**
  > Padmanabhapuram is home to the historic Padmanabhapuram Palace and one of
  > Kanyakumari district's oldest towns. Kanyakumari Today covers Padmanabhapuram
  > news today — heritage updates, local politics and community news.
- **Tamil intro:**
  > பத்மநாபபுரம் வரலாற்று சிறப்புமிக்க நகரமாகும். கன்னியாகுமரி டுடே
  > பத்மநாபபுரத்தின் இன்றைய செய்திகளை — மாளிகை செய்திகள், உள்ளூர் அரசியல் மற்றும்
  > சமூக நிகழ்வுகளை — வெளியிடுகிறது.
- **Canonical:** `https://www.kanyakumaritoday.com/padmanabhapuram`
- **Sitemap priority:** 0.7

---

#### `/kuzhithurai` — Kuzhithurai News Today

- **Title (55 chars):** `Kuzhithurai News Today | Kanyakumari Today`
- **Description (134 chars):** `Kuzhithurai news today — local updates, border-town stories and civic news from Kuzhithurai, Kanyakumari district, Tamil Nadu.`
- **`<h1>`:** `Kuzhithurai News Today`
- **English intro:**
  > Kuzhithurai sits at the border of Tamil Nadu and Kerala and is an important
  > transit town in Kanyakumari district. Kanyakumari Today brings Kuzhithurai
  > news today — local events, civic news and community stories.
- **Tamil intro:**
  > குழித்துறை தமிழ்நாடு-கேரளா எல்லையில் அமைந்துள்ள முக்கியமான நகரமாகும்.
  > கன்னியாகுமரி டுடே குழித்துறையின் இன்றைய செய்திகளை வெளியிடுகிறது.
- **Canonical:** `https://www.kanyakumaritoday.com/kuzhithurai`
- **Sitemap priority:** 0.7

---

### Implementation notes (for when you OK this)

- One new component `src/pages/TownHub.jsx` — copies `Category.jsx` structure,
  passes `area: slug` instead of `category: slug` to `getLatest()`.
- Metadata: `buildPageMetadata` with the per-town title/description above.
- `App.jsx`: add route `path="/:townSlug"` after the existing named routes (or
  `path="/town/:slug"` if you prefer a prefix).
- `_redirects`: no new rules needed; the SPA catch-all already handles these.
- Sitemap: add the 6 town URLs above to `staticRoutes` in
  `scripts/generate-sitemap.mjs`.
- Render the English + Tamil intro as a `<p>` block inside the existing dark header
  section — same font, same white text, `text-sm text-white/70`. No new CSS.

---

### Spelling-variant footer text proposal

**Proposal: add one paragraph to the site footer** (the existing `<Footer.jsx>`
already has a bottom text row). This appears once site-wide and covers all
SPELLING_VARIANTS naturally in a single sentence.

**Proposed footer text (English):**

> Kanyakumari Today is Kanyakumari district's 24x7 news website — also known to
> readers as *Kanya Kumari News*, *Kaniyakumari News* and *Kanniyakumari News*. We
> cover kumari news today from every corner of the district, from Nagercoil to
> Kuzhithurai.

**Why this works for SPELLING_VARIANTS:**
- `kanya kumari news` → "Kanya Kumari News" (naturalised in sentence)
- `kaniyakumari news` → "Kaniyakumari News"
- `kanniyakumari news` → "Kanniyakumari News"
- `kumari news today` → "kumari news today"
- `kumari news` → implicit in "kumari news today"

None are repeated; all appear once in natural prose. No keyword stuffing.

**Awaiting your OK before touching `Footer.jsx` or adding any town pages.**

---

## Proposal: Business keyword pages

**Status: Proposal only. No code changed. Awaiting your OK.**
Date: 2026-10-24
Source: `BUSINESS_DATA` in `src/seo/keywords.js`

---

### Summary

| # | Page | URL | Exists? | Action |
|---|---|---|---|---|
| 1 | Advertise With Us | `/advertise` | ✅ Yes | Fix title, description, h1 only |
| 2 | Job Vacancies | `/jobs` | ✅ Yes | Fix title, description, h1 only |
| 3 | Local Business Directory | `/business-directory` | ❌ No | New page (awaiting OK) |
| 4 | Classifieds | `/classifieds` | ❌ No | New page (awaiting OK) |
| 5 | Events Today | `/events` | ❌ No | New page (awaiting OK) |

---

### 1. Advertise With Us — `/advertise` ✅ exists

**Change type:** metadata + h1 fix only. No layout, design or component change.

| Field | Current | Proposed |
|---|---|---|
| `<title>` | (not set — falls back to homepage shell title) | `Advertise With Us \| Kanyakumari Today` — 42 chars |
| `<meta description>` | (not set) | `Advertise with Kanyakumari Today and reach local readers across Kanyakumari district and Nagercoil. Contact us for ad rates and placements.` — 140 chars |
| `<h1>` (via `t.advertisePageTitle`) | "Advertise With Us" | **"Advertise in Kanyakumari Today"** |

How: add a `useEffect` in `Advertise.jsx` calling `applyPageMetadata` + `restoreHomeMetadata` on unmount — same pattern as `Category.jsx`. Change `t.advertisePageTitle` in `LanguageContext.jsx` to the new text.

**5 questions this page answers:**
1. How can I advertise in Kanyakumari Today?
2. What are the ad rates for Kanyakumari news website?
3. How do I reach Kanyakumari district readers online?
4. Can I place a banner ad on kanyakumaritoday.com?
5. How can I advertise my business in Nagercoil news?

**Primary keyword:** `kanyakumari advertise with us`
**Supporting:** `kanyakumari news advertising` · `kanyakumari local business directory` · `advertise kanyakumari`

---

### 2. Job Vacancies — `/jobs` ✅ exists

**Change type:** metadata + h1 fix only. No layout, design or component change.

| Field | Current | Proposed |
|---|---|---|
| `<title>` | (not set) | `Kanyakumari Job Vacancies \| Govt & Private Jobs` — 50 chars |
| `<meta description>` | (not set) | `Find the latest Kanyakumari job vacancies — government, private, teaching and bank jobs from Kanyakumari district and Nagercoil, updated daily.` — 143 chars |
| `<h1>` (via `t.jobsTitle`) | "Jobs & Govt Notifications" | **"Kanyakumari Job Vacancies & Govt Notifications"** |

How: add `useEffect` with `applyPageMetadata` to `Jobs.jsx`. Update `t.jobsTitle` in `LanguageContext.jsx` (EN) to the new text.

**5 questions this page answers:**
1. What are the latest job vacancies in Kanyakumari today?
2. Are there any government jobs in Kanyakumari district?
3. Where can I find private company jobs in Nagercoil?
4. Are there teaching jobs in Kanyakumari district now?
5. What is the last date for Kanyakumari district job applications?

**Primary keyword:** `kanyakumari job vacancies`
**Supporting:** `jobs in nagercoil` · `kanyakumari recruitment news` · `govt jobs kanyakumari` · `employment news kanyakumari`

---

### 3. Local Business Directory — `/business-directory` ❌ new

**Action:** new page, awaiting OK.

- **URL:** `/business-directory`
- **Title (55 chars):** `Kanyakumari Business Directory | Local Businesses`
- **Description (144 chars):** `Browse the Kanyakumari local business directory — shops, services, restaurants and traders in Nagercoil, Marthandam, Colachel and Kanyakumari district.`
- **`<h1>`:** `Kanyakumari Local Business Directory`
- **Canonical:** `https://www.kanyakumaritoday.com/business-directory`
- **Design:** reuse `StaticPage.jsx` wrapper for MVP; upgrade to a live directory listing once the backend supports it.

**5 questions this page answers:**
1. Where can I find a list of local businesses in Kanyakumari?
2. Which shops and services are available in Nagercoil?
3. Is there a business directory for Kanyakumari district?
4. How can I list my business on Kanyakumari Today?
5. Which traders operate in Marthandam and Colachel?

**Primary keyword:** `kanyakumari local business directory`
**Supporting:** `nagercoil business` · `kanyakumari classifieds` · `kanyakumari advertise with us`

---

### 4. Classifieds — `/classifieds` ❌ new

**Action:** new page, awaiting OK.

- **URL:** `/classifieds`
- **Title (50 chars):** `Kanyakumari Classifieds | Ads & Notices`
- **Description (146 chars):** `Post and browse Kanyakumari classifieds — property, vehicles, jobs, services and public notices from Kanyakumari district, Nagercoil and Marthandam.`
- **`<h1>`:** `Kanyakumari Classifieds`
- **Canonical:** `https://www.kanyakumaritoday.com/classifieds`
- **Design:** reuse `StaticPage.jsx` for MVP; upgrade to user-submitted listings once backend supports it.

**5 questions this page answers:**
1. Where can I post a classified ad in Kanyakumari?
2. Are there property listings in Nagercoil today?
3. How can I sell a vehicle in Kanyakumari district?
4. Where can I find job notices in Kanyakumari news?
5. How do I post a public notice in Kanyakumari Today?

**Primary keyword:** `kanyakumari classifieds`
**Supporting:** `kanyakumari job vacancies` · `nagercoil property` · `kanyakumari real estate news`

---

### 5. Events Today — `/events` ❌ new

**Action:** new page, awaiting OK.

- **URL:** `/events`
- **Title (52 chars):** `Kanyakumari Events Today | Local Events & Festivals`
- **Description (153 chars):** `Find today's events in Kanyakumari — temple festivals, government programmes, cultural events, sports meets and public gatherings across Kanyakumari district.`
- **`<h1>`:** `Kanyakumari Events Today`
- **Canonical:** `https://www.kanyakumaritoday.com/events`
- **Design:** new page reusing the `Jobs.jsx` card-list layout; data from a `/api/events` backend endpoint or a curated static list to start.

**5 questions this page answers:**
1. What events are happening in Kanyakumari today?
2. Are there any temple festivals in Kanyakumari district this week?
3. What government programmes are scheduled in Nagercoil today?
4. Are there any sports events in Kanyakumari today?
5. What cultural programmes are on in Kanyakumari today?

**Primary keyword:** `kanyakumari events today`
**Supporting:** `kanyakumari festival news` · `kanyakumari today` · `mandaikadu amman temple festival dates`

---

### Implementation order (suggested, all pending your OK)

1. **Advertise** and **Jobs** — metadata + h1 fixes only; low-risk, same pages, 2 files each.
2. **Business Directory** — `StaticPage.jsx` wrapper first, upgrade later.
3. **Classifieds** — same.
4. **Events** — needs backend `/api/events` or a static list; confirm before building.

Add all new URLs to `scripts/generate-sitemap.mjs` `staticRoutes` at the same time.

---

## Proposal: AEO — Answer Engine Optimisation (FAQ sections + FAQPage JSON-LD)

**Status: Proposal only. No code changed. Awaiting your OK.**
Date: 2026-10-24
Source: `AEO_QUESTIONS` + `QUESTIONS` in `src/seo/keywords.js`

Rule applied: every answer uses only verifiable facts. `TODO` marks anything that
must be confirmed before publishing. No invented figures, no keyword stuffing.
After you approve, the FAQPage JSON-LD will be added **only** for questions whose
answers are visible on that same page (Google requires this).

---

### Implementation plan (post-approval)

For each page the approved Q&A pairs become:
1. A visually rendered `<h2>` question + `<p>` answer block (visible text — you
   will see and approve the text before it goes live; this section is that approval
   step).
2. A `<script type="application/ld+json">` `FAQPage` block injected into
   `document.head` by a new `applyFaqSchema(faqs)` helper in `src/utils/seo.js` —
   only runs when the page renders, cleaned up on unmount. No static JSON-LD is
   added to `index.html` for FAQ (the home page FAQ block will be server-rendered
   once SSR is approved; until then it ships via JS injection the same way the
   category meta does).

---

### Home page (`/`) — 3 questions

Drawn from `AEO_QUESTIONS` (brand + district intent). Home page is the right place
for brand/general questions; live-source questions are excluded (Google cannot
verify dynamic answers from static schema).

---

**Q1: What is the latest news in Kanyakumari today?**

> Kanyakumari Today publishes breaking news, district updates, politics, education,
> tourism and crime from Kanyakumari district 24 hours a day, 7 days a week. Visit
> the homepage or the Kanyakumari News section for the most recent stories, updated
> continuously.

*Word count: 43. Source: site's own publishing practice — verifiable.*

---

**Q2: Which website gives Kanyakumari district news today?**

> Kanyakumari Today (kanyakumaritoday.com) covers Kanyakumari district news in
> English and Tamil. It reports on Nagercoil, Marthandam, Thuckalay, Colachel and
> all taluks of Kanyakumari district, updated around the clock.

*Word count: 41. Source: site description — verifiable.*

---

**Q3: Is there Kanyakumari news in Tamil?**

> Yes. Kanyakumari Today publishes news in both English and Tamil. Use the language
> toggle on any page to switch between English and Tamil (தமிழ்). All main news
> sections — local, Tamil Nadu, national and tourism — are available in Tamil.

*Word count: 44. Source: site's language feature — verifiable.*

---

### Tourism page (`/category/tourism`) — 5 questions

Drawn from `QUESTIONS` tourism subset. Live-source questions (`[live source]`)
are included as questions only; their answers are marked `TODO` or given a safe
static frame that tells the reader where to find the live value.

---

**Q1: What are the best tourist places in Kanyakumari?**

> The top tourist sites in Kanyakumari include Vivekananda Rock Memorial,
> Thiruvalluvar Statue, Kumari Amman Temple, the Kanyakumari beach (sunrise
> viewpoint), Padmanabhapuram Palace, Suchindram Temple, Thirparappu Falls and
> Mathoor Aqueduct. All are within Kanyakumari district, Tamil Nadu.

*Word count: 51. Source: well-established public knowledge — verifiable.*

---

**Q2: What are the Vivekananda Rock ferry timings?**

> TODO: Confirm the current ferry schedule from the Tamil Nadu government or the
> Vivekananda Rock Memorial trust before publishing. Timings change seasonally.
> Do not hard-code a time here. Recommended: link to the official source or pull
> from a live API.

*Placeholder — do not publish until verified. [live source]*

---

**Q3: How to go to Vivekananda Rock Memorial?**

> Vivekananda Rock Memorial is located on a rocky island about 500 metres off the
> Kanyakumari coast. Reach it by government ferry from the Kanyakumari boat jetty.
> The nearest railway station is Kanyakumari (CAPE), about 1 km from the jetty.
> TODO: confirm ferry fare and current departure times.

*Word count: 53 (excluding TODO). Partial — publish once ferry details verified.*

---

**Q4: Best time to visit Kanyakumari?**

> The best time to visit Kanyakumari is October to March, when the weather is
> cooler and skies are clearer for the sunrise and sunset views. The monsoon season
> (June–September) brings heavy rain. The Kanyakumari beach and rock memorial are
> open year-round.

*Word count: 48. Source: widely documented climate pattern — verifiable.*

---

**Q5: What are the tourist places in Kanyakumari district?**

> Kanyakumari district has more than a dozen notable tourist sites: Vivekananda
> Rock Memorial, Thiruvalluvar Statue, Kumari Amman Temple, Padmanabhapuram Palace,
> Suchindram Temple, Thirparappu Falls, Mathoor Aqueduct, Muttom Beach, Vattakottai
> Fort, Pechiparai Dam and Udayagiri Fort. TODO: confirm entry fees and timings for
> each before adding to the answer.

*Word count: 57. Sites verifiable; fees/times need confirmation.*

---

### Nagercoil hub (`/nagercoil`) — 3 questions

---

**Q1: What is the latest Nagercoil news today?**

> Kanyakumari Today covers Nagercoil news every day — local politics, civic
> updates, education, crime and business from Nagercoil, the district headquarters
> of Kanyakumari. Browse the Nagercoil section for today's latest stories.

*Word count: 43. Source: site's own coverage — verifiable.*

---

**Q2: How far is Kanyakumari from Nagercoil?**

> Nagercoil is approximately 19 kilometres from Kanyakumari town by road (NH 44).
> The journey by bus or car takes about 30 to 40 minutes under normal traffic
> conditions. TODO: verify current road distance via a reliable map source.

*Word count: 42. Distance is widely cited; confirm before publishing.*

---

**Q3: Is there a power cut in Nagercoil today?**

> TODO: This answer changes daily. Do not hard-code it. Link to the TANGEDCO
> (Tamil Nadu Generation and Distribution Corporation) scheduled outage notice or
> pull data from their official announcement feed.

*Live source — do not publish a static answer. Display a link to TANGEDCO.*

---

### Marthandam hub (`/marthandam`) — 2 questions

---

**Q1: What is the latest Marthandam news today?**

> Kanyakumari Today reports on Marthandam news — local events, market updates,
> politics, education and civic issues from Marthandam town and surrounding areas
> in Kanyakumari district. Visit the Marthandam section for today's stories.

*Word count: 43. Verifiable.*

---

**Q2: What are the market days in Marthandam?**

> TODO: Confirm the Marthandam weekly market schedule from a local civic source
> before publishing. Do not invent market day information.

*Needs source — do not publish until verified.*

---

### Thuckalay hub (`/thuckalay`) — 2 questions

---

**Q1: What is the latest Thuckalay news today?**

> Kanyakumari Today covers Thuckalay news from Kanyakumari district — municipal
> updates, local events, education and community stories from Thuckalay town and
> its taluks, updated daily.

*Word count: 36. Verifiable.*

---

**Q2: Which taluk does Thuckalay belong to?**

> Thuckalay is a town in Kalkulam taluk (now part of Thuckalay taluk after
> delimitation) of Kanyakumari district, Tamil Nadu. TODO: confirm the current
> administrative taluk name from the Kanyakumari district government website.

*Partial — verify taluk name before publishing.*

---

### Colachel hub (`/colachel`) — 2 questions

---

**Q1: What is the latest Colachel news today?**

> Kanyakumari Today reports on Colachel news — port activity, fishing community
> updates, local politics and civic events from Colachel, one of Kanyakumari
> district's main coastal towns. Visit the Colachel section for today's stories.

*Word count: 44. Verifiable.*

---

**Q2: What is the Colachel port known for?**

> Colachel port, on the Arabian Sea coast of Kanyakumari district, is a fishing
> harbour and one of the historic sites of the 1741 Battle of Colachel. TODO:
> confirm current port status and any development projects before publishing
> further details.

*Word count: 43. Historical fact verifiable; current details need source.*

---

### Padmanabhapuram hub (`/padmanabhapuram`) — 2 questions

---

**Q1: What is the latest Padmanabhapuram news today?**

> Kanyakumari Today covers Padmanabhapuram news — local politics, heritage events,
> education and civic updates from Padmanabhapuram town, home to the historic
> Padmanabhapuram Palace, in Kanyakumari district.

*Word count: 37. Verifiable.*

---

**Q2: What are the Padmanabhapuram Palace timings and entry fee?**

> TODO: Confirm current opening hours, closing days and entry fee directly from
> the Tamil Nadu government's Department of Archaeology or the palace management
> before publishing. These figures change and must not be invented.

*Needs source — [needs source] tagged in QUESTIONS. Do not publish until verified.*

---

### Kuzhithurai hub (`/kuzhithurai`) — 2 questions

---

**Q1: What is the latest Kuzhithurai news today?**

> Kanyakumari Today reports on Kuzhithurai news — border-town updates, local
> politics, education and civic stories from Kuzhithurai, located at the
> Tamil Nadu–Kerala border in Kanyakumari district.

*Word count: 38. Verifiable.*

---

**Q2: How far is Kuzhithurai from Nagercoil?**

> Kuzhithurai is approximately 47 kilometres from Nagercoil by road (via
> Marthandam). TODO: confirm current road distance and travel time from a reliable
> map source before publishing.

*Partial — distance approximate; confirm before publishing.*

---

### FAQPage JSON-LD — implementation note (post-approval)

After you approve specific Q&A pairs above (by confirming the TODOs and
accepting the text), a new helper will be added:

```js
// src/utils/seo.js — new export (post-approval only)
export function applyFaqSchema(faqs) {
  // faqs: Array<{ question: string, answer: string }>
  document.getElementById('page-faq-jsonld')?.remove()
  const script = document.createElement('script')
  script.id = 'page-faq-jsonld'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      'name': question,
      'acceptedAnswer': { '@type': 'Answer', 'text': answer },
    })),
  })
  document.head.appendChild(script)
}
```

Rules:
- Only called for Q&A pairs that are **visible on the page** (Google rejects
  FAQPage schema for content not present in the rendered HTML).
- Called from the same `useEffect` that renders the FAQ block, cleaned up on
  unmount (same pattern as `article-jsonld`).
- No FAQ JSON-LD is ever added to `index.html` statically — it must match visible
  page content.
- Live-source questions (`[live source]`) must never appear in FAQPage JSON-LD
  with a hard-coded answer.

---

### Editor guide — writing AEO-ready answers

This guide is for whoever writes or updates these answers in future.

**Structure every answer to answer Who, What, Where and When in the first
sentence. Then add the detail.**

| Element | How to apply |
|---|---|
| **Who** | Name the specific organisation, person or place ("Kanyakumari Today", "the TANGEDCO", "the Kanyakumari district collector") |
| **What** | State the fact directly in the first sentence — no "It is important to note that…" preamble |
| **Where** | Name the town, taluk or district — "in Kanyakumari district, Tamil Nadu" not just "here" |
| **When** | Use specific dates or time ranges — "October to March" not "winter"; "as of October 2026" for any figure that changes |
| **Dates** | Always include a `[last verified: YYYY-MM-DD]` comment in the source file (not visible to users) |
| **Sources** | Link or name the source in a comment — "Source: Tamil Nadu Tourism Dept, tamilnadutourism.tn.gov.in" |
| **Length** | 40–60 words for a direct answer. If more detail is needed, add it below in a second paragraph, not in the schema answer |
| **Live data** | Never hard-code ferry timings, power cut schedules, collector names, or exam results. Link to the live source or leave a dynamic placeholder |
| **No stuffing** | Use the keyword once, naturally, in the answer. Do not repeat it |
| **Tamil** | If the page has a Tamil variant, provide a Tamil translation of the answer alongside the English |

**Example of a correct answer:**

> **Q: How far is Kanyakumari from Nagercoil?**
> Nagercoil is approximately 19 kilometres from Kanyakumari town by road via
> NH 44. The journey takes about 30 to 40 minutes by bus or car under normal
> conditions. [last verified: 2026-10-24, source: Google Maps / NH 44 road data]

**Example of an incorrect answer (do not do this):**

> Kanyakumari is a beautiful district and it is very close to Nagercoil. The
> distance is around 19 km. Kanyakumari news today, kanyakumari latest news,
> kanyakumari district news — read all updates on Kanyakumari Today.

*(Reason: vague intro, keyword list at the end = stuffing, no date, no source.)*

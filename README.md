# Kanyakumari Today — Public News Portal

React 18 + Vite public frontend for **[kanyakumaritoday.com](https://www.kanyakumaritoday.com/)** — a local news website covering Kanyakumari district, Tamil Nadu, India and world headlines.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Project Structure](#2-project-structure)
3. [Configuration](#3-configuration)
4. [Backend Integration](#4-backend-integration)
5. [SEO Overhaul](#5-seo-overhaul)
   - 5.1 [What Was Changed](#51-what-was-changed)
   - 5.2 [index.html Head Tags](#52-indexhtml-head-tags)
   - 5.3 [Structured Data (JSON-LD)](#53-structured-data-json-ld)
   - 5.4 [Sitemaps](#54-sitemaps)
   - 5.5 [robots.txt](#55-robotstxt)
   - 5.6 [PWA Manifest](#56-pwa-manifest)
   - 5.7 [Netlify Redirects](#57-netlify-redirects)
   - 5.8 [Sitemap Generation Script](#58-sitemap-generation-script)
6. [Google Search Console Setup](#6-google-search-console-setup)
7. [Assets Still Needed](#7-assets-still-needed)
8. [Per-Article SEO (Next Step)](#8-per-article-seo-next-step)
9. [Prerendering / SSR Recommendation](#9-prerendering--ssr-recommendation)
10. [Local SEO Checklist](#10-local-seo-checklist)
11. [Validation & Testing](#11-validation--testing)
12. [Build & Deploy](#12-build--deploy)

---

## 1. Quick Start

```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # ESLint
npm test           # Node built-in test runner
```

---

## 2. Project Structure

```
kanyakumari-news-frontend/
├── public/
│   ├── _redirects          # Netlify redirect rules (https+www enforcement)
│   ├── robots.txt          # Crawler directives + sitemap pointers
│   ├── sitemap.xml         # Static-route sitemap
│   ├── news-sitemap.xml    # Google News sitemap (regenerate daily)
│   ├── site.webmanifest    # PWA / Add-to-Home-Screen manifest
│   ├── logo.png            # Site logo (also used as icon fallback)
│   └── og-image.jpg        # ⚠ NEEDS TO BE CREATED — see §7
├── scripts/
│   ├── generate-sitemap.mjs  # Sitemap generator (static + live articles)
│   └── step4-browser.mjs     # E2E browser test
├── src/
│   ├── api/client.js
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/newsService.js
│   └── main.jsx
├── index.html              # Head tags, JSON-LD, GTM, noscript fallback
├── SEO-NOTES.md            # Detailed SEO implementation notes
└── package.json
```

---

## 3. Configuration

All sensitive URLs are kept out of source code and out of the browser bundle.

```bash
# Copy .env.example to .env (gitignored — never commit this file)
cp .env.example .env
```

| Variable | Where it's used | How to set it |
|---|---|---|
| `VITE_DEV_API_PROXY_TARGET` | Vite dev server proxy only | `.env` locally |
| `SITEMAP_API_BASE_URL` | `scripts/generate-sitemap.mjs` only | `.env` locally or CI env |
| `API_PROXY_TARGET` | Netlify `_redirects` proxy rule | Netlify dashboard → Environment variables |

The frontend bundle **never contains the backend URL**. All API calls go to `/api` on the same origin; the proxy forwards them server-side.

Production hosting must forward these paths to the backend:

```
/api/*
/uploads/*
```

---

## 4. Backend Integration

The backend is the canonical source for all content. API calls flow through `src/api/client.js` → `src/services/newsService.js`.

| Feature | What the backend provides |
|---|---|
| Home page | Aggregates, hero, latest, category rails, breaking ticker, trending, gallery, videos |
| Category pages | Category and area-filtered articles |
| Article pages | Article detail, media, author, tags, comments, related content, runtime SEO metadata |
| Search | Query, category, sort, limit parameters |
| Jobs / Weather / Tourism | District info, tourist attractions, weather widget data |
| Contact form | Form submission endpoint |

---

## 5. SEO Overhaul

A full production SEO implementation was applied to this repository. The goal is to rank #1 on Google for:

> **kanyakumari news · kanyakumari news today · kanyakumari today · kanyakumari latest news · nagercoil news** and their Tamil equivalents.

### 5.1 What Was Changed

| File | Action | Summary |
|---|---|---|
| `index.html` | Rewritten | 60+ ordered head tags, JSON-LD `@graph`, noscript fallback |
| `public/sitemap.xml` | Rewritten | Correct domain (`kanyakumaritoday.com`), `lastmod`, all real routes |
| `public/news-sitemap.xml` | Created | Google News sitemap stub (regenerate daily from backend) |
| `public/robots.txt` | Rewritten | Correct domain, AI-crawler blocks, two Sitemap pointers |
| `public/site.webmanifest` | Created | PWA manifest, standalone display, `#C8102E` theme |
| `public/_redirects` | Updated | http→https + non-www→www 301, static file passthrough rules |
| `scripts/generate-sitemap.mjs` | Created | Node 18+ sitemap generator with optional live article fetch |
| `package.json` | Updated | Added `generate:sitemap` script |
| `SEO-NOTES.md` | Created | Full notes, manual next steps, asset checklist |

---

### 5.2 `index.html` Head Tags

The `<head>` is rebuilt in this order (no duplicates):

```
charset → viewport → title → description → keywords → robots directives
→ canonical + hreflang → publisher/branding meta → geo meta
→ google-site-verification → Open Graph → Twitter Card
→ icons/manifest → sitemap link → RSS link
→ preconnect/dns-prefetch → fonts → JSON-LD → GTM/GA4
```

**Key values:**

| Tag | Value |
|---|---|
| `<title>` | `Kanyakumari News Today \| Latest Kanyakumari & Nagercoil News` |
| `description` | 158-char description covering all topic verticals |
| `canonical` | `https://www.kanyakumaritoday.com/` |
| `og:image` | `https://www.kanyakumaritoday.com/og-image.jpg` (1200×630) |
| `twitter:card` | `summary_large_image` |
| `geo.region` | `IN-TN` |
| `geo.position` | `8.0883;77.5385` (Kanyakumari) |

**Preserved exactly (not modified):**

- `<meta name="google-site-verification" content="NxxrDNw42FGmfOHpXggbBkJhrimufkWYAmHcWU8Bbms">`
- GTM head script `GTM-KLMXK79Q`
- GTM body `<noscript>` iframe `GTM-KLMXK79Q`
- `<meta name="theme-color" content="#C8102E">`

---

### 5.3 Structured Data (JSON-LD)

One `<script type="application/ld+json">` with an `@graph` containing five nodes:

| Schema type | `@id` | Purpose |
|---|---|---|
| `NewsMediaOrganization` | `#organization` | Publisher identity, logo, areaServed, sameAs social links |
| `WebSite` | `#website` | Site name, language, publisher ref, `SearchAction` |
| `WebPage` | `#webpage` | Home page entity, primaryImageOfPage, dateModified |
| `BreadcrumbList` | `#breadcrumb` | Home breadcrumb |
| `ItemList` | `#categories` | 12 news category links for Google rich results |

> **After deploying**, validate at [Rich Results Test](https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.kanyakumaritoday.com%2F).

---

### 5.4 Sitemaps

#### `public/sitemap.xml` — static routes

All URLs use `https://www.kanyakumaritoday.com`. Priority scheme:

| Page type | Priority | changefreq |
|---|---|---|
| Home `/` | 1.0 | hourly |
| Category pages | 0.9 | daily |
| Utility pages (jobs, e-paper, tourist-info) | 0.7 | daily |
| Organisation pages (about, contact, advertise, careers) | 0.5 | monthly |
| Legal pages (privacy, terms, disclaimer, cookies) | 0.3 | monthly |

#### `public/news-sitemap.xml` — Google News format

This file must be **regenerated daily** from the backend. It must contain only articles published within the last **48 hours**. Use the generation script:

```bash
# Regenerate sitemaps manually
npm run generate:sitemap

# Or wire it into the build
# package.json: "build": "vite build && node scripts/generate-sitemap.mjs"
```

Set `SITEMAP_API_BASE_URL` in your server or CI environment (never in a committed file) for the script to fetch live articles.

---

### 5.5 `robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /search?
Disallow: /*?utm_

# AI training crawlers blocked
User-agent: GPTBot / CCBot / anthropic-ai / Claude-Web → Disallow: /

# Google crawlers explicitly allowed
User-agent: Googlebot / Googlebot-News / Googlebot-Image → Allow: /

Crawl-delay: 5

Sitemap: https://www.kanyakumaritoday.com/sitemap.xml
Sitemap: https://www.kanyakumaritoday.com/news-sitemap.xml
```

---

### 5.6 PWA Manifest

`public/site.webmanifest` enables **Add to Home Screen** on mobile:

```json
{
  "name": "Kanyakumari Today",
  "short_name": "KK Today",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#C8102E",
  "background_color": "#ffffff",
  "lang": "en-IN"
}
```

---

### 5.7 Netlify Redirects

`public/_redirects` enforces a single canonical URL:

```
# Redirect http and non-www → https://www
http://kanyakumaritoday.com/*        → https://www.kanyakumaritoday.com/:splat  301!
http://www.kanyakumaritoday.com/*    → https://www.kanyakumaritoday.com/:splat  301!
https://kanyakumaritoday.com/*       → https://www.kanyakumaritoday.com/:splat  301!

# Serve SEO static files before the SPA catch-all
/sitemap.xml        200
/news-sitemap.xml   200
/robots.txt         200
/site.webmanifest   200

# SPA catch-all (must be LAST)
/*   /index.html   200
```

> **Important**: the static file passthrough rules must appear before the `/*` catch-all or Netlify will serve `index.html` instead of the XML/txt files.

---

### 5.8 Sitemap Generation Script

`scripts/generate-sitemap.mjs` is a Node 18+ script that:

1. Builds `public/sitemap.xml` from a hardcoded static-route array.
2. Optionally fetches live articles from the backend API and adds them to the sitemap.
3. Builds `public/news-sitemap.xml` with only articles from the last 48 hours.

```bash
# Run manually
npm run generate:sitemap

# Run as part of every build
# In package.json, change:
"build": "vite build && node scripts/generate-sitemap.mjs"

# Run as a cron job (every 6 hours on the server)
# Set SITEMAP_API_BASE_URL in the server environment, not here
0 */6 * * * cd /path/to/repo && node scripts/generate-sitemap.mjs
```

---

## 6. Google Search Console Setup

Follow these steps **after deploying** the updated files:

1. Go to [Google Search Console](https://search.google.com/search-console/).
2. Add property **`https://www.kanyakumaritoday.com/`** using the URL-prefix method.
3. Verify using the meta tag already in `index.html`:
   `NxxrDNw42FGmfOHpXggbBkJhrimufkWYAmHcWU8Bbms`
4. Submit sitemaps:
   - `https://www.kanyakumaritoday.com/sitemap.xml`
   - `https://www.kanyakumaritoday.com/news-sitemap.xml`
5. Use the **URL Inspection** tool → request indexing for the homepage.
6. Apply for [Google News Publisher Center](https://publishercenter.google.com/) to be eligible for the News carousel.

> **Domain mismatch warning**: all sitemap URLs and the canonical tag use `https://www.kanyakumaritoday.com` (with `www`). Your GSC property must be verified on this exact URL variant.

---

## 7. Assets Still Needed

These files are referenced in `index.html` but must be created by a designer:

| File | Size | Description |
|---|---|---|
| `public/og-image.jpg` | 1200×630 JPEG | OG/Twitter share image — site logo on `#C8102E` background with tagline |
| `public/favicon.ico` | 16×16 + 32×32 | Multi-resolution favicon |
| `public/favicon-32x32.png` | 32×32 PNG | Standard favicon |
| `public/favicon-16x16.png` | 16×16 PNG | Small favicon |
| `public/apple-touch-icon.png` | 180×180 PNG | iOS home screen icon |

Once created, update the `<link rel="icon">` tags in `index.html` to point to the correct files.

Also update these placeholder social profile URLs in `index.html` JSON-LD `sameAs` array:

```
https://www.facebook.com/kanyakumaritoday   ← replace with real page URL
https://twitter.com/kanyakumaritoday        ← replace with real handle
https://www.youtube.com/kanyakumaritoday    ← replace with real channel URL
```

And replace `@kanyakumaritoday` in the two Twitter meta tags with the real handle.

---

## 8. Per-Article SEO (Next Step)

Currently `index.html` carries the home-page head tags. Article pages need **dynamic** head tags per article. Recommended approach:

```bash
npm install react-helmet-async
```

Wrap `src/main.jsx` root in `<HelmetProvider>`, then in `src/pages/Article.jsx`:

```jsx
import { Helmet } from 'react-helmet-async';

// inside the component, after article data loads:
<Helmet>
  <title>{article.title} | Kanyakumari Today</title>
  <meta name="description" content={article.excerpt.slice(0, 160)} />
  <link rel="canonical" href={`https://www.kanyakumaritoday.com/article/${article.slug}`} />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": { "@type": "Person", "name": article.author },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "@id": "https://www.kanyakumaritoday.com/#organization"
    },
    "image": article.imageUrl,
    "mainEntityOfPage": `https://www.kanyakumaritoday.com/article/${article.slug}`,
    "articleSection": article.category,
    "inLanguage": "en-IN",
    "dateline": "Nagercoil, Kanyakumari"
  })}</script>
</Helmet>
```

---

## 9. Prerendering / SSR Recommendation

This is a Vite SPA — crawlers that do not execute JavaScript receive empty HTML. Googlebot does execute JS but with a delay. Options in order of effort:

| Option | Effort | Outcome |
|---|---|---|
| `vite-plugin-prerender` | Low | Static pre-render of known routes at build time |
| Netlify Edge Functions | Medium | On-demand SSR at the CDN edge, no framework change |
| Migrate to **Next.js** or **Astro** | High | Full SSR/ISR, built-in SEO primitives, image optimisation, per-article meta |

See `SEO-NOTES.md` for full details.

---

## 10. Local SEO Checklist

- [ ] Create/claim **Google Business Profile** at https://business.google.com/ for "Kanyakumari Today", Nagercoil, Tamil Nadu
- [ ] Submit to local directories: JustDial, Sulekha, IndiaMart, Tamil Nadu news directories
- [ ] Guest posts on Tamil Nadu political/tourism blogs with backlinks
- [ ] Press releases to Kanyakumari district PRO
- [ ] Request links from Kanyakumari Tourism Board website
- [ ] Register in Indian news aggregators (NewsPoint, DailyHunt, Inshorts partner programme)

---

## 11. Validation & Testing

| Tool | URL |
|---|---|
| Rich Results Test | https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.kanyakumaritoday.com%2F |
| PageSpeed Insights | https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.kanyakumaritoday.com%2F |
| Mobile-Friendly Test | https://search.google.com/test/mobile-friendly?url=https://www.kanyakumaritoday.com/ |
| OG Debugger (Facebook) | https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwww.kanyakumaritoday.com%2F |
| Twitter Card Validator | https://cards-dev.twitter.com/validator |
| XML Sitemap Validator | https://www.xml-sitemaps.com/validate-xml-sitemap.html |

```bash
# Local lint + build validation
npm run lint
npm run build

# E2E browser test (requires running backend)
# Set these in your local .env or shell — never commit real credentials
KKN_ADMIN_EMAIL=<email> \
KKN_ADMIN_PASSWORD=<password> \
KKN_ADMIN_URL=<local-admin-url> \
KKN_API_URL=<local-api-url> \
KKN_PUBLIC_URL=<local-public-url> \
node scripts/step4-browser.mjs
```

---

## 12. Build & Deploy

```bash
# Standard build (outputs to dist/)
npm run build

# Build + regenerate sitemaps
npm run build && npm run generate:sitemap

# Preview production build locally
npm run preview
```

Netlify picks up the build automatically on push to the main branch. The `public/_redirects` file is copied to `dist/` by Vite and processed by Netlify on deploy.

---

> For full implementation notes, asset checklist, and manual next steps, see [`SEO-NOTES.md`](./SEO-NOTES.md).

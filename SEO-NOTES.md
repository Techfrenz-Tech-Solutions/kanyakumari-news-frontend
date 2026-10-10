# SEO Implementation Notes — Kanyakumari Today

## Files Changed / Created

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modified | Full `<head>` rewrite: title, meta, OG, Twitter, JSON-LD, icons, feeds, GTM preserved |
| `public/sitemap.xml` | Modified | Full static-route sitemap using kanyakumaritoday.com domain |
| `public/news-sitemap.xml` | Created | Google News sitemap stub (regenerate daily from backend) |
| `public/robots.txt` | Modified | Correct domain, AI crawler blocks, Google explicit allow, 5s crawl-delay |
| `public/site.webmanifest` | Created | PWA manifest: standalone display, #C8102E theme |
| `public/_redirects` | Modified | Force https+www redirects, static file rules before SPA catch-all |
| `scripts/generate-sitemap.mjs` | Created | Node.js sitemap generator with optional live article API fetch |
| `SEO-NOTES.md` | Created | This file |

## Assets Still Needed

The following image assets are referenced in the head but must be created by a designer:

- **`/og-image.jpg`** (1200×630 JPEG) — OG/Twitter share image. Show the site logo on a branded red (`#C8102E`) background with headline text "Kanyakumari Today — Latest News". Place in `public/og-image.jpg`.
- **Proper favicon set** — The current `logo.png` is used as a fallback. Ideally create:
  - `public/favicon.ico` (multi-resolution: 16x16, 32x32)
  - `public/favicon-32x32.png`
  - `public/favicon-16x16.png`
  - `public/apple-touch-icon.png` (180x180)
- If `logo.png` is not square, a cropped/padded square variant will be needed for icons.

Add the corresponding `<link>` tags to `index.html` once the files are created.

## Social Handles to Replace

Search `index.html` for `@kanyakumaritoday` and replace with the real Twitter/X handle once confirmed. The `<!-- TODO: replace with real handle -->` comments mark the two locations.

Also update the JSON-LD `sameAs` URLs for Facebook, Twitter, and YouTube with the real profile URLs.

## Google Search Console

1. Go to https://search.google.com/search-console/
2. Add property `https://www.kanyakumaritoday.com/` (URL-prefix method)
3. Verify using the meta tag already present: `NxxrDNw42FGmfOHpXggbBkJhrimufkWYAmHcWU8Bbms`
4. Submit sitemaps:
   - `https://www.kanyakumaritoday.com/sitemap.xml`
   - `https://www.kanyakumaritoday.com/news-sitemap.xml`
5. Use URL Inspection tool to request indexing for the homepage

## Google News Publisher Center

Apply at https://publishercenter.google.com/ to get eligible for Google News carousel.
Requirements: original reporting, editorial guidelines, About/Contact pages (both exist), clear bylines.

## Validation & Testing URLs

- **Rich Results Test**: https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.kanyakumaritoday.com%2F
- **Open Graph debugger**: https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwww.kanyakumaritoday.com%2F
- **Twitter Card validator**: https://cards-dev.twitter.com/validator
- **PageSpeed Insights**: https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.kanyakumaritoday.com%2F
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly?url=https://www.kanyakumaritoday.com/
- **XML Sitemap validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## SPA / Prerendering Recommendation

The site currently serves empty HTML to crawlers that don't execute JavaScript (most non-Google crawlers, and even Googlebot benefits from pre-rendered HTML). Recommended options in order of effort:

1. **Vite plugin prerender** (`vite-plugin-prerender`): Low effort, static pre-render of known routes at build time. Good for stable routes like category pages.
2. **Netlify Edge Functions / On-Demand SSR**: Moderate effort. Render on the CDN edge for each request. No framework change needed.
3. **Migrate to Next.js or Astro**: High effort but best long-term outcome — full SSR/ISR, built-in SEO primitives, image optimisation, dynamic article pages with per-article meta tags and JSON-LD.

Priority: implement per-article `<title>`, `<meta name="description">`, and `NewsArticle` JSON-LD via React Helmet or a similar head manager — even in SPA mode, Googlebot will see these after JavaScript execution.

## Per-Article SEO (Recommended Next Step)

Install `react-helmet-async` and add dynamic head tags to `src/pages/Article.jsx`:
- `<title>` = article title + " | Kanyakumari Today"
- `<meta name="description">` = article excerpt (150–160 chars)
- `<link rel="canonical">` = `https://www.kanyakumaritoday.com/article/{slug}`
- `<script type="application/ld+json">` with `NewsArticle` schema including `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `image`

## Local SEO

- **Google Business Profile**: Create/claim at https://business.google.com/ for "Kanyakumari Today" in Nagercoil, Tamil Nadu.
- **Local directory listings**: Submit to JustDial, Sulekha, IndiaMart, and local Tamil Nadu news directories.
- **Backlink strategy**: Guest posts on Tamil Nadu political/tourism blogs, press releases to local government PRO, links from Kanyakumari Tourism Board.

## News-Sitemap Automation

The `scripts/generate-sitemap.mjs` script can be run:
- As a post-build step: add `"build": "vite build && node scripts/generate-sitemap.mjs"` to package.json
- As a daily cron on the server: `0 */6 * * * cd /path/to/repo && node scripts/generate-sitemap.mjs`
- Set `SITEMAP_API_BASE_URL` in your server or CI environment (never in a committed file) for live article data

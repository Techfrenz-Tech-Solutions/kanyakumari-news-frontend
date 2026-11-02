# Indexing Diagnosis — Kanyakumari Today

Diagnostic run against the live production host: `https://www.kanyakumaritoday.com`
Date: 2026-10-24 (UTC-equivalent run; site lastmod stamps say 2026-10-10).

This is a **read-only diagnosis**. No source files, configs, or build output were modified.
The only file created is this one (`INDEXING_DIAGNOSIS.md`).

---

## 1. App Router or Pages Router? — Neither.

This site is **not a Next.js project**, so the "App Router vs Pages Router" distinction does not
apply. Both terms belong to Next.js.

What this project actually is:

| Aspect | Value |
|---|---|
| Build tool | **Vite 5** (`vite build`, `vite preview`) — see `package.json`, `vite.config.js` |
| Framework | **React 18** (`react`, `react-dom`) |
| Routing | **`react-router-dom` 7.18.3** (client-side / SPA routing) |
| Rendering model | **Client-side rendered SPA**. There is no SSR and no SSG/prerender step. `vite build` emits a static `dist/index.html` shell plus JS chunks. |
| Hosting | **Netlify**, with SPA fallback routing via `public/_redirects` (`/*  /index.html  200`) |

Consequence (this is the heart of every finding below): because the host uses an SPA catch-all,
**every URL returns the exact same static `index.html` shell**. All per-page `<title>`, canonical,
`meta robots`, and visible headline text are injected at runtime by JavaScript inside the `<div id="root">`.
A `curl` (or Googlebot's first fetch, or the raw-HTML view in Search Console's URL Inspection)
sees only the generic homepage shell for every route.

---

## 2. Methodology

`curl` was run for each URL with the flags below, saving the body and response headers to temp
files, then extracting the fields with regex:

```
curl.exe -s -L -D <headers.txt> -o <body.html> `
  -w "STATUS:%{http_code}|EFFECTIVE:%{url_effective}|SIZE:%{size_download}" `
  "https://www.kanyakumaritoday.com<URL>"
```

Extracted from the raw HTML: `<title>`, `<link rel="canonical">`, `<meta name="robots">`,
any `noindex` token, `X-Robots-Tag` header, and every `<h1>` / `<h2>`.

Run from PowerShell on Windows; temp artifacts were created under `%TEMP%\kk_diag` and removed
afterwards (nothing was written to the project tree).

---

## 3. Per-URL findings

The body byte-size was **13331 for every single URL**, confirming all routes serve the identical
shell. `-L` followed the Netlify `http→https` and `non-www→www` 301s, ending at the `www` HTTPS
form shown under "Effective URL".

### /category/tourism
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/category/tourism`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்` (the homepage title — identical for all routes)
- **Canonical:** `https://www.kanyakumaritoday.com/` ← points to the homepage, **not** to itself
- **Noindex:** none. `meta robots` = `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`. No `X-Robots-Tag` header.
- **Headline text in raw HTML?** **No real headline.** The only `<h1>` in the raw HTML is the
  `<noscript>` fallback heading: `Kanyakumari News Today – Latest Kanyakumari & Nagercoil News`
  (same on every route). There are **0 `<h2>`** in raw HTML. The category heading that React
  renders (e.g. "Tourism") is **not** present as a heading. The word "Tourism" does appear, but
  only as anchor text in the `<noscript>` nav link `<a href="/category/tourism">Tourism</a>` and
  in the meta keywords — not as a page headline.

### /category/education
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/category/education`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்` (homepage title)
- **Canonical:** `https://www.kanyakumaritoday.com/` ← homepage, not self
- **Noindex:** none (`index, follow…`; no `X-Robots-Tag`).
- **Headline text in raw HTML?** **No real headline.** Same single `<noscript>` `<h1>`, 0 `<h2>`.
  "Education" appears only as a `<noscript>` nav link, not as the page heading.

### /category/tamil-nadu
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/category/tamil-nadu`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்` (homepage title)
- **Canonical:** `https://www.kanyakumaritoday.com/` ← homepage, not self
- **Noindex:** none (`index, follow…`).
- **Headline text in raw HTML?** **No real headline.** Same `<noscript>` `<h1>`, 0 `<h2>`.
  "Tamil Nadu" appears only as `<noscript>` nav link text.

### /category/tamilnadu-news
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/category/tamilnadu-news`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்` (homepage title)
- **Canonical:** `https://www.kanyakumaritoday.com/` ← homepage, not self
- **Noindex:** none (`index, follow…`).
- **Headline text in raw HTML?** **No real headline.** Same `<noscript>` `<h1>`, 0 `<h2>`.
  Note: this slug is **not** one of the categories in `sitemap.xml` or the `<noscript>` nav (those
  use `tamil-nadu`, "Tamil Nadu News"). The substring `tamilnadu` does **not** appear anywhere in
  the raw HTML, so there is not even a nav-link mention — this route is effectively an "unknown
  category" that React must resolve client-side.

### /article/tamilnadu-election
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/article/tamilnadu-election`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்` (homepage title)
- **Canonical:** `https://www.kanyakumaritoday.com/` ← homepage, **not** the article URL
- **Noindex:** none (`index, follow…`).
- **Headline text in raw HTML?** **No real headline.** Same `<noscript>` `<h1>`, 0 `<h2>`. The
  article's actual headline (whatever React fetches and renders) is **not** in the raw HTML at
  all. `election` appears only as a substring inside the `meta keywords` string, not as heading text.

### /index.html
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/index.html`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்`
- **Canonical:** `https://www.kanyakumaritoday.com/` ← self for the homepage (correct here)
- **Noindex:** none (`index, follow…`).
- **Headline text in raw HTML?** Yes, but only the `<noscript>` `<h1>`
  (`Kanyakumari News Today – Latest Kanyakumari & Nagercoil News`) and the Tamil `<p lang="ta">`
  intro. "Kanyakumari News" appears in that heading. This is the one route where the shell's
  default title/canonical actually match the page, by coincidence.

### /search?q=test
- **Status:** `200`
- **Effective URL:** `https://www.kanyakumaritoday.com/search?q=test`
- **`<title>`:** `Kanyakumari News Today | கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்` (homepage title)
- **Canonical:** `https://www.kanyakumaritoday.com/` ← homepage, **not** self
- **Noindex:** none in the HTML/headers (`index, follow…`). **However**, `robots.txt` contains
  `Disallow: /search?`, so Google is told **not to crawl** this URL at all (see §6 conflict note).
- **Headline text in raw HTML?** **No real headline.** Same `<noscript>` `<h1>`, 0 `<h2>`.
  "Search" appears only in the structured-data `SearchAction` / og props, not as a page heading.

---

## 4. Summary table

| URL | HTTP | `<title>` in raw HTML | Canonical in raw HTML | noindex? | Real page headline in raw HTML? |
|---|---|---|---|---|---|
| /category/tourism | 200 | homepage title | `…/` (home) | no | No — only noscript `<h1>` + nav link |
| /category/education | 200 | homepage title | `…/` (home) | no | No — only noscript `<h1>` + nav link |
| /category/tamil-nadu | 200 | homepage title | `…/` (home) | no | No — only noscript `<h1>` + nav link |
| /category/tamilnadu-news | 200 | homepage title | `…/` (home) | no | No — slug absent from HTML entirely |
| /article/tamilnadu-election | 200 | homepage title | `…/` (home) | no | No — article headline only renders via JS |
| /index.html | 200 | homepage title | `…/` (home, self) | no | Partial — noscript `<h1>` matches topic |
| /search?q=test | 200 | homepage title | `…/` (home) | no (but robots.txt `Disallow: /search?`) | No |

Key takeaways:
- **All 7 URLs return HTTP 200** with byte-identical bodies (13331 bytes) — the SPA shell.
- **No `noindex` anywhere** in HTML or `X-Robots-Tag` for the tested routes.
- **Every page's canonical points to the homepage `https://www.kanyakumaritoday.com/`.**
- **Every page shares the homepage `<title>`** and the homepage meta description.
- **No real per-page headline exists in the raw HTML** for any tested route — only the generic
  `<noscript>` `<h1>` that is identical everywhere.

---

## 5. Root-cause analysis (why these pages will struggle to index)

1. **Canonical collision → index collapse.** This is the single biggest problem. Every category
   and article page emits `<link rel="canonical" href="https://www.kanyakumaritoday.com/">`. Google
   treats a canonical tag as a "preferred version" signal. With every URL declaring the homepage as
   its canonical, Google will consolidate all of these URLs into the homepage and will **not** index
   the category/article pages as separate results. In Search Console's Coverage/Report this shows
   up as *"Duplicate without user-selected canonical"* or *"Alternate page with proper canonical
   tag."* No amount of "Request Indexing" in GSC fixes this until the canonicals are per-page.

2. **Client-side rendering with no prerender.** Because Vite produces a static SPA shell and Netlify
   serves that same shell for every route, the raw HTML carries no per-page content. Googlebot can
   execute JavaScript (a second rendering pass), so the visible content *can* eventually be seen,
   but: (a) the initial HTML crawl sees identical duplicate content for every URL, (b) JS rendering
   is delayed/queued, so indexing is slow and unreliable for a news site, and (c) the `<title>`,
   `meta description`, `canonical`, and `og:` tags injected by JS are read only on the second pass,
   while the canonical in the raw HTML (homepage) is read first and wins the consolidation battle.

3. **Duplicate titles & descriptions.** Every page shares the homepage title and description. Even
   with correct canonicals, Google relies on unique titles/descriptions to distinguish pages; identical
   ones across dozens of URLs further suppress individual indexing.

4. **No unique headline (`<h1>`) in raw HTML.** The only `<h1>` in every raw response is the
   `<noscript>` fallback heading about Kanyakumari/Nagercoil news. The category name and the article
   headline are rendered by JS and absent from the crawlable HTML, so there is no topically specific
   heading signal at fetch time.

5. **`news-sitemap.xml` is effectively empty.** It contains only a comment ("should be regenerated
   by the backend API daily") and **zero `<url>` entries**. So Google News / the news-sitemap is
   submitting nothing. Article URLs (like `/article/tamilnadu-election`) are not listed in either
   `sitemap.xml` (which is categories + utility pages only) or `news-sitemap.xml`. Google has no
   sitemap-based discovery path for articles.

6. **Unknown-slug category (`tamilnadu-news`).** This slug is not in `sitemap.xml`, not in the
   `<noscript>` nav, and the literal string `tamilnadu` does not appear in the shell. It only works
   if React resolves it at runtime. From a raw-HTML/indexing standpoint it looks like a route that
   returns the homepage shell with no unique signal at all.

---

## 6. Conflict & crawl-control notes

- **`robots.txt` vs meta robots on `/search`:** `robots.txt` says `Disallow: /search?`, so Google is
  instructed not to **crawl** search-result URLs. That is the correct intent (search results should
  not be indexed). But the served HTML for `/search?q=test` still carries `<meta name="robots"
  content="index, follow…">`. These disagree. The robots.txt `Disallow` wins for *crawling*, so this
  URL will not be fetched; if any `/search?q=` pages were indexed before the disallow, they can linger
  until a `noindex` (or URL removal) is applied. Cleanest fix: add `noindex, follow` to the search
  page at runtime (the `Disallow` already stops new crawling, but `noindex` makes intent explicit
  for any already-cached versions and for Bing/others).

- **`/*?utm_` disallow:** Fine — keeps UTM-tagged variants out of the index.

- **`_redirects` ordering is correct:** static SEO files (`sitemap.xml`, `news-sitemap.xml`,
  `robots.txt`, `site.webmanifest`) are served directly **before** the `/*  /index.html  200`
  catch-all, so they are not swallowed by the SPA fallback. Confirmed: `/sitemap.xml`,
  `/news-sitemap.xml`, and `/robots.txt` all resolve to their real static files (not the shell).

- **http→https and non-www→www 301s** are in place (good, single canonical host).

---

## 7. Google Search Console — how to actually get these pages indexed

The request is to analyse these page wordings/URLs for use in Google Search Console. The honest
answer: **submitting these URLs in GSC today will not index them**, because the canonical-tag and
content problems above make Google fold them into the homepage. GSC is a *reporting and request*
tool, not a render engine; "Request Indexing" only queues a crawl, and the crawl will hit the same
duplicate shell. Do the fixes first, then use GSC to verify.

### What to fix before touching GSC (priority order)
1. **Per-page self-referencing canonicals.** Each route must emit
   `<link rel="canonical" href="<its own absolute URL>">`. This is the #1 blocker. The canonical is
   currently a hardcoded homepage value in `index.html` that React's SEO util is presumably meant to
   override at runtime — but the raw HTML value Google reads first is the homepage one.
2. **Per-page `<title>` and `meta name="description">` in the server-delivered HTML** (not only via
   JS). Either prerender/SSG the routes, or move meta injection to the document head via the build.
3. **Prerender the route HTML** so the raw response for each category/article contains its real
   heading, title, and content. Options: a Vite prerender plugin, a static-generation pass at build,
   or migrating article pages to an SSG-capable setup. Without this, news indexing will stay slow and
   unreliable.
4. **`noindex` the search page.** Set `<meta name="robots" content="noindex, follow">` for `/search`
   (keep the `robots.txt` `Disallow: /search?` too). Search-result pages should not compete in the
   index.
5. **Populate `news-sitemap.xml`** from the backend so articles ≤48h old are submitted to Google
   News, and add article `<url>` entries (with `<lastmod>`, `<news:news>`) — currently it is empty.
6. **Resolve/redirect the `tamilnadu-news` slug** (it is not a canonical category anywhere). Either
   301 it to `/category/tamil-nadu` or make it a real category with its own metadata.

### How to use Google Search Console once the fixes are deployed
- **Add/verify property:** `https://www.kanyakumaritoday.com/` (URL-prefix or Domain property). The
  `google-site-verification` meta (`NxxrDNw42FGmfOHpXggbBkJhrimufkWYAmHcWU8Bbms`) is already in the
  shell, so verification should be straightforward.
- **Submit sitemaps:** `sitemap.xml` and `news-sitemap.xml` (after `news-sitemap.xml` is populated).
  Watch the sitemap report for "Discovered - currently not indexed" vs "Indexed".
- **URL Inspection → "View tested page" → "HTML" tab** for each of these seven URLs *after* the fix.
  Confirm the rendered/raw HTML now shows: the per-page `<title>`, a **self-referencing** canonical,
  the real `<h1>` headline, and (for `/search`) `noindex`. If the "HTML" tab still shows the homepage
  canonical/title, the fix did not take in the server-delivered HTML.
- **"Request Indexing"** per URL is only worthwhile *after* the canonicals are fixed. Requesting
  before that just re-crawls a duplicate-of-homepage and will be discarded.
- **Check Coverage/Pages report** for the "Duplicate without user-selected canonical" /
  "Alternate page with proper canonical tag" cluster — that cluster is the symptom of bug #1. It
  should shrink to near-zero once per-page canonicals are live.
- **For article URLs specifically:** submit via `news-sitemap.xml` (Google News) rather than relying
  on per-URL "Request Indexing", which has tight rate limits and is impractical for a news site.
- **Core Web Vitals / Page Experience:** note that JS-rendered content can affect LCP; prerendering
  also helps here.

### One-line interpretation of the request
"Index these pages in Google Search Console" → not a GSC-button problem. GSC will report these URLs
as duplicates of the homepage because their canonical points to the homepage and their raw HTML is
identical. Fix the per-page canonical/title/content (and fill the news sitemap), **then** GSC
sitemap submission + URL Inspection becomes effective.

---

## 8. Files changed

**None.** No source, config, build, or hosting files were modified. This diagnosis is read-only.
The only artifact produced is this file, `INDEXING_DIAGNOSIS.md`, per the request.

Tooling note: a temporary PowerShell helper and temp HTML/header files were written under
`%TEMP%\kk_diag` and removed after the run; nothing was written to the project tree other than this
document.

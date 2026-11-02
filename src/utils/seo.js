import { localizedField as textFor } from './article.js'

/**
 * metadataBase — the absolute origin every page canonical/OG URL is resolved
 * against. This is the SPA equivalent of Next.js `metadataBase` (this project
 * is Vite + react-router, not Next.js). Mirrors SITE.url / SITE.metadataBase in
 * src/seo/config.js; kept self-contained here (not imported from src/seo) so the
 * client bundle does not pull the build-time config/keywords layer into the
 * browser. Override with VITE_SITE_URL. Default is the canonical www URL
 * already used across index.html, robots.txt and the sitemaps.
 */
const METADATA_BASE = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  'https://www.kanyakumaritoday.com'
).replace(/\/$/, '')

/**
 * Resolve a site-relative path to an absolute, self-referencing canonical URL
 * against metadataBase. Absolute http(s) URLs pass through unchanged.
 * Guarantees a category/article canonical points at its own URL, never home.
 */
export function pageCanonical(path = '') {
  const p = String(path ?? '')
  if (/^https?:\/\//i.test(p)) return p
  const suffix = p.startsWith('/') ? p : p ? `/${p}` : ''
  return `${METADATA_BASE}${suffix}`
}

function truncateText(text, max) {
  const str = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (str.length <= max) return str
  return `${str.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}

/**
 * Build non-article page metadata (title capped at 60, description at 160,
 * self-referencing canonical). Used by category and static pages.
 */
export function buildPageMetadata({ title, description, path } = {}) {
  const pageTitle = String(title ?? '').trim()
  const builtTitle = pageTitle
    ? truncateText(`${pageTitle} | Kanyakumari Today`, 60)
    : 'Kanyakumari News Today | Kanyakumari Today'
  const builtDescription = truncateText(
    String(description ?? '').replace(/\s+/g, ' ').trim() ||
      'Latest Kanyakumari news today, Nagercoil updates and Kanyakumari district headlines from Tamil Nadu.',
    160
  )
  return { title: builtTitle, description: builtDescription, canonical: pageCanonical(path) }
}

/**
 * Per-slug category metadata derived from PAGE_MAP in src/seo/keywords.js.
 * Keys are backend category slugs (verified via /api/categories).
 * title/description are used by buildPageMetadata for that slug.
 * h1 is the PROPOSED heading text — not applied until the owner approves
 * the visible heading changes shown in KEYWORD_PLAN.md.
 *
 * Density note: primary keyword appears once in title and once in description
 * (~1–2 % of the ~25-word description). Never stuffed.
 */
export const CATEGORY_META = {
  kanyakumari: {
    title: 'Kanyakumari News Today – District Updates',
    description: 'Get the latest Kanyakumari news today — local district updates, breaking stories, politics, crime, education and more from Kanyakumari.',
    h1Proposed: 'Kanyakumari News Today',
  },
  'tamilnadu-news': {
    title: 'Tamil Nadu News Today | Kanyakumari Today',
    description: 'Read Tamil Nadu news today — the latest state politics, education, business and south Tamil Nadu headlines from Kanyakumari Today.',
    h1Proposed: 'Tamil Nadu News Today',
  },
  'national-news': {
    title: 'National News Today | Kanyakumari Today',
    description: 'Stay updated with national news today — India politics, government policies, economy and top India headlines from Kanyakumari Today.',
    h1Proposed: 'National News Today',
  },
  education: {
    title: 'Kanyakumari Education News | Latest Updates',
    description: 'Kanyakumari education news — school updates, exam results, college admissions and education policy from Kanyakumari district, Tamil Nadu.',
    h1Proposed: 'Kanyakumari Education News',
  },
  tourism: {
    title: 'Kanyakumari Tourism News & Travel Guide',
    description: 'Kanyakumari tourism news — latest updates on Vivekananda Rock, Thiruvalluvar Statue, ferry timings, tourist spots and travel guides.',
    h1Proposed: 'Kanyakumari Tourism News',
  },
  cinema: {
    title: 'Tamil Cinema News | Kanyakumari Today',
    description: 'Tamil cinema news today — latest Kollywood updates, movie releases, reviews and celebrity news from Kanyakumari Today.',
    h1Proposed: 'Tamil Cinema News',
  },
  sports: {
    title: 'Kanyakumari Sports News | Latest Updates',
    description: 'Kanyakumari sports news — cricket, football, kabaddi and all sports updates from Kanyakumari district and Tamil Nadu, updated daily.',
    h1Proposed: 'Kanyakumari Sports News',
  },
}


export function buildArticleMetadata(article, lang = 'EN', pageUrl = '') {
  const seo = article?.seo || {}
  const title = seo.seoTitle || textFor(article, 'title', 'titleTA', lang)
  const description = seo.metaDescription || textFor(article, 'excerpt', 'excerptTA', lang)
  const canonical = seo.canonicalUrl || pageUrl
  const image = seo.ogImage || article?.image || null
  const publisher = article?.publisherName || null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: textFor(article, 'title', 'titleTA', lang),
    datePublished: article?.publishedAt || undefined,
    dateModified: article?.updatedAt || article?.publishedAt || undefined,
    image: image ? [image] : undefined,
    author: article?.author?.name ? [{ '@type': 'Person', name: article.author.name }] : undefined,
    publisher: publisher ? { '@type': 'Organization', name: publisher } : undefined,
    mainEntityOfPage: canonical || undefined,
  }
  Object.keys(jsonLd).forEach((key) => jsonLd[key] === undefined && delete jsonLd[key])
  return { title, description, canonical, image, ogTitle: seo.ogTitle || title, ogDescription: seo.ogDescription || description, twitterTitle: seo.twitterTitle || title, twitterDescription: seo.twitterDescription || description, jsonLd }
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value || ''))
}

export function applyArticleMetadata(metadata) {
  document.title = metadata.title
  upsertMeta('meta[name="description"]', { name: 'description', content: metadata.description })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.ogTitle })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.ogDescription })
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: metadata.image ? 'summary_large_image' : 'summary' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.twitterTitle })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.twitterDescription })
  if (metadata.image) {
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: metadata.image })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: metadata.image })
  }
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = metadata.canonical
  document.getElementById('article-jsonld')?.remove()
  const script = document.createElement('script')
  script.id = 'article-jsonld'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(metadata.jsonLd)
  document.head.appendChild(script)
}

/**
 * Apply non-article page metadata (title, description, self-referencing
 * canonical) to the document head. Used by category/static pages. Unlike
 * applyArticleMetadata this injects no JSON-LD; it also removes any stale
 * NewsArticle JSON-LD left by a previously visited article so a category page
 * never carries an article schema.
 */
export function applyPageMetadata(metadata) {
  document.title = metadata.title
  upsertMeta('meta[name="description"]', { name: 'description', content: metadata.description })
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = metadata.canonical
  document.getElementById('article-jsonld')?.remove()
}

/**
 * Restore homepage metadata and drop any injected article JSON-LD. Call from
 * a page's effect cleanup so navigating away (e.g. to the homepage, which sets
 * no meta of its own) does not leave a stale category/article title or
 * canonical behind. Values mirror the static index.html homepage defaults.
 */
export function restoreHomeMetadata() {
  document.title = 'Kanyakumari News Today | Nagercoil Latest Updates'
  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: 'Kanyakumari Today — your source for Kanyakumari news today, Nagercoil updates, Tamil Nadu headlines, education, tourism, cinema and sports. Updated 24x7.',
  })
  const canonical = document.head.querySelector('link[rel="canonical"]')
  if (canonical) canonical.href = `${METADATA_BASE}/`
  document.getElementById('article-jsonld')?.remove()
}

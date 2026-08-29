import { localizedField as textFor } from './article.js'

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

#!/usr/bin/env node
/**
 * generate-feed.mjs
 * Generates public/feed.xml — an RSS 2.0 feed of the latest 50 articles.
 * Run: node scripts/generate-feed.mjs
 * Set SITEMAP_API_BASE_URL (or VITE_DEV_API_PROXY_TARGET for local dev) to
 * fetch real articles from the backend. Without it the file is written as a
 * valid empty feed (still serves robots/AI crawlers the feed endpoint).
 *
 * GEO_ENTITIES source: src/seo/keywords.js
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir   = resolve(__dirname, '..')

const BASE_URL   = 'https://www.kanyakumaritoday.com'
const SITE_TITLE = 'Kanyakumari Today'
const SITE_DESC  = 'Latest Kanyakumari news, Nagercoil updates and Kanyakumari district headlines from Tamil Nadu — breaking news, politics, tourism and more.'
const SITE_LANG  = 'en-IN'
const FEED_LIMIT = 50

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;')
}

async function fetchArticles() {
  const apiBase =
    process.env.SITEMAP_API_BASE_URL ||
    process.env.VITE_DEV_API_PROXY_TARGET
  if (!apiBase) {
    console.warn('Warning: no API base URL set — feed will be generated without articles.')
    return []
  }
  try {
    const url = `${apiBase}/api/articles?published=true&limit=${FEED_LIMIT}&sort=publishedAt:desc`
    console.log(`Fetching ${FEED_LIMIT} latest articles...`)
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const articles = Array.isArray(data)
      ? data
      : (data.articles || data.data || [])
    console.log(`Fetched ${articles.length} articles.`)
    return articles.slice(0, FEED_LIMIT)
  } catch (err) {
    console.warn(`Warning: could not fetch articles — ${err.message}`)
    return []
  }
}

function buildItem(article) {
  const slug     = article.slug || article.id
  const url      = `${BASE_URL}/article/${escapeXml(slug)}`
  const title    = escapeXml(article.title || 'Kanyakumari Today')
  const desc     = escapeXml(article.excerpt || article.description || '')
  const pubDate  = new Date(article.publishedAt || article.createdAt || Date.now()).toUTCString()
  const category = escapeXml(article.category || '')
  const author   = escapeXml(article.author?.name || 'Kanyakumari Today')
  const image    = article.image ? `\n      <enclosure url="${escapeXml(article.image)}" type="image/jpeg" length="0" />` : ''

  return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml('kanyakumaritoday2026@gmail.com')} (${author})</author>${category ? `\n      <category>${category}</category>` : ''}${image}
    </item>`
}

async function main() {
  const articles = await fetchArticles()
  const now      = new Date().toUTCString()

  const items = articles
    .filter(a => a.slug || a.id)
    .map(buildItem)
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}/</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>${SITE_LANG}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${BASE_URL}/</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Kanyakumari Today. All rights reserved.</copyright>
    <managingEditor>kanyakumaritoday2026@gmail.com (Kanyakumari Today)</managingEditor>
    <webMaster>kanyakumaritoday2026@gmail.com (Kanyakumari Today)</webMaster>
    <ttl>60</ttl>${items}
  </channel>
</rss>`

  const feedPath = resolve(rootDir, 'public', 'feed.xml')
  writeFileSync(feedPath, feed, 'utf8')
  console.log(`feed.xml written — ${articles.length} items.`)
}

main()

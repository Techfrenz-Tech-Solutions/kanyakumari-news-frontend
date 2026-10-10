#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 * Generates public/sitemap.xml and public/news-sitemap.xml.
 * Usage: node scripts/generate-sitemap.mjs
 * Set VITE_API_BASE_URL env var to also include dynamic article URLs.
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const BASE_URL = 'https://www.kanyakumaritoday.com';
const today = new Date().toISOString().slice(0, 10);

// Static routes with their SEO metadata
const staticRoutes = [
  { path: '/',                  changefreq: 'hourly',  priority: '1.0' },
  { path: '/category/kanyakumari', changefreq: 'daily', priority: '0.9' },
  { path: '/category/nagercoil',   changefreq: 'daily', priority: '0.9' },
  { path: '/category/tamil-nadu',  changefreq: 'daily', priority: '0.9' },
  { path: '/category/india',       changefreq: 'daily', priority: '0.9' },
  { path: '/category/world',       changefreq: 'daily', priority: '0.9' },
  { path: '/category/tourism',     changefreq: 'daily', priority: '0.9' },
  { path: '/category/sports',      changefreq: 'daily', priority: '0.9' },
  { path: '/category/business',    changefreq: 'daily', priority: '0.9' },
  { path: '/category/education',   changefreq: 'daily', priority: '0.9' },
  { path: '/category/weather',     changefreq: 'daily', priority: '0.9' },
  { path: '/category/politics',    changefreq: 'daily', priority: '0.9' },
  { path: '/category/crime',       changefreq: 'daily', priority: '0.9' },
  { path: '/search',            changefreq: 'weekly',  priority: '0.5' },
  { path: '/tourist-info',      changefreq: 'daily',   priority: '0.7' },
  { path: '/jobs',              changefreq: 'daily',   priority: '0.7' },
  { path: '/e-paper',           changefreq: 'daily',   priority: '0.7' },
  { path: '/about',             changefreq: 'monthly', priority: '0.5' },
  { path: '/contact',           changefreq: 'monthly', priority: '0.5' },
  { path: '/advertise',         changefreq: 'monthly', priority: '0.5' },
  { path: '/careers',           changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy',           changefreq: 'monthly', priority: '0.3' },
  { path: '/terms',             changefreq: 'monthly', priority: '0.3' },
  { path: '/disclaimer',        changefreq: 'monthly', priority: '0.3' },
  { path: '/cookies',           changefreq: 'monthly', priority: '0.3' },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Fetch published articles if API is available
async function fetchArticles() {
  // Use SITEMAP_API_BASE_URL (server-side only, never bundled into the client).
  // Falls back to VITE_DEV_API_PROXY_TARGET for local dev convenience.
  // Never logs the URL to stdout.
  const apiBase = process.env.SITEMAP_API_BASE_URL || process.env.VITE_DEV_API_PROXY_TARGET
  if (!apiBase) return [];
  try {
    const url = `${apiBase}/api/articles?published=true&limit=500`;
    console.log('Fetching articles from backend...');
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const articles = Array.isArray(data) ? data : (data.articles || data.data || []);
    console.log(`Fetched ${articles.length} articles`);
    return articles;
  } catch (err) {
    console.warn(`Warning: Could not fetch articles: ${err.message}`);
    return [];
  }
}

async function main() {
  const articles = await fetchArticles();
  const cutoff48h = new Date(Date.now() - 48 * 60 * 60 * 1000);

  // Build sitemap.xml
  const staticUrls = staticRoutes.map(r => `
  <url>
    <loc>${escapeXml(BASE_URL + r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('');

  const articleUrls = articles.map(a => {
    const slug = a.slug || a.id;
    if (!slug) return '';
    const lastmod = a.updatedAt || a.publishedAt || today;
    const dateStr = new Date(lastmod).toISOString().slice(0, 10);
    return `
  <url>
    <loc>${escapeXml(`${BASE_URL}/article/${slug}`)}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).filter(Boolean).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${articleUrls}
</urlset>`;

  const sitemapPath = resolve(rootDir, 'public', 'sitemap.xml');
  writeFileSync(sitemapPath, sitemap, 'utf8');

  // Build news-sitemap.xml (articles in last 48h only)
  const recentArticles = articles.filter(a => {
    const pub = a.publishedAt || a.createdAt;
    if (!pub) return false;
    return new Date(pub) >= cutoff48h;
  });

  const newsItems = recentArticles.map(a => {
    const slug = a.slug || a.id;
    if (!slug) return '';
    const pubDate = new Date(a.publishedAt || a.createdAt).toISOString();
    const title = escapeXml(a.title || 'Kanyakumari News');
    return `
  <url>
    <loc>${escapeXml(`${BASE_URL}/article/${slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>Kanyakumari Today</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  }).filter(Boolean).join('');

  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!--
    Regenerated automatically. Only articles from the last 48 hours appear here.
    See SEO-NOTES.md for implementation guidance.
  -->${newsItems}
</urlset>`;

  const newsSitemapPath = resolve(rootDir, 'public', 'news-sitemap.xml');
  writeFileSync(newsSitemapPath, newsSitemap, 'utf8');

  console.log(`sitemap.xml: ${staticRoutes.length} static + ${articles.length} article URLs`);
  console.log(`news-sitemap.xml: ${recentArticles.length} recent articles`);
  console.log('Done.');
}

main();

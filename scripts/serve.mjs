#!/usr/bin/env node
/**
 * Lightweight static file server for the Kanyakumari Today frontend.
 *
 * Serves the built dist/ folder — including sitemap.xml, robots.txt,
 * feed.xml, and all other SEO files — and proxies /api/ and /uploads/
 * to the backend.  SPA routes fall back to index.html.
 *
 * Use this as a quick alternative to nginx when the backend is directly
 * exposed and static SEO files (sitemap.xml, robots.txt, etc.) are being
 * swallowed by the backend's catch-all 404 handler instead of served.
 *
 * ── Usage ──────────────────────────────────────────────────────────────
 *   1. Build the frontend:    npm run build
 *   2. Start this server:      node scripts/serve.mjs
 *
 * ── Environment variables ──────────────────────────────────────────────
 *   PORT         Listen port          (default 8080)
 *   BACKEND_URL  Backend API origin   (default http://127.0.0.1:3001)
 *
 *   Example:
 *     PORT=80 BACKEND_URL=http://127.0.0.1:3001 node scripts/serve.mjs
 *
 * ── Production notes ──────────────────────────────────────────────────
 *   For real production use, prefer the nginx config in deploy/nginx.conf.
 *   This script is a fallback for simple VPS setups without nginx.
 *   It has zero dependencies — only Node.js built-in modules.
 * ──────────────────────────────────────────────────────────────────────
 */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')
const PORT = process.env.PORT || 8080
const BACKEND = process.env.BACKEND_URL || 'http://127.0.0.1:3001'

// MIME type map for correct Content-Type headers
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.rss': 'application/rss+xml; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
}

// Cache durations by path prefix
function cacheFor(pathname) {
  if (pathname.startsWith('/assets/')) return 'public, max-age=31536000, immutable'
  if (pathname.match(/\.(xml|txt|rss)$/)) return 'public, max-age=3600'
  return 'public, max-age=3600'
}

// ── Request handler ────────────────────────────────────────────────────
function handle(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`)

  // Proxy /api/ and /uploads/ to the backend
  if (pathname.startsWith('/api/') || pathname.startsWith('/uploads/')) {
    return proxy(req, res)
  }

  // Decode and resolve the file path, preventing directory traversal
  const decoded = decodeURIComponent(pathname)
  const file = path.resolve(DIST, decoded.replace(/^\//, ''))
  if (!file.startsWith(DIST + path.sep) && file !== DIST) {
    res.writeHead(403, { 'Content-Type': 'text/plain' })
    res.end('Forbidden')
    return
  }

  // Serve the static file if it exists
  try {
    const stat = fs.statSync(file)
    if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase()
      res.writeHead(200, {
        'Content-Type': TYPES[ext] || 'application/octet-stream',
        'Cache-Control': cacheFor(pathname),
      })
      fs.createReadStream(file).pipe(res)
      return
    }
    // It's a directory — try index.html inside it
    const indexInDir = path.join(file, 'index.html')
    if (fs.existsSync(indexInDir)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      fs.createReadStream(indexInDir).pipe(res)
      return
    }
  } catch {
    // File doesn't exist — fall through to SPA fallback
  }

  // SPA fallback: serve index.html for client-side routing
  const index = path.join(DIST, 'index.html')
  try {
    fs.accessSync(index)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    fs.createReadStream(index).pipe(res)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found — run "npm run build" first to generate dist/')
  }
}

// ── Reverse proxy to backend ───────────────────────────────────────────
function proxy(req, res) {
  const target = new URL(req.url, BACKEND)
  const headers = { ...req.headers, host: target.host }

  const proxyReq = http.request(target, { method: req.method, headers }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers)
    proxyRes.pipe(res)
  })

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      success: false,
      error: { code: 'BAD_GATEWAY', message: 'Unable to reach the backend service.' },
    }))
  })

  req.pipe(proxyReq)
}

// ── Start ───────────────────────────────────────────────────────────────
const server = http.createServer(handle)

server.listen(PORT, () => {
  console.log(`\n  Kanyakumari Today — static server`)
  console.log(`  ─────────────────────────────────────────────`)
  console.log(`  Listening :  http://0.0.0.0:${PORT}`)
  console.log(`  dist/    :  ${DIST}`)
  console.log(`  backend  :  ${BACKEND}`)
  console.log(`  ─────────────────────────────────────────────`)
  console.log(`  Static SEO files (sitemap.xml, robots.txt, feed.xml, ...)`)
  console.log(`  are served from dist/ and will NOT reach the backend.\n`)
})

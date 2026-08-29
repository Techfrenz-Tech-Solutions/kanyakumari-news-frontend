import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const adminUrl = process.env.KKN_ADMIN_URL || 'http://127.0.0.1:5173'
const publicUrl = process.env.KKN_PUBLIC_URL || 'http://127.0.0.1:4173'
const apiUrl = process.env.KKN_API_URL || 'http://127.0.0.1:3001'
const email = process.env.KKN_ADMIN_EMAIL
const password = process.env.KKN_ADMIN_PASSWORD
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || '/mnt/EXT1/pw-browsers/chromium-1148/chrome-linux/chrome'
if (!email || !password) throw new Error('KKN_ADMIN_EMAIL and KKN_ADMIN_PASSWORD are required')

const marker = `step4-${Date.now()}`
const names = {
  category: `Step4 Category ${marker}`,
  reporter: `Step4 Reporter ${marker}`,
  title: `Step4 Public Article ${marker}`,
  tamilTitle: `பொது செய்தி ${marker}`,
}
const bodyMarker = `ROUNDTRIP-BODY-${marker}`
const tempDir = await mkdtemp('/mnt/EXT1/kkn-step4-browser-')
const imagePath = `${tempDir}/${marker}.png`
await writeFile(imagePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64'))

const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] })
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
const page = await context.newPage()
const pageErrors = []
page.on('pageerror', (error) => pageErrors.push(error.message))

const field = (label) => page.locator('.field').filter({ has: page.locator('label', { hasText: label }) }).first()
const modal = () => page.locator('.modal-box').last()
const rowFor = (text) => page.locator('tr').filter({ hasText: text }).first()

async function apiSession() {
  const response = await context.request.post(`${apiUrl}/api/admin/auth/login`, { data: { email, password } })
  assert.equal(response.status(), 200)
  return (await response.json()).data.accessToken
}

async function apiRequest(token, method, path, data) {
  const response = await context.request.fetch(`${apiUrl}${path}`, {
    method, data, headers: { Authorization: `Bearer ${token}` },
  })
  return { status: response.status(), payload: await response.json().catch(() => null) }
}

let ids = {}
let token
try {
  await page.goto(`${adminUrl}/login`)
  await page.locator('input[type="email"]').fill(email)
  await page.locator('input[type="password"]').fill(password)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.waitForURL((url) => !url.pathname.endsWith('/login'))

  await page.goto(`${adminUrl}/categories`)
  await page.getByRole('button', { name: 'Add Category' }).click()
  await modal().locator('input').nth(0).fill(names.category)
  await modal().locator('input').nth(1).fill(marker)
  await modal().getByRole('button', { name: 'Create Category' }).click()
  await page.getByText(names.category, { exact: true }).waitFor()

  await page.goto(`${adminUrl}/reporters`)
  await page.getByRole('button', { name: 'Add Reporter' }).click()
  await field('Full Name').locator('input').fill(names.reporter)
  await field('Email').locator('input').fill(`${marker}@reporter.kkn.test`)
  await field('Designation').locator('input').fill('Integration Reporter')
  await modal().getByRole('button', { name: 'Add Reporter' }).click()
  await page.getByText(names.reporter, { exact: true }).waitFor()

  await page.goto(`${adminUrl}/media`)
  await page.locator('input[type="file"]').setInputFiles(imagePath)
  await page.getByText(`${marker}.png`, { exact: true }).waitFor()

  await page.goto(`${adminUrl}/news/add`)
  await field('News Title').locator('input').fill(names.title)
  await field('Tamil Title').locator('input').fill(names.tamilTitle)
  await field('Short Description').locator('textarea').fill(`Unique excerpt ${marker}`)
  await field('Tamil Short Description').locator('textarea').fill(`தமிழ் சுருக்கம் ${marker}`)
  await field('Full News Content').locator('textarea').fill(`<h2>Verified round trip</h2><p>${bodyMarker}</p><script>window.__unsafe=true</script>`)
  await field('Tamil Content').locator('textarea').fill(`<p>தமிழ் உடல் ${marker}</p>`)
  await field('Featured Image').locator('select').selectOption({ label: `${marker}.png` })
  await field('Tags').locator('input').fill(`tag-${marker}`)
  await field('Tags').locator('input').press('Enter')
  await field('Category').locator('select').selectOption({ label: names.category })
  await field('Author / Reporter').locator('select').selectOption({ label: names.reporter })
  await field('Location').locator('input').fill('Nagercoil')
  for (const label of ['Mark as Breaking News', 'Mark as Featured']) {
    await page.getByText(label, { exact: true }).locator('..').locator('label.switch').click()
  }
  await page.getByRole('button', { name: 'Save Changes' }).click()
  await page.waitForURL('**/news')
  await page.goto(`${adminUrl}/news/drafts`)
  await rowFor(names.title).getByRole('button', { name: 'Publish Now' }).click()
  await page.goto(`${adminUrl}/news/published`)
  await rowFor(names.title).waitFor()

  token = await apiSession()
  const listing = await apiRequest(token, 'GET', `/api/admin/news?search=${encodeURIComponent(marker)}&limit=20`)
  const article = listing.payload.data.items.find((item) => item.title === names.title)
  assert.ok(article)
  ids.article = article.id
  ids.slug = article.slug
  ids.category = article.categoryId
  ids.reporter = article.authorId
  ids.media = article.featuredImageId
  const breaking = await apiRequest(token, 'POST', '/api/admin/breaking', { headline: names.title, articleId: article.id, priority: 10 })
  assert.equal(breaking.status, 201)
  ids.breaking = breaking.payload.data.id

  await page.goto(publicUrl)
  await page.getByRole('heading', { name: names.title }).first().waitFor()
  await page.getByText(names.title, { exact: true }).first().waitFor()
  await page.goto(`${publicUrl}/article/${ids.slug}`)
  await page.getByRole('heading', { name: names.title }).waitFor()
  await page.getByText(bodyMarker, { exact: true }).waitFor()
  assert.equal(await page.locator('article script').count(), 0)
  assert.equal(await page.getByText(names.reporter, { exact: true }).count(), 1)
  assert.equal(await page.getByText(`#tag-${marker}`, { exact: true }).count(), 1)
  assert.ok((await page.locator('article figure img').getAttribute('src')).includes('/uploads/'))
  assert.equal(await page.title(), names.title)
  assert.equal(await page.locator('script#article-jsonld').count(), 1)

  await page.goto(`${publicUrl}/category/${marker}`)
  await page.getByText(names.title, { exact: true }).first().waitFor()

  for (const sort of ['relevance', 'newest', 'popular']) {
    await page.goto(`${publicUrl}/search?q=${encodeURIComponent(marker)}`)
    await page.locator('select').nth(1).selectOption(sort)
    await page.getByText(names.title, { exact: true }).first().waitFor()
  }

  await page.goto(publicUrl)
  await page.locator('.hero-swiper').getByText(names.title, { exact: true }).first().waitFor()
  await page.locator('.animate-marquee').getByText(names.title, { exact: true }).first().waitFor()

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(publicUrl)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('complementary').getByRole('link', { name: names.category }).waitFor()

  await page.goto(`${publicUrl}/article/does-not-exist-${marker}`)
  await page.getByRole('heading', { name: /not found/i }).waitFor()

  const unavailable = await context.newPage()
  await unavailable.route(`${apiUrl}/api/**`, (route) => route.abort())
  await unavailable.goto(publicUrl)
  await unavailable.getByRole('alert').first().waitFor()
  await unavailable.close()

  const viewCheck = await context.request.get(`${apiUrl}/api/trending?period=daily&limit=20`)
  assert.equal(viewCheck.status(), 200)
  assert.ok((await viewCheck.json()).data.some((item) => item.slug === ids.slug))

  assert.deepEqual(pageErrors, [])
  console.log(JSON.stringify({ result: 'passed', marker, slug: ids.slug, adminToPublic: true, featured: true, category: true, search: ['relevance', 'newest', 'popular'], breaking: true, mobile: true, notFound: true, unavailable: true }))

  if (ids.breaking) await apiRequest(token, 'DELETE', `/api/admin/breaking/${ids.breaking}`)
  if (ids.article) await apiRequest(token, 'DELETE', `/api/admin/news/${ids.article}`)
  for (const [path, id] of [['categories', ids.category], ['reporters', ids.reporter], ['media', ids.media]]) {
    if (id) await apiRequest(token, 'DELETE', `/api/admin/${path}/${id}`)
  }
  ids.cleaned = true
} finally {
  if (!ids.cleaned && token) {
    try {
      if (ids.breaking) await apiRequest(token, 'DELETE', `/api/admin/breaking/${ids.breaking}`)
      if (ids.article) await apiRequest(token, 'DELETE', `/api/admin/news/${ids.article}`)
      for (const [path, id] of [['categories', ids.category], ['reporters', ids.reporter], ['media', ids.media]]) {
        if (id) await apiRequest(token, 'DELETE', `/api/admin/${path}/${id}`)
      }
      ids.cleaned = true
    } catch (cleanupError) {
      console.error(`Fixture cleanup failed: ${cleanupError.message}`)
    }
  }
  await browser.close()
  await rm(tempDir, { recursive: true, force: true })
  if (!ids.cleaned) console.error(`Fixture cleanup requires review for marker ${marker}`)
}

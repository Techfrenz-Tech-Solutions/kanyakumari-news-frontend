import test from 'node:test'
import assert from 'node:assert/strict'
import { createApiClient, normalizeApiError, PublicApiError } from '../src/api/client.js'
import { createNewsService } from '../src/services/newsService.js'

test('central API client unwraps the backend envelope', async () => {
  const client = createApiClient({
    baseURL: 'http://example.test/api',
    adapter: async (config) => ({ data: { success: true, data: { items: ['real'] } }, status: 200, statusText: 'OK', headers: {}, config }),
  })
  assert.deepEqual(await client.get('/news'), { items: ['real'] })
})

test('central API client rejects malformed envelopes predictably', async () => {
  const client = createApiClient({
    adapter: async (config) => ({ data: { items: [] }, status: 200, statusText: 'OK', headers: {}, config }),
  })
  await assert.rejects(client.get('/news'), (error) => error instanceof PublicApiError && error.code === 'INVALID_RESPONSE')
})

test('HTTP errors normalize status, code, message and details', () => {
  const error = normalizeApiError({ response: { status: 404, data: { error: { code: 'ARTICLE_NOT_FOUND', message: 'Article not found', details: null } } } })
  assert.deepEqual({ status: error.status, code: error.code, message: error.message, details: error.details }, {
    status: 404, code: 'ARTICLE_NOT_FOUND', message: 'Article not found', details: null,
  })
})

test('news service maps core features to backend routes and parameters', async () => {
  const calls = []
  const fake = {
    get: async (url, config) => { calls.push(['GET', url, config]); return { ok: true } },
    post: async (url, data, config) => { calls.push(['POST', url, { ...config, data }]); return { ok: true } },
  }
  const service = createNewsService(fake)
  await service.getCategories()
  await service.getKanyakumariAreas()
  await service.getLatest({ page: 2, pageSize: 6, category: 'local', area: 'town' })
  await service.getByCategory('tamil nadu', 5)
  await service.getArticleBySlug('story slug')
  await service.getHero()
  await service.getBreakingHeadlines()
  await service.getTrending({ period: 'weekly', limit: 4 })
  await service.search('marker', { category: 'local', sort: 'popular', limit: 12 })
  await service.getHome()
  assert.deepEqual(calls.map((call) => call[1]), [
    '/categories', '/areas', '/news', '/news/category/tamil%20nadu', '/news/story%20slug',
    '/hero', '/breaking', '/trending', '/search', '/home',
  ])
  assert.deepEqual(calls[2][2].params, { page: 2, pageSize: 6, category: 'local', area: 'town' })
  assert.deepEqual(calls[7][2].params, { period: 'weekly', limit: 4 })
  assert.deepEqual(calls[8][2].params, { q: 'marker', category: 'local', sort: 'popular', limit: 12 })
})

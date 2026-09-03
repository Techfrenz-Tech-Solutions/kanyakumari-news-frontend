import test from 'node:test'
import assert from 'node:assert/strict'
import { articleImage, contentState, localizedField } from '../src/utils/article.js'
import { buildArticleMetadata } from '../src/utils/seo.js'
import { shareContent } from '../src/utils/share.js'

const article = {
  title: 'English title', titleTA: 'தமிழ் தலைப்பு', excerpt: 'English excerpt', excerptTA: null,
  content: '<p>English body</p>', contentTA: '<p>தமிழ் உடல்</p>', image: null,
  publishedAt: '2026-08-29T10:00:00.000Z', updatedAt: '2026-08-29T11:00:00.000Z',
  author: { name: 'Reporter One' }, publisherName: 'Kanyakumari Today',
  seo: { seoTitle: 'SEO title', canonicalUrl: 'https://news.test/article/story' },
}

test('Tamil fields are selected with an English fallback', () => {
  assert.equal(localizedField(article, 'title', 'titleTA', 'TA'), 'தமிழ் தலைப்பு')
  assert.equal(localizedField(article, 'excerpt', 'excerptTA', 'TA'), 'English excerpt')
  assert.equal(localizedField(article, 'content', 'contentTA', 'TA'), '<p>தமிழ் உடல்</p>')
})

test('null media uses one intentional local fallback', () => {
  assert.equal(articleImage(article), '/news-placeholder.svg')
  assert.equal(articleImage({ image: 'https://media.test/photo.jpg' }), 'https://media.test/photo.jpg')
})

test('loading, error, empty and loaded states remain distinct', () => {
  assert.equal(contentState({ loading: true }), 'loading')
  assert.equal(contentState({ loading: false, error: new Error('offline') }), 'error')
  assert.equal(contentState({ loading: false, items: [] }), 'empty')
  assert.equal(contentState({ loading: false, items: [{}] }), 'loaded')
})

test('an empty videos response resolves to the empty state, not loading', () => {
  assert.equal(contentState({ loading: false, error: null, items: [] }), 'empty')
})

test('article SEO includes canonical social data and valid NewsArticle JSON-LD', () => {
  const metadata = buildArticleMetadata(article, 'TA', 'https://fallback.test/article/story')
  assert.equal(metadata.title, 'SEO title')
  assert.equal(metadata.description, 'English excerpt')
  assert.equal(metadata.canonical, 'https://news.test/article/story')
  assert.equal(metadata.jsonLd['@type'], 'NewsArticle')
  assert.deepEqual(metadata.jsonLd.author, [{ '@type': 'Person', name: 'Reporter One' }])
  assert.equal(metadata.jsonLd.publisher.name, 'Kanyakumari Today')
})

test('share uses Web Share API and falls back to clipboard', async () => {
  const payload = { title: 'QA', text: 'QA story', url: 'https://news.test/article/qa' }
  let shared
  assert.equal(await shareContent(payload, { share: async (value) => { shared = value } }), 'shared')
  assert.deepEqual(shared, payload)
  let copied
  assert.equal(await shareContent(payload, { clipboard: { writeText: async (value) => { copied = value } } }), 'copied')
  assert.equal(copied, payload.url)
  assert.equal(await shareContent(payload, {}), 'unavailable')
})

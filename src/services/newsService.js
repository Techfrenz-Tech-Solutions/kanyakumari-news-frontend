import { apiClient } from '../api/client.js'

const cleanParams = (params) => Object.fromEntries(
  Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== '')
)

export function createNewsService(client = apiClient) {
  return {
  getHome: ({ signal } = {}) => client.get('/home', { signal }),
  getHero: ({ signal } = {}) => client.get('/hero', { signal }),
  getBreakingHeadlines: ({ signal } = {}) => client.get('/breaking', { signal }),
  getLatest: ({ page = 1, pageSize = 9, category = null, area = null, subcategory = null, signal } = {}) =>
    client.get('/news', { params: cleanParams({ page, pageSize, category, area, subcategory }), signal }),
  getTrending: ({ period = 'daily', limit = 5, signal } = {}) =>
    client.get('/trending', { params: { period, limit }, signal }),
  getByCategory: (slug, limit = 6, { signal } = {}) =>
    client.get(`/news/category/${encodeURIComponent(slug)}`, { params: { limit }, signal }),
  getCategories: ({ signal } = {}) => client.get('/categories', { signal }),
  getKanyakumariAreas: ({ signal } = {}) => client.get('/areas', { signal }),
  getArticleBySlug: (slug, { signal } = {}) => client.get(`/news/${encodeURIComponent(slug)}`, { signal }),
  search: (query, { category = null, sort = 'relevance', limit = 20, signal } = {}) =>
    client.get('/search', { params: cleanParams({ q: query.trim(), category, sort, limit }), signal }),
  getSiteSettings: ({ signal } = {}) => client.get('/settings/site', { signal }),
  getAds: ({ signal } = {}) => client.get('/ads', { signal }),
  getStockData: ({ signal } = {}) => client.get('/market/stocks', { signal }),
  getWeather: (city, { signal } = {}) => client.get('/weather', { params: cleanParams({ city }), signal }),
  getRates: ({ signal } = {}) => client.get('/market/rates', { signal }),
  getJobs: ({ type = null, signal } = {}) => client.get('/jobs', { params: cleanParams({ type }), signal }),
  getTouristAttractions: ({ signal } = {}) => client.get('/tourist-attractions', { signal }),
  submitContact: (form, { signal } = {}) => client.post('/contact', form, { signal }),
  }
}

export const newsService = createNewsService()

export default newsService

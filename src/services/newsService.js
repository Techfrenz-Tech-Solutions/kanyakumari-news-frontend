import {
  articles,
  categories,
  heroArticles,
  breakingHeadlines,
  trending,
  gallery,
  videos,
  stockData,
  weather,
  rates,
  jobListings,
  touristAttractions,
  districtInfo,
  kanyakumariAreas
} from '../data/newsData.js'

const LATENCY = 250

function delay(data, ms = LATENCY) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export const newsService = {
  getHero: () => delay(heroArticles),

  getBreakingHeadlines: () => delay(breakingHeadlines, 100),

  getLatest: ({ page = 1, pageSize = 9, category = null, area = null } = {}) => {
    let filtered = category ? articles.filter((a) => a.category === category) : articles
    if (area) filtered = filtered.filter((a) => a.area === area)
    const sorted = [...filtered].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    const start = (page - 1) * pageSize
    const items = sorted.slice(start, start + pageSize)
    return delay({ items, hasMore: start + pageSize < sorted.length, total: sorted.length })
  },

  getTrending: () => delay(trending),

  getByCategory: (slug, limit = 6) =>
    delay(articles.filter((a) => a.category === slug).slice(0, limit)),

  getCategories: () => delay(categories, 80),

  getKanyakumariAreas: () => delay(kanyakumariAreas, 80),

  getArticleBySlug: (slug) => {
    const found = articles.find((a) => a.slug === slug)
    const related = found
      ? articles.filter((a) => a.category === found.category && a.id !== found.id).slice(0, 4)
      : []
    return delay({ article: found || null, related })
  },

  search: (query, { category = null } = {}) => {
    const q = query.trim().toLowerCase()
    let results = !q
      ? []
      : articles.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
        )
    if (category) results = results.filter((a) => a.category === category)
    return delay(results)
  },

  getGallery: () => delay(gallery),

  getVideos: () => delay(videos),

  getStockData: () => delay(stockData, 150),

  getWeather: (_city) => delay(weather, 150),

  getRates: () => delay(rates, 120),

  getJobs: ({ type = null } = {}) => {
    const filtered = type ? jobListings.filter((j) => j.type === type) : jobListings
    return delay(filtered)
  },

  getTouristAttractions: () => delay(touristAttractions),

  getDistrictInfo: () => delay(districtInfo),

  login: ({ email, password }) => {
    if (!email || !password) {
      return Promise.reject(new Error('Email and password are required'))
    }
    return delay({ user: { email, name: email.split('@')[0], token: 'mock-jwt-token' } }, 400)
  },

  requestOtp: (phone) => delay({ sent: true, phone }, 400),

  verifyOtp: (phone, otp) => {
    if (otp !== '123456') return Promise.reject(new Error('Invalid OTP. Use 123456 in this demo.'))
    return delay({ user: { phone, token: 'mock-jwt-token' } }, 400)
  }
}

export default newsService

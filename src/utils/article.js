export const localizedField = (article, englishKey, tamilKey, lang) =>
  lang === 'TA' ? (article?.[tamilKey] || article?.[englishKey] || '') : (article?.[englishKey] || '')

export const articleImage = (article) => article?.image || '/news-placeholder.svg'

export function contentState({ loading, error, items }) {
  if (loading) return 'loading'
  if (error) return 'error'
  if (!items?.length) return 'empty'
  return 'loaded'
}

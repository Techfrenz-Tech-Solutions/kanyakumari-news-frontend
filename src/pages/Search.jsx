import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import NewsCard from '../components/news/NewsCard.jsx'
import { CardSkeleton } from '../components/ui/Skeleton.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { usePublicContent } from '../context/PublicContentContext.jsx'
import { ApiErrorState } from '../components/ui/ApiState.jsx'

export default function Search() {
  const { t } = useLang()
  const { categories, errors: taxonomyErrors } = usePublicContent()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [input,    setInput]    = useState(q)
  const [category, setCategory] = useState('')
  const [results,  setResults]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [sort,     setSort]     = useState('relevance')
  const [error, setError] = useState(null)

  useEffect(() => {
    setInput(q)
    if (!q) { setResults([]); setError(null); return undefined }
    const controller = new AbortController()
    setLoading(true); setError(null)
    newsService.search(q, { category: category || null, sort, signal: controller.signal }).then(setResults)
      .catch((requestError) => { if (requestError.code !== 'REQUEST_CANCELLED') setError(requestError) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [q, category, sort])

  function submit(e) {
    e.preventDefault()
    setParams(input.trim() ? { q: input.trim() } : {})
  }

  return (
    <div className="container-page py-8">
      <h1 className="section-title mb-6">{t.searchTitle}</h1>

      <form onSubmit={submit} className="flex gap-2 mb-6 max-w-2xl">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t.searchInputPlaceholder}
            className="w-full bg-transparent border border-black/15 rounded-sm pl-10 pr-4 py-2.5 text-sm focus:border-primary outline-none" />
        </div>
        <button type="submit" className="btn-primary">{t.searchBtn}</button>
      </form>

      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={Boolean(taxonomyErrors.categories)}
          className="bg-transparent border border-black/15 rounded-sm px-3 py-2">
          <option value="">{t.allCategories}</option>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="bg-transparent border border-black/15 rounded-sm px-3 py-2">
          <option value="relevance">{t.sortRelevance}</option>
          <option value="newest">{t.sortNewest}</option>
          <option value="popular">{t.sortPopular}</option>
        </select>
      </div>

      {error ? <ApiErrorState error={error} /> : !q ? (
        <p className="text-ink-soft">{t.searchPrompt}</p>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : results.length === 0 ? (
        <p className="text-ink-soft">{t.searchNoResults}</p>
      ) : (
        <>
          <p className="text-sm text-ink-soft mb-4">
            {results.length} {t.searchResults} &ldquo;{q}&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {results.map((a) => <NewsCard key={a.id} article={a} variant="medium" />)}
          </div>
        </>
      )}
    </div>
  )
}

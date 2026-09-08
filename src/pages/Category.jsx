import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import newsService from '../services/newsService.js'
import NewsCard from '../components/news/NewsCard.jsx'
import AdBanner from '../components/ui/AdBanner.jsx'
import { CardSkeleton } from '../components/ui/Skeleton.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { usePublicContent } from '../context/PublicContentContext.jsx'
import { ApiErrorState } from '../components/ui/ApiState.jsx'

const PAGE_SIZE = 6

// fallback image for broken img tags
const FALLBACK = '/news-placeholder.svg'

export default function Category() {
  const { lang, t } = useLang()
  const { categories } = usePublicContent()
  const { slug } = useParams()
  const [page,       setPage]       = useState(1)
  const [items,      setItems]      = useState([])
  const [hasMore,    setHasMore]    = useState(false)
  const [loading,    setLoading]    = useState(true)
  const [activeSubcategory, setActiveSubcategory] = useState(null)
  const [error, setError] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)

  const titleOf   = (a) => lang === 'TA' ? (a.titleTA   || a.title)   : a.title
  const excerptOf = (a) => lang === 'TA' ? (a.excerptTA || a.excerpt) : a.excerpt

  const label = categories.find((c) => c.slug === slug)
  const displayLabel = label ? (lang === 'TA' ? (label.labelTA || label.label) : label.label) : slug
  const subcategories = label?.subcategories || []

  useEffect(() => {
    setItems([])
    setPage(1)
    setLoading(true)
    setError(null)
    setActiveSubcategory(null)
  }, [slug])

  useEffect(() => {
    setItems([])
    setPage(1)
    setLoading(true)
    const controller = new AbortController()
    newsService
      .getLatest({ page: 1, pageSize: PAGE_SIZE, category: slug, subcategory: activeSubcategory, signal: controller.signal })
      .then(({ items: fetched, hasMore: more }) => {
        setItems(fetched)
        setHasMore(more)
        setLoading(false)
      }).catch((requestError) => {
        if (requestError.code !== 'REQUEST_CANCELLED') { setError(requestError); setLoading(false) }
      })
    return () => controller.abort()
  }, [slug, activeSubcategory])

  function loadMore() {
    const next = page + 1
    setLoadingMore(true)
    newsService
      .getLatest({ page: next, pageSize: PAGE_SIZE, category: slug, subcategory: activeSubcategory })
      .then(({ items: more, hasMore: moreFlag }) => {
        setItems((prev) => [...prev, ...more])
        setHasMore(moreFlag)
        setPage(next)
      }).catch(setError).finally(() => setLoadingMore(false))
  }

  return (
    <div>
      {/* Page header */}
      <div className="bg-ink dark:bg-black text-white py-8">
        <div className="container-page">
          <p className="eyebrow text-accent mb-1">
            <Link to="/" className="hover:underline">{t.breadcrumbHome}</Link> › {displayLabel}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{displayLabel} {t.newsWord}</h1>
        </div>
      </div>

      {/* ── TOP AD BANNER — 970×90 ── */}
      <div className="container-page py-3">
        <AdBanner size="leaderboard" index={0} />
      </div>

      <div className="container-page py-6">
        {subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-black/10 dark:border-white/10">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                activeSubcategory === null
                  ? 'bg-primary text-white border-primary'
                  : 'border-black/20 dark:border-white/20 hover:border-primary hover:text-primary'
              }`}
            >
              {t.allAreas}
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory.slug}
                onClick={() => setActiveSubcategory(subcategory.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  activeSubcategory === subcategory.slug
                    ? 'bg-primary text-white border-primary'
                    : 'border-black/20 dark:border-white/20 hover:border-primary hover:text-primary'
                }`}
              >
                {subcategory.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main content ── */}
          <div className="lg:col-span-2">
            {error ? <ApiErrorState error={error} /> : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : items.length === 0 ? (
              <p className="text-ink-soft dark:text-white/60 py-12 text-center">
                {t.noArticles}{activeSubcategory ? ` - ${subcategories.find((item) => item.slug === activeSubcategory)?.label}` : ''}
              </p>
            ) : (
              <>
                {/* Featured story */}
                <div className="mb-6">
                  <NewsCard article={items[0]} variant="large" />
                </div>

                {/* Inline ad after featured */}
                <div className="mb-6">
                  <AdBanner size="inline" index={1} />
                </div>

                {/* List items */}
                <div className="space-y-4">
                  {items.slice(1).map((a) => (
                    <Link key={a.id} to={`/article/${a.slug}`}
                      className="flex gap-4 items-start group border-b border-black/8 pb-4 last:border-b-0 last:pb-0">
                      <img src={a.image} alt={titleOf(a)}
                        className="w-28 h-20 object-cover rounded shrink-0 group-hover:opacity-90 transition-opacity"
                        onError={(e) => { e.target.src = FALLBACK }} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm md:text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {titleOf(a)}
                        </p>
                        <p className="text-xs text-ink-soft line-clamp-2 mt-1 hidden sm:block">{excerptOf(a)}</p>
                        <p className="text-[11px] text-ink-soft font-mono mt-1.5">
                          {new Date(a.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-6 pt-4 border-t border-black/10">
                    <button onClick={loadMore} disabled={loadingMore} className="btn-outline text-sm disabled:opacity-50">{loadingMore ? t.loadingText : t.loadMore}</button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* AD 300×250 */}
            <AdBanner size="rectangle" index={0} />

            {/* AD 300×250 bottom */}
            <AdBanner size="rectangle" index={2} />
          </aside>
        </div>
      </div>
    </div>
  )
}

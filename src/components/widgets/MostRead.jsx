import { useEffect, useRef, useState } from 'react'
import newsService from '../../services/newsService.js'
import { useLang } from '../../context/LanguageContext.jsx'
import { Link } from 'react-router-dom'

export default function MostRead({ initialItems = null }) {
  const { t } = useLang()
  const [items, setItems] = useState(initialItems || [])
  const [loading, setLoading] = useState(!initialItems)
  const [error, setError] = useState(null)
  const [range, setRange] = useState('daily')
  const useInitial = useRef(Boolean(initialItems))

  const RANGES = [
    { key: 'daily',   label: t.daily   },
    { key: 'weekly',  label: t.weekly  },
    { key: 'monthly', label: t.monthly },
  ]

  useEffect(() => {
    if (range === 'daily' && useInitial.current) {
      useInitial.current = false
      setLoading(false)
      return undefined
    }
    const controller = new AbortController()
    setLoading(true); setError(null)
    newsService.getTrending({ period: range, limit: 4, signal: controller.signal })
      .then((data) => setItems(data)).catch((requestError) => {
        if (requestError.code !== 'REQUEST_CANCELLED') setError(requestError)
      }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [range])

  return (
    <div className="card-surface p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold">{t.mostReadTitle}</h3>
        <div className="flex gap-1 text-xs font-semibold">
          {RANGES.map((r) => (
            <button key={r.key} onClick={() => setRange(r.key)}
              className={`px-2 py-1 rounded-sm transition-colors ${
                range === r.key ? 'bg-secondary text-white' : 'text-ink-soft dark:text-white/50'
              }`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>
      {loading ? <div className="h-24 animate-pulse rounded bg-black/5" /> : error ? <p role="alert" className="text-xs text-red-700">{error.message}</p> : items.length === 0 ? <p className="text-xs text-ink-soft">No view activity for this period.</p> : (
        <ol className="space-y-3">
          {items.map((item, index) => <li key={item.slug}>
            <Link to={`/article/${item.slug}`} className="flex gap-3 text-sm font-semibold hover:text-primary">
              <span className="text-primary/50">{index + 1}</span><span>{item.title}</span>
              <span className="ml-auto shrink-0 text-xs font-normal text-ink-soft">{item.viewCount} views</span>
            </Link>
          </li>)}
        </ol>
      )}
    </div>
  )
}

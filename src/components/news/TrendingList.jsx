import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import newsService from '../../services/newsService.js'
import { RowSkeleton } from '../ui/Skeleton.jsx'
import { formatNumber } from '../../utils/format.js'

const TABS = [
  { key: 'views', label: 'Most Viewed' },
  { key: 'comments', label: 'Most Discussed' }
]

export default function TrendingList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('views')

  useEffect(() => {
    let active = true
    newsService.getTrending().then((data) => {
      if (active) {
        setItems(data)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [])

  const sorted = [...items].sort((a, b) => b[tab] - a[tab]).slice(0, 8)

  return (
    <div className="card-surface p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold">Trending Now</h3>
      </div>
      <div className="flex gap-2 mb-4 text-xs font-semibold">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              tab === t.key ? 'bg-primary text-white' : 'bg-black/5 dark:bg-white/10 text-ink-soft dark:text-white/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ol className="space-y-4">
          {sorted.map((a, i) => (
            <li key={a.id}>
              <Link to={`/article/${a.slug}`} className="flex gap-3 group">
                <span className="font-display text-2xl font-black text-primary/30 group-hover:text-primary transition-colors w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h4>
                  <span className="text-xs text-ink-soft dark:text-white/40 font-mono">
                    {formatNumber(a[tab])} {tab === 'views' ? 'views' : 'comments'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

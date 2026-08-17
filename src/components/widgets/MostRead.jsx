import { useEffect, useState } from 'react'
import newsService from '../../services/newsService.js'
import NewsCard from '../news/NewsCard.jsx'
import { useLang } from '../../context/LanguageContext.jsx'

export default function MostRead() {
  const { t } = useLang()
  const [items, setItems] = useState([])
  const [range, setRange] = useState('daily')

  const RANGES = [
    { key: 'daily',   label: t.daily   },
    { key: 'weekly',  label: t.weekly  },
    { key: 'monthly', label: t.monthly },
  ]

  useEffect(() => {
    let active = true
    newsService.getTrending().then((d) => active && setItems(d.slice(0, 4)))
    return () => { active = false }
  }, [])

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
      <div className="space-y-4">
        {items.map((a) => <NewsCard key={a.id} article={a} variant="horizontal" />)}
      </div>
    </div>
  )
}

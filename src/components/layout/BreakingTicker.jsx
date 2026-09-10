import { useEffect, useState } from 'react'
import newsService from '../../services/newsService.js'
import Badge from '../ui/Badge.jsx'
import { useLang } from '../../context/LanguageContext.jsx'
import { Link } from 'react-router-dom'

export default function BreakingTicker() {
  const { t } = useLang()
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    newsService.getBreakingHeadlines({ signal: controller.signal }).then(setHeadlines).catch(() => {})
    return () => controller.abort()
  }, [])

  if (headlines.length === 0) return null
  const loop = [...headlines, ...headlines]

  return (
    <div className="overflow-hidden" style={{ background: 'linear-gradient(90deg, #A50D2E 0%, #7B1042 50%, #5C0E3A 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container-page flex items-center h-10">
        <div className="shrink-0 pr-3 mr-3 border-r border-white/30">
          <Badge variant="live" pulse>{t.breaking}</Badge>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {loop.map((h, i) => h.slug
              ? <Link key={`${h.id}-${i}`} to={`/article/${h.slug}`}
                  className="mx-8 text-sm font-medium hover:underline"
                  style={{ color: '#FFD700' }}>{h.title}</Link>
              : <span key={`${h.id}-${i}`} className="mx-8 text-sm font-medium text-white">{h.title}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

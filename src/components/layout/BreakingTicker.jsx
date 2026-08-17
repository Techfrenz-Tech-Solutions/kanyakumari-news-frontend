import { useEffect, useState } from 'react'
import newsService from '../../services/newsService.js'
import Badge from '../ui/Badge.jsx'
import { useLang } from '../../context/LanguageContext.jsx'

export default function BreakingTicker() {
  const { t } = useLang()
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    let active = true
    newsService.getBreakingHeadlines().then((data) => {
      if (active) setHeadlines(data)
    })
    return () => { active = false }
  }, [])

  if (headlines.length === 0) return null
  const loop = [...headlines, ...headlines]

  return (
    <div className="bg-primary text-white overflow-hidden">
      <div className="container-page flex items-center h-10">
        <div className="shrink-0 pr-3 mr-3 border-r border-white/30">
          <Badge variant="live" pulse>{t.breaking}</Badge>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {loop.map((h, i) => (
              <span key={i} className="mx-8 text-sm font-medium">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

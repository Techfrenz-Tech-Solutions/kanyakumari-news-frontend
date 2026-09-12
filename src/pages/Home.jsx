import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiExternalLink, FiImage } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import AdBanner from '../components/ui/AdBanner.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { usePublicContent } from '../context/PublicContentContext.jsx'
import HeroSlider from '../components/news/HeroSlider.jsx'
import NewsCard from '../components/news/NewsCard.jsx'
import { ApiErrorState, EmptyState } from '../components/ui/ApiState.jsx'

function NewsColumn({ col, articles, loading, titleFn, moreLabel }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10 flex flex-col">
      {/* Header */}
      <div className={`${col.headerBg} px-4 py-2.5 flex items-center justify-between`}>
        <h2 className="text-sm font-black uppercase tracking-wider text-white">{col.label}</h2>
        <Link to={`/category/${col.slug}`} className="text-[11px] text-white/80 hover:text-white font-semibold hover:underline">
          {moreLabel} →
        </Link>
      </div>

      {/* Article list — arrow link style, no images */}
      <ul className="flex-1 divide-y divide-black/5 px-4 py-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="py-3 animate-pulse">
                <div className="h-3 bg-black/10 rounded w-full mb-1.5" />
                <div className="h-3 bg-black/10 rounded w-3/4" />
              </li>
            ))
          : articles.slice(0, 6).map((article) => (
              <li key={article.id}>
                <Link
                  to={`/article/${article.slug}`}
                  className="flex items-start gap-2.5 py-3 group"
                >
                  <span className="shrink-0 mt-0.5 text-primary text-base leading-none">→</span>
                  <span className="text-[15px] font-medium text-ink leading-snug group-hover:text-primary transition-colors">
                    {titleFn(article)}
                  </span>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default function Home() {
  const { lang, t } = useLang()
  const { categories } = usePublicContent()

  const titleFn = (article) => lang === 'TA' ? (article.titleTA || article.title) : article.title

  const NEWS_COLS = useMemo(() => {
    const WANTED = [
      { match: ['kanyakumari'],                         headerBg: 'bg-primary'   },
      { match: ['tamilnadu', 'tamil-nadu', 'tamil_nadu', 'tamil nadu'], headerBg: 'bg-secondary' },
      { match: ['national'],                            headerBg: 'bg-green-700' },
      { match: ['world'],                               headerBg: 'bg-amber-600' },
    ]
    return WANTED.flatMap(({ match, headerBg }) => {
      const found = categories.find((c) =>
        match.includes(c.slug?.toLowerCase().trim())
      )
      return found ? [{ ...found, headerBg }] : []
    })
  }, [categories])

  const [colData, setColData] = useState({})
  const [jobs, setJobs] = useState(null)
  const [home, setHome] = useState(null)
  const [homeError, setHomeError] = useState(null)
  const [columnError, setColumnError] = useState(null)

  useEffect(() => {
    if (!NEWS_COLS.length) return undefined
    const controller = new AbortController()
    Promise.all(NEWS_COLS.map((category) => newsService.getByCategory(category.slug, 5, { signal: controller.signal })))
      .then((results) => {
        const map = {}
        NEWS_COLS.forEach((category, index) => { map[category.slug] = results[index] })
        setColData(map)
      }).catch((error) => { if (error.code !== 'REQUEST_CANCELLED') setColumnError(error) })
    return () => controller.abort()
  }, [NEWS_COLS])

  useEffect(() => {
    const controller = new AbortController()
    newsService.getHome({ signal: controller.signal }).then(setHome).catch((error) => {
      if (error.code !== 'REQUEST_CANCELLED') setHomeError(error)
    })
    newsService.getJobs({ signal: controller.signal })
      .then((items) => setJobs(items.slice(0, 4)))
      .catch(() => setJobs([]))
    return () => controller.abort()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <h1 className="sr-only">{home?.site?.siteName || 'Kanyakumari News'}</h1>
      <div className="container-page py-5 space-y-8">
        {homeError ? <ApiErrorState error={homeError} /> : home?.hero?.length ? (
          <section aria-label="Breaking news">
            <HeroSlider articles={home.hero} />
          </section>
        ) : null}

        <AdBanner size="leaderboard" max={2} />

        {home && (
          <section>
            <h2 className="section-title mb-5">{t.latestNews}</h2>
            {home.latest.items.length === 0 ? <EmptyState /> : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {home.latest.items.slice(0, 6).map((article) => <NewsCard key={article.id} article={article} />)}
              </div>
            )}
          </section>
        )}

        <AdBanner size="inline" max={2} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columnError && <div className="sm:col-span-2 lg:col-span-4"><ApiErrorState error={columnError} compact /></div>}
          {NEWS_COLS.map((col) => (
            <NewsColumn
              key={col.slug}
              col={col}
              articles={colData[col.slug] || []}
              loading={!colData[col.slug]}
              titleFn={titleFn}
              moreLabel={t.moreLink}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10">
            <div className="bg-ink px-3 py-2 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <FiBriefcase size={11} /> {t.jobsLinks}
              </h3>
              <Link to="/jobs" className="text-[10px] text-accent hover:underline">{t.moreLink}</Link>
            </div>
            <div className="p-3">
              {jobs === null
                ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="py-2 animate-pulse border-b border-black/5 last:border-0"><div className="h-2.5 bg-black/10 rounded mb-1.5" /><div className="h-2 w-3/4 bg-black/10 rounded" /></div>)
                : jobs.map((job) => (
                    <Link key={job.id} to="/jobs" className="block py-2 border-b border-black/5 last:border-0 group">
                      <p className="text-xs font-semibold text-ink group-hover:text-primary transition-colors line-clamp-1">{job.title}</p>
                      <p className="text-[10px] text-ink-soft mt-0.5">{job.org} · {job.location}</p>
                      <p className="text-[10px] font-mono text-primary mt-0.5">
                        {new Date(job.lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </Link>
                  ))}
              <Link to="/jobs" className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
                <FiExternalLink size={11} /> {t.allJobListings}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10">
            <div className="bg-ink px-3 py-2 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <FiImage size={11} /> {t.touristInfo}
              </h3>
              <Link to="/tourist-info" className="text-[10px] text-accent hover:underline">{t.moreLink}</Link>
            </div>
            <div className="p-3">
              {[t.vivekanandaRock, t.thiruvalluvarStatue, t.kumariAmmanTemple, t.kanyakumariBeach].map((name) => (
                <Link key={name} to="/tourist-info" className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-primary transition-colors py-1.5 border-b border-black/5 last:border-0">
                  <FiArrowRight size={10} className="shrink-0 text-primary" /> {name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <AdBanner size="footer" />
      </div>
    </div>
  )
}

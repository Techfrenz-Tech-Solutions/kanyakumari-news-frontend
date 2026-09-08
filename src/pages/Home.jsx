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

const FALLBACK = '/news-placeholder.svg'

function ArticleRow({ article, titleFn }) {
  if (!article) return (
    <div className="flex gap-2 animate-pulse py-2 border-b border-black/5 last:border-0">
      <div className="w-14 h-10 bg-black/10 rounded shrink-0" />
      <div className="flex-1 space-y-1.5 py-0.5">
        <div className="h-2.5 bg-black/10 rounded" />
        <div className="h-2.5 w-4/5 bg-black/10 rounded" />
      </div>
    </div>
  )
  return (
    <Link to={`/article/${article.slug}`} className="flex gap-2 items-start py-2 border-b border-black/5 last:border-0 group">
      <img src={article.image || FALLBACK} alt={titleFn(article)} className="w-14 h-10 object-cover rounded shrink-0" onError={(e) => { e.target.src = FALLBACK }} />
      <div className="min-w-0">
        <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors text-ink">{titleFn(article)}</p>
        <p className="text-[10px] text-ink-soft font-mono mt-0.5">
          {new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </p>
      </div>
    </Link>
  )
}

function NewsColumn({ col, articles, loading, titleFn, excerptFn, moreLabel }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10 flex flex-col">
      <div className={`${col.headerBg} px-3 py-2 flex items-center justify-between`}>
        <h2 className="text-xs font-black uppercase tracking-wider text-white">{col.label}</h2>
        <Link to={`/category/${col.slug}`} className={`text-[10px] ${col.accent} hover:underline font-semibold`}>{moreLabel}</Link>
      </div>

      {loading ? (
        <div className="p-3 space-y-2 animate-pulse">
          <div className="aspect-video bg-black/10 rounded" />
          <div className="h-3 bg-black/10 rounded" />
          <div className="h-3 w-3/4 bg-black/10 rounded" />
        </div>
      ) : articles[0] ? (
        <Link to={`/article/${articles[0].slug}`} className="group block p-3 border-b border-black/8">
          <div className="aspect-video rounded overflow-hidden mb-2 bg-black/5">
            <img src={articles[0].image || FALLBACK} alt={titleFn(articles[0])} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = FALLBACK }} />
          </div>
          <p className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors text-ink">{titleFn(articles[0])}</p>
          <p className="text-[11px] text-ink-soft mt-1 line-clamp-2 hidden sm:block">{excerptFn(articles[0])}</p>
        </Link>
      ) : null}

      <div className="px-3 pb-3 flex-1">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ArticleRow key={i} article={null} titleFn={titleFn} />)
          : articles.slice(1, 5).map((article) => <ArticleRow key={article.id} article={article} titleFn={titleFn} />)}
      </div>
    </div>
  )
}

export default function Home() {
  const { lang, t } = useLang()
  const { categories } = usePublicContent()

  const titleFn = (article) => lang === 'TA' ? (article.titleTA || article.title) : article.title
  const excerptFn = (article) => lang === 'TA' ? (article.excerptTA || article.excerpt) : article.excerpt

  const NEWS_COLS = useMemo(() => {
    const styles = [
      ['bg-primary', 'text-yellow-200'],
      ['bg-secondary', 'text-blue-200'],
      ['bg-green-700', 'text-green-200'],
      ['bg-amber-600', 'text-amber-100'],
    ]
    return categories.slice(0, 4).map((category, index) => ({ ...category, headerBg: styles[index][0], accent: styles[index][1] }))
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
              excerptFn={excerptFn}
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

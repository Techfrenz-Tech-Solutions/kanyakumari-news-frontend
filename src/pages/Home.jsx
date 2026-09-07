import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiBriefcase, FiMapPin, FiImage, FiExternalLink } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import AdBanner from '../components/ui/AdBanner.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { usePublicContent } from '../context/PublicContentContext.jsx'
import HeroSlider from '../components/news/HeroSlider.jsx'
import NewsCard from '../components/news/NewsCard.jsx'
import MostRead from '../components/widgets/MostRead.jsx'
import { ApiErrorState, EmptyState } from '../components/ui/ApiState.jsx'

const FALLBACK = '/news-placeholder.svg'

// ── Sub-components ────────────────────────────────────────────────────────

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
    <Link to={`/article/${article.slug}`}
      className="flex gap-2 items-start py-2 border-b border-black/5 last:border-0 group">
      <img src={article.image} alt={titleFn(article)}
        className="w-14 h-10 object-cover rounded shrink-0"
        onError={(e) => { e.target.src = FALLBACK }} />
      <div className="min-w-0">
        <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors text-ink">
          {titleFn(article)}
        </p>
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
        <Link to={`/category/${col.slug}`} className={`text-[10px] ${col.accent} hover:underline font-semibold`}>
          {moreLabel}
        </Link>
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
            <img src={articles[0].image} alt={titleFn(articles[0])}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = FALLBACK }} />
          </div>
          <p className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors text-ink">
            {titleFn(articles[0])}
          </p>
          <p className="text-[11px] text-ink-soft mt-1 line-clamp-2 hidden sm:block">
            {excerptFn(articles[0])}
          </p>
        </Link>
      ) : null}

      <div className="px-3 pb-3 flex-1">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ArticleRow key={i} article={null} titleFn={titleFn} />)
          : articles.slice(1, 5).map((a) => <ArticleRow key={a.id} article={a} titleFn={titleFn} />)
        }
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function Home() {
  const { lang, t } = useLang()
  const { categories } = usePublicContent()

  // Language helpers
  const titleFn   = (a) => lang === 'TA' ? (a.titleTA   || a.title)   : a.title
  const excerptFn = (a) => lang === 'TA' ? (a.excerptTA || a.excerpt) : a.excerpt

  const NEWS_COLS = useMemo(() => {
    const styles = [
      ['bg-primary', 'text-yellow-200'], ['bg-secondary', 'text-blue-200'],
      ['bg-green-700', 'text-green-200'], ['bg-amber-600', 'text-amber-100'],
    ]
    return categories.slice(0, 4).map((category, index) => ({ ...category, headerBg: styles[index][0], accent: styles[index][1] }))
  }, [categories])

  const [colData, setColData] = useState({})
  const [videos,  setVideos]  = useState(null)
  const [gallery, setGallery] = useState(null)
  const [jobs,    setJobs]    = useState(null)
  const [weather, setWeather] = useState(null)
  const [home, setHome] = useState(null)
  const [homeError, setHomeError] = useState(null)
  const [columnError, setColumnError] = useState(null)

  useEffect(() => {
    if (!NEWS_COLS.length) return undefined
    const controller = new AbortController()
    Promise.all(NEWS_COLS.map((c) => newsService.getByCategory(c.slug, 5, { signal: controller.signal })))
      .then((results) => {
        const map = {}
        NEWS_COLS.forEach((c, i) => { map[c.slug] = results[i] })
        setColData(map)
      }).catch((error) => { if (error.code !== 'REQUEST_CANCELLED') setColumnError(error) })
    return () => controller.abort()
  }, [NEWS_COLS])

  useEffect(() => {
    const controller = new AbortController()
    newsService.getHome({ signal: controller.signal }).then(setHome).catch((error) => {
      if (error.code !== 'REQUEST_CANCELLED') setHomeError(error)
    })
    Promise.allSettled([
      newsService.getVideos({ signal: controller.signal }),
      newsService.getGallery({ signal: controller.signal }),
      newsService.getJobs({ signal: controller.signal }),
      newsService.getWeather(undefined, { signal: controller.signal }),
    ]).then(([videoResult, galleryResult, jobsResult, weatherResult]) => {
      if (controller.signal.aborted) return
      setVideos(videoResult.status === 'fulfilled' ? videoResult.value.slice(0, 3) : [])
      setGallery(galleryResult.status === 'fulfilled' ? galleryResult.value.slice(0, 4) : [])
      setJobs(jobsResult.status === 'fulfilled' ? jobsResult.value.slice(0, 4) : [])
      setWeather(weatherResult.status === 'fulfilled' ? weatherResult.value : null)
    })
    return () => controller.abort()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <h1 className="sr-only">{home?.site?.siteName || 'Kanyakumari News'}</h1>
      <div className="container-page py-5 space-y-8">

        <section aria-label="Featured news">
          {homeError ? <ApiErrorState error={homeError} /> : home ? <HeroSlider articles={home.hero} /> : <div className="aspect-[21/8] animate-pulse rounded bg-black/5" />}
        </section>

        {/* ── LIVE SCROLLER ── */}
        <div className="overflow-hidden rounded-md shadow-md">
          <div className="bg-red-700 text-white flex items-center h-11">
            {/* Label badge */}
            <div className="shrink-0 flex items-center gap-2 bg-red-900 px-4 h-full border-r border-white/20">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">{t.liveUpdates}</span>
            </div>
            {/* Scrolling news */}
            <div className="flex-1 overflow-hidden">
              {home?.latest?.items?.length ? (
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...home.latest.items, ...home.latest.items].map((item, i) => (
                    item.slug
                      ? <Link
                          key={`live-${item.id}-${i}`}
                          to={`/article/${item.slug}`}
                          className="inline-flex items-center gap-2 mx-10 text-sm font-medium hover:underline"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                          {item.title || item.titleTA}
                        </Link>
                      : <span
                          key={`live-${item.id}-${i}`}
                          className="inline-flex items-center gap-2 mx-10 text-sm font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                          {item.title || item.titleTA}
                        </span>
                  ))}
                </div>
              ) : (
                <span className="px-6 text-sm text-white/60">{t.loadingLiveUpdates}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── AD BANNERS BELOW LIVE UPDATES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ad slot 1 */}
          <div className="flex items-center justify-center h-24 rounded-md border-2 border-dashed border-black/15 bg-black/[0.03] text-ink-soft text-xs font-medium tracking-wide select-none">
            {t.advertisementSlot}
          </div>
          {/* Ad slot 2 */}
          <div className="flex items-center justify-center h-24 rounded-md border-2 border-dashed border-black/15 bg-black/[0.03] text-ink-soft text-xs font-medium tracking-wide select-none">
            {t.advertisementSlot}
          </div>
        </div>

        {home && (
          <section className="grid grid-cols-1 gap-8">
            <div>
              <h2 className="section-title mb-5">{t.latestNews}</h2>
              {home.latest.items.length === 0 ? <EmptyState /> : <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {home.latest.items.slice(0, 6).map((article) => <NewsCard key={article.id} article={article} />)}
              </div>}
            </div>
            {/* <MostRead initialItems={home.trending} /> */}
          </section>
        )}

        {/* ── ROW 1: TWO AD BANNERS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AdBanner size="leaderboard" index={0} />
          <AdBanner size="leaderboard" index={2} />
        </div>

        {/* ── ROW 2: 4-COLUMN NEWS GRID ── */}
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

        {/* ── ROW 3: DISTRICT INFO | NEWS VIDEOS | JOBS | TOURIST ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* District Info */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10">
            <div className="bg-ink px-3 py-2 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <FiMapPin size={11} /> {t.districtInfo}
              </h3>
              <Link to="/district-info" className="text-[10px] text-accent hover:underline">{t.moreLink}</Link>
            </div>
            <div className="p-3">
              {[t.taluks, t.govtOffices, t.emergencyHelplines, t.weatherToday, t.busTrainSchedule].map((label) => (
                <Link key={label} to="/district-info"
                  className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-primary transition-colors py-1.5 border-b border-black/5 last:border-0">
                  <FiArrowRight size={10} className="shrink-0 text-primary" /> {label}
                </Link>
              ))}
              {weather?.available !== false && weather?.tempC !== undefined && (
                <div className="mt-2 pt-2 border-t border-black/8 text-[11px] text-ink-soft flex items-center gap-1">
                  🌤 {weather.city} · {weather.tempC}°C · {weather.condition}
                </div>
              )}
            </div>
          </div>

          {/* News Videos */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10">
            <div className="bg-ink px-3 py-2 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <FiPlay size={11} /> {t.newsVideos}
              </h3>
              <Link to="/videos" className="text-[10px] text-accent hover:underline">{t.moreLink}</Link>
            </div>
            <div className="p-3 space-y-3">
              {videos === null
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-2 animate-pulse">
                      <div className="w-16 h-10 bg-black/10 rounded shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 bg-black/10 rounded" />
                        <div className="h-2.5 w-3/4 bg-black/10 rounded" />
                      </div>
                    </div>
                  ))
                : videos.map((v) => (
                    <Link key={v.id} to="/videos" className="flex gap-2 items-start group">
                      <div className="relative w-16 h-10 shrink-0 rounded overflow-hidden bg-black/10">
                        <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg` }} />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                            <FiPlay size={8} />
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug text-ink">
                        {v.title}
                      </p>
                    </Link>
                  ))
              }
            </div>
          </div>

          {/* Jobs */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10">
            <div className="bg-ink px-3 py-2 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <FiBriefcase size={11} /> {t.jobsLinks}
              </h3>
              <Link to="/jobs" className="text-[10px] text-accent hover:underline">{t.moreLink}</Link>
            </div>
            <div className="p-3">
              {jobs === null
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="py-2 animate-pulse border-b border-black/5 last:border-0">
                      <div className="h-2.5 bg-black/10 rounded mb-1.5" />
                      <div className="h-2 w-3/4 bg-black/10 rounded" />
                    </div>
                  ))
                : jobs.map((j) => (
                    <Link key={j.id} to="/jobs"
                      className="block py-2 border-b border-black/5 last:border-0 group">
                      <p className="text-xs font-semibold text-ink group-hover:text-primary transition-colors line-clamp-1">{j.title}</p>
                      <p className="text-[10px] text-ink-soft mt-0.5">{j.org} · {j.location}</p>
                      <p className="text-[10px] font-mono text-primary mt-0.5">
                        {new Date(j.lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </Link>
                  ))
              }
              <Link to="/jobs" className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
                <FiExternalLink size={11} /> {t.allJobListings}
              </Link>
            </div>
          </div>

          {/* Tourist Info */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden border border-black/10">
            <div className="bg-ink px-3 py-2 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <FiImage size={11} /> {t.touristInfo}
              </h3>
              <Link to="/tourist-info" className="text-[10px] text-accent hover:underline">{t.moreLink}</Link>
            </div>
            <div className="p-3">
              {gallery === null ? (
                <div className="aspect-video bg-black/10 rounded animate-pulse mb-3" />
              ) : gallery[0] ? (
                <Link to="/tourist-info" className="group block aspect-video rounded overflow-hidden mb-3 bg-black/5">
                  <img src={gallery[0].image} alt="Kanyakumari"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = FALLBACK }} />
                </Link>
              ) : null}
              {[t.vivekanandaRock, t.thiruvalluvarStatue, t.kumariAmmanTemple, t.kanyakumariBeach].map((name) => (
                <Link key={name} to="/tourist-info"
                  className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-primary transition-colors py-1.5 border-b border-black/5 last:border-0">
                  <FiArrowRight size={10} className="shrink-0 text-primary" /> {name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── BOTTOM AD ── */}
        <AdBanner size="inline" index={0} />

      </div>
    </div>
  )
}

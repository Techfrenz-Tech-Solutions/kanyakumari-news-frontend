import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiBriefcase, FiMapPin, FiImage } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import AdBanner from '../components/ui/AdBanner.jsx'
import { useLang } from '../context/LanguageContext.jsx'

const FALLBACK = 'https://picsum.photos/id/0/400/250'
// Hero background — Kanyakumari coastline
const HERO_BG = 'https://picsum.photos/id/15/1400/600'

function shortDate(iso) {
  const d = new Date(iso), now = new Date()
  const diffH = Math.floor((now - d) / 3600000)
  if (diffH < 1)  return 'Just now'
  if (diffH < 24) return `${diffH}h ago`
  const diffD = Math.floor(diffH / 24)
  if (diffD === 1) return '1 day ago'
  if (diffD < 7)  return `${diffD} days ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// ── News Column ───────────────────────────────────────────────────────────
function NewsColumn({ slug, label, headerColor, articles, loading, lang, moreLabel }) {
  const titleOf   = (a) => lang === 'TA' ? (a.titleTA   || a.title)   : a.title
  const excerptOf = (a) => lang === 'TA' ? (a.excerptTA || a.excerpt) : a.excerpt
  const lead = articles[0]
  const rest = articles.slice(1, 5)

  // headerColor can be a Tailwind class (e.g. 'bg-primary') or a hex string (e.g. '#0F172A')
  const isHex = headerColor.startsWith('#')

  return (
    <div className="flex flex-col bg-white border border-black/10 min-w-0">
      <div
        className={`flex items-center justify-between px-3 py-2 ${isHex ? '' : headerColor}`}
        style={isHex ? { backgroundColor: headerColor } : undefined}
      >
        <span className="text-xs font-black uppercase tracking-widest text-white">{label}</span>
        <Link to={`/category/${slug}`} className="text-[10px] font-semibold text-white/80 hover:text-white">
          {moreLabel}
        </Link>
      </div>

      {loading ? (
        <div className="p-3 space-y-2 animate-pulse">
          <div className="aspect-video bg-black/10 rounded" />
          <div className="h-3 bg-black/10 rounded" />
          <div className="h-3 w-3/4 bg-black/10 rounded" />
        </div>
      ) : lead ? (
        <Link to={`/article/${lead.slug}`} className="group block border-b border-black/8">
          <img src={lead.image} alt={titleOf(lead)}
            className="w-full aspect-video object-cover"
            onError={(e) => { e.target.src = FALLBACK }} />
          <div className="p-3">
            <p className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {titleOf(lead)}
            </p>
            <p className="text-xs text-ink-soft mt-1 line-clamp-2 hidden sm:block">{excerptOf(lead)}</p>
          </div>
        </Link>
      ) : null}

      <ul className="divide-y divide-black/5 flex-1">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex gap-2 p-2 animate-pulse">
                <div className="w-14 h-10 bg-black/10 rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-black/10 rounded" />
                  <div className="h-2.5 w-3/4 bg-black/10 rounded" />
                </div>
              </li>
            ))
          : rest.map((a) => (
              <li key={a.id}>
                <Link to={`/article/${a.slug}`}
                  className="flex gap-2 p-2 items-start group hover:bg-black/2 transition-colors">
                  <img src={a.image} alt={titleOf(a)}
                    className="w-14 h-10 object-cover rounded shrink-0"
                    onError={(e) => { e.target.src = FALLBACK }} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {titleOf(a)}
                    </p>
                    <p className="text-[10px] text-ink-soft font-mono mt-0.5">{shortDate(a.publishedAt)}</p>
                  </div>
                </Link>
              </li>
            ))
        }
      </ul>
    </div>
  )
}

// ── Main Home ─────────────────────────────────────────────────────────────
export default function Home() {
  const { lang, t } = useLang()

  const NEWS_COLS = [
    { slug: 'kanyakumari', label: t.kanyakumariNews, headerColor: 'bg-primary'   },
    { slug: 'tamil-nadu',  label: t.tamilnaduNews,   headerColor: 'bg-secondary' },
    { slug: 'national',    label: t.nationalNews,     headerColor: '#0F172A'      },
    { slug: 'world',       label: t.worldNews,        headerColor: 'bg-amber-600' },
  ]

  const [colData,        setColData]        = useState({})
  const [videos,         setVideos]         = useState(null)
  const [gallery,        setGallery]        = useState(null)
  const [jobs,           setJobs]           = useState(null)
  const [weather,        setWeather]        = useState(null)
  const [liveHeadlines,  setLiveHeadlines]  = useState([])

  useEffect(() => {
    Promise.all(NEWS_COLS.map((c) => newsService.getByCategory(c.slug, 5))).then((results) => {
      const map = {}
      NEWS_COLS.forEach((c, i) => { map[c.slug] = results[i] })
      setColData(map)
    })
    newsService.getVideos().then((v) => setVideos(v.slice(0, 3)))
    newsService.getGallery().then((g) => setGallery(g.slice(0, 1)))
    newsService.getJobs().then((j) => setJobs(j.slice(0, 4)))
    newsService.getWeather().then(setWeather)
    newsService.getBreakingHeadlines().then(setLiveHeadlines)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const touristLinks  = [t.vivekanandaRock, t.thiruvalluvarStatue, t.kumariAmmanTemple, t.kanyakumariBeach]
  const districtLinks = [t.taluks, t.govtOffices, t.emergencyHelplines, t.weatherToday, t.busTrainSchedule]

  // Live update scroller: repeat headlines for seamless loop
  const scrollLoop = liveHeadlines.length > 0
    ? [...liveHeadlines, ...liveHeadlines, ...liveHeadlines]
    : [
        lang === 'TA' ? 'கன்னியாகுமரி டுடேக்கு வரவேற்கிறோம் — நேரடி செய்தி புதுப்பிப்புகள்' : 'Welcome to Kanyakumari Today — Live News Updates',
        lang === 'TA' ? 'சமீபத்திய செய்திகளுக்கு எங்களை பின்தொடருங்கள்' : 'Follow us for the latest news from Kanyakumari District',
        lang === 'TA' ? 'உள்ளூர் செய்திகள் · தமிழ்நாடு · தேசிய · உலக' : 'Local News · Tamil Nadu · National · World',
      ].concat([
        lang === 'TA' ? 'கன்னியாகுமரி டுடேக்கு வரவேற்கிறோம் — நேரடி செய்தி புதுப்பிப்புகள்' : 'Welcome to Kanyakumari Today — Live News Updates',
        lang === 'TA' ? 'சமீபத்திய செய்திகளுக்கு எங்களை பின்தொடருங்கள்' : 'Follow us for the latest news from Kanyakumari District',
        lang === 'TA' ? 'உள்ளூர் செய்திகள் · தமிழ்நாடு · தேசிய · உலக' : 'Local News · Tamil Nadu · National · World',
      ])

  return (
    <div className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO: half-page background image + welcome text
      ══════════════════════════════════════════════════════ */}
      <div className="relative w-full" style={{ height: '50vh', minHeight: '280px', maxHeight: '480px' }}>
        {/* Background image */}
        <img
          src={HERO_BG}
          alt="Kanyakumari"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Welcome text — centred on the image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
            {lang === 'TA'
              ? 'கன்னியாகுமரி செய்திகளுக்கு வரவேற்கிறோம்'
              : 'Welcome to Kanyakumari News'
            }
          </h1>
          <p className="mt-3 text-white/80 text-base md:text-xl font-semibold tracking-wide drop-shadow">
            {lang === 'TA' ? 'நேரடி செய்தி புதுப்பிப்புகள்' : 'Live News Updates'}
          </p>
        </div>

        {/* Live update scroller — pinned at bottom of hero image */}
        <div className="absolute bottom-0 left-0 right-0 bg-ink/90 flex items-center h-9 overflow-hidden">
          {/* LIVE badge */}
          <div className="shrink-0 flex items-center gap-1.5 px-3 h-full border-r border-white/20 bg-primary">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
            <span className="text-xs font-black uppercase tracking-widest text-white">
              {lang === 'TA' ? 'நேரடி' : 'LIVE'}
            </span>
          </div>
          {/* Scrolling headlines */}
          <div className="relative flex-1 overflow-hidden h-full flex items-center">
            <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
              {scrollLoop.map((h, i) => (
                <span key={i} className="text-sm font-medium text-white/90">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — TWO ADVERTISEMENT BANNERS
      ══════════════════════════════════════════════════════ */}
      <div className="container-page pt-5 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdBanner size="leaderboard" index={0} />
          <AdBanner size="leaderboard" index={1} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — 4-COLUMN NEWS GRID
      ══════════════════════════════════════════════════════ */}
      <div className="container-page py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEWS_COLS.map((col) => (
            <NewsColumn
              key={col.slug}
              slug={col.slug}
              label={col.label}
              headerColor={col.headerColor}
              articles={colData[col.slug] || []}
              loading={!colData[col.slug]}
              lang={lang}
              moreLabel={t.moreLink}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — INFO GRID: District | Videos | Jobs | Tourist
      ══════════════════════════════════════════════════════ */}
      <div className="container-page pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* District Info */}
          <div className="bg-white border border-black/10 flex flex-col">
            <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: '#0d7377' }}>
              <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                <FiMapPin size={12} /> {t.districtInfo}
              </span>
              <Link to="/district-info" className="text-[10px] font-semibold text-white/80 hover:text-white">{t.moreLink}</Link>
            </div>
            <div className="p-3 flex-1">
              <ul className="divide-y divide-black/5">
                {districtLinks.map((label) => (
                  <li key={label}>
                    <Link to="/district-info"
                      className="flex items-center gap-1.5 py-2 text-sm text-ink-soft hover:text-primary transition-colors">
                      <FiArrowRight size={11} className="text-primary shrink-0" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
              {weather && (
                <div className="mt-2 pt-2 border-t border-black/8 text-xs text-ink-soft flex items-center gap-1">
                  🌤 {weather.city} · {weather.tempC}°C · {weather.condition}
                </div>
              )}
            </div>
          </div>

          {/* News Videos */}
          <div className="bg-white border border-black/10 flex flex-col">
            <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: '#0d7377' }}>
              <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                <FiPlay size={12} /> {t.newsVideos}
              </span>
              <Link to="/videos" className="text-[10px] font-semibold text-white/80 hover:text-white">{t.moreLink}</Link>
            </div>
            <div className="p-3 flex-1 space-y-3">
              {videos === null
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-2 animate-pulse">
                      <div className="w-16 h-11 bg-black/10 rounded shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 bg-black/10 rounded" />
                        <div className="h-2.5 w-3/4 bg-black/10 rounded" />
                      </div>
                    </div>
                  ))
                : videos.map((v) => (
                    <Link key={v.id} to="/videos" className="flex gap-2 items-start group">
                      <div className="relative w-16 h-11 shrink-0 rounded overflow-hidden bg-black/10">
                        <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg` }} />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                            <FiPlay size={8} />
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {v.title}
                      </p>
                    </Link>
                  ))
              }
            </div>
          </div>

          {/* Jobs Links */}
          <div className="bg-white border border-black/10 flex flex-col">
            <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: '#0d7377' }}>
              <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                <FiBriefcase size={12} /> {t.jobsLinks}
              </span>
              <Link to="/jobs" className="text-[10px] font-semibold text-white/80 hover:text-white">{t.moreLink}</Link>
            </div>
            <div className="p-3 flex-1">
              {jobs === null
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="py-2 animate-pulse border-b border-black/5 last:border-0">
                      <div className="h-2.5 bg-black/10 rounded mb-1.5" />
                      <div className="h-2 w-3/4 bg-black/10 rounded" />
                    </div>
                  ))
                : (
                  <>
                    <ul className="divide-y divide-black/5">
                      {jobs.map((j) => (
                        <li key={j.id}>
                          <Link to="/jobs" className="block py-2 group">
                            <p className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-1">{j.title}</p>
                            <p className="text-xs text-ink-soft mt-0.5">{j.org}</p>
                            <p className="text-[11px] font-mono text-primary mt-0.5">
                              {new Date(j.lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/jobs" className="mt-2 flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      📋 {t.allJobListings}
                    </Link>
                  </>
                )
              }
            </div>
          </div>

          {/* Tourist Info */}
          <div className="bg-white border border-black/10 flex flex-col">
            <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: '#0d7377' }}>
              <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                <FiImage size={12} /> {t.touristInfo}
              </span>
              <Link to="/tourist-info" className="text-[10px] font-semibold text-white/80 hover:text-white">{t.moreLink}</Link>
            </div>
            <div className="p-3 flex-1">
              {gallery === null ? (
                <div className="aspect-[4/3] bg-black/10 rounded animate-pulse mb-3" />
              ) : gallery[0] ? (
                <Link to="/tourist-info" className="group block mb-3">
                  <img src={gallery[0].image} alt="Kanyakumari"
                    className="w-full aspect-[4/3] object-cover rounded group-hover:opacity-90 transition-opacity"
                    onError={(e) => { e.target.src = FALLBACK }} />
                </Link>
              ) : null}
              <ul className="divide-y divide-black/5">
                {touristLinks.map((name) => (
                  <li key={name}>
                    <Link to="/tourist-info"
                      className="flex items-center gap-1.5 py-2 text-sm text-ink-soft hover:text-primary transition-colors">
                      <FiArrowRight size={11} className="text-primary shrink-0" /> {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom ad */}
        <div className="mt-4">
          <AdBanner size="inline" index={0} />
        </div>
      </div>

    </div>
  )
}

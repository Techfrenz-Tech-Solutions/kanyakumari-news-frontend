import { useState, useEffect } from 'react'
import { leaderboardAds, rectangleAds, inlineAds } from '../../data/adsData.js'
import { useLang } from '../../context/LanguageContext.jsx'

const POOLS     = { leaderboard: leaderboardAds, rectangle: rectangleAds, inline: inlineAds }
const INTERVALS = { leaderboard: 5000, rectangle: 8000, inline: 6000 }

function LeaderboardAd({ ad, lang }) {
  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer"
      className={`w-full flex items-center gap-4 px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r ${ad.bg} ${ad.text} shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 overflow-hidden relative`}
      aria-label={`Advertisement: ${ad.brand}`}
    >
      <img src={ad.image} alt={ad.brand}
        className="w-20 h-12 object-cover rounded shrink-0 opacity-90"
        onError={(e) => { e.target.style.display = 'none' }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-black text-sm md:text-base leading-none">{ad.brand}</span>
          {ad.badge && (
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${ad.badgeBg}`}>{ad.badge}</span>
          )}
        </div>
        <p className="text-xs md:text-sm opacity-90 mt-0.5 line-clamp-1">{ad.tagline}</p>
      </div>
      <span className="shrink-0 hidden sm:flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-sm transition-colors">
        {lang === 'TA' ? 'மேலும் அறிக →' : 'Learn More →'}
      </span>
      <span className="absolute top-1 right-1 text-[8px] opacity-40 font-mono">AD</span>
    </a>
  )
}

function RectangleAd({ ad, lang }) {
  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer"
      className={`w-full block rounded-md overflow-hidden cursor-pointer bg-gradient-to-br ${ad.bg} ${ad.text} shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 relative`}
      aria-label={`Advertisement: ${ad.brand}`}
    >
      <div className="w-full h-40 overflow-hidden">
        <img src={ad.image} alt={ad.brand}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
          onError={(e) => { e.target.style.display = 'none' }} />
      </div>
      <div className="p-4">
        <p className="font-black text-base leading-tight">{ad.brand}</p>
        <p className="text-sm opacity-90 mt-1 font-semibold">{ad.tagline}</p>
        {ad.sub && <p className="text-xs opacity-75 mt-1">{ad.sub}</p>}
        <span className="inline-flex mt-3 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-1.5 rounded-sm transition-colors">
          {lang === 'TA' ? 'இங்கே கிளிக் செய்க →' : 'Click Here →'}
        </span>
      </div>
      <span className="absolute top-2 right-2 text-[9px] opacity-50 font-mono bg-black/20 px-1 py-0.5 rounded">AD</span>
    </a>
  )
}

function InlineAd({ ad, lang }) {
  return (
    <a href={ad.link} target={ad.link.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`w-full flex items-center gap-4 px-5 py-3 rounded-md cursor-pointer bg-gradient-to-r ${ad.bg} ${ad.text} shadow hover:shadow-md hover:brightness-110 transition-all duration-300 overflow-hidden relative`}
      aria-label={`Advertisement: ${ad.brand}`}
    >
      <img src={ad.image} alt={ad.brand}
        className="w-16 h-10 object-cover rounded shrink-0 opacity-80"
        onError={(e) => { e.target.style.display = 'none' }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm">{ad.brand}</span>
          {ad.badge && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white/20">{ad.badge}</span>
          )}
        </div>
        <p className="text-xs opacity-90 mt-0.5 line-clamp-1">{ad.tagline}</p>
      </div>
      <span className="shrink-0 hidden sm:flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap">
        {lang === 'TA' ? 'விவரங்கள் காண →' : 'View Details →'}
      </span>
      <span className="absolute top-1 right-1 text-[8px] opacity-30 font-mono">AD</span>
    </a>
  )
}

export default function AdBanner({ size = 'leaderboard', index = 0, className = '' }) {
  const { lang } = useLang()
  const pool     = POOLS[size] || POOLS.leaderboard
  const interval = INTERVALS[size] || 5000
  const [current, setCurrent] = useState(index % pool.length)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % pool.length), interval)
    return () => clearInterval(timer)
  }, [pool.length, interval])

  const ad = pool[current]

  return (
    <div className={`w-full ${className}`}>
      {size === 'leaderboard' && <LeaderboardAd ad={ad} lang={lang} />}
      {size === 'rectangle'   && <RectangleAd   ad={ad} lang={lang} />}
      {size === 'inline'      && <InlineAd       ad={ad} lang={lang} />}
    </div>
  )
}

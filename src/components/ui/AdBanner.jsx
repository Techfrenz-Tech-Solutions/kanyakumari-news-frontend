import { useState, useEffect } from 'react'
import { leaderboardAds, rectangleAds, inlineAds } from '../../data/adsData.js'

const POOLS     = { leaderboard: leaderboardAds, rectangle: rectangleAds, inline: inlineAds }
const INTERVALS = { leaderboard: 6000, rectangle: 8000, inline: 7000 }

// ── Leaderboard — dark bg, image left, brand + badge + tagline, teal CTA button ──
function LeaderboardAd({ ad }) {
  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer"
      className="w-full flex items-center gap-3 px-4 py-2.5 rounded cursor-pointer no-underline"
      style={{ backgroundColor: '#1a1a2e', minHeight: '90px' }}
      aria-label={`Ad: ${ad.brand}`}
    >
      {/* Thumbnail */}
      {ad.image && (
        <img src={ad.image} alt={ad.brand}
          className="w-16 h-16 object-cover rounded shrink-0"
          onError={(e) => { e.target.style.display = 'none' }} />
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-white leading-none">{ad.brand}</span>
          {ad.badge && (
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: ad.badgeColor }}>
              {ad.badge}
            </span>
          )}
        </div>
        <p className="text-xs mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {ad.tagline}
        </p>
      </div>

      {/* Teal CTA button — exactly like screenshot */}
      <span className="shrink-0 hidden sm:inline-flex items-center gap-1 text-white text-sm font-bold px-5 py-3 rounded"
        style={{ backgroundColor: '#0d7377', whiteSpace: 'nowrap' }}>
        Learn More →
      </span>

      {/* Small AD label */}
      <span className="absolute top-1 right-1 text-[8px] opacity-30 text-white font-mono pointer-events-none">AD</span>
    </a>
  )
}

// ── Rectangle — dark bg card with image header ──────────────────────────
function RectangleAd({ ad }) {
  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer"
      className="w-full block rounded overflow-hidden cursor-pointer no-underline relative"
      style={{ backgroundColor: '#1a1a2e' }}
      aria-label={`Ad: ${ad.brand}`}
    >
      {ad.image && (
        <div className="w-full h-36 overflow-hidden">
          <img src={ad.image} alt={ad.brand}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => { e.target.style.display = 'none' }} />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-black text-white leading-tight">{ad.brand}</p>
          {ad.badge && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: ad.badgeColor }}>
              {ad.badge}
            </span>
          )}
        </div>
        <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>{ad.tagline}</p>
        {ad.sub && <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{ad.sub}</p>}
        <span className="inline-flex mt-2.5 text-white text-xs font-bold px-3 py-1.5 rounded"
          style={{ backgroundColor: '#0d7377' }}>
          Learn More →
        </span>
      </div>
      <span className="absolute top-1.5 right-1.5 text-[9px] opacity-40 text-white font-mono bg-black/30 px-1 rounded pointer-events-none">AD</span>
    </a>
  )
}

// ── Inline — full-width dark strip ────────────────────────────────────────
function InlineAd({ ad }) {
  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer"
      className="w-full flex items-center gap-3 px-5 py-3 rounded cursor-pointer no-underline relative"
      style={{ backgroundColor: '#1a1a2e', minHeight: '56px' }}
      aria-label={`Ad: ${ad.brand}`}
    >
      {ad.image && (
        <img src={ad.image} alt={ad.brand}
          className="w-12 h-12 object-cover rounded shrink-0 opacity-85"
          onError={(e) => { e.target.style.display = 'none' }} />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-white">{ad.brand}</span>
          {ad.badge && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: ad.badgeColor }}>
              {ad.badge}
            </span>
          )}
        </div>
        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{ad.tagline}</p>
      </div>
      <span className="shrink-0 hidden sm:inline-flex items-center gap-1 text-white text-xs font-bold px-4 py-2 rounded"
        style={{ backgroundColor: '#0d7377', whiteSpace: 'nowrap' }}>
        View Details →
      </span>
      <span className="absolute top-1 right-1 text-[8px] opacity-25 text-white font-mono pointer-events-none">AD</span>
    </a>
  )
}

// ── Main export ───────────────────────────────────────────────────────────
export default function AdBanner({ size = 'leaderboard', index = 0, className = '' }) {
  const pool     = POOLS[size] || POOLS.leaderboard
  const interval = INTERVALS[size] || 6000
  const [current, setCurrent] = useState(index % pool.length)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % pool.length), interval)
    return () => clearInterval(timer)
  }, [pool.length, interval])

  const ad = pool[current]

  return (
    <div className={`w-full relative ${className}`}>
      {size === 'leaderboard' && <LeaderboardAd ad={ad} />}
      {size === 'rectangle'   && <RectangleAd   ad={ad} />}
      {size === 'inline'      && <InlineAd       ad={ad} />}
    </div>
  )
}

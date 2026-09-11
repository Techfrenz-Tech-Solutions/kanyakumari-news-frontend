import { useEffect, useMemo, useState } from 'react'
import newsService from '../../services/newsService.js'

const POSITION_BY_SIZE = {
  leaderboard: 'leaderboard',
  rectangle: 'rectangle',
  inline: 'inline',
  footer: 'footer',
  popup: 'popup',
}

export default function AdBanner({ size = 'leaderboard', index = null, max = null }) {
  const [ads, setAds] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    newsService.getAds({ signal: controller.signal }).then(setAds).catch(() => {})
    return () => controller.abort()
  }, [])

  const visibleAds = useMemo(() => {
    const position = POSITION_BY_SIZE[size] || size
    const matches = ads.filter((ad) => ad.position === position && ad.imageUrl)
    const selected = index === null || index === undefined
      ? matches
      : matches[index]
        ? [matches[index]]
        : []
    return max ? selected.slice(0, max) : selected
  }, [ads, index, max, size])

  if (!visibleAds.length) return null

  const isRectangle = size === 'rectangle'
  return (
    <div className={isRectangle ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
      {visibleAds.map((ad) => {
        const image = (
          <img
            src={ad.imageUrl}
            alt={ad.title || 'Advertisement'}
            className={`w-full rounded-md border border-black/10 object-cover ${isRectangle ? 'aspect-[6/5]' : 'h-24'}`}
          />
        )
        return ad.linkUrl ? (
          <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer" aria-label={ad.title || 'Advertisement'}>
            {image}
          </a>
        ) : (
          <div key={ad.id}>{image}</div>
        )
      })}
    </div>
  )
}

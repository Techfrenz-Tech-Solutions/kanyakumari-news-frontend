import { useEffect, useState } from 'react'
import { FiClock, FiTag } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import newsService from '../services/newsService.js'
import { ApiErrorState, EmptyState } from '../components/ui/ApiState.jsx'

export default function TouristInfo() {
  const { t } = useLang()
  const [touristAttractions, setAttractions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    newsService.getTouristAttractions({ signal: controller.signal }).then(setAttractions)
      .catch((requestError) => { if (requestError.code !== 'REQUEST_CANCELLED') setError(requestError) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={touristAttractions[0]?.image || '/news-placeholder.svg'}
          alt="Kanyakumari"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">{t.touristTitle}</h1>
          <p className="text-white/80 mt-2 text-base md:text-lg max-w-xl">{t.touristSubtitle}</p>
        </div>
      </div>

      <div className="container-page py-10">
        <h2 className="section-title mb-6">{t.topAttractions}</h2>

        {error ? <ApiErrorState error={error} /> : loading ? (
          <div className="h-52 animate-pulse rounded bg-black/5" />
        ) : touristAttractions.length === 0 ? <EmptyState /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {touristAttractions.map((place) => (
              <div key={place.id} className="card-surface overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={place.image || '/news-placeholder.svg'}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="eyebrow mb-1 block">{place.category}</span>
                  <h3 className="font-bold text-sm text-ink dark:text-white leading-snug mb-2">{place.name}</h3>
                  <p className="text-xs text-ink-soft dark:text-white/60 leading-relaxed line-clamp-3 mb-3">{place.description}</p>
                  <div className="space-y-1 text-xs text-ink-soft dark:text-white/50 font-mono">
                    {place.timings  && <div className="flex items-center gap-1.5"><FiClock size={11} /> {place.timings}</div>}
                    {place.entryFee && <div className="flex items-center gap-1.5"><FiTag  size={11} /> {place.entryFee}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

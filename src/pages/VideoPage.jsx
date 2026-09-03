import { useEffect, useState } from 'react'
import { FiEye, FiPlay } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import { formatNumber } from '../utils/format.js'
import { useLang } from '../context/LanguageContext.jsx'
import { ApiErrorState, EmptyState } from '../components/ui/ApiState.jsx'
import { contentState } from '../utils/article.js'

export default function VideoPage() {
  const { t } = useLang()
  const [videos, setVideos] = useState([])
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    newsService.getVideos({ signal: controller.signal })
      .then((v) => { setVideos(v); setActive(v[0] || null) })
      .catch((requestError) => { if (requestError.code !== 'REQUEST_CANCELLED') setError(requestError) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  const state = contentState({ loading, error, items: videos })

  if (state === 'loading') return (
    <div className="container-page py-8">
      <div className="aspect-video bg-black/10 dark:bg-white/10 animate-pulse rounded-md" />
    </div>
  )

  if (state === 'error') return <div className="container-page py-8"><ApiErrorState error={error} /></div>
  if (state === 'empty') return <div className="container-page py-8"><EmptyState /></div>

  const otherVideos = videos.filter((v) => v.id !== active.id)

  return (
    <div>
      <div className="bg-ink dark:bg-black text-white py-8">
        <div className="container-page">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{t.videosTitle}</h1>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Featured player */}
          <div className="lg:col-span-2">
            <div className="relative w-full rounded-md overflow-hidden bg-black" style={{ paddingBottom: '56.25%' }}>
              <iframe key={active.youtubeId} className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
            <h2 className="font-display text-xl font-bold mt-4 leading-snug">{active.title}</h2>
            <p className="text-sm text-ink-soft dark:text-white/50 flex items-center gap-1 mt-1 font-mono">
              <FiEye size={13} /> {formatNumber(active.views)} {t.views} · {active.duration}
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {videos.slice(0, 3).map((v) => (
                <button key={v.id} onClick={() => setActive(v)}
                  className={`group text-left rounded-md overflow-hidden border-2 transition-colors ${
                    active.id === v.id ? 'border-primary' : 'border-transparent hover:border-primary/50'
                  }`}>
                  <div className="relative aspect-video bg-black">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg` }} />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center text-white">
                        <FiPlay size={12} />
                      </span>
                    </div>
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 text-white px-1.5 py-0.5 rounded font-mono">{v.duration}</span>
                  </div>
                  <p className="text-xs font-semibold p-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{v.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* More videos */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-ink dark:text-white border-l-4 border-primary pl-3">{t.moreVideos}</h3>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded flex items-center justify-center min-h-[180px] mb-4">
              <span className="text-xs text-amber-600 dark:text-amber-400 font-mono tracking-widest text-center">AD<br/>300×250</span>
            </div>
            <div className="space-y-3">
              {otherVideos.map((v) => (
                <button key={v.id} onClick={() => setActive(v)}
                  className="w-full flex gap-3 items-start text-left p-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <div className="relative w-24 h-14 shrink-0 rounded overflow-hidden bg-black">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg` }} />
                    <FiPlay size={10} className="absolute inset-0 m-auto text-white" />
                    <span className="absolute bottom-0.5 right-0.5 text-[9px] bg-black/80 text-white px-1 rounded font-mono">{v.duration}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold line-clamp-2 leading-snug hover:text-primary transition-colors">{v.title}</p>
                    <p className="text-[10px] text-ink-soft dark:text-white/40 font-mono mt-1">{formatNumber(v.views)} {t.views}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

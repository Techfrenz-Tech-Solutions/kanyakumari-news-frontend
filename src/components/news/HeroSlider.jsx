import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { FiClock, FiShare2, FiBookmark } from 'react-icons/fi'
import newsService from '../../services/newsService.js'
import Badge from '../ui/Badge.jsx'
import { timeAgo } from '../../utils/format.js'
import { useLang } from '../../context/LanguageContext.jsx'
import { shareContent } from '../../utils/share.js'
import 'swiper/css'
import 'swiper/css/navigation'

export default function HeroSlider({ articles }) {
  const { lang, t } = useLang()
  const [slides,     setSlides]     = useState(articles || [])
  const [error, setError] = useState(null)
  const [bookmarked, setBookmarked] = useState({})

  useEffect(() => {
    if (articles) { setSlides(articles); return undefined }
    const controller = new AbortController()
    newsService.getHero({ signal: controller.signal }).then(setSlides).catch((requestError) => {
      if (requestError.code !== 'REQUEST_CANCELLED') setError(requestError)
    })
    return () => controller.abort()
  }, [articles])

  function toggleBookmark(id, e) {
    e.preventDefault(); e.stopPropagation()
    setBookmarked((b) => ({ ...b, [id]: !b[id] }))
  }

  async function shareArticle(article, e) {
    e.preventDefault(); e.stopPropagation()
    const url = new URL(`/article/${article.slug}`, window.location.origin).href
    await shareContent({ title: titleOf(article), text: excOf(article), url })
  }

  const titleOf = (a) => lang === 'TA' ? (a.titleTA || a.title) : a.title
  const excOf   = (a) => lang === 'TA' ? (a.excerptTA || a.excerpt) : a.excerpt

  if (error) return <div role="alert" className="rounded border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error.message}</div>
  if (slides.length === 0 && !articles) {
    return <div className="bg-black/5 animate-pulse rounded-md" style={{ aspectRatio: '750/450' }} />
  }

  return (
    <Swiper modules={[Autoplay, Navigation]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      navigation loop
      className="rounded-md overflow-hidden hero-swiper">
      {slides.map((a) => (
        <SwiperSlide key={a.id}>
          <Link to={`/article/${a.slug}`} className="relative block" style={{ aspectRatio: '750/450' }}>
            <img src={a.image || '/news-placeholder.svg'} alt={titleOf(a)} className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/news-placeholder.svg' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              {a.breaking && <Badge variant="breaking" pulse>{t.breaking}</Badge>}
              <span className="eyebrow text-accent bg-black/40 px-2 py-0.5 rounded-sm">{a.category}</span>
            </div>
            <div className="absolute right-4 top-4 flex gap-2">
              <button onClick={(e) => toggleBookmark(a.id, e)} aria-label="Bookmark"
                className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur bg-black/40 hover:bg-primary transition-colors ${bookmarked[a.id] ? 'text-accent' : 'text-white'}`}>
                <FiBookmark size={14} />
              </button>
              <button onClick={(e) => shareArticle(a, e)} aria-label={`Share ${titleOf(a)}`}
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur bg-black/40 text-white hover:bg-primary transition-colors">
                <FiShare2 size={14} />
              </button>
            </div>
            <div className="absolute bottom-0 p-5 md:p-8 max-w-3xl">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">{titleOf(a)}</h2>
              <p className="hidden md:block text-white/70 mt-2 line-clamp-2 max-w-xl">{excOf(a)}</p>
              <div className="flex items-center gap-3 text-white/70 text-xs font-mono mt-3">
                {a.author?.name && <span>{a.author.name}</span>}
                <span className="flex items-center gap-1"><FiClock size={11} /> {timeAgo(a.publishedAt)}</span>
                <span>· {a.readTime} {t.minutesRead}</span>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

import { Link } from 'react-router-dom'
import { FiClock } from 'react-icons/fi'
import Badge from '../ui/Badge.jsx'
import { timeAgo } from '../../utils/format.js'
import { useLang } from '../../context/LanguageContext.jsx'

export default function NewsCard({ article, variant = 'medium' }) {
  const { lang, t } = useLang()
  if (!article) return null

  const { slug, image, category, publishedAt, readTime, breaking, trending, premium } = article
  const title   = lang === 'TA' ? (article.titleTA   || article.title)   : article.title
  const excerpt = lang === 'TA' ? (article.excerptTA || article.excerpt) : article.excerpt

  const badge = breaking ? (
    <Badge variant="breaking" pulse>{t.breaking}</Badge>
  ) : premium ? (
    <Badge variant="premium">Premium</Badge>
  ) : trending ? (
    <Badge variant="trending">Trending</Badge>
  ) : null

  if (variant === 'large') {
    return (
      <Link to={`/article/${slug}`} className="group block card-surface overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={image} alt={title} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">{badge}</div>
          <div className="absolute bottom-0 p-4 md:p-5">
            <span className="eyebrow text-accent">{category}</span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug mt-1 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-3 text-white/70 text-xs font-mono mt-2">
              <span className="flex items-center gap-1"><FiClock size={11} /> {timeAgo(publishedAt)}</span>
              <span>· {readTime} {t.minutesRead}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${slug}`} className="group flex gap-3 items-start">
        <div className="w-24 h-20 md:w-28 md:h-20 shrink-0 overflow-hidden rounded-sm">
          <img src={image} alt={title} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="min-w-0">
          {badge && <div className="mb-1">{badge}</div>}
          <h4 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{title}</h4>
          <span className="text-xs text-ink-soft font-mono">{timeAgo(publishedAt)}</span>
        </div>
      </Link>
    )
  }

  if (variant === 'small') {
    return (
      <Link to={`/article/${slug}`} className="group card-surface overflow-hidden flex flex-col">
        <div className="aspect-[16/10] overflow-hidden">
          <img src={image} alt={title} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-3">
          <span className="eyebrow">{category}</span>
          <h4 className="text-sm font-semibold leading-snug mt-1 line-clamp-2 group-hover:text-primary transition-colors">{title}</h4>
          <span className="text-xs text-ink-soft font-mono">{timeAgo(publishedAt)}</span>
        </div>
      </Link>
    )
  }

  // medium (default)
  return (
    <Link to={`/article/${slug}`} className="group card-surface overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={image} alt={title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {badge && <div className="absolute top-2 left-2">{badge}</div>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="eyebrow">{category}</span>
        <h3 className="font-display text-lg font-bold leading-snug mt-1 line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-ink-soft mt-2 line-clamp-2 flex-1">{excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-ink-soft font-mono mt-3 pt-3 border-t border-black/5">
          <span className="flex items-center gap-1"><FiClock size={11} /> {timeAgo(publishedAt)}</span>
          <span>· {readTime} {t.minutesRead}</span>
        </div>
      </div>
    </Link>
  )
}

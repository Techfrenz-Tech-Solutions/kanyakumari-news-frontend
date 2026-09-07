import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiClock, FiEye, FiMessageSquare } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import MostRead from '../components/widgets/MostRead.jsx'
import Badge from '../components/ui/Badge.jsx'
import { timeAgo, formatNumber } from '../utils/format.js'
import { useLang } from '../context/LanguageContext.jsx'
import { ApiErrorState, EmptyState } from '../components/ui/ApiState.jsx'
import { applyArticleMetadata, buildArticleMetadata } from '../utils/seo.js'

const IMAGE_FALLBACK = '/news-placeholder.svg'

function ShareButtons({ title, url, t }) {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  const xUrl  = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  const btn   = 'flex items-center gap-1.5 text-sm px-3 py-1.5 rounded border transition-colors font-medium'
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="text-xs text-ink-soft font-mono">{t.share}</span>
      <a href={fbUrl} target="_blank" rel="noopener noreferrer"
        className={`${btn} border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white`}>
        f Facebook
      </a>
      <a href={waUrl} target="_blank" rel="noopener noreferrer"
        className={`${btn} border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white`}>
        ✓ WhatsApp
      </a>
      <a href={xUrl} target="_blank" rel="noopener noreferrer"
        className={`${btn} border-black/20 text-ink hover:bg-black hover:text-white`}>
        𝕏 X
      </a>
    </div>
  )
}

export default function Article() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const [article,  setArticle]  = useState(null)
  const [related,  setRelated]  = useState([])
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    setArticle(null); setNotFound(false); setError(null); setComments([])
    newsService.getArticleBySlug(slug, { signal: controller.signal }).then(({ article: a, related: r }) => {
      setArticle(a); setRelated(r)
      return newsService.getComments(slug, { signal: controller.signal })
    }).then(setComments).catch((requestError) => {
      if (requestError.code === 'REQUEST_CANCELLED') return
      if (requestError.status === 404) setNotFound(true)
      else setError(requestError)
    })
    return () => controller.abort()
  }, [slug])

  // Pick Tamil or English text
  const titleOf   = (a) => lang === 'TA' ? (a?.titleTA   || a?.title)   : a?.title
  const excerptOf = (a) => lang === 'TA' ? (a?.excerptTA || a?.excerpt) : a?.excerpt
  const contentOf = (a) => lang === 'TA' ? (a?.contentTA || a?.content) : a?.content

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (!article) return
    applyArticleMetadata(buildArticleMetadata(article, lang, shareUrl))
  }, [article, lang, shareUrl])

  if (notFound) return (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold mb-3">{t.articleNotFound}</h1>
      <p className="text-ink-soft mb-6">{t.articleNotFoundDesc}</p>
      <Link to="/" className="btn-primary inline-block">{t.backHome}</Link>
    </div>
  )

  if (!article) return (
    <div className="container-page py-10">
      {error ? <ApiErrorState error={error} /> : <div className="aspect-[16/9] bg-black/10 rounded-md animate-pulse" />}
    </div>
  )

  return (
    <div className="container-page py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-ink-soft font-mono mb-5 flex flex-wrap items-center gap-1">
        <Link to="/" className="hover:text-primary">{t.breadcrumbHome}</Link>
        <span>›</span>
        <Link to={`/category/${article.category}`} className="hover:text-primary capitalize">
          {article.category.replace(/-/g, ' ')} {lang === 'TA' ? t.newsWord : t.newsWord}
        </Link>
        <span>›</span>
        <span className="text-ink line-clamp-1 max-w-xs">{titleOf(article)}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Main article ── */}
        <article className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {article.breaking && <Badge variant="breaking" pulse>{t.breaking}</Badge>}
            <Link to={`/category/${article.category}`} className="eyebrow capitalize">
              {article.category.replace(/-/g, ' ')}
            </Link>
          </div>

          <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight">{titleOf(article)}</h1>
          <p className="text-base text-ink-soft mt-3 leading-relaxed">{excerptOf(article)}</p>

          {/* Author / date */}
          <div className="flex flex-wrap items-center gap-3 mt-5 py-3 border-y border-black/10">
            {article.author?.avatar && <img src={article.author.avatar} alt="" className="w-9 h-9 rounded-full object-cover" onError={(e) => { e.currentTarget.hidden = true }} />}
            {article.author?.name && <div>
              <p className="text-sm font-semibold leading-none">{article.author.name}</p>
              {article.author.role && <p className="text-xs text-ink-soft mt-0.5">{article.author.role}</p>}
            </div>}
            <div className="flex items-center gap-3 text-xs font-mono text-ink-soft ml-auto">
              <span className="flex items-center gap-1"><FiClock size={11} /> {timeAgo(article.publishedAt)}</span>
              <span className="hidden sm:inline">· {article.readTime} {t.minutesRead}</span>
              <span className="hidden sm:flex items-center gap-1"><FiEye size={11} /> {formatNumber(article.views)}</span>
            </div>
          </div>

          {/* Share buttons */}
          <ShareButtons title={titleOf(article)} url={shareUrl} t={t} />

          {/* Main image */}
          <figure className="mt-6">
            <div className="aspect-[16/9] rounded-md overflow-hidden">
              <img src={article.image || IMAGE_FALLBACK} alt={titleOf(article)} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = IMAGE_FALLBACK }} />
            </div>
            {article.author?.name && <figcaption className="text-xs text-ink-soft font-mono mt-1.5">{t.photo}: {article.author.name}</figcaption>}
          </figure>

          {/* Body text */}
          {/* Content is trusted only after the backend's Admin -> sanitizer -> DB -> public API boundary. */}
          <div className="article-content mt-6 text-ink leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: contentOf(article) || '' }} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/5 text-ink-soft">
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments */}
          <section className="mt-10 pt-8 border-t border-black/10">
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <FiMessageSquare /> {t.comments} ({comments.length})
            </h3>
            <p className="text-xs text-ink-soft mb-5">{t.commentSubmissionNote}</p>
            {comments.length === 0 ? <EmptyState>{t.noCommentsYet}</EmptyState> : <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c.id} className="card-surface p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{c.name}</span>
                    <span className="text-xs text-ink-soft">{timeAgo(c.createdAt)}</span>
                  </div>
                  <p className="text-sm text-ink-soft">{c.body}</p>
                </li>
              ))}
            </ul>}
          </section>
        </article>

        {/* ── Sidebar ── */}
        <aside className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded flex items-center justify-center min-h-[250px]">
            <span className="text-xs text-amber-600 font-mono tracking-widest text-center">AD<br/>300×250</span>
          </div>

          {related.length > 0 && (
            <div className="card-surface p-4">
              <h3 className="font-bold text-sm mb-3 text-ink border-l-4 border-primary pl-3">{t.relatedNews}</h3>
              <ul className="space-y-3">
                {related.slice(0, 4).map((a) => (
                  <li key={a.id}>
                    <Link to={`/article/${a.slug}`} className="flex gap-2 items-start group">
                      <img src={a.image || IMAGE_FALLBACK} alt={titleOf(a)} className="w-16 h-11 object-cover rounded shrink-0" onError={(e) => { e.currentTarget.src = IMAGE_FALLBACK }} />
                      <p className="text-xs font-medium leading-snug group-hover:text-primary transition-colors line-clamp-3">
                        {titleOf(a)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <MostRead />

          <div className="bg-amber-50 border border-amber-200 rounded flex items-center justify-center min-h-[400px]">
            <span className="text-xs text-amber-600 font-mono tracking-widest text-center">AD<br/>300×600</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

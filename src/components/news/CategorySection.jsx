import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import NewsCard from './NewsCard.jsx'
import { CardSkeleton } from '../ui/Skeleton.jsx'
import { useLang } from '../../context/LanguageContext.jsx'

export default function CategorySection({ title, slug, articles, loading }) {
  const { t } = useLang()
  if (!loading && (!articles || articles.length === 0)) return null

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">{title}</h2>
        <Link to={`/category/${slug}`} className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
          {t.viewAll} <FiArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="md:col-span-2 md:row-span-2">
            <NewsCard article={articles[0]} variant="large" />
          </div>
          {articles.slice(1, 5).map((a) => (
            <NewsCard key={a.id} article={a} variant="small" />
          ))}
        </div>
      )}
    </section>
  )
}

import { useEffect, useState } from 'react'
import { FiX, FiDownload, FiShare2 } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function Gallery() {
  const { t } = useLang()
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('All')

  const ALBUM_FILTERS = [
    { key: 'All',       label: t.albumAll       },
    { key: 'Events',    label: t.albumEvents    },
    { key: 'Festivals', label: t.albumFestivals },
    { key: 'Nature',    label: t.albumNature    },
    { key: 'News',      label: t.albumNews      },
  ]

  useEffect(() => { newsService.getGallery().then(setItems) }, [])

  const filtered = filter === 'All'
    ? items
    : items.filter((g) => g.category?.toLowerCase() === filter.toLowerCase())

  return (
    <div>
      <div className="bg-ink dark:bg-black text-white py-8">
        <div className="container-page">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{t.photoGalleryTitle}</h1>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {ALBUM_FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-sm text-sm font-semibold transition-colors border ${
                filter === f.key
                  ? 'bg-primary text-white border-primary'
                  : 'border-black/20 dark:border-white/20 hover:border-primary hover:text-primary'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
          {(filtered.length > 0 ? filtered : items).map((g) => (
            <button key={g.id} onClick={() => setActive(g)}
              className="mb-3 block w-full break-inside-avoid rounded-md overflow-hidden group relative">
              <img src={g.image} alt={g.title} loading="lazy"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-semibold text-left">{g.title}</span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && items.length > 0 && (
          <p className="text-center text-ink-soft dark:text-white/50 py-12">
            {t.noArticles}
          </p>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.image} alt={active.title}
              className="w-full max-h-[80vh] object-contain rounded-md" />
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-white font-semibold">{active.title}</p>
                <p className="text-white/50 text-xs">{active.category}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors">
                  <FiDownload size={15} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors">
                  <FiShare2 size={15} />
                </button>
                <button onClick={() => setActive(null)} aria-label="Close"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors">
                  <FiX size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

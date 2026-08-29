import { useEffect, useState } from 'react'
import { FiExternalLink, FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import { useLang } from '../context/LanguageContext.jsx'

const TYPE_COLOURS = {
  Govt:     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Private:  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Teaching: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Bank:     'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

export default function Jobs() {
  const { t } = useLang()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Latest')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 5

  const FILTERS = [
    { key: 'Latest',   label: t.filterLatest   },
    { key: 'Govt',     label: t.filterGovt     },
    { key: 'Private',  label: t.filterPrivate  },
    { key: 'Teaching', label: t.filterTeaching },
    { key: 'Bank',     label: t.filterBank     },
  ]

  useEffect(() => {
    newsService.getJobs().then((data) => { setJobs(data); setLoading(false) })
  }, [])

  const filtered  = activeFilter === 'Latest' ? jobs : jobs.filter((j) => j.type?.toLowerCase() === activeFilter.toLowerCase())
  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore   = paginated.length < filtered.length

  return (
    <div>
      <div className="bg-ink dark:bg-black text-white py-8">
        <div className="container-page">
          <p className="eyebrow text-accent mb-1">Kanyakumari</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{t.jobsTitle}</h1>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => { setActiveFilter(f.key); setPage(1) }}
              className={`px-5 py-2 rounded-sm text-sm font-semibold transition-colors border ${
                activeFilter === f.key
                  ? 'bg-primary text-white border-primary'
                  : 'border-black/20 dark:border-white/20 hover:border-primary hover:text-primary'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="card-surface p-4 animate-pulse h-16" />)}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-ink-soft dark:text-white/50 py-16">{t.noArticles}</p>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-ink-soft dark:text-white/40 uppercase tracking-widest border-b border-black/10 dark:border-white/10 mb-2">
              <span className="col-span-4">Job Title / Organisation</span>
              <span className="col-span-2">Type</span>
              <span className="col-span-2">Location</span>
              <span className="col-span-2">{t.lastDate}</span>
              <span className="col-span-2 text-right">{t.applyLink}</span>
            </div>

            <div className="space-y-3">
              {paginated.map((job) => (
                <div key={job.id} className="card-surface p-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
                  <div className="md:col-span-4">
                    <p className="font-semibold text-sm text-ink dark:text-white leading-snug">{job.title}</p>
                    <p className="text-xs text-ink-soft dark:text-white/50 mt-0.5 flex items-center gap-1">
                      <FiBriefcase size={10} /> {job.org}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLOURS[job.type] || 'bg-black/8 text-ink-soft'}`}>
                      {job.type}
                    </span>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-1 text-xs text-ink-soft dark:text-white/50">
                    <FiMapPin size={11} /> {job.location}
                  </div>
                  <div className="md:col-span-2 flex items-center gap-1 text-xs font-mono text-ink-soft dark:text-white/50">
                    <FiCalendar size={11} />
                    <span className={new Date(job.lastDate) < new Date() ? 'text-red-500' : ''}>
                      {new Date(job.lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <a href={job.applyUrl || '#'} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                      {t.applyLink} <FiExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button onClick={() => setPage((p) => p + 1)} className="btn-outline text-sm">{t.loadMoreJobs}</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

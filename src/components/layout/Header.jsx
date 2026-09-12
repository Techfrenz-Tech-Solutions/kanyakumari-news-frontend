import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext.jsx'
import { usePublicContent } from '../../context/PublicContentContext.jsx'

// Primary nav — labels come from translations
function buildNav(t, categories, lang) {
  return [
    { key: 'home', label: t.home, to: '/' },
    ...categories.map((category) => ({
      key: category.slug,
      label: lang === 'TA' ? (category.labelTA || category.label) : category.label,
      to: `/category/${category.slug}`,
    })),
    { key: 'tourist',      label: t.navTourist,      to: '/tourist-info'         },
    { key: 'jobs',         label: t.navJobs,         to: '/jobs'                 },
    { key: 'links',        label: t.navLinks,        to: '/links'                },
  ]
}

function buildMobileGroups(t, categories, lang) {
  return [
    {
      title: t.navKanyakumari,
      links: [
        { label: t.home, to: '/' },
        ...categories.map((category) => ({
          label: lang === 'TA' ? (category.labelTA || category.label) : category.label,
          to: `/category/${category.slug}`,
        })),
      ],
    },
    { title: t.navLinks, links: [
      { label: t.navTourist, to: '/tourist-info' },
      { label: t.navJobs, to: '/jobs' },
      { label: t.navLinks, to: '/links' },
    ] },
    {
      title: t.footerCompany,
      links: [
        { label: t.footerAbout,    to: '/about'   },
        { label: t.footerContact,  to: '/contact' },
        { label: t.footerCareers,  to: '/careers' },
      ],
    },
  ]
}

export default function Header() {
  const { lang, t } = useLang()
  const { categories, site, errors } = usePublicContent()
  const PRIMARY_NAV   = buildNav(t, categories, lang)
  const MOBILE_GROUPS = buildMobileGroups(t, categories, lang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function submitSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-surface-dark border-b border-black/10 dark:border-white/10">
      {/* Masthead */}
      <div className="container-page flex items-center justify-between py-3 gap-4">
        <button className="lg:hidden shrink-0" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <FiMenu size={24} />
        </button>

        <Link to="/" className="flex flex-col items-center gap-1">
          <img
            src="/logo.png"
            alt={site?.siteName || 'Kanyakumari Today'}
            className="h-15 md:h-20 w-auto object-contain"
          />
          <span className="text-[12px] font-mono tracking-widest uppercase text-ink-soft dark:text-white/50 hidden sm:block text-center whitespace-nowrap">
            {t.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            className="inline-flex items-center gap-1.5 text-sm font-mono text-ink dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <FiSearch size={18} />
            <span>{t.search}</span>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/10 dark:border-white/10 overflow-hidden"
          >
            <form onSubmit={submitSearch} className="container-page py-3 flex gap-2">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent border border-black/15 dark:border-white/20 rounded-sm px-4 py-2 text-sm focus:border-primary outline-none"
              />
              <button type="submit" className="btn-primary text-sm">
                {t.searchBtn}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop nav — red to purple gradient, static */}
      <nav className="hidden lg:block"
        style={{ background: 'linear-gradient(90deg, #C8102E 0%, #7B1450 50%, #4A1060 100%)' }}>
        <div className="container-page flex items-center h-12 text-white/95 overflow-x-auto">
          {PRIMARY_NAV.map((item, idx) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 h-full inline-flex items-center whitespace-nowrap border-r border-white/15 last:border-r-0 font-semibold text-[18px] transition-colors
                ${idx === 0 ? 'bg-white/15 text-white' : 'hover:bg-white/20 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      {errors.categories && (
        <p role="status" className="bg-red-50 px-4 py-1 text-center text-xs text-red-700">
          {t.categoriesUnavailable}
        </p>
      )}

      {/* Mobile slide-out drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-surface-darkcard z-50 p-5 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="Kanyakumari Today" className="h-9 w-auto object-contain" />
                <span className="font-display text-lg font-bold">
                  {site?.siteName || 'Kanyakumari Today'}
                </span>
              </div>
              {MOBILE_GROUPS.map((group) => (
                <div key={group.title} className="mb-5">
                  <p className="eyebrow mb-2">{group.title}</p>
                  <ul className="space-y-1">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          onClick={() => setMenuOpen(false)}
                          className="text-sm block py-1.5 px-2 rounded-sm text-ink dark:text-white/90 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

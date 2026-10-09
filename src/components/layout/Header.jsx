import { useState, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext.jsx'
import { usePublicContent } from '../../context/PublicContentContext.jsx'
import { localizedTaxonomyLabel } from '../../utils/localization.js'

// Primary nav — labels come from translations
function buildNav(t, categories, lang) {
  return [
    { key: 'home', label: t.home, to: '/' },
    ...categories.map((category) => ({
      key: category.slug,
      label: localizedTaxonomyLabel(category, lang),
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
          label: localizedTaxonomyLabel(category, lang),
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
  const { lang, toggleLang, t } = useLang()
  const { categories, site, errors } = usePublicContent()
  const PRIMARY_NAV   = buildNav(t, categories, lang)
  const MOBILE_GROUPS = buildMobileGroups(t, categories, lang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const searchRef = useRef(null)

  function submitSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-surface-dark border-b border-black/10 dark:border-white/10">

      {/* ── Masthead ── */}
      <div className="container-page flex items-center py-3 gap-3">

        {/* Hamburger — mobile/tablet only */}
        <button className="lg:hidden shrink-0 p-1" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <FiMenu size={26} />
        </button>

        {/* Logo + tagline — left on desktop, fills space on mobile */}
        <Link to="/" className="flex flex-col items-start shrink-0">
          <img
            src="/logo.png"
            alt={site?.siteName || 'Kanyakumari Today'}
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
          />
          <span className="hidden sm:block text-[10px] lg:text-[11px] font-mono tracking-widest uppercase text-ink-soft dark:text-white/50 whitespace-nowrap mt-0.5">
            {t.tagline}
          </span>
        </Link>

        {/* Search — fills center space, visible on all sizes */}
        <form onSubmit={submitSearch} className="flex flex-1 min-w-0 items-center border border-black/20 dark:border-white/20 rounded-full overflow-hidden bg-white dark:bg-surface-dark shadow-sm">
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder={t.searchPlaceholder}
            className="flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="m-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white bg-primary hover:bg-primary/90 transition-colors rounded-full shrink-0"
          >
            <FiSearch size={13} />
          </button>
        </form>

        {/* Language toggle — always visible */}
        <button
          onClick={toggleLang}
          title={lang === 'EN' ? 'Switch to Tamil' : 'Switch to English'}
          className="shrink-0 inline-flex items-center rounded-full border-2 border-primary px-3 py-1.5 text-[11px] sm:text-xs font-bold text-white bg-primary hover:bg-primary/80 transition-all shadow-md whitespace-nowrap"
        >
          {t.switchLang}
        </button>
      </div>

      {/* Desktop nav — red to purple gradient, static */}
      <nav className="hidden lg:block"
        style={{ background: 'linear-gradient(90deg, #C8102E 0%, #7B1450 50%, #4A1060 100%)' }}>
        <div className="container-page flex items-center h-12 text-white/95 overflow-x-auto">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-3 lg:px-4 h-full inline-flex items-center whitespace-nowrap border-r border-white/15 last:border-r-0 font-semibold text-[15px] lg:text-[17px] transition-colors
                ${isActive ? 'bg-white/25 text-white underline underline-offset-4 decoration-2' : 'hover:bg-white/20 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
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
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-xs bg-white dark:bg-surface-darkcard z-50 p-5 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <img src="/logo.png" alt="Kanyakumari Today" className="h-9 w-auto object-contain" />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 rounded-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <FiX size={22} />
                </button>
              </div>
              {MOBILE_GROUPS.map((group) => (
                <div key={group.title} className="mb-5">
                  <p className="eyebrow mb-2">{group.title}</p>
                  <ul className="space-y-1">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `text-sm block py-1.5 px-2 rounded-sm transition-colors
                            ${isActive
                              ? 'bg-primary/15 text-primary font-semibold'
                              : 'text-ink dark:text-white/90 hover:bg-primary/10 hover:text-primary'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
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

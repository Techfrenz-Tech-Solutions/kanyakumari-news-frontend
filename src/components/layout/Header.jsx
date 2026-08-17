import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext.jsx'

// Primary nav — labels come from translations
function buildNav(t) {
  return [
    { key: 'home',         label: t.home,           to: '/'                     },
    { key: 'kanyakumari',  label: t.navKanyakumari, to: '/category/kanyakumari' },
    { key: 'tn',           label: t.navTN,           to: '/category/tamil-nadu'  },
    { key: 'national',     label: t.navNational,     to: '/category/national'    },
    { key: 'world',        label: t.navWorld,        to: '/category/world'       },
    { key: 'photo',        label: t.navPhoto,        to: '/gallery'              },
    { key: 'videos',       label: t.navVideos,       to: '/videos'               },
    { key: 'districtInfo', label: t.navDistrictInfo, to: '/district-info'        },
    { key: 'tourist',      label: t.navTourist,      to: '/tourist-info'         },
    { key: 'jobs',         label: t.navJobs,         to: '/jobs'                 },
    { key: 'links',        label: t.navLinks,        to: '/links'                },
  ]
}

function buildMobileGroups(t) {
  return [
    {
      title: t.navKanyakumari,
      links: [
        { label: t.home,           to: '/'                     },
        { label: t.navKanyakumari, to: '/category/kanyakumari' },
        { label: t.navTN,          to: '/category/tamil-nadu'  },
        { label: t.navNational,    to: '/category/national'    },
        { label: t.navWorld,       to: '/category/world'       },
      ],
    },
    {
      title: t.navPhoto,
      links: [
        { label: t.navPhoto,   to: '/gallery' },
        { label: t.navVideos,  to: '/videos'  },
      ],
    },
    {
      title: t.navDistrictInfo,
      links: [
        { label: t.navDistrictInfo, to: '/district-info' },
        { label: t.navTourist,      to: '/tourist-info'  },
        { label: t.navJobs,         to: '/jobs'          },
        { label: t.navLinks,        to: '/links'         },
      ],
    },
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
  const { t } = useLang()
  const PRIMARY_NAV   = buildNav(t)
  const MOBILE_GROUPS = buildMobileGroups(t)
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

        <Link to="/" className="flex flex-col items-start">
          <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-ink dark:text-white leading-none">
            Kanyakumari <span className="text-primary">Today</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ink-soft dark:text-white/50 mt-0.5 hidden sm:block">
            {t.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            className="hover:text-primary transition-colors"
          >
            <FiSearch size={20} />
          </button>
          <Link
            to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-sm hover:bg-primary hover:text-white transition-colors"
          >
            <FiSearch size={12} /> Search
          </Link>
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

      {/* Desktop nav — matches PDF: KANYAKUMARI · TN · NATIONAL · WORLD · PHOTO · VIDEOS · DISTRICT INFO · TOURIST · JOBS · LINKS · SEARCH */}
      <nav className="hidden lg:block bg-ink dark:bg-black">
        <div className="container-page flex items-center h-11 text-sm text-white/90 overflow-x-auto">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 h-full flex items-center whitespace-nowrap hover:bg-primary hover:text-white transition-colors border-r border-white/10 last:border-r-0 font-medium"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="ml-auto px-4 h-full flex items-center gap-1 text-white/70 hover:text-white transition-colors whitespace-nowrap"
            aria-label="Search"
          >
            <FiSearch size={14} /> {t.search}
          </button>
        </div>
      </nav>

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
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-lg font-bold">
                  Kanyakumari <span className="text-primary">Today</span>
                </span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <FiX size={22} />
                </button>
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

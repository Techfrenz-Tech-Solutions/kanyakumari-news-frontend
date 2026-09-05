import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMenu, FiX, FiSun, FiCloud, FiCloudRain } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext.jsx'
import newsService from '../../services/newsService.js'
import { usePublicContent } from '../../context/PublicContentContext.jsx'

// Primary nav — labels come from translations
function buildNav(t, categories) {
  return [
    { key: 'home', label: t.home, to: '/' },
    ...categories.map((category) => ({ key: category.slug, label: category.label, to: `/category/${category.slug}` })),
    { key: 'photo',        label: t.navPhoto,        to: '/gallery'              },
    { key: 'videos',       label: t.navVideos,       to: '/videos'               },
    { key: 'districtInfo', label: t.navDistrictInfo, to: '/district-info'        },
    { key: 'tourist',      label: t.navTourist,      to: '/tourist-info'         },
    { key: 'jobs',         label: t.navJobs,         to: '/jobs'                 },
    { key: 'links',        label: t.navLinks,        to: '/links'                },
  ]
}

function buildMobileLinks(t, lang) {
  return [
    { label: t.home,                                      to: '/'                        },
    { label: 'District',                                  to: '/district-info'           },
    { label: 'Nagercoil',                                 to: '/category/kanyakumari'    },
    { label: 'Marthandam',                                to: '/category/kanyakumari'    },
    { label: 'Kuzhithurai',                               to: '/category/kanyakumari'    },
    { label: 'Kanyakumari',                               to: '/category/kanyakumari'    },
    { label: 'Colachel',                                  to: '/category/kanyakumari'    },
    { label: t.navTN,                                     to: '/category/tamil-nadu'     },
    { label: 'India',                                     to: '/category/national'       },
    { label: t.navWorld,                                  to: '/category/world'          },
    { label: lang === 'TA' ? 'அரசியல்'        : 'Politics',    to: '/category/politics'    },
    { label: lang === 'TA' ? 'வணிகம்'         : 'Business',    to: '/category/business'    },
    { label: lang === 'TA' ? 'விளையாட்டு'     : 'Sports',      to: '/category/sports'      },
    { label: lang === 'TA' ? 'சினிமா'          : 'Cinema',      to: '/category/cinema'      },
    { label: lang === 'TA' ? 'கல்வி'           : 'Education',   to: '/category/education'   },
    { label: t.navJobs,                                          to: '/jobs'                  },
    { label: lang === 'TA' ? 'விவசாயம்'        : 'Agriculture', to: '/category/agriculture' },
    { label: lang === 'TA' ? 'ஆன்மீகம்'        : 'Spiritual',   to: '/category/astrology'   },
    { label: lang === 'TA' ? 'வானிலை' : 'Weather',       to: '/weather'                 },
    { label: t.navVideos,                                 to: '/videos'                  },
    { label: t.navPhoto,                                  to: '/gallery'                 },
    { label: t.navTourist,                                to: '/tourist-info'            },
    { label: t.navLinks,                                  to: '/links'                   },
    { label: t.footerAbout,                               to: '/about'                   },
    { label: t.footerContact,                             to: '/contact'                 },
  ]
}

export default function Header() {
  const { t, lang } = useLang()
  const { categories, site, errors } = usePublicContent()
  const PRIMARY_NAV   = buildNav(t, categories)
  const MOBILE_LINKS  = buildMobileLinks(t, lang)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [query,       setQuery]       = useState('')
  const [weather,     setWeather]     = useState(null)
  const navigate    = useNavigate()
  const searchRef   = useRef(null)

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    newsService.getWeather().then(setWeather)
  }, [])

  const WEATHER_ICONS = { Sunny: FiSun, Cloudy: FiCloud, Rain: FiCloudRain, 'Partly Cloudy': FiCloud }
  const WeatherIcon = weather ? (WEATHER_ICONS[weather.condition] || FiSun) : FiSun

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
          <span className="text-[12px] font-mono tracking-widest uppercase text-ink-soft dark:text-white/50 hidden sm:block text-center whitespace-nowrap font-semibold">
            {t.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-3 ml-auto">
          {/* Weather widget in header */}
          {weather && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/5">
              <WeatherIcon size={18} className="text-accent shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-ink dark:text-white">{weather.tempC}°C</span>
                <span className="text-[10px] text-ink-soft dark:text-white/50 font-mono">{weather.city}</span>
              </div>
              <span className="text-xs text-ink-soft dark:text-white/50 hidden lg:block">{weather.condition}</span>
            </div>
          )}
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

      {/* Desktop nav — teal scrollable bar with all categories */}
      <nav className="hidden lg:block overflow-x-auto" style={{ backgroundColor: '#031120ff' }}>
        <div className="flex items-center h-11 text-sm text-white font-semibold min-w-max px-2">
          {[
            { label: t.home,             to: '/'                        },
            // { label: 'District',         to: '/district-info'           },
            // { label: 'Nagercoil',        to: '/category/kanyakumari'    },
            // { label: 'Marthandam',       to: '/category/kanyakumari'    },
            // { label: 'Kuzhithurai',      to: '/category/kanyakumari'    },
            // { label: 'Kanyakumari',      to: '/category/kanyakumari'    },
            // { label: 'Colachel',         to: '/category/kanyakumari'    },
            // { label: t.navTN,            to: '/category/tamil-nadu'     },
            // { label: 'India',            to: '/category/national'       },
            // { label: t.navWorld,         to: '/category/world'          },
            { label: lang === 'TA' ? 'அரசியல்'    : 'Politics',    to: '/category/politics'    },
            { label: lang === 'TA' ? 'வணிகம்'     : 'Business',    to: '/category/business'    },
            { label: lang === 'TA' ? 'விளையாட்டு' : 'Sports',      to: '/category/sports'      },
            { label: lang === 'TA' ? 'சினிமா'      : 'Cinema',      to: '/category/cinema'      },
            { label: lang === 'TA' ? 'கல்வி'       : 'Education',   to: '/category/education'   },
            { label: t.navJobs,                                       to: '/jobs'                  },
            { label: lang === 'TA' ? 'விவசாயம்'   : 'Agriculture', to: '/category/agriculture' },
            { label: lang === 'TA' ? 'ஆன்மீகம்'   : 'Spiritual',   to: '/category/astrology'   },
            { label: lang === 'TA' ? 'வானிலை' : 'Weather', to: '/weather' },
            { label: t.navVideos,        to: '/videos'                  },
            { label: t.navPhoto,         to: '/gallery'                 },
          ].map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              className="px-3 h-full flex items-center whitespace-nowrap border-r border-white/20 last:border-r-0 text-white font-semibold text-sm"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="ml-2 px-3 h-full flex items-center gap-1 text-white/80 hover:text-white transition-colors whitespace-nowrap"
            aria-label="Search"
          >
            <FiSearch size={14} />
          </button>
        </div>
      </nav>
      {errors.categories && (
        <p role="status" className="bg-red-50 px-4 py-1 text-center text-xs text-red-700">
          Categories are temporarily unavailable.
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
              <ul className="space-y-0.5">
                {MOBILE_LINKS.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm block py-2 px-3 rounded-sm text-ink dark:text-white/90 hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

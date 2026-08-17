import { Link } from 'react-router-dom'
import { FiSun, FiDroplet } from 'react-icons/fi'
import { LuNewspaper } from 'react-icons/lu'
import { todayLong } from '../../utils/format.js'
import { rates } from '../../data/newsData.js'
import { useLang } from '../../context/LanguageContext.jsx'

export default function TopBar() {
  const { lang, toggleLang, t } = useLang()

  // The three items that scroll
  const scrollItems = [
    { icon: <FiSun size={12} />, text: `30°C Kanyakumari` },
    { icon: <FiDroplet size={12} />, text: `${lang === 'EN' ? 'Gold' : 'தங்கம்'} ₹${rates.gold22k}/g` },
    { icon: null, text: `${lang === 'EN' ? 'Petrol' : 'பெட்ரோல்'} ₹${rates.petrol}` },
  ]

  // Duplicate for seamless infinite loop
  const loop = [...scrollItems, ...scrollItems, ...scrollItems]

  return (
    <div className="hidden md:block bg-ink dark:bg-black text-white/80 text-xs font-mono overflow-hidden">
      <div className="container-page flex items-center justify-between h-9 gap-4">

        {/* LEFT: static date + scrolling ticker */}
        <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
          {/* Static date */}
          <span className="shrink-0 text-white/70">{todayLong()}</span>

          {/* Divider */}
          <span className="shrink-0 text-white/20">|</span>

          {/* Scrolling items — temperature, gold, petrol */}
          <div className="relative flex-1 overflow-hidden h-full flex items-center">
            <div className="flex items-center gap-8 animate-topbar-scroll whitespace-nowrap">
              {loop.map((item, i) => (
                <span key={i} className="flex items-center gap-1 text-white/60">
                  {item.icon}
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: static controls */}
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/e-paper" className="flex items-center gap-1 hover:text-accent transition-colors">
            <LuNewspaper size={13} /> {t.ePaper}
          </Link>
          <button
            onClick={toggleLang}
            className="hover:text-accent transition-colors border border-white/30 px-2 py-0.5 rounded-sm hover:border-accent"
            title={lang === 'EN' ? 'Switch to Tamil' : 'Switch to English'}
          >
            {t.switchLang}
          </button>
          <Link to="/login" className="hover:text-accent transition-colors">
            {t.login}
          </Link>
          <Link to="/login" className="bg-primary text-white px-3 py-1 rounded-sm font-semibold hover:bg-primary-dark transition-colors">
            {t.subscribe}
          </Link>
        </div>
      </div>
    </div>
  )
}

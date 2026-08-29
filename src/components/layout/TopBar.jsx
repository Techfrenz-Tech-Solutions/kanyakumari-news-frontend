import { Link } from 'react-router-dom'
import { LuNewspaper } from 'react-icons/lu'
import { todayLong } from '../../utils/format.js'
import { useLang } from '../../context/LanguageContext.jsx'

export default function TopBar() {
  const { lang, toggleLang, t } = useLang()

  return (
    <div className="hidden md:block bg-ink dark:bg-black text-white/80 text-xs font-mono overflow-hidden">
      <div className="container-page flex items-center justify-between h-9 gap-4">

        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="shrink-0 text-white/70">{todayLong()}</span>
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
        </div>
      </div>
    </div>
  )
}

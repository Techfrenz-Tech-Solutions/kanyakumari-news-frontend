import { todayLong } from '../../utils/format.js'
import { useLang } from '../../context/LanguageContext.jsx'

export default function TopBar() {
  const { lang, toggleLang, t } = useLang()

  return (
    <div className="hidden md:block text-white text-xs font-mono overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #A50D2E 0%, #7B1042 50%, #5C0E3A 100%)' }}>
      <div className="container-page flex items-center justify-between h-9 gap-4">
        {/* Gold dot + date */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="w-2 h-2 rounded-full bg-gold shrink-0" style={{ backgroundColor: '#FFD700' }} />
          <span className="shrink-0 text-white/80">{todayLong()}</span>
        </div>
        {/* Language toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={toggleLang}
            className="transition-colors border border-white/30 px-2 py-0.5 rounded-sm"
            style={{ color: '#FFD700' }}
            title={lang === 'EN' ? 'Switch to Tamil' : 'Switch to English'}
          >
            {t.switchLang}
          </button>
        </div>
      </div>
    </div>
  )
}

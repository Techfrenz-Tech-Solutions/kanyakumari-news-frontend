import { useLang } from '../context/LanguageContext.jsx'
import { FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState } from 'react'

const ARCHIVE = [
  'Aug 13, 2026','Aug 12, 2026','Aug 11, 2026','Aug 10, 2026',
  'Aug 09, 2026','Aug 08, 2026','Aug 07, 2026',
]

export default function EPaper() {
  const { lang } = useLang()
  const [activeDate, setActiveDate] = useState(ARCHIVE[0])
  const isTA = lang === 'TA'

  return (
    <div className="container-page py-8">
      <h1 className="section-title mb-6">{isTA ? 'மின்-பத்திரிகை' : 'E-Paper'}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Preview */}
        <div className="lg:col-span-3">
          <div className="card-surface overflow-hidden">
            <div className="bg-ink text-white px-5 py-3 flex items-center justify-between">
              <span className="font-display font-bold">
                Kanyakumari Today — {isTA ? 'அச்சு பதிப்பு' : 'Print Edition'}
              </span>
              <span className="text-sm text-white/60">{activeDate}</span>
            </div>
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-ink">Kanyakumari Today</p>
                <p className="text-ink-soft text-sm mt-1">{activeDate}</p>
                <p className="text-xs text-ink-soft mt-4">
                  {isTA ? 'PDF பதிவிறக்க கிடைக்கும்' : 'PDF available for download'}
                </p>
              </div>
            </div>
            <div className="px-5 py-3 flex items-center justify-between border-t border-black/10">
              <div className="flex gap-2">
                <button className="p-2 border border-black/15 rounded hover:border-primary transition-colors">
                  <FiChevronLeft size={16} />
                </button>
                <button className="p-2 border border-black/15 rounded hover:border-primary transition-colors">
                  <FiChevronRight size={16} />
                </button>
              </div>
              <button className="btn-primary text-sm flex items-center gap-2">
                <FiDownload size={14} /> {isTA ? 'PDF பதிவிறக்கு' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>

        {/* Archive */}
        <div className="card-surface p-4">
          <h3 className="font-bold text-sm mb-4 text-ink">
            {isTA ? '7 நாள் காப்பகம்' : '7-Day Archive'}
          </h3>
          <ul className="space-y-2">
            {ARCHIVE.map((date) => (
              <li key={date}>
                <button onClick={() => setActiveDate(date)}
                  className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                    activeDate === date
                      ? 'bg-primary text-white'
                      : 'hover:bg-black/5 text-ink-soft'
                  }`}>
                  {date}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

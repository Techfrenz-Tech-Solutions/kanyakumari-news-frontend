import { touristAttractions } from '../data/newsData.js'
import { FiClock, FiTag, FiArrowRight } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'

const HOW_TO_REACH = [
  { mode: '🚗 Road', detail: 'NH-44 connects Nagercoil to major cities. Kanyakumari is 88 km from Thiruvananthapuram.' },
  { mode: '🚂 Rail', detail: 'Kanyakumari Railway Station (CAPE) is the southernmost railway station in India.' },
  { mode: '✈ Air',  detail: 'Nearest airport is Trivandrum International Airport (~90 km).' },
]

const HOTELS = [
  { name: 'Hotel Tamil Nadu (TTDC)', type: 'Govt',     area: 'Kanyakumari town'     },
  { name: 'Hotel Sparsa Kanyakumari',type: 'Premium',  area: 'Beach Road'            },
  { name: 'Seashore Hotel',          type: 'Budget',   area: 'Near Vivekananda Rock' },
  { name: 'Hotel Sangam',            type: 'Mid-range',area: 'Nagercoil'             },
  { name: 'GRT Regency',             type: 'Premium',  area: 'Nagercoil'             },
]

export default function TouristInfo() {
  const { t } = useLang()

  return (
    <div>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="https://picsum.photos/id/15/1280/500" alt="Kanyakumari" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">{t.touristTitle}</h1>
          <p className="text-white/80 mt-2 text-base md:text-lg max-w-xl">{t.touristSubtitle}</p>
        </div>
      </div>

      <div className="container-page py-10">
        <h2 className="section-title mb-6">{t.topAttractions}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {touristAttractions.map((place) => (
            <div key={place.id} className="card-surface overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={place.image} alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <span className="eyebrow mb-1 block">{place.category}</span>
                <h3 className="font-bold text-sm text-ink dark:text-white leading-snug mb-2">{place.name}</h3>
                <p className="text-xs text-ink-soft dark:text-white/60 leading-relaxed line-clamp-3 mb-3">{place.description}</p>
                <div className="space-y-1 text-xs text-ink-soft dark:text-white/50 font-mono">
                  <div className="flex items-center gap-1.5"><FiClock size={11} /> {place.timings}</div>
                  <div className="flex items-center gap-1.5"><FiTag size={11} /> {place.entryFee}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-surface p-5">
            <h3 className="font-bold text-sm mb-4 text-ink dark:text-white border-l-4 border-primary pl-3">{t.howToReach}</h3>
            <div className="space-y-4">
              {HOW_TO_REACH.map((item) => (
                <div key={item.mode}>
                  <p className="font-semibold text-sm text-ink dark:text-white">{item.mode}</p>
                  <p className="text-xs text-ink-soft dark:text-white/60 leading-relaxed mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-5">
            <h3 className="font-bold text-sm mb-4 text-ink dark:text-white border-l-4 border-primary pl-3">{t.stayHotels}</h3>
            <ul className="space-y-3">
              {HOTELS.map((h) => (
                <li key={h.name} className="flex items-start justify-between gap-2 text-sm border-b border-black/5 dark:border-white/5 pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-ink dark:text-white">{h.name}</p>
                    <p className="text-xs text-ink-soft dark:text-white/50">{h.area}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    h.type === 'Premium'   ? 'bg-secondary/10 text-secondary dark:text-blue-300'
                    : h.type === 'Govt'   ? 'bg-primary/10 text-primary'
                    : 'bg-black/8 dark:bg-white/10 text-ink-soft dark:text-white/50'
                  }`}>{h.type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-md flex flex-col items-center justify-center p-6 min-h-[200px] text-center">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono tracking-widest mb-2">{t.travelPartner}</p>
            <p className="text-amber-600/60 dark:text-amber-400/40 text-xs">Ad slot — 300×250</p>
            <a href="/advertise" className="mt-4 text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              {t.advertiseHere}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

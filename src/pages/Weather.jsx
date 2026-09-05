import { useEffect, useState } from 'react'
import { FiSun, FiCloud, FiCloudRain, FiDroplet, FiWind, FiThermometer } from 'react-icons/fi'
import newsService from '../services/newsService.js'
import { useLang } from '../context/LanguageContext.jsx'

const ICONS = {
  Sunny:          FiSun,
  Cloudy:         FiCloud,
  Rain:           FiCloudRain,
  'Partly Cloudy':FiCloud,
}

const CONDITIONS_TA = {
  Sunny:          'வெயில்',
  Cloudy:         'மேகமூட்டம்',
  Rain:           'மழை',
  'Partly Cloudy':'பகுதி மேகமூட்டம்',
}

const DAYS_TA = {
  Mon:'திங்கள்', Tue:'செவ்வாய்', Wed:'புதன்',
  Thu:'வியாழன்', Fri:'வெள்ளி',  Sat:'சனி', Sun:'ஞாயிறு',
}

// Kanyakumari district area weather data
const DISTRICT_AREAS = [
  { name: 'Nagercoil',   nameTA: 'நாகர்கோவில்',   tempC: 30, humidity: 76, wind: 18, condition: 'Partly Cloudy' },
  { name: 'Kanyakumari', nameTA: 'கன்னியாகுமரி',  tempC: 29, humidity: 82, wind: 22, condition: 'Cloudy'        },
  { name: 'Colachel',    nameTA: 'கொளச்சேல்',      tempC: 31, humidity: 74, wind: 20, condition: 'Sunny'         },
  { name: 'Marthandam',  nameTA: 'மார்த்தாண்டம்',  tempC: 28, humidity: 80, wind: 14, condition: 'Rain'          },
  { name: 'Kuzhithurai', nameTA: 'குழித்துறை',     tempC: 29, humidity: 78, wind: 16, condition: 'Partly Cloudy' },
  { name: 'Thuckalay',   nameTA: 'தக்கலை',         tempC: 27, humidity: 83, wind: 12, condition: 'Rain'          },
]

// UV index, precipitation and air quality mock
const ADDITIONAL_INFO = [
  { labelEN: 'UV Index',       labelTA: 'UV குறியீடு',       value: '6 (High)'         },
  { labelEN: 'Precipitation',  labelTA: 'மழைப்பொழிவு',       value: '12 mm today'      },
  { labelEN: 'Visibility',     labelTA: 'தெரிவுத்திறன்',      value: '8 km'             },
  { labelEN: 'Pressure',       labelTA: 'காற்றழுத்தம்',       value: '1012 hPa'         },
  { labelEN: 'Dew Point',      labelTA: 'பனி புள்ளி',         value: '24°C'             },
  { labelEN: 'Air Quality',    labelTA: 'காற்று தரம்',        value: 'Good (AQI 42)'    },
]

export default function Weather() {
  const { lang } = useLang()
  const [data, setData] = useState(null)
  const isTA = lang === 'TA'

  useEffect(() => {
    newsService.getWeather().then(setData)
  }, [])

  const condLabel = (c) => isTA ? (CONDITIONS_TA[c] || c) : c
  const dayLabel  = (d) => isTA ? (DAYS_TA[d] || d) : d

  return (
    <div>
      {/* Page header */}
      <div className="bg-ink text-white py-8">
        <div className="container-page">
          <p className="eyebrow text-white/60 mb-1">
            {isTA ? 'கன்னியாகுமரி மாவட்டம்' : 'Kanyakumari District'}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            {isTA ? 'வானிலை தகவல்' : 'Weather'}
          </h1>
        </div>
      </div>

      <div className="container-page py-8 space-y-8">

        {/* ── Current weather card ── */}
        {data ? (
          <div className="card-surface p-6 max-w-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow mb-1">{data.city}</p>
                <p className="font-display text-6xl font-black text-ink dark:text-white">{data.tempC}°C</p>
                <p className="text-xl font-semibold text-ink-soft dark:text-white/60 mt-1">{condLabel(data.condition)}</p>
              </div>
              {(() => { const Icon = ICONS[data.condition] || FiSun; return <Icon size={72} className="text-accent" /> })()}
            </div>

            {/* Current stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-black/8 dark:border-white/8">
              <div className="flex items-center gap-2 text-sm text-ink-soft dark:text-white/60">
                <FiDroplet size={16} className="text-secondary" />
                <span>{isTA ? 'ஈரப்பதம்' : 'Humidity'}: <strong className="text-ink dark:text-white">{data.humidity}%</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-soft dark:text-white/60">
                <FiWind size={16} className="text-secondary" />
                <span>{isTA ? 'காற்று' : 'Wind'}: <strong className="text-ink dark:text-white">{data.windKmh} km/h</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-soft dark:text-white/60">
                <FiThermometer size={16} className="text-secondary" />
                <span>{isTA ? 'உணர்வு' : 'Feels like'}: <strong className="text-ink dark:text-white">{data.tempC - 1}°C</strong></span>
              </div>
            </div>

            {/* 5-day forecast */}
            <div className="grid grid-cols-5 gap-2 mt-6 pt-5 border-t border-black/8 dark:border-white/8">
              {data.forecast.map((f) => {
                const FIcon = ICONS[f.condition] || FiSun
                return (
                  <div key={f.day} className="flex flex-col items-center text-center gap-1 p-2 rounded-md bg-black/3 dark:bg-white/5">
                    <span className="text-xs font-semibold text-ink-soft dark:text-white/50">{dayLabel(f.day)}</span>
                    <FIcon size={20} className="text-accent my-1" />
                    <span className="text-xs font-bold text-ink dark:text-white">{f.high}°</span>
                    <span className="text-xs text-ink-soft dark:text-white/40">{f.low}°</span>
                    <span className="text-[10px] text-ink-soft dark:text-white/40">{condLabel(f.condition)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="card-surface p-6 max-w-2xl animate-pulse h-56" />
        )}

        {/* ── Additional weather info ── */}
        <div>
          <h2 className="section-title mb-5">{isTA ? 'கூடுதல் தகவல்கள்' : 'Additional Details'}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ADDITIONAL_INFO.map((info) => (
              <div key={info.labelEN} className="card-surface p-4 text-center">
                <p className="text-xs text-ink-soft dark:text-white/50 font-mono uppercase tracking-wide mb-1">
                  {isTA ? info.labelTA : info.labelEN}
                </p>
                <p className="text-sm font-bold text-ink dark:text-white">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── District area weather ── */}
        <div>
          <h2 className="section-title mb-5">
            {isTA ? 'மாவட்ட பகுதிகள் வானிலை' : 'District Areas Weather'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DISTRICT_AREAS.map((area) => {
              const AreaIcon = ICONS[area.condition] || FiSun
              return (
                <div key={area.name} className="card-surface p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink dark:text-white">{isTA ? area.nameTA : area.name}</p>
                    <p className="text-sm text-ink-soft dark:text-white/50 mt-0.5">{condLabel(area.condition)}</p>
                    <div className="flex gap-4 mt-2 text-xs text-ink-soft dark:text-white/40 font-mono">
                      <span><FiDroplet size={11} className="inline mr-0.5" />{area.humidity}%</span>
                      <span><FiWind size={11} className="inline mr-0.5" />{area.wind} km/h</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <AreaIcon size={32} className="text-accent mb-1 ml-auto" />
                    <p className="font-display text-2xl font-black text-ink dark:text-white">{area.tempC}°C</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Weather advisory ── */}
        <div className="card-surface p-5 border-l-4 border-accent bg-amber-50 dark:bg-amber-900/10">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
            ⚠ {isTA ? 'வானிலை எச்சரிக்கை' : 'Weather Advisory'}
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
            {isTA
              ? 'தென்மேற்கு பருவமழை தீவிரமடைந்துள்ளது. கன்னியாகுமரி கடற்கரை பகுதிகளில் அடுத்த 48 மணி நேரம் கனமழை எதிர்பார்க்கப்படுகிறது. மீனவர்கள் கடலுக்கு செல்வதை தவிர்க்குமாறு வேண்டுகோள்.'
              : 'Southwest monsoon has intensified. Heavy rainfall expected in Kanyakumari coastal areas over the next 48 hours. Fishermen are advised to avoid venturing into the sea.'
            }
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-500 font-mono mt-2">
            {isTA ? 'ஆதாரம்: இந்திய வானிலை ஆய்வு மையம் (IMD)' : 'Source: India Meteorological Department (IMD)'}
          </p>
        </div>

      </div>
    </div>
  )
}

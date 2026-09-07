import { useEffect, useState } from 'react'
import { FiSun, FiCloud, FiCloudRain, FiDroplet, FiWind } from 'react-icons/fi'
import newsService from '../../services/newsService.js'
import { useLang } from '../../context/LanguageContext.jsx'

const ICONS = { Sunny: FiSun, Cloudy: FiCloud, Rain: FiCloudRain, 'Partly Cloudy': FiCloud }

const CONDITIONS_TA = {
  'Sunny': 'வெயில்', 'Cloudy': 'மேகமூட்டம்',
  'Rain': 'மழை', 'Partly Cloudy': 'பகுதி மேகமூட்டம்',
}

const DAYS_TA = {
  Mon: 'திங்கள்', Tue: 'செவ்வாய்', Wed: 'புதன்',
  Thu: 'வியாழன்', Fri: 'வெள்ளி',  Sat: 'சனி', Sun: 'ஞாயிறு',
}

export default function WeatherWidget() {
  const { lang, t } = useLang()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    newsService.getWeather().then((d) => active && setData(d))
      .catch((requestError) => { if (active) setError(requestError) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  if (loading) return <div className="card-surface p-4 h-48 animate-pulse" />
  if (error || !data || data.available === false) return (
    <div className="card-surface p-4" role="status">
      <p className="font-display text-lg font-bold">{t.weatherTitle}</p>
      <p className="mt-2 text-sm text-ink-soft">{t.weatherUnavailable}</p>
    </div>
  )

  const Icon      = ICONS[data.condition] || FiSun
  const condition = lang === 'TA' ? (CONDITIONS_TA[data.condition] || data.condition) : data.condition

  return (
    <div className="card-surface p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">{data.city}</p>
          <p className="font-display text-3xl font-bold mt-1">{data.tempC}°C</p>
          <p className="text-sm text-ink-soft">{condition}</p>
        </div>
        <Icon size={44} className="text-accent" />
      </div>
      <div className="flex gap-4 mt-4 text-xs text-ink-soft">
        <span className="flex items-center gap-1">
          <FiDroplet size={12} /> {data.humidity}% {t.weatherHumidity}
        </span>
        <span className="flex items-center gap-1">
          <FiWind size={12} /> {data.windKmh} km/h {t.weatherWind}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1 mt-4 pt-4 border-t border-black/5">
        {data.forecast.map((f) => {
          const FIcon = ICONS[f.condition] || FiSun
          const day   = lang === 'TA' ? (DAYS_TA[f.day] || f.day) : f.day
          return (
            <div key={f.day} className="flex flex-col items-center text-center">
              <span className="text-[10px] text-ink-soft">{day}</span>
              <FIcon size={16} className="my-1 text-secondary" />
              <span className="text-[10px] font-mono">{f.high}°/{f.low}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

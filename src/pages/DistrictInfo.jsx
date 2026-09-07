import { useEffect, useState } from 'react'
import WeatherWidget from '../components/widgets/WeatherWidget.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import newsService from '../services/newsService.js'
import { ApiErrorState } from '../components/ui/ApiState.jsx'

export default function DistrictInfo() {
  const { t } = useLang()
  const TABS = [
    { key: 'Taluks',       label: t.tabTaluks       },
    { key: 'Govt Offices', label: t.tabGovtOffices  },
    { key: 'Helplines',    label: t.tabHelplines    },
    { key: 'Weather',      label: t.tabWeather      },
    { key: 'Transport',    label: t.tabTransport    },
  ]
  const [activeTab, setActiveTab] = useState('Taluks')
  const [districtInfo, setDistrictInfo] = useState({ taluks: [], govtOffices: [], helplines: [], transport: [] })
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    newsService.getDistrictInfo({ signal: controller.signal }).then(setDistrictInfo).catch((requestError) => {
      if (requestError.code !== 'REQUEST_CANCELLED') setError(requestError)
    })
    return () => controller.abort()
  }, [])

  return (
    <div>
      <div className="bg-ink dark:bg-black text-white py-8">
        <div className="container-page">
          <p className="eyebrow text-accent mb-1">{t.navKanyakumari}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{t.districtInfoTitle}</h1>
        </div>
      </div>

      <div className="container-page py-8">
        {error && <div className="mb-6"><ApiErrorState error={error} /></div>}
        <div role="tablist" aria-label={t.districtInfoTitle} className="flex flex-wrap gap-0 border-b border-black/10 dark:border-white/10 mb-8">
          {TABS.map((tab) => (
            <button key={tab.key} role="tab" aria-selected={activeTab === tab.key}
              aria-controls={`district-panel-${tab.key.replaceAll(' ', '-').toLowerCase()}`}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink-soft dark:text-white/50 hover:text-ink dark:hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'Taluks' && (
          <div className="grid min-w-0 md:grid-cols-2 gap-8">
            <div className="min-w-0">
              <h2 className="font-bold text-lg mb-4 text-ink dark:text-white">{t.taluks}</h2>
              <div className="card-surface max-w-full overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10 dark:bg-primary/20">
                      <th className="text-left px-4 py-3 font-semibold text-ink dark:text-white">{t.talukCol}</th>
                      <th className="text-left px-4 py-3 font-semibold text-ink dark:text-white">{t.hqCol}</th>
                      <th className="text-right px-4 py-3 font-semibold text-ink dark:text-white">{t.panchayatsCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districtInfo.taluks.map((taluk, i) => (
                      <tr key={taluk.name} className={i % 2 === 0 ? '' : 'bg-black/3 dark:bg-white/3'}>
                        <td className="px-4 py-3 font-medium text-ink dark:text-white">{taluk.name}</td>
                        <td className="px-4 py-3 text-ink-soft dark:text-white/60">{taluk.headquarters}</td>
                        <td className="px-4 py-3 text-right font-mono text-ink dark:text-white">{taluk.panchayats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-surface p-5 space-y-3 text-sm text-ink-soft dark:text-white/70 leading-relaxed">
              <p>{t.districtDesc}</p>
              <div className="flex gap-6 pt-2 border-t border-black/8 dark:border-white/8">
                <div><p className="eyebrow">{t.hqLabel}</p><p className="font-semibold text-ink dark:text-white">{t.districtHQ}</p></div>
                <div><p className="eyebrow">{t.areaLabel}</p><p className="font-semibold text-ink dark:text-white">{t.districtArea}</p></div>
                <div><p className="eyebrow">{t.popLabel}</p><p className="font-semibold text-ink dark:text-white">{t.districtPop}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Govt Offices' && (
          <div>
            <h2 className="font-bold text-lg mb-4 text-ink dark:text-white">{t.govtOffices}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {districtInfo.govtOffices.map((office) => (
                <div key={office.name} className="card-surface p-4">
                  <h3 className="font-bold text-sm text-ink dark:text-white mb-2">{office.name}</h3>
                  <p className="text-xs text-ink-soft dark:text-white/60 leading-relaxed mb-2">{office.address}</p>
                  <a href={`tel:${office.phone}`} className="text-xs font-mono text-primary hover:underline">📞 {office.phone}</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Helplines' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-lg mb-4 text-ink dark:text-white">{t.emergencyHelplines}</h2>
              <div className="space-y-3">
                {districtInfo.helplines.map((h) => (
                  <div key={h.name} className={`card-surface flex items-center justify-between px-5 py-4 ${
                    ['Police', 'Fire Service', 'Ambulance'].includes(h.name) ? 'border-l-4 border-primary' : ''
                  }`}>
                    <span className="font-semibold text-ink dark:text-white">{h.name}</span>
                    <a href={`tel:${h.number}`} className="font-mono text-2xl font-bold text-primary hover:underline">{h.number}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-surface p-5 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-700/30">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">{t.emergencyTitle}</h3>
              <p className="text-sm text-ink-soft dark:text-white/70 leading-relaxed">
                {t.emergencyDesc}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Weather' && (
          <div className="max-w-sm">
            <h2 className="font-bold text-lg mb-4 text-ink dark:text-white">{t.weatherToday}</h2>
            <WeatherWidget />
          </div>
        )}

        {activeTab === 'Transport' && (
          <div>
            <h2 className="font-bold text-lg mb-4 text-ink dark:text-white">{t.busTrainSchedule}</h2>
            <div className="card-surface overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/10 dark:bg-primary/20">
                    <th className="text-left px-4 py-3 font-semibold text-ink dark:text-white">{t.routeCol}</th>
                    <th className="text-left px-4 py-3 font-semibold text-ink dark:text-white">{t.typeCol}</th>
                    <th className="text-left px-4 py-3 font-semibold text-ink dark:text-white">{t.durationCol}</th>
                    <th className="text-left px-4 py-3 font-semibold text-ink dark:text-white">{t.operatorCol}</th>
                  </tr>
                </thead>
                <tbody>
                  {districtInfo.transport.map((row, i) => (
                    <tr key={row.route} className={i % 2 === 0 ? '' : 'bg-black/3 dark:bg-white/3'}>
                      <td className="px-4 py-3 font-medium text-ink dark:text-white">{row.route}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          row.type === 'Train'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>{row.type === 'Train' ? t.transportTrain : t.transportBus}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-ink-soft dark:text-white/60">{row.duration}</td>
                      <td className="px-4 py-3 text-ink-soft dark:text-white/60">{row.operator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

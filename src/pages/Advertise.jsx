import { FiCheck } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'

export default function Advertise() {
  const { t } = useLang()

  const PACKAGES = [
    {
      nameKey: 'Starter', price: '₹5,000', period: `/ ${t.monthly}`,
      features: [t.albumEvents + ' ads (728×90)', 'Homepage', '50,000 impressions/mo', 'Analytics'],
    },
    {
      nameKey: 'Growth', price: '₹15,000', period: `/ ${t.monthly}`, highlight: true,
      features: ['All Starter', 'Category takeover', 'Newsletter', '2,00,000 impressions/mo', 'Weekly report'],
    },
    {
      nameKey: 'Enterprise', price: t.sortPopular, period: '',
      features: ['Full site branding', 'Native sponsorship', 'Push ads', 'Account manager', 'Live dashboard'],
    },
  ]

  const STATS = [
    { value: '5L+',    label: t.monthlyReaders  },
    { value: '12L+',   label: t.pageViews       },
    { value: '4.2 min',label: t.avgTime         },
    { value: '62%',    label: t.mobileAudience  },
  ]

  return (
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.advertisePageTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
        {STATS.map((s) => (
          <div key={s.label} className="text-center p-5 bg-gray-50 rounded-lg border border-black/5">
            <p className="text-2xl font-black text-primary">{s.value}</p>
            <p className="text-xs eyebrow mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-ink mb-6">{t.adPackages}</h2>
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {PACKAGES.map((pkg) => (
          <div key={pkg.nameKey}
            className={`rounded-lg border p-6 flex flex-col gap-4 ${
              pkg.highlight ? 'border-primary bg-primary/5' : 'border-black/10 bg-gray-50'
            }`}>
            {pkg.highlight && <span className="text-xs text-primary font-bold uppercase tracking-widest">{t.mostPopular}</span>}
            <div>
              <h3 className="text-lg font-bold text-ink">{pkg.nameKey}</h3>
              <p className="text-2xl font-black text-ink mt-1">
                {pkg.price}<span className="text-sm font-normal text-ink-soft">{pkg.period}</span>
              </p>
            </div>
            <ul className="space-y-2 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                  <FiCheck className="text-primary mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a href="/contact" className="btn-primary text-sm text-center">{t.getStarted}</a>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink-soft">
        {t.customCampaigns}{' '}
        <a href="mailto:ads@kanyakumaritoday.com" className="text-primary hover:underline">ads@kanyakumaritoday.com</a>
      </p>
    </div>
  )
}

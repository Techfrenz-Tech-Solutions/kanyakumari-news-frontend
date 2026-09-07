import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

export default function Advertise() {
  const { t } = useLang()

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.advertisePageTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-6" />
      <div className="card-surface p-6">
        <p className="text-ink font-semibold">{t.advertiseManual}</p>
        <p className="mt-3 text-sm text-ink-soft">{t.advertiseManualDesc}</p>
        <Link to="/contact" className="btn-primary inline-flex mt-6 text-sm">{t.contactTitle}</Link>
      </div>
    </div>
  )
}

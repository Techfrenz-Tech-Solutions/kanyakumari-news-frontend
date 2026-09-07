import { useLang } from '../context/LanguageContext.jsx'

export default function EPaper() {
  const { t } = useLang()

  return (
    <div className="container-page py-8">
      <h1 className="section-title mb-6">{t.ePaperTitle}</h1>

      <div className="card-surface p-8 text-center">
        <p className="font-display text-xl font-bold text-ink">
          {t.ePaperUnavailable}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {t.ePaperDesc}
        </p>
      </div>
    </div>
  )
}

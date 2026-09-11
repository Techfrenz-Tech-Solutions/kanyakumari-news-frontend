import { useLang } from '../context/LanguageContext.jsx'

export default function Disclaimer() {
  const { t } = useLang()

  const sections = [
    { title: t.disclaimerS1Title, body: t.disclaimerS1Body },
    { title: t.disclaimerS2Title, body: t.disclaimerS2Body },
    { title: t.disclaimerS3Title, body: t.disclaimerS3Body },
    { title: t.disclaimerS4Title, body: t.disclaimerS4Body },
  ]

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.disclaimerTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-3" />
      <p className="text-xs text-ink-soft mb-8">{t.lastUpdated}: {t.legalDate}</p>
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-ink mb-2">{s.title}</h2>
            <p className="text-sm text-ink-soft leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

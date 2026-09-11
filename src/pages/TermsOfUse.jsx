import { useLang } from '../context/LanguageContext.jsx'

export default function TermsOfUse() {
  const { t } = useLang()

  const sections = [
    { title: t.termsS1Title, body: t.termsS1Body },
    { title: t.termsS2Title, body: t.termsS2Body },
    { title: t.termsS3Title, body: t.termsS3Body },
    { title: t.termsS4Title, body: t.termsS4Body },
    { title: t.termsS5Title, body: t.termsS5Body },
  ]

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.termsTitle}</h1>
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

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
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.termsTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-3" />
      <p className="text-sm text-ink-soft mb-8">{t.lastUpdated}: {t.legalDate}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((s) => (
          <div key={s.title} className="bg-gray-50 rounded-lg p-6 border border-black/5">
            <h2 className="font-bold text-base text-ink mb-3 border-l-4 border-primary pl-3">{s.title}</h2>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-ink-soft">
        {t.legalQuestions}{' '}
        <a href="mailto:legal@kanyakumaritoday.com" className="text-primary hover:underline">legal@kanyakumaritoday.com</a>
      </div>
    </div>
  )
}

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
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.disclaimerTitle}</h1>
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

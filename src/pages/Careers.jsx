import { useLang } from '../context/LanguageContext.jsx'

export default function Careers() {
  const { t } = useLang()

  const WHY = [
    { title: t.impactTitle,  body: t.impactBody  },
    { title: t.cultureTitle, body: t.cultureBody },
    { title: t.growthTitle,  body: t.growthBody  },
  ]

  return (
    <div className="container-page py-12 max-w-4xl">
      <h1 className="section-title mb-2">{t.careersTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-6" />

      <p className="text-ink-soft max-w-2xl leading-relaxed mb-10">{t.careersIntro}</p>

      {/* Why join us */}
      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        {WHY.map((c) => (
          <div key={c.title} className="p-5 bg-gray-50 rounded-lg border border-black/5">
            <h3 className="font-bold text-ink mb-1">{c.title}</h3>
            <p className="text-sm text-ink-soft">{c.body}</p>
          </div>
        ))}
      </div>

      {/* No hardcoded openings — prompt visitors to reach out */}
      <h2 className="text-xl font-bold text-ink mb-5">{t.currentOpenings}</h2>
      <div className="rounded-lg border border-black/10 bg-gray-50 p-8 text-center">
        <p className="text-ink-soft text-sm">{t.noOpeningsMsg || 'No openings listed at the moment. Send us your CV and we\'ll be in touch.'}</p>
        <a href="mailto:hr@kanyakumaritoday.com" className="mt-4 inline-block btn-primary text-sm">
          hr@kanyakumaritoday.com
        </a>
      </div>

      <p className="text-sm text-ink-soft mt-8">
        {t.noRoleFit}{' '}
        <a href="mailto:hr@kanyakumaritoday.com" className="text-primary hover:underline">hr@kanyakumaritoday.com</a>
      </p>
    </div>
  )
}

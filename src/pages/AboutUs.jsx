import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

export default function AboutUs() {
  const { t } = useLang()

  const missionCards = [
    { title: t.aboutMission,  body: t.aboutMissionBody  },
    { title: t.aboutVision,   body: t.aboutVisionBody   },
    { title: t.aboutValues,   body: t.aboutValuesBody   },
  ]

  return (
    <div className="container-page py-12 max-w-5xl">
      <section className="mb-12">
        <h1 className="section-title mb-2">{t.aboutTitle}</h1>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <div className="space-y-4 text-ink-soft leading-relaxed max-w-3xl">
          <p className="text-base text-ink font-medium">{t.aboutIntro1}</p>
          <p>{t.aboutIntro2}</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {missionCards.map((card) => (
            <div key={card.title} className="card-surface p-5">
              <h3 className="font-bold text-ink mb-2">{card.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title mb-2">{t.contactTitle}</h2>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <p className="text-sm text-ink-soft mb-5 max-w-xl">{t.aboutContactDesc}</p>
        <Link to="/contact" className="btn-primary inline-flex text-sm">{t.contactTitle}</Link>
      </section>
    </div>
  )
}

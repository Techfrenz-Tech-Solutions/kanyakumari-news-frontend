import { useLang } from '../context/LanguageContext.jsx'

const OPENINGS = [
  { titleEN: 'Senior Reporter – Politics',      titleTA: 'மூத்த நிருபர் – அரசியல்',        locationEN: 'Chennai',     locationTA: 'சென்னை',       type: 'Full-time', dept: 'Editorial'  },
  { titleEN: 'Video Editor',                    titleTA: 'வீடியோ எடிட்டர்',                 locationEN: 'Chennai',     locationTA: 'சென்னை',       type: 'Full-time', dept: 'Multimedia' },
  { titleEN: 'Social Media Manager',            titleTA: 'சமூக ஊடக மேலாளர்',               locationEN: 'Remote',      locationTA: 'தொலைநிலை',    type: 'Full-time', dept: 'Digital'    },
  { titleEN: 'Frontend Developer (React)',       titleTA: 'ஃப்ரண்டெண்ட் டெவலப்பர் (React)', locationEN: 'Remote',      locationTA: 'தொலைநிலை',    type: 'Full-time', dept: 'Technology' },
  { titleEN: 'Freelance District Correspondent', titleTA: 'ஃப்ரீலான்ஸ் மாவட்ட நிருபர்',    locationEN: 'Various, TN', locationTA: 'பல இடங்கள்', type: 'Freelance', dept: 'Editorial'  },
  { titleEN: 'Graphic Designer',                titleTA: 'கிராஃபிக் டிசைனர்',               locationEN: 'Chennai',     locationTA: 'சென்னை',       type: 'Full-time', dept: 'Creative'   },
]

const DEPT_KEY = {
  Editorial: 'deptEditorial', Multimedia: 'deptMultimedia',
  Digital: 'deptDigital', Technology: 'deptTechnology', Creative: 'deptCreative',
}

export default function Careers() {
  const { lang, t } = useLang()

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

      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        {WHY.map((c) => (
          <div key={c.title} className="p-5 bg-gray-50 rounded-lg border border-black/5">
            <h3 className="font-bold text-ink mb-1">{c.title}</h3>
            <p className="text-sm text-ink-soft">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-ink mb-5">{t.currentOpenings}</h2>
      <div className="space-y-3">
        {OPENINGS.map((job) => (
          <div key={job.titleEN}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-lg border border-black/10 bg-gray-50 hover:border-primary transition-colors">
            <div>
              <h3 className="font-semibold text-ink">{lang === 'TA' ? job.titleTA : job.titleEN}</h3>
              <p className="text-xs text-ink-soft mt-0.5">
                {t[DEPT_KEY[job.dept]] || job.dept} · {lang === 'TA' ? job.locationTA : job.locationEN}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                job.type === 'Freelance'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>{job.type === 'Freelance' ? t.typeFreelance : t.typeFullTime}</span>
              <a href="/contact" className="btn-primary text-xs py-1.5 px-4">{t.applyBtn}</a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink-soft mt-8">
        {t.noRoleFit}{' '}
        <a href="mailto:hr@kanyakumaritoday.com" className="text-primary hover:underline">hr@kanyakumaritoday.com</a>
      </p>
    </div>
  )
}

import { useLang } from '../context/LanguageContext.jsx'

export default function EPaper() {
  const { lang } = useLang()
  const isTA = lang === 'TA'

  return (
    <div className="container-page py-8">
      <h1 className="section-title mb-6">{isTA ? 'மின்-பத்திரிகை' : 'E-Paper'}</h1>

      <div className="card-surface p-8 text-center">
        <p className="font-display text-xl font-bold text-ink">
          {isTA ? 'மின்-பத்திரிகை தற்போது கிடைக்கவில்லை' : 'E-Paper is currently unavailable'}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {isTA
            ? 'PDF பதிப்புகள் தயாரானதும் இங்கே வெளியிடப்படும்.'
            : 'PDF editions will appear here after the publishing service is ready.'}
        </p>
      </div>
    </div>
  )
}

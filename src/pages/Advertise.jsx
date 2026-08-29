import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

export default function Advertise() {
  const { lang, t } = useLang()
  const isTA = lang === 'TA'

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.advertisePageTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-6" />
      <div className="card-surface p-6">
        <p className="text-ink font-semibold">
          {isTA ? 'விளம்பர முன்பதிவு தற்போது கைமுறையாக கையாளப்படுகிறது.' : 'Advertising enquiries are currently handled manually.'}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {isTA
            ? 'விளம்பர CMS இன்னும் கிடைக்கவில்லை. தற்போதைய இடங்கள் மற்றும் விலை விவரங்களுக்கு எங்களை தொடர்பு கொள்ளுங்கள்.'
            : 'The advertisement CMS is not yet available. Contact us to confirm current placements and pricing.'}
        </p>
        <Link to="/contact" className="btn-primary inline-flex mt-6 text-sm">{t.contactTitle}</Link>
      </div>
    </div>
  )
}

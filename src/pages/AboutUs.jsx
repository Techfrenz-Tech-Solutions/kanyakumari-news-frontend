import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

export default function AboutUs() {
  const { lang, t } = useLang()
  const isTA = lang === 'TA'

  const missionCards = isTA ? [
    { title: 'எங்கள் நோக்கம்', body: 'கன்னியாகுமரியின் ஒவ்வொரு குடிமகனையும் சரியான நேரத்தில் துல்லியமான மற்றும் அர்த்தமுள்ள உள்ளூர் செய்திகளுடன் சக்திவாய்ப்படுத்துவது.' },
    { title: 'எங்கள் தரிசனம்', body: 'கன்னியாகுமரி மாவட்டத்தில் மிகவும் நம்பகமான டிஜிட்டல் செய்தி ஆதாரமாக இருப்பது.' },
    { title: 'எங்கள் மதிப்புகள்', body: 'துல்லியம் · சுதந்திரம் · பொறுப்புணர்வு · சமூகம் — நாங்கள் வெளியிடும் ஒவ்வொரு கட்டுரையும் இந்த நான்கு தூண்களால் வழிநடத்தப்படுகின்றன.' },
  ] : [
    { title: 'Our Mission', body: 'Empower every citizen of Kanyakumari with timely, accurate, and meaningful local news.' },
    { title: 'Our Vision', body: 'To be the most trusted digital news source in Kanyakumari district.' },
    { title: 'Our Values', body: 'Accuracy · Independence · Accountability · Community — guiding every story we publish.' },
  ]

  return (
    <div className="container-page py-12 max-w-5xl">
      <section className="mb-12">
        <h1 className="section-title mb-2">{t.aboutTitle}</h1>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <div className="space-y-4 text-ink-soft leading-relaxed max-w-3xl">
          <p className="text-base text-ink font-medium">
            {isTA
              ? 'கன்னியாகுமரி டுடே கன்னியாகுமரி மாவட்ட வாசகர்களுக்கு விரைவான, துல்லியமான மற்றும் நேர்மையான உள்ளூர் செய்திகளை வழங்குகிறது.'
              : 'Kanyakumari Today delivers timely, accurate, and fair local news for readers across Kanyakumari district.'}
          </p>
          <p>
            {isTA
              ? 'உள்ளூர் அரசியல், குடிமைப் பிரச்சினைகள் மற்றும் சமூகத்திற்கு முக்கியமான செய்திகளை நாங்கள் உள்ளடக்குகிறோம்.'
              : 'We cover local politics, civic issues, and the stories that matter to the community.'}
          </p>
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
        <p className="text-sm text-ink-soft mb-5 max-w-xl">
          {isTA
            ? 'செய்தி குறிப்பு, திருத்தம் அல்லது கூட்டாண்மை முன்மொழிவுக்கு எங்கள் தொடர்பு படிவத்தைப் பயன்படுத்துங்கள்.'
            : 'For news tips, corrections, or partnership proposals, use our verified contact form.'}
        </p>
        <Link to="/contact" className="btn-primary inline-flex text-sm">{t.contactTitle}</Link>
      </section>
    </div>
  )
}

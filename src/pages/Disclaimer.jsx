import { useLang } from '../context/LanguageContext.jsx'

export default function Disclaimer() {
  const { lang, t } = useLang()
  const isTA = lang === 'TA'
  const sections = isTA ? [
    { title: '1. பொது மறுப்பு',          body: 'கன்னியாகுமரி டுடே வழங்கும் செய்திகள் மற்றும் தகவல்கள் பொது தகவல் நோக்கங்களுக்காக மட்டுமே.' },
    { title: '2. துல்லியம்',             body: 'தகவல்களை துல்லியமாக வைக்க முயற்சிக்கிறோம். ஆனால் சில நேரங்களில் தகவல்கள் மாறியிருக்கலாம்.' },
    { title: '3. வெளி இணைப்புகள்',       body: 'வெளி தளங்களின் உள்ளடக்கத்திற்கு நாங்கள் பொறுப்பேற்க மாட்டோம்.' },
    { title: '4. தொழில்முறை ஆலோசனை',    body: 'இந்த தளத்தின் எந்த உள்ளடக்கமும் சட்ட, மருத்துவ அல்லது நிதி ஆலோசனையாக கருதப்படக்கூடாது.' },
  ] : [
    { title: '1. General Disclaimer',    body: 'Content on Kanyakumari Today is for general informational purposes only.' },
    { title: '2. Accuracy',              body: 'While we strive for accuracy, information may change. We make no warranties about completeness or reliability.' },
    { title: '3. External Links',        body: 'We are not responsible for content on third-party websites we link to.' },
    { title: '4. Professional Advice',   body: 'Nothing on this site constitutes legal, medical, or financial advice.' },
  ]

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.disclaimerTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-3" />
      <p className="text-xs text-ink-soft mb-8">{t.lastUpdated}: January 1, 2025</p>
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

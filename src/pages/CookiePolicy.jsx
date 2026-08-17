import { useLang } from '../context/LanguageContext.jsx'

export default function CookiePolicy() {
  const { lang, t } = useLang()
  const isTA = lang === 'TA'
  const sections = isTA ? [
    { title: '1. குக்கீகள் என்றால் என்ன?',      body: 'குக்கீகள் என்பது உங்கள் சாதனத்தில் சேமிக்கப்படும் சிறிய உரை கோப்புகள். இவை உங்கள் விருப்பங்களை நினைவில் வைக்க உதவுகின்றன.' },
    { title: '2. நாங்கள் பயன்படுத்தும் குக்கீகள்', body: 'அத்தியாவசிய குக்கீகள் (தள செயல்பாட்டிற்கு), செயல்திறன் குக்கீகள் (பகுப்பாய்வுக்கு), மற்றும் விளம்பர குக்கீகள் ஆகியவற்றை பயன்படுத்துகிறோம்.' },
    { title: '3. குக்கீகளை நிர்வகிக்கவும்',      body: 'உங்கள் உலாவி அமைப்புகள் மூலம் குக்கீகளை முடக்கலாம். ஆனால் சில தள அம்சங்கள் சரியாக வேலை செய்யாமல் போகலாம்.' },
    { title: '4. ஒப்புதல்',                       body: 'இந்த தளத்தை தொடர்ந்து பயன்படுத்துவதன் மூலம் குக்கீ பயன்பாட்டிற்கு ஒப்புதல் அளிக்கிறீர்கள்.' },
  ] : [
    { title: '1. What Are Cookies?',       body: 'Cookies are small text files stored on your device that help remember your preferences and improve your experience.' },
    { title: '2. Cookies We Use',          body: 'We use essential cookies (for site functionality), performance cookies (for analytics), and advertising cookies.' },
    { title: '3. Managing Cookies',        body: 'You can disable cookies through your browser settings, though some site features may not work correctly.' },
    { title: '4. Consent',                 body: 'By continuing to use our site, you consent to our use of cookies as described in this policy.' },
  ]

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.cookieTitle}</h1>
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

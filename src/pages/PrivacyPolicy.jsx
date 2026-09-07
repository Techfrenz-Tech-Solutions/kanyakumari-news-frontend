import { useLang } from '../context/LanguageContext.jsx'

const SECTIONS_EN = [
  { title: '1. Information We Collect',   body: 'We collect information you provide directly (name, email) and automatically collected data including IP addresses, browser type, pages visited, and time spent. We may also receive data from third-party social login providers.' },
  { title: '2. How We Use Your Information', body: 'We use data to deliver our news services, personalise content, send newsletters you opted into, analyse performance, and comply with legal obligations. We do not sell your personal data.' },
  { title: '3. Cookies & Tracking',       body: 'We use cookies to remember preferences, understand usage, and deliver relevant advertising. You can manage cookies via our Cookie Settings. Disabling certain cookies may affect functionality.' },
  { title: '4. Data Sharing',             body: 'We may share data with trusted service providers (hosting, analytics, email) under confidentiality agreements, or where required by law.' },
  { title: '5. Your Rights',              body: 'You may access, correct, or delete your personal data at any time. Contact us at legal@kanyakumaritoday.com to exercise these rights.' },
  { title: '6. Security',                 body: 'We implement industry-standard measures to protect your data. However, no internet transmission is 100% secure.' },
]

const SECTIONS_TA = [
  { title: '1. நாங்கள் சேகரிக்கும் தகவல்கள்', body: 'நீங்கள் நேரடியாக வழங்கும் தகவல்கள் (பெயர், மின்னஞ்சல்) மற்றும் தானாகவே சேகரிக்கப்படும் தரவுகளான IP முகவரிகள், உலாவி வகை, பார்வையிட்ட பக்கங்கள் ஆகியவற்றை நாங்கள் சேகரிக்கிறோம்.' },
  { title: '2. உங்கள் தகவலை எவ்வாறு பயன்படுத்துகிறோம்', body: 'செய்தி சேவைகளை வழங்க, உள்ளடக்கத்தை தனிப்பயனாக்க, நீங்கள் பதிவு செய்த செய்திமடல்களை அனுப்ப மற்றும் சட்ட கடமைகளை நிறைவேற்ற தரவை பயன்படுத்துகிறோம். உங்கள் தரவை விற்பனை செய்வதில்லை.' },
  { title: '3. குக்கீகள் மற்றும் கண்காணிப்பு', body: 'விருப்பங்களை நினைவில் கொள்ள, பயன்பாட்டை புரிந்துகொள்ள குக்கீகளை பயன்படுத்துகிறோம். குக்கீ அமைப்புகள் மூலம் நிர்வகிக்கலாம்.' },
  { title: '4. தரவு பகிர்வு',               body: 'நம்பகமான சேவை வழங்குநர்களுடன் ரகசியத்தன்மை ஒப்பந்தங்களின் கீழ் தரவை பகிரலாம் அல்லது சட்டம் தேவைப்படும் போது.' },
  { title: '5. உங்கள் உரிமைகள்',           body: 'உங்கள் தனிப்பட்ட தரவை எப்போது வேண்டுமானாலும் அணுகவோ, திருத்தவோ அல்லது நீக்கவோ செய்யலாம். legal@kanyakumaritoday.com இல் தொடர்பு கொள்ளுங்கள்.' },
  { title: '6. பாதுகாப்பு',                 body: 'உங்கள் தரவை பாதுகாக்க தொழில்துறை தரநிலை நடவடிக்கைகளை செயல்படுத்துகிறோம். ஆனால் இணைய பரிமாற்றம் 100% பாதுகாப்பானது அல்ல.' },
]

export default function PrivacyPolicy() {
  const { lang, t } = useLang()
  const sections = lang === 'TA' ? SECTIONS_TA : SECTIONS_EN
  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.privacyTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-3" />
      <p className="text-xs text-ink-soft mb-8">{t.lastUpdated}: {t.legalDate}</p>
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-ink mb-2">{s.title}</h2>
            <p className="text-sm text-ink-soft leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-ink-soft">
        <a href="mailto:legal@kanyakumaritoday.com" className="text-primary hover:underline">legal@kanyakumaritoday.com</a>
      </div>
    </div>
  )
}

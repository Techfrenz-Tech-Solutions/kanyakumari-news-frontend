import { useLang } from '../context/LanguageContext.jsx'

const SECTIONS_EN = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly, such as your name, email address, and phone number when you register, subscribe, or contact us. We also automatically collect technical data including your IP address, browser type, operating system, pages visited, time spent on pages, and referring URLs.',
    points: [
      'Name, email address, and phone number provided during registration or contact',
      'IP address, browser type, and operating system collected automatically',
      'Pages visited, time spent, and referring URLs tracked for analytics',
      'Limited profile data from social login providers such as Google or Facebook',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to deliver our news services and personalise content based on your interests and location. We do not sell, rent, or trade your personal data to third parties.',
    points: [
      'Deliver personalised news content based on your reading interests and location',
      'Send newsletters, breaking news alerts, and updates you have opted into',
      'Analyse site performance, readership patterns, and improve user experience',
      'Comply with legal and regulatory obligations and respond to lawful requests',
    ],
  },
  {
    title: '3. Cookies & Tracking Technologies',
    body: 'We use cookies and similar tracking technologies to remember your preferences, understand how readers use our site, and deliver relevant advertising.',
    points: [
      'Essential cookies to maintain your login state and site preferences',
      'Analytics cookies to understand readership behaviour and improve content',
      'Advertising cookies to deliver relevant ads based on your interests',
      'You can manage or disable cookies via our Cookie Settings in the footer',
    ],
  },
  {
    title: '4. Data Sharing & Disclosure',
    body: 'We may share your data with trusted third-party service providers who process data on our behalf under strict confidentiality agreements.',
    points: [
      'Cloud hosting, email delivery, and analytics providers under confidentiality agreements',
      'Payment processors for subscription transactions — only necessary data is shared',
      'Law enforcement or regulatory authorities when required by law or court order',
      'We never sell, rent, or trade your personal data to advertisers or data brokers',
    ],
  },
  {
    title: '5. Your Rights',
    body: 'Depending on your jurisdiction, you may have the right to access, rectify, or erase your personal data, restrict or object to its processing, and request data portability.',
    points: [
      'Right to access a copy of the personal data we hold about you',
      'Right to correct inaccurate or incomplete personal information',
      'Right to request deletion of your personal data from our systems',
      'Right to withdraw consent to marketing emails at any time via "Unsubscribe"',
    ],
  },
  {
    title: '6. Data Security & Retention',
    body: 'We implement industry-standard security measures to protect your personal data. We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy.',
    points: [
      'Encrypted connections (HTTPS) for all data transmission on our site',
      'Strict access controls so only authorised staff can access personal data',
      'Regular security audits and vulnerability assessments conducted periodically',
      'Data deleted or anonymised once it is no longer required for its original purpose',
    ],
  },
]

const SECTIONS_TA = [
  {
    title: '1. நாங்கள் சேகரிக்கும் தகவல்கள்',
    body: 'நீங்கள் பதிவு செய்யும்போது, சந்தா எடுக்கும்போது, அல்லது எங்களை தொடர்பு கொள்ளும்போது நேரடியாக வழங்கும் பெயர், மின்னஞ்சல், தொலைபேசி எண் போன்ற தகவல்களை சேகரிக்கிறோம். உங்கள் IP முகவரி, உலாவி வகை, பார்வையிட்ட பக்கங்கள், மற்றும் தளத்தில் செலவழித்த நேரம் போன்ற தொழில்நுட்ப தரவையும் தானாகவே சேகரிக்கிறோம்.',
  },
  {
    title: '2. உங்கள் தகவலை எவ்வாறு பயன்படுத்துகிறோம்',
    body: 'செய்தி சேவைகளை வழங்கவும், உள்ளடக்கத்தை தனிப்பயனாக்கவும், நீங்கள் பதிவு செய்த செய்திமடல்களை அனுப்பவும், தள செயல்திறனை பகுப்பாய்வு செய்யவும், மற்றும் சட்ட கடமைகளை நிறைவேற்றவும் தரவை பயன்படுத்துகிறோம். உங்கள் தனிப்பட்ட தரவை மூன்றாம் தரப்பினருக்கு விற்கவோ வாடகைக்கு கொடுக்கவோ மாட்டோம்.',
  },
  {
    title: '3. குக்கீகள் மற்றும் கண்காணிப்பு தொழில்நுட்பங்கள்',
    body: 'உங்கள் விருப்பங்களை நினைவில் கொள்ள, தள பயன்பாட்டை புரிந்துகொள்ள, மற்றும் பொருத்தமான விளம்பரங்களை வழங்க குக்கீகளை பயன்படுத்துகிறோம். கீழ் உள்ள குக்கீ அமைப்புகள் மூலம் நிர்வகிக்கலாம். சில குக்கீகளை முடக்கினால் தளத்தின் சில அம்சங்கள் சரியாக வேலை செய்யாமல் போகலாம்.',
  },
  {
    title: '4. தரவு பகிர்வு மற்றும் வெளிப்படுத்தல்',
    body: 'நம்பகமான மூன்றாம் தரப்பு சேவை வழங்குநர்களுடன் — ஹோஸ்டிங், மின்னஞ்சல், பகுப்பாய்வு தளங்கள் — ரகசியத்தன்மை ஒப்பந்தங்களின் கீழ் தரவை பகிரலாம். சட்டம், நீதிமன்ற உத்தரவு, அல்லது ஒழுங்குமுறை அதிகாரிகள் கோரும்போதும் தகவல்களை வெளியிடலாம்.',
  },
  {
    title: '5. உங்கள் உரிமைகள்',
    body: 'உங்கள் தனிப்பட்ட தரவை அணுக, திருத்த, நீக்க, அல்லது செயலாக்கத்தை கட்டுப்படுத்த உரிமை உள்ளது. இந்த உரிமைகளை பயன்படுத்த legal@kanyakumaritoday.com இல் தொடர்பு கொள்ளுங்கள். 30 நாட்களுக்குள் பதில் அனுப்புவோம். எந்த மின்னஞ்சலிலும் "Unsubscribe" கிளிக் செய்து சந்தா நிறுத்தலாம்.',
  },
  {
    title: '6. தரவு பாதுகாப்பு மற்றும் சேமிப்பு',
    body: 'HTTPS குறியாக்கம், அணுகல் கட்டுப்பாடுகள், மற்றும் வழக்கமான பாதுகாப்பு தணிக்கைகள் மூலம் உங்கள் தரவை பாதுகாக்கிறோம். இருப்பினும் இணைய பரிமாற்றம் 100% பாதுகாப்பானது என்று உறுதியளிக்க முடியாது. இந்த கொள்கையில் கூறிய நோக்கங்களுக்கு மட்டுமே தரவை தேவையான காலம் வரை வைத்திருப்போம்.',
  },
]

export default function PrivacyPolicy() {
  const { lang, t } = useLang()
  const sections = lang === 'TA' ? SECTIONS_TA : SECTIONS_EN
  return (
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.privacyTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-3" />
      <p className="text-sm text-ink-soft mb-8">{t.lastUpdated}: {t.legalDate}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((s) => (
          <div key={s.title} className="bg-gray-50 rounded-lg p-6 border border-black/5">
            <h2 className="font-bold text-base text-ink mb-3 border-l-4 border-primary pl-3">{s.title}</h2>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">{s.body}</p>
            <ul className="space-y-2">
              {s.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-ink-soft">
        Questions? Contact us at{' '}
        <a href="mailto:legal@kanyakumaritoday.com" className="text-primary hover:underline">legal@kanyakumaritoday.com</a>
      </div>
    </div>
  )
}

import { useLang } from '../context/LanguageContext.jsx'

export default function TermsOfUse() {
  const { lang, t } = useLang()
  const isTA = lang === 'TA'
  const sections = isTA ? [
    { title: '1. ஏற்பு', body: 'இந்த தளத்தை பயன்படுத்துவதன் மூலம், இந்த விதிமுறைகளை ஏற்கிறீர்கள். ஏற்கவில்லை என்றால் தளத்தை பயன்படுத்த வேண்டாம்.' },
    { title: '2. அனுமதிக்கப்படாத பயன்பாடு', body: 'உள்ளடக்கத்தை முன் அனுமதியின்றி மீண்டும் வெளியிட வேண்டாம். தவறான தகவல்களை பரப்பவோ தளத்தை தவறாக பயன்படுத்தவோ வேண்டாம்.' },
    { title: '3. அறிவுசார் சொத்துரிமை', body: 'கட்டுரைகள், படங்கள், லோகோக்கள் உட்பட அனைத்து உள்ளடக்கமும் கன்னியாகுமரி டுடேக்கு சொந்தமானது.' },
    { title: '4. மூன்றாம் தரப்பு இணைப்புகள்', body: 'வெளி இணைப்புகளுக்கான உள்ளடக்கத்திற்கு நாங்கள் பொறுப்பேற்க மாட்டோம்.' },
    { title: '5. மாற்றங்கள்', body: 'இந்த விதிமுறைகளை எந்த நேரத்திலும் மாற்றுவதற்கான உரிமை எங்களுக்கு உள்ளது.' },
  ] : [
    { title: '1. Acceptance', body: 'By using this site, you agree to these Terms of Use. If you do not agree, please do not use the site.' },
    { title: '2. Prohibited Use', body: 'Do not republish content without permission. Do not spread misinformation or misuse the platform.' },
    { title: '3. Intellectual Property', body: 'All content including articles, images, and logos is owned by Kanyakumari Today.' },
    { title: '4. Third-Party Links', body: 'We are not responsible for content on external linked sites.' },
    { title: '5. Changes', body: 'We reserve the right to modify these Terms at any time.' },
  ]

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{t.termsTitle}</h1>
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

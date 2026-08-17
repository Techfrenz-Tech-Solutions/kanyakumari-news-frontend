import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'

const AD_PACKAGES = [
  { nameEN: 'Banner Ad (970×90)',  nameTA: 'பேனர் விளம்பரம் (970×90)',  placementEN: 'Homepage Top',           placementTA: 'முகப்பு மேல்',          price: '₹5,000/month' },
  { nameEN: 'Sidebar Ad (300×250)',nameTA: 'பக்கவாட்டு விளம்பரம்',      placementEN: 'All pages',               placementTA: 'அனைத்து பக்கங்கள்',     price: '₹3,000/month' },
  { nameEN: 'In-Article Ad',       nameTA: 'கட்டுரை உள் விளம்பரம்',     placementEN: 'Article pages',           placementTA: 'கட்டுரை பக்கங்கள்',    price: '₹2,500/month' },
  { nameEN: 'Sponsored Content',   nameTA: 'நிதியுதவி உள்ளடக்கம்',      placementEN: 'Homepage + Category',     placementTA: 'முகப்பு + பிரிவு',      price: '₹8,000/month' },
]

export default function AboutUs() {
  const { lang, t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const isTA = lang === 'TA'

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  const facts = isTA ? [
    { label: 'நிறுவிய ஆண்டு',    value: '2020' },
    { label: 'தலைமையகம்',        value: 'நாகர்கோவில், கன்னியாகுமரி' },
    { label: 'மொழி',             value: 'தமிழ் & ஆங்கிலம்' },
    { label: 'மாத வாசகர்கள்',   value: '5 லட்சம்+' },
    { label: 'மாவட்ட பரப்பளவு', value: '4 தாலுகாக்கள்' },
  ] : [
    { label: 'Founded',           value: '2020' },
    { label: 'Headquarters',      value: 'Nagercoil, Kanyakumari' },
    { label: 'Language',          value: 'Tamil & English' },
    { label: 'Monthly Readers',   value: '5 Lakh+' },
    { label: 'District Coverage', value: 'All 4 Taluks' },
  ]

  const missionCards = isTA ? [
    { title: 'எங்கள் நோக்கம்',   body: 'கன்னியாகுமரியின் ஒவ்வொரு குடிமகனையும் சரியான நேரத்தில் துல்லியமான மற்றும் அர்த்தமுள்ள உள்ளூர் செய்திகளுடன் சக்திவாய்ப்படுத்துவது.' },
    { title: 'எங்கள் தரிசனம்',   body: 'கன்னியாகுமரி மாவட்டத்தில் மிகவும் நம்பகமான டிஜிட்டல் செய்தி ஆதாரமாக இருப்பது.' },
    { title: 'எங்கள் மதிப்புகள்', body: 'துல்லியம் · சுதந்திரம் · பொறுப்புணர்வு · சமூகம் — நாங்கள் வெளியிடும் ஒவ்வொரு கட்டுரையும் இந்த நான்கு தூண்களால் வழிநடத்தப்படுகின்றன.' },
  ] : [
    { title: 'Our Mission', body: 'Empower every citizen of Kanyakumari with timely, accurate, and meaningful local news.' },
    { title: 'Our Vision',  body: 'To be the most trusted digital news source in Kanyakumari district.' },
    { title: 'Our Values',  body: 'Accuracy · Independence · Accountability · Community — guiding every story we publish.' },
  ]

  return (
    <div className="container-page py-12 max-w-5xl">

      {/* ── About section ── */}
      <section className="mb-12">
        <h1 className="section-title mb-2">{t.aboutTitle}</h1>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-ink-soft leading-relaxed">
            <p className="text-base text-ink font-medium">
              {isTA
                ? 'கன்னியாகுமரி டுடே மாவட்டத்தின் முன்னணி சுதந்திர டிஜிட்டல் செய்தி போர்டல் — கன்னியாகுமரி மாவட்டம் முழுவதும் உள்ள வாசகர்களுக்கு விரைவான, துல்லியமான மற்றும் நேர்மையான உள்ளூர் செய்திகளை வழங்குகிறது.'
                : 'Kanyakumari Today is the district\'s leading independent digital news portal — delivering fast, accurate, and fair local news to readers across Kanyakumari district and beyond.'
              }
            </p>
            <p>
              {isTA
                ? 'நாகர்கோவில், கொளச்சேல், மார்த்தாண்டம், குழித்துறை மற்றும் அதற்கு அப்பால் உள்ள குடிமக்களுக்கு முக்கியமான அனைத்தையும் நாங்கள் உள்ளடக்குகிறோம்.'
                : 'We cover everything that matters to the people of Kanyakumari — local politics, civic news, and beyond.'
              }
            </p>
          </div>
          <div className="space-y-4">
            {facts.map((item) => (
              <div key={item.label} className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-sm font-semibold text-ink">{item.label}</span>
                <span className="text-sm text-ink-soft">{item.value}</span>
              </div>
            ))}
          </div>
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

      {/* ── Contact form ── */}
      <section className="mb-12">
        <h2 className="section-title mb-2">{t.contactTitle}</h2>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <p className="text-ink-soft text-sm leading-relaxed">
              {isTA
                ? 'செய்தி குறிப்பு, கட்டுரை யோசனை, திருத்தம் அல்லது கூட்டாண்மை முன்மொழிவு உள்ளதா? படிவம் மூலம் அல்லது நேரடியாக கீழே உள்ள விவரங்கள் மூலம் எங்களை தொடர்பு கொள்ளுங்கள்.'
                : 'Have a news tip, story idea, correction, or partnership proposal? Reach us through the form or directly via the details below.'
              }
            </p>
            {[
              { Icon: FiMail,   label: isTA ? 'மின்னஞ்சல்' : 'Email',   value: 'contact@kanyakumaritoday.com' },
              { Icon: FiPhone,  label: isTA ? 'தொலைபேசி' : 'Phone',    value: '04652-232100'                  },
              { Icon: FiMapPin, label: isTA ? 'முகவரி' : 'Address',     value: 'No. 5, Main Road, Nagercoil – 629 001' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="eyebrow mb-0.5">{label}</p>
                  <p className="text-sm text-ink">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-3">
              <span className="text-5xl">✅</span>
              <h3 className="text-xl font-bold text-ink">{t.messageSent}</h3>
              <p className="text-sm text-ink-soft">{t.messageSentDesc}</p>
              <button onClick={() => setSent(false)} className="btn-primary mt-4 text-sm">{t.sendAnother}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name',    label: t.yourName,     type: 'text',  placeholder: isTA ? 'ராஜேஷ் குமார்' : 'Rajesh Kumar' },
                { name: 'email',   label: t.emailAddress, type: 'email', placeholder: 'you@example.com' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block eyebrow mb-1">{label}</label>
                  <input type={type} required placeholder={placeholder} value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    className="w-full bg-transparent border border-black/15 rounded-sm px-4 py-2 text-sm focus:border-primary outline-none" />
                </div>
              ))}
              <div>
                <label className="block eyebrow mb-1">{t.message}</label>
                <textarea required rows={5} placeholder={t.writeMessage} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border border-black/15 rounded-sm px-4 py-2 text-sm focus:border-primary outline-none resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">{t.submitBtn}</button>
            </form>
          )}
        </div>
      </section>

      {/* ── Advertise section ── */}
      <section className="mb-12">
        <h2 className="section-title mb-2">{t.advertiseTitle}</h2>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <p className="text-sm text-ink-soft mb-5 max-w-xl">
          {isTA
            ? 'கன்னியாகுமரி மாவட்டம் முழுவதும் 5 லட்சத்திற்கும் மேற்பட்ட மாத வாசகர்களை அடையுங்கள்.'
            : 'Reach over 5 lakh monthly readers across Kanyakumari district.'
          }
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {AD_PACKAGES.map((pkg) => (
            <div key={pkg.nameEN} className="card-surface p-4 border-t-4 border-primary">
              <p className="font-bold text-sm text-ink mb-1">{isTA ? pkg.nameTA : pkg.nameEN}</p>
              <p className="text-xs text-ink-soft mb-3">{isTA ? pkg.placementTA : pkg.placementEN}</p>
              <p className="text-primary font-bold">{pkg.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social / Map ── */}
      <section>
        <h2 className="section-title mb-2">{t.followUs}</h2>
        <span className="h-1 w-16 bg-primary block mb-6" />
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { Icon: FiFacebook,  label: 'Facebook',  href: '#', colour: 'text-[#1877F2]'  },
            { Icon: FiTwitter,   label: 'Twitter/X', href: '#', colour: 'text-black'       },
            { Icon: FiInstagram, label: 'Instagram', href: '#', colour: 'text-[#E1306C]'  },
            { Icon: FiYoutube,   label: 'YouTube',   href: '#', colour: 'text-[#FF0000]'  },
          ].map(({ Icon, label, href, colour }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full border border-black/15 hover:border-primary transition-colors ${colour}`}>
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
        </div>
        <div className="w-full h-56 bg-black/5 rounded-md flex items-center justify-center border border-black/10">
          <p className="text-ink-soft text-sm font-mono">📍 {isTA ? 'நாகர்கோவில், கன்னியாகுமரி மாவட்டம்' : 'Nagercoil, Kanyakumari District'}</p>
        </div>
      </section>
    </div>
  )
}

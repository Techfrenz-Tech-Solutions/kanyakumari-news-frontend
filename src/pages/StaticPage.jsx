import { useLang } from '../context/LanguageContext.jsx'

export default function StaticPage({ title, children }) {
  const { lang } = useLang()
  const isTA = lang === 'TA'

  // Tamil translations for known static page titles
  const titleMap = {
    'RSS Feed':      isTA ? 'RSS ஊட்டம்'         : 'RSS Feed',
    'Useful Links':  isTA ? 'பயனுள்ள இணைப்புகள்' : 'Useful Links',
  }

  const displayTitle = titleMap[title] || title

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{displayTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-8" />
      {children ? (
        <div className="text-ink-soft leading-relaxed">{children}</div>
      ) : (
        <p className="text-ink-soft">
          {isTA
            ? 'இந்த பக்கம் விரைவில் கிடைக்கும்.'
            : 'This page is coming soon.'
          }
        </p>
      )}
    </div>
  )
}

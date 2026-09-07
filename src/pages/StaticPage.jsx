import { useLang } from '../context/LanguageContext.jsx'

export default function StaticPage({ title, children }) {
  const { t } = useLang()

  const titleMap = {
    'RSS Feed':     t.rssFeed,
    'Useful Links': t.usefulLinks,
  }

  const displayTitle = titleMap[title] || title

  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="section-title mb-2">{displayTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-8" />
      {children ? (
        <div className="text-ink-soft leading-relaxed">{children}</div>
      ) : (
        <p className="text-ink-soft">{t.comingSoon}</p>
      )}
    </div>
  )
}

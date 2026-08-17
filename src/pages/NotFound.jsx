import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="container-page py-24 text-center">
      <p className="font-display text-8xl font-black text-primary/20">404</p>
      <h1 className="font-display text-3xl font-bold mt-2 mb-3">{t.notFoundTitle}</h1>
      <p className="text-ink-soft dark:text-white/60 mb-6">{t.notFoundDesc}</p>
      <Link to="/" className="btn-primary inline-block">{t.goHome}</Link>
    </div>
  )
}

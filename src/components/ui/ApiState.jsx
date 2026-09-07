import { useLang } from '../../context/LanguageContext.jsx'

export function ApiErrorState({ error, compact = false }) {
  const { t } = useLang()
  if (!error || error.code === 'REQUEST_CANCELLED') return null
  return (
    <div role="alert" className={`rounded border border-red-200 bg-red-50 text-red-700 ${compact ? 'p-3 text-xs' : 'p-5 text-sm'}`}>
      {error.message || t.contentUnavailable}
    </div>
  )
}

export function EmptyState({ children }) {
  const { t } = useLang()
  return <p className="py-8 text-center text-sm text-ink-soft">{children ?? t.noContentYet}</p>
}

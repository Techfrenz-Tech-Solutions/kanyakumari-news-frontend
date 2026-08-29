export function ApiErrorState({ error, compact = false }) {
  if (!error || error.code === 'REQUEST_CANCELLED') return null
  return (
    <div role="alert" className={`rounded border border-red-200 bg-red-50 text-red-700 ${compact ? 'p-3 text-xs' : 'p-5 text-sm'}`}>
      {error.message || 'Content is temporarily unavailable.'}
    </div>
  )
}

export function EmptyState({ children = 'No content is available yet.' }) {
  return <p className="py-8 text-center text-sm text-ink-soft">{children}</p>
}

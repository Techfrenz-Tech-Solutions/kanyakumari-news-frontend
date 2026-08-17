const VARIANTS = {
  breaking: 'bg-primary text-white',
  trending: 'bg-accent text-ink',
  premium: 'bg-secondary text-white',
  live: 'bg-primary text-white'
}

export default function Badge({ variant = 'trending', children, pulse = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm ${VARIANTS[variant] || VARIANTS.trending}`}
    >
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />}
      {children}
    </span>
  )
}

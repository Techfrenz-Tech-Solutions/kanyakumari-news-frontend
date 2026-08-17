export function CardSkeleton() {
  return (
    <div className="card-surface overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-black/10 dark:bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 bg-black/10 dark:bg-white/10 rounded" />
        <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
        <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
      </div>
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-20 h-16 bg-black/10 dark:bg-white/10 rounded-sm shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-full bg-black/10 dark:bg-white/10 rounded" />
        <div className="h-3 w-3/4 bg-black/10 dark:bg-white/10 rounded" />
      </div>
    </div>
  )
}

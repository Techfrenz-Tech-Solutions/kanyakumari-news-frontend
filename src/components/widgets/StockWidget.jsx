import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line } from 'recharts'
import newsService from '../../services/newsService.js'

const LABELS = { sensex: 'SENSEX', nifty: 'NIFTY 50', nasdaq: 'NASDAQ', dow: 'DOW JONES' }

export default function StockWidget() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    newsService.getStockData().then((d) => active && setData(d))
      .catch((requestError) => { if (active) setError(requestError) })
      .finally(() => { if (active) setLoading(false) })
    return () => {
      active = false
    }
  }, [])

  if (loading) return <div className="card-surface p-4 h-56 animate-pulse" />
  if (error || !data || data.available === false) return (
    <div className="card-surface p-4" role="status">
      <h3 className="font-display text-lg font-bold">Markets</h3>
      <p className="mt-2 text-sm text-ink-soft">Market data is currently unavailable.</p>
    </div>
  )

  return (
    <div className="card-surface p-4">
      <h3 className="font-display text-lg font-bold mb-3">Markets</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, v]) => {
          const positive = v.change >= 0
          const spark = v.spark.map((val, i) => ({ i, val }))
          return (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-ink-soft dark:text-white/50">{LABELS[key]}</p>
                <p className="font-mono text-sm font-bold">{v.value.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-16 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spark}>
                    <Line
                      type="monotone"
                      dataKey="val"
                      stroke={positive ? '#16a34a' : '#C8102E'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <span className={`font-mono text-xs font-semibold w-16 text-right ${positive ? 'text-green-600' : 'text-primary'}`}>
                {positive ? '+' : ''}
                {v.changePct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

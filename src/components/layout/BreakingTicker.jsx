import { useEffect, useState, useRef } from 'react'
import newsService from '../../services/newsService.js'
import { useLang } from '../../context/LanguageContext.jsx'
import { Link } from 'react-router-dom'

export default function BreakingTicker() {
  const { t } = useLang()
  const [headlines, setHeadlines] = useState([])
  const copyRef = useRef(null)
  const [copyWidth, setCopyWidth] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    newsService.getBreakingHeadlines({ signal: controller.signal }).then(setHeadlines).catch(() => {})
    return () => controller.abort()
  }, [])

  // Measure the first copy width after headlines load
  useEffect(() => {
    if (copyRef.current) {
      setCopyWidth(copyRef.current.scrollWidth)
    }
  }, [headlines])

  if (headlines.length === 0) return null

  const Items = () => (
    <>
      {headlines.map((h, i) => (
        <span key={`${h.id}-${i}`} className="inline-flex items-center shrink-0">
          <span className="mx-6 text-[11px] select-none" style={{ color: '#FFD700' }}>◆</span>
          {h.slug ? (
            <Link
              to={`/article/${h.slug}`}
              className="text-sm sm:text-base font-semibold text-white/90 hover:text-white transition-colors whitespace-nowrap"
            >
              {h.title}
            </Link>
          ) : (
            <span className="text-sm sm:text-base font-medium text-white/85 whitespace-nowrap">
              {h.title}
            </span>
          )}
        </span>
      ))}
    </>
  )

  return (
    <div
      className="flex items-center h-12 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #105ac8ff 0%, #341f91ff 50%, #1b2285ff 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* BREAKING label — fixed */}
      <div
        className="shrink-0 flex items-center gap-2 px-4 h-full border-r border-white/20"
        style={{ background: '#B8000A', zIndex: 1 }}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="text-white font-black text-[13px] tracking-[0.18em] uppercase whitespace-nowrap">
          {t.breaking}
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden">
        {/* Outer moves the whole strip; inner holds two identical copies */}
        <div
          className="flex whitespace-nowrap items-center h-12"
          style={{
            animation: copyWidth ? `ticker-loop ${copyWidth / 40}s linear infinite` : 'none',
          }}
        >
          {/* First copy — we measure this */}
          <span ref={copyRef} className="inline-flex items-center">
            <Items />
          </span>
          {/* Second copy — seamless continuation */}
          <span className="inline-flex items-center">
            <Items />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes ticker-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${copyWidth}px); }
        }
      `}</style>
    </div>
  )
}

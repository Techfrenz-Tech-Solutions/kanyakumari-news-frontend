import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { PublicContentProvider } from './context/PublicContentContext.jsx'
import './index.css'

// ── Auto-refresh every 5 minutes when tab is visible and user is idle ──
const REFRESH_INTERVAL = 5 * 60 * 1000   // 5 minutes
const IDLE_THRESHOLD   = 2 * 60 * 1000   // user must be idle 2+ minutes

let lastActivity = Date.now()
;['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach((evt) => {
  window.addEventListener(evt, () => { lastActivity = Date.now() }, { passive: true })
})

setInterval(() => {
  const isVisible = document.visibilityState === 'visible'
  const isIdle    = Date.now() - lastActivity > IDLE_THRESHOLD
  if (isVisible && isIdle) {
    window.location.reload()
  }
}, REFRESH_INTERVAL)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <PublicContentProvider>
            <App />
          </PublicContentProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import newsService from '../services/newsService.js'

const PublicContentContext = createContext(null)

export function PublicContentProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    Promise.allSettled([
      newsService.getCategories({ signal: controller.signal }),
      newsService.getKanyakumariAreas({ signal: controller.signal }),
      newsService.getSiteSettings({ signal: controller.signal }),
    ]).then(([categoryResult, areaResult, siteResult]) => {
      if (controller.signal.aborted) return
      const nextErrors = {}
      if (categoryResult.status === 'fulfilled') setCategories(categoryResult.value)
      else nextErrors.categories = categoryResult.reason
      if (areaResult.status === 'fulfilled') setAreas(areaResult.value)
      else nextErrors.areas = areaResult.reason
      if (siteResult.status === 'fulfilled') setSite(siteResult.value)
      else nextErrors.site = siteResult.reason
      setErrors(nextErrors)
      setLoading(false)
    })
    return () => controller.abort()
  }, [])

  const value = useMemo(() => ({ categories, areas, site, loading, errors }), [categories, areas, site, loading, errors])
  return <PublicContentContext.Provider value={value}>{children}</PublicContentContext.Provider>
}

export function usePublicContent() {
  const value = useContext(PublicContentContext)
  if (!value) throw new Error('usePublicContent must be used inside PublicContentProvider')
  return value
}

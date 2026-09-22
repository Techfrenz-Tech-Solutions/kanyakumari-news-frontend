import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('language toggle is available outside the desktop-only top bar', () => {
  const header = readFileSync(new URL('../src/components/layout/Header.jsx', import.meta.url), 'utf8')
  assert.match(header, /const \{ lang, toggleLang, t \} = useLang\(\)/)
  assert.match(header, /onClick=\{toggleLang\}/)
  assert.match(header, /md:hidden/)
})

test('language provider syncs document language from current state', () => {
  const provider = readFileSync(new URL('../src/context/LanguageContext.jsx', import.meta.url), 'utf8')
  assert.match(provider, /useEffect\(\(\) => \{/)
  assert.match(provider, /document\.documentElement\.setAttribute\('lang', lang === 'TA' \? 'ta' : 'en'\)/)
  assert.match(provider, /\}, \[lang\]\)/)
})

test('category refetch clears stale errors before loading subcategory articles', () => {
  const categoryPage = readFileSync(new URL('../src/pages/Category.jsx', import.meta.url), 'utf8')
  assert.match(categoryPage, /setLoading\(true\)\s+setError\(null\)\s+const controller = new AbortController\(\)/)
  assert.match(categoryPage, /setLoadingMore\(true\)\s+setError\(null\)/)
})

export async function shareContent({ title, text, url }, browser = globalThis.navigator) {
  if (typeof browser?.share === 'function') {
    await browser.share({ title, text, url })
    return 'shared'
  }
  if (typeof browser?.clipboard?.writeText === 'function') {
    await browser.clipboard.writeText(url)
    return 'copied'
  }
  return 'unavailable'
}
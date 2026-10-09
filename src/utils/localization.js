const CATEGORY_TA_BY_SLUG = {
  kanyakumari: 'கன்னியாகுமரி',
  'tamil-nadu': 'தமிழ்நாடு',
  tamilnadu: 'தமிழ்நாடு',
  india: 'இந்தியா',
  national: 'தேசிய',
  world: 'உலகம்',
  politics: 'அரசியல்',
  business: 'வணிகம்',
  sports: 'விளையாட்டு',
  cinema: 'சினிமா',
  technology: 'தொழில்நுட்பம்',
  education: 'கல்வி',
  lifestyle: 'வாழ்க்கை முறை',
  health: 'ஆரோக்கியம்',
  jobs: 'வேலைவாய்ப்பு',
  general: 'பொது',
  local: 'உள்ளூர்',
  crime: 'குற்றம்',
  agriculture: 'விவசாயம்',
  tourism: 'சுற்றுலா',
  weather: 'வானிலை',
  videos: 'வீடியோக்கள்',
  gallery: 'படத் தொகுப்பு',
  'district-news': 'மாவட்ட செய்திகள்',
  nagercoil: 'நாகர்கோவில்',
  marthandam: 'மார்த்தாண்டம்',
  marthadam: 'மார்த்தாண்டம்',
  thuckalay: 'தக்கலை',
  kulasekaram: 'குலசேகரம்',
  colachel: 'குளச்சல்',
}

const WORD_TA = {
  kanyakumari: 'கன்னியாகுமரி',
  kumari: 'குமரி',
  tamil: 'தமிழ்',
  nadu: 'நாடு',
  india: 'இந்தியா',
  national: 'தேசிய',
  world: 'உலகம்',
  politics: 'அரசியல்',
  political: 'அரசியல்',
  business: 'வணிகம்',
  sports: 'விளையாட்டு',
  sport: 'விளையாட்டு',
  cinema: 'சினிமா',
  technology: 'தொழில்நுட்பம்',
  tech: 'தொழில்நுட்பம்',
  education: 'கல்வி',
  lifestyle: 'வாழ்க்கை முறை',
  health: 'ஆரோக்கியம்',
  job: 'வேலை',
  jobs: 'வேலைவாய்ப்பு',
  general: 'பொது',
  local: 'உள்ளூர்',
  district: 'மாவட்ட',
  news: 'செய்திகள்',
  crime: 'குற்றம்',
  agriculture: 'விவசாயம்',
  tourism: 'சுற்றுலா',
  tourist: 'சுற்றுலா',
  weather: 'வானிலை',
  video: 'வீடியோ',
  videos: 'வீடியோக்கள்',
  gallery: 'படத் தொகுப்பு',
  photo: 'படம்',
  photos: 'படங்கள்',
  nagercoil: 'நாகர்கோவில்',
  marthandam: 'மார்த்தாண்டம்',
  marthadam: 'மார்த்தாண்டம்',
  thuckalay: 'தக்கலை',
  kulasekaram: 'குலசேகரம்',
  colachel: 'குளச்சல்',
}

const normalizeKey = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export function localizedTaxonomyLabel(item, lang) {
  const label = item?.label || item?.name || ''
  if (lang !== 'TA') return label

  const explicit = item?.labelTA || item?.labelTa || item?.nameTA || item?.nameTa || item?.tamilName
  if (explicit) return explicit

  const slugKey = normalizeKey(item?.slug)
  if (CATEGORY_TA_BY_SLUG[slugKey]) return CATEGORY_TA_BY_SLUG[slugKey]

  const labelKey = normalizeKey(label)
  if (CATEGORY_TA_BY_SLUG[labelKey]) return CATEGORY_TA_BY_SLUG[labelKey]

  const words = labelKey.split('-').filter(Boolean)
  if (words.length && words.every((word) => WORD_TA[word])) {
    return words.map((word) => WORD_TA[word]).join(' ')
  }

  return label
}

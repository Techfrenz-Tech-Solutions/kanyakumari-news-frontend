// ─────────────────────────────────────────────────────────────────────────────
// adsData.js — Dummy advertisement data for Kanyakumari Today
// In production replace these with real ad server responses (Google AdSense,
// DFP, or a custom ad management API).
// ─────────────────────────────────────────────────────────────────────────────

// picsum IDs for ad images — bright, product/business looking photos
const adImg = (id, w, h) => `https://picsum.photos/id/${id}/${w}/${h}`

// ── Leaderboard ads — 970×90 (wide banner) ────────────────────────────────
export const leaderboardAds = [
  {
    id: 'lb1',
    brand: 'Nagercoil Silk House',
    tagline: 'Premium Silk Sarees — Up to 40% Off This Season',
    bg: 'from-rose-600 to-rose-800',
    text: 'text-white',
    badge: 'SALE',
    badgeBg: 'bg-yellow-400 text-yellow-900',
    link: '#',
    image: adImg(26, 120, 70),
  },
  {
    id: 'lb2',
    brand: 'Kanyakumari Tourism',
    tagline: 'Explore the Tip of India — Book Your Tour Package Today',
    bg: 'from-sky-600 to-blue-800',
    text: 'text-white',
    badge: 'NEW',
    badgeBg: 'bg-green-400 text-green-900',
    link: '#',
    image: adImg(15, 120, 70),
  },
  {
    id: 'lb3',
    brand: 'SBI Nagercoil Branch',
    tagline: 'Home Loans Starting at 8.4% p.a. — Apply Now',
    bg: 'from-blue-700 to-indigo-900',
    text: 'text-white',
    badge: 'OFFER',
    badgeBg: 'bg-orange-400 text-white',
    link: '#',
    image: adImg(65, 120, 70),
  },
  {
    id: 'lb4',
    brand: 'Marthandam Medical Centre',
    tagline: 'Free Health Check-up Camp — Every Sunday 9AM to 1PM',
    bg: 'from-teal-600 to-cyan-800',
    text: 'text-white',
    badge: 'FREE',
    badgeBg: 'bg-white text-teal-700',
    link: '#',
    image: adImg(57, 120, 70),
  },
  {
    id: 'lb5',
    brand: 'Colachel Fish Market',
    tagline: 'Fresh Catch Daily — Order Online, Delivered to Your Door',
    bg: 'from-emerald-600 to-green-800',
    text: 'text-white',
    badge: 'FRESH',
    badgeBg: 'bg-lime-300 text-green-900',
    link: '#',
    image: adImg(429, 120, 70),
  },
]

// ── Rectangle ads — 300×250 (sidebar) ─────────────────────────────────────
export const rectangleAds = [
  {
    id: 'r1',
    brand: 'Nagercoil Jewellers',
    tagline: 'Gold & Diamond Jewellery',
    sub: 'BIS Hallmarked | 0% Making Charge',
    bg: 'from-yellow-500 to-amber-700',
    text: 'text-white',
    link: '#',
    image: adImg(169, 300, 180),
  },
  {
    id: 'r2',
    brand: 'Kanyakumari Resorts',
    tagline: 'Stay with a Sea View',
    sub: 'Weekend Packages Starting ₹1,999',
    bg: 'from-sky-500 to-blue-700',
    text: 'text-white',
    link: '#',
    image: adImg(15, 300, 180),
  },
  {
    id: 'r3',
    brand: 'KK Driving School',
    tagline: 'Learn to Drive in 10 Days',
    sub: 'LMV & HMV Licences | Nagercoil',
    bg: 'from-orange-500 to-red-700',
    text: 'text-white',
    link: '#',
    image: adImg(111, 300, 180),
  },
  {
    id: 'r4',
    brand: 'TNPSC Coaching Centre',
    tagline: 'Crack TNPSC in 60 Days',
    sub: 'Free Demo Class | Marthandam',
    bg: 'from-purple-600 to-indigo-800',
    text: 'text-white',
    link: '#',
    image: adImg(55, 300, 180),
  },
]

// ── Inline / full-width ads ────────────────────────────────────────────────
export const inlineAds = [
  {
    id: 'il1',
    brand: 'District Employment Office',
    tagline: 'Job Fair 2026 — 500+ Vacancies | 25 August | Town Hall, Nagercoil',
    bg: 'from-green-700 to-teal-800',
    text: 'text-white',
    badge: 'GOVT',
    link: '#',
    image: adImg(94, 200, 80),
  },
  {
    id: 'il2',
    brand: 'Kumari Hospital',
    tagline: 'Advanced Cancer Screening Camp — Free Registration | 20–22 August',
    bg: 'from-red-600 to-rose-800',
    text: 'text-white',
    badge: 'HEALTH',
    link: '#',
    image: adImg(57, 200, 80),
  },
  {
    id: 'il3',
    brand: 'Kanyakumari Today — Advertise With Us',
    tagline: 'Reach 5 Lakh Monthly Readers Across Kanyakumari District',
    bg: 'from-ink to-gray-900',
    text: 'text-white',
    badge: 'MEDIA',
    link: '/advertise',
    image: adImg(96, 200, 80),
  },
]

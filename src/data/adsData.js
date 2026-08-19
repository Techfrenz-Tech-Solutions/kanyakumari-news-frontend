// ─────────────────────────────────────────────────────────────────────────────
// adsData.js — Advertisement slot configuration
// Replace these placeholder slots with real ad content from your ad server
// (Google AdSense, DFP/GAM, or a custom ad management system).
// ─────────────────────────────────────────────────────────────────────────────

const ADVERTISE_LINK = '/advertise'

// ── Leaderboard ads — 970×90 ──────────────────────────────────────────────
export const leaderboardAds = [
  {
    id: 'lb1',
    brand: 'Kanyakumari Today',
    tagline: 'Advertise Here — Reach 5 Lakh+ Monthly Readers',
    bg: 'from-primary to-primary-dark',
    text: 'text-white',
    badge: 'AD',
    badgeBg: 'bg-white/20 text-white',
    link: ADVERTISE_LINK,
    image: '',
  },
  {
    id: 'lb2',
    brand: 'Your Business Here',
    tagline: 'Premium Ad Space — Contact ads@kanyakumaritoday.com',
    bg: 'from-secondary to-secondary-dark',
    text: 'text-white',
    badge: 'AD',
    badgeBg: 'bg-white/20 text-white',
    link: ADVERTISE_LINK,
    image: '',
  },
  {
    id: 'lb3',
    brand: 'Advertise With Us',
    tagline: 'Leaderboard 970×90 — Best visibility for your brand',
    bg: 'from-green-700 to-emerald-800',
    text: 'text-white',
    badge: 'AD',
    badgeBg: 'bg-white/20 text-white',
    link: ADVERTISE_LINK,
    image: '',
  },
]

// ── Rectangle ads — 300×250 ───────────────────────────────────────────────
export const rectangleAds = [
  {
    id: 'r1',
    brand: 'Your Ad Here',
    tagline: 'Sidebar 300×250',
    sub: 'Contact ads@kanyakumaritoday.com',
    bg: 'from-primary to-primary-dark',
    text: 'text-white',
    link: ADVERTISE_LINK,
    image: '',
  },
  {
    id: 'r2',
    brand: 'Advertise Here',
    tagline: 'Reach Kanyakumari Readers',
    sub: '₹3,000/month — All pages',
    bg: 'from-secondary to-secondary-dark',
    text: 'text-white',
    link: ADVERTISE_LINK,
    image: '',
  },
  {
    id: 'r3',
    brand: 'Your Brand Here',
    tagline: 'Sidebar Advertisement',
    sub: 'ads@kanyakumaritoday.com',
    bg: 'from-amber-600 to-orange-700',
    text: 'text-white',
    link: ADVERTISE_LINK,
    image: '',
  },
]

// ── Inline / full-width ads ───────────────────────────────────────────────
export const inlineAds = [
  {
    id: 'il1',
    brand: 'Advertise With Kanyakumari Today',
    tagline: 'Reach 5 Lakh+ Monthly Readers — Email: ads@kanyakumaritoday.com',
    bg: 'from-ink to-gray-900',
    text: 'text-white',
    badge: 'AD',
    link: ADVERTISE_LINK,
    image: '',
  },
  {
    id: 'il2',
    brand: 'Your Business Here',
    tagline: 'Full-Width Banner — High visibility on every page',
    bg: 'from-primary to-primary-dark',
    text: 'text-white',
    badge: 'AD',
    link: ADVERTISE_LINK,
    image: '',
  },
  {
    id: 'il3',
    brand: 'Promote Your Brand',
    tagline: 'Inline Advertisement Slot — Contact us to get started',
    bg: 'from-secondary to-secondary-dark',
    text: 'text-white',
    badge: 'AD',
    link: ADVERTISE_LINK,
    image: '',
  },
]

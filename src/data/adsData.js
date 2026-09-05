// ─────────────────────────────────────────────────────────────────────────────
// adsData.js — Advertisement slots
// Replace images and content with real ad data from your ad server.
// ─────────────────────────────────────────────────────────────────────────────

const ADVERTISE_LINK = '/advertise'

// ── Leaderboard ads — exactly matching the dark-bg screenshot style ────────
export const leaderboardAds = [
  {
    id: 'lb1',
    brand: 'Nagercoil Silk House',
    tagline: 'Premium Silk Sarees — Up to 40% Off This Season',
    badge: 'SALE',
    badgeColor: '#e53935',   // red badge
    image: 'https://picsum.photos/id/26/80/80',
    link: ADVERTISE_LINK,
  },
  {
    id: 'lb2',
    brand: 'SBI Nagercoil Branch',
    tagline: 'Home Loans Starting at 8.4% p.a. — Apply Now',
    badge: 'OFFER',
    badgeColor: '#ff8f00',   // amber badge
    image: 'https://picsum.photos/id/65/80/80',
    link: ADVERTISE_LINK,
  },
  {
    id: 'lb3',
    brand: 'Kanyakumari Tourism Board',
    tagline: 'Explore the Tip of India — Book Your Tour Package Today',
    badge: 'NEW',
    badgeColor: '#2e7d32',   // green badge
    image: 'https://picsum.photos/id/15/80/80',
    link: ADVERTISE_LINK,
  },
  {
    id: 'lb4',
    brand: 'Marthandam Medical Centre',
    tagline: 'Free Health Check-up Camp — Every Sunday 9AM–1PM',
    badge: 'FREE',
    badgeColor: '#0d7377',   // teal badge
    image: 'https://picsum.photos/id/57/80/80',
    link: ADVERTISE_LINK,
  },
]

// ── Rectangle ads — 300×250 sidebar ──────────────────────────────────────
export const rectangleAds = [
  {
    id: 'r1',
    brand: 'Nagercoil Jewellers',
    tagline: 'Gold & Diamond Jewellery',
    sub: 'BIS Hallmarked | 0% Making Charge',
    badge: 'GOLD',
    badgeColor: '#c6a800',
    image: 'https://picsum.photos/id/169/300/180',
    link: ADVERTISE_LINK,
  },
  {
    id: 'r2',
    brand: 'Kanyakumari Resorts',
    tagline: 'Stay with a Sea View',
    sub: 'Weekend Packages Starting ₹1,999',
    badge: 'BOOK',
    badgeColor: '#0d7377',
    image: 'https://picsum.photos/id/15/300/180',
    link: ADVERTISE_LINK,
  },
  {
    id: 'r3',
    brand: 'TNPSC Coaching Centre',
    tagline: 'Crack TNPSC in 60 Days',
    sub: 'Free Demo Class | Marthandam',
    badge: 'ENROL',
    badgeColor: '#6a1b9a',
    image: 'https://picsum.photos/id/55/300/180',
    link: ADVERTISE_LINK,
  },
]

// ── Inline full-width ads ─────────────────────────────────────────────────
export const inlineAds = [
  {
    id: 'il1',
    brand: 'District Employment Office',
    tagline: 'Job Fair 2026 — 500+ Vacancies | 25 August | Town Hall, Nagercoil',
    badge: 'GOVT',
    badgeColor: '#2e7d32',
    image: 'https://picsum.photos/id/94/80/80',
    link: ADVERTISE_LINK,
  },
  {
    id: 'il2',
    brand: 'Advertise With Kanyakumari Today',
    tagline: 'Reach 5 Lakh+ Monthly Readers — Email: ads@kanyakumaritoday.com',
    badge: 'AD',
    badgeColor: '#0d7377',
    image: 'https://picsum.photos/id/96/80/80',
    link: ADVERTISE_LINK,
  },
  {
    id: 'il3',
    brand: 'Kumari Hospital',
    tagline: 'Advanced Cancer Screening Camp — Free Registration | 20–22 August',
    badge: 'HEALTH',
    badgeColor: '#c62828',
    image: 'https://picsum.photos/id/57/80/80',
    link: ADVERTISE_LINK,
  },
]

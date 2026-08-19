// ─────────────────────────────────────────────────────────────────────────────
// newsData.js
// All dummy articles, gallery items, and videos have been removed.
// Wire up a real CMS or REST API in newsService.js to populate the site.
// The structural data below (categories, district info, tourist spots, jobs,
// weather, stock rates) is real reference data for Kanyakumari district.
// ─────────────────────────────────────────────────────────────────────────────

// ── Categories ────────────────────────────────────────────────────────────
export const categories = [
  { slug: 'kanyakumari',   label: 'Kanyakumari'   },
  { slug: 'tamil-nadu',    label: 'Tamil Nadu'     },
  { slug: 'national',      label: 'National'       },
  { slug: 'world',         label: 'World'          },
  { slug: 'politics',      label: 'Politics'       },
  { slug: 'business',      label: 'Business'       },
  { slug: 'economy',       label: 'Economy'        },
  { slug: 'technology',    label: 'Technology'     },
  { slug: 'science',       label: 'Science'        },
  { slug: 'education',     label: 'Education'      },
  { slug: 'health',        label: 'Health'         },
  { slug: 'sports',        label: 'Sports'         },
  { slug: 'entertainment', label: 'Entertainment'  },
  { slug: 'cinema',        label: 'Cinema'         },
  { slug: 'lifestyle',     label: 'Lifestyle'      },
  { slug: 'travel',        label: 'Travel'         },
  { slug: 'automobile',    label: 'Automobile'     },
  { slug: 'agriculture',   label: 'Agriculture'    },
  { slug: 'crime',         label: 'Crime'          },
  { slug: 'editorial',     label: 'Editorial'      },
  { slug: 'jobs',          label: 'Jobs'           },
  { slug: 'astrology',     label: 'Astrology'      },
]

// ── Kanyakumari sub-areas ─────────────────────────────────────────────────
export const kanyakumariAreas = [
  { slug: 'nagercoil',   label: 'Nagercoil'   },
  { slug: 'colachel',    label: 'Colachel'    },
  { slug: 'kuzhithurai', label: 'Kuzhithurai' },
  { slug: 'marthandam',  label: 'Marthandam'  },
  { slug: 'vattakottai', label: 'Vattakottai' },
  { slug: 'munchirai',   label: 'Munchirai'   },
]

// ── District Information ──────────────────────────────────────────────────
export const districtInfo = {
  taluks: [
    { name: 'Agastheeswaram', headquarters: 'Nagercoil',  panchayats: 14 },
    { name: 'Kalkulam',       headquarters: 'Thuckalay',  panchayats: 11 },
    { name: 'Vilavancode',    headquarters: 'Villukuri',  panchayats: 10 },
    { name: 'Killiyoor',      headquarters: 'Killiyoor',  panchayats: 8  },
  ],
  govtOffices: [
    { name: 'District Collectorate',     address: 'Collectorate Complex, Nagercoil - 629 001', phone: '04652-232190' },
    { name: 'District Police Office',    address: 'SP Office, Nagercoil - 629 001',            phone: '04652-222100' },
    { name: 'District Hospital',         address: 'Hospital Road, Nagercoil - 629 001',        phone: '04652-223009' },
    { name: 'Regional Transport Office', address: 'RTO Complex, Nagercoil - 629 001',          phone: '04652-230011' },
    { name: 'Electricity Board (TNEB)',  address: 'TNEB Office, Nagercoil - 629 001',          phone: '04652-235678' },
  ],
  helplines: [
    { name: 'Police',                number: '100'          },
    { name: 'Fire Service',          number: '101'          },
    { name: 'Ambulance',             number: '108'          },
    { name: 'Women Helpline',        number: '181'          },
    { name: 'Child Helpline',        number: '1098'         },
    { name: 'Disaster Helpline',     number: '1077'         },
    { name: 'District Collectorate', number: '04652-232190' },
  ],
  transport: [
    { route: 'Nagercoil → Chennai',              type: 'Bus',   duration: '9 hrs',   operator: 'TNSTC'        },
    { route: 'Nagercoil → Madurai',              type: 'Bus',   duration: '4 hrs',   operator: 'TNSTC'        },
    { route: 'Kanyakumari → Thiruvananthapuram', type: 'Train', duration: '1.5 hrs', operator: 'Southern Rly' },
    { route: 'Nagercoil → Coimbatore',           type: 'Bus',   duration: '6 hrs',   operator: 'TNSTC'        },
  ],
}

// ── Tourist Attractions ───────────────────────────────────────────────────
export const touristAttractions = [
  {
    id: 1, name: 'Vivekananda Rock Memorial',
    description: 'A famous monument built on a small island off the coast where Swami Vivekananda meditated.',
    image: '', category: 'Monument',
    timings: '8:00 AM – 4:00 PM', entryFee: '₹30 (Adult)',
  },
  {
    id: 2, name: 'Thiruvalluvar Statue',
    description: 'A 133-feet stone statue of the Tamil poet-saint Thiruvalluvar on a small islet near Kanyakumari.',
    image: '', category: 'Monument',
    timings: '8:00 AM – 4:00 PM', entryFee: '₹30 (Adult)',
  },
  {
    id: 3, name: 'Sunrise / Sunset Point',
    description: 'The only place in India where you can witness both sunrise and sunset over the sea.',
    image: '', category: 'Nature',
    timings: 'Open all day', entryFee: 'Free',
  },
  {
    id: 4, name: 'Padmanabhapuram Palace',
    description: 'An ancient wooden palace near Thuckalay — one of the finest examples of Kerala architecture.',
    image: '', category: 'Heritage',
    timings: '9:00 AM – 5:00 PM (Closed Mondays)', entryFee: '₹35 (Adult)',
  },
  {
    id: 5, name: 'Kanyakumari Beach',
    description: 'The confluence of three seas — a pristine beach with multicoloured sand at the southernmost tip of India.',
    image: '', category: 'Beach',
    timings: 'Open all day', entryFee: 'Free',
  },
  {
    id: 6, name: 'Kumari Amman Temple',
    description: 'Ancient Hindu temple dedicated to the virgin goddess Kanya Devi at the tip of India.',
    image: '', category: 'Temple',
    timings: '4:30 AM – 12:00 PM, 4:00 PM – 8:00 PM', entryFee: 'Free',
  },
]

// ── Jobs ──────────────────────────────────────────────────────────────────
// Replace with real job listings from your CMS or Jobs API
export const jobListings = []

// ── News articles (fetched from CMS/API) ─────────────────────────────────
export const articles          = []
export const heroArticles      = []
export const breakingHeadlines = []
export const trending          = []

// ── Gallery (fetched from CMS/API) ───────────────────────────────────────
export const gallery = []

// ── Videos (fetched from CMS/API) ────────────────────────────────────────
export const videos = []

// ── Stock & Financial data ────────────────────────────────────────────────
// Update these values from a real financial data API
export const stockData = {
  sensex: { value: 0, change: 0, changePct: 0, spark: [] },
  nifty:  { value: 0, change: 0, changePct: 0, spark: [] },
  nasdaq: { value: 0, change: 0, changePct: 0, spark: [] },
  dow:    { value: 0, change: 0, changePct: 0, spark: [] },
}

// ── Weather ───────────────────────────────────────────────────────────────
// Update from a real weather API (e.g. OpenWeatherMap)
export const weather = {
  city: 'Kanyakumari', tempC: 30, condition: 'Partly Cloudy', humidity: 78, windKmh: 18,
  forecast: [
    { day: 'Tue', high: 31, low: 24, condition: 'Sunny'  },
    { day: 'Wed', high: 30, low: 24, condition: 'Cloudy' },
    { day: 'Thu', high: 28, low: 23, condition: 'Rain'   },
    { day: 'Fri', high: 29, low: 23, condition: 'Rain'   },
    { day: 'Sat', high: 31, low: 24, condition: 'Sunny'  },
  ],
}

// ── Commodity rates ───────────────────────────────────────────────────────
// Update from a real commodity/fuel price API
export const rates = {
  gold22k: 0, gold24k: 0, silverKg: 0, petrol: 0, diesel: 0,
}

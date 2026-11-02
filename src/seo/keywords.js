/**
 * SEO Keyword Library — Kanyakumari Today
 * -----------------------------------------------------------------------------
 * These are SEARCH TERMS and natural-language QUESTION phrases, used by the
 * metadata, sitemap, schema, AEO and GEO layers of this site.
 *
 * IMPORTANT (Master Rules):
 *  - This file contains KEYWORDS, not factual claims. An answer to any question
 *    below (timings, prices, phone numbers, distances, dates) MUST be taken from
 *    a verified real source before it is ever shown to a user or put in schema.
 *    Questions whose answers change frequently (weather, ferry timings,
 *    collector name, festival dates) are tagged with [live source] — do NOT
 *    hard-code an answer for these.
 *  - TODO markers flag items the site owner should verify or complete (town
 *    Tamil spellings, official social profile URLs).
 *  - RULE: use one primary keyword per page, naturally in title/H1/H2/intro/alt
 *    text/schema. Never repeat a keyword list verbatim on a page.
 *
 * Sources:
 *  - "data" = real Google Search Console queries (25 Sep – 24 Oct 2026,
 *    homepage only). Impression counts are from that window.
 *  - "suggested" = related keywords added by analysis (not yet measured).
 *
 * Exports:
 *   TIER1_DATA, SPELLING_VARIANTS, TAMIL_DATA, TAMIL_ENGLISH_DATA,
 *   LIVE_AND_LOCAL_DATA, BRAND, LOCATION, BUSINESS_DATA, PAGE_MAP,
 *   QUESTIONS, GEO_ENTITIES,
 *   BRAND_KEYWORDS, LOCAL_KEYWORDS, TOWN_KEYWORDS, TOWNS,
 *   TOURISM_KEYWORDS, TAMIL_NADU_KEYWORDS, INDIA_KEYWORDS,
 *   BUSINESS_KEYWORDS, CATEGORY_KEYWORDS, TAMIL_SCRIPT_KEYWORDS,
 *   ALL_KEYWORDS, META_KEYWORDS
 */

// ─────────────────────────────────────────────────────────────────────────────
// GSC DATA LAYER  (source: real Search Console, 25 Sep – 24 Oct 2026)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tier 1 — high impressions, ranking 8–10 → target top 3.
 * Each entry: { q: string, impr: number, pos: number }
 */
export const TIER1_DATA = [
  { q: 'kanyakumari news',                 impr: 120, pos: 8.4  },
  { q: 'kanyakumari news today',           impr: 111, pos: 8.2  },
  { q: 'kanyakumari today news',           impr: 60,  pos: 9.0  },
  { q: 'today kanyakumari news',           impr: 40,  pos: 10.0 },
  { q: 'kanyakumari today',                impr: 20,  pos: 2.6  },
  { q: 'today kanyakumari',                impr: 16,  pos: 3.1  },
  { q: 'today news kanyakumari',           impr: 14,  pos: 8.3  },
  { q: 'kanyakumari news today live',      impr: 13,  pos: 12.1 },
  { q: 'kanyakumari district news today',  impr: 11,  pos: 8.1  },
  { q: 'kanyakumari district news',        impr: 10,  pos: 8.5  },
  { q: 'kanyakumari local news',           impr: 8,   pos: 8.3  },
  { q: 'nagercoil news today',             impr: 8,   pos: 11.8 },
  { q: 'nagercoil news',                   impr: 7,   pos: 9.4  },
];

/**
 * Spelling variants — real user searches.
 * Use once, naturally (intro text, footer, or alt text). Never in a list.
 * DO NOT target: "hello kanyakumari news" (another outlet's name).
 */
export const SPELLING_VARIANTS = [
  'kanya kumari news',
  'kaniyakumari news',
  'kanniyakumari news',
  'kumari news today',
  'kumari news',
];

/** Tamil-script queries (real, low competition). */
export const TAMIL_DATA = [
  'கன்னியாகுமரி மாவட்ட செய்திகள்',
  'கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள்',
  'குமரி மாவட்ட செய்திகள்',
  'நாகர்கோவில் இன்றைய செய்திகள்',
  'கன்னியாகுமரி செய்திகள்',
];

/** Tamil–English hybrid queries (real). */
export const TAMIL_ENGLISH_DATA = [
  'kanyakumari news in tamil',
  'kanyakumari news today tamil',
  'today kanyakumari news in tamil',
];

/** Live + local intent queries (real + suggested). */
export const LIVE_AND_LOCAL_DATA = [
  'nagercoil news today live',
  'kanyakumari district today news live',
  'kanyakumari school news today live',
  'local news near me today',
  'kanyakumari news paper today',
  'kanyakumari latest news',
  'kanyakumari latest news today',
  'kanyakumari recent news',
];

/** Brand identity (data + suggested). */
export const BRAND = {
  name: 'Kanyakumari Today',
  alternateNames: ['KanyakumariToday', 'Kanyakumari Today News', 'Kumari Today'],
  domain: 'kanyakumaritoday.com',
  brandQueries: [
    'kanyakumari today',
    'kanyakumari today news',
    'kanyakumari today live',
    'kanyakumari today tamil',
    'kanyakumari today website',
  ],
  source: 'data + suggested',
};

/** Location taxonomy (source: suggested for towns, data for nagercoil). */
export const LOCATION = {
  district: ['kanyakumari district news', 'kumari district news', 'kanyakumari local news'],
  towns: ['nagercoil', 'marthandam', 'thuckalay', 'colachel', 'padmanabhapuram', 'kuzhithurai', 'thiruvattar', 'vilavancode'],
  /** Pattern: replace {town} with each town name. */
  townPattern: ['{town} news', '{town} news today', '{town} today news'],
  region: ['tamil nadu news kanyakumari', 'south tamil nadu news', 'india news kanyakumari'],
  nearby: ['tirunelveli news', 'trivandrum news today', 'thoothukudi news'],
};

/** Business/commercial intent keywords (suggested). */
export const BUSINESS_DATA = [
  'kanyakumari business news',
  'kanyakumari job vacancies',
  'kanyakumari classifieds',
  'kanyakumari local business directory',
  'kanyakumari advertise with us',
  'kanyakumari news advertising',
  'kanyakumari tourism news',
  'kanyakumari real estate news',
  'kanyakumari events today',
];

/**
 * Page-level keyword map — one primary keyword per page.
 * Support keywords are secondary; use naturally, never in a list.
 * NOTE: resolve the tamil-nadu / tamilnadu-news duplicate before targeting
 *   the Tamil Nadu category page (see open task in INDEXING_DIAGNOSIS.md).
 */
export const PAGE_MAP = [
  {
    page: '/',
    primary: 'kanyakumari news today',
    support: ['kanyakumari news', 'kanyakumari today news', 'kanyakumari district news', 'nagercoil news today'],
  },
  {
    page: '/category/tamilnadu-news',  // backend canonical slug (tamil-nadu 301s here)
    primary: 'tamil nadu news today',
    support: ['tamil nadu latest news', 'south tamil nadu news'],
  },
  {
    page: '/category/education',
    primary: 'kanyakumari education news',
    support: ['kanyakumari school news today', 'exam results news'],
  },
  {
    page: '/category/tourism',
    primary: 'kanyakumari tourism news',
    support: ['kanyakumari tourist places', 'vivekananda rock ferry timings'],
  },
  {
    page: '/category/cinema',
    primary: 'tamil cinema news',
    support: ['kanyakumari cinema news'],
  },
  {
    page: '/category/sports',
    primary: 'kanyakumari sports news',
    support: ['tamil nadu sports news'],
  },
  {
    // Town hub pages — needs owner approval before creating routes
    page: '/{town}',
    primary: '{town} news today',
    support: ['{town} today news', 'kanyakumari district news'],
  },
  {
    page: '/article/*',
    primary: 'article headline keyword',
    support: ['town name', 'topic'],
  },
];

/**
 * AEO questions — answer only with verified facts, 40–60 words per answer.
 * [live source] = answer changes; never hard-code it.
 */
export const AEO_QUESTIONS = [
  'What is the latest news in Kanyakumari today?',
  'Which website gives Kanyakumari district news today?',
  'What is the latest Nagercoil news today?',
  'Is there Kanyakumari news in Tamil?',
  'What is the weather in Kanyakumari today?',          // [live source]
  'Is there a school holiday in Kanyakumari today?',    // [live source]
  'Is there a power cut in Nagercoil today?',           // [live source]
  'What are the Vivekananda Rock ferry timings?',        // [live source]
  'What are the best tourist places in Kanyakumari?',
  'How can I advertise in Kanyakumari news?',
];

/** GEO entities — phrases AI tools should associate with the brand. */
export const GEO_ENTITIES = {
  brand: 'Kanyakumari Today',
  description: 'Local news website for Kanyakumari district and Nagercoil, Tamil Nadu, India, in English and Tamil',
  areaServed: ['Kanyakumari district', 'Nagercoil', 'Marthandam', 'Thuckalay', 'Colachel', 'Padmanabhapuram', 'Kuzhithurai'],
  topics: ['local news', 'Tamil Nadu news', 'education', 'tourism', 'cinema', 'sports'],
  citeAs: 'Kanyakumari Today (kanyakumaritoday.com)',
};

/* ------------------------------------------------------------------ Brand */
export const BRAND_KEYWORDS = [
  'kanyakumari today',
  'kanyakumari today news',
  'kanyakumari today tamil news',
  'kanyakumari today english news',
  'kanyakumaritoday',
  'kanyakumaritoday.com',
  'kanyakumari news today',
  'kanyakumari latest news',
  'kanyakumari breaking news',
  'kanyakumari news online',
  'kanyakumari live news',
  'kanyakumari epaper',
  'kanyakumari news portal',
];

/* ---------------------------------------------------- Local / district-level */
export const LOCAL_KEYWORDS = [
  'kanyakumari district news',
  'kanyakumari district',
  'kanyakumari',
  'kanyakumari news',
  'kanyakumari latest news',
  'kanyakumari today news',
  'kanyakumari breaking news',
  'kanyakumari news online',
  'kanyakumari live news',
  'kanyakumari local news',
  'kanyakumari district news today',
  'kanyakumari district latest news',
  'kanniyakumari news', // alternate spelling
  'kanniyakumari district',
  'south tamil nadu news',
  'southern tamil nadu news',
];

/* -------------------------------------------------------- Towns (structured)
 * Towns of Kanyakumari district with English + Tamil names and URL slugs.
 * `ta: null` + TODO means the Tamil spelling needs owner verification.
 * Geo coordinates are intentionally OMITTED here — they live in the config
 * and must be verified before use.
 */
export const TOWNS = [
  { en: 'Nagercoil', ta: 'நாகர்கோவில்', slug: 'nagercoil', priority: 0.8 },
  { en: 'Marthandam', ta: 'மார்த்தாண்டம்', slug: 'marthandam', priority: 0.8 },
  { en: 'Thuckalay', ta: 'தக்கலை', slug: 'thuckalay', priority: 0.7 },
  { en: 'Colachel', ta: 'கொச்சாள்', slug: 'colachel', priority: 0.7 },
  { en: 'Padmanabhapuram', ta: 'பத்மநாபபுரம்', slug: 'padmanabhapuram', priority: 0.7 },
  { en: 'Kuzhithurai', ta: 'குழித்துறை', slug: 'kuzhithurai', priority: 0.7 },
  { en: 'Kanyakumari', ta: 'கன்னியாகுமரி', slug: 'kanyakumari', priority: 0.8 },
  { en: 'Suchindram', ta: 'சுசீந்திரம்', slug: 'suchindram', priority: 0.6 },
  { en: 'Karungal', ta: 'கருங்கால்', slug: 'karungal', priority: 0.6 },
  { en: 'Kulasekaram', ta: 'குலசேகரம்', slug: 'kulasekaram', priority: 0.6 },
  { en: 'Mandaikadu', ta: 'மண்டைக்காடு', slug: 'mandaikadu', priority: 0.6 },
  { en: 'Eraniel', ta: 'எரணியல்', slug: 'eraniel', priority: 0.5 },
  { en: 'Thirparappu', ta: 'திருப்பரப்பு', slug: 'thirparappu', priority: 0.5 },
  { en: 'Muttom', ta: 'முட்டம்', slug: 'muttom', priority: 0.5 },
  { en: 'Thiruvattar', ta: 'திருவட்டாறு', slug: 'thiruvattar', priority: 0.5 },
  { en: 'Boothapandi', ta: 'பூதப்பாண்டி', slug: 'boothapandi', priority: 0.5 },
  { en: 'Rajakkamangalam', ta: 'ராஜக்கமங்கலம்', slug: 'rajakkamangalam', priority: 0.5 },
  { en: 'Aralvaimozhi', ta: 'ஆரல்வாய்மொழி', slug: 'aralvaimozhi', priority: 0.5 },
  { en: 'Villukuri', ta: null, slug: 'villukuri', priority: 0.4 }, // TODO verify Tamil
  { en: 'Killiyur', ta: null, slug: 'killiyur', priority: 0.4 }, // TODO verify Tamil
  { en: 'Kaliyakkavilai', ta: 'களியக்காவிளை', slug: 'kaliyakkavilai', priority: 0.4 },
  { en: 'Mathur', ta: 'மாத்தூர்', slug: 'mathur', priority: 0.4 },
  { en: 'Swamithoppu', ta: 'சுவாமித்தோப்பு', slug: 'swamithoppu', priority: 0.4 },
  { en: 'Mylaudy', ta: 'மயிலாடி', slug: 'mylaudy', priority: 0.4 },
  // TODO: owner to verify Tamil spellings marked null and add any missing towns.
];

/* Town keyword variants: "<town> news", "<town> news today", "<town> latest news" */
export const TOWN_KEYWORDS = TOWNS.flatMap((t) => [
  `${t.en} news`,
  `${t.en} news today`,
  `${t.en} latest news`,
  `${t.en} local news`,
]);

/* ------------------------------------------------------------- Tourism */
export const TOURISM_KEYWORDS = [
  'kanyakumari tourism',
  'kanyakumari tourist places',
  'places to visit in kanyakumari',
  'kanyakumari sightseeing',
  'vivekananda rock memorial',
  'thiruvalluvar statue',
  'kanyakumari beach',
  'kanyakumari sunrise',
  'kanyakumari sunset',
  'kanyakumari sunrise point',
  'padmanabhapuram palace',
  'suchindram temple',
  'thanumalayan temple',
  'thirparappu falls',
  'mathoor aqueduct',
  'mathoor hanging bridge',
  'udayagiri fort',
  'vattakottai fort',
  'muttom beach',
  'pechiparai dam',
  'chitharal jain monuments',
  'mandaikadu amman temple',
  'kumari amman temple',
  'gandhi memorial kanyakumari',
  'st xavier church kottar',
  'keeriparai',
  'kanyakumari ferry timings', // [live source]
  'vivekananda rock ferry', // [live source]
];

/* ----------------------------------------------------------- Tamil Nadu */
export const TAMIL_NADU_KEYWORDS = [
  'tamil nadu news',
  'tamil nadu latest news',
  'tamil nadu news today',
  'chennai news',
  'madurai news',
  'tirunelveli news',
  'coimbatore news',
  'tamil nadu government news',
  'tamil nadu politics news',
  'tn news',
  'tamil news',
  'tamil news today',
  'south india news',
];

/* ---------------------------------------------------------------- India */
export const INDIA_KEYWORDS = [
  'india news',
  'india news today',
  'national news',
  'world news',
  'india latest news',
  'breaking news india',
  'indian news online',
];

/* ------------------------------------------------------------ Business */
export const BUSINESS_KEYWORDS = [
  'kanyakumari business news',
  'nagercoil business',
  'nagercoil shops',
  'kanyakumari real estate',
  'nagercoil real estate',
  'jobs in nagercoil',
  'kanyakumari jobs',
  'employment news kanyakumari',
  'kanyakumari tenders',
  'nagercoil property',
  'kanyakumari classifieds',
];

/* ------------------------------------------------------ News categories */
export const CATEGORY_KEYWORDS = [
  'kanyakumari politics news',
  'kanyakumari crime news',
  'kanyakumari education news',
  'kanyakumari sports news',
  'kanyakumari agriculture news',
  'kanyakumari health news',
  'kanyakumari weather', // [live source]
  'kanyakumari entertainment news',
  'kanyakumari cinema news',
  'kanyakumari temple news',
  'kanyakumari festival news',
  'kanyakumari accident news',
  'kanyakumari government news',
  'kanyakumari civic news',
  'kanyakumari obituary',
];

/* ------------------------------------------------------ Tamil-script terms
 * Conservative set — only terms whose Tamil spelling is well established.
 * TODO: owner to extend with additional verified Tamil keywords.
 */
export const TAMIL_SCRIPT_KEYWORDS = [
  'கன்னியாகுமரி',
  'கன்னியாகுமரி செய்திகள்',
  'கன்னியாகுமரி இன்றைய செய்தி',
  'கன்னியாகுமரி மாவட்டம்',
  'நாகர்கோவில்',
  'நாகர்கோவில் செய்திகள்',
  'நாகர்கோவில் வானிலை',
  'மார்த்தாண்டம்',
  'தக்கலை',
  'குழித்துறை',
  'கொச்சாள்',
  'பத்மநாபபுரம்',
  'தமிழ்நாடு',
  'தமிழகம்',
  'இந்தியா',
  'விவேகானந்தர் பாறை',
  'திருவள்ளுவர் சிலை',
  'காலநிலை',
  'வானிலை',
  'வேலைவாய்ப்பு',
  'செய்தி',
  'செய்திகள்',
  'இன்றைய செய்தி',
  'அரசியல்',
  'விளையாட்டு',
  'கல்வி',
  'விவசாயம்',
  'சுற்றுலா',
  'கோயில்',
  'கன்னியாகுமரி வானிலை',
];

/* --------------------------------------------------------------- Questions (AEO)
 * Natural-language question phrases that match real search intent.
 * These are QUESTIONS only — answers must be sourced/verified before use.
 * [live source] = answer changes frequently; never hard-code it.
 * [needs source] = we do not yet have a verified answer; mark TODO.
 */
export const QUESTIONS = [
  'What is the latest news in Kanyakumari today?',
  'Kanyakumari weather today?', // [live source]
  'What is the temperature in Kanyakumari today?', // [live source]
  'Vivekananda Rock ferry timings?', // [live source]
  'How to reach Kanyakumari from Nagercoil?',
  'Kanyakumari to Trivandrum distance and travel options?',
  'Padmanabhapuram Palace timings and entry fee?', // [needs source]
  'Best time to visit Kanyakumari?',
  'Kanyakumari sunrise and sunset timing today?', // [live source]
  'Nagercoil to Kanyakumari bus timings?', // [live source]
  'How far is Kanyakumari from Nagercoil?',
  'Thirparappu Falls opening time and entry fee?', // [needs source]
  'What are the tourist places in Kanyakumari district?',
  'How to go to Vivekananda Rock Memorial?',
  'Kanyakumari to Rameswaram distance?', // [needs source]
  'Colleges in Kanyakumari district?', // [needs source]
  'Schools in Nagercoil?', // [needs source]
  'Kanyakumari district news today?',
  'Who is the Kanyakumari district collector?', // [live source]
  'Mandaikadu Amman temple festival dates?', // [live source]
  'Kanyakumari to Madurai train timings?', // [live source]
  'Nagercoil to Chennai train timings?', // [live source]
  'Pechiparai Dam visiting time?', // [needs source]
  'Mathoor Aqueduct location and how to reach?',
  'Kanyakumari beach sunrise time today?', // [live source]
];

/* ----------------------------------------------------- Extra local terms */
export const EXTRA_LOCAL_KEYWORDS = [
  'kanyakumari news in english',
  'kanyakumari news in tamil',
  'kanyakumari news this hour',
  'kanyakumari flash news',
  'kanyakumari district headlines',
  'kanyakumari news 24x7',
  'kanyakumari online news',
  'kanyakumari news update',
  'kanyakumari current news',
  'kanyakumari news now',
  'kanyakumari top news',
  'kanyakumari viral news',
  'kanyakumari district panchayat news',
  'kanyakumari municipality news',
];

/* ------------------------------------------------------- Neighborhoods */
export const NEIGHBORHOOD_KEYWORDS = [
  'nagercoil town news',
  'nagercoil junction news',
  'colachel port news',
  'marthandam town news',
  'thuckalay town news',
  'kuzhithurai town news',
  'nagercoil market news',
  'kottar news',
  'marthandam junction news',
  'karungal town news',
  'kulasekaram town news',
  'mandaikadu news',
  'eraniel news',
  'thirparappu news',
  'muttom news',
];

/* -------------------------------------------------------- Extra tourism */
export const EXTRA_TOURISM_KEYWORDS = [
  'kanyakumari travel guide',
  'things to do in kanyakumari',
  'kanyakumari tourist spots list',
  'kanyakumari tourism packages',
  'hotels in kanyakumari',
  'hotels in nagercoil',
  'resorts near kanyakumari',
  'kanyakumari tour package',
  'kanyakumari one day trip',
  'kanyakumari two days itinerary',
  'kanyakumari ferry tickets', // [live source]
  'vivekananda rock memorial timings', // [needs source]
];

/* -------------------------------------------------------- Extra business */
export const EXTRA_BUSINESS_KEYWORDS = [
  'nagercoil business directory',
  'kanyakumari shops',
  'kanyakumari traders',
  'kanyakumari agriculture market news',
  'colachel fish landing news',
  'kanyakumari fisheries news',
  'nagercoil restaurant news',
  'kanyakumari startup news',
  'kanyakumari small scale industry news',
];

/* ------------------------------------------------------ Extra categories */
export const EXTRA_CATEGORY_KEYWORDS = [
  'kanyakumari court news',
  'kanyakumari police news',
  'kanyakumari traffic news',
  'kanyakumari election news',
  'kanyakumari election results', // [live source]
  'kanyakumari exam results', // [live source]
  'kanyakumari plus two results', // [live source]
  'kanyakumari job vacancy',
  'kanyakumari recruitment news',
];

/* --------------------------------------------------- Extra Tamil Nadu */
export const EXTRA_TAMIL_NADU_KEYWORDS = [
  'tirunelveli news today',
  'madurai news today',
  'tuticorin news',
  'thoothukudi news',
  'tiruchirapalli news',
  'salem news',
  'vellore news',
  'tamil nadu district news',
];

/* ---------------------------------------------------------- Extra India */
export const EXTRA_INDIA_KEYWORDS = [
  'india national news today',
  'india breaking news today',
  'india world news',
  'global news',
  'international news',
  'india business news',
  'india sports news',
];

// ─────────────────────────────────────────────────────────────────────────────
// AGGREGATED EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * QUESTIONS — backward-compatible alias for AEO_QUESTIONS.
 * Kept so any existing import of `QUESTIONS` from this file continues to work.
 */
export const QUESTIONS = AEO_QUESTIONS;

export const ALL_KEYWORDS = [
  // GSC-measured data layer (highest priority)
  ...TIER1_DATA.map((d) => d.q),
  ...SPELLING_VARIANTS,
  ...TAMIL_DATA,
  ...TAMIL_ENGLISH_DATA,
  ...LIVE_AND_LOCAL_DATA,
  ...BRAND.brandQueries,
  ...LOCATION.district,
  ...BUSINESS_DATA,
  // Existing curated library
  ...BRAND_KEYWORDS,
  ...LOCAL_KEYWORDS,
  ...EXTRA_LOCAL_KEYWORDS,
  ...TOWN_KEYWORDS,
  ...NEIGHBORHOOD_KEYWORDS,
  ...TOURISM_KEYWORDS,
  ...EXTRA_TOURISM_KEYWORDS,
  ...TAMIL_NADU_KEYWORDS,
  ...EXTRA_TAMIL_NADU_KEYWORDS,
  ...INDIA_KEYWORDS,
  ...EXTRA_INDIA_KEYWORDS,
  ...BUSINESS_KEYWORDS,
  ...EXTRA_BUSINESS_KEYWORDS,
  ...CATEGORY_KEYWORDS,
  ...EXTRA_CATEGORY_KEYWORDS,
  ...TAMIL_SCRIPT_KEYWORDS,
];

/**
 * Top 13 for <meta name="keywords"> on the site root.
 * Priority order reflects GSC Tier 1 impression data.
 * Google ignores meta keywords, but other crawlers may read them.
 */
export const META_KEYWORDS = [
  'kanyakumari news today',       // TIER1: 111 impr, pos 8.2
  'kanyakumari news',             // TIER1: 120 impr, pos 8.4
  'kanyakumari today news',       // TIER1: 60 impr, pos 9.0
  'kanyakumari district news',    // TIER1: 10 impr, pos 8.5
  'nagercoil news today',         // TIER1: 8 impr, pos 11.8
  'nagercoil news',               // TIER1: 7 impr, pos 9.4
  'kanyakumari today',            // TIER1: 20 impr, pos 2.6 (already ranking well)
  'kanyakumari latest news',
  'kanyakumari breaking news',
  'tamil nadu news',
  'kanyakumari tourism',
  'kanyakumari news online',
  'கன்னியாகுமரி செய்திகள்',
];

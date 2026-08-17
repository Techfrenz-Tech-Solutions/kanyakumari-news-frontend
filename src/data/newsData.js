// ─────────────────────────────────────────────────────────────────────────────
// newsData.js
// Images  → picsum.photos/id/{n}/800/500  — no redirect, always loads
// Videos  → YouTube iframes via youtubeId
// ─────────────────────────────────────────────────────────────────────────────

// fastly CDN — serves directly without redirect, works in all browsers
const p = (id, w = 800, h = 500) => `https://picsum.photos/id/${id}/${w}/${h}`

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

export const kanyakumariAreas = [
  { slug: 'nagercoil',   label: 'Nagercoil'   },
  { slug: 'colachel',    label: 'Colachel'    },
  { slug: 'kuzhithurai', label: 'Kuzhithurai' },
  { slug: 'marthandam',  label: 'Marthandam'  },
  { slug: 'vattakottai', label: 'Vattakottai' },
  { slug: 'munchirai',   label: 'Munchirai'   },
]

// ── District Information ───────────────────────────────────────────────────
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
    { name: 'Police',               number: '100'          },
    { name: 'Fire Service',         number: '101'          },
    { name: 'Ambulance',            number: '108'          },
    { name: 'Women Helpline',       number: '181'          },
    { name: 'Child Helpline',       number: '1098'         },
    { name: 'Disaster Helpline',    number: '1077'         },
    { name: 'District Collectorate',number: '04652-232190' },
  ],
  transport: [
    { route: 'Nagercoil → Chennai',              type: 'Bus',   duration: '9 hrs',   operator: 'TNSTC'        },
    { route: 'Nagercoil → Madurai',              type: 'Bus',   duration: '4 hrs',   operator: 'TNSTC'        },
    { route: 'Kanyakumari → Thiruvananthapuram', type: 'Train', duration: '1.5 hrs', operator: 'Southern Rly' },
    { route: 'Nagercoil → Coimbatore',           type: 'Bus',   duration: '6 hrs',   operator: 'TNSTC'        },
  ],
}

// ── Tourist Attractions ────────────────────────────────────────────────────
export const touristAttractions = [
  {
    id: 1, name: 'Vivekananda Rock Memorial',
    description: 'A famous monument built on a small island off the coast. Swami Vivekananda is said to have meditated here.',
    image: p(15, 600, 400), category: 'Monument',
    timings: '8:00 AM – 4:00 PM', entryFee: '₹30 (Adult)',
  },
  {
    id: 2, name: 'Thiruvalluvar Statue',
    description: 'A 133-feet stone statue of the Tamil poet-saint Thiruvalluvar, erected on a small islet near Kanyakumari.',
    image: p(85, 600, 400), category: 'Monument',
    timings: '8:00 AM – 4:00 PM', entryFee: '₹30 (Adult)',
  },
  {
    id: 3, name: 'Sunrise / Sunset Point',
    description: 'Kanyakumari is the only place in India where you can witness both sunrise and sunset over the sea.',
    image: p(84, 600, 400), category: 'Nature',
    timings: 'Open all day', entryFee: 'Free',
  },
  {
    id: 4, name: 'Padmanabhapuram Palace',
    description: 'An ancient wooden palace near Thuckalay, one of the finest examples of Kerala architecture.',
    image: p(87, 600, 400), category: 'Heritage',
    timings: '9:00 AM – 5:00 PM (Closed Mondays)', entryFee: '₹35 (Adult)',
  },
  {
    id: 5, name: 'Kanyakumari Beach',
    description: 'The confluence of three seas — a pristine beach with multicoloured sand at the southernmost tip of India.',
    image: p(80, 600, 400), category: 'Beach',
    timings: 'Open all day', entryFee: 'Free',
  },
  {
    id: 6, name: 'Kumari Amman Temple',
    description: 'Ancient Hindu temple dedicated to the virgin goddess Kanya Devi at the tip of India.',
    image: p(83, 600, 400), category: 'Temple',
    timings: '4:30 AM – 12:00 PM, 4:00 PM – 8:00 PM', entryFee: 'Free',
  },
]

// ── Jobs ───────────────────────────────────────────────────────────────────
export const jobListings = [
  { id: 1, title: 'Junior Engineer (Civil)',     org: 'TWAD Board, TN',               location: 'Nagercoil',            lastDate: '2026-09-15', type: 'Govt',     link: '#' },
  { id: 2, title: 'Staff Nurse (Grade II)',       org: 'Health & Family Welfare Dept.',location: 'Kanyakumari District', lastDate: '2026-09-10', type: 'Govt',     link: '#' },
  { id: 3, title: 'Primary School Teacher',       org: 'School Education Dept., TN',  location: 'Marthandam',           lastDate: '2026-08-30', type: 'Teaching', link: '#' },
  { id: 4, title: 'Clerk (Scale I)',              org: 'Canara Bank',                  location: 'Nagercoil',            lastDate: '2026-09-20', type: 'Bank',     link: '#' },
  { id: 5, title: 'Software Developer',           org: 'Infosys BPM',                  location: 'Nagercoil (WFH)',      lastDate: '2026-09-05', type: 'Private',  link: '#' },
  { id: 6, title: 'TNPSC Group 4 Notification',  org: 'TNPSC',                        location: 'Tamil Nadu',           lastDate: '2026-09-25', type: 'Govt',     link: '#' },
  { id: 7, title: 'High School Teacher (Maths)', org: 'Kendriya Vidyalaya, Nagercoil',location: 'Nagercoil',            lastDate: '2026-09-12', type: 'Teaching', link: '#' },
  { id: 8, title: 'Branch Manager',              org: 'Indian Overseas Bank',         location: 'Colachel',             lastDate: '2026-09-18', type: 'Bank',     link: '#' },
]

// ── Authors ────────────────────────────────────────────────────────────────
const authors = [
  { id: 'a1', name: 'Meera Krishnan', role: 'Senior Correspondent', avatar: 'https://i.pravatar.cc/100?img=47' },
  { id: 'a2', name: 'Arun Prakash',   role: 'Political Editor',     avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: 'a3', name: 'Divya Shankar',  role: 'Business Desk',        avatar: 'https://i.pravatar.cc/100?img=32' },
  { id: 'a4', name: 'Karthik Raja',   role: 'Sports Editor',        avatar: 'https://i.pravatar.cc/100?img=15' },
  { id: 'a5', name: 'Priya Ramesh',   role: 'Cinema Desk',          avatar: 'https://i.pravatar.cc/100?img=44' },
]

function minutesAgo(m) {
  return new Date(Date.now() - m * 60000).toISOString()
}

// ── Articles ───────────────────────────────────────────────────────────────
// picsum IDs chosen to visually suggest the topic:
//  coast/sea → 15,80,84   city/town → 20,22,24   building → 48,96
//  nature/farm → 10,37,76  science/tech → 50,70   sports → 60
//  cinema → 67   finance → 65   health → 57   education → 55
//  crime → 91   politics → 96   agriculture → 76   world/global → 73
export const articles = [

  // ── Kanyakumari ──────────────────────────────────────────────────────────
  {
    id: 21, slug: 'nagercoil-water-supply-project',
    title:    'Nagercoil corporation launches ₹120 cr water supply upgrade project',
    titleTA:  'நாகர்கோவில் மாநகரம் ₹120 கோடி குடிநீர் திட்டத்தை தொடங்கியது',
    excerpt:  'The project aims to provide 24-hour piped water supply to all 47 wards of Nagercoil city corporation by 2027.',
    excerptTA:'இந்த திட்டம் 2027-ஆம் ஆண்டுக்குள் நாகர்கோவில் மாநகராட்சியின் அனைத்து 47 வார்டுகளுக்கும் 24 மணி நேர குழாய் குடிநீர் வழங்குவதை இலக்காக கொண்டுள்ளது.',
    category: 'kanyakumari', area: 'nagercoil', author: authors[0],
    image: p(20), publishedAt: minutesAgo(10), readTime: 3,
    views: 8200, likes: 190, comments: 28, tags: ['nagercoil', 'infrastructure'],
    breaking: true, trending: true, premium: false,
  },
  {
    id: 22, slug: 'colachel-port-expansion',
    title:    'Colachel port expansion enters final phase; cargo capacity to triple',
    titleTA:  'கொளச்சேல் துறைமுக விரிவாக்கம் இறுதி கட்டத்தில்; சரக்கு திறன் மூன்று மடங்காகும்',
    excerpt:  'The Colachel Port expansion project is set to boost trade connectivity and create 2,000 new jobs for the district.',
    excerptTA:'கொளச்சேல் துறைமுக விரிவாக்கம் வர்த்தக தொடர்பை மேம்படுத்தவும் மாவட்டத்தில் 2,000 புதிய வேலைகளை உருவாக்கவும் உதவும்.',
    category: 'kanyakumari', area: 'colachel', author: authors[1],
    image: p(42), publishedAt: minutesAgo(25), readTime: 4,
    views: 6500, likes: 145, comments: 31, tags: ['colachel', 'port'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 23, slug: 'marthandam-organic-farmers',
    title:    'Marthandam farmers achieve record organic produce export to Europe',
    titleTA:  'மார்த்தாண்டம் விவசாயிகள் ஐரோப்பாவிற்கு சாதனை கரிம உற்பத்தி ஏற்றுமதி',
    excerpt:  'Over 50 farmer groups from Marthandam taluk have collectively exported 200 tonnes of organic spices this year.',
    excerptTA:'மார்த்தாண்டம் தாலுகாவின் 50-க்கும் மேற்பட்ட விவசாயக் குழுக்கள் இந்த ஆண்டு 200 டன் கரிம மசாலாப் பொருட்களை ஏற்றுமதி செய்துள்ளன.',
    category: 'kanyakumari', area: 'marthandam', author: authors[0],
    image: p(37), publishedAt: minutesAgo(60), readTime: 3,
    views: 4300, likes: 98, comments: 14, tags: ['marthandam', 'farmers'],
    breaking: false, trending: false, premium: false,
  },
  {
    id: 24, slug: 'vivekananda-rock-renovation',
    title:    'Vivekananda Rock Memorial renovation work to begin in October',
    titleTA:  'விவேகானந்தர் பாறை நினைவிடம் புனரமைப்பு அக்டோபரில் தொடங்கும்',
    excerpt:  'The Tamil Nadu government has approved a ₹45 crore facelift for the iconic rock memorial.',
    excerptTA:'தமிழ்நாடு அரசு இந்த புகழ்பெற்ற பாறை நினைவிடத்திற்கு ₹45 கோடி புனரமைப்பை அங்கீகரித்துள்ளது.',
    category: 'kanyakumari', area: 'vattakottai', author: authors[2],
    image: p(15), publishedAt: minutesAgo(90), readTime: 4,
    views: 11200, likes: 320, comments: 67, tags: ['vivekananda', 'tourism'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 25, slug: 'kuzhithurai-bridge-inauguration',
    title:    'New bridge at Kuzhithurai inaugurated; connects two district roads',
    titleTA:  'குழித்துறையில் புதிய பாலம் திறப்பு; இரண்டு மாவட்ட சாலைகளை இணைக்கிறது',
    excerpt:  'The newly built bridge over the Thamirabarani river reduces travel distance by 12 km for residents.',
    excerptTA:'தாமிரபரணி ஆற்றின் மீது புதிதாக கட்டப்பட்ட பாலம் மக்களுக்கு 12 கிமீ தூரத்தை குறைக்கிறது.',
    category: 'kanyakumari', area: 'kuzhithurai', author: authors[0],
    image: p(106), publishedAt: minutesAgo(120), readTime: 3,
    views: 3100, likes: 72, comments: 9, tags: ['kuzhithurai', 'bridge'],
    breaking: false, trending: false, premium: false,
  },

  // ── Tamil Nadu ────────────────────────────────────────────────────────────
  {
    id: 1, slug: 'assembly-session-monsoon-bills',
    title:    'Assembly clears seven bills on opening day of monsoon session',
    titleTA:  'பருவமழை கூட்டத்தொடர் முதல் நாளில் சட்டமன்றம் ஏழு மசோதாக்களை நிறைவேற்றியது',
    excerpt:  'The state legislature passed key infrastructure and welfare bills as the ruling party pushed through a packed agenda.',
    excerptTA:'ஆளும் கட்சி நெரிசலான நிகழ்ச்சி நிரலை முன்னெடுக்கும் போது மாநில சட்டமன்றம் முக்கியமான உள்கட்டமைப்பு மற்றும் நலத்திட்ட மசோதாக்களை நிறைவேற்றியது.',
    category: 'tamil-nadu', author: authors[1],
    image: p(96), publishedAt: minutesAgo(18), readTime: 4,
    views: 18420, likes: 342, comments: 56, tags: ['assembly', 'legislation'],
    breaking: true, trending: true, premium: false,
  },
  {
    id: 2, slug: 'chennai-metro-phase-2-update',
    title:    'Chennai Metro Phase 2: three new corridors to open by December',
    titleTA:  'சென்னை மெட்ரோ இரண்டாம் கட்டம்: டிசம்பரில் மூன்று புதிய வழித்தடங்கள் திறக்கும்',
    excerpt:  'CMRL confirms tunnelling has been completed on the Madhavaram–SIPCOT stretch.',
    excerptTA:'மாதவரம்-சிப்கட் பகுதியில் சுரங்கப்பணி முடிந்ததை சிஎம்ஆர்எல் உறுதிப்படுத்தியுள்ளது.',
    category: 'tamil-nadu', author: authors[0],
    image: p(338), publishedAt: minutesAgo(42), readTime: 5,
    views: 9840, likes: 210, comments: 34, tags: ['chennai', 'metro'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 13, slug: 'monsoon-forecast-update',
    title:    'IMD revises monsoon forecast upward for southern peninsula',
    titleTA:  'தென் தீபகற்பத்தில் பருவமழை முன்னறிவிப்பை IMD மேம்படுத்தியது',
    excerpt:  'Above-normal rainfall is expected across Tamil Nadu and Kerala in the next fortnight.',
    excerptTA:'அடுத்த இரண்டு வாரங்களில் தமிழ்நாடு மற்றும் கேரளாவில் சாதாரணத்தை விட அதிகமான மழை எதிர்பார்க்கப்படுகிறது.',
    category: 'tamil-nadu', author: authors[0],
    image: p(75), publishedAt: minutesAgo(80), readTime: 3,
    views: 7600, likes: 90, comments: 12, tags: ['monsoon', 'imd'],
    breaking: false, trending: false, premium: false,
  },
  {
    id: 26, slug: 'meenakshi-temple-renovation',
    title:    'Madurai Meenakshi temple gopuram renovation completed after 3 years',
    titleTA:  'மூன்று ஆண்டுகளுக்கு பிறகு மதுரை மீனாட்சி கோயில் கோபுர புனரமைப்பு நிறைவு',
    excerpt:  'The 12-year cycle renovation of the eastern gopuram was completed ahead of schedule.',
    excerptTA:'கிழக்கு கோபுரத்தின் 12 ஆண்டு சுழற்சி புனரமைப்பு நிர்ணயிக்கப்பட்ட காலத்திற்கு முன்னதாக நிறைவடைந்தது.',
    category: 'tamil-nadu', author: authors[0],
    image: p(83), publishedAt: minutesAgo(300), readTime: 4,
    views: 12400, likes: 430, comments: 88, tags: ['madurai', 'temple'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 27, slug: 'marina-beach-cleanup',
    title:    "Marina Beach hosts India's largest single-day beach cleanup drive",
    titleTA:  'மெரீனா கடற்கரையில் இந்தியாவின் மிகப்பெரிய ஒரு நாள் கடற்கரை சுத்தம்',
    excerpt:  'Over 10,000 volunteers cleaned a 13 km stretch of Marina Beach in a single day.',
    excerptTA:'10,000-க்கும் மேற்பட்ட தன்னார்வலர்கள் ஒரே நாளில் மெரீனா கடற்கரையின் 13 கிமீ பகுதியை சுத்தம் செய்தனர்.',
    category: 'tamil-nadu', author: authors[1],
    image: p(80), publishedAt: minutesAgo(500), readTime: 3,
    views: 8900, likes: 280, comments: 45, tags: ['marina', 'chennai'],
    breaking: false, trending: false, premium: false,
  },

  // ── National ──────────────────────────────────────────────────────────────
  {
    id: 9, slug: 'isro-satellite-launch-success',
    title:    'ISRO successfully places earth observation satellite in orbit',
    titleTA:  'இஸ்ரோ வெற்றிகரமாக பூமி கண்காணிப்பு செயற்கைக்கோளை சுற்றுப்பாதையில் நிலைநிறுத்தியது',
    excerpt:  "The PSLV-C61 mission marks the space agency's third successful launch this year.",
    excerptTA:'பிஎஸ்எல்வி-சி61 திட்டம் இந்த ஆண்டு விண்வெளி நிறுவனத்தின் மூன்றாவது வெற்றிகரமான ஏவுதலை குறிக்கிறது.',
    category: 'national', author: authors[0],
    image: p(50), publishedAt: minutesAgo(90), readTime: 5,
    views: 14300, likes: 670, comments: 88, tags: ['isro', 'space'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 17, slug: 'parliament-winter-session-agenda',
    title:    'Winter session: government to table key data protection amendments',
    titleTA:  'குளிர்கால அமர்வு: அரசு முக்கிய தரவு பாதுகாப்பு திருத்தங்களை சமர்ப்பிக்கும்',
    excerpt:  'The proposed changes tighten consent rules for data processing and introduce steeper penalties.',
    excerptTA:'முன்மொழியப்பட்ட மாற்றங்கள் தரவு செயலாக்கத்திற்கான ஒப்புதல் விதிகளை கடுமையாக்கும் மற்றும் கடுமையான அபராதங்களை அறிமுகப்படுத்தும்.',
    category: 'national', author: authors[1],
    image: p(48), publishedAt: minutesAgo(70), readTime: 5,
    views: 8800, likes: 130, comments: 41, tags: ['parliament', 'data-protection'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 28, slug: 'g20-legacy-report',
    title:    "India's G20 presidency legacy: key outcomes one year later",
    titleTA:  'இந்தியாவின் ஜி20 தலைமை: ஒரு ஆண்டுக்கு பிறகு முக்கிய முடிவுகள்',
    excerpt:  "Analysts assess the long-term impact of agreements signed during India's G20 presidency.",
    excerptTA:'இந்தியாவின் ஜி20 தலைமையின் போது கையெழுத்திட்ட ஒப்பந்தங்களின் நீண்டகால தாக்கத்தை ஆய்வாளர்கள் மதிப்பிடுகின்றனர்.',
    category: 'national', author: authors[2],
    image: p(24), publishedAt: minutesAgo(200), readTime: 6,
    views: 9100, likes: 210, comments: 55, tags: ['g20', 'india'],
    breaking: false, trending: false, premium: false,
  },
  {
    id: 29, slug: 'ayodhya-ram-mandir-visitors',
    title:    'Ram Mandir Ayodhya crosses 5 crore visitors in first six months',
    titleTA:  'அயோத்தி ராம் மந்திர் முதல் ஆறு மாதங்களில் 5 கோடி பார்வையாளர்களை கடந்தது',
    excerpt:  'The Ram Mandir has become one of the most visited religious sites in India.',
    excerptTA:'ராம் மந்திர் இந்தியாவில் அதிகம் பார்வையிடப்படும் மதத்தலங்களில் ஒன்றாக மாறியுள்ளது.',
    category: 'national', author: authors[1],
    image: p(532), publishedAt: minutesAgo(400), readTime: 4,
    views: 31000, likes: 1200, comments: 310, tags: ['ayodhya', 'temple'],
    breaking: false, trending: true, premium: false,
  },

  // ── World ─────────────────────────────────────────────────────────────────
  {
    id: 16, slug: 'world-leaders-climate-summit',
    title:    'Climate summit ends with fresh emissions pledges from 40 nations',
    titleTA:  '40 நாடுகளிடமிருந்து புதிய கார்பன் வெளியீட்டு உறுதிமொழிகளுடன் காலநிலை உச்சிமாநாடு நிறைவு',
    excerpt:  'Negotiators hailed the agreement as a step forward, though enforcement mechanisms remain vague.',
    excerptTA:'ஒப்பந்தம் முன்னோக்கிய படியாக புகழ்ந்து பேசப்பட்டது, ஆனால் அமல்படுத்தும் வழிமுறைகள் தெளிவற்றதாகவே உள்ளன.',
    category: 'world', author: authors[2],
    image: p(73), publishedAt: minutesAgo(500), readTime: 7,
    views: 10200, likes: 240, comments: 90, tags: ['climate', 'summit'],
    breaking: false, trending: false, premium: true,
  },
  {
    id: 30, slug: 'un-general-assembly-highlights',
    title:    'UNGA 2026: key speeches and resolutions from world leaders',
    titleTA:  'யுஎன்ஜிஏ 2026: உலக தலைவர்களின் முக்கிய உரைகள் மற்றும் தீர்மானங்கள்',
    excerpt:  'The 81st session addressed conflicts, climate change, and global health crises.',
    excerptTA:'81வது அமர்வு மோதல்கள், காலநிலை மாற்றம் மற்றும் உலகளாவிய சுகாதார நெருக்கடிகளை உரையாற்றியது.',
    category: 'world', author: authors[2],
    image: p(120), publishedAt: minutesAgo(600), readTime: 8,
    views: 7400, likes: 160, comments: 38, tags: ['unga', 'un'],
    breaking: false, trending: false, premium: false,
  },

  // ── Business ──────────────────────────────────────────────────────────────
  {
    id: 3, slug: 'rbi-holds-repo-rate',
    title:    'RBI holds repo rate steady at 6.5% for fourth straight review',
    titleTA:  'RBI நான்காவது தொடர் ஆய்வில் ரெப்போ வீதத்தை 6.5% ஆக நிலைநிறுத்தியது',
    excerpt:  'The central bank cited sticky food inflation while signalling room for a cut later this year.',
    excerptTA:'மத்திய வங்கி இந்த ஆண்டு பின்னர் குறைக்கும் வாய்ப்பை சமிக்ஞை செய்யும் போது தொடர்ந்து நிலவும் உணவு பணவீக்கத்தை மேற்கோள் காட்டியது.',
    category: 'business', author: authors[2],
    image: p(65), publishedAt: minutesAgo(65), readTime: 6,
    views: 15230, likes: 189, comments: 71, tags: ['rbi', 'economy'],
    breaking: true, trending: true, premium: true,
  },
  {
    id: 4, slug: 'sensex-nifty-record-close',
    title:    'Sensex, Nifty close at record highs on strong FII inflows',
    titleTA:  'வலுவான FII வரவுகளில் சென்செக்ஸ், நிஃப்டி சாதனை உயரத்தில் முடிந்தன',
    excerpt:  'Banking and IT stocks led the rally as FIIs poured in over ₹4,200 crore in a single session.',
    excerptTA:'FII-கள் ஒரே அமர்வில் ₹4,200 கோடிக்கும் மேல் முதலீடு செய்ய வங்கி மற்றும் IT பங்குகள் ஏற்றத்தை முன்னின்று நடத்தின.',
    category: 'business', author: authors[2],
    image: p(60614), publishedAt: minutesAgo(120), readTime: 3,
    views: 12100, likes: 156, comments: 22, tags: ['markets', 'sensex'],
    breaking: false, trending: true, premium: false,
  },

  // ── Sports ────────────────────────────────────────────────────────────────
  {
    id: 5, slug: 'india-tour-of-australia-squad',
    title:    'BCCI announces 18-member squad for Australia Test tour',
    titleTA:  'ஆஸ்திரேலியா டெஸ்ட் சுற்றுப்பயணத்திற்கு BCCI 18 பேர் அணியை அறிவித்தது',
    excerpt:  'Two uncapped pacers make the cut as selectors opt for depth ahead of the five-match series.',
    excerptTA:'ஐந்து போட்டிகள் தொடரில் ஆழத்தை தேர்ந்தெடுத்த தேர்வுக்குழு இரண்டு புதிய வேக பந்துவீரர்களை சேர்த்தது.',
    category: 'sports', author: authors[3],
    image: p(60), publishedAt: minutesAgo(30), readTime: 4,
    views: 22100, likes: 890, comments: 145, tags: ['cricket', 'bcci'],
    breaking: true, trending: true, premium: false,
  },
  {
    id: 6, slug: 'ipl-auction-date-confirmed',
    title:    'IPL 2027 mega auction date confirmed, 240 players in pool',
    titleTA:  'ஐபிஎல் 2027 மெகா ஏலம் தேதி உறுதி, 240 வீரர்கள் பட்டியலில்',
    excerpt:  'Franchises head into the auction with reshuffled purses after revised retention rules.',
    excerptTA:'திருத்தப்பட்ட தக்கவைப்பு விதிகளுக்குப் பிறகு புதுப்பிக்கப்பட்ட நிதியுடன் உரிமையாளர்கள் ஏலத்திற்கு செல்கின்றனர்.',
    category: 'sports', author: authors[3],
    image: p(325), publishedAt: minutesAgo(200), readTime: 3,
    views: 17650, likes: 430, comments: 98, tags: ['ipl', 'auction'],
    breaking: false, trending: false, premium: false,
  },

  // ── Cinema ────────────────────────────────────────────────────────────────
  {
    id: 7, slug: 'new-tamil-film-trailer-release',
    title:    'Much-awaited Tamil period drama trailer crosses 10M views in a day',
    titleTA:  'எதிர்பார்க்கப்பட்ட தமிழ் வரலாற்று நாடகம் ட்ரெய்லர் ஒரு நாளில் 10 மில்லியன் பார்வைகளை கடந்தது',
    excerpt:  "The lead pair's look and the film's scale have dominated social media since the trailer dropped.",
    excerptTA:'ட்ரெய்லர் வெளியான பிறகு தலைவர் ஜோடியின் தோற்றம் மற்றும் படத்தின் பரிமாணம் சமூக ஊடகங்களில் ஆதிக்கம் செலுத்துகிறது.',
    category: 'cinema', author: authors[4],
    image: p(67), publishedAt: minutesAgo(55), readTime: 3,
    views: 31200, likes: 2100, comments: 340, tags: ['tamil-cinema', 'trailer'],
    breaking: false, trending: true, premium: false,
  },
  {
    id: 8, slug: 'ott-releases-this-week',
    title:    'Five OTT releases to watch out for this week',
    titleTA:  'இந்த வாரம் பார்க்க வேண்டிய ஐந்து OTT வெளியீடுகள்',
    excerpt:  'From a slow-burn political thriller to a 90s family drama, here is what is streaming this weekend.',
    excerptTA:'மெல்ல எரியும் அரசியல் த்ரில்லர் முதல் 90களின் குடும்ப நாடகம் வரை, இந்த வீக்எண்டில் என்ன ஸ்ட்ரீமிங் ஆகிறது என்று பாருங்கள்.',
    category: 'entertainment', author: authors[4],
    image: p(225), publishedAt: minutesAgo(300), readTime: 5,
    views: 8900, likes: 210, comments: 40, tags: ['ott', 'streaming'],
    breaking: false, trending: false, premium: false,
  },

  // ── Technology ────────────────────────────────────────────────────────────
  {
    id: 10, slug: 'ai-startup-funding-round',
    title:    'Chennai-based AI startup raises $18M in Series A round',
    titleTA:  'சென்னை AI ஸ்டார்ட்அப் சீரிஸ் A சுற்றில் $18 மில்லியன் திரட்டியது',
    excerpt:  'The funding will expand the document-intelligence platform into Southeast Asian markets.',
    excerptTA:'இந்த நிதி ஆவண-நுண்ணறிவு தளத்தை தென்கிழக்கு ஆசிய சந்தைகளில் விரிவாக்க உதவும்.',
    category: 'technology', author: authors[2],
    image: p(70), publishedAt: minutesAgo(150), readTime: 4,
    views: 6700, likes: 145, comments: 19, tags: ['startup', 'funding'],
    breaking: false, trending: false, premium: true,
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: 11, slug: 'new-education-policy-rollout',
    title:    'State to roll out revised curriculum framework from next academic year',
    titleTA:  'அடுத்த கல்வியாண்டிலிருந்து மாற்றியமைக்கப்பட்ட பாடத்திட்ட கட்டமைப்பை மாநிலம் அறிமுகப்படுத்தும்',
    excerpt:  'Changes align school syllabi with the national framework while retaining regional language emphasis.',
    excerptTA:'மாற்றங்கள் பள்ளி பாடத்திட்டங்களை தேசிய கட்டமைப்புடன் இணைக்கின்றன, மேலும் பிராந்திய மொழி வலியுறுத்தலை தக்கவைக்கின்றன.',
    category: 'education', author: authors[0],
    image: p(55), publishedAt: minutesAgo(400), readTime: 6,
    views: 9200, likes: 130, comments: 55, tags: ['education', 'policy'],
    breaking: false, trending: false, premium: false,
  },

  // ── Jobs ──────────────────────────────────────────────────────────────────
  {
    id: 12, slug: 'tnpsc-group-2-results',
    title:    'TNPSC Group 2 results released; check scores here',
    titleTA:  'TNPSC குரூப் 2 முடிவுகள் வெளியாயின; மதிப்பெண்களை இங்கே சரிபாருங்கள்',
    excerpt:  'Over 4.2 lakh candidates appeared for the exam held in March, merit list to follow in two weeks.',
    excerptTA:'மார்ச் மாதம் நடைபெற்ற தேர்வில் 4.2 லட்சத்திற்கும் மேற்பட்ட விண்ணப்பதாரர்கள் கலந்துகொண்டனர், இரண்டு வாரங்களில் தகுதி பட்டியல் வெளியாகும்.',
    category: 'jobs', author: authors[1],
    image: p(94), publishedAt: minutesAgo(600), readTime: 2,
    views: 41000, likes: 900, comments: 210, tags: ['tnpsc', 'results'],
    breaking: true, trending: true, premium: false,
  },

  // ── Agriculture ───────────────────────────────────────────────────────────
  {
    id: 14, slug: 'farmers-protest-msp-demand',
    title:    'Farmer groups renew demand for legal MSP guarantee',
    titleTA:  'விவசாயக் குழுக்கள் சட்டரீதியான MSP உத்தரவாதத்திற்கான கோரிக்கையை புதுப்பிக்கின்றன',
    excerpt:  'Delegations from six states met agriculture ministry officials as talks resumed.',
    excerptTA:'ஆறு மாநிலங்களின் பிரதிநிதிகள் பேச்சுவார்த்தைகள் மீண்டும் தொடங்கியதால் விவசாய அமைச்சக அதிகாரிகளை சந்தித்தனர்.',
    category: 'agriculture', author: authors[1],
    image: p(76), publishedAt: minutesAgo(240), readTime: 5,
    views: 5400, likes: 210, comments: 66, tags: ['farmers', 'msp'],
    breaking: false, trending: false, premium: false,
  },

  // ── Crime ─────────────────────────────────────────────────────────────────
  {
    id: 15, slug: 'city-police-cybercrime-crackdown',
    title:    'Cybercrime cell busts loan-app extortion racket, four held',
    titleTA:  'இணைய குற்ற பிரிவு கடன் ஆப் மிரட்டல் வலையை தகர்த்தது, நால்வர் கைது',
    excerpt:  'Police say the group targeted over 300 victims using fake lending apps.',
    excerptTA:'போலி கடன் ஆப்களைப் பயன்படுத்தி 300-க்கும் மேற்பட்ட பாதிக்கப்பட்டவர்களை குழு குறிவைத்தது என்று போலீஸ் தெரிவித்தது.',
    category: 'crime', author: authors[1],
    image: p(91), publishedAt: minutesAgo(35), readTime: 4,
    views: 13400, likes: 320, comments: 78, tags: ['cybercrime', 'police'],
    breaking: true, trending: false, premium: false,
  },

  // ── Politics ──────────────────────────────────────────────────────────────
  {
    id: 17, slug: 'parliament-data-protection-bill',
    title:    'Parliament to table key data protection amendments in winter session',
    titleTA:  'நாடாளுமன்றம் குளிர்கால அமர்வில் முக்கிய தரவு பாதுகாப்பு திருத்தங்களை சமர்ப்பிக்கும்',
    excerpt:  'Proposed changes tighten consent rules for data processing and introduce steeper penalties for breaches.',
    excerptTA:'முன்மொழியப்பட்ட மாற்றங்கள் தரவு செயலாக்கத்திற்கான ஒப்புதல் விதிகளை கடுமையாக்கி மீறல்களுக்கு கடுமையான அபராதங்களை அறிமுகப்படுத்துகின்றன.',
    category: 'politics', author: authors[1],
    image: p(48), publishedAt: minutesAgo(70), readTime: 5,
    views: 8800, likes: 130, comments: 41, tags: ['parliament', 'data-protection'],
    breaking: false, trending: true, premium: false,
  },

  // ── Health ────────────────────────────────────────────────────────────────
  {
    id: 20, slug: 'dengue-cases-rise-advisory',
    title:    'Health department issues advisory as dengue cases rise post-monsoon',
    titleTA:  'பருவமழைக்கு பிறகு டெங்கு வழக்குகள் அதிகரிப்பால் சுகாதாரத்துறை அறிவிப்பு',
    excerpt:  'Officials intensified fogging drives and urged residents to eliminate stagnant water sources.',
    excerptTA:'அதிகாரிகள் புகை அடிக்கும் நடவடிக்கைகளை தீவிரப்படுத்தினர் மற்றும் நிலைத்த நீர் ஆதாரங்களை அகற்றுமாறு குடிமக்களை வேண்டினர்.',
    category: 'health', author: authors[0],
    image: p(57), publishedAt: minutesAgo(50), readTime: 3,
    views: 9600, likes: 110, comments: 30, tags: ['dengue', 'health'],
    breaking: true, trending: false, premium: false,
  },
]

// ── Derived exports ────────────────────────────────────────────────────────
export const heroArticles  = articles.filter((a) => a.trending).slice(0, 5)
export const breakingHeadlines = articles.filter((a) => a.breaking).map((a) => a.title)
export const trending      = [...articles].sort((a, b) => b.views - a.views).slice(0, 10)

// ── Gallery — picsum IDs that suggest landscapes/temples/events ────────────
export const gallery = [
  { id: 1,  title: 'Vivekananda Rock Memorial, Kanyakumari', image: p(15,700,500),   category: 'Events'   },
  { id: 2,  title: 'Kanyakumari Beach at sunrise',           image: p(80,700,500),   category: 'Nature'   },
  { id: 3,  title: 'Colachel harbour, Kanyakumari',          image: p(42,700,500),   category: 'News'     },
  { id: 4,  title: 'Nagercoil city view',                    image: p(20,700,900),   category: 'News'     },
  { id: 5,  title: 'Padmanabhapuram Palace',                 image: p(87,700,500),   category: 'Festivals'},
  { id: 6,  title: 'Sunset at Kanyakumari',                  image: p(84,700,500),   category: 'Nature'   },
  { id: 7,  title: 'Meenakshi Temple, Madurai',              image: p(83,700,500),   category: 'Festivals'},
  { id: 8,  title: 'Marina Beach, Chennai',                  image: p(288,700,500),  category: 'News'     },
  { id: 9,  title: 'Marthandam farmlands',                   image: p(37,700,900),   category: 'Nature'   },
  { id: 10, title: 'Tamil Nadu Assembly Complex',            image: p(96,700,500),   category: 'Events'   },
  { id: 11, title: 'ISRO launch vehicle',                    image: p(50,700,500),   category: 'News'     },
  { id: 12, title: 'Kanyakumari fishermen at dawn',          image: p(22,700,900),   category: 'Events'   },
]

// ── Videos — real YouTube video IDs with reliable thumbnails ──────────────
// thumbnail: maxresdefault (may 404) → fallback to hqdefault in VideoPage
export const videos = [
  {
    id: 1,
    title: 'Kanyakumari District — Complete Travel Guide',
    youtubeId: 'EKZbLSJsARY',
    thumbnail: 'https://img.youtube.com/vi/EKZbLSJsARY/hqdefault.jpg',
    duration: '8:24', views: 142000,
  },
  {
    id: 2,
    title: 'Vivekananda Rock Memorial — Full Documentary',
    youtubeId: 'Q2wFtGOyRl4',
    thumbnail: 'https://img.youtube.com/vi/Q2wFtGOyRl4/hqdefault.jpg',
    duration: '12:05', views: 98000,
  },
  {
    id: 3,
    title: 'Top 10 Places to Visit in Kanyakumari',
    youtubeId: 'j8a3nPwW1Eg',
    thumbnail: 'https://img.youtube.com/vi/j8a3nPwW1Eg/hqdefault.jpg',
    duration: '11:45', views: 312000,
  },
  {
    id: 4,
    title: 'Chennai Metro Phase 2 — Latest Update 2024',
    youtubeId: '3OZKWP7kdBk',
    thumbnail: 'https://img.youtube.com/vi/3OZKWP7kdBk/hqdefault.jpg',
    duration: '6:48', views: 74000,
  },
  {
    id: 5,
    title: 'ISRO PSLV-C61 Launch — Live Coverage',
    youtubeId: 'OnoNITE-CLc',
    thumbnail: 'https://img.youtube.com/vi/OnoNITE-CLc/hqdefault.jpg',
    duration: '18:30', views: 230000,
  },
  {
    id: 6,
    title: 'Meenakshi Temple Madurai — Heritage Walk',
    youtubeId: 'wM_8ngPsKL8',
    thumbnail: 'https://img.youtube.com/vi/wM_8ngPsKL8/hqdefault.jpg',
    duration: '14:20', views: 188000,
  },
  {
    id: 7,
    title: 'Tamil Nadu Budget Session Highlights',
    youtubeId: 'Gn9N9DWPe4Q',
    thumbnail: 'https://img.youtube.com/vi/Gn9N9DWPe4Q/hqdefault.jpg',
    duration: '9:12', views: 55000,
  },
  {
    id: 8,
    title: "India's G20 Presidency — Key Outcomes",
    youtubeId: 'xzb3cr64_GE',
    thumbnail: 'https://img.youtube.com/vi/xzb3cr64_GE/hqdefault.jpg',
    duration: '7:50', views: 67000,
  },
]

// ── Stock & Financial ──────────────────────────────────────────────────────
export const stockData = {
  sensex: { value: 81234.56, change: 412.3,  changePct:  0.51, spark: [80500,80700,80600,80950,81020,81100,81234] },
  nifty:  { value: 24678.9,  change: 98.15,  changePct:  0.40, spark: [24400,24450,24500,24550,24600,24630,24679] },
  nasdaq: { value: 17812.44, change: -56.2,  changePct: -0.31, spark: [17950,17900,17880,17850,17820,17800,17812] },
  dow:    { value: 41235.1,  change: 122.8,  changePct:  0.30, spark: [41000,41050,41100,41150,41180,41200,41235] },
}

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

export const rates = {
  gold22k: 7412, gold24k: 8085, silverKg: 96400, petrol: 100.86, diesel: 92.49,
}

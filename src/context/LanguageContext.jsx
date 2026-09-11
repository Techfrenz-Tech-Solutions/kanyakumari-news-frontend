import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

// ── Full UI translations ───────────────────────────────────────────────────
export const translations = {
  EN: {
    // TopBar
    ePaper: 'E-Paper',
    login: 'Login',
    subscribe: 'Subscribe',
    switchLang: 'தமிழ்',

    // Header
    search: 'Search',
    searchPlaceholder: 'Search Kanyakumari news...',
    searchBtn: 'Search',
    home: 'Home',
    navKanyakumari: 'Kanyakumari',
    navTN: 'TN',
    navNational: 'National',
    navWorld: 'World',
    navPhoto: 'Photo',
    navVideos: 'Videos',
    navDistrictInfo: 'District Info',
    navTourist: 'Tourist',
    navJobs: 'Jobs',
    navLinks: 'Links',
    tagline: 'Local News for Kanyakumari District',

    // BreakingTicker
    breaking: 'Breaking',

    // Home page
    moreLink: 'More →',
    kanyakumariNews: 'Kanyakumari News',
    tamilnaduNews: 'Tamilnadu News',
    nationalNews: 'National News',
    worldNews: 'World News',
    districtInfo: 'District Info',
    newsVideos: 'News Videos',
    jobsLinks: 'JOBS Links',
    touristInfo: 'Tourist Info',
    taluks: 'Taluks & Panchayats',
    govtOffices: 'Govt Offices',
    emergencyHelplines: 'Emergency Helplines',
    weatherToday: 'Weather Today',
    busTrainSchedule: 'Bus / Train Schedule',
    allJobListings: 'All Job Listings',
    vivekanandaRock: 'Vivekananda Rock Memorial',
    thiruvalluvarStatue: 'Thiruvalluvar Statue',
    kumariAmmanTemple: 'Kumari Amman Temple',
    kanyakumariBeach: 'Kanyakumari Beach',
    advertisement: 'Advertisement',

    // Footer
    footerTagline: 'Independent local news for Kanyakumari District — covering what matters to you.',
    footerNews: 'News',
    footerCompany: 'Company',
    footerAbout: 'About Us',
    footerContact: 'Contact Us',
    footerAdvertise: 'Advertise With Us',
    footerCareers: 'Careers',
    footerPrivacy: 'Privacy Policy',
    footerDisclaimer: 'Disclaimer',
    footerCopyright: 'Kanyakumari Today. All rights reserved.',
    footerTerms: 'Terms of Use',
    footerCookies: 'Cookie Policy',

    // Category page
    breadcrumbHome: 'Home',
    loadMore: 'Load More',
    noArticles: 'No articles found',
    allAreas: 'All',
    photoGallery: 'Photo Gallery',
    viewGallery: 'View Gallery →',

    // Article page
    share: 'Share:',
    comments: 'Comments',
    postComment: 'Post',
    commentPlaceholder: 'Share your thoughts...',
    relatedNews: 'Related News',
    mostRead: 'Most Read',
    backHome: 'Back to home',
    articleNotFound: 'Article not found',
    articleNotFoundDesc: 'This story may have been moved or removed.',
    minutesRead: 'min read',
    photo: 'Photo',

    // Gallery
    photoGalleryTitle: 'Photo Gallery',
    albumAll: 'All',
    albumEvents: 'Events',
    albumFestivals: 'Festivals',
    albumNature: 'Nature',
    albumNews: 'News',

    // Jobs
    jobsTitle: 'Jobs & Govt Notifications',
    filterLatest: 'Latest',
    filterGovt: 'Govt',
    filterPrivate: 'Private',
    filterTeaching: 'Teaching',
    filterBank: 'Bank',
    applyLink: 'Apply',
    lastDate: 'Last Date',
    loadMoreJobs: 'Load More Jobs',

    // District Info
    districtInfoTitle: 'District Information',
    tabTaluks: 'Taluks',
    tabGovtOffices: 'Govt Offices',
    tabHelplines: 'Helplines',
    tabWeather: 'Weather',
    tabTransport: 'Transport',

    // Tourist Info
    touristTitle: 'Visit Kanyakumari',
    touristSubtitle: "Where three seas meet — the southernmost tip of India",
    topAttractions: 'Top Attractions',
    howToReach: 'How to Reach',
    stayHotels: 'Stay: Hotels & Lodges',
    travelPartner: 'Travel Partner',
    advertiseHere: 'Advertise here →',

    // About
    aboutTitle: 'About Kanyakumari Today',
    contactTitle: 'Contact Us',
    advertiseTitle: 'Advertise With Us',
    followUs: 'Follow Us',
    messageSent: 'Message Sent!',
    messageSentDesc: "We'll get back to you within 24–48 hours.",
    sendAnother: 'Send Another',
    submitBtn: 'Submit',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    message: 'Message',
    writeMessage: 'Write your message here...',

    // Videos
    videosTitle: 'Video News',
    moreVideos: 'More Videos',
    views: 'views',

    // NotFound
    notFoundTitle: '404 – Page Not Found',
    notFoundDesc: 'The page you are looking for does not exist.',
    goHome: 'Go to Home',

    // Badge labels
    badgePremium: 'Premium',
    badgeTrending: 'Trending',
    badgeBreaking: 'Breaking',

    // MostRead widget
    mostReadTitle: 'Most Read',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',

    // Search
    searchTitle: 'Search',
    searchInputPlaceholder: 'Search news, topics, authors...',
    allCategories: 'All categories',
    sortRelevance: 'Relevance',
    sortNewest: 'Newest first',
    sortPopular: 'Most popular',
    searchPrompt: 'Type a keyword above to search across all articles.',
    searchNoResults: 'No results found. Try a different keyword.',
    searchResults: 'results for',

    // Contact
    contactPageTitle: 'Contact Us',
    deptEmails: 'Department Emails',
    newsTips: 'News Tips',
    advertising: 'Advertising',
    careers: 'Careers',
    legal: 'Legal / Press',
    subject: 'Subject',
    subjectPlaceholder: 'News tip / Feedback / Other',
    sendMessage: 'Send Message',

    // Login
    welcomeBack: 'Welcome back',
    signInTo: 'Sign in to Kanyakumari Today',
    emailLogin: 'Email Login',
    otpLogin: 'OTP Login',
    emailAddress2: 'Email address',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    signingIn: 'Signing in...',
    signIn: 'Sign In',
    mobileNumber: 'Mobile number',
    sendingOtp: 'Sending OTP...',
    sendOtp: 'Send OTP',
    otpSentTo: 'OTP sent to',
    enterOtp: 'Enter 6-digit OTP',
    verifying: 'Verifying...',
    verifySignIn: 'Verify & Sign In',
    orText: 'OR',
    continueGoogle: 'Continue with Google',

    // Advertise
    advertisePageTitle: 'Advertise With Us',
    monthlyReaders: 'Monthly Readers',
    pageViews: 'Page Views / Month',
    avgTime: 'Avg. Time on Site',
    mobileAudience: 'Mobile Audience',
    adPackages: 'Advertising Packages',
    mostPopular: 'Most Popular',
    getStarted: 'Get Started',
    customCampaigns: 'For custom campaigns, email us at',

    // Careers
    careersTitle: 'Careers',
    careersIntro: 'Join a newsroom redefining Tamil journalism. We look for passionate storytellers and creators.',
    impactTitle: 'Impact', impactBody: 'Your work reaches millions of Tamil readers daily.',
    cultureTitle: 'Culture', cultureBody: 'Flat hierarchy, open ideas, and a team that respects every voice.',
    growthTitle: 'Growth',  growthBody: 'Learning budgets, conferences, and a clear path to senior roles.',
    currentOpenings: 'Current Openings',
    applyBtn: 'Apply',
    noRoleFit: "Don't see a role? Send your CV to",

    // Legal pages
    privacyTitle: 'Privacy Policy',
    termsTitle: 'Terms of Use',
    disclaimerTitle: 'Disclaimer',
    cookieTitle: 'Cookie Policy',
    lastUpdated: 'Last updated',
    legalDate: 'January 1, 2025',
    welcomeTo: 'Welcome to the',
    welcomeTitle: 'Kanyakumari Live News Update',
    welcomeSubtitle: 'Your trusted source for breaking news, local stories and real-time updates from Kanyakumari district.',
    liveLabel: 'Live',
    liveUpdates: 'Live Updates',
    loadingLiveUpdates: 'Loading live updates…',
    advertisementSlot: 'Advertisement · 468 × 90',

    // Home
    latestNews: 'Latest News',

    // TrendingList
    trendingNow: 'Trending Now',
    mostViewed: 'Most Viewed',
    mostDiscussed: 'Most Discussed',
    viewsSuffix: 'views',
    commentsSuffix: 'comments',

    // CategorySection
    viewAll: 'View all',

    // MostRead
    noViewActivity: 'No view activity for this period.',
    viewsCount: 'views',

    // StockWidget
    markets: 'Markets',
    marketsUnavailable: 'Market data is currently unavailable.',

    // ApiState
    contentUnavailable: 'Content is temporarily unavailable.',
    noContentYet: 'No content available yet.',

    // Article
    newsWord: 'News',
    commentSubmissionNote: 'Comment submission is unavailable until reader sign-in is production-ready.',
    noCommentsYet: 'No approved comments yet.',

    // Category / load
    loadingText: 'Loading…',

    // District Info table headers
    talukCol: 'Taluk',
    hqCol: 'HQ',
    panchayatsCol: 'Panchayats',
    districtDesc: 'Kanyakumari is the southernmost district of Tamil Nadu, at the confluence of three seas.',
    districtHQ: 'Nagercoil',
    districtArea: '1,672 km²',
    districtPop: '~19 Lakh',
    hqLabel: 'HQ',
    areaLabel: 'Area',
    popLabel: 'Pop.',
    emergencyTitle: '⚠ Emergency',
    emergencyDesc: 'Call 100 (Police), 101 (Fire), 108 (Ambulance), 181 (Women).',
    routeCol: 'Route',
    typeCol: 'Type',
    durationCol: 'Duration',
    operatorCol: 'Operator',
    categoriesUnavailable: 'Categories are temporarily unavailable.',

    // Jobs table header
    jobTitleOrg: 'Job Title / Organisation',
    locationCol: 'Location',

    // WeatherWidget
    weatherTitle: 'Weather',
    weatherUnavailable: 'Weather data is currently unavailable.',
    weatherHumidity: 'Humidity',
    weatherWind: 'Wind',

    // TouristInfo hardcoded strings
    howToReachRoadMode: '🚗 Road',
    howToReachRoadDetail: 'NH-44 connects Nagercoil to major cities. Kanyakumari is 88 km from Thiruvananthapuram.',
    howToReachRailMode: '🚂 Rail',
    howToReachRailDetail: 'Kanyakumari Railway Station (CAPE) is the southernmost railway station in India.',
    howToReachAirMode: '✈ Air',
    howToReachAirDetail: 'Nearest airport is Trivandrum International Airport (~90 km).',
    hotelTypeGovt: 'Govt',
    hotelTypePremium: 'Premium',
    hotelTypeBudget: 'Budget',
    hotelTypeMidRange: 'Mid-range',
    adSlot: 'Ad slot — 300×250',

    // StaticPage
    rssFeed: 'RSS Feed',
    usefulLinks: 'Useful Links',
    comingSoon: 'This page is coming soon.',
    advertiseManualDesc: 'The advertisement CMS is not yet available. Contact us to confirm current placements and pricing.',
    aboutMissionBody: 'Empower every citizen of Kanyakumari with timely, accurate, and meaningful local news.',
    aboutVision: 'Our Vision',
    aboutVisionBody: 'To be the most trusted digital news source in Kanyakumari district.',
    aboutValues: 'Our Values',
    aboutValuesBody: 'Accuracy · Independence · Accountability · Community — guiding every story we publish.',
    aboutIntro1: 'Kanyakumari Today delivers timely, accurate, and fair local news for readers across Kanyakumari district.',
    aboutIntro2: 'We cover local politics, civic issues, and the stories that matter to the community.',
    aboutContactDesc: 'For news tips, corrections, or partnership proposals, use our verified contact form.',
    typeFreelance: 'Freelance',
    deptEditorial: 'Editorial',
    deptMultimedia: 'Multimedia',
    deptDigital: 'Digital',
    deptTechnology: 'Technology',
    deptCreative: 'Creative',

    // EPaper
    ePaperTitle: 'E-Paper',
    ePaperUnavailable: 'E-Paper is currently unavailable.',
    ePaperDesc: 'PDF editions will appear here once published.',

    // Contact form placeholders & labels
    namePlaceholder: 'Rajesh Kumar',
    emailPlaceholder: 'you@example.com',
    phoneLabelContact: 'Phone',
    addressLabelContact: 'Address',
    sendingText: 'Sending…',

    // Job type badges (from API values)
    jobTypeGovt: 'Govt',
    jobTypePrivate: 'Private',
    jobTypeTeaching: 'Teaching',
    jobTypeBank: 'Bank',

    // Transport type badges
    transportTrain: 'Train',
    transportBus: 'Bus',

    // Disclaimer sections
    disclaimerS1Title: '1. General Disclaimer',
    disclaimerS1Body: 'Content on Kanyakumari Today is for general informational purposes only.',
    disclaimerS2Title: '2. Accuracy',
    disclaimerS2Body: 'While we strive for accuracy, information may change. We make no warranties about completeness or reliability.',
    disclaimerS3Title: '3. External Links',
    disclaimerS3Body: 'We are not responsible for content on third-party websites we link to.',
    disclaimerS4Title: '4. Professional Advice',
    disclaimerS4Body: 'Nothing on this site constitutes legal, medical, or financial advice.',

    // Terms sections
    termsS1Title: '1. Acceptance',
    termsS1Body: 'By using this site, you agree to these Terms of Use. If you do not agree, please do not use the site.',
    termsS2Title: '2. Prohibited Use',
    termsS2Body: 'Do not republish content without permission. Do not spread misinformation or misuse the platform.',
    termsS3Title: '3. Intellectual Property',
    termsS3Body: 'All content including articles, images, and logos is owned by Kanyakumari Today.',
    termsS4Title: '4. Third-Party Links',
    termsS4Body: 'We are not responsible for content on external linked sites.',
    termsS5Title: '5. Changes',
    termsS5Body: 'We reserve the right to modify these Terms at any time.',

    // Cookie sections
    cookieS1Title: '1. What Are Cookies?',
    cookieS1Body: 'Cookies are small text files stored on your device that help remember your preferences and improve your experience.',
    cookieS2Title: '2. Cookies We Use',
    cookieS2Body: 'We use essential cookies (for site functionality), performance cookies (for analytics), and advertising cookies.',
    cookieS3Title: '3. Managing Cookies',
    cookieS3Body: 'You can disable cookies through your browser settings, though some site features may not work correctly.',
    cookieS4Title: '4. Consent',
    cookieS4Body: 'By continuing to use our site, you consent to our use of cookies as described in this policy.',
  },

  TA: {
    // TopBar
    ePaper: 'மின்-பத்திரிகை',
    login: 'உள்நுழைவு',
    subscribe: 'சந்தா',
    switchLang: 'English',

    // Header
    search: 'தேடு',
    searchPlaceholder: 'கன்னியாகுமரி செய்திகளை தேடுங்கள்...',
    searchBtn: 'தேடு',
    home: 'முகப்பு',
    navKanyakumari: 'கன்னியாகுமரி',
    navTN: 'தமிழ்நாடு',
    navNational: 'தேசிய',
    navWorld: 'உலக',
    navPhoto: 'படங்கள்',
    navVideos: 'வீடியோக்கள்',
    navDistrictInfo: 'மாவட்ட தகவல்',
    navTourist: 'சுற்றுலா',
    navJobs: 'வேலைகள்',
    navLinks: 'இணைப்புகள்',
    tagline: 'கன்னியாகுமரி மாவட்டத்தின் உள்ளூர் செய்திகள்',

    // BreakingTicker
    breaking: 'முக்கிய செய்தி',

    // Home page
    moreLink: 'மேலும் →',
    kanyakumariNews: 'கன்னியாகுமரி செய்திகள்',
    tamilnaduNews: 'தமிழ்நாடு செய்திகள்',
    nationalNews: 'தேசிய செய்திகள்',
    worldNews: 'உலக செய்திகள்',
    districtInfo: 'மாவட்ட தகவல்',
    newsVideos: 'செய்தி வீடியோக்கள்',
    jobsLinks: 'வேலை இணைப்புகள்',
    touristInfo: 'சுற்றுலா தகவல்',
    taluks: 'தாலுகா மற்றும் பஞ்சாயத்துகள்',
    govtOffices: 'அரசு அலுவலகங்கள்',
    emergencyHelplines: 'அவசர உதவி எண்கள்',
    weatherToday: 'இன்றைய வானிலை',
    busTrainSchedule: 'பேருந்து / ரயில் அட்டவணை',
    allJobListings: 'அனைத்து வேலை பட்டியல்',
    vivekanandaRock: 'விவேகானந்தர் பாறை நினைவிடம்',
    thiruvalluvarStatue: 'திருவள்ளுவர் சிலை',
    kumariAmmanTemple: 'குமாரி அம்மன் கோயில்',
    kanyakumariBeach: 'கன்னியாகுமரி கடற்கரை',
    advertisement: 'விளம்பரம்',

    // Footer
    footerTagline: 'கன்னியாகுமரி மாவட்டத்திற்கான சுதந்திரமான உள்ளூர் செய்திகள்.',
    footerNews: 'செய்திகள்',
    footerCompany: 'நிறுவனம்',
    footerAbout: 'எங்களைப் பற்றி',
    footerContact: 'தொடர்பு கொள்ள',
    footerAdvertise: 'விளம்பரம் தர',
    footerCareers: 'வேலைவாய்ப்பு',
    footerPrivacy: 'தனியுரிமை கொள்கை',
    footerDisclaimer: 'மறுப்பு',
    footerCopyright: 'கன்னியாகுமரி டுடே. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    footerTerms: 'பயன்பாட்டு விதிமுறைகள்',
    footerCookies: 'குக்கீ கொள்கை',

    // Category page
    breadcrumbHome: 'முகப்பு',
    loadMore: 'மேலும் காட்டு',
    noArticles: 'கட்டுரைகள் எதுவும் இல்லை',
    allAreas: 'அனைத்தும்',
    photoGallery: 'படக் காட்சியகம்',
    viewGallery: 'படக் காட்சியகம் காண →',

    // Article page
    share: 'பகிர்:',
    comments: 'கருத்துகள்',
    postComment: 'பதிவிடு',
    commentPlaceholder: 'உங்கள் கருத்தை பகிருங்கள்...',
    relatedNews: 'தொடர்புடைய செய்திகள்',
    mostRead: 'அதிகம் படிக்கப்பட்டவை',
    backHome: 'முகப்புக்கு திரும்பு',
    articleNotFound: 'கட்டுரை கிடைக்கவில்லை',
    articleNotFoundDesc: 'இந்த கட்டுரை நகர்த்தப்பட்டிருக்கலாம் அல்லது நீக்கப்பட்டிருக்கலாம்.',
    minutesRead: 'நிமிட வாசிப்பு',
    photo: 'படம்',

    // Gallery
    photoGalleryTitle: 'படக் காட்சியகம்',
    albumAll: 'அனைத்தும்',
    albumEvents: 'நிகழ்வுகள்',
    albumFestivals: 'திருவிழாக்கள்',
    albumNature: 'இயற்கை',
    albumNews: 'செய்திகள்',

    // Jobs
    jobsTitle: 'வேலைகள் மற்றும் அரசு அறிவிப்புகள்',
    filterLatest: 'புதியவை',
    filterGovt: 'அரசு',
    filterPrivate: 'தனியார்',
    filterTeaching: 'ஆசிரியர்',
    filterBank: 'வங்கி',
    applyLink: 'விண்ணப்பி',
    lastDate: 'கடைசி தேதி',
    loadMoreJobs: 'மேலும் வேலைகள்',

    // District Info
    districtInfoTitle: 'மாவட்ட தகவல்கள்',
    tabTaluks: 'தாலுகாக்கள்',
    tabGovtOffices: 'அரசு அலுவலகங்கள்',
    tabHelplines: 'உதவி எண்கள்',
    tabWeather: 'வானிலை',
    tabTransport: 'போக்குவரத்து',

    // Tourist Info
    touristTitle: 'கன்னியாகுமரிக்கு வருக',
    touristSubtitle: 'மூன்று கடல்கள் சங்கமிக்கும் இடம் — இந்தியாவின் தென்கோடி',
    topAttractions: 'முக்கிய சுற்றுலா இடங்கள்',
    howToReach: 'எப்படி வருவது',
    stayHotels: 'தங்குமிடங்கள் மற்றும் ஓட்டல்கள்',
    travelPartner: 'பயண கூட்டாளி',
    advertiseHere: 'இங்கே விளம்பரம் →',

    // About
    aboutTitle: 'கன்னியாகுமரி டுடே பற்றி',
    contactTitle: 'தொடர்பு கொள்ள',
    advertiseTitle: 'எங்களுடன் விளம்பரம் தர',
    followUs: 'எங்களை பின்தொடருங்கள்',
    messageSent: 'செய்தி அனுப்பப்பட்டது!',
    messageSentDesc: '24–48 மணி நேரத்தில் பதில் அனுப்புவோம்.',
    sendAnother: 'மீண்டும் அனுப்பு',
    submitBtn: 'சமர்ப்பி',
    yourName: 'உங்கள் பெயர்',
    emailAddress: 'மின்னஞ்சல் முகவரி',
    message: 'செய்தி',
    writeMessage: 'உங்கள் செய்தியை இங்கே எழுதுங்கள்...',

    // Videos
    videosTitle: 'செய்தி வீடியோக்கள்',
    moreVideos: 'மேலும் வீடியோக்கள்',
    views: 'பார்வைகள்',

    // NotFound
    notFoundTitle: '404 – பக்கம் கிடைக்கவில்லை',
    notFoundDesc: 'நீங்கள் தேடும் பக்கம் இல்லை.',
    goHome: 'முகப்புக்கு செல்',

    // MostRead widget
    mostReadTitle: 'அதிகம் படிக்கப்பட்டவை',
    daily: 'இன்று',
    weekly: 'வாரம்',
    monthly: 'மாதம்',

    // Search
    searchTitle: 'தேடல்',
    searchInputPlaceholder: 'செய்திகள், தலைப்புகள், ஆசிரியர்களை தேடுங்கள்...',
    allCategories: 'அனைத்து பிரிவுகள்',
    sortRelevance: 'தொடர்பு',
    sortNewest: 'புதியவை முதலில்',
    sortPopular: 'அதிகம் பார்க்கப்பட்டவை',
    searchPrompt: 'அனைத்து கட்டுரைகளிலும் தேட மேலே ஒரு முக்கியச்சொல் தட்டச்சு செய்யுங்கள்.',
    searchNoResults: 'முடிவுகள் இல்லை. வேறு முக்கியச்சொல் முயற்சிக்கவும்.',
    searchResults: 'முடிவுகள்',

    // Contact
    contactPageTitle: 'தொடர்பு கொள்ள',
    deptEmails: 'துறை மின்னஞ்சல்கள்',
    newsTips: 'செய்தி குறிப்புகள்',
    advertising: 'விளம்பரம்',
    careers: 'வேலைவாய்ப்பு',
    legal: 'சட்ட / பத்திரிகை',
    subject: 'பொருள்',
    subjectPlaceholder: 'செய்தி குறிப்பு / கருத்து / பிற',
    sendMessage: 'செய்தி அனுப்பு',

    // Login
    welcomeBack: 'மீண்டும் வருக',
    signInTo: 'கன்னியாகுமரி டுடேயில் உள்நுழைக',
    emailLogin: 'மின்னஞ்சல் உள்நுழைவு',
    otpLogin: 'OTP உள்நுழைவு',
    emailAddress2: 'மின்னஞ்சல் முகவரி',
    password: 'கடவுச்சொல்',
    forgotPassword: 'கடவுச்சொல் மறந்தீர்களா?',
    signingIn: 'உள்நுழைகிறது...',
    signIn: 'உள்நுழைவு',
    mobileNumber: 'கைபேசி எண்',
    sendingOtp: 'OTP அனுப்புகிறது...',
    sendOtp: 'OTP அனுப்பு',
    otpSentTo: 'OTP அனுப்பப்பட்டது',
    enterOtp: '6 இலக்க OTP உள்ளிடுக',
    verifying: 'சரிபார்க்கிறது...',
    verifySignIn: 'சரிபார்த்து உள்நுழைக',
    orText: 'அல்லது',
    continueGoogle: 'Google மூலம் தொடர்க',

    // Advertise
    advertisePageTitle: 'எங்களுடன் விளம்பரம் தர',
    monthlyReaders: 'மாத வாசகர்கள்',
    pageViews: 'பக்க பார்வைகள் / மாதம்',
    avgTime: 'சராசரி தள நேரம்',
    mobileAudience: 'மொபைல் பார்வையாளர்கள்',
    adPackages: 'விளம்பர தொகுப்புகள்',
    mostPopular: 'மிகவும் பிரபலம்',
    getStarted: 'தொடங்குங்கள்',
    customCampaigns: 'தனிப்பயன் பிரச்சாரங்களுக்கு, எங்களுக்கு மின்னஞ்சல் அனுப்புங்கள்',

    // Careers
    careersTitle: 'வேலைவாய்ப்பு',
    careersIntro: 'தமிழ் பத்திரிகையை புதுப்பிக்கும் செய்தியகத்தில் சேருங்கள். ஆர்வமுள்ள கதை சொல்லிகளை நாங்கள் தேடுகிறோம்.',
    impactTitle: 'தாக்கம்',  impactBody: 'உங்கள் பணி தினமும் மில்லியன் கணக்கான தமிழ் வாசகர்களை சென்றடைகிறது.',
    cultureTitle: 'கலாச்சாரம்', cultureBody: 'தட்டையான படிநிலை, திறந்த கருத்துக்கள், ஒவ்வொரு குரலையும் மதிக்கும் குழு.',
    growthTitle: 'வளர்ச்சி',  growthBody: 'கற்றல் நிதி, மாநாடுகள், மற்றும் மூத்த பதவிகளுக்கான தெளிவான பாதை.',
    currentOpenings: 'தற்போதைய வேலை வாய்ப்புகள்',
    applyBtn: 'விண்ணப்பி',
    noRoleFit: 'பொருத்தமான பதவி இல்லையா? உங்கள் CV ஐ அனுப்புங்கள்',

    // Legal pages
    privacyTitle: 'தனியுரிமை கொள்கை',
    termsTitle: 'பயன்பாட்டு விதிமுறைகள்',
    disclaimerTitle: 'மறுப்பு',
    cookieTitle: 'குக்கீ கொள்கை',
    lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
    legalDate: 'ஜனவரி 1, 2025',
    welcomeTo: 'வரவேற்கிறோம்',
    welcomeTitle: 'கன்னியாகுமரி நேரலை செய்தி புதுப்பிப்பு',
    welcomeSubtitle: 'கன்னியாகுமரி மாவட்டத்திற்கான நம்பகமான உள்ளூர் செய்திகள், நேரலை புதுப்பிப்புகள்.',
    liveLabel: 'நேரலை',
    liveUpdates: 'நேரலை புதுப்பிப்புகள்',
    loadingLiveUpdates: 'நேரலை புதுப்பிப்புகள் ஏற்றப்படுகின்றன…',
    advertisementSlot: 'விளம்பரம் · 468 × 90',

    // Home
    latestNews: 'சமீபத்திய செய்திகள்',

    // TrendingList
    trendingNow: 'இப்போது பரவலாக பேசப்படுவை',
    mostViewed: 'அதிகம் பார்க்கப்பட்டவை',
    mostDiscussed: 'அதிகம் விவாதிக்கப்பட்டவை',
    viewsSuffix: 'பார்வைகள்',
    commentsSuffix: 'கருத்துகள்',

    // CategorySection
    viewAll: 'அனைத்தும் காண',

    // MostRead
    noViewActivity: 'இந்த காலகட்டத்தில் பார்வை தகவல் இல்லை.',
    viewsCount: 'பார்வைகள்',

    // StockWidget
    markets: 'சந்தைகள்',
    marketsUnavailable: 'சந்தை தரவு தற்போது கிடைக்கவில்லை.',

    // ApiState
    contentUnavailable: 'உள்ளடக்கம் தற்காலிகமாக கிடைக்கவில்லை.',
    noContentYet: 'இன்னும் உள்ளடக்கம் எதுவும் இல்லை.',

    // Article
    newsWord: 'செய்திகள்',
    commentSubmissionNote: 'வாசகர் உள்நுழைவு தயாரானதும் கருத்து சமர்ப்பிக்கலாம்.',
    noCommentsYet: 'இன்னும் கருத்துகள் எதுவும் இல்லை.',

    // Category / load
    loadingText: 'ஏற்றப்படுகிறது…',

    // District Info table headers
    talukCol: 'தாலுகா',
    hqCol: 'தலைமையிடம்',
    panchayatsCol: 'பஞ்சாயத்துகள்',
    districtDesc: 'கன்னியாகுமரி தமிழ்நாட்டின் தென்கோடி மாவட்டம், மூன்று கடல்கள் சங்கமிக்கும் இடம்.',
    districtHQ: 'நாகர்கோவில்',
    districtArea: '1,672 கி.மீ²',
    districtPop: '~19 லட்சம்',
    hqLabel: 'தலைமையிடம்',
    areaLabel: 'பரப்பளவு',
    popLabel: 'மக்கள்தொகை',
    emergencyTitle: '⚠ அவசரநிலை',
    emergencyDesc: '100 (காவல்துறை), 101 (தீயணைப்பு), 108 (ஆம்புலன்ஸ்), 181 (பெண்கள்) என்று அழைக்கவும்.',
    routeCol: 'வழித்தடம்',
    typeCol: 'வகை',
    durationCol: 'கால அளவு',
    operatorCol: 'இயக்குநர்',
    categoriesUnavailable: 'பிரிவுகள் தற்காலிகமாக கிடைக்கவில்லை.',

    // Jobs table header
    jobTitleOrg: 'வேலை தலைப்பு / நிறுவனம்',
    locationCol: 'இடம்',

    // WeatherWidget
    weatherTitle: 'வானிலை',
    weatherUnavailable: 'வானிலைத் தகவல் தற்போது கிடைக்கவில்லை.',
    weatherHumidity: 'ஈரப்பதம்',
    weatherWind: 'காற்று வேகம்',

    // TouristInfo hardcoded strings
    howToReachRoadMode: '🚗 சாலை வழி',
    howToReachRoadDetail: 'NH-44 நாகர்கோவிலை முக்கிய நகரங்களுடன் இணைக்கிறது. கன்னியாகுமரி திருவனந்தபுரத்திலிருந்து 88 கி.மீ.',
    howToReachRailMode: '🚂 ரயில் வழி',
    howToReachRailDetail: 'கன்னியாகுமரி ரயில் நிலையம் (CAPE) இந்தியாவின் தென்கோடி ரயில் நிலையம்.',
    howToReachAirMode: '✈ விமான வழி',
    howToReachAirDetail: 'அருகிலுள்ள விமான நிலையம் திருவனந்தபுரம் சர்வதேச விமான நிலையம் (~90 கி.மீ).',
    hotelTypeGovt: 'அரசு',
    hotelTypePremium: 'உயர்தர',
    hotelTypeBudget: 'குறைந்த விலை',
    hotelTypeMidRange: 'நடுத்தர விலை',
    adSlot: 'விளம்பர இடம் — 300×250',

    // StaticPage
    rssFeed: 'RSS ஊட்டம்',
    usefulLinks: 'பயனுள்ள இணைப்புகள்',
    comingSoon: 'இந்த பக்கம் விரைவில் கிடைக்கும்.',
    advertiseManualDesc: 'விளம்பர CMS இன்னும் கிடைக்கவில்லை. தற்போதைய இடங்கள் மற்றும் விலை விவரங்களுக்கு எங்களை தொடர்பு கொள்ளுங்கள்.',
    aboutMissionBody: 'கன்னியாகுமரியின் ஒவ்வொரு குடிமகனையும் சரியான நேரத்தில் துல்லியமான மற்றும் அர்த்தமுள்ள உள்ளூர் செய்திகளுடன் சக்திவாய்ப்படுத்துவது.',
    aboutVision: 'எங்கள் தரிசனம்',
    aboutVisionBody: 'கன்னியாகுமரி மாவட்டத்தில் மிகவும் நம்பகமான டிஜிட்டல் செய்தி ஆதாரமாக இருப்பது.',
    aboutValues: 'எங்கள் மதிப்புகள்',
    aboutValuesBody: 'துல்லியம் · சுதந்திரம் · பொறுப்புணர்வு · சமூகம் — நாங்கள் வெளியிடும் ஒவ்வொரு கட்டுரையும் இந்த நான்கு தூண்களால் வழிநடத்தப்படுகின்றன.',
    aboutIntro1: 'கன்னியாகுமரி டுடே கன்னியாகுமரி மாவட்ட வாசகர்களுக்கு விரைவான, துல்லியமான மற்றும் நேர்மையான உள்ளூர் செய்திகளை வழங்குகிறது.',
    aboutIntro2: 'உள்ளூர் அரசியல், குடிமைப் பிரச்சினைகள் மற்றும் சமூகத்திற்கு முக்கியமான செய்திகளை நாங்கள் உள்ளடக்குகிறோம்.',
    aboutContactDesc: 'செய்தி குறிப்பு, திருத்தம் அல்லது கூட்டாண்மை முன்மொழிவுக்கு எங்கள் தொடர்பு படிவத்தைப் பயன்படுத்துங்கள்.',
    typeFreelance: 'ஃப்ரீலான்ஸ்',
    deptEditorial: 'தலையங்கம்',
    deptMultimedia: 'மல்டிமீடியா',
    deptDigital: 'டிஜிட்டல்',
    deptTechnology: 'தொழில்நுட்பம்',
    deptCreative: 'படைப்பாற்றல்',

    // EPaper
    ePaperTitle: 'மின்-பத்திரிகை',
    ePaperUnavailable: 'மின்-பத்திரிகை தற்போது கிடைக்கவில்லை.',
    ePaperDesc: 'PDF பதிப்புகள் வெளியிடப்பட்டவுடன் இங்கே தோன்றும்.',

    // Contact form placeholders & labels
    namePlaceholder: 'ராஜேஷ் குமார்',
    emailPlaceholder: 'neenga@example.com',
    phoneLabelContact: 'தொலைபேசி',
    addressLabelContact: 'முகவரி',
    sendingText: 'அனுப்புகிறது…',

    // Job type badges
    jobTypeGovt: 'அரசு',
    jobTypePrivate: 'தனியார்',
    jobTypeTeaching: 'கல்வி',
    jobTypeBank: 'வங்கி',

    // Transport type badges
    transportTrain: 'ரயில்',
    transportBus: 'பேருந்து',

    // Disclaimer sections
    disclaimerS1Title: '1. பொது மறுப்பு',
    disclaimerS1Body: 'கன்னியாகுமரி டுடே வழங்கும் செய்திகள் மற்றும் தகவல்கள் பொது தகவல் நோக்கங்களுக்காக மட்டுமே.',
    disclaimerS2Title: '2. துல்லியம்',
    disclaimerS2Body: 'தகவல்களை துல்லியமாக வைக்க முயற்சிக்கிறோம். ஆனால் சில நேரங்களில் தகவல்கள் மாறியிருக்கலாம்.',
    disclaimerS3Title: '3. வெளி இணைப்புகள்',
    disclaimerS3Body: 'வெளி தளங்களின் உள்ளடக்கத்திற்கு நாங்கள் பொறுப்பேற்க மாட்டோம்.',
    disclaimerS4Title: '4. தொழில்முறை ஆலோசனை',
    disclaimerS4Body: 'இந்த தளத்தின் எந்த உள்ளடக்கமும் சட்ட, மருத்துவ அல்லது நிதி ஆலோசனையாக கருதப்படக்கூடாது.',

    // Terms sections
    termsS1Title: '1. ஏற்பு',
    termsS1Body: 'இந்த தளத்தை பயன்படுத்துவதன் மூலம், இந்த விதிமுறைகளை ஏற்கிறீர்கள். ஏற்கவில்லை என்றால் தளத்தை பயன்படுத்த வேண்டாம்.',
    termsS2Title: '2. அனுமதிக்கப்படாத பயன்பாடு',
    termsS2Body: 'உள்ளடக்கத்தை முன் அனுமதியின்றி மீண்டும் வெளியிட வேண்டாம். தவறான தகவல்களை பரப்பவோ தளத்தை தவறாக பயன்படுத்தவோ வேண்டாம்.',
    termsS3Title: '3. அறிவுசார் சொத்துரிமை',
    termsS3Body: 'கட்டுரைகள், படங்கள், லோகோக்கள் உட்பட அனைத்து உள்ளடக்கமும் கன்னியாகுமரி டுடேக்கு சொந்தமானது.',
    termsS4Title: '4. மூன்றாம் தரப்பு இணைப்புகள்',
    termsS4Body: 'வெளி இணைப்புகளுக்கான உள்ளடக்கத்திற்கு நாங்கள் பொறுப்பேற்க மாட்டோம்.',
    termsS5Title: '5. மாற்றங்கள்',
    termsS5Body: 'இந்த விதிமுறைகளை எந்த நேரத்திலும் மாற்றுவதற்கான உரிமை எங்களுக்கு உள்ளது.',

    // Cookie sections
    cookieS1Title: '1. குக்கீகள் என்றால் என்ன?',
    cookieS1Body: 'குக்கீகள் என்பது உங்கள் சாதனத்தில் சேமிக்கப்படும் சிறிய உரை கோப்புகள். இவை உங்கள் விருப்பங்களை நினைவில் வைக்க உதவுகின்றன.',
    cookieS2Title: '2. நாங்கள் பயன்படுத்தும் குக்கீகள்',
    cookieS2Body: 'அத்தியாவசிய குக்கீகள் (தள செயல்பாட்டிற்கு), செயல்திறன் குக்கீகள் (பகுப்பாய்வுக்கு), மற்றும் விளம்பர குக்கீகள் ஆகியவற்றை பயன்படுத்துகிறோம்.',
    cookieS3Title: '3. குக்கீகளை நிர்வகிக்கவும்',
    cookieS3Body: 'உங்கள் உலாவி அமைப்புகள் மூலம் குக்கீகளை முடக்கலாம். ஆனால் சில தள அம்சங்கள் சரியாக வேலை செய்யாமல் போகலாம்.',
    cookieS4Title: '4. ஒப்புதல்',
    cookieS4Body: 'இந்த தளத்தை தொடர்ந்து பயன்படுத்துவதன் மூலம் குக்கீ பயன்பாட்டிற்கு ஒப்புதல் அளிக்கிறீர்கள்.',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('kk-lang') || 'EN')

  function toggleLang() {
    setLang((l) => {
      const next = l === 'EN' ? 'TA' : 'EN'
      localStorage.setItem('kk-lang', next)
      // Switch Tamil/English font on <html> for proper rendering
      document.documentElement.setAttribute('lang', next === 'TA' ? 'ta' : 'en')
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

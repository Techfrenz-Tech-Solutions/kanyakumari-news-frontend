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

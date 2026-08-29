import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar from './components/layout/TopBar.jsx'
import Header from './components/layout/Header.jsx'
import BreakingTicker from './components/layout/BreakingTicker.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Article from './pages/Article.jsx'
import Category from './pages/Category.jsx'
import Search from './pages/Search.jsx'
import Gallery from './pages/Gallery.jsx'
import VideoPage from './pages/VideoPage.jsx'
import DistrictInfo from './pages/DistrictInfo.jsx'
import TouristInfo from './pages/TouristInfo.jsx'
import Jobs from './pages/Jobs.jsx'
import EPaper from './pages/EPaper.jsx'
import NotFound from './pages/NotFound.jsx'
import StaticPage from './pages/StaticPage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import Advertise from './pages/Advertise.jsx'
import Careers from './pages/Careers.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <TopBar />
      <Header />
      <BreakingTicker />

      <main className="flex-1">
        <Routes>
          {/* Core pages */}
          <Route path="/"                element={<Home />} />
          <Route path="/article/:slug"   element={<Article />} />
          <Route path="/category/:slug"  element={<Category />} />
          <Route path="/search"          element={<Search />} />

          {/* Media */}
          <Route path="/gallery"         element={<Gallery />} />
          <Route path="/videos"          element={<VideoPage />} />

          {/* District pages — PDF nav items */}
          <Route path="/district-info"   element={<DistrictInfo />} />
          <Route path="/tourist-info"    element={<TouristInfo />} />
          <Route path="/jobs"            element={<Jobs />} />
          <Route path="/links"           element={<StaticPage title="Useful Links" />} />

          {/* E-paper & auth */}
          <Route path="/e-paper"         element={<EPaper />} />

          {/* About / Contact — combined per PDF wireframe */}
          <Route path="/about"           element={<AboutUs />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/advertise"       element={<Advertise />} />
          <Route path="/careers"         element={<Careers />} />

          {/* Legal */}
          <Route path="/privacy"         element={<PrivacyPolicy />} />
          <Route path="/terms"           element={<TermsOfUse />} />
          <Route path="/disclaimer"      element={<Disclaimer />} />
          <Route path="/cookies"         element={<CookiePolicy />} />
          <Route path="/rss"             element={<StaticPage title="RSS Feed" />} />

          <Route path="*"                element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

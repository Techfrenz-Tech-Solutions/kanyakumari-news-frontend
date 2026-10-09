import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiSend, FiMail, FiPhone } from 'react-icons/fi'
import { useLang } from '../../context/LanguageContext.jsx'
import { usePublicContent } from '../../context/PublicContentContext.jsx'
import { localizedTaxonomyLabel } from '../../utils/localization.js'

// WhatsApp SVG icon
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// Google News SVG icon
function GoogleNewsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path fill="#4285F4" d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0z"/>
      <path fill="white" d="M9.5 7h9v2h-9zm0 4h9v2h-9zm0 4h6v2h-6zM5.5 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/>
    </svg>
  )
}

export default function Footer() {
  const { lang, t } = useLang()
  const { categories, site } = usePublicContent()

  const catLabel = (c) => localizedTaxonomyLabel(c, lang)
  const ALL_CATS = categories.map((c) => ({ label: catLabel(c), to: `/category/${c.slug}` }))

  // Split categories across 4 columns
  const chunkSize = Math.ceil(ALL_CATS.length / 4)
  const COL1 = ALL_CATS.slice(0, chunkSize)
  const COL2 = ALL_CATS.slice(chunkSize, chunkSize * 2)
  const COL3 = ALL_CATS.slice(chunkSize * 2, chunkSize * 3)
  const COL4 = ALL_CATS.slice(chunkSize * 3)

  const SOCIAL = [
    { icon: <FiFacebook size={13} />,  label: 'Facebook',    href: site?.social?.facebook  || '#', bg: '#1877F2' },
    // { icon: <FiTwitter  size={13} />,  label: 'Twitter/X',   href: site?.social?.twitter   || '#', bg: '#000000' },
    // { icon: <FiYoutube  size={13} />,  label: 'YouTube',     href: site?.social?.youtube   || '#', bg: '#FF0000' },
    { icon: <FiInstagram size={13} />, label: 'Instagram',   href: site?.social?.instagram || '#', bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' },
    // { icon: <FiSend     size={13} />,  label: 'Telegram',    href: site?.social?.telegram  || '#', bg: '#229ED9' },
    { icon: <WhatsAppIcon />,          label: 'WhatsApp',    href: 'https://wa.me/918870005541', bg: '#25D366' },
    // { icon: <GoogleNewsIcon />,        label: 'Google News', href: site?.social?.googlenews|| '#', bg: '#4285F4' },
  ]

  const COL_LINKS = [
    { heading: t.footerColNews,    links: COL1 },
    { heading: t.footerColSpecial, links: COL2 },
    { heading: t.footerColCinema,  links: COL3 },
    { heading: t.footerColMore,    links: COL4 },
    {
      heading: t.footerColVideos,
      links: [
        { label: lang === 'TA' ? 'அரசியல்'  : 'Politics',     to: '/category/politics'  },
        { label: lang === 'TA' ? 'சினிமா'   : 'Cinema',       to: '/category/cinema'    },
        { label: lang === 'TA' ? 'விளையாட்டு': 'Sports',      to: '/category/sports'    },
        { label: lang === 'TA' ? 'பொது'     : 'General',      to: '/category/general'   },
      ],
    },
  ]

  return (
    <footer className="mt-12 text-white/80" style={{ background: '#0B1A3B' }}>

      {/* ── Main grid ── */}
      <div className="container-page pt-10 pb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">

        {/* ── Col 0: Brand block ── */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
          {/* Logo */}
          <Link to="/">
            <img src="/logo.png" alt={site?.siteName || 'Kanyakumari Today'} className="h-14 w-auto object-contain" />
          </Link>

          {/* Contact info */}
          <div className="space-y-2">
            <a href="mailto:kanyakumaritoday2026@gmail.com"
              className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
              <FiMail size={13} className="shrink-0" />
              <span className="break-all">kanyakumaritoday2026@gmail.com</span>
            </a>
            <a href="tel:+918870005541"
              className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
              <FiPhone size={13} className="shrink-0" />
              <span>88700 05541</span>
            </a>
          </div>

          {/* Follow us label + social icons */}
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-3">{t.footerFollowUs}</p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ icon, label, href, bg }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 overflow-hidden"
                  style={{ background: bg }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cols 1–5: Link columns ── */}
        {COL_LINKS.map((col) => (
          <div key={col.heading}>
            <p className="text-base font-bold text-white mb-3">{col.heading}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-sm text-white/50 flex-wrap">
          <Link to="/about"      className="hover:text-white transition-colors">{t.footerAboutUs}</Link>
          <span className="hidden sm:inline text-white/20">|</span>
          <Link to="/contact"    className="hover:text-white transition-colors">{t.footerContactUs}</Link>
          <span className="hidden sm:inline text-white/20">|</span>
          <Link to="/advertise"  className="hover:text-white transition-colors">{t.footerAdvertiseLink}</Link>
          <span className="hidden sm:inline text-white/20">|</span>
          <Link to="/terms"      className="hover:text-white transition-colors">{t.footerTermsLink}</Link>
          <span className="hidden sm:inline text-white/20">|</span>
          <Link to="/privacy"    className="hover:text-white transition-colors">{t.footerPrivacyLink}</Link>
        </div>
        <div className="container-page pb-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-white/30">
          <span>{t.footerCopyrightLabel} © {new Date().getFullYear()}, {site?.siteName || 'Kanyakumari Today'}</span>
          <span>
            {t.footerDevelopedBy}{' '}
            <a href="https://techfrenz.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              TechFrenz
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

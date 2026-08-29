import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useLang } from '../../context/LanguageContext.jsx'
import { usePublicContent } from '../../context/PublicContentContext.jsx'

export default function Footer() {
  const { t } = useLang()
  const { categories, site } = usePublicContent()

  const NAV_LINKS = [
    ...categories.map((category) => ({ label: category.label, to: `/category/${category.slug}` })),
    { label: t.navPhoto,        to: '/gallery'              },
    { label: t.navVideos,       to: '/videos'               },
    { label: t.navDistrictInfo, to: '/district-info'        },
    { label: t.navTourist,      to: '/tourist-info'         },
    { label: t.navJobs,         to: '/jobs'                 },
  ]

  const COMPANY_LINKS = [
    { label: t.footerAbout,     to: '/about'    },
    { label: t.footerContact,   to: '/contact'  },
    { label: t.footerAdvertise, to: '/advertise'},
    { label: t.footerCareers,   to: '/careers'  },
    { label: t.footerPrivacy,   to: '/privacy'  },
    { label: t.footerDisclaimer,to: '/disclaimer'},
  ]

  return (
    <footer className="bg-ink dark:bg-black text-white/70 mt-12">
      <div className="container-page py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand + address */}
        <div>
          <Link to="/" className="inline-block mb-3">
            <span className="font-display text-2xl font-black text-white">
              {site?.siteName || 'Kanyakumari Today'}
            </span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-4">{t.footerTagline}</p>
          <div className="flex gap-3">
            {[
              { Icon: FiFacebook,  label: 'Facebook',  href: site?.social?.facebook },
              { Icon: FiTwitter,   label: 'Twitter/X', href: site?.social?.twitter },
              { Icon: FiInstagram, label: 'Instagram', href: site?.social?.instagram },
              { Icon: FiYoutube,   label: 'YouTube',   href: site?.social?.youtube },
            ].filter((item) => item.href).map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-primary hover:border-primary transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div className="mt-5 space-y-2 text-xs text-white/40">
            {site?.address && <p className="flex items-start gap-2"><FiMapPin size={12} className="shrink-0 mt-0.5" /> {site.address}</p>}
            {site?.contactPhone && <p className="flex items-center gap-2"><FiPhone size={12} /> {site.contactPhone}</p>}
            {site?.contactEmail && <p className="flex items-center gap-2"><FiMail size={12} /> {site.contactEmail}</p>}
          </div>
        </div>

        {/* News nav */}
        <div>
          <p className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">{t.footerNews}</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company links */}
        <div>
          <p className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">{t.footerCompany}</p>
          <ul className="space-y-2">
            {COMPANY_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <span>© {new Date().getFullYear()} {t.footerCopyright}</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-white/70 transition-colors">{t.footerTerms}</Link>
            <Link to="/cookies" className="hover:text-white/70 transition-colors">{t.footerCookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

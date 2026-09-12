import { useLang } from '../context/LanguageContext.jsx'

export default function TermsOfUse() {
  const { t } = useLang()

  const sections = [
    {
      title: '1. Acceptance of Terms',
      body: 'By accessing or using Kanyakumari Today, you agree to be bound by these Terms of Use and our Privacy Policy.',
      points: [
        'Continued use of the site constitutes acceptance of any updated terms',
        'These terms apply to all visitors, subscribers, and registered users',
        'If you disagree with any part, please discontinue use of the site immediately',
        'We reserve the right to update these terms at any time without prior notice',
      ],
    },
    {
      title: '2. Prohibited Use',
      body: 'You agree not to misuse this platform in any way that violates applicable laws or infringes on the rights of others.',
      points: [
        'Do not copy, republish, or distribute content without prior written permission',
        'Do not spread misinformation, fake news, or deliberately misleading content',
        'Do not use bots, scrapers, or automated tools to extract data from the site',
        'Do not impersonate other users, journalists, or public figures on this platform',
      ],
    },
    {
      title: '3. Intellectual Property',
      body: 'All content published on Kanyakumari Today is our exclusive intellectual property or that of our licensed contributors.',
      points: [
        'Articles, photographs, videos, and graphics are protected by copyright law',
        'The Kanyakumari Today name, logo, and branding may not be used without permission',
        'Content shared on social media must include proper attribution and a source link',
        'Unauthorised reproduction may result in legal action under Indian copyright law',
      ],
    },
    {
      title: '4. Third-Party Links & Content',
      body: 'Our site may link to external websites or display content from third-party sources.',
      points: [
        'External links do not constitute endorsement of those websites or their content',
        'We are not responsible for the accuracy or availability of third-party sites',
        'Review the privacy policy of any external site before sharing personal information',
        'Embedded social media content is governed by the respective platform\'s own terms',
      ],
    },
    {
      title: '5. Limitation of Liability',
      body: 'To the fullest extent permitted by law, Kanyakumari Today shall not be liable for damages arising from use of this site.',
      points: [
        'We are not liable for errors, omissions, or inaccuracies in published content',
        'We are not responsible for service interruptions, downtime, or data loss',
        'We disclaim liability for decisions made based on information found on this site',
        'Our total liability in any matter shall not exceed the amount paid for a subscription',
      ],
    },
    {
      title: '6. Governing Law',
      body: 'These Terms shall be governed by the laws of India and subject to the jurisdiction of Tamil Nadu courts.',
      points: [
        'Any disputes shall be resolved under Indian law in Tamil Nadu courts',
        'You consent to the personal jurisdiction of courts in Kanyakumari district',
        'Disputes may first be referred to mediation before formal legal proceedings',
        'These terms represent the entire agreement between you and Kanyakumari Today',
      ],
    },
  ]

  return (
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.termsTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-3" />
      <p className="text-sm text-ink-soft mb-8">{t.lastUpdated}: {t.legalDate}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((s) => (
          <div key={s.title} className="bg-gray-50 rounded-lg p-6 border border-black/5">
            <h2 className="font-bold text-base text-ink mb-3 border-l-4 border-primary pl-3">{s.title}</h2>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">{s.body}</p>
            <ul className="space-y-2">
              {s.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-ink-soft">
        Questions? Contact us at{' '}
        <a href="mailto:legal@kanyakumaritoday.com" className="text-primary hover:underline">legal@kanyakumaritoday.com</a>
      </div>
    </div>
  )
}

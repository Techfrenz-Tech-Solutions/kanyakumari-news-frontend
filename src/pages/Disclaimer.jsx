import { useLang } from '../context/LanguageContext.jsx'

export default function Disclaimer() {
  const { t } = useLang()

  const sections = [
    {
      title: '1. General Disclaimer',
      body: 'Content on Kanyakumari Today is published for general informational and news reporting purposes only.',
      points: [
        'Information is provided "as is" without any warranty of accuracy or completeness',
        'We do not guarantee the suitability of content for any particular purpose',
        'Readers are encouraged to independently verify any information before acting on it',
        'We disclaim all liability for any loss or damage arising from reliance on our content',
      ],
    },
    {
      title: '2. Accuracy of Information',
      body: 'We strive to publish accurate and timely news, but errors and omissions may occur.',
      points: [
        'News reporting is time-sensitive and information may change after publication',
        'We review and correct factual errors as soon as they are brought to our attention',
        'Corrections are clearly noted on the original article when published',
        'Contact editorial@kanyakumaritoday.com to report an inaccuracy',
      ],
    },
    {
      title: '3. External Links',
      body: 'We may link to third-party websites for convenience, but we are not responsible for their content.',
      points: [
        'Links to external sites do not constitute endorsement or approval of those sites',
        'We have no control over the content, accuracy, or availability of external sites',
        'We accept no responsibility for loss or damage from accessing third-party links',
        'Review the terms and privacy policy of any external site you visit',
      ],
    },
    {
      title: '4. Professional Advice',
      body: 'Nothing on this site constitutes professional legal, medical, financial, or investment advice.',
      points: [
        'Health-related articles are for informational purposes only — consult a doctor',
        'Legal articles do not constitute legal counsel — consult a qualified lawyer',
        'Financial content is not investment advice — consult a certified advisor',
        'We are not liable for decisions made based on content published on this site',
      ],
    },
    {
      title: '5. User-Generated Content',
      body: 'Reader comments and submissions reflect the views of individual contributors, not Kanyakumari Today.',
      points: [
        'User comments do not represent the editorial position of Kanyakumari Today',
        'We reserve the right to moderate or remove content that violates our guidelines',
        'We are not responsible for offensive, defamatory, or inaccurate user submissions',
        'Report inappropriate content to moderation@kanyakumaritoday.com',
      ],
    },
    {
      title: '6. Changes to This Disclaimer',
      body: 'We reserve the right to update this disclaimer at any time. Changes take effect upon publication.',
      points: [
        'Continued use of the site after changes constitutes acceptance of the revised disclaimer',
        'We encourage you to review this page periodically to stay informed',
        'Material changes will be highlighted on the site for a period of 30 days',
        'The date at the top of this page reflects when it was last updated',
      ],
    },
  ]

  return (
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.disclaimerTitle}</h1>
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

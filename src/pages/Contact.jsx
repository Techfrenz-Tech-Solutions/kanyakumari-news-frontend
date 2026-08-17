import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <div className="container-page py-12 max-w-5xl">
      <h1 className="section-title mb-2">{t.contactPageTitle}</h1>
      <span className="h-1 w-16 bg-primary block mb-8" />

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {[
            { Icon: FiMail,   label: t.emailAddress, value: 'contact@kanyakumaritoday.com' },
            { Icon: FiPhone,  label: t.login,        value: '04652-232100'                  },
            { Icon: FiMapPin, label: t.tabTaluks,    value: 'No. 5, Main Road, Nagercoil – 629 001' },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xs eyebrow mb-1">{label}</p>
                <p className="text-sm text-ink">{value}</p>
              </div>
            </div>
          ))}
          <div>
            <p className="text-xs eyebrow mb-2">{t.deptEmails}</p>
            <ul className="space-y-1 text-sm text-ink-soft">
              <li>{t.newsTips} — <span className="text-primary">tips@kanyakumaritoday.com</span></li>
              <li>{t.advertising} — <span className="text-primary">ads@kanyakumaritoday.com</span></li>
              <li>{t.careers} — <span className="text-primary">hr@kanyakumaritoday.com</span></li>
              <li>{t.legal} — <span className="text-primary">legal@kanyakumaritoday.com</span></li>
            </ul>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center text-center py-16 space-y-3">
            <span className="text-4xl">✅</span>
            <h2 className="text-xl font-bold text-ink">{t.messageSent}</h2>
            <p className="text-sm text-ink-soft">{t.messageSentDesc}</p>
            <button onClick={() => setSent(false)} className="btn-primary mt-4 text-sm">{t.sendAnother}</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
            {[
              { name: 'name',    label: t.yourName,     type: 'text',  ph: 'Rajesh Kumar'       },
              { name: 'email',   label: t.emailAddress, type: 'email', ph: 'you@example.com'    },
              { name: 'subject', label: t.subject,      type: 'text',  ph: t.subjectPlaceholder },
            ].map(({ name, label, type, ph }) => (
              <div key={name}>
                <label className="block text-xs eyebrow mb-1">{label}</label>
                <input type={type} required placeholder={ph} value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="w-full bg-transparent border border-black/15 rounded-sm px-4 py-2 text-sm focus:border-primary outline-none" />
              </div>
            ))}
            <div>
              <label className="block text-xs eyebrow mb-1">{t.message}</label>
              <textarea required rows={5} placeholder={t.writeMessage} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border border-black/15 rounded-sm px-4 py-2 text-sm focus:border-primary outline-none resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full">{t.sendMessage}</button>
          </form>
        )}
      </div>
    </div>
  )
}

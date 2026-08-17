import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiPhone } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import newsService from '../services/newsService.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function Login() {
  const { t } = useLang()
  const [tab,      setTab]      = useState('Email')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [phone,    setPhone]    = useState('')
  const [otp,      setOtp]      = useState('')
  const [otpSent,  setOtpSent]  = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const navigate = useNavigate()

  async function handleEmailLogin(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try { await newsService.login({ email, password }); navigate('/') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  async function handleRequestOtp(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try { await newsService.requestOtp(phone); setOtpSent(true) }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try { await newsService.verifyOtp(phone, otp); navigate('/') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const inputCls = 'w-full bg-transparent border border-black/15 rounded-sm pl-10 pr-4 py-2.5 text-sm focus:border-primary outline-none'

  return (
    <div className="container-page py-12 flex justify-center">
      <div className="w-full max-w-md card-surface p-8">
        <h1 className="font-display text-2xl font-bold text-center mb-1">{t.welcomeBack}</h1>
        <p className="text-sm text-ink-soft text-center mb-6">{t.signInTo}</p>

        <div className="flex gap-2 mb-6">
          {[
            { key: 'Email', label: t.emailLogin },
            { key: 'OTP',   label: t.otpLogin   },
          ].map((tab_) => (
            <button key={tab_.key} onClick={() => { setTab(tab_.key); setError('') }}
              className={`flex-1 py-2 text-sm font-semibold rounded-sm transition-colors ${
                tab === tab_.key ? 'bg-primary text-white' : 'bg-black/5 text-ink-soft'
              }`}>
              {tab_.label}
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-primary mb-4 bg-primary/10 px-3 py-2 rounded-sm">{error}</p>}

        {tab === 'Email' ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailAddress2} className={inputCls} />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder={t.password} className={inputCls} />
            </div>
            <div className="text-right">
              <button type="button" className="text-xs text-primary hover:underline">{t.forgotPassword}</button>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? t.signingIn : t.signIn}
            </button>
          </form>
        ) : !otpSent ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder={t.mobileNumber} className={inputCls} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? t.sendingOtp : t.sendOtp}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-xs text-ink-soft">{t.otpSentTo} {phone}. (Demo: 123456)</p>
            <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)}
              placeholder={t.enterOtp} maxLength={6}
              className="w-full bg-transparent border border-black/15 rounded-sm px-4 py-2.5 text-sm focus:border-primary outline-none text-center tracking-[0.3em]" />
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? t.verifying : t.verifySignIn}
            </button>
          </form>
        )}

        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-black/10" />
          <span className="text-xs text-ink-soft">{t.orText}</span>
          <span className="flex-1 h-px bg-black/10" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-black/15 rounded-sm py-2.5 text-sm font-medium hover:bg-black/5 transition-colors">
          <FcGoogle size={18} /> {t.continueGoogle}
        </button>
      </div>
    </div>
  )
}

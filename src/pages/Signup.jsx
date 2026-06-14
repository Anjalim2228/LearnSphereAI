import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { saveUser } from '../api.js'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('form') // 'form' | 'otp'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    setError('')
    setLoading(true)
    try {
     const res = await fetch('https://learnsphereai-1.onrender.com/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (data.success) {
        setStep('otp')
      } else {
        setError(data.error || 'Failed to send OTP')
      }
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyAndCreate = async (e) => {
    e.preventDefault()
    if (!otp) {
      setError('Please enter the OTP')
      return
    }
    setError('')
    setLoading(true)
    try {
     const verifyRes = await fetch('https://learnsphereai-1.onrender.com/api/verify-otp', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })
      const verifyData = await verifyRes.json()

      if (!verifyData.success) {
        setError(verifyData.error || 'Invalid OTP')
        setLoading(false)
        return
      }

      const result = await createUserWithEmailAndPassword(auth, email, password)
      await saveUser(result.user.email, result.user.displayName || '', result.user.photoURL || '')
      navigate('/dashboard')
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      await saveUser(result.user.email, result.user.displayName || '', result.user.photoURL || '')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Google signup failed: ' + err.message)
    }
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '420px' }}>

        {step === 'form' && (
          <>
            <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Create account</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>Start learning smarter with AI</p>

            {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendOtp(e)} placeholder="you@example.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendOtp(e)} placeholder="••••••••" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button onClick={handleSendOtp} disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Sending OTP...' : 'Send OTP →'}
            </button>

            <button onClick={handleGoogle} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <img src="https://www.google.com/favicon.ico" width="18" height="18" />
              Continue with Google
            </button>

            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginTop: '24px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
            </p>
          </>
        )}

        {step === 'otp' && (
          <>
            <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Verify your email</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>We sent a 6-digit OTP to {email}</p>

            {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Enter OTP</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleVerifyAndCreate(e)} placeholder="123456" maxLength={6} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', letterSpacing: '4px', textAlign: 'center' }} />
            </div>

            <button onClick={handleVerifyAndCreate} disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Verifying...' : 'Verify & Create Account →'}
            </button>

            <button onClick={() => { setStep('form'); setOtp(''); setError('') }} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', color: '#9ca3af', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Signup
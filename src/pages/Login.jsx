import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { saveUser } from '../api.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          await saveUser(result.user.email, result.user.displayName || '', result.user.photoURL || '')
          navigate('/dashboard')
        }
      } catch (err) {}
    }
    checkRedirect()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await saveUser(result.user.email, result.user.displayName || '', result.user.photoURL || '')
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithRedirect(auth, provider)
    } catch (err) {
      setError('Google login failed. Try again.')
    }
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '420px' }}>

        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Welcome back</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>Login to your LearnSphere account</p>

        {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin(e)} placeholder="you@example.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin(e)} placeholder="••••••••" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <button onClick={handleLogin} style={{ width: '100%', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px' }}>
          Login →
        </button>

        <button onClick={handleGoogle} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img src="https://www.google.com/favicon.ico" width="18" height="18" />
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginTop: '24px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '600' }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, width: '240px', height: '100vh', background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '40px', padding: '0 8px' }}>
          LearnSphere AI
        </div>

        {[
           { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
  { icon: '📄', label: 'PDF Chat', path: '/pdf-chat' },
  { icon: '🧠', label: 'Quiz', path: '/quiz' },
  { icon: '🃏', label: 'Flashcards', path: '/flashcards' },
  { icon: '🗺️', label: 'Roadmap', path: '/roadmap' },
  { icon: '📊', label: 'Progress', path: '/progress' },
        ].map((item, i) => (
        <div key={i} onClick={() => navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: i === 0 ? 'white' : '#6b7280', background: i === 0 ? 'rgba(249,115,22,0.1)' : 'transparent', cursor: 'pointer', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}

        <div style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', color: '#6b7280', fontSize: '14px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Good morning, {user?.email?.split('@')[0]} 👋
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Ready to learn something new today?</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Study Hours', value: '12h', icon: '⏱️' },
            { label: 'Quiz Score', value: '85%', icon: '🧠' },
            { label: 'Streak', value: '7 days', icon: '🔥' },
            { label: 'XP Level', value: '240 XP', icon: '⚡' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ color: '#6b7280', fontSize: '13px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { icon: '📄', title: 'Upload PDF', desc: 'Start chatting with your document' },
            { icon: '🧠', title: 'Take a Quiz', desc: 'Test your knowledge' },
            { icon: '🃏', title: 'Flashcards', desc: 'Quick revision session' },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{a.icon}</div>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '6px' }}>{a.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
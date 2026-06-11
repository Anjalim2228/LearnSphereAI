import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const items = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '📄', label: 'PDF Chat', path: '/pdf-chat' },
    { icon: '🧠', label: 'Quiz', path: '/quiz' },
    { icon: '🃏', label: 'Flashcards', path: '/flashcards' },
    { icon: '🗺️', label: 'Roadmap', path: '/roadmap' },
    { icon: '📊', label: 'Progress', path: '/progress' },
  ]

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, width: '240px', height: '100vh', background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '18px', fontWeight: '700', background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '40px', padding: '0 8px' }}>
        LearnSphere AI
      </div>

      {items.map((item, i) => {
        const isActive = location.pathname === item.path
        return (
          <div key={i} onClick={() => navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: isActive ? 'white' : '#6b7280', background: isActive ? 'rgba(249,115,22,0.1)' : 'transparent', cursor: 'pointer', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        )
      })}

      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', color: '#6b7280', fontSize: '14px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import Sidebar from '../components/Sidebar'
import { getProgressSummary, getHistory } from '../api.js'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [summary, setSummary] = useState(null)
  const [history, setHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getProgressSummary()
        const h = await getHistory()
        setSummary(s)
        setHistory(h.history?.slice(0, 4) || [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Good morning, {user?.email?.split('@')[0]} 👋
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Ready to learn something new today?</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Quizzes Taken', value: summary?.totalQuizzes || 0, icon: '🧠' },
            { label: 'Avg Quiz Score', value: `${summary?.avgScore || 0}%`, icon: '🎯' },
            { label: 'Flashcards Viewed', value: summary?.totalFlashcards || 0, icon: '🃏' },
            { label: 'PDFs Uploaded', value: summary?.totalPDFs || 0, icon: '📄' },
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { icon: '📄', title: 'Upload PDF', desc: 'Start chatting with your document', path: '/pdf-chat' },
            { icon: '🧠', title: 'Take a Quiz', desc: 'Test your knowledge', path: '/quiz' },
            { icon: '🃏', title: 'Flashcards', desc: 'Quick revision session', path: '/flashcards' },
          ].map((a, i) => (
            <div key={i}
              onClick={() => navigate(a.path)}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{a.icon}</div>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '6px' }}>{a.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Recent Activity</h2>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
          {history.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>No activity yet — upload a PDF to get started!</p>
          ) : (
            history.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'white', fontSize: '14px', marginBottom: '2px' }}>{item.text}</p>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { getHistory } from '../api.js'

function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getHistory()
        setHistory(data.history)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🕐 History</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>All your activity in one place</p>

        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading...</p>
        ) : history.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📭</div>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>No activity yet!</h2>
            <p style={{ color: '#6b7280' }}>Start by uploading a PDF and taking a quiz.</p>
          </div>
        ) : (
          <div style={{ maxWidth: '720px' }}>
            {history.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{item.text}</p>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>📄 {item.pdf}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Roadmap() {
  const [roadmap, setRoadmap] = useState([])
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const generateRoadmap = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      setRoadmap(data.roadmap)
      setStarted(true)
    } catch (err) {
      alert('Upload a PDF first in PDF Chat!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🗺️ AI Study Roadmap</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>AI generates a personalized study plan from your PDF</p>

        {!started ? (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🗺️</div>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>Get your study plan!</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px' }}>Make sure you have uploaded a PDF in PDF Chat first!</p>
            <button onClick={generateRoadmap} disabled={loading} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 40px', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Generating Roadmap...' : 'Generate AI Roadmap →'}
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: '720px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '28px', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.06)' }} />

            {roadmap.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                  background: item.done ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'rgba(255,255,255,0.05)',
                  border: item.done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', zIndex: 1
                }}>
                  {item.done ? '✅' : '📅'}
                </div>

                <div style={{
                  flex: 1, background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '20px 24px'
                }}>
                  <span style={{ color: '#f97316', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.day}</span>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginTop: '4px', marginBottom: '12px' }}>{item.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.tasks.map((task, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                        <span style={{ color: '#374151', fontSize: '16px' }}>○</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <button onClick={generateRoadmap} style={{ background: 'transparent', border: '1px solid rgba(249,115,22,0.3)', padding: '10px 24px', borderRadius: '10px', color: '#f97316', fontSize: '14px', cursor: 'pointer' }}>
                🔄 Regenerate Roadmap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Roadmap
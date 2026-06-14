import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Roadmap() {
  const [roadmap, setRoadmap] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://https://learnsphereai-1.onrender.com/api/generate-roadmap', {
        method: 'POST'
      })
      const data = await res.json()
      if (data.roadmap) {
        setRoadmap(data.roadmap)
      } else {
        setError(data.error || 'Failed to generate roadmap')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🗺️ Study Roadmap</h1>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>Your personalized day-by-day study plan</p>

        <button onClick={handleGenerate} disabled={loading} style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '12px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '40px',
          opacity: loading ? 0.6 : 1
        }}>
          {loading ? 'Generating...' : '✨ Generate Roadmap'}
        </button>

        {error && <p style={{ color: '#ef4444', marginBottom: '24px' }}>{error}</p>}

        {roadmap.length === 0 && !loading && !error && (
          <p style={{ color: '#6b7280' }}>Click "Generate Roadmap" to create a study plan from your uploaded PDF/video.</p>
        )}

        <div style={{ maxWidth: '900px', position: 'relative', margin: '0 auto' }}>
          {roadmap.length > 0 && (
            <div style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.08)', transform: 'translateX(-50%)' }} />
          )}

          {roadmap.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                marginBottom: '40px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '20px',
                  transform: 'translate(-50%, 0)',
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: item.done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', zIndex: 2
                }}>
                  📅
                </div>

                <div style={{
                  width: '46%',
                  background: 'rgba(255,255,255,0.03)',
                  border: item.done ? '1px solid rgba(249,115,22,0.2)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '20px 24px',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#f97316', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.day}</span>
                      <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>{item.title}</h3>
                    </div>
                    {item.done && <span style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316', fontSize: '12px', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(249,115,22,0.2)' }}>Completed</span>}
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.tasks.map((task, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: item.done ? '#6b7280' : '#9ca3af', fontSize: '14px' }}>
                        <span style={{ color: item.done ? '#f97316' : '#374151', fontSize: '16px' }}>
                          {item.done ? '✓' : '○'}
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Roadmap
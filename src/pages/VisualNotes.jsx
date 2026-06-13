import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TreeDiagram from '../components/TreeDiagram'

function VisualNotes() {
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const options = [
    { key: 'tree', icon: '🌳', label: 'Tree Diagram', desc: 'Topic ko branches mein todo' },
    { key: 'mindmap', icon: '🧠', label: 'Mind Map', desc: 'Concepts ko connections ke saath dekho' },
    { key: 'bullets', icon: '📝', label: 'Bullet Points', desc: 'Quick shortcut summary' },
    { key: 'graph', icon: '📊', label: 'Graph / Chart', desc: 'Data ko visually compare karo' },
  ]

  const handleSelect = async (key) => {
  setSelected(key)
  setLoading(true)
  setResult(null)

  try {
    const res = await fetch('http://localhost:5000/api/generate-visual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: key })
    })
    const data = await res.json()
    setResult(data)
  } catch (err) {
    console.error(err)
    setResult({ error: 'Something went wrong' })
  } finally {
    setLoading(false)
  }
}

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px', width: '100%' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🌳 Visual Notes</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
          Apne uploaded PDF ko visually samjho — koi bhi format choose karo.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {options.map(opt => (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              style={{
                background: selected === opt.key ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.03)',
                border: selected === opt.key ? '1px solid rgba(249,115,22,0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px',
                color: 'white',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{opt.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>{opt.label}</div>
              <div style={{ color: '#6b7280', fontSize: '12px' }}>{opt.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', minHeight: '300px', color: 'white' }}>
          {loading && <p style={{ color: '#6b7280' }}>AI generate kar raha hai...</p>}
          {!loading && !result && <p style={{ color: '#6b7280' }}>Upar se ek format choose karo, AI yaha result dikhayega.</p>}
          {!loading && result && (
  <>
    {result.type === 'tree' && <TreeDiagram data={result.data} />}
    {result.type !== 'tree' && (
      <pre style={{ whiteSpace: 'pre-wrap', color: '#d1d5db', fontSize: '13px' }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    )}
  </>
)}
        </div>
      </div>
    </div>
  )
}

export default VisualNotes
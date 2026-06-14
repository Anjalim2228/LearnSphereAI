import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TreeDiagram from '../components/TreeDiagram'
import BulletNotes from '../components/BulletNotes'
import GraphChart from '../components/GraphChart'
import FlowGraph from '../components/FlowGraph'
import ConceptDiagram from '../components/ConceptDiagram'
import MindMap from '../components/MindMap'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useRef } from 'react'

function VisualNotes() {
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const resultRef = useRef(null)

  const options = [
    { key: 'tree', icon: '🌳', label: 'Tree Diagram', desc: 'Break topics into branches' },
    { key: 'mindmap', icon: '🧠', label: 'Mind Map', desc: 'See concepts with connections' },
    { key: 'bullets', icon: '📝', label: 'Bullet Points', desc: 'Quick summary of key points' },
    { key: 'graph', icon: '📊', label: 'Graph / Chart', desc: 'Visually compare data' },
  ]

  const handleSelect = async (key) => {
  setSelected(key)
  setLoading(true)
  setResult(null)

  try {
    const res = await fetch('http://https://learnsphereai-1.onrender.com/api/generate-visual', {
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

 const handleDownloadPDF = async () => {
  if (!resultRef.current) return
  const canvas = await html2canvas(resultRef.current, { backgroundColor: '#0d0d10' })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const width = pdf.internal.pageSize.getWidth()
  const height = (canvas.height * width) / canvas.width
  pdf.addImage(imgData, 'PNG', 0, 0, width, height)
  pdf.save(`${selected || 'visual-notes'}.pdf`)
}

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px', width: 'calc(100% - 240px)', boxSizing: 'border-box' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🌳 Visual Notes</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
          Understand your uploaded PDF visually — choose any format.
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

        <div  ref={resultRef} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', minHeight: '300px', color: 'white', maxWidth: '100%', overflow: 'hidden' }}> 
         {loading && <p style={{ color: '#6b7280' }}>AI is generating...</p>}
{!loading && !result && <p style={{ color: '#6b7280' }}>Choose a format above, AI will show the result here.</p>}
          {!loading && result && (
  <>
  <button onClick={handleDownloadPDF} style={{
      background: 'rgba(249,115,22,0.15)',
      border: '1px solid rgba(249,115,22,0.5)',
      borderRadius: '8px',
      padding: '8px 16px',
      color: '#f97316',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '16px'
    }}>
      ⬇️ Download as PDF
    </button>
    {result.type === 'tree' && <TreeDiagram data={result.data} />}
    {result.type === 'bullets' && <BulletNotes data={result.data} />}
    {result.type === 'graph' && <ConceptDiagram data={result.data} />}
    {result.type === 'mindmap' && <MindMap data={result.data} />}
    {!['tree', 'bullets', 'graph', 'mindmap'].includes(result.type) && (
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
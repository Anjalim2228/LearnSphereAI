import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function PDFChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! Upload a PDF and I will answer your questions about it.' }
  ])
  const [input, setInput] = useState('')
  const [pdfName, setPdfName] = useState(null)

  const handlePDF = (e) => {
    const file = e.target.files[0]
    if (file) setPdfName(file.name)
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'This is a demo response. AI integration coming soon!' }])
    }, 800)
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex' }}>

      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px', width: '100%', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>📄 PDF Chat</h1>

        {!pdfName ? (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(249,115,22,0.3)', borderRadius: '16px', padding: '60px', cursor: 'pointer', marginBottom: '24px', background: 'rgba(249,115,22,0.03)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <p style={{ color: 'white', fontWeight: '600', marginBottom: '8px' }}>Click to upload PDF</p>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>Drag and drop or click to browse</p>
            <input type="file" accept=".pdf" onChange={handlePDF} style={{ display: 'none' }} />
          </label>
        ) : (
          <div style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>📄</span>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{pdfName}</span>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.5',
                background: m.role === 'user' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                border: m.role === 'ai' ? '1px solid rgba(255,255,255,0.08)' : 'none'
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your PDF..."
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={handleSend} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 24px', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Send →
          </button>
        </div>

      </div>
    </div>
  )
}

export default PDFChat
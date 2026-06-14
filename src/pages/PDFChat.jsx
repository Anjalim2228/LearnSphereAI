import { savePDFUpload } from '../api.js'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function PDFChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! Upload a PDF and I will answer your questions about it.' }
  ])
  const [input, setInput] = useState('')
  const [pdfName, setPdfName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [ytLoading, setYtLoading] = useState(false)

  const handlePDF = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPdfName(file.name)

    const formData = new FormData()
    formData.append('pdf', file)

    try {
      const res = await fetch('http://https://learnsphereai-1.onrender.com/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: '✅ PDF uploaded! Ask me anything about it.' }])
      await savePDFUpload(file.name)
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Upload failed. Try again.' }])
    }
  }

  const handleYoutubeSubmit = async () => {
    if (!youtubeUrl) return
    setYtLoading(true)
    try {
      const res = await fetch('http://https://learnsphereai-1.onrender.com/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: youtubeUrl })
      })
      const data = await res.json()
      if (data.success) {
        setPdfName('YouTube Video Loaded')
        setMessages(prev => [...prev, { role: 'ai', text: '✅ YouTube video loaded! Ask me anything about it.' }])
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `❌ ${data.error || 'Failed to load video'}` }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Something went wrong.' }])
    } finally {
      setYtLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://https://learnsphereai-1.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px', width: '100%', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>📄 PDF Chat</h1>

        {!pdfName ? (
          <>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(249,115,22,0.3)', borderRadius: '16px', padding: '60px', cursor: 'pointer', marginBottom: '16px', background: 'rgba(249,115,22,0.03)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <p style={{ color: 'white', fontWeight: '600', marginBottom: '8px' }}>Click to upload PDF</p>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Drag and drop or click to browse</p>
              <input type="file" accept=".pdf" onChange={handlePDF} style={{ display: 'none' }} />
            </label>

            <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Paste YouTube video link here..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: 'white',
                  fontSize: '13px'
                }}
              />
              <button onClick={handleYoutubeSubmit} disabled={ytLoading} style={{
                background: 'rgba(249,115,22,0.15)',
                border: '1px solid rgba(249,115,22,0.5)',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#f97316',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
                {ytLoading ? 'Loading...' : '▶️ Load Video'}
              </button>
            </div>
          </>
        ) : (
          <div style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>{pdfName === 'YouTube Video Loaded' ? '▶️' : '📄'}</span>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{pdfName}</span>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.5',
                background: m.role === 'user' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'rgba(255,255,255,0.05)',
                color: 'white',lineHeight: '1.7',
                border: m.role === 'ai' ? '1px solid rgba(255,255,255,0.08)' : 'none'
              }}>
                {m.role === 'ai' ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#6b7280', fontSize: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your PDF..."
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={handleSend} disabled={loading} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 24px', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
            Send →
          </button>
        </div>
      </div>
    </div>
  )
}

export default PDFChat
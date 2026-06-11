import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Flashcards() {
  const [cards, setCards] = useState([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const generateFlashcards = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      setCards(data.flashcards)
      setStarted(true)
      setCurrent(0)
      setFlipped(false)
    } catch (err) {
      alert('Upload a PDF first in PDF Chat!')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    setCurrent(c => (c + 1) % cards.length)
    setFlipped(false)
  }

  const handlePrev = () => {
    setCurrent(c => (c - 1 + cards.length) % cards.length)
    setFlipped(false)
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🃏 AI Flashcards</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>AI generates flashcards from your PDF</p>

        {!started ? (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🃏</div>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>Ready to revise?</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px' }}>Make sure you have uploaded a PDF in PDF Chat first!</p>
            <button onClick={generateFlashcards} disabled={loading} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 40px', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Generating Flashcards...' : 'Generate AI Flashcards →'}
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>{current + 1} / {cards.length}</span>
            </div>

            <div onClick={() => setFlipped(f => !f)} style={{
              maxWidth: '600px', margin: '0 auto 40px',
              height: '280px', borderRadius: '20px', cursor: 'pointer',
              background: flipped ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))' : 'rgba(255,255,255,0.03)',
              border: flipped ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '40px', textAlign: 'center', transition: 'all 0.3s'
            }}>
              <div>
                <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {flipped ? 'Answer' : 'Question'}
                </div>
                <p style={{ color: 'white', fontSize: '18px', fontWeight: '600', lineHeight: '1.6' }}>
                  {flipped ? cards[current].back : cards[current].front}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 28px', borderRadius: '12px', color: 'white', fontSize: '15px', cursor: 'pointer' }}>
                ← Prev
              </button>
              <button onClick={() => setFlipped(f => !f)} style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', padding: '12px 28px', borderRadius: '12px', color: '#f97316', fontSize: '15px', cursor: 'pointer' }}>
                Flip Card
              </button>
              <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 28px', borderRadius: '12px', color: 'white', fontSize: '15px', cursor: 'pointer' }}>
                Next →
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button onClick={generateFlashcards} style={{ background: 'transparent', border: '1px solid rgba(249,115,22,0.3)', padding: '10px 24px', borderRadius: '10px', color: '#f97316', fontSize: '14px', cursor: 'pointer' }}>
                🔄 Generate New Flashcards
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Flashcards
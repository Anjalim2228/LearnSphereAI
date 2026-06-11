import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const cards = [
  { front: 'What is Mitochondria?', back: 'The powerhouse of the cell. It produces ATP through cellular respiration.' },
  { front: 'What is Newton\'s First Law?', back: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.' },
  { front: 'What is Photosynthesis?', back: 'The process by which plants use sunlight, water and CO2 to produce oxygen and energy in the form of glucose.' },
  { front: 'What is RAM?', back: 'Random Access Memory — temporary storage used by a computer to store data currently being used or processed.' },
]

function Flashcards() {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)

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
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🃏 Flashcards</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Click the card to flip it</p>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ color: '#6b7280', fontSize: '14px' }}>{current + 1} / {cards.length}</span>
        </div>

        {/* Card */}
        <div onClick={() => setFlipped(f => !f)} style={{
          maxWidth: '600px', margin: '0 auto 40px',
          height: '280px', borderRadius: '20px', cursor: 'pointer',
          background: flipped
            ? 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))'
            : 'rgba(255,255,255,0.03)',
          border: flipped
            ? '1px solid rgba(249,115,22,0.3)'
            : '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px', textAlign: 'center', transition: 'all 0.3s'
        }}>
          <div>
            <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {flipped ? 'Answer' : 'Question'}
            </div>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: '600', lineHeight: '1.5' }}>
              {flipped ? cards[current].back : cards[current].front}
            </p>
          </div>
        </div>

        {/* Navigation */}
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

      </div>
    </div>
  )
}

export default Flashcards
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { getProgressSummary } from '../api.js'

function Progress() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const summary = await getProgressSummary()
        setData(summary)
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
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>📊 Progress</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Track your learning journey</p>

        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading...</p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Quizzes Taken', value: data?.totalQuizzes || 0, icon: '🧠' },
                { label: 'Avg Quiz Score', value: `${data?.avgScore || 0}%`, icon: '🎯' },
                { label: 'Flashcards Viewed', value: data?.totalFlashcards || 0, icon: '🃏' },
                { label: 'PDFs Uploaded', value: data?.totalPDFs || 0, icon: '📄' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
                  <div style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
              <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>🧠 Recent Quizzes</h2>
              {data?.quizzes?.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '14px' }}>No quizzes taken yet!</p>
              ) : (
                data?.quizzes?.slice(0, 5).map((q, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>🧠</span>
                      <div>
                        <p style={{ color: 'white', fontSize: '14px' }}>Quiz — {q.pdfName}</p>
                        <p style={{ color: '#6b7280', fontSize: '12px' }}>{new Date(q.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span style={{ color: '#f97316', fontWeight: '600', fontSize: '14px' }}>{q.score}/{q.total}</span>
                  </div>
                ))
              )}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
              <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>🃏 Recent Flashcard Sessions</h2>
              {data?.flashcards?.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '14px' }}>No flashcard sessions yet!</p>
              ) : (
                data?.flashcards?.slice(0, 5).map((f, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>🃏</span>
                      <div>
                        <p style={{ color: 'white', fontSize: '14px' }}>Flashcards — {f.pdfName}</p>
                        <p style={{ color: '#6b7280', fontSize: '12px' }}>{new Date(f.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span style={{ color: '#f97316', fontWeight: '600', fontSize: '14px' }}>{f.cardsViewed} cards</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Progress
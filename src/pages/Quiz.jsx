import { saveQuizResult } from '../api.js'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const generateQuiz = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      setQuestions(data.quiz)
      setStarted(true)
      setCurrent(0)
      setScore(0)
      setSelected(null)
      setFinished(false)
    } catch (err) {
      alert('Upload a PDF first!')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[current].answer) setScore(s => s + 1)
  }

  await saveQuizResult(score + (i === questions[current].answer ? 1 : 0), questions.length, 'PDF')
  const handleNext = () => {
    if (current + 1 >= questions.length) {
     const finalScore = current + 1 >= questions.length ? score : score
await saveQuizResult(finalScore, questions.length, 'PDF')
setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🧠 AI Quiz</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>AI generates questions from your PDF</p>

        {!started ? (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🧠</div>
            <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>Ready to test yourself?</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px' }}>Make sure you have uploaded a PDF in PDF Chat first!</p>
            <button onClick={generateQuiz} disabled={loading} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 40px', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Generating Quiz...' : 'Generate AI Quiz →'}
            </button>
          </div>
        ) : !finished ? (
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>Question {current + 1} of {questions.length}</span>
              <span style={{ color: '#f97316', fontSize: '14px', fontWeight: '600' }}>Score: {score}</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '999px', height: '6px', marginBottom: '32px' }}>
              <div style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', height: '6px', borderRadius: '999px', width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
              <p style={{ color: 'white', fontSize: '18px', fontWeight: '600', lineHeight: '1.5' }}>{questions[current].question}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {questions[current].options.map((opt, i) => {
                let bg = 'rgba(255,255,255,0.03)'
                let border = '1px solid rgba(255,255,255,0.08)'
                let color = 'white'
                if (selected !== null) {
                  if (i === questions[current].answer) { bg = 'rgba(34,197,94,0.1)'; border = '1px solid rgba(34,197,94,0.4)'; color = '#4ade80' }
                  else if (i === selected) { bg = 'rgba(239,68,68,0.1)'; border = '1px solid rgba(239,68,68,0.4)'; color = '#f87171' }
                }
                return (
                  <div key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border, borderRadius: '12px', padding: '16px 20px', cursor: selected === null ? 'pointer' : 'default', color, fontSize: '15px', transition: 'all 0.2s' }}>
                    {opt}
                  </div>
                )
              })}
            </div>

            {selected !== null && (
              <button onClick={handleNext} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 32px', borderRadius: '12px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
              </button>
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
            <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Quiz Complete!</h2>
            <div style={{ fontSize: '72px', fontWeight: '800', background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px' }}>
              {score}/{questions.length}
            </div>
            <button onClick={generateQuiz} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', padding: '14px 32px', borderRadius: '12px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Generate New Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz
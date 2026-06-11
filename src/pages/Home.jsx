import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 60px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, background: 'rgba(13,13,16,0.9)',
        backdropFilter: 'blur(20px)', zIndex: 100
      }}>
        <span style={{ background: 'linear-gradient(135deg, #f97316, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '22px', fontWeight: '700' }}>
          LearnSphere AI
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#features" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Features</a>
          <a href="#how" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>How it works</a>
          <button onClick={() => navigate('/signup')}
  style={{
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    border: 'none', padding: '10px 22px', borderRadius: '10px',
    color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
  }}style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            border: 'none', padding: '10px 22px', borderRadius: '10px',
            color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
          }}  >Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 20px 80px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '350px',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          display: 'inline-block', background: 'rgba(249,115,22,0.1)',
          border: '1px solid rgba(249,115,22,0.3)', borderRadius: '999px',
          padding: '6px 16px', fontSize: '13px', color: '#fb923c', marginBottom: '28px'
        }}>✨ AI Powered Learning Platform</div>

        <h1 style={{ fontSize: '68px', fontWeight: '800', color: 'white', lineHeight: '1.1', maxWidth: '800px', margin: '0 auto 24px' }}>
          Learn Smarter with{' '}
          <span style={{ background: 'linear-gradient(135deg, #f97316, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI
          </span>
        </h1>

        <p style={{ color: '#9ca3af', fontSize: '20px', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Upload your PDFs, chat with AI, generate quizzes, flashcards and study roadmaps — all in one place.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/signup')}
  style={{
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    border: 'none', padding: '14px 32px', borderRadius: '12px',
    color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
  }} style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            border: 'none', padding: '14px 32px', borderRadius: '12px',
            color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
          }}>Start Learning Free →</button>
          <button style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            padding: '14px 32px', borderRadius: '12px',
            color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
          }}>Watch Demo</button>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '42px', fontWeight: '700', color: 'white', textAlign: 'center', marginBottom: '12px' }}>
          Everything you need to{' '}
          <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ace your exams
          </span>
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '60px' }}>Powerful AI tools designed for serious students</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '📄', title: 'PDF Chat', desc: 'Upload any PDF and ask questions in plain English. Get instant answers.' },
            { icon: '🧠', title: 'AI Quiz', desc: 'Auto-generate MCQs with difficulty levels. Test yourself instantly.' },
            { icon: '🃏', title: 'Flashcards', desc: 'AI creates smart flashcards from your notes. Study anywhere.' },
            { icon: '🗺️', title: 'Study Roadmap', desc: 'Personalized day-by-day study plan created by AI just for you.' },
            { icon: '📝', title: 'Smart Notes', desc: 'Auto-generate summaries, key concepts, and revision notes.' },
            { icon: '📊', title: 'Progress Tracking', desc: 'Track study hours, quiz scores, streaks and XP level.' },
          ].map((f, i) => (
            <div key={i}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', cursor: 'default', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '17px', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ padding: '80px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '42px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>
          How it{' '}
          <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            works
          </span>
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '60px' }}>Get started in 3 simple steps</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { step: '01', title: 'Upload PDF', desc: 'Drag and drop your study material or textbook PDF.' },
            { step: '02', title: 'AI Processes', desc: 'Our AI reads and understands your entire document instantly.' },
            { step: '03', title: 'Start Learning', desc: 'Chat, quiz, flashcards — learn in your own style.' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '52px', fontWeight: '800', background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>
                {s.step}
              </div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', padding: '32px', color: '#4b5563', fontSize: '14px' }}>
        © 2025 LearnSphere AI — Built with ❤️
      </footer>

    </div>
  )
}

export default Home
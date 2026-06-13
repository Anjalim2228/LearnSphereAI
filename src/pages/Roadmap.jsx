import Sidebar from '../components/Sidebar'

const roadmap = [
  {
    day: 'Day 1', title: 'Introduction & Basics',
    tasks: ['Read Chapter 1', 'Watch intro video', 'Take notes'],
    done: true
  },
  {
    day: 'Day 2', title: 'Core Concepts',
    tasks: ['Read Chapter 2-3', 'Solve 10 practice questions', 'Make flashcards'],
    done: true
  },
  {
    day: 'Day 3', title: 'Deep Dive',
    tasks: ['Read Chapter 4-5', 'Watch tutorial videos', 'Quiz yourself'],
    done: false
  },
  {
    day: 'Day 4', title: 'Practice & Revision',
    tasks: ['Solve past papers', 'Revise flashcards', 'Review weak areas'],
    done: false
  },
  {
    day: 'Day 5', title: 'Final Revision',
    tasks: ['Full revision', 'Mock test', 'Rest & prepare'],
    done: false
  },
]

function Roadmap() {
  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>🗺️ Study Roadmap</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Your personalized day-by-day study plan</p>

        <div style={{ maxWidth: '900px', position: 'relative', margin: '0 auto' }}>
          {/* Center vertical line */}
          <div style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.08)', transform: 'translateX(-50%)' }} />

          {roadmap.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                marginBottom: '40px',
                position: 'relative'
              }}>
                {/* Circle on center line */}
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
                  { '📅'}
                </div>

                {/* Card */}
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
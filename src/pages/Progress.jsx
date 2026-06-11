import Sidebar from '../components/Sidebar'

const weekData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 1 },
]

function Progress() {
  const maxHours = Math.max(...weekData.map(d => d.hours))

  return (
    <div style={{ background: '#0d0d10', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />

      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>📊 Progress</h1>
        <p style={{ color: '#6b7280', marginBottom: '40px' }}>Track your learning journey</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Hours', value: '23h', icon: '⏱️' },
            { label: 'Quiz Score', value: '85%', icon: '🧠' },
            { label: 'Streak', value: '7 days', icon: '🔥' },
            { label: 'XP Level', value: '240 XP', icon: '⚡' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ color: '#6b7280', fontSize: '13px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Weekly Study Hours</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
            {weekData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ color: '#f97316', fontSize: '12px', fontWeight: '600' }}>{d.hours}h</span>
                <div style={{
                  width: '100%', borderRadius: '6px 6px 0 0',
                  height: `${(d.hours / maxHours) * 120}px`,
                  background: 'linear-gradient(180deg, #f97316, #ea580c)'
                }} />
                <span style={{ color: '#6b7280', fontSize: '12px' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
          <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Recent Activity</h2>
          {[
            { icon: '🧠', text: 'Completed Quiz — Score 8/10', time: '2 hours ago' },
            { icon: '📄', text: 'Chatted with Physics PDF', time: '5 hours ago' },
            { icon: '🃏', text: 'Reviewed 20 Flashcards', time: 'Yesterday' },
            { icon: '🗺️', text: 'Completed Day 2 of Roadmap', time: '2 days ago' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ fontSize: '24px' }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontSize: '14px', marginBottom: '2px' }}>{a.text}</p>
                <p style={{ color: '#6b7280', fontSize: '12px' }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Progress
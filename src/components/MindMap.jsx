function MindMap({ data }) {
  if (!data || !data.branches || !Array.isArray(data.branches)) {
    return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>
  }

  const colors = [
    { bg: 'rgba(249,115,22,0.18)', border: 'rgba(249,115,22,0.6)' },
    { bg: 'rgba(59,130,246,0.18)', border: 'rgba(59,130,246,0.6)' },
    { bg: 'rgba(34,197,94,0.18)', border: 'rgba(34,197,94,0.6)' },
    { bg: 'rgba(168,85,247,0.18)', border: 'rgba(168,85,247,0.6)' },
    { bg: 'rgba(236,72,153,0.18)', border: 'rgba(236,72,153,0.6)' },
    { bg: 'rgba(250,204,21,0.18)', border: 'rgba(250,204,21,0.6)' },
  ]

 const branches = data.branches
const n = branches.length
const size = Math.max(600, n * 90) // grows with more branches
const center = size / 2
const radius = size * 0.36

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: `${size}px` }}>
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* lines from center to each branch */}
          {branches.map((b, i) => {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2
            const x = center + radius * Math.cos(angle)
            const y = center + radius * Math.sin(angle)
            return (
              <line
                key={i}
                x1={center} y1={center}
                x2={x} y2={y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
            )
          })}
        </svg>

        {/* center node */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #f97316, #fbbf24)',
          borderRadius: '14px',
          padding: '14px 22px',
          color: '#0d0d10',
          fontSize: '15px',
          fontWeight: '800',
          textAlign: 'center',
          maxWidth: '160px',
          zIndex: 2
        }}>
          {data.title}
        </div>

        {/* branch nodes */}
        {branches.map((b, i) => {
          const angle = (2 * Math.PI * i) / n - Math.PI / 2
          const xPct = 50 + (radius / size) * 100 * Math.cos(angle)
          const yPct = 50 + (radius / size) * 100 * Math.sin(angle)
          const color = colors[i % colors.length]

          return (
            <div key={i} style={{
              position: 'absolute',
              top: `${yPct}%`, left: `${xPct}%`,
              transform: 'translate(-50%, -50%)',
              background: color.bg,
              border: `1px solid ${color.border}`,
              borderRadius: '10px',
              padding: '10px 12px',
              maxWidth: '150px',
              zIndex: 2
            }}>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '12px', marginBottom: '4px' }}>
                {b.label}
              </div>
              <ul style={{ margin: 0, paddingLeft: '14px', color: '#9ca3af', fontSize: '10px', lineHeight: '1.5' }}>
                {(b.points || []).map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MindMap
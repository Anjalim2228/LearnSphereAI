function ConceptDiagram({ data }) {
  if (!data || !data.concepts) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  const colors = [
    { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.5)', text: '#f97316' },
    { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.5)', text: '#3b82f6' },
    { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.5)', text: '#22c55e' },
    { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.5)', text: '#a855f7' },
    { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.5)', text: '#ec4899' },
    { bg: 'rgba(250,204,21,0.15)', border: 'rgba(250,204,21,0.5)', text: '#facc15' },
  ]

  return (
    <div style={{ padding: '10px' }}>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f97316, #fbbf24)',
          borderRadius: '14px',
          padding: '14px 28px',
          color: '#0d0d10',
          fontSize: '16px',
          fontWeight: '800',
          textAlign: 'center'
        }}>
          {data.title}
        </div>
      </div>

      {/* Stacked cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.concepts.map((c, i) => {
          const color = colors[i % colors.length]
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'stretch',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${color.border}`,
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {/* Number badge */}
              <div style={{
                background: color.bg,
                color: color.text,
                fontWeight: '800',
                fontSize: '18px',
                width: '56px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {i + 1}
              </div>

              {/* Content */}
              <div style={{ padding: '14px 18px' }}>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                  {c.heading}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '12px', lineHeight: '1.6' }}>
                  {c.explanation}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConceptDiagram
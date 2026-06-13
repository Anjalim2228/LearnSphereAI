function ConceptDiagram({ data }) {
  if (!data || !data.concepts) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  const colors = [
    { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.5)' },
    { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.5)' },
    { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.5)' },
    { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.5)' },
    { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.5)' },
    { bg: 'rgba(250,204,21,0.15)', border: 'rgba(250,204,21,0.5)' },
  ]

  return (
    <div style={{ padding: '10px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
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

      {/* Zigzag timeline */}
      <div style={{ position: 'relative' }}>
        {/* center vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'rgba(255,255,255,0.12)',
          transform: 'translateX(-50%)'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.concepts.map((c, i) => {
            const color = colors[i % colors.length]
            const isLeft = i % 2 === 0
            return (
              <div key={i} style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                position: 'relative'
              }}>
                {/* connector dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '18px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: color.border,
                  transform: 'translateX(-50%)',
                  zIndex: 2
                }} />

                <div style={{
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                  borderRadius: '12px',
                  padding: '14px 18px',
                  width: '46%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                    {c.heading}
                  </div>
                  <div style={{ color: '#d1d5db', fontSize: '12px', lineHeight: '1.6' }}>
                    {c.explanation}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ConceptDiagram
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
      {/* Title box */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
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

      {/* Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.concepts.map((c, i) => {
          const color = colors[i % colors.length]
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
              {/* connecting line + arrow */}
              <div style={{ width: '2px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ color: '#6b7280', fontSize: '16px', marginTop: '-6px', marginBottom: '-6px' }}>↓</div>
              <div style={{ width: '2px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />

              {/* box */}
              <div style={{
                background: color.bg,
                border: `1px solid ${color.border}`,
                borderRadius: '12px',
                padding: '14px 20px',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                  {i + 1}. {c.heading}
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
  )
}

export default ConceptDiagram
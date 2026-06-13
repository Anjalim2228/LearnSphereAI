function GraphChart({ data }) {
  if (!data || !data.data) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  const maxValue = Math.max(...data.data.map(d => d.value), 1)

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '15px', marginBottom: '20px' }}>
        📊 {data.title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.data.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d1d5db', fontSize: '13px', marginBottom: '4px' }}>
              <span>{item.label}</span>
              <span style={{ color: '#9ca3af' }}>{item.value}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '14px', width: '100%' }}>
              <div style={{
                background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                height: '100%',
                borderRadius: '6px',
                width: `${(item.value / maxValue) * 100}%`,
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GraphChart
function BulletNotes({ data }) {
  if (!data || !data.sections) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {data.sections.map((sec, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px 20px'
        }}>
          <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '15px', marginBottom: '10px' }}>
            📌 {sec.heading}
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#d1d5db', fontSize: '13px', lineHeight: '1.8' }}>
            {sec.points.map((pt, j) => (
              <li key={j}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default BulletNotes
function FlowGraph({ data }) {
  if (!data || !data.nodes) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  const isFlowchart = data.graphType === 'flowchart'

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '15px', marginBottom: '20px' }}>
        {isFlowchart ? '🔄' : '🕸️'} {data.title}
      </div>

      {isFlowchart ? (
        // Flowchart: vertical steps with arrows
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          {data.nodes.map((node, i) => (
            <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                background: 'rgba(59,130,246,0.18)',
                border: '1px solid rgba(59,130,246,0.6)',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                textAlign: 'center',
                minWidth: '180px'
              }}>
                {node.label}
              </div>
              {i < data.nodes.length - 1 && (
                <div style={{ color: '#6b7280', fontSize: '18px', margin: '2px 0' }}>↓</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Concept map: nodes with relationship list
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            {data.nodes.map(node => (
              <div key={node.id} style={{
                background: 'rgba(168,85,247,0.18)',
                border: '1px solid rgba(168,85,247,0.6)',
                borderRadius: '10px',
                padding: '10px 18px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                {node.label}
              </div>
            ))}
          </div>

          <div style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>CONNECTIONS:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.edges.map((edge, i) => {
              const from = data.nodes.find(n => n.id === edge.from)
              const to = data.nodes.find(n => n.id === edge.to)
              return (
                <div key={i} style={{ color: '#d1d5db', fontSize: '13px' }}>
                  <span style={{ color: '#a855f7' }}>{from?.label}</span>
                  {' → '}
                  <span style={{ color: '#a855f7' }}>{to?.label}</span>
                  {edge.label ? ` (${edge.label})` : ''}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FlowGraph
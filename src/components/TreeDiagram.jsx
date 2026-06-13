function TreeNode({ node, level = 0 }) {
  const colors = [
    { bg: 'rgba(249,115,22,0.18)', border: 'rgba(249,115,22,0.6)' },
    { bg: 'rgba(59,130,246,0.18)', border: 'rgba(59,130,246,0.6)' },
    { bg: 'rgba(34,197,94,0.18)', border: 'rgba(34,197,94,0.6)' },
  ]
  const c = colors[level % colors.length]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
      <div style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '10px',
        padding: '10px 16px',
        color: 'white',
        fontSize: '13px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        zIndex: 1
      }}>
        {node.title}
      </div>

      {node.children && node.children.length > 0 && (
        <>
          <div style={{ width: '2px', height: '24px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{
            display: 'flex',
            gap: '20px',
            borderTop: '2px solid rgba(255,255,255,0.2)',
            paddingTop: '24px',
            position: 'relative'
          }}>
            {node.children.map((child, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: '-24px', width: '2px', height: '24px',
                  background: 'rgba(255,255,255,0.2)'
                }} />
                <TreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function TreeDiagram({ data }) {
  if (!data || !data.title) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', padding: '30px', minWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content' }}>
        <TreeNode node={data} />
      </div>
    </div>
  )
}

export default TreeDiagram
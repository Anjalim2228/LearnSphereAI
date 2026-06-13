function TreeNode({ node, level = 0 }) {
  const colors = [
    { bg: 'rgba(249,115,22,0.18)', border: 'rgba(249,115,22,0.6)' },
    { bg: 'rgba(59,130,246,0.18)', border: 'rgba(59,130,246,0.6)' },
    { bg: 'rgba(34,197,94,0.18)', border: 'rgba(34,197,94,0.6)' },
    { bg: 'rgba(168,85,247,0.18)', border: 'rgba(168,85,247,0.6)' },
  ]
  const c = colors[level % colors.length]

  return (
    <div style={{ marginLeft: level === 0 ? 0 : '24px' }}>
      <div style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '8px',
        padding: '8px 14px',
        color: 'white',
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '8px',
        display: 'inline-block'
      }}>
        {node.title}
      </div>

      {node.children && node.children.length > 0 && (
        <div style={{
          borderLeft: '2px solid rgba(255,255,255,0.15)',
          paddingLeft: '12px',
          marginLeft: '10px'
        }}>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function TreeDiagram({ data }) {
  if (!data || !data.title) return <p style={{ color: '#6b7280' }}>Koi data nahi mila.</p>

  return (
    <div style={{ padding: '10px', maxHeight: '600px', overflowY: 'auto' }}>
      <TreeNode node={data} />
    </div>
  )
}

export default TreeDiagram
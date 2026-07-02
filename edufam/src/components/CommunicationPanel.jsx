export default function CommunicationPanel({ mensagens }) {
  const lista = mensagens || [];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <span style={{ fontSize:15, fontWeight:700, color:'#1E293B' }}>&#128172; Comunicados</span>
        <span style={{ fontSize:11, color:'#64748B' }}>{lista.length} mensagens</span>
      </div>
      {lista.slice(0, 3).map((msg, i) => (
        <div key={i} style={{ background:'#fff', borderRadius:12, padding:'12px 14px', marginBottom:8, borderLeft: msg.lida ? '3px solid #E2E8F0' : '3px solid #4F46E5' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#1E293B' }}>{msg.de || 'Escola'}</span>
            <span style={{ fontSize:10, color:'#94A3B8' }}>{msg.hora || ''}</span>
          </div>
          <p style={{ fontSize:12, color:'#475569', margin:0 }}>{msg.texto}</p>
        </div>
      ))}
      {lista.length === 0 && (
        <div style={{ background:'#F8FAFC', borderRadius:12, padding:16, textAlign:'center', color:'#94A3B8', fontSize:13 }}>
          Nenhuma mensagem ainda
        </div>
      )}
    </div>
  );
}

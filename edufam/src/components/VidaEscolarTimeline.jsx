import { vidaEscolar } from '../data';

export default function VidaEscolarTimeline() {
  const items = vidaEscolar || [];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize:15, fontWeight:700, color:'#1E293B', marginBottom:12 }}>Vida Escolar</div>
      {items.map((item, i) => (
        <div key={i} style={{ display:'flex', gap:12, marginBottom:12 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{ width:32, height:32, borderRadius:999, background:'#EDE9FE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{item.icon || '*'}</div>
            {i < items.length - 1 && <div style={{ width:2, flex:1, background:'#E2E8F0', marginTop:4 }} />}
          </div>
          <div style={{ flex:1, paddingBottom:12 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#1E293B' }}>{item.titulo}</div>
            <div style={{ fontSize:11, color:'#64748B', marginTop:2 }}>{item.data}</div>
            {item.desc && <div style={{ fontSize:12, color:'#475569', marginTop:4 }}>{item.desc}</div>}
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div style={{ background:'#F8FAFC', borderRadius:12, padding:16, textAlign:'center', color:'#94A3B8', fontSize:13 }}>
          Nenhum registro ainda
        </div>
      )}
    </div>
  );
}

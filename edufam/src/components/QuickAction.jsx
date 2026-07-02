export default function QuickAction({ icon, title, subtitle, onClick }) {
  return (
    <button onClick={onClick} style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:14, padding:'14px 12px', display:'flex', flexDirection:'column', gap:4, cursor:'pointer', textAlign:'left', width:'100%' }}>
      <span style={{ fontSize:24 }}>{icon}</span>
      <strong style={{ fontSize:13, fontWeight:700, color:'#1E293B' }}>{title}</strong>
      <span style={{ fontSize:11, color:'#64748B' }}>{subtitle}</span>
    </button>
  );
}

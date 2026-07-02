import { X } from 'lucide-react';

export default function FirstAccessTip({ onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200 }}>
      <div style={{ background:'#fff', borderRadius:20, padding:24, maxWidth:320, width:'90%', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:12, right:12, background:'none', border:'none', cursor:'pointer' }}>
          <X size={18} />
        </button>
        <div style={{ fontSize:32, marginBottom:12 }}>&#128161;</div>
        <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>Como fazer a chamada</h3>
        <p style={{ fontSize:13, color:'#475569', marginBottom:12 }}>
          Toque no botao ao lado do aluno para alternar o status de presenca.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:16 }}>
          <span style={{ fontSize:12, color:'#334155' }}>1 toque: Presente</span>
          <span style={{ fontSize:12, color:'#334155' }}>2 toques: Falta</span>
          <span style={{ fontSize:12, color:'#334155' }}>3 toques: Justificado</span>
          <span style={{ fontSize:12, color:'#334155' }}>4 toques: Limpar</span>
        </div>
        <button onClick={onClose} style={{ background:'#4F46E5', color:'#fff', border:'none', borderRadius:10, padding:'10px 20px', width:'100%', fontWeight:600, cursor:'pointer' }}>
          Entendi
        </button>
      </div>
    </div>
  );
}

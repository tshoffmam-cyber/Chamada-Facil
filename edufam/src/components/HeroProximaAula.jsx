// ╔══════════════════════════════════════════════════════════════╗
// ║  EduFam — src/components/HeroProximaAula.jsx                ║
// ║  Card hero da Home com countdown ligado à agenda real        ║
// ╚══════════════════════════════════════════════════════════════╝

import { useProximaAulaTimer } from '../hooks/useTimer';
import { turmas } from '../data';

/**
 * Card azul da Home que mostra a próxima aula com countdown inteligente.
 *
 * Estados:
 *  - 'antes'    → "falta X:XX para começar"
 *  - 'durante'  → "X:XX restantes" + barra de progresso
 *  - 'sem_aula' → mensagem neutra
 *
 * @param {object} proxima      Evento da próxima aula (de proximaAulaHoje())
 * @param {function} onEntrar   Callback ao clicar em "Entrar no Modo Aula"
 */
export default function HeroProximaAula({ proxima, onEntrar }) {
  const { timerTexto, fase, subLabel, progPct, turma, turmaId } = useProximaAulaTimer(proxima, turmas);

  // ── Sem aulas hoje ──
  if (fase === 'sem_aula') {
    return (
      <div style={S.card}>
        <div style={{ textAlign:'center', padding:'8px 0' }}>
          <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
          <div style={{ fontSize:18, fontWeight:800, color:'#fff' }}>Sem aulas hoje</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,.7)', marginTop:4 }}>
            Aproveite para planejar a semana 📅
          </div>
        </div>
      </div>
    );
  }

  const emAndamento = fase === 'durante';

  return (
    <div style={{ ...S.card, cursor:'pointer' }} onClick={() => onEntrar(turmaId)}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div>
          <div style={S.pretitulo}>
            {emAndamento ? '🔴 Aula em andamento' : '⏰ Próxima aula'}
          </div>
          <div style={S.titulo}>
            {proxima?.titulo?.split('—')[0]?.trim() || 'Matemática'}
          </div>
          <div style={S.subtitulo}>
            {turma?.nome || ''} · {proxima?.sala ? `Sala ${proxima.sala}` : ''}
          </div>
        </div>

        {/* Timer */}
        <div style={{ textAlign:'right', minWidth:100 }}>
          <div style={S.timer}>{timerTexto}</div>
          <div style={S.timerLabel}>{subLabel}</div>

          {/* Barra de progresso mini (só durante a aula) */}
          {emAndamento && (
            <div style={{ height:4, background:'rgba(255,255,255,.25)', borderRadius:2, marginTop:6, overflow:'hidden' }}>
              <div style={{
                height:'100%', width: `${progPct}%`,
                background:'rgba(255,255,255,.8)', borderRadius:2,
                transition:'width 1s linear',
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Horário */}
      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:18 }}>
        <span style={{ fontSize:13 }}>🕐</span>
        <span style={{ fontSize:13, color:'rgba(255,255,255,.8)' }}>
          {proxima?.horaInicio} – {proxima?.horaFim || '?'}
          {proxima?.sala ? ` · Sala ${proxima.sala}` : ''}
        </span>
      </div>

      {/* Botão */}
      <button
        style={S.btnBranco}
        onClick={e => { e.stopPropagation(); onEntrar(turmaId); }}
      >
        ▶ {emAndamento ? 'Continuar aula' : 'Entrar no Modo Aula'}
      </button>

    </div>
  );
}

const S = {
  card: {
    background:'linear-gradient(135deg,#2563EB,#1e40af)',
    borderRadius:20, padding:24, marginBottom:12, color:'#fff',
  },
  pretitulo: {
    fontSize:11, color:'rgba(255,255,255,.7)', fontWeight:700,
    textTransform:'uppercase', letterSpacing:'.05em', marginBottom:6,
  },
  titulo:    { fontSize:22, fontWeight:800, color:'#fff', letterSpacing:'-.3px' },
  subtitulo: { fontSize:13, color:'rgba(255,255,255,.8)', marginTop:3 },
  timer: {
    fontSize:36, fontWeight:800, color:'#fff',
    letterSpacing:'-1px', fontVariantNumeric:'tabular-nums',
  },
  timerLabel: { fontSize:12, color:'rgba(255,255,255,.7)' },
  btnBranco: {
    background:'#fff', color:'#2563EB', border:'none',
    borderRadius:16, padding:'12px 20px', fontSize:14,
    fontWeight:700, cursor:'pointer', width:'100%',
  },
};

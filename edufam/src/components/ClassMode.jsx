// ╔══════════════════════════════════════════════════════════════╗
// ║  EduFam — src/components/ClassMode.jsx                      ║
// ║  Modo Aula com timer inteligente ligado à agenda             ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState } from 'react';
import { useModoAulaTimer } from '../hooks/useTimer';
import { alunos as todosAlunos, horaParaMin } from '../data';

/**
 * Tela completa do Modo Aula.
 *
 * @param {object}   aulaAtual   { turmaId, disc, nome, horaInicio, horaFim, sala, alunos }
 * @param {function} onEncerrar  Callback ao encerrar a aula
 * @param {function} onVoltar    Callback para voltar
 */
export default function ClassMode({ aulaAtual, onEncerrar, onVoltar }) {
  const { fase, timerTexto, progPct, label, faltam5min } = useModoAulaTimer(aulaAtual);

  // Modal de ajuste de horário
  const [editando, setEditando] = useState(false);
  const [inicio,   setInicio]   = useState(aulaAtual?.horaInicio || '07:30');
  const [fim,      setFim]      = useState(aulaAtual?.horaFim    || '08:20');

  // Estado da chamada
  const [chamadaAberta, setChamadaAberta] = useState(false);
  const [presencas, setPresencas] = useState({}); // { alunoId: null|'presente'|'falta'|'justificado' }

  if (!aulaAtual) {
    return (
      <div style={S.wrap}>
        <p style={{ color:'#64748B', textAlign:'center' }}>Nenhuma aula ativa.</p>
        <button style={S.btnSec} onClick={onVoltar}>Voltar</button>
      </div>
    );
  }

  const alunosDaTurma = todosAlunos.filter(a => a.turmaId === aulaAtual.turmaId);

  // Salvar ajuste de horário
  function salvarHorario() {
    if (horaParaMin(fim) <= horaParaMin(inicio)) {
      alert('Término deve ser após o início'); return;
    }
    aulaAtual.horaInicio = inicio;
    aulaAtual.horaFim    = fim;
    setEditando(false);
  }

  // Toggle de presença: null → presente → falta → justificado → null
  function togglePresenca(id) {
    const ciclo = [null, 'presente', 'falta', 'justificado'];
    const atual = presencas[id] || null;
    const prox  = ciclo[(ciclo.indexOf(atual) + 1) % ciclo.length];
    setPresencas(prev => ({ ...prev, [id]: prox }));
  }

  const contagem = {
    presentes:    alunosDaTurma.filter(a => presencas[a.id] === 'presente').length,
    faltas:       alunosDaTurma.filter(a => presencas[a.id] === 'falta').length,
    justificados: alunosDaTurma.filter(a => presencas[a.id] === 'justificado').length,
  };

  // Cor da barra conforme fase
  const corBarra = fase === 'depois' ? '#DC2626' : 'rgba(255,255,255,.5)';

  return (
    <div style={S.wrap}>

      {/* ── Header ── */}
      <div style={S.header}>
        <button style={S.backBtn} onClick={onVoltar}>‹</button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:20, fontWeight:700 }}>Modo Aula</div>
          <div style={{ fontSize:12, color:'#64748B' }}>{aulaAtual.disc} · {aulaAtual.nome}</div>
        </div>
        <span style={S.badgeAtiva}>● Ativa</span>
      </div>

      {/* ── Bloco azul com timer ── */}
      <div style={S.blueCard}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
          <div>
            <div style={{ fontSize:21, fontWeight:800, color:'#fff' }}>{aulaAtual.disc}</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,.75)', marginTop:2 }}>
              {aulaAtual.nome} · {aulaAtual.alunos} alunos
            </div>
            {/* Horário clicável */}
            <button onClick={() => setEditando(true)} style={S.horarioBtn}>
              🕐 {aulaAtual.horaInicio} – {aulaAtual.horaFim} ✏️
            </button>
          </div>
          {/* Timer */}
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:32, fontWeight:800, color:'#fff', fontVariantNumeric:'tabular-nums' }}>
              {timerTexto}
            </div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,.7)' }}>{label}</div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div style={{ height:6, background:'rgba(255,255,255,.2)', borderRadius:3, overflow:'hidden' }}>
          <div style={{
            height:'100%', width: `${progPct}%`,
            background: corBarra, borderRadius:3,
            transition:'width 1s linear',
          }} />
        </div>

        {faltam5min && (
          <div style={{ fontSize:12, color:'#FDE68A', marginTop:8, fontWeight:600 }}>
            ⏰ Faltam 5 minutos para o fim da aula!
          </div>
        )}
      </div>

      {/* ── Ações ── */}
      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#94A3B8', marginBottom:12 }}>
        O que você quer fazer?
      </div>

      <div style={S.grid2}>
        <ActionCard
          ico="✅" label="Chamada" sub={`${alunosDaTurma.length} alunos`}
          cor="#EFF6FF" onClick={() => setChamadaAberta(true)}
          highlight={!chamadaAberta}
        />
        <ActionCard ico="📄" label="Atividade" sub="Criar nova" cor="#F0FDF4" onClick={() => alert('Em breve')} />
        <ActionCard ico="⭐" label="Elogio"    sub="Registrar" cor="#FFFBEB" onClick={() => alert('Em breve')} />
        <ActionCard ico="⚠️" label="Ocorrência" sub="Registrar" cor="#FEF2F2" onClick={() => alert('Em breve')} />
      </div>

      {/* ── Botão encerrar ── */}
      <button style={S.btnEncerrar} onClick={() => { onEncerrar(); onVoltar(); }}>
        Encerrar aula
      </button>

      {/* ── Modal de ajuste de horário ── */}
      {editando && (
        <div style={S.overlay} onClick={() => setEditando(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={{ width:36, height:4, background:'#E2E8F0', borderRadius:2, margin:'0 auto 20px' }} />
            <div style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>Ajustar horário da aula</div>
            <div style={{ fontSize:13, color:'#64748B', marginBottom:20 }}>O timer será recalculado automaticamente</div>
            <div style={{ display:'flex', gap:12, marginBottom:18 }}>
              <div style={{ flex:1 }}>
                <label style={S.label}>Início</label>
                <input style={S.inp} type="time" value={inicio} onChange={e => setInicio(e.target.value)} />
              </div>
              <div style={{ flex:1 }}>
                <label style={S.label}>Término</label>
                <input style={S.inp} type="time" value={fim} onChange={e => setFim(e.target.value)} />
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={S.btnSec} onClick={() => setEditando(false)}>Cancelar</button>
              <button style={S.btnPri} onClick={salvarHorario}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Chamada ── */}
      {chamadaAberta && (
        <div style={S.overlay} onClick={() => setChamadaAberta(false)}>
          <div style={{ ...S.modal, maxHeight:'80vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ width:36, height:4, background:'#E2E8F0', borderRadius:2, margin:'0 auto 20px' }} />

            {/* Identificação da turma */}
            <div style={{ background:'linear-gradient(135deg,#2563EB,#1e40af)', borderRadius:16, padding:16, marginBottom:16, display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontSize:28 }}>👥</span>
              <div>
                <div style={{ fontSize:18, fontWeight:800, color:'#fff' }}>{aulaAtual.nome}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.8)' }}>{aulaAtual.disc} · {alunosDaTurma.length} alunos</div>
              </div>
            </div>

            {/* Contadores */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14 }}>
              <div style={{ background:'#F0FDF4', borderRadius:14, padding:12, textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:800, color:'#16A34A' }}>{contagem.presentes}</div>
                <div style={{ fontSize:11, color:'#16A34A', fontWeight:600 }}>Presentes</div>
              </div>
              <div style={{ background:'#FEF2F2', borderRadius:14, padding:12, textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:800, color:'#DC2626' }}>{contagem.faltas}</div>
                <div style={{ fontSize:11, color:'#DC2626', fontWeight:600 }}>Faltas</div>
              </div>
              <div style={{ background:'#FFFBEB', borderRadius:14, padding:12, textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:800, color:'#F59E0B' }}>{contagem.justificados}</div>
                <div style={{ fontSize:11, color:'#F59E0B', fontWeight:600 }}>Justif.</div>
              </div>
            </div>

            <div style={{ fontSize:12, color:'#94A3B8', marginBottom:14 }}>⚪ → 🟢 Presente → 🔴 Falta → 🟡 Justificado</div>

            {/* Lista de alunos */}
            {alunosDaTurma.map(a => {
              const st = presencas[a.id] || null;
              const icons = { presente:'✓', falta:'✗', justificado:'J' };
              const chkStyle = {
                width:44, height:44, borderRadius:'50%', border:'2px solid #E2E8F0',
                background: st === 'presente' ? '#16A34A' : st === 'falta' ? '#DC2626' : st === 'justificado' ? '#F59E0B' : '#F1F5F9',
                color: st ? '#fff' : '#94A3B8',
                fontSize:16, fontWeight:700, cursor:'pointer', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
              };
              return (
                <div key={a.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #F1F5F9' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'#EFF6FF', color:'#2563EB', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>
                    {a.ini}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600 }}>{a.nome}</div>
                    <div style={{ fontSize:11, color:'#94A3B8' }}>{a.faltas} falta(s) no mês</div>
                  </div>
                  <button style={chkStyle} onClick={() => togglePresenca(a.id)}>
                    {icons[st] || ''}
                  </button>
                </div>
              );
            })}

            <button style={{ ...S.btnPri, marginTop:16 }} onClick={() => {
              setChamadaAberta(false);
              alert(`Chamada salva ✓ — ${contagem.presentes} presentes, ${contagem.faltas} falta(s)`);
            }}>
              💾 Salvar chamada
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponente: card de ação rápida
function ActionCard({ ico, label, sub, cor, onClick, highlight }) {
  return (
    <div
      onClick={onClick}
      style={{
        background:'#fff', borderRadius:18, padding:16,
        boxShadow:'0 1px 4px rgba(0,0,0,.06)', cursor:'pointer',
        border: highlight ? '2px solid #BFDBFE' : '2px solid transparent',
        transition:'transform .2s',
      }}
    >
      <div style={{ width:36, height:36, borderRadius:12, background:cor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
        {ico}
      </div>
      <div style={{ fontSize:17, fontWeight:800, letterSpacing:'-.3px', margin:'8px 0 4px' }}>{label}</div>
      <div style={{ fontSize:12, color:'#64748B' }}>{sub}</div>
    </div>
  );
}

// ── Estilos ──────────────────────────────────────────────────────────────────
const S = {
  wrap:        { padding:20, paddingBottom:100 },
  header:      { display:'flex', alignItems:'center', gap:12, marginBottom:22, paddingTop:4 },
  backBtn:     { width:40, height:40, borderRadius:14, background:'#fff', border:'none', boxShadow:'0 1px 4px rgba(0,0,0,.08)', cursor:'pointer', fontSize:20, flexShrink:0 },
  badgeAtiva:  { background:'#F0FDF4', color:'#16A34A', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 },
  blueCard:    { background:'linear-gradient(135deg,#2563EB,#1e40af)', padding:20, borderRadius:20, marginBottom:16 },
  horarioBtn:  { background:'rgba(255,255,255,.18)', border:'none', borderRadius:10, padding:'5px 10px', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer', marginTop:8, display:'flex', alignItems:'center', gap:5 },
  grid2:       { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 },
  btnEncerrar: { width:'100%', padding:14, background:'#FEF2F2', color:'#DC2626', border:'none', borderRadius:18, fontSize:15, fontWeight:700, cursor:'pointer', marginTop:4 },
  overlay:     { position:'fixed', inset:0, background:'rgba(15,23,42,.5)', zIndex:150, display:'flex', alignItems:'flex-end', justifyContent:'center', backdropFilter:'blur(4px)' },
  modal:       { background:'#fff', borderRadius:'28px 28px 0 0', padding:'24px 20px 40px', width:'100%', maxWidth:430 },
  label:       { display:'block', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#94A3B8', marginBottom:6 },
  inp:         { width:'100%', padding:'13px 16px', border:'1.5px solid #E2E8F0', borderRadius:16, fontFamily:'Inter,sans-serif', fontSize:14, color:'#0F172A', outline:'none', boxSizing:'border-box' },
  btnPri:      { flex:1, padding:13, background:'#2563EB', color:'#fff', border:'none', borderRadius:16, fontSize:14, fontWeight:700, cursor:'pointer', width:'100%' },
  btnSec:      { flex:1, padding:13, background:'#F1F5F9', color:'#334155', border:'none', borderRadius:16, fontSize:14, fontWeight:600, cursor:'pointer' },
};

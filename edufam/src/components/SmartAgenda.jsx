// ╔══════════════════════════════════════════════════════════════╗
// ║  EduFam — src/components/SmartAgenda.jsx                    ║
// ║  Agenda inteligente — lê agenda real de DATA.eventos         ║
// ║  Marca cada aula como ativa/próxima/passada em tempo real    ║
// ╚══════════════════════════════════════════════════════════════╝

import { useState, useEffect } from 'react';
import { eventos, turmas, horaParaMin } from '../data';

/**
 * Lista de aulas de hoje do professor, com status em tempo real.
 *
 * @param {string}   profId       ID do professor logado
 * @param {function} onAbrirAula  Callback(turmaId) ao clicar numa aula
 */
export default function SmartAgenda({ profId, onAbrirAula }) {
  // Re-renderiza a cada minuto para atualizar status ativa/próxima/passada
  const [minuto, setMinuto] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMinuto(m => m + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const agora         = new Date();
  const diaSemanaHoje = agora.getDay();
  const minAgora      = agora.getHours() * 60 + agora.getMinutes();

  // Filtrar aulas de hoje do professor
  const aulasHoje = eventos
    .filter(ev =>
      ev.tipo === 'aula' &&
      ev.profId === profId &&
      ev.recorrencia === 'semanal' &&
      ev.diaSemana === diaSemanaHoje &&
      ev.horaInicio
    )
    .sort((a, b) => horaParaMin(a.horaInicio) - horaParaMin(b.horaInicio));

  if (!aulasHoje.length) {
    return (
      <div style={S.card}>
        <div style={S.secHeader}>
          <span style={S.lbl}>Agenda de hoje</span>
        </div>
        <div style={{ color:'#94A3B8', fontSize:14, textAlign:'center', padding:'16px 0' }}>
          😊 Sem aulas hoje!
        </div>
      </div>
    );
  }

  return (
    <div style={S.card}>
      <div style={S.secHeader}>
        <span style={S.lbl}>Agenda de hoje</span>
        <span style={{ fontSize:12, color:'#64748B' }}>{aulasHoje.length} aulas</span>
      </div>

      {aulasHoje.map((ev, i) => {
        const turmaId   = ev.turmaIds?.[0];
        const turma     = turmas.find(t => t.id === turmaId);
        const inicioMin = horaParaMin(ev.horaInicio);
        const fimMin    = horaParaMin(ev.horaFim || ev.horaInicio) + 50;

        // Status em tempo real
        const emAndamento = minAgora >= inicioMin && minAgora < fimMin;
        const futura      = minAgora < inicioMin;
        const passada     = minAgora >= fimMin;

        const barColor = emAndamento ? '#2563EB' : futura ? '#16A34A' : '#E2E8F0';

        return (
          <div
            key={ev.id}
            onClick={() => onAbrirAula(turmaId)}
            style={{
              display:'flex', gap:12, alignItems:'center',
              padding:'10px 0',
              borderBottom: i < aulasHoje.length - 1 ? '1px solid #F1F5F9' : 'none',
              cursor:'pointer',
              opacity: passada ? 0.5 : 1,
            }}
          >
            {/* Hora */}
            <div style={{ fontSize:12, fontWeight:700, color:'#94A3B8', width:40, flexShrink:0 }}>
              {ev.horaInicio}
            </div>

            {/* Barra colorida */}
            <div style={{ width:3, height:36, borderRadius:2, background:barColor, flexShrink:0 }} />

            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600 }}>
                {ev.titulo.split('—')[0].trim()}
              </div>
              <div style={{ fontSize:12, color:'#64748B' }}>
                {turma?.nome || ''} · Sala {ev.sala || '—'} · até {ev.horaFim || '?'}
              </div>
            </div>

            {/* Badge status */}
            {emAndamento && (
              <span style={{ background:'#EFF6FF', color:'#2563EB', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20 }}>
                ● Em aula
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const S = {
  card:      { background:'#fff', borderRadius:20, padding:20, boxShadow:'0 1px 4px rgba(0,0,0,.06)', marginBottom:12 },
  secHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  lbl:       { fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#94A3B8' },
};

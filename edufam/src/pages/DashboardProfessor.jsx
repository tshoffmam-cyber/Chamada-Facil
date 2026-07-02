// EduFam — src/pages/DashboardProfessor.jsx
// Tela principal do Professor

import { useState } from 'react';
import { useClock } from '../hooks/useTimer';
import { turmas, alunos, mensagens, eventos, proximaAulaHoje } from '../data';
import HeroProximaAula from '../components/HeroProximaAula';
import SmartAgenda from '../components/SmartAgenda';
import ClassMode from '../components/ClassMode';
import StatCard from '../components/StatCard';
import CommunicationPanel from '../components/CommunicationPanel';
import VidaEscolarTimeline from '../components/VidaEscolarTimeline';
import ProfessorWorkspace from '../components/ProfessorWorkspace';

const PROF_ID = 'u3'; // Em producao: vem do Auth

export default function DashboardProfessor() {
  const hora = useClock();
  const minhasTurmas = turmas.filter(t => t.profId === PROF_ID);
  const proxima = proximaAulaHoje(PROF_ID);

  const [aba, setAba] = useState('home');
  const [aulaAtual, setAulaAtual] = useState(null);

  function abrirModoAula(turmaId) {
    const t = turmas.find(x => x.id === turmaId) || minhasTurmas[0];
    if (!t) return;
    const diaSemanaHoje = new Date().getDay();
    const evAula = eventos.find(ev =>
      ev.tipo === 'aula' &&
      ev.turmaIds?.includes(t.id) &&
      ev.recorrencia === 'semanal' &&
      ev.diaSemana === diaSemanaHoje
    );
    setAulaAtual({
      turmaId,
      disc: t.disc,
      nome: t.nome,
      horaInicio: evAula?.horaInicio || '07:30',
      horaFim:    evAula?.horaFim    || '08:20',
      sala:       evAula?.sala       || t.sala,
      alunos: alunos.filter(a => a.turmaId === t.id).length,
    });
    setAba('modo-aula');
  }

  if (aba === 'modo-aula') {
    return (
      <div style={S.shell}>
        <StatusBar hora={hora} />
        <div style={S.scroll}>
          <ClassMode
            aulaAtual={aulaAtual}
            onEncerrar={() => { setAulaAtual(null); setAba('home'); }}
            onVoltar={() => setAba('home')}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={S.shell}>
      <StatusBar hora={hora} />
      <div style={S.scroll}>

        {aba === 'home' && (
          <div style={S.sc}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
              <div>
                <div style={S.lbl}>Bom dia ☀️</div>
                <div style={S.txl}>Professor João<br />Silva</div>
              </div>
              <div onClick={() => setAba('perfil')} style={S.avatar}>JS</div>
            </div>

            <HeroProximaAula
              proxima={proxima}
              turmas={minhasTurmas}
              onEntrar={abrirModoAula}
            />

            <div style={S.g2}>
              <StatCard label="Aulas hoje"  value={minhasTurmas.length} icon="🏫" cor="blue"   onClick={() => setAba('turmas')} />
              <StatCard label="Mensagens"   value={mensagens.filter(m => !m.lida).length} icon="💬" cor="orange" onClick={() => setAba('mensagens')} />
              <StatCard label="Pendências"   value={2}  icon="⚠️" cor="red" />
              <StatCard label="Alunos"      value={alunos.filter(a => minhasTurmas.some(t => t.id === a.turmaId)).length} icon="👥" cor="purple" onClick={() => setAba('turmas')} />
            </div>

            <SmartAgenda profId={PROF_ID} onAbrirAula={abrirModoAula} />
            <ProfessorWorkspace turmas={minhasTurmas} onEntrar={abrirModoAula} />

            <div style={S.iaCard}>
              <div style={S.iaIcon}>🤖</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#7C3AED', marginBottom:3 }}>IA EduFam sugere</div>
                <div style={{ fontSize:13, color:'#334155' }}>Bruno Lima tem 7 faltas. Que tal enviar um comunicado?</div>
              </div>
            </div>

            <CommunicationPanel mensagens={mensagens} />
            <VidaEscolarTimeline />
          </div>
        )}

        {aba === 'turmas' && (
          <div style={S.sc}>
            <div style={{ marginBottom:22, paddingTop:4 }}>
              <div style={S.tlg}>Minhas Turmas</div>
              <div style={{ fontSize:12, color:'#64748B', marginTop:3 }}>{minhasTurmas.length} turmas ativas</div>
            </div>
            <ProfessorWorkspace turmas={minhasTurmas} onEntrar={abrirModoAula} />
          </div>
        )}

        {aba === 'mensagens' && (
          <div style={S.sc}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22, paddingTop:4 }}>
              <div>
                <div style={S.tlg}>Mensagens</div>
                <div style={{ fontSize:12, color:'#64748B', marginTop:3 }}>{mensagens.length} conversas</div>
              </div>
            </div>
            <CommunicationPanel mensagens={mensagens} />
          </div>
        )}

        {aba === 'perfil' && (
          <div style={S.sc}>
            <div style={{ marginBottom:22, paddingTop:4 }}>
              <div style={S.tlg}>Perfil</div>
            </div>
            <div style={{ background:'#fff', borderRadius:16, padding:20, textAlign:'center' }}>
              <div style={{ ...S.avatar, margin:'0 auto 12px', width:64, height:64, fontSize:24 }}>JS</div>
              <div style={{ fontSize:18, fontWeight:700 }}>Prof. João Silva</div>
              <div style={{ fontSize:13, color:'#64748B', marginTop:4 }}>joao@escola.edu.br</div>
              <div style={{ fontSize:13, color:'#64748B', marginTop:2 }}>Matemática • {minhasTurmas.length} turmas</div>
            </div>
          </div>
        )}

      </div>

      <BottomNav aba={aba} setAba={setAba} msgs={mensagens.filter(m => !m.lida).length} />
    </div>
  );
}

function StatusBar({ hora }) {
  return (
    <div style={S.statusBar}>
      <span style={{ fontSize:12, fontWeight:600, color:'#1e293b' }}>{hora}</span>
      <span style={{ fontSize:12, color:'#64748b' }}>EduFam</span>
    </div>
  );
}

function BottomNav({ aba, setAba, msgs }) {
  const tabs = [
    { id:'home',     icon:'🏠', label:'Início' },
    { id:'turmas',   icon:'🏫', label:'Turmas' },
    { id:'mensagens',icon:'💬', label:'Msgs', badge: msgs },
    { id:'perfil',   icon:'👤', label:'Perfil' },
  ];
  return (
    <div style={S.nav}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setAba(t.id)} style={{ ...S.navBtn, ...(aba===t.id ? S.navActive : {}) }}>
          <div style={{ position:'relative', display:'inline-block' }}>
            <span style={{ fontSize:20 }}>{t.icon}</span>
            {t.badge > 0 && (
              <span style={S.badge}>{t.badge}</span>
            )}
          </div>
          <span style={{ fontSize:10, marginTop:2 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

const S = {
  shell:     { display:'flex', flexDirection:'column', height:'100vh', maxWidth:430, margin:'0 auto', background:'#F1F5F9', fontFamily:'system-ui,sans-serif', position:'relative' },
  statusBar: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 16px', background:'#fff', borderBottom:'1px solid #E2E8F0' },
  scroll:    { flex:1, overflowY:'auto', padding:'0 0 80px' },
  sc:        { padding:'16px 14px 8px' },
  nav:       { position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, display:'flex', justifyContent:'space-around', background:'#fff', borderTop:'1px solid #E2E8F0', padding:'6px 0 10px', zIndex:100 },
  navBtn:    { display:'flex', flexDirection:'column', alignItems:'center', background:'none', border:'none', cursor:'pointer', color:'#64748B', padding:'4px 12px', borderRadius:8, transition:'color .15s' },
  navActive: { color:'#4F46E5' },
  badge:     { position:'absolute', top:-4, right:-8, background:'#EF4444', color:'#fff', fontSize:9, fontWeight:700, borderRadius:999, padding:'1px 4px', minWidth:14, textAlign:'center' },
  lbl:       { fontSize:12, color:'#64748B', fontWeight:500, letterSpacing:.5 },
  txl:       { fontSize:22, fontWeight:800, color:'#1E293B', lineHeight:1.2, marginTop:2 },
  tlg:       { fontSize:18, fontWeight:800, color:'#1E293B' },
  g2:        { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 },
  avatar:    { width:42, height:42, borderRadius:999, background:'#4F46E5', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer' },
  iaCard:    { display:'flex', gap:12, alignItems:'center', background:'#EDE9FE', borderRadius:14, padding:'12px 14px', marginBottom:14 },
  iaIcon:    { fontSize:24 },
};

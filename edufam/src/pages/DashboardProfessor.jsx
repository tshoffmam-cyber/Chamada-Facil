// EduFam — src/pages/DashboardProfessor.jsx
// Tela principal do Professor

import { useState } from 'react';
import { useClock } from '../hooks/useTimer';
import { turmas, alunos, mensagens, eventos, proximaAulaHoje } from '../data';
import HeroProximaAula     from '../components/HeroProximaAula';
import SmartAgenda         from '../components/SmartAgenda';
import ClassMode           from '../components/ClassMode';
import StatCard            from '../components/StatCard';
import CommunicationPanel  from '../components/CommunicationPanel';
import VidaEscolarTimeline from '../components/VidaEscolarTimeline';
import ProfessorWorkspace  from '../components/ProfessorWorkspace';

const PROF_ID = 'u3'; // Em produção: vem do Auth

export default function DashboardProfessor() {
  const hora         = useClock();
  const minhasTurmas = turmas.filter(t => t.profId === PROF_ID);
  const proxima      = proximaAulaHoje(PROF_ID);

  const [tab, setTab]             = useState('home');
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
      disc:       t.disc,
      nome:       t.nome,
      horaInicio: evAula?.horaInicio || '07:30',
      horaFim:    evAula?.horaFim    || '08:20',
      sala:       evAula?.sala       || t.sala,
      alunos:     alunos.filter(a => a.turmaId === t.id).length,
    });
    setTab('modo-aula');
  }

  if (tab === 'modo-aula') {
    return (
      <div style={S.shell}>
        <StatusBar hora={hora} />
        <div style={S.scroll}>
          <ClassMode
            aulaAtual={aulaAtual}
            onEncerrar={() => { setAulaAtual(null); setTab('home'); }}
            onVoltar={() => setTab('home')}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={S.shell}>
      <StatusBar hora={hora} />
      <div style={S.scroll}>

        {tab === 'home' && (
          <div style={S.sc}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
              <div>
                <div style={S.lbl}>Bom dia ☀️</div>
                <div style={S.txl}>Prof. João<br />Silva</div>
              </div>
              <div onClick={() => setTab('perfil')} style={S.avatar}>JS</div>
            </div>

            <HeroProximaAula
              proxima={proxima}
              turmas={minhasTurmas}
              onEntrar={abrirModoAula}
            />

            <div style={S.g2}>
              <StatCard label="Aulas hoje"  value={minhasTurmas.length}                                                        icon="🏫" color="blue"   onClick={() => setTab('turmas')} />
              <StatCard label="Mensagens"   value={mensagens.filter(m => !m.lida).length}                                     icon="💬" color="orange" onClick={() => setTab('msgs')}   />
              <StatCard label="Pendências"  value={2}                                                                      icon="⚠️" color="red"                                     />
              <StatCard label="Alunos"      value={alunos.filter(a => minhasTurmas.some(t => t.id === a.turmaId)).length}     icon="👥" color="purple" onClick={() => setTab('turmas')} />
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

        {tab === 'turmas' && (
          <div style={S.sc}>
            <div style={{ marginBottom:22, paddingTop:4 }}>
              <div style={S.tlg}>Minhas Turmas</div>
              <div style={{ fontSize:12, color:'#64748B', marginTop:3 }}>{minhasTurmas.length} turmas ativas</div>
            </div>
            <ProfessorWorkspace turmas={minhasTurmas} onEntrar={abrirModoAula} />
          </div>
        )}

        {tab === 'msgs' && (
          <div style={S.sc}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22, paddingTop:4 }}>
              <div>
                <div style={S.tlg}>Mensagens</div>
                <div style={{ fontSize:12, color:'#64748B', marginTop:3 }}>Comunicação escolar</div>
              </div>
              <button style={S.btnPri}>Nova</button>
            </div>
            <CommunicationPanel mensagens={mensagens} expandido />
          </div>
        )}

        {tab === 'perfil' && (
          <div style={S.sc}>
            <div style={{ textAlign:'center', padding:'20px 0 18px' }}>
              <div style={{ ...S.avatar, width:64, height:64, fontSize:22, margin:'0 auto 14px' }}>JS</div>
              <div style={S.tlg}>Prof. João Silva</div>
              <div style={{ fontSize:12, color:'#64748B', marginTop:4 }}>joao@escola.edu.br</div>
              <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:10 }}>
                <span style={{ background:'#EFF6FF', color:'#2563EB', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>Professor</span>
                <span style={{ background:'#F0FDF4', color:'#16A34A', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>Plus</span>
              </div>
            </div>
            {['👤 Dados pessoais','🏫 Minhas organizações','🔔 Notificações','🔐 Segurança'].map(o => (
              <div key={o} style={S.perfilRow}>{o} <span style={{ color:'#CBD5E1' }}>›</span></div>
            ))}
            <div style={{ background:'linear-gradient(135deg,#2563EB,#7C3AED)', borderRadius:16, padding:18, color:'#fff', marginTop:12, marginBottom:12 }}>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.75)', marginBottom:4 }}>Próxima cobrança</div>
              <div style={{ fontSize:24, fontWeight:800 }}>R$ 49,90</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginTop:2 }}>em 15 dias</div>
            </div>
            <button style={S.btnSair}>Sair da conta</button>
          </div>
        )}

      </div>

      <nav style={S.bnav}>
        <NavBtn ico="🏠" lbl="Home"      ativo={tab==='home'}   onClick={() => setTab('home')} />
        <NavBtn ico="📚" lbl="Turmas"    ativo={tab==='turmas'} onClick={() => setTab('turmas')} />
        <button style={S.iaBtn}>🤖</button>
        <NavBtn ico="💬" lbl="Mensagens" ativo={tab==='msgs'}   onClick={() => setTab('msgs')} badge={mensagens.filter(m=>!m.lida).length} />
        <NavBtn ico="👤" lbl="Perfil"    ativo={tab==='perfil'} onClick={() => setTab('perfil')} />
      </nav>
    </div>
  );
}

function StatusBar({ hora }) {
  return (
    <div style={{ height:44, background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', flexShrink:0, borderBottom:'1px solid #F1F5F9' }}>
      <span style={{ fontWeight:700, fontSize:15 }}>{hora}</span>
      <div style={{ display:'flex', gap:6, fontSize:14 }}><span>📧</span><span>🔋</span></div>
    </div>
  );
}

function NavBtn({ ico, lbl, ativo, onClick, badge }) {
  return (
    <button onClick={onClick} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'8px 4px', border:'none', background:'none', cursor:'pointer', position:'relative' }}>
      <span style={{ fontSize:22 }}>{ico}</span>
      <span style={{ fontSize:10, fontWeight:ativo?700:500, color:ativo?'#2563EB':'#94A3B8' }}>{lbl}</span>
      {badge > 0 && <span style={{ position:'absolute', top:4, right:'50%', marginRight:-16, width:8, height:8, borderRadius:'50%', background:'#DC2626', border:'2px solid #fff' }} />}
    </button>
  );
}

const S = {
  shell:     { width:'100%', maxWidth:430, height:'100dvh', margin:'0 auto', background:'#F8FAFC', display:'flex', flexDirection:'column', overflow:'hidden' },
  scroll:    { flex:1, overflowY:'auto', overflowX:'hidden' },
  sc:        { padding:20, paddingBottom:100 },
  bnav:      { height:80, background:'#fff', borderTop:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-around', padding:'0 8px', flexShrink:0 },
  iaBtn:     { width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#2563EB,#7C3AED)', border:'none', cursor:'pointer', fontSize:24, boxShadow:'0 4px 16px rgba(124,58,237,.35)', marginTop:-20, flexShrink:0 },
  lbl:       { fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#94A3B8', marginBottom:4, display:'block' },
  txl:       { fontSize:26, fontWeight:800, letterSpacing:'-.5px', lineHeight:1.2 },
  tlg:       { fontSize:20, fontWeight:700, letterSpacing:'-.3px' },
  g2:        { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 },
  avatar:    { width:48, height:48, borderRadius:'50%', background:'#EFF6FF', color:'#2563EB', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:16, cursor:'pointer' },
  iaCard:    { background:'#F5F3FF', border:'1.5px solid #DDD6FE', borderRadius:20, padding:20, marginBottom:12, display:'flex', gap:12, alignItems:'flex-start', cursor:'pointer' },
  iaIcon:    { width:40, height:40, borderRadius:14, background:'#7C3AED', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 },
  perfilRow: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 16px', background:'#fff', borderRadius:16, marginBottom:8, fontSize:14, fontWeight:500, cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,.04)' },
  btnPri:    { background:'#2563EB', color:'#fff', border:'none', borderRadius:14, padding:'10px 16px', fontSize:13, fontWeight:700, cursor:'pointer' },
  btnSair:   { width:'100%', padding:14, background:'#FEF2F2', color:'#DC2626', border:'none', borderRadius:18, fontSize:15, fontWeight:700, cursor:'pointer', marginTop:4 },
};

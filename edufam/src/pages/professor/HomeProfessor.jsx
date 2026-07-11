import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { proximaAulaHoje } from '../../data/mockData'
import { buscarMapaFeriados } from '../../utils/feriados'
import { gerarAlertas } from '../../utils/alertas'
import BannerParceiros from '../../components/BannerParceiros'

function getSaudacao(){const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}

function toISO(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') }

// Formata a diferenca entre agora e um horario alvo como contagem
// regressiva legivel. Usado tanto para a proxima aula quanto para o
// proximo compromisso firmado na Agenda.
function formatarContagem(alvo, agora) {
  const diffMs = alvo.getTime() - agora.getTime()
  if (diffMs <= 0) return 'Em andamento'
  const diffSeg = Math.floor(diffMs / 1000)
  const dias = Math.floor(diffSeg / 86400)
  if (dias >= 1) return dias === 1 ? 'Em 1 dia' : 'Em ' + dias + ' dias'
  const horas = Math.floor(diffSeg / 3600)
  const min = Math.floor((diffSeg % 3600) / 60)
  const seg = diffSeg % 60
  if (horas >= 1) return String(horas).padStart(2,'0') + ':' + String(min).padStart(2,'0') + ':' + String(seg).padStart(2,'0')
  return String(min).padStart(2,'0') + ':' + String(seg).padStart(2,'0')
}

export default function HomeProfessor() {
const {user} = useAuth()
const {mensagens, eventos, turmas, alunos, parceiros, featureFlags} = useData()
const navigate = useNavigate()
const nome = user?.name?.split(' ')[1] || user?.name?.split(' ')[0] || 'Professor'
const hoje = new Date().getDay()
const minhasTurmas = turmas.filter(t => t.professorId === user?.id)
const turmasHoje = minhasTurmas.filter(t => t.horarios.some(h => h.dia === hoje))
const naoLidas = mensagens.filter(m => !m.lida && m.para === user?.id).length
const totalAlunos = alunos.filter(a => minhasTurmas.some(t => t.id === a.turmaId)).length
const hojeISO = new Date().toISOString().slice(0,10)
const eventosHoje = eventos.filter(e => e.data === hojeISO).length

// Relogio interno: atualiza a cada segundo para alimentar as contagens
// regressivas ao vivo (proxima aula / proximo compromisso). E um estado
// local simples de propósito — nao precisa de nenhuma lib externa.
const [agora, setAgora] = useState(new Date())
useEffect(() => {
const id = setInterval(() => setAgora(new Date()), 1000)
return () => clearInterval(id)
}, [])

const proxima = proximaAulaHoje(user?.id, minhasTurmas)
const alvoAula = proxima ? new Date(toISO(agora) + 'T' + proxima.horario.inicio + ':00') : null

// Proximo compromisso firmado na Agenda (nao inclui aulas, que ja sao
// tratadas por proximaAulaHoje). Ordena por data+hora e pega o mais proximo.
const proximoCompromisso = eventos
.map(e => ({ ...e, alvo: new Date(e.data + 'T' + e.inicio + ':00') }))
.filter(e => e.alvo.getTime() > agora.getTime() - 60000)
.sort((a, b) => a.alvo - b.alvo)[0] || null

// Feriado de hoje, usado para alimentar a central de alertas abaixo.
const [feriadoHoje, setFeriadoHoje] = useState(null)
useEffect(() => {
buscarMapaFeriados([agora.getFullYear()]).then(mapa => setFeriadoHoje(mapa[hojeISO] || null))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const alertas = gerarAlertas({ turmas, alunos, eventos, professorId: user?.id, feriadoHoje })

const EMOJI_ACENO = String.fromCodePoint(128075)
const EMOJI_CALENDARIO = String.fromCodePoint(128197)
const EMOJI_RELOGIO = String.fromCodePoint(9200)
const EMOJI_PLAY = String.fromCodePoint(9654)
const EMOJI_ESCOLA = String.fromCodePoint(127979)

return (
<div style={{paddingBottom:24}}>
<div style={{padding:'20px 20px 0'}}>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
<div>
<p style={{fontSize:13,color:'var(--color-text-secondary)',marginBottom:2}}>{getSaudacao()},</p>
<h1 style={{fontSize:22,fontWeight:800,color:'var(--color-text-primary)'}}>{nome} {EMOJI_ACENO}</h1>
</div>
<button onClick={()=>navigate('/perfil')} style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#2563EB,#7C3AED)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:16,fontWeight:700,fontFamily:'var(--font-family)'}}>
{user?.avatar||'P'}
</button>
</div>
</div>

{/* Atalhos rapidos: Agenda e Modo Aula lado a lado */}
<div style={{padding:'0 20px 16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
<button onClick={()=>navigate('/agenda')} className="card card-padding" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:8,border:'none',cursor:'pointer',textAlign:'left'}}>
<div style={{width:40,height:40,borderRadius:12,background:'var(--color-primary-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{EMOJI_CALENDARIO}</div>
<div>
<div style={{fontSize:14,fontWeight:700,color:'var(--color-text-primary)'}}>Agenda</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{eventosHoje>0?(eventosHoje+' hoje'):'Ver tudo'}</div>
</div>
</button>
<button onClick={()=>navigate(proxima ? '/turma/'+proxima.turma.id : '/organizacoes')} className="card card-padding" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:8,border:'none',cursor:'pointer',textAlign:'left'}}>
<div style={{width:40,height:40,borderRadius:12,background:'var(--color-ia-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:'var(--color-ia)'}}>{EMOJI_PLAY}</div>
<div>
<div style={{fontSize:14,fontWeight:700,color:'var(--color-text-primary)'}}>Modo Aula</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{proxima ? formatarContagem(alvoAula, agora) : 'Escolher turma'}</div>
</div>
</button>
</div>

{/* Central de alertas: junta faltas no limite, aula prestes a comecar,
compromissos do dia e feriado hoje. Ver utils/alertas.js */}
{alertas.length > 0 && (
<div style={{padding:'0 20px 16px',display:'flex',flexDirection:'column',gap:8}}>
{alertas.map(a => (
<div key={a.id} onClick={()=>navigate(a.rota)} className="card" style={{padding:'12px 14px',display:'flex',alignItems:'center',gap:10,cursor:'pointer',borderLeft:'4px solid '+a.cor}}>
<span style={{fontSize:18}}>{a.icone}</span>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:700,color:'var(--color-text-primary)'}}>{a.titulo}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:1}}>{a.descricao}</div>
</div>
</div>
))}
</div>
)}

{proxima && (
<div style={{padding:'0 20px 16px'}}>
<div style={{background:'linear-gradient(135deg,#1D4ED8,#2563EB)',borderRadius:20,padding:20,cursor:'pointer'}} onClick={()=>navigate('/turma/'+proxima.turma.id)}>
<p style={{fontSize:11,color:'rgba(255,255,255,.7)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:6}}>{EMOJI_RELOGIO} Próxima aula</p>
<h2 style={{color:'white',fontSize:20,fontWeight:800,margin:0}}>{proxima.turma.nome}</h2>
<p style={{color:'rgba(255,255,255,.8)',fontSize:13,marginTop:4}}>{proxima.turma.disciplina} · {proxima.horario.inicio} – {proxima.horario.fim} · Sala {proxima.turma.sala}</p>
<div style={{marginTop:14,display:'flex',alignItems:'center',gap:8}}>
<div style={{background:'rgba(255,255,255,.18)',borderRadius:12,padding:'6px 12px',fontSize:15,fontWeight:800,color:'white',fontVariantNumeric:'tabular-nums'}}>{formatarContagem(alvoAula, agora)}</div>
</div>
<button onClick={e=>{e.stopPropagation();navigate('/turma/'+proxima.turma.id)}} style={{marginTop:14,background:'white',color:'#2563EB',border:'none',borderRadius:14,padding:'12px 20px',fontSize:14,fontWeight:700,cursor:'pointer',width:'100%',fontFamily:'var(--font-family)'}}>
{EMOJI_PLAY} Entrar no Modo Aula
</button>
</div>
</div>
)}

{proximoCompromisso && (
<div style={{padding:'0 20px 16px'}}>
<div className="card card-padding" style={{cursor:'pointer',display:'flex',alignItems:'center',gap:12}} onClick={()=>navigate('/agenda')}>
<div style={{width:44,height:44,borderRadius:14,background:'var(--color-warning-light)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:20}}>{EMOJI_CALENDARIO}</div>
<div style={{flex:1}}>
<div style={{fontSize:11,fontWeight:700,color:'var(--color-text-muted)',textTransform:'uppercase',letterSpacing:'.05em'}}>Próximo compromisso</div>
<div style={{fontSize:14,fontWeight:700,color:'var(--color-text-primary)',marginTop:2}}>{proximoCompromisso.titulo}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:1}}>{proximoCompromisso.data} · {proximoCompromisso.inicio}</div>
</div>
<div style={{background:'var(--color-warning-light)',borderRadius:10,padding:'6px 10px',fontSize:13,fontWeight:800,color:'#B45309',fontVariantNumeric:'tabular-nums'}}>{formatarContagem(proximoCompromisso.alvo, agora)}</div>
</div>
</div>
)}

<div style={{padding:'0 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
{[{label:'Aulas hoje',valor:turmasHoje.length,cor:'var(--color-primary)'},{label:'Msgs novas',valor:naoLidas,cor:naoLidas>0?'var(--color-danger)':'var(--color-text-primary)'},{label:'Alunos',valor:totalAlunos,cor:'var(--color-success)'}].map(s=>(
<div key={s.label} className="card card-padding" style={{textAlign:'center'}}>
<div style={{fontSize:24,fontWeight:800,color:s.cor}}>{s.valor}</div>
<div style={{fontSize:11,color:'var(--color-text-muted)',fontWeight:500,marginTop:2}}>{s.label}</div>
</div>
))}
</div>
<div style={{padding:'20px 20px 0'}}>
<p className="section-label">MINHAS TURMAS</p>
<div style={{display:'flex',flexDirection:'column',gap:10}}>
{minhasTurmas.length===0&&<div className="empty-state"><div className="empty-state-icon">{EMOJI_ESCOLA}</div><div className="empty-state-title">Nenhuma turma atribuída</div></div>}
{minhasTurmas.map(t=>(
<div key={t.id} className="card" style={{padding:'14px 16px',cursor:'pointer'}} onClick={()=>navigate('/turma/'+t.id)}>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<div>
<div style={{fontWeight:700,fontSize:16}}>{t.nome}</div>
<div style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{t.disciplina} · Turno {t.turno} · Sala {t.sala}</div>
<div style={{marginTop:8}}><span className="badge badge-primary">{alunos.filter(a=>a.turmaId===t.id).length} alunos</span></div>
</div>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
</div>
</div>
))}
</div>
</div>

{/* Banner de parceiros: rodape da Home. Controlado pelo ADM (feature
flag bannerParceirosAtivo em Configuracoes Avancadas). */}
{featureFlags?.bannerParceirosAtivo && (
<div style={{padding:'20px 20px 0'}}>
<BannerParceiros parceiros={parceiros} />
</div>
)}
</div>
)
}

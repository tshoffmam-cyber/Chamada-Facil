import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { mockAdmStats } from '../../data/mockData'

// ---------------------------------------------------------------------------
// pages/adm/AdmHomeScreen.jsx
//
// Dashboard principal do ADM: visao geral do negocio (assinantes, MRR,
// churn, escolas/professores/alunos ativos) e atalhos para as demais
// telas do painel. Os graficos aqui sao feitos com divs simples (barras
// proporcionais via CSS), sem nenhuma biblioteca de graficos, para manter
// o app leve — trocar por uma lib real (ex: Recharts) e uma boa evolucao
// futura, mas nao e necessario para o prototipo.
//
// PARA UM BACKEND REAL: ver mockAdmStats em data/mockData.js — cada
// numero aqui deveria vir de uma consulta real ao banco de assinaturas/
// pagamentos, calculada no backend (nao no navegador).
// ---------------------------------------------------------------------------
export default function AdmHomeScreen() {
const { user } = useAuth()
const { suporteTickets } = useData()
const navigate = useNavigate()
const stats = mockAdmStats
const ticketsAbertos = suporteTickets.filter(t => t.status === 'aberto').length
const maiorPlano = Math.max(...stats.assinantesPorPlano.map(p => p.quantidade))
const maiorMrr = Math.max(...stats.mrrUltimosMeses.map(m => m.valor))
const totalAssinantes = stats.assinantesPorPlano.reduce((s, p) => s + p.quantidade, 0)

function formatarMoeda(v) {
return 'R$ ' + v.toLocaleString('pt-BR')
}

return (
<div style={{paddingBottom:24}}>
<div style={{padding:'20px 20px 0'}}>
<p style={{fontSize:13,color:'var(--color-text-secondary)',marginBottom:2}}>Bem-vindo,</p>
<h1 style={{fontSize:22,fontWeight:800}}>{user?.name || 'ADM'}</h1>
</div>

<div style={{padding:'16px 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
<div className="card card-padding">
<div style={{fontSize:24,fontWeight:800,color:'var(--color-primary)'}}>{totalAssinantes}</div>
<div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Assinantes totais</div>
</div>
<div className="card card-padding">
<div style={{fontSize:24,fontWeight:800,color:'var(--color-success)'}}>{formatarMoeda(stats.mrrUltimosMeses[stats.mrrUltimosMeses.length-1].valor)}</div>
<div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>MRR atual</div>
</div>
<div className="card card-padding">
<div style={{fontSize:24,fontWeight:800,color:'var(--color-warning)'}}>{stats.churnMensal}%</div>
<div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Churn mensal</div>
</div>
<div className="card card-padding" style={{cursor:'pointer'}} onClick={()=>navigate('/adm/suporte')}>
<div style={{fontSize:24,fontWeight:800,color:ticketsAbertos>0?'var(--color-danger)':'var(--color-text-primary)'}}>{ticketsAbertos}</div>
<div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Tickets abertos</div>
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<p className="section-label">ASSINANTES POR PLANO</p>
<div className="card card-padding">
{stats.assinantesPorPlano.map(p => (
<div key={p.plano} style={{marginBottom:14}}>
<div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}>
<span style={{fontWeight:600,color:'var(--color-text-secondary)'}}>{p.plano}</span>
<span style={{fontWeight:800}}>{p.quantidade}</span>
</div>
<div style={{height:8,background:'var(--color-border)',borderRadius:6,overflow:'hidden'}}>
<div style={{height:'100%',width:(p.quantidade/maiorPlano*100)+'%',background:p.cor,borderRadius:6}} />
</div>
</div>
))}
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<p className="section-label">MRR — ÚLTIMOS 6 MESES</p>
<div className="card card-padding">
<div style={{display:'flex',alignItems:'flex-end',gap:8,height:110}}>
{stats.mrrUltimosMeses.map(m => (
<div key={m.mes} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6,height:'100%',justifyContent:'flex-end'}}>
<div style={{width:'100%',maxWidth:28,height:(m.valor/maiorMrr*90)+'%',background:'linear-gradient(180deg,#2563EB,#7C3AED)',borderRadius:6,minHeight:4}} />
<span style={{fontSize:10,color:'var(--color-text-muted)',fontWeight:600}}>{m.mes}</span>
</div>
))}
</div>
</div>
</div>

<div style={{padding:'20px 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
{[{label:'Escolas ativas',valor:stats.escolasAtivas},{label:'Professores',valor:stats.professoresAtivos},{label:'Alunos',valor:stats.alunosAtivos}].map(s=>(
<div key={s.label} className="card card-padding" style={{textAlign:'center'}}>
<div style={{fontSize:18,fontWeight:800}}>{s.valor.toLocaleString('pt-BR')}</div>
<div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:2}}>{s.label}</div>
</div>
))}
</div>
</div>
)
}

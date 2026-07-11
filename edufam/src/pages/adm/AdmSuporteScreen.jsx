import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/adm/AdmSuporteScreen.jsx
//
// Central de suporte do ADM: mostra tickets abertos por usuarios,
// incluindo os casos em que a IA EduFam nao conseguiu ajudar e escalou
// para um humano do time (assistencia ao usuario quando a IA falha).
//
// PARA UM BACKEND REAL: os tickets deveriam ser criados automaticamente
// pelo backend sempre que a IA falhar ou o usuario pedir ajuda humana
// explicitamente (ver suporteTickets em DataContext.jsx), alimentando uma
// fila real com SLA e notificacao para o time de suporte. Aqui e so uma
// lista mockada com a acao de marcar como resolvido.
// ---------------------------------------------------------------------------
const PRIORIDADE_COR = { alta: 'var(--color-danger)', media: 'var(--color-warning)', baixa: 'var(--color-text-muted)' }

export default function AdmSuporteScreen() {
const { suporteTickets, resolverTicket } = useData()
const abertos = suporteTickets.filter(t => t.status === 'aberto')
const resolvidos = suporteTickets.filter(t => t.status === 'resolvido')

function formatarData(iso) {
const d = new Date(iso)
return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

return (
<div style={{paddingBottom:24}}>
<div style={{padding:'20px 20px 0'}}>
<h1 style={{fontSize:20,fontWeight:800}}>Central de suporte</h1>
<p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>Casos escalados, incluindo quando a IA EduFam não consegue ajudar</p>
</div>

<div style={{padding:'16px 20px 0'}}>
<p className="section-label">ABERTOS ({abertos.length})</p>
{abertos.length===0 && (
<div className="empty-state"><div className="empty-state-icon">✅</div><div className="empty-state-title">Nenhum ticket aberto</div></div>
)}
<div style={{display:'flex',flexDirection:'column',gap:10}}>
{abertos.map(t => (
<div key={t.id} className="card card-padding">
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}>
<div style={{flex:1}}>
<div style={{fontWeight:700,fontSize:14}}>{t.assunto}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>{t.usuario} · {formatarData(t.criadoEm)}</div>
</div>
<span className="badge" style={{background:'transparent',border:'1px solid '+PRIORIDADE_COR[t.prioridade],color:PRIORIDADE_COR[t.prioridade]}}>{t.prioridade}</span>
</div>
<button className="btn btn-ghost btn-sm" style={{marginTop:10}} onClick={()=>resolverTicket(t.id)}>Marcar como resolvido</button>
</div>
))}
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<p className="section-label">RESOLVIDOS ({resolvidos.length})</p>
<div style={{display:'flex',flexDirection:'column',gap:10}}>
{resolvidos.map(t => (
<div key={t.id} className="card card-padding" style={{opacity:.7}}>
<div style={{fontWeight:700,fontSize:14}}>{t.assunto}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>{t.usuario} · {formatarData(t.criadoEm)}</div>
<span className="badge badge-success" style={{marginTop:8,display:'inline-flex'}}>Resolvido</span>
</div>
))}
</div>
</div>
</div>
)
}

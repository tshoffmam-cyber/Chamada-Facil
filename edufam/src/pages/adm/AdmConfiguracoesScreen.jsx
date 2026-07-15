import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/adm/AdmConfiguracoesScreen.jsx
//
// Configuracoes de marca (nome do app, texto de boas-vindas) e gestao dos
// parceiros do banner rotativo exibido na Home do professor. A paleta de
// cores oficial e fixa (definida no PRD/style.css) e mostrada aqui apenas
// como referencia — nao e editavel, para preservar a identidade visual.
//
// PARA UM BACKEND REAL: as mudancas aqui deveriam ser persistidas no
// backend e versionadas (quem mudou o que e quando), com aprovacao para
// mudancas sensiveis de marca. Parceiros deveriam ter um fluxo de
// aprovacao antes de ir ao ar. Hoje tudo fica em localStorage via
// DataContext (parceiros, featureFlags).
// ---------------------------------------------------------------------------
const CORES_OFICIAIS = ['#2563EB', '#7C3AED', '#16A34A', '#F59E0B', '#DC2626']

export default function AdmConfiguracoesScreen() {
const navigate = useNavigate()
const { featureFlags, atualizarFeatureFlags, parceiros, adicionarParceiro, editarParceiro, removerParceiro } = useData()
const [novo, setNovo] = useState({ nome: '', mensagem: '', link: '', cor: CORES_OFICIAIS[0] })
const [editandoId, setEditandoId] = useState(null)

function salvarNovoParceiro() {
if (!novo.nome.trim() || !novo.mensagem.trim()) return
adicionarParceiro(novo)
setNovo({ nome: '', mensagem: '', link: '', cor: CORES_OFICIAIS[0] })
}

return (
<div style={{paddingBottom:24}}>
<div style={{padding:'20px 20px 0'}}>
<h1 style={{fontSize:20,fontWeight:800}}>Configurações</h1>
<p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>Marca do app e parceiros do banner</p>
</div>

<div style={{padding:'16px 20px 0'}}>
<p className="section-label">MARCA</p>
<div className="card card-padding">
<label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6}}>Nome do app</label>
<input className="input" value={featureFlags.nomeApp} onChange={e=>atualizarFeatureFlags({ nomeApp: e.target.value })} style={{marginBottom:14}} />
<label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6}}>Texto de boas-vindas (login)</label>
<input className="input" value={featureFlags.textoBoasVindasLogin} onChange={e=>atualizarFeatureFlags({ textoBoasVindasLogin: e.target.value })} style={{marginBottom:14}} />
<label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6}}>Paleta oficial (fixa)</label>
<div style={{display:'flex',gap:8}}>
{CORES_OFICIAIS.map(c => (<div key={c} title={c} style={{width:28,height:28,borderRadius:8,background:c}} />))}
</div>
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} className="card card-padding">
<div>
<div style={{fontWeight:700,fontSize:14}}>Banner de parceiros</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>Exibir na Home do professor</div>
</div>
<button onClick={()=>atualizarFeatureFlags({ bannerParceirosAtivo: !featureFlags.bannerParceirosAtivo })} style={{width:48,height:28,borderRadius:99,border:'none',cursor:'pointer',background:featureFlags.bannerParceirosAtivo?'var(--color-primary)':'var(--color-border)',position:'relative',transition:'background .2s'}}>
<div style={{position:'absolute',top:3,left:featureFlags.bannerParceirosAtivo?23:3,width:22,height:22,borderRadius:'50%',background:'white',transition:'left .2s'}} />
</button>
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<p className="section-label">PARCEIROS ({parceiros.length})</p>
<div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:14}}>
{parceiros.map(p => (
<div key={p.id} className="card card-padding">
{editandoId === p.id ? (
<>
<input className="input" value={p.nome} onChange={e=>editarParceiro(p.id,{nome:e.target.value})} style={{marginBottom:8}} />
<input className="input" value={p.mensagem} onChange={e=>editarParceiro(p.id,{mensagem:e.target.value})} style={{marginBottom:8}} />
<input className="input" value={p.link} onChange={e=>editarParceiro(p.id,{link:e.target.value})} style={{marginBottom:8}} />
<button className="btn btn-primary btn-sm" onClick={()=>setEditandoId(null)}>Concluir edição</button>
</>
) : (
<>
<div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
<div style={{width:12,height:12,borderRadius:'50%',background:p.cor}} />
<div style={{fontWeight:700,fontSize:14}}>{p.nome}</div>
</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{p.mensagem}</div>
<div style={{display:'flex',gap:10,marginTop:8}}>
<button className="btn btn-ghost btn-sm" onClick={()=>setEditandoId(p.id)}>Editar</button>
<button onClick={()=>removerParceiro(p.id)} style={{background:'none',border:'none',color:'var(--color-danger)',fontSize:13,fontWeight:600,cursor:'pointer'}}>Remover</button>
</div>
</>
)}
</div>
))}
</div>

<div className="card card-padding">
<div style={{fontWeight:700,marginBottom:10}}>Novo parceiro</div>
<input className="input" placeholder="Nome do parceiro" value={novo.nome} onChange={e=>setNovo({...novo,nome:e.target.value})} style={{marginBottom:8}} />
<input className="input" placeholder="Mensagem" value={novo.mensagem} onChange={e=>setNovo({...novo,mensagem:e.target.value})} style={{marginBottom:8}} />
<input className="input" placeholder="Link (https://...)" value={novo.link} onChange={e=>setNovo({...novo,link:e.target.value})} style={{marginBottom:10}} />
<div style={{display:'flex',gap:8,marginBottom:14}}>
{CORES_OFICIAIS.map(c => (
<button key={c} onClick={()=>setNovo({...novo,cor:c})} style={{width:28,height:28,borderRadius:8,background:c,border:novo.cor===c?'2px solid var(--color-text-primary)':'none',cursor:'pointer'}} />
))}
</div>
<button className="btn btn-primary w-full" onClick={salvarNovoParceiro}>Adicionar parceiro</button>
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<button className="card card-padding" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',border:'none',cursor:'pointer',textAlign:'left'}} onClick={()=>navigate('/adm/configuracoes-avancadas')}>
<div>
<div style={{fontWeight:700,fontSize:14}}>Configurações avançadas</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>Feature flags do app (JSON)</div>
</div>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
</button>
<button className="card card-padding" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',border:'none',cursor:'pointer',textAlign:'left',marginTop:12}} onClick={()=>navigate('/adm/planos')}>
<div>
<div style={{fontWeight:700,fontSize:14}}>Planos e assinaturas</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>Placeholder de planos pagos/paywall</div>
</div>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
</button>
<button className="card card-padding" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',border:'none',cursor:'pointer',textAlign:'left',marginTop:12}} onClick={()=>navigate('/adm/nps')}>
<div>
<div style={{fontWeight:700,fontSize:14}}>Pesquisa de satisfacao (NPS)</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>Dados de exemplo, sem coleta real ainda</div>
</div>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
</button>
</div>
</div>
)
}

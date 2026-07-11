import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { mockUsers } from '../../data/mockData'

// ---------------------------------------------------------------------------
// pages/adm/AdmUsuariosScreen.jsx
//
// Visao do ADM sobre usuarios (professores/diretores) e escolas
// cadastradas na plataforma. Hoje lista os 3 usuarios mockados de
// data/mockData.js e as organizacoes do DataContext.
//
// PARA UM BACKEND REAL: esta tela deveria consultar uma API paginada de
// usuarios/escolas (ex: GET /adm/usuarios?busca=...), com filtros por
// plano, status (ativo/suspenso) e data de cadastro — nao existe ainda
// porque nao ha backend nem sistema de assinaturas reais neste prototipo.
// ---------------------------------------------------------------------------
const ROLE_LABEL = { professor: 'Professor', diretor: 'Diretor', adm: 'ADM' }

export default function AdmUsuariosScreen() {
const { organizacoes, turmas } = useData()
const [busca, setBusca] = useState('')

const usuariosFiltrados = mockUsers.filter(u =>
u.name.toLowerCase().includes(busca.toLowerCase()) || u.email.toLowerCase().includes(busca.toLowerCase())
)

return (
<div style={{paddingBottom:24}}>
<div style={{padding:'20px 20px 0'}}>
<h1 style={{fontSize:20,fontWeight:800}}>Usuários e escolas</h1>
<p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>Visão geral de quem usa a plataforma</p>
</div>

<div style={{padding:'16px 20px 0'}}>
<input className="input" placeholder="Buscar por nome ou e-mail" value={busca} onChange={e=>setBusca(e.target.value)} />
</div>

<div style={{padding:'16px 20px 0'}}>
<p className="section-label">USUÁRIOS ({usuariosFiltrados.length})</p>
<div style={{display:'flex',flexDirection:'column',gap:10}}>
{usuariosFiltrados.map(u => (
<div key={u.id} className="card card-padding" style={{display:'flex',alignItems:'center',gap:12}}>
<div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#2563EB,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:13,flexShrink:0}}>{u.avatar}</div>
<div style={{flex:1}}>
<div style={{fontWeight:700,fontSize:14}}>{u.name}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{u.email}</div>
</div>
<span className="badge badge-primary">{ROLE_LABEL[u.role] || u.role}</span>
</div>
))}
{usuariosFiltrados.length===0 && (
<div className="empty-state"><div className="empty-state-icon">🔍</div><div className="empty-state-title">Nenhum usuário encontrado</div></div>
)}
</div>
</div>

<div style={{padding:'20px 20px 0'}}>
<p className="section-label">ESCOLAS / ORGANIZAÇÕES ({organizacoes.length})</p>
<div style={{display:'flex',flexDirection:'column',gap:10}}>
{organizacoes.map(o => (
<div key={o.id} className="card card-padding">
<div style={{fontWeight:700,fontSize:14}}>{o.nome}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',marginTop:2}}>{turmas.filter(t=>t.organizacaoId===o.id).length} turma(s) cadastrada(s)</div>
</div>
))}
</div>
</div>
</div>
)
}

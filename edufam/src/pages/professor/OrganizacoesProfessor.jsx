import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'

export default function OrganizacoesProfessor() {
const navigate = useNavigate()
const { organizacoes, turmas, alunos } = useData()
const [busca, setBusca] = useState('')

return (
<div style={{ padding: '20px 20px 8px' }}>
<div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 4 }}>
<h1 style={{ fontSize: 22, fontWeight: 800 }}>Minhas Escolas</h1>
<button onClick={() => navigate('/nova-escola')} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>+ Escola</button>
</div>
<p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
Todas as organizacoes e turmas
</p>

{turmas.length > 5 && (
<input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar turma pelo nome..." className="input" style={{ marginBottom: 20, fontSize: 13 }} />
)}

{organizacoes.length === 0 && (
<div className="empty-state"><div className="empty-state-icon">🏫</div><div className="empty-state-title">Nenhuma escola cadastrada</div></div>
)}

{organizacoes.map(org => {
const turmasEscola = turmas.filter(t => t.organizacaoId === org.id && t.nome.toLowerCase().includes(busca.toLowerCase()))
if (busca && turmasEscola.length === 0) return null
return (
<div key={org.id} style={{ marginBottom: 24 }}>
<div style={{
display: 'flex',
alignItems: 'center',
gap: 12,
marginBottom: 12,
padding: '14px 16px',
background: 'var(--color-primary)',
borderRadius: 16,
}}>
<div style={{
width: 40,
height: 40,
background: 'rgba(255,255,255,0.2)',
borderRadius: 12,
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: 20,
}}>
🏫
</div>
<div style={{ flex: 1 }}>
<div style={{ fontWeight: 800, fontSize: 16, color: 'white' }}>{org.nome}</div>
<div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
{turmasEscola.length} turma{turmasEscola.length !== 1 ? 's' : ''}
</div>
</div>
<button onClick={() => navigate(`/nova-turma/${org.id}`)} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:10, padding:'8px 12px', color:'white', fontWeight:700, fontSize:12, cursor:'pointer', fontFamily:'var(--font-family)' }}>+ Turma</button>
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
{turmasEscola.length === 0 && (
<div style={{ fontSize:13, color:'var(--color-text-secondary)', padding:'8px 4px' }}>Nenhuma turma nesta escola ainda.</div>
)}
{turmasEscola.map(turma => {
const alunosTurma = alunos.filter(a => a.turmaId === turma.id)
const comPerfil = alunosTurma.filter(a => a.perfilPedagogico).length
const limiteFaltas = turma.limiteFaltas || 15
const emAlerta = alunosTurma.filter(a => a.faltas >= limiteFaltas).length
return (
<div
key={turma.id}
className="card"
style={{ padding: '14px 16px', cursor: 'pointer' }}
onClick={() => navigate(`/turma/${turma.id}`)}
>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<div>
<div style={{ fontWeight: 700, fontSize: 16 }}>{turma.nome}</div>
<div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
{turma.disciplina} • Turno {turma.turno} • Sala {turma.sala}
</div>
<div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
<span className="badge badge-primary">{alunosTurma.length} alunos</span>
{comPerfil > 0 && (
<span className="badge badge-ia">{comPerfil} Perfil Pedagogico</span>
)}
{emAlerta > 0 && (
<span className="badge badge-danger">{emAlerta} em alerta de faltas</span>
)}
</div>
</div>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
<polyline points="9 18 15 12 9 6"/>
</svg>
</div>

{turma.horarios && turma.horarios.length > 0 && (
<div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
{turma.horarios.map((h, i) => {
const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
return (
<span key={i} style={{
fontSize: 11,
fontWeight: 600,
background: 'var(--color-bg)',
border: '1px solid var(--color-border)',
borderRadius: 6,
padding: '3px 7px',
color: 'var(--color-text-secondary)',
}}>
{dias[h.dia]} {h.inicio}
</span>
)
})}
</div>
)}
</div>
)
})}
</div>
</div>
)
})}
</div>
)
}

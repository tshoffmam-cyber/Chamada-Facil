import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'

const TIPOS = [
{ id: 'todos', label: 'Todos' },
{ id: 'registro_positivo', label: 'Positivos' },
{ id: 'ocorrencia', label: 'Ocorrencias' },
{ id: 'atividade', label: 'Atividades' },
]

const TYPE_CONFIG = {
registro_positivo: { label: 'Registro Positivo', bg: '#DCFCE7', color: '#16A34A', border: '#86EFAC' },
ocorrencia: { label: 'Ocorrencia', bg: '#FEE2E2', color: '#DC2626', border: '#FCA5A5' },
atividade: { label: 'Atividade', bg: '#DBEAFE', color: '#2563EB', border: '#93C5FD' },
}

export default function VidaEscolarScreen() {
const { turmaId } = useParams()
const navigate = useNavigate()
const { turmas, alunos: todosAlunos, vidaEscolar, adicionarRegistroVida } = useData()
const turma = turmas.find(t => t.id === turmaId)
const alunosTurma = todosAlunos.filter(a => a.turmaId === turmaId)
const [alunoId, setAlunoId] = useState(alunosTurma[0]?.id || null)
const [filtro, setFiltro] = useState('todos')
const [novoTipo, setNovoTipo] = useState('registro_positivo')
const [novoTitulo, setNovoTitulo] = useState('')
const [novoDesc, setNovoDesc] = useState('')
const [showForm, setShowForm] = useState(false)

const aluno = alunosTurma.find(a => a.id === alunoId)
const registros = (vidaEscolar[alunoId] || [])
.filter(v => filtro === 'todos' || v.tipo === filtro)
.sort((a, b) => new Date(b.data) - new Date(a.data))

if (!turma) return <div style={{padding:24,textAlign:'center'}}><p>Turma não encontrada</p><button onClick={()=>navigate('/home')} className="btn btn-primary" style={{marginTop:16}}>Voltar</button></div>

function salvarRegistro(){
if(!novoTitulo.trim() || !alunoId) return
adicionarRegistroVida(alunoId, { id: 've'+Date.now(), alunoId, tipo: novoTipo, titulo: novoTitulo.trim(), descricao: novoDesc.trim(), data: new Date().toISOString() })
setShowForm(false); setNovoTitulo(''); setNovoDesc('')
}

return (
<div style={{ paddingBottom: 24 }}>
<div style={{
padding: '16px 20px',
background: 'var(--color-surface)',
borderBottom: '1px solid var(--color-border)',
position: 'sticky',
top: 0,
zIndex: 50,
}}>
<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
<button
onClick={() => navigate(`/turma/${turmaId}`)}
style={{
width: 36, height: 36,
background: 'var(--color-bg)', border: '1px solid var(--color-border)',
borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
}}
>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
<polyline points="15 18 9 12 15 6"/>
</svg>
</button>
<div>
<h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Vida Escolar</h2>
<p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>{turma.nome}</p>
</div>
<button
onClick={() => setShowForm(true)}
disabled={!alunoId}
style={{
marginLeft: 'auto',
background: 'var(--color-primary)', color: 'white',
border: 'none', borderRadius: 10, padding: '8px 12px',
fontSize: 13, fontWeight: 700, cursor: alunoId?'pointer':'not-allowed', fontFamily: 'var(--font-family)',
opacity: alunoId?1:0.5,
}}
>
+ Registrar
</button>
</div>

<div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
{alunosTurma.map(a => (
<button
key={a.id}
onClick={() => setAlunoId(a.id)}
style={{
padding: '6px 14px',
borderRadius: 20,
border: '1.5px solid',
borderColor: alunoId === a.id ? 'var(--color-primary)' : 'var(--color-border)',
background: alunoId === a.id ? 'var(--color-primary-light)' : 'transparent',
color: alunoId === a.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
fontSize: 13,
fontWeight: 600,
cursor: 'pointer',
fontFamily: 'var(--font-family)',
whiteSpace: 'nowrap',
}}
>
{a.nome}
</button>
))}
</div>

<div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
{TIPOS.map(t => (
<button
key={t.id}
onClick={() => setFiltro(t.id)}
style={{
padding: '6px 14px',
borderRadius: 20,
border: '1.5px solid',
borderColor: filtro === t.id ? 'var(--color-primary)' : 'var(--color-border)',
background: filtro === t.id ? 'var(--color-primary-light)' : 'transparent',
color: filtro === t.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
fontSize: 13,
fontWeight: 600,
cursor: 'pointer',
fontFamily: 'var(--font-family)',
whiteSpace: 'nowrap',
}}
>
{t.label}
</button>
))}
</div>
</div>

{showForm && aluno && (
<div style={{ padding: '16px 20px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
<h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Novo Registro — {aluno.nome}</h3>
<div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
{Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
<button
key={key}
onClick={() => setNovoTipo(key)}
style={{
flex: 1, padding: '8px 6px',
background: novoTipo === key ? cfg.bg : 'var(--color-bg)',
border: `1.5px solid ${novoTipo === key ? cfg.border : 'var(--color-border)'}`,
borderRadius: 10, fontSize: 11, fontWeight: 700,
color: novoTipo === key ? cfg.color : 'var(--color-text-muted)',
cursor: 'pointer', fontFamily: 'var(--font-family)',
}}
>
{cfg.label}
</button>
))}
</div>
<input
className="input"
placeholder="Titulo do registro"
value={novoTitulo}
onChange={e => setNovoTitulo(e.target.value)}
style={{ marginBottom: 10 }}
/>
<textarea
className="input"
rows={3}
placeholder="Descricao detalhada..."
value={novoDesc}
onChange={e => setNovoDesc(e.target.value)}
style={{ resize: 'none', borderRadius: 12, marginBottom: 10 }}
/>
<div style={{ display: 'flex', gap: 8 }}>
<button
className="btn btn-ghost btn-sm"
style={{ flex: 1 }}
onClick={() => { setShowForm(false); setNovoTitulo(''); setNovoDesc('') }}
>
Cancelar
</button>
<button
className="btn btn-primary btn-sm"
style={{ flex: 1 }}
onClick={salvarRegistro}
>
Salvar
</button>
</div>
</div>
)}

<div style={{ padding: '16px 20px 0' }}>
{!aluno ? (
<div className="empty-state">
<div className="empty-state-icon">🧑‍🎓</div>
<div className="empty-state-title">Nenhum aluno nesta turma</div>
</div>
) : registros.length === 0 ? (
<div className="empty-state">
<div className="empty-state-icon">📋</div>
<div className="empty-state-title">Nenhum registro</div>
<div className="empty-state-sub">Registros da vida escolar do aluno aparecerao aqui</div>
</div>
) : (
<div style={{ position: 'relative' }}>
<div style={{
position: 'absolute',
left: 19,
top: 0,
bottom: 0,
width: 2,
background: 'var(--color-border)',
zIndex: 0,
}} />
{registros.map(v => {
const cfg = TYPE_CONFIG[v.tipo] || { label: v.tipo, bg: '#F1F5F9', color: '#64748B', border: '#E2E8F0' }
return (
<div key={v.id} style={{ display: 'flex', gap: 16, marginBottom: 16, position: 'relative' }}>
<div style={{
width: 40,
height: 40,
background: cfg.bg,
border: `2px solid ${cfg.border}`,
borderRadius: '50%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
flexShrink: 0,
zIndex: 1,
fontSize: 16,
}}>
{v.tipo === 'registro_positivo' ? '⭐' : v.tipo === 'ocorrencia' ? '⚠️' : '📝'}
</div>
<div style={{ flex: 1, paddingTop: 4 }}>
<div style={{
background: 'var(--color-surface)',
border: `1px solid ${cfg.border}`,
borderRadius: 14,
padding: '12px 14px',
}}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
<span style={{ fontSize: 11, fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
<span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
{new Date(v.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })}
</span>
</div>
<div style={{ fontWeight: 700, fontSize: 14 }}>{v.titulo}</div>
{v.descricao && (
<p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
{v.descricao}
</p>
)}
{v.nota && (
<div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
<span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Nota:</span>
<span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-primary)' }}>{v.nota}</span>
</div>
)}
</div>
</div>
</div>
)
})}
</div>
)}
</div>
</div>
)
}

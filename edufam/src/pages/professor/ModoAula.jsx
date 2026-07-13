import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
const acoes = [
{id:'chamada',label:'Chamada',cor:'#2563EB',path:'chamada'},
{id:'atividade',label:'Atividade',cor:'#16A34A',path:'atividade'},
{id:'vida',label:'Vida Escolar',cor:'#7C3AED',path:'vida-escolar'},
{id:'comunicar',label:'Comunicar Resp.',cor:'#0891B2',path:'comunicacao'},
]
const AVATAR_CORES = [
{bg:'var(--color-primary-light)',cor:'var(--color-primary)'},
{bg:'var(--color-success-light)',cor:'var(--color-success)'},
{bg:'var(--color-ia-light)',cor:'var(--color-ia)'},
{bg:'var(--color-warning-light)',cor:'#B45309'},
{bg:'var(--color-danger-light)',cor:'var(--color-danger)'},
]
export default function ModoAula() {
const {turmaId}=useParams(); const navigate=useNavigate()
const {user}=useAuth()
const {turmas, alunos: todosAlunos, adicionarAluno} = useData()
const turma=turmas.find(t=>t.id===turmaId)
const alunos=todosAlunos.filter(a=>a.turmaId===turmaId)
const [mostrarForm, setMostrarForm] = useState(false)
const [novoNome, setNovoNome] = useState('')
const [novaMatricula, setNovaMatricula] = useState('')
const [novoNascimento, setNovoNascimento] = useState('')
const [novoResponsavel, setNovoResponsavel] = useState('')
const [busca, setBusca] = useState('')
const estiloInput = {width:'100%',padding:'10px 12px',borderRadius:10,border:'1.5px solid var(--color-border)',fontSize:14,fontFamily:'var(--font-family)'}
// Guarda de posse: a turma so pode ser aberta pelo professor dono dela.
// Mostra a mesma mensagem tanto se a turma nao existe quanto se pertence
// a outro professor, para nao revelar a outros usuarios quais turmas
// existem no sistema.
// PARA UM BACKEND REAL: isso deve ser reforcado tambem no servidor (a API
// nao deveria nem retornar dados de uma turma que nao e do professor
// autenticado) — esta checagem no frontend e so uma camada de UX.
if(!turma || turma.professorId !== user?.id) return <div style={{padding:24,textAlign:'center'}}><p>Turma não encontrada</p><button onClick={()=>navigate('/home')} className="btn btn-primary" style={{marginTop:16}}>Voltar</button></div>
const limiteFaltas = turma.limiteFaltas || 15
const alunosEmAlerta = alunos.filter(a => a.faltas >= limiteFaltas)
const alunosFiltrados = alunos.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()))
function salvarNovoAluno(){
if(!novoNome.trim()) return
adicionarAluno({nome:novoNome.trim(), matricula:novaMatricula.trim(), dataNascimento:novoNascimento, responsavel:novoResponsavel.trim(), turmaId})
setNovoNome(''); setNovaMatricula(''); setNovoNascimento(''); setNovoResponsavel(''); setMostrarForm(false)
}
return (
<div style={{paddingBottom:24}}>
<div style={{background:'linear-gradient(135deg,#1D4ED8,#2563EB)',padding:'20px 20px 24px'}}>
<button onClick={()=>navigate('/home')} style={{background:'rgba(255,255,255,.15)',border:'none',borderRadius:10,width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',marginBottom:16}}>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
</button>
<p style={{color:'rgba(255,255,255,.7)',fontSize:13,marginBottom:4}}>Modo Aula</p>
<h1 style={{color:'white',fontSize:24,fontWeight:800,margin:0}}>{turma.nome}</h1>
<p style={{color:'rgba(255,255,255,.8)',fontSize:14,marginTop:4}}>{turma.disciplina} · {alunos.length} alunos · Sala {turma.sala}</p>
<div style={{display:'flex',gap:12,marginTop:16}}>
{[{label:'Alunos',valor:alunos.length,cor:'#86EFAC'},{label:'Turno',valor:turma.turno,cor:'#C4B5FD'},{label:'Sala',valor:turma.sala,cor:'#FDE68A'}].map(s=>(
<div key={s.label} style={{background:'rgba(255,255,255,.12)',borderRadius:10,padding:'8px 12px',flex:1,textAlign:'center'}}>
<div style={{color:s.cor,fontWeight:800,fontSize:16}}>{s.valor}</div>
<div style={{color:'rgba(255,255,255,.7)',fontSize:11,marginTop:2}}>{s.label}</div>
</div>
))}
</div>
</div>
{alunosEmAlerta.length > 0 && (
<div style={{margin:'16px 20px 0',background:'var(--color-danger-light)',border:'1px solid #FCA5A5',borderRadius:14,padding:'12px 14px',display:'flex',alignItems:'center',gap:10}}>
<span style={{fontSize:18}}>⚠️</span>
<div style={{fontSize:13,color:'var(--color-danger)',fontWeight:600}}>{alunosEmAlerta.length} aluno{alunosEmAlerta.length!==1?'s':''} atingiu o limite de {limiteFaltas} faltas</div>
</div>
)}
<div style={{padding:'20px 20px 0'}}>
<p className="section-label">O QUE DESEJA FAZER?</p>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
{acoes.map(a=>(
<button key={a.id} onClick={()=>{
if(a.path==='chamada')navigate('/turma/'+turmaId+'/chamada')
else if(a.path==='atividade')navigate('/turma/'+turmaId+'/atividade')
else if(a.path==='vida-escolar')navigate('/turma/'+turmaId+'/vida-escolar')
else if(a.path==='comunicacao')navigate('/comunicacao')
}} style={{background:'var(--color-surface)',border:'1.5px solid var(--color-border)',borderRadius:16,padding:'18px 14px',display:'flex',flexDirection:'column',alignItems:'flex-start',gap:10,cursor:'pointer',fontFamily:'var(--font-family)',textAlign:'left'}}>
<div style={{width:40,height:40,background:a.cor+'18',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}>
<div style={{width:8,height:8,borderRadius:'50%',background:a.cor}}/>
</div>
<span style={{fontSize:14,fontWeight:700,color:'var(--color-text-primary)'}}>{a.label}</span>
</button>
))}
</div>
<div style={{marginTop:16}}>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<p className="section-label">ALUNOS ({alunos.length})</p>
<button onClick={()=>setMostrarForm(v=>!v)} style={{background:'none',border:'none',color:'var(--color-primary)',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'var(--font-family)'}}>{mostrarForm?'Cancelar':'+ Adicionar aluno'}</button>
</div>
{mostrarForm && (
<div className="card card-padding" style={{marginBottom:10,display:'flex',flexDirection:'column',gap:8}}>
<input value={novoNome} onChange={e=>setNovoNome(e.target.value)} placeholder="Nome completo" style={estiloInput} />
<input value={novaMatricula} onChange={e=>setNovaMatricula(e.target.value)} placeholder="Matrícula" style={estiloInput} />
<input value={novoNascimento} onChange={e=>setNovoNascimento(e.target.value)} type="date" style={estiloInput} />
<input value={novoResponsavel} onChange={e=>setNovoResponsavel(e.target.value)} placeholder="Responsável" style={estiloInput} />
<button onClick={salvarNovoAluno} className="btn btn-primary" style={{width:'100%'}}>Salvar aluno</button>
</div>
)}
{alunos.length > 5 && (
<input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar aluno pelo nome..." className="input" style={{marginBottom:10,fontSize:13}} />
)}
<div style={{display:'flex',flexDirection:'column',gap:8}}>
{alunosFiltrados.length===0 && (
<div style={{fontSize:13,color:'var(--color-text-muted)',padding:'8px 4px'}}>Nenhum aluno encontrado.</div>
)}
{alunosFiltrados.map((a,i)=>{
const emAlerta = a.faltas >= limiteFaltas
const avatarCor = AVATAR_CORES[i%5]
return (
<div key={a.id} className="card" style={{padding:'12px 16px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',borderLeft: emAlerta ? '3px solid var(--color-danger)' : undefined}} onClick={()=>navigate('/turma/'+turmaId+'/aluno/'+a.id)}>
<div style={{width:40,height:40,borderRadius:'50%',background:avatarCor.bg,display:'flex',alignItems:'center',justifyContent:'center',color:avatarCor.cor,fontWeight:700,fontSize:14,flexShrink:0}}>{a.avatar}</div>
<div style={{flex:1}}>
<div style={{fontWeight:600,fontSize:14}}>{a.nome}</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)'}}>Mat. {a.matricula}</div>
</div>
{a.perfilPedagogico && <span className="badge badge-ia">{a.perfilPedagogico.tipo}</span>}
{emAlerta && <span className="badge badge-danger">{a.faltas} faltas</span>}
</div>
)
})}
</div>
</div>
</div>
</div>
)
}

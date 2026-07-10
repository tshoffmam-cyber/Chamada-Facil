import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

export default function NovaTurmaScreen() {
const navigate = useNavigate()
const { organizacaoId } = useParams()
const { user } = useAuth()
const { criarTurma, organizacoes } = useData()
const organizacao = organizacoes.find(o => o.id === organizacaoId)
const [nome, setNome] = useState('')
const [disciplina, setDisciplina] = useState('')
const [turno, setTurno] = useState('Manhã')
const [sala, setSala] = useState('')
const estiloInput = {width:'100%',padding:'10px 12px',borderRadius:10,border:'1.5px solid var(--color-border)',fontSize:14,fontFamily:'var(--font-family)'}

function salvar(){
if(!nome.trim()) return
criarTurma({ nome: nome.trim(), disciplina: disciplina.trim(), turno, sala: sala.trim(), organizacaoId, professorId: user?.id, horarios: [] })
navigate('/organizacoes')
}

return (
<div style={{padding:'20px 20px 24px'}}>
<div style={{display:'flex',alignItems:'center',gap:12,marginBottom:4}}>
<button onClick={()=>navigate('/organizacoes')} style={{width:36,height:36,background:'var(--color-bg)',border:'1px solid var(--color-border)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
</button>
<h1 style={{fontSize:20,fontWeight:800,margin:0}}>Nova Turma</h1>
</div>
{organizacao && <p style={{fontSize:13,color:'var(--color-text-secondary)',marginBottom:20,marginLeft:48}}>{organizacao.nome}</p>}
<div style={{display:'flex',flexDirection:'column',gap:12,marginTop:16}}>
<div>
<label style={{fontSize:13,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,display:'block'}}>Nome da turma</label>
<input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Ex: 9º Ano A" style={estiloInput} />
</div>
<div>
<label style={{fontSize:13,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,display:'block'}}>Disciplina</label>
<input value={disciplina} onChange={e=>setDisciplina(e.target.value)} placeholder="Ex: Matemática" style={estiloInput} />
</div>
<div>
<label style={{fontSize:13,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,display:'block'}}>Turno</label>
<select value={turno} onChange={e=>setTurno(e.target.value)} style={estiloInput}>
<option value="Manhã">Manhã</option>
<option value="Tarde">Tarde</option>
<option value="Noite">Noite</option>
</select>
</div>
<div>
<label style={{fontSize:13,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,display:'block'}}>Sala</label>
<input value={sala} onChange={e=>setSala(e.target.value)} placeholder="Ex: 12" style={estiloInput} />
</div>
<button onClick={salvar} className="btn btn-primary" style={{width:'100%',marginTop:8}}>Salvar turma</button>
</div>
</div>
)
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/diretor/DiretorAlunosScreen.jsx
//
// Lista todos os alunos da escola (de todas as turmas/professores), com
// busca por nome. Ao clicar, abre o historico completo do aluno em
// DiretorAlunoDetalheScreen.jsx.
// ---------------------------------------------------------------------------
export default function DiretorAlunosScreen() {
  const navigate = useNavigate()
  const { alunos, turmas } = useData()
  const [busca, setBusca] = useState('')

  const lista = alunos
    .filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()))
    .map(a => ({ ...a, turma: turmas.find(t => t.id === a.turmaId) }))

  return (
    <div style={{paddingBottom:24}}>
      <div style={{padding:'20px 20px 0'}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Alunos da escola</h1>
        <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{alunos.length} aluno(s) no total</p>
      </div>

      <div style={{padding:'16px 20px 0'}}>
        <input className="input" placeholder="Buscar aluno..." value={busca} onChange={e=>setBusca(e.target.value)} />
      </div>

      <div style={{padding:'16px 20px 0',display:'flex',flexDirection:'column',gap:8}}>
        {lista.map(a => (
          <div key={a.id} className="card card-padding" style={{cursor:'pointer',display:'flex',alignItems:'center',gap:10}} onClick={()=>navigate('/diretor/alunos/'+a.id)}>
            <div style={{width:38,height:38,borderRadius:'50%',background:'var(--color-primary-light)',color:'var(--color-primary)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13}}>{a.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{a.nome}</div>
              <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{a.turma?.nome} · {a.turma?.disciplina}</div>
            </div>
            <span style={{fontSize:12,fontWeight:700,color:a.situacao==='atencao'?'var(--color-danger)':'var(--color-success)'}}>{a.faltas} faltas</span>
          </div>
        ))}
        {lista.length === 0 && (
          <p style={{fontSize:13,color:'var(--color-text-muted)',textAlign:'center',marginTop:20}}>Nenhum aluno encontrado.</p>
        )}
      </div>
    </div>
  )
}

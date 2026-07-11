import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { mockUsers, mockIndicadoresProfessor } from '../../data/mockData'

// ---------------------------------------------------------------------------
// pages/diretor/DiretorProfessoresScreen.jsx
//
// Lista os professores da escola do Diretor, com indicadores de
// acompanhamento (aulas registradas, chamada em dia, % de notas
// lancadas) e as turmas de cada um.
//
// PARA UM BACKEND REAL: filtrar mockUsers por escola/organizacaoId real
// (hoje so existe 1 escola no mock) e trocar mockIndicadoresProfessor por
// uma consulta agregada real do backend.
// ---------------------------------------------------------------------------
export default function DiretorProfessoresScreen() {
  const { turmas, alunos } = useData()
  const [busca, setBusca] = useState('')

  const professoresIds = [...new Set(turmas.map(t => t.professorId))]
  const professores = professoresIds
    .map(pid => mockUsers.find(u => u.id === pid))
    .filter(Boolean)
    .filter(p => p.name.toLowerCase().includes(busca.toLowerCase()))

  return (
    <div style={{paddingBottom:24}}>
      <div style={{padding:'20px 20px 0'}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Professores</h1>
        <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{professoresIds.length} professor(es) na escola</p>
      </div>

      <div style={{padding:'16px 20px 0'}}>
        <input className="input" placeholder="Buscar professor..." value={busca} onChange={e=>setBusca(e.target.value)} />
      </div>

      <div style={{padding:'16px 20px 0',display:'flex',flexDirection:'column',gap:10}}>
        {professores.map(p => {
          const ind = mockIndicadoresProfessor.find(i=>i.professorId===p.id)
          const turmasDoProf = turmas.filter(t=>t.professorId===p.id)
          const totalAlunos = alunos.filter(a=>turmasDoProf.some(t=>t.id===a.turmaId)).length
          return (
            <div key={p.id} className="card card-padding">
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--color-primary-light)',color:'var(--color-primary)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14}}>{p.avatar}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>{p.name}</div>
                  <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{p.disciplina}</div>
                </div>
                {ind && (
                  <span style={{fontSize:11,fontWeight:700,padding:'4px 8px',borderRadius:8,background:ind.chamadaEmDia?'var(--color-success-light)':'var(--color-warning-light)',color:ind.chamadaEmDia?'var(--color-success)':'var(--color-warning)'}}>
                    {ind.chamadaEmDia?'Em dia':'Pendências'}
                  </span>
                )}
              </div>
              <div style={{marginTop:10,display:'flex',gap:16,fontSize:12,color:'var(--color-text-secondary)',flexWrap:'wrap'}}>
                <span>{turmasDoProf.length} turma(s)</span>
                <span>{totalAlunos} aluno(s)</span>
                {ind && <span>{ind.aulasRegistradasMes} aulas/mês</span>}
                {ind && <span>{ind.notasLancadasPercent}% notas lançadas</span>}
              </div>
              {turmasDoProf.length > 0 && (
                <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid var(--color-border)',display:'flex',flexWrap:'wrap',gap:6}}>
                  {turmasDoProf.map(t => (
                    <span key={t.id} style={{fontSize:11,fontWeight:600,padding:'3px 8px',borderRadius:6,background:'var(--color-bg)',color:'var(--color-text-secondary)'}}>{t.nome}</span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {professores.length === 0 && (
          <p style={{fontSize:13,color:'var(--color-text-muted)',textAlign:'center',marginTop:20}}>Nenhum professor encontrado.</p>
        )}
      </div>
    </div>
  )
}

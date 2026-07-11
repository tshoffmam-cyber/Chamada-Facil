import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { mockUsers, mockIndicadoresProfessor } from '../../data/mockData'
import BannerParceiros from '../../components/BannerParceiros'

// ---------------------------------------------------------------------------
// pages/diretor/DiretorPainelScreen.jsx
//
// Painel principal do Diretor: visao consolidada de resultados por turma
// e por professor da escola (frequencia + desempenho), e alertas de
// alunos com excesso de faltas em toda a escola (nao so na turma de um
// professor). O Diretor nao da aula por padrao — este painel e sobretudo
// de leitura/gestao (ver PRD: "maioria so exerce a direcao").
//
// PARA UM BACKEND REAL: os indicadores por professor (mockIndicadoresProfessor,
// em data/mockData.js) deveriam vir de uma consulta agregada real as
// tabelas de chamada e notas, filtrada pela escola do diretor logado.
// Hoje so existe 1 escola no mock, entao nao ha filtro de organizacao
// aplicado de fato — em producao, turmasEscola abaixo filtraria por
// organizacaoId correspondente a escola do usuario logado.
// ---------------------------------------------------------------------------
export default function DiretorPainelScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { turmas, alunos, parceiros, featureFlags } = useData()

  const turmasEscola = turmas
  const professoresIds = [...new Set(turmasEscola.map(t => t.professorId))]

  function alunosDaTurma(turmaId) {
    return alunos.filter(a => a.turmaId === turmaId)
  }

  function frequenciaMedia(lista) {
    if (lista.length === 0) return null
    const total = lista.reduce((acc, a) => acc + (a.presencas + a.faltas), 0)
    const pres = lista.reduce((acc, a) => acc + a.presencas, 0)
    return total > 0 ? Math.round((pres / total) * 100) : null
  }

  const alertasFaltas = alunos
    .map(a => {
      const turma = turmas.find(t => t.id === a.turmaId)
      const limite = turma?.limiteFaltas ?? 15
      return { ...a, turma, limite }
    })
    .filter(a => a.turma && a.faltas >= a.limite)

  const totalAlunos = alunos.length
  const freqEscola = frequenciaMedia(alunos) ?? 0
  const minhasTurmas = user?.turmas || []

  return (
    <div style={{paddingBottom:24}}>
      <div style={{padding:'20px 20px 0'}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Painel da Direção</h1>
        <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{user?.escola}</p>
      </div>

      <div style={{padding:'16px 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div className="card card-padding">
          <div style={{fontSize:24,fontWeight:800}}>{totalAlunos}</div>
          <div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Alunos na escola</div>
        </div>
        <div className="card card-padding">
          <div style={{fontSize:24,fontWeight:800,color:'var(--color-primary)'}}>{freqEscola}%</div>
          <div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Frequência média</div>
        </div>
        <div className="card card-padding">
          <div style={{fontSize:24,fontWeight:800}}>{professoresIds.length}</div>
          <div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Professores ativos</div>
        </div>
        <div className="card card-padding" style={{cursor:'pointer'}} onClick={()=>navigate('/diretor/alunos')}>
          <div style={{fontSize:24,fontWeight:800,color:alertasFaltas.length>0?'var(--color-danger)':'var(--color-text-primary)'}}>{alertasFaltas.length}</div>
          <div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>Alunos em alerta de falta</div>
        </div>
      </div>

      {minhasTurmas.length > 0 && (
        <div style={{padding:'20px 20px 0'}}>
          <p className="section-label">MINHA TURMA</p>
          {minhasTurmas.map(tid => {
            const t = turmas.find(x=>x.id===tid)
            if(!t) return null
            return (
              <div key={tid} className="card card-padding" style={{cursor:'pointer',marginBottom:8}} onClick={()=>navigate('/turma/'+tid)}>
                <div style={{fontWeight:700}}>{t.nome}</div>
                <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{t.disciplina}</div>
              </div>
            )
          })}
        </div>
      )}

      {alertasFaltas.length > 0 && (
        <div style={{padding:'20px 20px 0'}}>
          <p className="section-label">ALERTAS DE FALTA</p>
          <div className="card card-padding">
            {alertasFaltas.map(a => (
              <div key={a.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--color-border)'}}>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{a.nome}</div>
                  <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{a.turma.nome} · {a.turma.disciplina}</div>
                </div>
                <span style={{fontSize:13,fontWeight:800,color:'var(--color-danger)'}}>{a.faltas} faltas</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{padding:'20px 20px 0'}}>
        <p className="section-label">RESULTADOS POR TURMA</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {turmasEscola.map(t => {
            const freq = frequenciaMedia(alunosDaTurma(t.id))
            return (
              <div key={t.id} className="card card-padding">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700}}>{t.nome}</div>
                    <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{t.disciplina} · {alunosDaTurma(t.id).length} alunos</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:16,fontWeight:800,color:freq!=null && freq<80 ? 'var(--color-warning)':'var(--color-primary)'}}>{freq!=null?freq+'%':'-'}</div>
                    <div style={{fontSize:11,color:'var(--color-text-muted)'}}>frequência</div>
                  </div>
                </div>
                {t.mediaGeral != null && (
                  <div style={{marginTop:8,fontSize:12,color:'var(--color-text-secondary)'}}>Média geral: <b>{t.mediaGeral}</b></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{padding:'20px 20px 0'}}>
        <p className="section-label">RESULTADOS POR PROFESSOR</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {professoresIds.map(pid => {
            const prof = mockUsers.find(u=>u.id===pid)
            const ind = mockIndicadoresProfessor.find(i=>i.professorId===pid)
            const turmasDoProf = turmasEscola.filter(t=>t.professorId===pid)
            return (
              <div key={pid} className="card card-padding" style={{cursor:'pointer'}} onClick={()=>navigate('/diretor/professores')}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700}}>{prof?.name || pid}</div>
                    <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{prof?.disciplina} · {turmasDoProf.length} turma(s)</div>
                  </div>
                  {ind && (
                    <span style={{fontSize:11,fontWeight:700,padding:'4px 8px',borderRadius:8,background:ind.chamadaEmDia?'var(--color-success-light)':'var(--color-warning-light)',color:ind.chamadaEmDia?'var(--color-success)':'var(--color-warning)'}}>
                      {ind.chamadaEmDia?'Em dia':'Pendências'}
                    </span>
                  )}
                </div>
                {ind && (
                  <div style={{marginTop:8,display:'flex',gap:16,fontSize:12,color:'var(--color-text-secondary)'}}>
                    <span>{ind.aulasRegistradasMes} aulas/mês</span>
                    <span>{ind.notasLancadasPercent}% notas lançadas</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Banner de parceiros: mesma feature flag do ADM usada na Home do
          professor. Confirmado com o usuario que faz sentido exibir para
          todos os papeis (nao atrapalha: banner clicavel no rodape, sem
          bloquear a tela). */}
      {featureFlags?.bannerParceirosAtivo && (
        <div style={{padding:'20px 20px 0'}}>
          <BannerParceiros parceiros={parceiros} />
        </div>
      )}
    </div>
  )
}

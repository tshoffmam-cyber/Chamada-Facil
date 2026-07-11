import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { mockUsers } from '../../data/mockData'

// ---------------------------------------------------------------------------
// pages/diretor/DiretorAlunoDetalheScreen.jsx
//
// Historico completo de um aluno, visto pelo Diretor: frequencia, dados
// do responsavel e a linha do tempo de vidaEscolar (notas, ocorrencias,
// registros positivos) — mesma fonte de dados usada em
// VidaEscolarScreen.jsx (visao do professor), aqui reaproveitada.
//
// PARA UM BACKEND REAL: "turmas passadas" (anos anteriores) exigiria uma
// tabela real de matriculas/historico por ano letivo, que este prototipo
// nao modela ainda (hoje cada aluno so tem 1 turma atual).
// ---------------------------------------------------------------------------
export default function DiretorAlunoDetalheScreen() {
  const { alunoId } = useParams()
  const navigate = useNavigate()
  const { alunos, turmas, vidaEscolar } = useData()

  const aluno = alunos.find(a => a.id === alunoId)
  const turma = turmas.find(t => t.id === aluno?.turmaId)
  const professor = mockUsers.find(u => u.id === turma?.professorId)
  const timeline = (vidaEscolar[alunoId] || []).slice().sort((a,b)=> new Date(b.data) - new Date(a.data))

  if (!aluno) {
    return (
      <div style={{padding:20}}>
        <p>Aluno não encontrado.</p>
        <button className="btn btn-primary" onClick={()=>navigate('/diretor/alunos')}>Voltar</button>
      </div>
    )
  }

  const totalAulas = aluno.presencas + aluno.faltas
  const freq = totalAulas > 0 ? Math.round((aluno.presencas / totalAulas) * 100) : null

  function formatarData(dataStr) {
    const d = new Date(dataStr)
    if (isNaN(d.getTime())) return dataStr
    return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' })
  }

  const iconePorTipo = { atividade: '📘', registro_positivo: '⭐', ocorrencia: '⚠️' }

  return (
    <div style={{paddingBottom:24}}>
      <div style={{padding:'20px 20px 0',display:'flex',alignItems:'center',gap:10}}>
        <button onClick={()=>navigate(-1)} style={{background:'none',border:'none',cursor:'pointer',fontSize:20,padding:0}}>←</button>
        <div style={{width:44,height:44,borderRadius:'50%',background:'var(--color-primary-light)',color:'var(--color-primary)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:15}}>{aluno.avatar}</div>
        <div>
          <div style={{fontWeight:800,fontSize:17}}>{aluno.nome}</div>
          <div style={{fontSize:12,color:'var(--color-text-muted)'}}>{turma?.nome} · {turma?.disciplina} · Prof. {professor?.name}</div>
        </div>
      </div>

      <div style={{padding:'16px 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        <div className="card card-padding">
          <div style={{fontSize:20,fontWeight:800,color:'var(--color-primary)'}}>{freq!=null?freq+'%':'-'}</div>
          <div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:2}}>Frequência</div>
        </div>
        <div className="card card-padding">
          <div style={{fontSize:20,fontWeight:800,color:aluno.situacao==='atencao'?'var(--color-danger)':'var(--color-text-primary)'}}>{aluno.faltas}</div>
          <div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:2}}>Faltas</div>
        </div>
        <div className="card card-padding">
          <div style={{fontSize:20,fontWeight:800}}>{aluno.matricula}</div>
          <div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:2}}>Matrícula</div>
        </div>
      </div>

      <div style={{padding:'16px 20px 0'}}>
        <p className="section-label">RESPONSÁVEL</p>
        <div className="card card-padding">
          <div style={{fontWeight:700}}>{aluno.responsavel?.nome}</div>
          <div style={{fontSize:12,color:'var(--color-text-muted)',marginTop:2}}>{aluno.responsavel?.parentesco} · {aluno.responsavel?.telefone}</div>
        </div>
      </div>

      {aluno.perfilPedagogico && (
        <div style={{padding:'16px 20px 0'}}>
          <p className="section-label">PERFIL PEDAGÓGICO</p>
          <div className="card card-padding">
            <div style={{fontWeight:700}}>{aluno.perfilPedagogico.tipo}</div>
            <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:4}}>{aluno.perfilPedagogico.descricao}</p>
          </div>
        </div>
      )}

      <div style={{padding:'16px 20px 0'}}>
        <p className="section-label">HISTÓRICO COMPLETO</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {timeline.map(ev => (
            <div key={ev.id} className="card card-padding" style={{display:'flex',gap:10}}>
              <span style={{fontSize:18}}>{iconePorTipo[ev.tipo] || '📌'}</span>
              <div>
                <div style={{fontWeight:700,fontSize:14}}>{ev.titulo}</div>
                <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{ev.descricao}</p>
                <p style={{fontSize:11,color:'var(--color-text-muted)',marginTop:6}}>{formatarData(ev.data)}</p>
              </div>
            </div>
          ))}
          {timeline.length === 0 && (
            <p style={{fontSize:13,color:'var(--color-text-muted)',textAlign:'center'}}>Nenhum registro no histórico deste aluno ainda.</p>
          )}
        </div>
      </div>
    </div>
  )
}

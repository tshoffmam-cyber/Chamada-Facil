import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/aluno/AlunoAgendaScreen.jsx
//
// Versao somente-leitura da agenda para o aluno: mostra os horarios fixos
// da propria turma e os proximos eventos/compromissos gerais da escola
// (mockEventos, ver DataContext). Nao tem cadastro de compromisso proprio
// -- diferente da Agenda do professor, que permite criar/editar/remover.
//
// PARA UM BACKEND REAL: ver comentario equivalente em
// pages/professor/AgendaScreen.jsx; aqui os eventos deveriam vir filtrados
// pela escola/organizacao do aluno.
// ---------------------------------------------------------------------------
const DIAS = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

export default function AlunoAgendaScreen() {
  const { user } = useAuth()
  const { alunos, turmas, eventos } = useData()

  const meuAluno = alunos.find(a => a.id === user?.alunoId)
  const minhaTurma = turmas.find(t => t.id === meuAluno?.turmaId)
  const hojeStr = new Date().toISOString().slice(0, 10)
  const proximosEventos = (eventos || []).filter(e => e.data >= hojeStr).sort((a, b) => a.data.localeCompare(b.data))

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Agenda</h1>

      <p className="section-label" style={{ marginBottom: 10 }}>MEUS HORARIOS FIXOS</p>
      <div className="card card-padding" style={{ marginBottom: 20 }}>
        {minhaTurma?.horarios?.length ? minhaTurma.horarios.map((h, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < minhaTurma.horarios.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <span style={{ fontSize: 14 }}>{DIAS[h.dia]}</span>
            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{h.inicio} - {h.fim}</span>
          </div>
        )) : <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Sem horarios cadastrados.</span>}
      </div>

      <p className="section-label" style={{ marginBottom: 10 }}>PROXIMOS EVENTOS DA ESCOLA</p>
      <div className="card card-padding">
        {proximosEventos.length ? proximosEventos.map((e, i) => (
          <div key={e.id} style={{ padding: '10px 0', borderBottom: i < proximosEventos.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{e.titulo}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{e.data} - {e.inicio}</div>
          </div>
        )) : <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Nenhum evento cadastrado.</span>}
      </div>
    </div>
  )
}

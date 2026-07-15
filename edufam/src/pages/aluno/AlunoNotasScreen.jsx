import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/aluno/AlunoNotasScreen.jsx
//
// Notas do aluno por atividade da propria turma, mais a media da turma
// para comparacao. Espelha o card "Desempenho em Atividades" que ja existe
// no perfil do aluno visto pelo professor (pages/professor/AlunoPerfilScreen.jsx),
// mas aqui e a propria visao do aluno -- somente leitura, o aluno nunca
// lanca a propria nota.
// ---------------------------------------------------------------------------
export default function AlunoNotasScreen() {
  const { user } = useAuth()
  const { alunos, atividades, notasAtividades } = useData()

  const meuAluno = alunos.find(a => a.id === user?.alunoId)
  const minhasAtividades = (atividades || []).filter(a => a.turmaId === meuAluno?.turmaId)

  const notas = minhasAtividades.map(ativ => {
    const notasTurma = notasAtividades?.[ativ.id] || {}
    const minhaNota = notasTurma[meuAluno?.id]
    const valores = Object.values(notasTurma)
    const media = valores.length ? (valores.reduce((s, v) => s + v, 0) / valores.length).toFixed(1) : null
    return { ...ativ, minhaNota, media }
  })

  const notasLancadas = notas.filter(n => n.minhaNota !== undefined)
  const mediaGeral = notasLancadas.length
    ? (notasLancadas.reduce((s, n) => s + n.minhaNota, 0) / notasLancadas.length).toFixed(1)
    : null

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Minhas Notas</h1>

      <div className="card card-padding" style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-primary)' }}>{mediaGeral ?? '--'}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Media geral em atividades</div>
      </div>

      <p className="section-label" style={{ marginBottom: 10 }}>ATIVIDADES</p>
      <div className="card card-padding">
        {notas.length ? notas.map((n, i) => (
          <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < notas.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{n.titulo}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Media da turma: {n.media ?? '--'}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary)' }}>{n.minhaNota ?? '--'}</div>
          </div>
        )) : <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Nenhuma atividade lancada ainda.</span>}
      </div>
    </div>
  )
}

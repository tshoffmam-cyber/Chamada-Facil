import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/responsavel/ResponsavelNotasScreen.jsx
//
// Desempenho + histórico completo do filho, na visao do responsavel:
// frequencia, notas lancadas por atividade da turma e a linha do tempo
// de vidaEscolar (mesma fonte usada em VidaEscolarScreen do professor e
// em DiretorAlunoDetalheScreen). Reune "notas" e "historico" numa unica
// tela porque o menu inferior do Portal do Responsavel e limitado a 5
// itens (regra do PRD).
// ---------------------------------------------------------------------------
const iconePorTipo = { atividade: '📘', registro_positivo: '⭐', ocorrencia: '⚠️' }

function formatarData(dataStr) {
  const d = new Date(dataStr)
  if (isNaN(d.getTime())) return dataStr
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function ResponsavelNotasScreen() {
  const { user } = useAuth()
  const { alunos, turmas, atividades, notasAtividades, vidaEscolar } = useData()

  const aluno = alunos.find(a => user?.alunosIds?.includes(a.id))
  const turma = aluno ? turmas.find(t => t.id === aluno.turmaId) : null

  if (!aluno) {
    return <div style={{ padding: 20, color: 'var(--color-text-muted)' }}>Nenhum aluno vinculado a este responsável ainda.</div>
  }

  const totalAulas = aluno.presencas + aluno.faltas
  const freq = totalAulas > 0 ? Math.round((aluno.presencas / totalAulas) * 100) : null

  const atividadesTurma = turma ? atividades.filter(a => a.turmaId === turma.id) : []
  const notasDoAluno = atividadesTurma.map(at => ({ atividade: at, nota: notasAtividades?.[at.id]?.[aluno.id] }))
  const notasValidas = notasDoAluno.filter(n => n.nota !== undefined && n.nota !== null && n.nota !== '')
  const media = notasValidas.length ? (notasValidas.reduce((s, n) => s + Number(n.nota), 0) / notasValidas.length).toFixed(1) : null

  const timeline = (vidaEscolar[aluno.id] || []).slice().sort((a, b) => new Date(b.data) - new Date(a.data))

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{aluno.avatar}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17 }}>{aluno.nome}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{turma?.nome} · {turma?.disciplina}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        <div className="card card-padding">
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary)' }}>{freq !== null ? freq + '%' : '-'}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Frequência</div>
        </div>
        <div className="card card-padding">
          <div style={{ fontSize: 20, fontWeight: 800, color: aluno.situacao === 'atencao' ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>{aluno.faltas}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Faltas</div>
        </div>
        <div className="card card-padding">
          <div style={{ fontSize: 20, fontWeight: 800 }}>{media ?? '-'}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Média</div>
        </div>
      </div>

      <p className="section-label">NOTAS POR ATIVIDADE</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {notasDoAluno.length === 0 && <div className="card card-padding" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Nenhuma atividade cadastrada ainda.</div>}
        {notasDoAluno.map(({ atividade, nota }) => (
          <div key={atividade.id} className="card card-padding" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{atividade.titulo}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>Entrega: {formatarData(atividade.dataEntrega)}</div>
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-primary)' }}>{nota !== undefined && nota !== null && nota !== '' ? nota : '-'}</div>
          </div>
        ))}
      </div>

      <p className="section-label">HISTÓRICO</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {timeline.map(ev => (
          <div key={ev.id} className="card card-padding" style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 18 }}>{iconePorTipo[ev.tipo] || '📌'}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{ev.titulo}</div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{ev.descricao}</p>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6 }}>{formatarData(ev.data)}</p>
            </div>
          </div>
        ))}
        {timeline.length === 0 && (
          <p style={{ fontSize: 13, color: 'var(--color-text-muted)', textAlign: 'center' }}>Nenhum registro no histórico ainda.</p>
        )}
      </div>
    </div>
  )
}

import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/aluno/AlunoHomeScreen.jsx
//
// Home do Portal do Aluno: resumo pessoal (turma, frequencia, proximo
// compromisso) e alerta de faltas. Somente leitura -- o aluno nunca edita
// chamada, notas ou vida escolar, so acompanha.
//
// PARA UM BACKEND REAL: 'meuAluno' hoje vem de mockAlunos filtrado por
// user.alunoId (ver mockData.js). Em producao a API ja devolveria so os
// dados do proprio aluno autenticado (nunca a lista inteira).
// ---------------------------------------------------------------------------
export default function AlunoHomeScreen() {
  const { user } = useAuth()
  const { alunos, turmas, eventos } = useData()

  const meuAluno = alunos.find(a => a.id === user?.alunoId)
  const minhaTurma = turmas.find(t => t.id === meuAluno?.turmaId)

  const totalRegistros = (meuAluno?.presencas || 0) + (meuAluno?.faltas || 0)
  const frequencia = meuAluno && totalRegistros > 0 ? Math.round((meuAluno.presencas / totalRegistros) * 100) : null
  const emAlerta = !!(minhaTurma?.limiteFaltas && meuAluno && meuAluno.faltas >= minhaTurma.limiteFaltas)

  const hojeStr = new Date().toISOString().slice(0, 10)
  const proximoEvento = (eventos || [])
    .filter(e => e.data >= hojeStr)
    .sort((a, b) => a.data.localeCompare(b.data))[0]

  if (!meuAluno) {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Nao encontramos seu registro de aluno. Fale com a secretaria da escola.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Ola,</p>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{(user?.name || 'Aluno').split(' ')[0]}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div className="card card-padding">
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-primary)' }}>{frequencia !== null ? frequencia + '%' : '--'}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Frequencia</div>
        </div>
        <div className="card card-padding">
          <div style={{ fontSize: 26, fontWeight: 800, color: emAlerta ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>{meuAluno.faltas}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Faltas no periodo</div>
        </div>
      </div>

      {emAlerta && (
        <div className="card card-padding" style={{ marginBottom: 20, border: '1px solid var(--color-danger)' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-danger)' }}>Atencao: voce atingiu o limite de faltas da turma. Fale com seu responsavel.</span>
        </div>
      )}

      <p className="section-label" style={{ marginBottom: 10 }}>MINHA TURMA</p>
      <div className="card card-padding" style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700 }}>{minhaTurma?.nome || '--'}</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{minhaTurma?.disciplina} - {minhaTurma?.turno}</div>
      </div>

      <p className="section-label" style={{ marginBottom: 10 }}>PROXIMO COMPROMISSO</p>
      <div className="card card-padding">
        {proximoEvento ? (
          <div>
            <div style={{ fontWeight: 700 }}>{proximoEvento.titulo}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{proximoEvento.data} - {proximoEvento.inicio}</div>
          </div>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Nenhum compromisso cadastrado.</span>
        )}
      </div>
    </div>
  )
}

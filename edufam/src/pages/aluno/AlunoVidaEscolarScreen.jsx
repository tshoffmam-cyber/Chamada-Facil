import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/aluno/AlunoVidaEscolarScreen.jsx
//
// Timeline de vida escolar do proprio aluno (mesma fonte de dados usada
// pelo professor em pages/professor/VidaEscolarScreen.jsx e pelo Diretor),
// somente leitura. Reaproveita vidaEscolar[alunoId] do DataContext.
// ---------------------------------------------------------------------------
const ICONE_TIPO = {
  atividade: 'A',
  registro_positivo: '+',
  ocorrencia: '!',
  elogio: '+',
  comunicacao: 'C',
}

export default function AlunoVidaEscolarScreen() {
  const { user } = useAuth()
  const { alunos, vidaEscolar } = useData()

  const meuAluno = alunos.find(a => a.id === user?.alunoId)
  const registros = (vidaEscolar?.[meuAluno?.id] || []).slice().sort((a, b) => b.data.localeCompare(a.data))

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Minha Vida Escolar</h1>

      {registros.length ? registros.map(r => (
        <div key={r.id} className="card card-padding" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{
              width: 26, height: 26, borderRadius: '50%', background: 'var(--color-primary)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0
            }}>{ICONE_TIPO[r.tipo] || '*'}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{r.titulo}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{r.descricao}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>{new Date(r.data).toLocaleDateString('pt-BR')}</div>
            </div>
          </div>
        </div>
      )) : (
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Nenhum registro ainda.</p>
      )}
    </div>
  )
}

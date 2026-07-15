import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/aluno/AlunoPerfilScreen.jsx
//
// Perfil do proprio aluno logado. Nome do arquivo intencionalmente igual
// ao pages/professor/AlunoPerfilScreen.jsx (perfil de UM aluno visto pelo
// professor), mas moram em pastas diferentes; ao importar em App.jsx, use
// um alias (ex: AlunoMeuPerfilScreen) para nao colidir os nomes.
// ---------------------------------------------------------------------------
export default function AlunoPerfilScreen() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { alunos, turmas } = useData()

  const meuAluno = alunos.find(a => a.id === user?.alunoId)
  const minhaTurma = turmas.find(t => t.id === meuAluno?.turmaId)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const linhas = [
    { label: 'Matricula', value: meuAluno?.matricula },
    { label: 'Turma', value: minhaTurma?.nome },
    { label: 'Email', value: user?.email },
  ]

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80, height: 80, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: 'white', margin: '0 auto'
        }}>
          {meuAluno?.avatar || 'A'}
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 12 }}>{user?.name}</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>{minhaTurma?.nome} - {user?.escola}</p>
        <span className="badge badge-primary" style={{ marginTop: 8, display: 'inline-flex' }}>Aluno</span>
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
        Meus dados
      </p>
      <div className="card" style={{ marginBottom: 24 }}>
        {linhas.map((item, i) => (
          <div key={item.label} style={{ padding: '14px 16px', borderBottom: i < linhas.length - 1 ? '1px solid var(--color-border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{item.value || '--'}</span>
          </div>
        ))}
      </div>

      <button className="btn" style={{ width: '100%', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', background: 'transparent' }} onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  )
}

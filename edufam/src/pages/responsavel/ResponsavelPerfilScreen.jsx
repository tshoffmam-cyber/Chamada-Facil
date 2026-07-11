import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/responsavel/ResponsavelPerfilScreen.jsx
//
// Perfil do responsavel. Nao reaproveita o PerfilScreen.jsx do professor
// porque aquele mostra estatisticas da ESCOLA INTEIRA (total de turmas/
// alunos), o que nao faz sentido para um responsavel — aqui mostramos o(s)
// filho(s) vinculados a ele, que e a informacao relevante para esse papel.
// ---------------------------------------------------------------------------
export default function ResponsavelPerfilScreen() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { alunos, turmas } = useData()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const filhos = alunos.filter(a => user?.alunosIds?.includes(a.id))

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80, height: 80, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: 'white', margin: '0 auto'
        }}>
          {user?.avatar || 'R'}
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 12 }}>{user?.name}</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>{user?.escola}</p>
        <span className="badge badge-primary" style={{ marginTop: 8, display: 'inline-flex' }}>Responsável</span>
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
        Meu(s) filho(s)
      </p>
      <div style={{ marginBottom: 24 }}>
        {filhos.map(f => {
          const turma = turmas.find(t => t.id === f.turmaId)
          return (
            <div key={f.id} className="card card-padding" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>{f.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{f.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{turma?.nome} · Matrícula {f.matricula}</div>
              </div>
            </div>
          )
        })}
        {filhos.length === 0 && <div className="card card-padding" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Nenhum aluno vinculado.</div>}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
        Conta
      </p>
      <div className="card" style={{ marginBottom: 24 }}>
        {[
          { label: 'Email', value: user?.email },
          { label: 'Função', value: 'Responsável' },
        ].map((item, i) => (
          <div key={item.label} style={{ padding: '14px 16px', borderBottom: i === 0 ? '1px solid var(--color-border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>

      <button className="btn" style={{ width: '100%', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', background: 'transparent' }} onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  )
}

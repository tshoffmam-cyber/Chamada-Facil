import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
export default function PerfilScreen() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { alunos, turmas } = useData()
    function handleLogout() {
      logout()
      navigate('/login', { replace: true })
    }
  const totalAlunos = alunos.length
  const totalTurmas = turmas.length
  return (
    <div style={{ padding: '20px 20px 24px' }}>
      {/* Avatar e nome */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80,
          height: 80,
          background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontWeight: 800,
          color: 'white',
          margin: '0 auto 12px',
          boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
        }}>
          {user?.avatar || 'P'}
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>{user?.name}</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          {user?.disciplina && `${user.disciplina} • `}{user?.escola}
        </p>
        <span className="badge badge-primary" style={{ marginTop: 8, display: 'inline-flex' }}>
          {user?.role === 'professor' ? 'Professor' : user?.role === 'diretor' ? 'Diretora' : 'ADM'}
        </span>
      </div>

      {/* Estatisticas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Turmas', value: totalTurmas, color: 'var(--color-primary)' },
          { label: 'Alunos', value: totalAlunos, color: 'var(--color-success)' },
        ].map(s => (
          <div key={s.label} className="card card-padding" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Configuracoes */}
      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
        Conta
      </p>
      <div className="card" style={{ marginBottom: 24 }}>
        {[
          { label: 'Email', value: user?.email },
          { label: 'Funcao', value: user?.role },
        ].map((item, i) => (
          <div key={item.label} style={{
            padding: '14px 16px',
            borderBottom: i === 0 ? '1px solid var(--color-border)' : 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Sobre o app */}
      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
        Sobre
      </p>
      <div className="card card-padding" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>EduFam</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Versao 1.0 • A vida escolar na palma da mao.</div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="btn btn-ghost btn-full"
        style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
      >
        Sair da conta
      </button>
    </div>
  )
}

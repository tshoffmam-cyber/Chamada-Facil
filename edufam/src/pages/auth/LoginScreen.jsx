import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    setLoading(false)
    if (result.ok) {
      navigate('/home', { replace: true })
    } else {
      setError(result.error)
    }
  }

  function loginDemo(demoEmail, demoPassword) {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
      padding: '24px 20px',
      maxWidth: 430,
      margin: '0 auto',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          width: 72,
          height: 72,
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          borderRadius: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text-primary)', margin: 0 }}>EduFam</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>A vida escolar na palma da mao.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            E-mail
          </label>
          <input
            className="input"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div style={{ marginBottom: error ? 12 : 24 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Senha
          </label>
          <input
            className="input"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div style={{ color: 'var(--color-danger)', fontSize: 13, marginBottom: 16, textAlign: 'center', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <button
          className="btn btn-primary btn-full"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
          ) : 'Entrar'}
        </button>
      </form>

      {/* Demo access */}
      <div style={{
        marginTop: 32,
        width: '100%',
        background: 'var(--color-surface)',
        borderRadius: 16,
        border: '1px solid var(--color-border)',
        padding: 16,
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Acesso de demonstracao
        </p>
        <button
          onClick={() => loginDemo('professor@escola.com', '123456')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            cursor: 'pointer',
            marginBottom: 8,
            fontFamily: 'var(--font-family)',
          }}
        >
          <span style={{ fontSize: 20 }}>👨‍🏫</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>Professor Demo</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>professor@escola.com</div>
          </div>
        </button>
        <button
          onClick={() => loginDemo('diretor@escola.com', '123456')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            cursor: 'pointer',
            fontFamily: 'var(--font-family)',
          }}
        >
          <span style={{ fontSize: 20 }}>🏫</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>Diretora Demo</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>diretor@escola.com</div>
          </div>
        </button>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center' }}>
        EduFam v1.0 • Todos os direitos reservados
      </p>
    </div>
  )
}

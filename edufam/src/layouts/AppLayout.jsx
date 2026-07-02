import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  // Hide bottom nav on subpages like modo-aula, chamada etc
  const hideNav = ['/modo-aula', '/chamada', '/atividade', '/aluno', '/vida-escolar']
    .some(p => location.pathname.startsWith(p))

  return (
    <div className="app-shell">
      <div className="page-content">
        <Outlet />
      </div>

      {!hideNav && (
        <nav className="bottom-nav">
          <button
            className={"bottom-nav-item" + (isActive('/home') ? ' active' : '')}
            onClick={() => navigate('/home')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </button>

          <button
            className={"bottom-nav-item" + (isActive('/organizacoes') ? ' active' : '')}
            onClick={() => navigate('/organizacoes')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M9 21V9l3-6 3 6v12M5 21V12l2-3M19 21V12l-2-3"/>
            </svg>
            <span>Escolas</span>
          </button>

          <button
            className="bottom-nav-ia"
            onClick={() => navigate('/ia')}
          >
            <div className="bottom-nav-ia-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z"/>
                <path d="M5 3l1 2M19 3l-1 2M5 21l1-2M19 21l-1-2"/>
              </svg>
            </div>
            <span style={{fontSize: '10px', fontWeight: 700, color: 'var(--color-ia)', marginTop: 2}}>IA EduFam</span>
          </button>

          <button
            className={"bottom-nav-item" + (isActive('/comunicacao') ? ' active' : '')}
            onClick={() => navigate('/comunicacao')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <span>Msgs</span>
          </button>

          <button
            className={"bottom-nav-item" + (isActive('/perfil') ? ' active' : '')}
            onClick={() => navigate('/perfil')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Perfil</span>
          </button>
        </nav>
      )}
    </div>
  )
}

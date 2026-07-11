import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ---------------------------------------------------------------------------
// layouts/AppLayoutDiretor.jsx
//
// Layout e navegacao inferior proprios da area do Diretor — papel de
// gestao da escola (nao da aula, acompanha professores/turmas/alunos e
// se comunica com a equipe). Separado do AppLayout (professor) e do
// AppLayoutAdm (administrador global da plataforma). Mesma regra do PRD
// de no maximo 5 itens no menu inferior.
// ---------------------------------------------------------------------------
export default function AppLayoutDiretor() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div className="app-shell">
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'14px 20px',background:'var(--color-primary)',color:'white'}}>
        <span style={{fontSize:11,fontWeight:800,letterSpacing:'.08em',background:'rgba(255,255,255,.18)',padding:'3px 8px',borderRadius:8}}>DIREÇÃO</span>
        <span style={{fontSize:13,fontWeight:600,opacity:.95}}>{user?.escola || 'EduFam'}</span>
      </div>
      <div className="page-content"><Outlet /></div>
      <nav className="bottom-nav">
        <button className={"bottom-nav-item"+(isActive('/diretor/home')?' active':'')} onClick={()=>navigate('/diretor/home')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Painel</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/diretor/professores')?' active':'')} onClick={()=>navigate('/diretor/professores')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
          <span>Professores</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/diretor/recados')?' active':'')} onClick={()=>navigate('/diretor/recados')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span>Recados</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/diretor/alunos')?' active':'')} onClick={()=>navigate('/diretor/alunos')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span>Alunos</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/diretor/perfil')?' active':'')} onClick={()=>navigate('/diretor/perfil')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  )
}

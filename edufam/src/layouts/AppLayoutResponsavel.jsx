import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ---------------------------------------------------------------------------
// layouts/AppLayoutResponsavel.jsx
//
// Layout e navegacao inferior do Portal do Responsavel (pai/mae/responsavel
// legal). Papel novo, somente leitura na maior parte (nao da aula, nao
// faz chamada, nao gerencia a escola) — acompanha o(s) filho(s), recebe
// recados da escola e pode escrever para o professor. Mesma regra do PRD
// de no maximo 5 itens no menu inferior.
//
// PARA UM BACKEND REAL: hoje um responsavel so enxerga o(s) aluno(s)
// listados em user.alunosIds (ver mockData.js). Em producao isso viria
// de uma tabela de vinculo responsavel-aluno, com um responsavel podendo
// ter filhos em escolas diferentes.
// ---------------------------------------------------------------------------
export default function AppLayoutResponsavel() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div className="app-shell">
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'14px 20px',background:'var(--color-primary)',color:'white'}}>
        <span style={{fontSize:11,fontWeight:800,letterSpacing:'.08em',background:'rgba(255,255,255,.18)',padding:'3px 8px',borderRadius:8}}>FAMÍLIA</span>
        <span style={{fontSize:13,fontWeight:600,opacity:.95}}>{user?.escola || 'EduFam'}</span>
      </div>
      <div className="page-content"><Outlet /></div>
      <nav className="bottom-nav">
        <button className={"bottom-nav-item"+(isActive('/responsavel/home')?' active':'')} onClick={()=>navigate('/responsavel/home')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/responsavel/agenda')?' active':'')} onClick={()=>navigate('/responsavel/agenda')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Agenda</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/responsavel/notas')?' active':'')} onClick={()=>navigate('/responsavel/notas')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
          <span>Notas</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/responsavel/recados')?' active':'')} onClick={()=>navigate('/responsavel/recados')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span>Recados</span>
        </button>
        <button className={"bottom-nav-item"+(isActive('/responsavel/perfil')?' active':'')} onClick={()=>navigate('/responsavel/perfil')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  )
}

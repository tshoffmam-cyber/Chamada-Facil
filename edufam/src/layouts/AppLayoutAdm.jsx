import { Outlet, useNavigate, useLocation } from 'react-router-dom'

// ---------------------------------------------------------------------------
// layouts/AppLayoutAdm.jsx
//
// Layout e navegacao inferior proprios para a area do ADM (administrador
// global da plataforma), separado do AppLayout usado por professor/diretor.
// Mesma regra do PRD de no maximo 5 itens no menu inferior.
// ---------------------------------------------------------------------------
export default function AppLayoutAdm() {
const navigate = useNavigate()
const location = useLocation()
const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

return (
<div className="app-shell">
<div style={{display:'flex',alignItems:'center',gap:8,padding:'14px 20px',background:'var(--color-text-primary)',color:'white'}}>
<span style={{fontSize:11,fontWeight:800,letterSpacing:'.08em',background:'rgba(255,255,255,.15)',padding:'3px 8px',borderRadius:8}}>ADM</span>
<span style={{fontSize:13,fontWeight:600,opacity:.85}}>Painel administrativo EduFam</span>
</div>
<div className="page-content"><Outlet /></div>
<nav className="bottom-nav">
<button className={"bottom-nav-item"+(isActive('/adm/home')?' active':'')} onClick={()=>navigate('/adm/home')}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
<span>Painel</span>
</button>
<button className={"bottom-nav-item"+(isActive('/adm/usuarios')?' active':'')} onClick={()=>navigate('/adm/usuarios')}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
<span>Usuários</span>
</button>
<button className={"bottom-nav-item"+(isActive('/adm/suporte')?' active':'')} onClick={()=>navigate('/adm/suporte')}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
<span>Suporte</span>
</button>
<button className={"bottom-nav-item"+(isActive('/adm/configuracoes')?' active':'')} onClick={()=>navigate('/adm/configuracoes')}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
<span>Config</span>
</button>
<button className={"bottom-nav-item"+(isActive('/adm/perfil')?' active':'')} onClick={()=>navigate('/adm/perfil')}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
<span>Perfil</span>
</button>
</nav>
</div>
)
}

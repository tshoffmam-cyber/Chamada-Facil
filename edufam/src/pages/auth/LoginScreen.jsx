import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  async function handleLogin(e) {
    e.preventDefault(); setErro(''); setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const result = login(email, senha)
    setLoading(false)
    if (result.ok) { navigate('/home', { replace: true }) }
    else { setErro(result.error) }
  }
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'var(--color-bg)',padding:'24px 20px',maxWidth:430,margin:'0 auto'}}>
      <div style={{textAlign:'center',marginBottom:40}}>
        <div style={{width:72,height:72,background:'linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',boxShadow:'0 8px 24px rgba(37,99,235,.3)'}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <h1 style={{fontSize:28,fontWeight:800,margin:0}}>EduFam</h1>
        <p style={{fontSize:14,color:'var(--color-text-secondary)',marginTop:4}}>A vida escolar na palma da mão.</p>
      </div>
      <form onSubmit={handleLogin} style={{width:'100%'}}>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,textTransform:'uppercase',letterSpacing:'.06em'}}>E-mail</label>
          <input className="input" type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/>
        </div>
        <div style={{marginBottom:erro?12:24}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,textTransform:'uppercase',letterSpacing:'.06em'}}>Senha</label>
          <input className="input" type="password" placeholder="••••••" value={senha} onChange={e=>setSenha(e.target.value)} required autoComplete="current-password"/>
        </div>
        {erro && <div style={{color:'var(--color-danger)',fontSize:13,marginBottom:16,textAlign:'center',fontWeight:500}}>{erro}</div>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" style={{width:20,height:20,borderWidth:2}}/> : 'Entrar'}
        </button>
      </form>
      <div style={{marginTop:32,width:'100%',background:'var(--color-surface)',border:'1px solid var(--color-border)',borderRadius:16,padding:16}}>
        <p style={{fontSize:12,fontWeight:700,color:'var(--color-text-muted)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:12}}>ACESSO DEMO</p>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[{label:'👨‍🏫 Professor',email:'professor@escola.com',senha:'demo123'},{label:'🏫 Diretor',email:'diretor@escola.com',senha:'demo123'},{label:'⚙️ ADM',email:'adm@edufam.com',senha:'admin123'}].map(d=>(
            <button key={d.email} onClick={()=>{setEmail(d.email);setSenha(d.senha)}} style={{background:'var(--color-bg)',border:'1px solid var(--color-border)',borderRadius:10,padding:'10px 14px',fontSize:13,fontWeight:600,cursor:'pointer',textAlign:'left',fontFamily:'var(--font-family)',color:'var(--color-text-primary)'}}>
              {d.label} — {d.email}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

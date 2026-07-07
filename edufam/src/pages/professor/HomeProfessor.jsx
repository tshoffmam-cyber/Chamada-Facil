import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { mockTurmas, proximaAulaHoje } from '../../data/mockData'
function getSaudacao(){const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}
export default function HomeProfessor() {
  const {user} = useAuth()
  const {mensagens, eventos} = useData()
  const navigate = useNavigate()
  const nome = user?.name?.split(' ')[1] || user?.name?.split(' ')[0] || 'Professor'
  const hoje = new Date().getDay()
  // Filtrar turmas do professor logado
  const minhasTurmas = mockTurmas.filter(t => t.professorId === user?.id)
  const turmasHoje = minhasTurmas.filter(t => t.horarios.some(h => h.dia === hoje))
  const naoLidas = mensagens.filter(m => !m.lida && m.para === user?.id).length
  const proxima = proximaAulaHoje(user?.id)
  const totalAlunos = minhasTurmas.reduce((acc,t)=>acc+t.totalAlunos,0)
  const hojeISO = new Date().toISOString().slice(0,10)
  const eventosHoje = eventos.filter(e => e.data === hojeISO).length
  return (
    <div style={{paddingBottom:24}}>
      <div style={{padding:'20px 20px 0'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
          <div>
            <p style={{fontSize:13,color:'var(--color-text-secondary)',marginBottom:2}}>{getSaudacao()},</p>
            <h1 style={{fontSize:22,fontWeight:800,color:'var(--color-text-primary)'}}>{nome} 👋</h1>
          </div>
          <button onClick={()=>navigate('/perfil')} style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#2563EB,#7C3AED)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:16,fontWeight:700,fontFamily:'var(--font-family)'}}>
            {user?.avatar||'P'}
          </button>
        </div>
      </div>
      <div style={{padding:'0 20px 16px'}}>
        <button onClick={()=>navigate('/agenda')} className="card card-padding" style={{width:'100%',display:'flex',alignItems:'center',gap:12,border:'none',cursor:'pointer',textAlign:'left'}}>
          <div style={{width:44,height:44,borderRadius:14,background:'var(--color-primary-light)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:20}}>📅</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700,color:'var(--color-text-primary)'}}>Agenda</div>
            <div style={{fontSize:13,color:'var(--color-text-secondary)'}}>{eventosHoje>0?(eventosHoje+' compromisso(s) hoje'):'Ver aulas e compromissos'}</div>
          </div>
        </button>
      </div>
      {proxima && (
        <div style={{padding:'16px 20px 0'}}>
          <div style={{background:'linear-gradient(135deg,#1D4ED8,#2563EB)',borderRadius:20,padding:20,cursor:'pointer'}} onClick={()=>navigate('/turma/'+proxima.turma.id)}>
            <p style={{fontSize:11,color:'rgba(255,255,255,.7)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:6}}>⏰ Próxima aula</p>
            <h2 style={{color:'white',fontSize:20,fontWeight:800,margin:0}}>{proxima.turma.nome}</h2>
            <p style={{color:'rgba(255,255,255,.8)',fontSize:13,marginTop:4}}>{proxima.turma.disciplina} · {proxima.horario.inicio} – {proxima.horario.fim} · Sala {proxima.turma.sala}</p>
            <button onClick={e=>{e.stopPropagation();navigate('/turma/'+proxima.turma.id)}} style={{marginTop:16,background:'white',color:'#2563EB',border:'none',borderRadius:14,padding:'12px 20px',fontSize:14,fontWeight:700,cursor:'pointer',width:'100%',fontFamily:'var(--font-family)'}}>
              ▶ Entrar no Modo Aula
            </button>
          </div>
        </div>
      )}
      <div style={{padding:'16px 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {[{label:'Aulas hoje',valor:turmasHoje.length,cor:'var(--color-primary)'},{label:'Msgs novas',valor:naoLidas,cor:naoLidas>0?'var(--color-danger)':'var(--color-text-primary)'},{label:'Alunos',valor:totalAlunos,cor:'var(--color-success)'}].map(s=>(
          <div key={s.label} className="card card-padding" style={{textAlign:'center'}}>
            <div style={{fontSize:24,fontWeight:800,color:s.cor}}>{s.valor}</div>
            <div style={{fontSize:11,color:'var(--color-text-muted)',fontWeight:500,marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{padding:'20px 20px 0'}}>
        <p className="section-label">MINHAS TURMAS</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {minhasTurmas.length===0&&<div className="empty-state"><div className="empty-state-icon">🏫</div><div className="empty-state-title">Nenhuma turma atribuída</div></div>}
          {minhasTurmas.map(t=>(
            <div key={t.id} className="card" style={{padding:'14px 16px',cursor:'pointer'}} onClick={()=>navigate('/turma/'+t.id)}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>{t.nome}</div>
                  <div style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{t.disciplina} · Turno {t.turno} · Sala {t.sala}</div>
                  <div style={{marginTop:8}}><span className="badge badge-primary">{t.totalAlunos} alunos</span></div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

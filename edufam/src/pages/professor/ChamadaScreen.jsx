import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
const STATUS_ORDEM = [null, 'presente', 'falta', 'justificado']
const STATUS_CONFIG = {
  null: {label:'',bg:'#F1F5F9',cor:'#64748B',borda:'#E2E8F0'},
  presente: {label:'P',bg:'#DCFCE7',cor:'#16A34A',borda:'#86EFAC'},
  falta: {label:'F',bg:'#FEE2E2',cor:'#DC2626',borda:'#FCA5A5'},
  justificado: {label:'J',bg:'#FEF3C7',cor:'#B45309',borda:'#FDE68A'},
}
export default function ChamadaScreen() {
  const {turmaId}=useParams(); const navigate=useNavigate()
  const {user}=useAuth()
  const {salvarChamada, turmas, alunos: todosAlunos}=useData()
  const turma=turmas.find(t=>t.id===turmaId)
  const alunos=todosAlunos.filter(a=>a.turmaId===turmaId)
  const [registros,setRegistros]=useState({})
  const [finalizada,setFinalizada]=useState(false)
  const [showTutorial,setShowTutorial]=useState(()=>!localStorage.getItem('edufam_tutorial_chamada'))
  function alternarStatus(alunoId){
    if(finalizada)return
    setRegistros(prev=>{
      const atual=prev[alunoId]||null
      const idx=STATUS_ORDEM.indexOf(atual)
      const prox=STATUS_ORDEM[(idx+1)%STATUS_ORDEM.length]
      return {...prev,[alunoId]:prox}
    })
  }
  function marcarTodos(status){if(finalizada)return;const n={};alunos.forEach(a=>{n[a.id]=status});setRegistros(n)}
  function finalizarChamada(){
    const data=new Date().toISOString().split('T')[0]
    salvarChamada(turmaId, data, registros) // ✅ Persiste!
    setFinalizada(true)
  }
  const presentes=alunos.filter(a=>registros[a.id]==='presente').length
  const faltas=alunos.filter(a=>registros[a.id]==='falta').length
  const justificados=alunos.filter(a=>registros[a.id]==='justificado').length
  const naoMarcados=alunos.filter(a=>!registros[a.id]).length
  // Guarda de posse (ver ModoAula.jsx para detalhes do motivo/handoff de backend)
  if(!turma || turma.professorId !== user?.id)return null
  return (
    <div style={{paddingBottom:24}}>
      {showTutorial&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:300,display:'flex',alignItems:'flex-end',padding:20}}>
          <div style={{background:'white',borderRadius:24,padding:24,width:'100%',maxWidth:430,margin:'0 auto'}}>
            <h3 style={{fontSize:18,fontWeight:800,marginBottom:16}}>Como fazer a chamada</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:20}}>
              {[{s:'presente',l:'Toque 1x → Presente'},{s:'falta',l:'Toque 2x → Falta'},{s:'justificado',l:'Toque 3x → Justificado'},{s:null,l:'Toque 4x → Limpar'}].map(({s,l})=>{
                const cfg=STATUS_CONFIG[s]
                return <div key={String(s)} style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:44,height:44,borderRadius:'50%',background:cfg.bg,border:'2px solid '+cfg.borda,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:cfg.cor,fontSize:16,flexShrink:0}}>{cfg.label||'—'}</div>
                  <span style={{fontSize:14,color:'var(--color-text-secondary)'}}>{l}</span>
                </div>
              })}
            </div>
            <button className="btn btn-primary" onClick={()=>{localStorage.setItem('edufam_tutorial_chamada','1');setShowTutorial(false)}}>Entendi, começar!</button>
          </div>
        </div>
      )}
      <div style={{padding:'16px 20px',background:'var(--color-surface)',borderBottom:'1px solid var(--color-border)',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
          <button onClick={()=>navigate('/turma/'+turmaId)} style={{width:36,height:36,background:'var(--color-bg)',border:'1px solid var(--color-border)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div style={{flex:1}}><h2 style={{fontSize:17,fontWeight:800,margin:0}}>Chamada</h2><p style={{fontSize:13,color:'var(--color-text-secondary)',margin:0}}>{turma?.nome}</p></div>
          {finalizada&&<span className="badge badge-success">✓ Finalizada</span>}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:6}}>
          {[{l:'Presentes',v:presentes,c:'var(--color-success)'},{l:'Faltas',v:faltas,c:'var(--color-danger)'},{l:'Justif.',v:justificados,c:'var(--color-warning)'},{l:'Pendentes',v:naoMarcados,c:'var(--color-text-muted)'}].map(s=>(
            <div key={s.l} style={{textAlign:'center',background:'var(--color-bg)',borderRadius:10,padding:'8px 4px'}}>
              <div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--color-text-muted)',fontWeight:500}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {!finalizada&&(
        <div style={{padding:'12px 20px',display:'flex',gap:8}}>
          <button onClick={()=>marcarTodos('presente')} style={{flex:1,background:'var(--color-success-light)',border:'1px solid #86EFAC',borderRadius:10,padding:'8px',fontSize:12,fontWeight:700,color:'var(--color-success)',cursor:'pointer',fontFamily:'var(--font-family)'}}>✓ Todos presentes</button>
          <button onClick={()=>marcarTodos(null)} style={{flex:1,background:'var(--color-bg)',border:'1px solid var(--color-border)',borderRadius:10,padding:'8px',fontSize:12,fontWeight:700,color:'var(--color-text-secondary)',cursor:'pointer',fontFamily:'var(--font-family)'}}>↺ Limpar tudo</button>
        </div>
      )}
      <div style={{padding:'0 20px'}}>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {alunos.map(aluno=>{
            const status=registros[aluno.id]||null
            const cfg=STATUS_CONFIG[status]
            return (
              <div key={aluno.id} onClick={()=>alternarStatus(aluno.id)} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 16px',background:'var(--color-surface)',border:'1.5px solid var(--color-border)',borderRadius:14,cursor:finalizada?'default':'pointer'}}>
                <div style={{width:44,height:44,borderRadius:'50%',background:cfg.bg,border:'2px solid '+cfg.borda,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:cfg.cor,fontSize:18,flexShrink:0}}>{cfg.label||'?'}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:15}}>{aluno.nome}</div>
                  {aluno.perfilPedagogico&&<span style={{fontSize:11,background:'var(--color-ia-light)',color:'var(--color-ia)',borderRadius:6,padding:'2px 8px',fontWeight:600}}>{aluno.perfilPedagogico.tipo}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {!finalizada&&(
        <div style={{padding:'20px 20px 0'}}>
          <button onClick={finalizarChamada} className="btn btn-primary" disabled={naoMarcados>0} style={{opacity:naoMarcados>0?.6:1}}>
            {naoMarcados>0?'Marque todos os alunos ('+naoMarcados+' pendentes)':'✓ Finalizar Chamada'}
          </button>
        </div>
      )}
    </div>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { mockTurmas, mockAlunos } from '../../data/mockData'
const acoes = [
  {id:'chamada',label:'Chamada',cor:'#2563EB',path:'chamada'},
  {id:'atividade',label:'Atividade',cor:'#16A34A',path:'atividade'},
  {id:'vida',label:'Vida Escolar',cor:'#7C3AED',path:'vida-escolar'},
  {id:'comunicar',label:'Comunicar Resp.',cor:'#0891B2',path:'comunicacao'},
]
export default function ModoAula() {
  const {turmaId}=useParams(); const navigate=useNavigate()
  const turma=mockTurmas.find(t=>t.id===turmaId)
  const alunos=mockAlunos.filter(a=>a.turmaId===turmaId)
  if(!turma) return <div style={{padding:24,textAlign:'center'}}><p>Turma não encontrada</p><button onClick={()=>navigate('/home')} className="btn btn-primary" style={{marginTop:16}}>Voltar</button></div>
  return (
    <div style={{paddingBottom:24}}>
      <div style={{background:'linear-gradient(135deg,#1D4ED8,#2563EB)',padding:'20px 20px 24px'}}>
        <button onClick={()=>navigate('/home')} style={{background:'rgba(255,255,255,.15)',border:'none',borderRadius:10,width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',marginBottom:16}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <p style={{color:'rgba(255,255,255,.7)',fontSize:13,marginBottom:4}}>Modo Aula</p>
        <h1 style={{color:'white',fontSize:24,fontWeight:800,margin:0}}>{turma.nome}</h1>
        <p style={{color:'rgba(255,255,255,.8)',fontSize:14,marginTop:4}}>{turma.disciplina} · {alunos.length} alunos · Sala {turma.sala}</p>
        <div style={{display:'flex',gap:12,marginTop:16}}>
          {[{label:'Alunos',valor:alunos.length,cor:'#86EFAC'},{label:'Turno',valor:turma.turno,cor:'#C4B5FD'},{label:'Sala',valor:turma.sala,cor:'#FDE68A'}].map(s=>(
            <div key={s.label} style={{background:'rgba(255,255,255,.12)',borderRadius:10,padding:'8px 12px',flex:1,textAlign:'center'}}>
              <div style={{color:s.cor,fontWeight:800,fontSize:16}}>{s.valor}</div>
              <div style={{color:'rgba(255,255,255,.7)',fontSize:11,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:'20px 20px 0'}}>
        <p className="section-label">O QUE DESEJA FAZER?</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {acoes.map(a=>(
            <button key={a.id} onClick={()=>{
              if(a.path==='chamada')navigate('/turma/'+turmaId+'/chamada')
              else if(a.path==='atividade')navigate('/turma/'+turmaId+'/atividade')
              else if(a.path==='vida-escolar')navigate('/turma/'+turmaId+'/vida-escolar')
              else if(a.path==='comunicacao')navigate('/comunicacao')
            }} style={{background:'var(--color-surface)',border:'1.5px solid var(--color-border)',borderRadius:16,padding:'18px 14px',display:'flex',flexDirection:'column',alignItems:'flex-start',gap:10,cursor:'pointer',fontFamily:'var(--font-family)',textAlign:'left'}}>
              <div style={{width:40,height:40,background:a.cor+'18',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:a.cor}}/>
              </div>
              <span style={{fontSize:14,fontWeight:700,color:'var(--color-text-primary)'}}>{a.label}</span>
            </button>
          ))}
        </div>
        <div style={{marginTop:16}}>
          <p className="section-label">ALUNOS ({alunos.length})</p>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {alunos.map(a=>(
              <div key={a.id} className="card" style={{padding:'12px 16px',display:'flex',alignItems:'center',gap:12,cursor:'pointer'}} onClick={()=>navigate('/turma/'+turmaId+'/aluno/'+a.id)}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#2563EB,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:14,flexShrink:0}}>{a.avatar}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{a.nome}</div>
                  <div style={{fontSize:12,color:'var(--color-text-secondary)'}}>Mat. {a.matricula}</div>
                </div>
                {a.perfilPedagogico && <span className="badge badge-ia">{a.perfilPedagogico.tipo}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

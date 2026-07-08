import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
export default function AlunoPerfilScreen() {
  const {alunoId}=useParams(); const navigate=useNavigate()
    const {vidaEscolar, alunos: todosAlunos, turmas}=useData()
  const aluno=todosAlunos.find(a=>a.id===alunoId)
  const turma=aluno?turmas.find(t=>t.id===aluno.turmaId):null
  const registros=(vidaEscolar[alunoId]||[]).sort((a,b)=>new Date(b.data)-new Date(a.data))
  if(!aluno) return <div style={{padding:24,textAlign:'center'}}><p>Aluno não encontrado</p><button onClick={()=>navigate(-1)} className="btn btn-primary" style={{marginTop:16}}>Voltar</button></div>
  // ✅ Corrigido: campo correto é presencas, com proteção contra divisão por zero
  const total=aluno.presencas+aluno.faltas
  const presencaPct=total>0?Math.round((aluno.presencas/total)*100):0
  return (
    <div style={{paddingBottom:32}}>
      <div style={{background:aluno.perfilPedagogico?'linear-gradient(135deg,#7C3AED,#9333EA)':'linear-gradient(135deg,#1D4ED8,#2563EB)',padding:'20px 20px 28px'}}>
        <button onClick={()=>navigate(-1)} style={{background:'rgba(255,255,255,.15)',border:'none',borderRadius:10,width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',marginBottom:16}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:60,height:60,background:'rgba(255,255,255,.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:'white'}}>{aluno.avatar}</div>
          <div>
            <h1 style={{color:'white',fontSize:20,fontWeight:800,margin:0}}>{aluno.nome}</h1>
            <p style={{color:'rgba(255,255,255,.75)',fontSize:13,margin:'4px 0 0'}}>{turma?.nome} · Mat. {aluno.matricula}</p>
            {aluno.perfilPedagogico&&<div style={{marginTop:8,background:'rgba(255,255,255,.2)',borderRadius:8,padding:'4px 10px',display:'inline-block',fontSize:12,fontWeight:700,color:'white'}}>Perfil: {aluno.perfilPedagogico.tipo}</div>}
          </div>
        </div>
      </div>
      <div style={{padding:'16px 20px 0',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {[{label:'Presenças',valor:aluno.presencas,cor:'var(--color-success)'},{label:'Faltas',valor:aluno.faltas,cor:'var(--color-danger)'},{label:'Freq.',valor:presencaPct+'%',cor:presencaPct>=75?'var(--color-success)':'var(--color-danger)'}].map(s=>(
          <div key={s.label} className="card card-padding" style={{textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:s.cor}}>{s.valor}</div>
            <div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      {aluno.perfilPedagogico&&(
        <div style={{padding:'16px 20px 0'}}>
          <p className="section-label">Perfil Pedagógico</p>
          <div style={{background:'var(--color-ia-light)',border:'1px solid #DDD6FE',borderRadius:16,padding:16}}>
            <div style={{fontWeight:700,fontSize:16,color:'var(--color-ia)',marginBottom:8}}>{aluno.perfilPedagogico.tipo}</div>
            <p style={{fontSize:14,color:'var(--color-text-secondary)',lineHeight:1.55,marginBottom:12}}>{aluno.perfilPedagogico.descricao}</p>
            <p style={{fontSize:12,fontWeight:700,color:'var(--color-ia)',marginBottom:8}}>Adaptações:</p>
            {aluno.perfilPedagogico.adaptacoes.map((a,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--color-ia)',flexShrink:0}}/>
                <span style={{fontSize:13,color:'var(--color-text-secondary)'}}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{padding:'16px 20px 0'}}>
        <p className="section-label">Responsável</p>
        <div className="card card-padding">
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{aluno.responsavel.nome}</div>
          <div style={{fontSize:13,color:'var(--color-text-secondary)'}}>{aluno.responsavel.parentesco} · {aluno.responsavel.telefone}</div>
          <a href={"tel:"+aluno.responsavel.telefone} style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:12,background:'var(--color-primary)',color:'white',textDecoration:'none',borderRadius:10,padding:'8px 14px',fontSize:13,fontWeight:700}}>📞 Ligar para o responsável</a>
        </div>
      </div>
      {registros.length>0&&(
        <div style={{padding:'16px 20px 0'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <p className="section-label" style={{marginBottom:0}}>Vida Escolar Recente</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {registros.slice(0,3).map(r=>(
              <div key={r.id} className="card card-padding" style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                <div style={{fontSize:20}}>{r.tipo==='registro_positivo'?'⭐':r.tipo==='ocorrencia'?'⚠️':'📝'}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{r.titulo}</div>
                  <div style={{fontSize:13,color:'var(--color-text-secondary)'}}>{r.descricao}</div>
                  <div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:4}}>{new Date(r.data).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

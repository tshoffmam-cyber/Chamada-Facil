import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
export default function ComunicacaoScreen() {
  const {user}=useAuth()
  const {mensagens, marcarMensagemLida}=useData()
  const [aba,setAba]=useState('recebidas')
  const [selecionada,setSelecionada]=useState(null)
  const [resposta,setResposta]=useState('')
  const recebidas=mensagens.filter(m=>m.para===user?.id||m.para==='todos') // 'todos' = avisos de mural do Diretor (ver DiretorRecadosScreen.jsx)
  const naoLidas=recebidas.filter(m=>!m.lida).length
  // ✅ CORRIGIDO: era .('pt-BR') — erro de sintaxe
  function formatarData(dataStr){
    if(!dataStr)return ''
    const d=new Date(dataStr)
    if(isNaN(d.getTime()))return dataStr
    const hoje=new Date()
    if(d.toDateString()===hoje.toDateString()) return d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})
    return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})
  }
  function abrirMensagem(msg){setSelecionada(msg);if(!msg.lida&&marcarMensagemLida)marcarMensagemLida(msg.id)}
  if(selecionada) return (
    <div style={{paddingBottom:24}}>
      <div style={{display:'flex',alignItems:'center',gap:12,padding:'16px 20px',borderBottom:'1px solid var(--color-border)',background:'var(--color-surface)',position:'sticky',top:0,zIndex:50}}>
        <button onClick={()=>{setSelecionada(null);setResposta('')}} style={{width:36,height:36,background:'var(--color-bg)',border:'1px solid var(--color-border)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div><div style={{fontWeight:700,fontSize:16}}>Mensagem</div><div style={{fontSize:13,color:'var(--color-text-secondary)'}}>{selecionada.de}</div></div>
      </div>
      <div style={{padding:'20px 20px'}}>
        <span style={{background:selecionada.tipo==='responsavel'?'var(--color-primary-light)':'var(--color-warning-light)',color:selecionada.tipo==='responsavel'?'var(--color-primary)':'var(--color-warning)',borderRadius:8,padding:'4px 10px',display:'inline-block',fontSize:12,fontWeight:600,marginBottom:12}}>
          {selecionada.tipo==='responsavel'?'Responsável':'Direção'}
        </span>
        <h2 style={{fontSize:18,fontWeight:800,marginBottom:8}}>{selecionada.assunto}</h2>
        <p style={{fontSize:14,color:'var(--color-text-secondary)',lineHeight:1.6}}>{selecionada.texto}</p>
        <p style={{fontSize:12,color:'var(--color-text-muted)',marginTop:16}}>{formatarData(selecionada.data)}</p>
        <div style={{marginTop:24,display:'flex',flexDirection:'column',gap:10}}>
          <p className="section-label">Responder</p>
          <textarea className="input" rows={4} placeholder="Digite sua resposta institucional..." value={resposta} onChange={e=>setResposta(e.target.value)} style={{resize:'none',borderRadius:12}}/>
          <button className="btn btn-primary" onClick={()=>{alert('Resposta enviada! (demo)');setSelecionada(null);setResposta('')}}>Enviar resposta</button>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{padding:'20px 20px 8px'}}>
      <h1 style={{fontSize:22,fontWeight:800,marginBottom:4}}>Comunicação</h1>
      <p style={{fontSize:14,color:'var(--color-text-secondary)',marginBottom:20}}>Mensagens institucionais</p>
      <div className="tabs-bar" style={{marginBottom:20}}>
        {[{id:'recebidas',label:'Recebidas'+(naoLidas>0?' ('+naoLidas+')':'')},{id:'sobre',label:'Info'}].map(t=>(
          <button key={t.id} className={"tab-item"+(aba===t.id?' active':'')} onClick={()=>setAba(t.id)}>{t.label}</button>
        ))}
      </div>
      {aba==='recebidas'&&(
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {recebidas.length===0?<div className="empty-state"><div className="empty-state-icon">💬</div><div className="empty-state-title">Nenhuma mensagem</div></div>:
          recebidas.map(msg=>(
            <div key={msg.id} className="card" style={{padding:'14px 16px',cursor:'pointer',borderLeft:!msg.lida?'3px solid var(--color-primary)':'1.5px solid var(--color-border)'}} onClick={()=>abrirMensagem(msg)}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                <span style={{fontWeight:msg.lida?600:800,fontSize:14}}>{msg.de}</span>
                <span style={{fontSize:11,color:'var(--color-text-muted)'}}>{formatarData(msg.data)}</span>
              </div>
              <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>{msg.assunto}</div>
              <div style={{fontSize:13,color:'var(--color-text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{msg.texto}</div>
              {!msg.lida&&<div style={{width:8,height:8,borderRadius:'50%',background:'var(--color-primary)',float:'right',marginTop:-8}}/>}
            </div>
          ))}
        </div>
      )}
      {aba==='sobre'&&<div className="card card-padding"><p style={{fontSize:14,color:'var(--color-text-secondary)',lineHeight:1.6}}>Este módulo permite receber e responder mensagens de responsáveis e da direção escolar.</p></div>}
    </div>
  )
}

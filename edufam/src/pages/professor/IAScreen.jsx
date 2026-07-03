import { useState, useRef, useEffect } from 'react'
const SUGESTOES=['Como lidar com alunos com TDAH?','Crie uma atividade dinâmica de matemática para o 9º ano','Estratégias para reduzir faltas na turma','Como registrar ocorrências de forma pedagógica?','Sugira um plano de aula sobre equações']
export default function IAScreen() {
  const [msgs,setMsgs]=useState([{de:'ia',texto:'Olá! Sou a IA EduFam, sua Assistente Pedagógica. Estou aqui para apoiar seu trabalho docente. Como posso ajudar?'}])
  const [input,setInput]=useState('')
  const [loading,setLoading]=useState(false)
  const bottomRef=useRef(null)
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'})},[msgs])
  async function enviar(texto){
    if(!texto.trim()||loading)return
    const pergunta=texto.trim(); setInput(''); setLoading(true)
    setMsgs(prev=>[...prev,{de:'usuario',texto:pergunta}])
    await new Promise(r=>setTimeout(r,1000))
    setLoading(false)
    setMsgs(prev=>[...prev,{de:'ia',texto:'Excelente pergunta! Com base nas melhores práticas pedagógicas, recomendo: adaptar as atividades ao ritmo de cada aluno, usar recursos visuais e práticos, manter comunicação frequente com os responsáveis e registrar o progresso no Perfil Pedagógico. Posso detalhar algum desses pontos?'}])
  }
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh'}}>
      <div style={{background:'linear-gradient(135deg,#7C3AED,#9333EA)',padding:'20px 20px 16px',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:44,height:44,background:'rgba(255,255,255,.2)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🤖</div>
          <div><h1 style={{fontSize:18,fontWeight:800,color:'white',margin:0}}>IA EduFam</h1><p style={{fontSize:13,color:'rgba(255,255,255,.75)',margin:0}}>Assistente Pedagógica</p></div>
        </div>
        {/* ✅ Aviso de modo demo */}
        <div style={{marginTop:12,background:'rgba(255,255,255,.15)',borderRadius:10,padding:'8px 12px',fontSize:12,color:'rgba(255,255,255,.9)',fontWeight:500}}>
          ⚠️ Modo demonstração — respostas são exemplos. IA real será integrada em breve.
        </div>
      </div>
      {msgs.length<=1&&(
        <div style={{padding:'12px 16px',flexShrink:0}}>
          <p className="section-label">Sugestões</p>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {SUGESTOES.slice(0,3).map((s,i)=>(
              <button key={i} onClick={()=>enviar(s)} style={{background:'var(--color-ia-light)',border:'1px solid #DDD6FE',borderRadius:10,padding:'10px 14px',fontSize:13,color:'var(--color-ia)',fontWeight:500,cursor:'pointer',textAlign:'left',fontFamily:'var(--font-family)'}}>{s}</button>
            ))}
          </div>
        </div>
      )}
      <div style={{flex:1,overflowY:'auto',padding:'12px 16px',display:'flex',flexDirection:'column',gap:12}}>
        {msgs.map((msg,i)=>(
          <div key={i} style={{display:'flex',justifyContent:msg.de==='usuario'?'flex-end':'flex-start',gap:8}}>
            {msg.de==='ia'&&<div style={{width:32,height:32,background:'linear-gradient(135deg,#7C3AED,#9333EA)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,alignSelf:'flex-end',fontSize:14}}>🤖</div>}
            <div style={{maxWidth:'78%',padding:'12px 14px',borderRadius:16,borderBottomLeftRadius:msg.de==='ia'?4:16,borderBottomRightRadius:msg.de==='usuario'?4:16,background:msg.de==='usuario'?'var(--color-primary)':'var(--color-surface)',color:msg.de==='usuario'?'white':'var(--color-text-primary)',fontSize:14,lineHeight:1.55,border:msg.de==='usuario'?'none':'1.5px solid var(--color-border)'}}>{msg.texto}</div>
          </div>
        ))}
        {loading&&<div style={{display:'flex',gap:8,alignItems:'flex-end'}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#7C3AED,#9333EA)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🤖</div>
          <div style={{background:'var(--color-surface)',border:'1.5px solid var(--color-border)',borderRadius:16,borderBottomLeftRadius:4,padding:'12px 16px',display:'flex',gap:4}}>
            {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'var(--color-text-muted)'}}/>)}
          </div>
        </div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{padding:'12px 16px',background:'var(--color-surface)',borderTop:'1px solid var(--color-border)',flexShrink:0,display:'flex',gap:10}}>
        <input className="input" placeholder="Pergunte algo..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&enviar(input)} style={{flex:1}}/>
        <button onClick={()=>enviar(input)} disabled={!input.trim()||loading} style={{background:'var(--color-ia)',border:'none',borderRadius:12,width:44,height:44,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,opacity:(!input.trim()||loading)?.5:1}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  )
}

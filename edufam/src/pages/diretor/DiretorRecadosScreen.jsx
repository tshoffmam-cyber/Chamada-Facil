import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { mockUsers } from '../../data/mockData'

// ---------------------------------------------------------------------------
// pages/diretor/DiretorRecadosScreen.jsx
//
// Central de comunicacao do Diretor com a escola, em 3 abas:
// - Mural: avisos gerais que aparecem para TODOS os professores (eles
//   veem esses avisos na propria tela de Mensagens/Comunicacao — ver
//   ComunicacaoScreen.jsx, que agora tambem le mensagens com para:'todos').
// - Mensagens: comunicacao individual do Diretor com um professor
//   especifico.
// - Recados dos pais: visao de leitura de todos os recados que os
//   responsaveis enviaram aos professores da escola (mesma fonte de
//   dados que ComunicacaoScreen usa por professor, aqui agregada).
//
// IMPORTANTE (decisao de arquitetura confirmada com o usuario): a
// comunicacao com os pais/responsaveis e sempre DENTRO do proprio app —
// nunca por WhatsApp ou telefone pessoal. Hoje os pais ainda nao tem
// login proprio no prototipo; is so representa o canal que, em producao,
// alimentaria um Portal dos Pais (app/area propria, com assinatura paga
// conforme o modelo de negocio combinado).
//
// PARA UM BACKEND REAL: mensagens deveria ser uma tabela real com
// destinatarios estruturados (professorId, turmaId, alunoId quando
// aplicavel) em vez do campo 'para' livre usado aqui no protótipo.
// ---------------------------------------------------------------------------
export default function DiretorRecadosScreen() {
  const { user } = useAuth()
  const { turmas, mensagens, enviarMensagem } = useData()
  const [aba, setAba] = useState('mural')
  const [textoMural, setTextoMural] = useState('')
  const [professorSelecionado, setProfessorSelecionado] = useState('')
  const [textoIndividual, setTextoIndividual] = useState('')
  const [enviado, setEnviado] = useState('')

  const professoresIds = [...new Set(turmas.map(t => t.professorId))]
  const professores = professoresIds.map(pid => mockUsers.find(u => u.id === pid)).filter(Boolean)

  const mural = mensagens.filter(m => m.tipo === 'direcao' && m.para === 'todos').sort((a,b)=> new Date(b.data) - new Date(a.data))
  const individuais = mensagens.filter(m => m.tipo === 'direcao' && m.para === professorSelecionado).sort((a,b)=> new Date(b.data) - new Date(a.data))
  const recadosPais = mensagens.filter(m => m.tipo === 'responsavel' && professoresIds.includes(m.para)).sort((a,b)=> new Date(b.data) - new Date(a.data))

  function publicarMural() {
    if (!textoMural.trim()) return
    enviarMensagem({ de: 'Direção — ' + (user?.escola || 'Escola'), para: 'todos', assunto: 'Aviso da Direção', texto: textoMural.trim(), tipo: 'direcao' })
    setTextoMural('')
    setEnviado('mural')
    setTimeout(()=>setEnviado(''), 2500)
  }

  function enviarIndividual() {
    if (!textoIndividual.trim() || !professorSelecionado) return
    enviarMensagem({ de: 'Direção — ' + (user?.escola || 'Escola'), para: professorSelecionado, assunto: 'Mensagem da Direção', texto: textoIndividual.trim(), tipo: 'direcao' })
    setTextoIndividual('')
    setEnviado('individual')
    setTimeout(()=>setEnviado(''), 2500)
  }

  function formatarData(dataStr) {
    const d = new Date(dataStr)
    if (isNaN(d.getTime())) return dataStr
    return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'short' }) + ' · ' + d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' })
  }

  return (
    <div style={{paddingBottom:24}}>
      <div style={{padding:'20px 20px 0'}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Recados</h1>
      </div>

      <div style={{padding:'16px 20px 0',display:'flex',gap:8}}>
        {[{k:'mural',l:'Mural'},{k:'mensagens',l:'Mensagens'},{k:'pais',l:'Recados dos pais'}].map(t => (
          <button key={t.k} onClick={()=>setAba(t.k)} style={{flex:1,padding:'10px 6px',borderRadius:10,border:'1px solid var(--color-border)',background:aba===t.k?'var(--color-primary)':'var(--color-surface)',color:aba===t.k?'white':'var(--color-text-secondary)',fontWeight:700,fontSize:12,cursor:'pointer'}}>{t.l}</button>
        ))}
      </div>

      {aba === 'mural' && (
        <div style={{padding:'16px 20px 0'}}>
          <div className="card card-padding" style={{marginBottom:14}}>
            <p className="section-label">NOVO AVISO PARA TODOS OS PROFESSORES</p>
            <textarea className="input" rows={3} placeholder="Escreva um aviso para toda a escola..." value={textoMural} onChange={e=>setTextoMural(e.target.value)} />
            <button className="btn btn-primary" style={{marginTop:10,width:'100%'}} onClick={publicarMural}>Publicar no mural</button>
            {enviado === 'mural' && <p style={{fontSize:12,color:'var(--color-success)',marginTop:8,fontWeight:600}}>Aviso publicado com sucesso.</p>}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {mural.map(m => (
              <div key={m.id} className="card card-padding">
                <div style={{fontWeight:700,fontSize:14}}>{m.assunto}</div>
                <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:4}}>{m.texto}</p>
                <p style={{fontSize:11,color:'var(--color-text-muted)',marginTop:8}}>{formatarData(m.data)}</p>
              </div>
            ))}
            {mural.length === 0 && <p style={{fontSize:13,color:'var(--color-text-muted)',textAlign:'center'}}>Nenhum aviso publicado ainda.</p>}
          </div>
        </div>
      )}

      {aba === 'mensagens' && (
        <div style={{padding:'16px 20px 0'}}>
          <div className="card card-padding" style={{marginBottom:14}}>
            <p className="section-label">FALAR COM UM PROFESSOR</p>
            <select className="input" value={professorSelecionado} onChange={e=>setProfessorSelecionado(e.target.value)}>
              <option value="">Selecione um professor...</option>
              {professores.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {professorSelecionado && (
              <>
                <textarea className="input" rows={3} style={{marginTop:10}} placeholder="Escreva sua mensagem..." value={textoIndividual} onChange={e=>setTextoIndividual(e.target.value)} />
                <button className="btn btn-primary" style={{marginTop:10,width:'100%'}} onClick={enviarIndividual}>Enviar mensagem</button>
                {enviado === 'individual' && <p style={{fontSize:12,color:'var(--color-success)',marginTop:8,fontWeight:600}}>Mensagem enviada.</p>}
              </>
            )}
          </div>
          {professorSelecionado && (
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {individuais.map(m => (
                <div key={m.id} className="card card-padding">
                  <div style={{fontWeight:700,fontSize:14}}>{m.assunto}</div>
                  <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:4}}>{m.texto}</p>
                  <p style={{fontSize:11,color:'var(--color-text-muted)',marginTop:8}}>{formatarData(m.data)}</p>
                </div>
              ))}
              {individuais.length === 0 && <p style={{fontSize:13,color:'var(--color-text-muted)',textAlign:'center'}}>Nenhuma mensagem trocada com este professor ainda.</p>}
            </div>
          )}
        </div>
      )}

      {aba === 'pais' && (
        <div style={{padding:'16px 20px 0'}}>
          <p style={{fontSize:12,color:'var(--color-text-muted)',marginBottom:12}}>Visão consolidada dos recados enviados pelos responsáveis aos professores da escola (leitura). As respostas são feitas pelo próprio professor, na tela de Mensagens dele.</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {recadosPais.map(m => {
              const prof = mockUsers.find(u=>u.id===m.para)
              return (
                <div key={m.id} className="card card-padding">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div style={{fontWeight:700,fontSize:14}}>{m.assunto}</div>
                    {!m.lida && <span style={{fontSize:10,fontWeight:800,color:'var(--color-danger)'}}>NÃO LIDA</span>}
                  </div>
                  <p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:4}}>{m.texto}</p>
                  <p style={{fontSize:11,color:'var(--color-text-muted)',marginTop:8}}>{m.de} → {prof?.name || m.para} · {formatarData(m.data)}</p>
                </div>
              )
            })}
            {recadosPais.length === 0 && <p style={{fontSize:13,color:'var(--color-text-muted)',textAlign:'center'}}>Nenhum recado de responsável registrado ainda.</p>}
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { mockUsers } from '../../data/mockData'

// ---------------------------------------------------------------------------
// pages/responsavel/ResponsavelRecadosScreen.jsx
//
// Recados do Portal do Responsavel, em 2 abas:
// - Mensagens: comunicacao individual com o professor do filho (recebe
//   recados do professor/direcao e pode responder) — usa a mesma funcao
//   enviarMensagem do DataContext ja usada em ComunicacaoScreen.jsx.
// - Mural da escola: avisos gerais publicados pela direcao (para:'todos'),
//   somente leitura aqui.
//
// IMPORTANTE (decisao de arquitetura confirmada com o usuario): comunicacao
// com a escola e sempre DENTRO do app — nunca WhatsApp ou telefone pessoal.
// ---------------------------------------------------------------------------
export default function ResponsavelRecadosScreen() {
  const { user } = useAuth()
  const { alunos, turmas, mensagens, enviarMensagem } = useData()
  const [aba, setAba] = useState('individual')
  const [assunto, setAssunto] = useState('')
  const [texto, setTexto] = useState('')
  const [enviado, setEnviado] = useState(false)

  const aluno = alunos.find(a => user?.alunosIds?.includes(a.id))
  const turma = aluno ? turmas.find(t => t.id === aluno.turmaId) : null
  const professor = turma ? mockUsers.find(u => u.id === turma.professorId) : null

  const mural = mensagens.filter(m => m.tipo === 'direcao' && m.para === 'todos').sort((a, b) => new Date(b.data) - new Date(a.data))
  const individuais = mensagens.filter(m => m.para === user?.id).sort((a, b) => new Date(b.data) - new Date(a.data))

  function enviar() {
    if (!texto.trim() || !professor) return
    enviarMensagem({ de: 'Responsável — ' + user.name, para: professor.id, assunto: assunto.trim() || 'Mensagem do responsável', texto: texto.trim(), tipo: 'responsavel' })
    setTexto('')
    setAssunto('')
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Recados</h1>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'flex', gap: 8 }}>
        {[{ k: 'individual', l: 'Mensagens' }, { k: 'mural', l: 'Mural da escola' }].map(t => (
          <button key={t.k} onClick={() => setAba(t.k)} style={{ flex: 1, padding: '10px 6px', borderRadius: 10, border: '1px solid var(--color-border)', background: aba === t.k ? 'var(--color-primary)' : 'var(--color-surface)', color: aba === t.k ? 'white' : 'var(--color-text-secondary)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{t.l}</button>
        ))}
      </div>

      {aba === 'individual' && (
        <div style={{ padding: '16px 20px 0' }}>
          {professor && (
            <div className="card card-padding" style={{ marginBottom: 14 }}>
              <p className="section-label">ENVIAR MENSAGEM PARA {professor.name.toUpperCase()}</p>
              <input className="input" placeholder="Assunto" value={assunto} onChange={e => setAssunto(e.target.value)} style={{ marginBottom: 8 }} />
              <textarea className="input" rows={3} placeholder="Escreva sua mensagem..." value={texto} onChange={e => setTexto(e.target.value)} />
              <button className="btn btn-primary" style={{ marginTop: 10, width: '100%' }} onClick={enviar}>Enviar</button>
              {enviado && <p style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 8, fontWeight: 600 }}>Mensagem enviada com sucesso.</p>}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {individuais.length === 0 && <div className="card card-padding" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Nenhuma mensagem recebida ainda.</div>}
            {individuais.map(m => (
              <div key={m.id} className="card card-padding">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{m.de}</span>
                  <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{new Date(m.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{m.assunto}</p>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {aba === 'mural' && (
        <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mural.length === 0 && <div className="card card-padding" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Nenhum aviso publicado ainda.</div>}
          {mural.map(m => (
            <div key={m.id} className="card card-padding">
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.assunto}</div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>{m.texto}</p>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6 }}>{new Date(m.data).toLocaleDateString('pt-BR')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { mockMensagens } from '../../data/mockData'

export default function ComunicacaoScreen() {
  const [tab, setTab] = useState('recebidas')
  const [selectedMsg, setSelectedMsg] = useState(null)

  const recebidas = mockMensagens.filter(m => m.para === 'u1')

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    const hoje = new Date()
    if (d.toDateString() === hoje.toDateString()) {
      return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  if (selectedMsg) {
    return (
      <div style={{ padding: '0 0 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <button
            onClick={() => setSelectedMsg(null)}
            style={{
              width: 36, height: 36,
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Mensagem</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{selectedMsg.de}</div>
          </div>
        </div>

        <div style={{ padding: '20px 20px' }}>
          <div style={{
            background: 'var(--color-primary-light)',
            borderRadius: 12,
            padding: '8px 14px',
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--color-primary)',
            marginBottom: 12,
          }}>
            {selectedMsg.tipo === 'responsavel' ? 'Responsavel' : 'Direcao'}
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{selectedMsg.assunto}</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{selectedMsg.texto}</p>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 16 }}>
            {new Date(selectedMsg.data).toLocaleString('pt-BR')}
          </p>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Responder
            </p>
            <textarea
              className="input"
              rows={4}
              placeholder="Digite sua resposta institucional..."
              style={{ resize: 'none', borderRadius: 12 }}
            />
            <button className="btn btn-primary">Enviar resposta</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 20px 8px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Comunicacao</h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
        Comunicacao institucional EduFam
      </p>

      <div className="tab-bar" style={{ margin: '0 0 20px' }}>
        {[
          { id: 'recebidas', label: 'Recebidas' },
          { id: 'enviadas', label: 'Enviadas' },
          { id: 'nova', label: 'Nova msg' },
        ].map(t => (
          <button
            key={t.id}
            className={"tab-item" + (tab === t.id ? ' active' : '')}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'recebidas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recebidas.map(msg => (
            <div
              key={msg.id}
              className="card"
              style={{
                padding: '14px 16px',
                cursor: 'pointer',
                borderLeft: !msg.lida ? '3px solid var(--color-primary)' : '3px solid transparent',
              }}
              onClick={() => setSelectedMsg(msg)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    {!msg.lida && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{msg.de}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: msg.lida ? 400 : 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                    {msg.assunto}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.texto}
                  </p>
                </div>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)', flexShrink: 0 }}>
                  {formatDate(msg.data)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'nova' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Para
            </label>
            <select className="input">
              <option>Selecione o destinatario</option>
              <option>Responsaveis - 9 Ano A</option>
              <option>Responsaveis - 8 Ano B</option>
              <option>Direcao</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Assunto
            </label>
            <input className="input" placeholder="Assunto da mensagem" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Mensagem
            </label>
            <textarea className="input" rows={5} placeholder="Escreva sua mensagem institucional..." style={{ resize: 'none', borderRadius: 12 }} />
          </div>
          <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#B45309' }}>
            Esta mensagem sera enviada pelo EduFam. Nunca compartilhe seu numero pessoal.
          </div>
          <button className="btn btn-primary">Enviar mensagem</button>
        </div>
      )}

      {tab === 'enviadas' && (
        <div className="empty-state">
          <div className="empty-state-icon">outbox</div>
          <div className="empty-state-title">Sem mensagens enviadas</div>
          <div className="empty-state-sub">Suas mensagens enviadas apareceram aqui</div>
        </div>
      )}
    </div>
  )
}

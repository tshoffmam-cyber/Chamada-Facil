import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/adm/AdmChurnScreen.jsx
//
// Painel de retencao: mostra escolas/professores marcados com risco de
// cancelamento (mockChurnRisco, ver data/mockData.js) e permite ao ADM
// 'enviar' uma mensagem de retencao com um clique (modelos prontos ou texto
// livre). O toggle 'mensagens automaticas' e apenas uma preferencia salva
// (nao dispara nada sozinho neste prototipo).
//
// PLACEHOLDER: nao ha envio real de e-mail/SMS/notificacao aqui. Ver
// enviarMensagemRetencao em DataContext.jsx para o que falta para virar
// uma integracao real (fila no backend + servico de e-mail transacional).
// ---------------------------------------------------------------------------
const MODELOS = [
  { titulo: 'Sentimos sua falta', texto: 'Ola! Notamos que faz um tempo que voce nao acessa o EduFam. Precisa de ajuda com alguma coisa? Estamos por aqui para o que precisar.' },
  { titulo: 'Oferecer suporte', texto: 'Ola! Vimos que algumas pendencias ficaram em aberto. Podemos agendar uma conversa rapida para ajudar a colocar tudo em dia?' },
  { titulo: 'Fatura em atraso', texto: 'Ola! Identificamos uma fatura em atraso. Se precisar de um prazo maior ou tiver alguma duvida sobre o pagamento, e so responder por aqui.' },
]

const corRisco = (risco) => risco === 'alto' ? 'var(--color-danger)' : risco === 'medio' ? 'var(--color-warning)' : 'var(--color-text-secondary)'
const bgRisco = (risco) => risco === 'alto' ? 'var(--color-danger-light)' : risco === 'medio' ? 'var(--color-warning-light)' : 'var(--color-bg)'

export default function AdmChurnScreen() {
  const navigate = useNavigate()
  const { churnRisco, mensagensRetencao, enviarMensagemRetencao } = useData()
  const [selecionadoId, setSelecionadoId] = useState(null)
  const [texto, setTexto] = useState('')
  const [automatico, setAutomatico] = useState(false)
  const [enviadoId, setEnviadoId] = useState(null)

  const selecionado = churnRisco.find(c => c.id === selecionadoId)

  function selecionar(item) {
    setSelecionadoId(item.id)
    setTexto('')
  }

  function enviar() {
    if (!selecionado || !texto.trim()) return
    enviarMensagemRetencao(selecionado.id, selecionado.nome, texto.trim())
    setEnviadoId(selecionado.id)
    setSelecionadoId(null)
    setTexto('')
    setTimeout(() => setEnviadoId(null), 3000)
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 8, padding: 0 }}>← Voltar</button>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Usuarios em risco (churn)</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>Dados de exemplo. Envie mensagens de retencao com um clique.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div className="card card-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Mensagens automaticas</div>
            <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>Preferencia salva apenas neste protótipo (ainda nao dispara envio real)</div>
          </div>
          <button
            onClick={() => setAutomatico(v => !v)}
            style={{ width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', background: automatico ? 'var(--color-primary)' : 'var(--color-border)', position: 'relative' }}
          >
            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: automatico ? 21 : 3, transition: 'left .15s' }} />
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <p className="section-label">EM RISCO ({churnRisco.length})</p>
        {churnRisco.map(item => (
          <div key={item.id} className="card card-padding" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{item.motivo}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>Ultimo acesso: {item.ultimoAcesso}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 999, color: corRisco(item.risco), background: bgRisco(item.risco), whiteSpace: 'nowrap' }}>
                risco {item.risco}
              </span>
            </div>
            {enviadoId === item.id && (
              <div style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 8 }}>Mensagem registrada com sucesso.</div>
            )}
            <button
              onClick={() => selecionar(item)}
              className="btn btn-primary"
              style={{ marginTop: 10, fontSize: 13, padding: '8px 12px' }}
            >
              Enviar mensagem
            </button>
          </div>
        ))}
      </div>

      {selecionado && (
        <div style={{ padding: '4px 20px 0' }}>
          <div className="card card-padding">
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Mensagem para {selecionado.nome}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {MODELOS.map(m => (
                <button key={m.titulo} onClick={() => setTexto(m.texto)} style={{ fontSize: 11.5, padding: '6px 10px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg)', cursor: 'pointer' }}>
                  {m.titulo}
                </button>
              ))}
            </div>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="Escreva a mensagem..."
              style={{ width: '100%', minHeight: 90, borderRadius: 10, border: '1px solid var(--color-border)', padding: 10, fontSize: 13, fontFamily: 'inherit' }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={enviar} className="btn btn-primary" style={{ fontSize: 13, padding: '8px 14px' }}>Enviar</button>
              <button onClick={() => setSelecionadoId(null)} style={{ fontSize: 13, padding: '8px 14px', borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {mensagensRetencao.length > 0 && (
        <div style={{ padding: '16px 20px 0' }}>
          <p className="section-label">HISTORICO ({mensagensRetencao.length})</p>
          {mensagensRetencao.slice().reverse().map(m => (
            <div key={m.id} className="card card-padding" style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>{m.alvoNome}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{m.mensagem}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

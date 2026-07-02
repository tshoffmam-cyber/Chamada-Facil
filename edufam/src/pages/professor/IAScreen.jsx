import { useState } from 'react'

const sugestoes = [
  'Como lidar com alunos com Perfil Pedagogico de TDAH?',
  'Crie uma atividade dinamica de matematica para o 9 ano',
  'Quais estrategias para reduzir faltas na turma?',
  'Como registrar ocorrencias de forma pedagogica?',
  'Sugira um plano de aula sobre equacoes',
]

const respostas = {
  default: 'Estou aqui para ajudar! Como Assistente Pedagogica do EduFam, posso auxiliar com planejamento de aulas, estrategias de ensino, comunicacao com responsaveis e muito mais. O que voce gostaria de saber?'
}

export default function IAScreen() {
  const [mensagens, setMensagens] = useState([
    { de: 'ia', texto: 'Ola! Sou a IA EduFam, sua Assistente Pedagogica. Estou aqui para apoiar seu trabalho docente com sugestoes, estrategias e informacoes. Como posso ajudar?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function enviar(texto) {
    if (!texto.trim()) return
    const pergunta = texto.trim()
    setInput('')
    setMensagens(prev => [...prev, { de: 'usuario', texto: pergunta }])
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setMensagens(prev => [...prev, {
      de: 'ia',
      texto: 'Excelente pergunta! Com base nas melhores praticas pedagogicas, recomendo: adaptar as atividades ao ritmo de cada aluno, usar recursos visuais e praticos, manter comunicacao frequente com os responsaveis e registrar o progresso no Perfil Pedagogico de cada estudante. Posso detalhar algum desses pontos?'
    }])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', height: '100dvh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
        padding: '20px 20px 16px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: 'white', margin: 0 }}>IA EduFam</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>Assistente Pedagogica</p>
          </div>
        </div>
      </div>

      {/* Sugestoes rapidas */}
      {mensagens.length <= 1 && (
        <div style={{ padding: '12px 16px', flexShrink: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
            Sugestoes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sugestoes.slice(0, 3).map((s, i) => (
              <button
                key={i}
                onClick={() => enviar(s)}
                style={{
                  background: 'var(--color-ia-light)',
                  border: '1px solid #DDD6FE',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: 'var(--color-ia)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-family)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mensagens.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.de === 'usuario' ? 'flex-end' : 'flex-start',
            gap: 8,
          }}>
            {msg.de === 'ia' && (
              <div style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                alignSelf: 'flex-end',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z"/>
                </svg>
              </div>
            )}
            <div style={{
              maxWidth: '78%',
              padding: '12px 14px',
              borderRadius: msg.de === 'usuario' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.de === 'usuario' ? 'var(--color-primary)' : 'var(--color-surface)',
              color: msg.de === 'usuario' ? 'white' : 'var(--color-text-primary)',
              fontSize: 14,
              lineHeight: 1.55,
              border: msg.de === 'ia' ? '1px solid var(--color-border)' : 'none',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {msg.texto}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z"/>
              </svg>
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--color-surface)',
              borderRadius: '18px 18px 18px 4px',
              border: '1px solid var(--color-border)',
              display: 'flex', gap: 6, alignItems: 'center',
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7,
                  background: 'var(--color-ia)',
                  borderRadius: '50%',
                  opacity: 0.5,
                  animation: 'pulse 1.2s ease infinite',
                  animationDelay: i * 0.2 + 's',
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        display: 'flex',
        gap: 10,
        flexShrink: 0,
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
      }}>
        <input
          className="input"
          placeholder="Pergunte algo pedagogico..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviar(input)}
          style={{ borderRadius: 'var(--radius-full)' }}
        />
        <button
          onClick={() => enviar(input)}
          disabled={!input.trim() || loading}
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: input.trim() ? 'linear-gradient(135deg, #7C3AED, #9333EA)' : 'var(--color-border)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default',
            flexShrink: 0,
            transition: 'background 200ms',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

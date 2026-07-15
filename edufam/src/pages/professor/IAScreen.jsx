import { useState, useRef, useEffect } from 'react'

// ---------------------------------------------------------------------------
// pages/professor/IAScreen.jsx
//
// IA EduFam: assistente pedagogica central do produto (ver PRD_EDUFAM.md).
// Hoje e 100% mockada -- todas as respostas abaixo sao textos fixos com um
// atraso artificial (setTimeout), so para demonstrar a experiencia de uso.
// Nao ha nenhuma chamada de rede nem chave de IA real neste arquivo.
//
// PONTOS DE ENCAIXE PARA UMA IA REAL (ver services/api.js, hoje so com
// stubs que lancam erro "nao implementado"):
//   - Pergunta livre no chat        -> services/api.js: iaPerguntar()
//   - Acao rapida "Criar atividade" -> services/api.js: iaGerarAtividade()
//   - Acao rapida "Resumo da turma" -> services/api.js: iaGerarResumoTurma()
//   - Acao rapida "Sugerir comunicado" -> services/api.js: iaSugerirComunicado()
// Quando o backend existir, troque a funcao 'responderMock' abaixo por
// chamadas reais a essas funcoes (com tratamento de erro e loading), e
// registre um ticket de suporte (ver AdmSuporteScreen) quando a IA falhar
// ou o professor pedir ajuda humana, conforme descrito no PRD.
// ---------------------------------------------------------------------------

const SUGESTOES = [
  'Como lidar com alunos com TDAH?',
  'Crie uma atividade dinamica de matematica para o 9º ano',
  'Estrategias para reduzir faltas na turma',
  'Como registrar ocorrencias de forma pedagogica?',
]

// Acoes rapidas que espelham as 4 capacidades da IA EduFam descritas no PRD:
// criar atividades/avaliacoes, gerar resumos/relatorios, analisar turmas e
// alunos, e escrever comunicados. Cada uma aqui só preenche um prompt
// pronto no chat -- a "inteligencia" de verdade viria do backend.
const ACOES_RAPIDAS = [
  { id: 'atividade', label: 'Criar atividade', icone: '📝', prompt: 'Crie uma atividade sobre o conteudo que estou ensinando esta semana.' },
  { id: 'resumo', label: 'Resumo da turma', icone: '📊', prompt: 'Gere um resumo do desempenho e frequencia da minha turma.' },
  { id: 'analise', label: 'Analisar aluno', icone: '🔍', prompt: 'Analise o desempenho de um aluno e sugira estrategias de apoio.' },
  { id: 'comunicado', label: 'Escrever comunicado', icone: '✉️', prompt: 'Escreva um comunicado para os responsaveis sobre a reuniao de pais.' },
]

// Respostas mockadas por tipo de acao rapida -- so para a demonstracao ter
// uma resposta minimamente relevante ao que foi pedido, em vez de um texto
// generico sempre igual.
function respostaMockPara(texto) {
  const lower = texto.toLowerCase()
  if (lower.includes('atividade')) {
    return 'Aqui esta uma sugestao de atividade: peca aos alunos que resolvam 5 problemas praticos relacionados ao tema, em duplas, com correcao coletiva ao final. (Exemplo gerado pela IA em modo demonstracao.)'
  }
  if (lower.includes('resumo') || lower.includes('desempenho') || lower.includes('frequencia')) {
    return 'Resumo (exemplo): a turma esta com frequencia media acima de 90%, com 2 alunos proximos do limite de faltas. O desempenho em atividades recentes esta estavel. (Exemplo gerado pela IA em modo demonstracao.)'
  }
  if (lower.includes('comunicado') || lower.includes('reuniao')) {
    return 'Sugestao de comunicado: "Prezados responsaveis, informamos que a reuniao de pais e mestres acontecera em breve. Contamos com a presenca de todos para acompanhar o desenvolvimento dos alunos." (Exemplo gerado pela IA em modo demonstracao.)'
  }
  if (lower.includes('tdah') || lower.includes('tea') || lower.includes('dislexia') || lower.includes('perfil pedagogico')) {
    return 'Para alunos com perfil pedagogico especifico, considere: instrucoes curtas e visuais, tempo extra em avaliacoes e pausas regulares durante a aula. (Exemplo gerado pela IA em modo demonstracao.)'
  }
  return 'Excelente pergunta! Com base nas melhores praticas pedagogicas, recomendo comecar com um diagnostico da turma antes de definir o proximo passo. (Exemplo gerado pela IA em modo demonstracao.)'
}

export default function IAScreen() {
  const [msgs, setMsgs] = useState([{ de: 'ia', texto: 'Ola! Sou a IA EduFam, sua assistente pedagogica. Posso criar atividades, gerar resumos, analisar turmas e alunos, e escrever comunicados. Como posso ajudar?' }])
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  async function enviar(texto) {
    if (!texto.trim() || carregando) return
    const pergunta = texto.trim()
    setInput('')
    setCarregando(true)
    setMsgs(anterior => [...anterior, { de: 'usuario', texto: pergunta }])

    // PARA UMA IA REAL: trocar o bloco abaixo por
    //   const resposta = await iaPerguntar(pergunta, { turmaId, alunoId })
    // com tratamento de erro (e fallback para abrir um ticket de suporte).
    await new Promise(r => setTimeout(r, 900))
    setCarregando(false)
    setMsgs(anterior => [...anterior, { de: 'ia', texto: respostaMockPara(pergunta) }])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', padding: '20px 20px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🤖</div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: 'white', margin: 0 }}>IA EduFam</h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.85)', margin: 0 }}>Assistente pedagogica</p>
          </div>
        </div>
        <div style={{ marginTop: 12, background: 'rgba(255,255,255,.15)', borderRadius: 10, padding: '8px 12px' }}>
          <span style={{ fontSize: 12, color: 'white' }}>⚠️ Modo demonstracao — respostas sao exemplos. IA real sera integrada em breve.</span>
        </div>
      </div>

      <div style={{ padding: '12px 20px', display: 'flex', gap: 8, overflowX: 'auto', flexShrink: 0 }}>
        {ACOES_RAPIDAS.map(acao => (
          <button
            key={acao.id}
            onClick={() => enviar(acao.prompt)}
            disabled={carregando}
            className="card"
            style={{ flexShrink: 0, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, border: 'none', cursor: carregando ? 'default' : 'pointer', opacity: carregando ? 0.6 : 1 }}
          >
            <span style={{ fontSize: 16 }}>{acao.icone}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{acao.label}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.de === 'usuario' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            <div style={{
              maxWidth: '80%', padding: '10px 14px', borderRadius: 16,
              background: m.de === 'usuario' ? 'var(--color-primary)' : 'white',
              color: m.de === 'usuario' ? 'white' : 'var(--color-text-primary)',
              border: m.de === 'usuario' ? 'none' : '1px solid var(--color-border)',
              fontSize: 14, lineHeight: 1.4,
            }}>
              {m.texto}
            </div>
          </div>
        ))}
        {carregando && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
            <div style={{ padding: '10px 14px', borderRadius: 16, background: 'white', border: '1px solid var(--color-border)', fontSize: 13, color: 'var(--color-text-muted)' }}>
              IA EduFam esta digitando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '8px 20px', display: 'flex', gap: 8, overflowX: 'auto', flexShrink: 0 }}>
        {SUGESTOES.map(s => (
          <button key={s} onClick={() => enviar(s)} disabled={carregando} style={{
            flexShrink: 0, padding: '6px 12px', borderRadius: 20, border: '1px solid var(--color-border)',
            background: 'white', fontSize: 12, color: 'var(--color-text-secondary)', cursor: carregando ? 'default' : 'pointer',
          }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 20px 20px', display: 'flex', gap: 8, flexShrink: 0, borderTop: '1px solid var(--color-border)', background: 'white' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') enviar(input) }}
          placeholder="Pergunte algo a IA EduFam..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border)', fontSize: 14 }}
        />
        <button onClick={() => enviar(input)} disabled={carregando} className="btn btn-primary" style={{ padding: '12px 20px' }}>
          Enviar
        </button>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'

// ---------------------------------------------------------------------------
// pages/adm/AdmNpsScreen.jsx
//
// Placeholder de tela para a "Pesquisa de satisfacao (NPS) com avaliacao
// por emoji e comentarios dos professores", ideia ja identificada no
// PRD_EDUFAM.md (secao de ideias adiadas). Mostra dados MOCKADOS de
// exemplo para demonstrar o layout -- nenhum dado aqui vem de professores
// reais ainda.
//
// PARA UM BACKEND REAL:
//   - Precisa de uma tela (fora do painel ADM) onde o PROFESSOR realmente
//     responda a pesquisa (emoji + comentario opcional), provavelmente via
//     um prompt periodico dentro do app.
//   - As respostas ficariam numa tabela 'nps_respostas' e esta tela passaria
//     a consultar uma agregacao real (media, distribuicao por nota) em vez
//     dos numeros fixos abaixo.
// ---------------------------------------------------------------------------

const RESPOSTAS_MOCK = [
  { emoji: '😍', nota: 10, comentario: 'A IA EduFam me economiza muito tempo no planejamento das aulas.' },
  { emoji: '🙂', nota: 8, comentario: 'Gostaria de poder anexar arquivos maiores no Modo Aula.' },
  { emoji: '😐', nota: 6, comentario: 'Ainda estou me acostumando com a navegacao do app.' },
]

const DISTRIBUICAO_MOCK = [
  { faixa: 'Promotores (9-10)', quantidade: 62, cor: 'var(--color-success)' },
  { faixa: 'Neutros (7-8)', quantidade: 24, cor: 'var(--color-warning)' },
  { faixa: 'Detratores (0-6)', quantidade: 14, cor: 'var(--color-danger)' },
]

export default function AdmNpsScreen() {
  const navigate = useNavigate()
  const total = DISTRIBUICAO_MOCK.reduce((s, d) => s + d.quantidade, 0)
  const npsScore = Math.round(
    ((DISTRIBUICAO_MOCK[0].quantidade - DISTRIBUICAO_MOCK[2].quantidade) / total) * 100
  )

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 8 }}>← Voltar</button>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Pesquisa de satisfacao (NPS)</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 20 }}>
          Dados de exemplo (ver comentario no topo do arquivo). Ainda nao ha coleta real de respostas.
        </p>
      </div>

      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div className="card card-padding" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-primary)' }}>{npsScore}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>NPS estimado (exemplo)</div>
        </div>
      </div>

      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <p className="section-label" style={{ marginBottom: 10 }}>DISTRIBUICAO</p>
        <div className="card card-padding">
          {DISTRIBUICAO_MOCK.map((d, i) => (
            <div key={d.faixa} style={{ marginBottom: i < DISTRIBUICAO_MOCK.length - 1 ? 12 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{d.faixa}</span>
                <span style={{ fontWeight: 700 }}>{d.quantidade}</span>
              </div>
              <div style={{ height: 8, background: 'var(--color-border)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (d.quantidade / total * 100) + '%', background: d.cor, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <p className="section-label" style={{ marginBottom: 10 }}>COMENTARIOS RECENTES</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {RESPOSTAS_MOCK.map((r, i) => (
            <div key={i} className="card card-padding" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{r.emoji}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>Nota {r.nota}</div>
                <div style={{ fontSize: 14, marginTop: 2 }}>{r.comentario}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

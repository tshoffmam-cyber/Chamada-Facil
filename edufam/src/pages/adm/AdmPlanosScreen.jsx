import { useNavigate } from 'react-router-dom'

// ---------------------------------------------------------------------------
// pages/adm/AdmPlanosScreen.jsx
//
// Placeholder de tela para o "Modelo de planos pagos com paywall", ideia ja
// identificada no PRD_EDUFAM.md (secao de ideias adiadas para quando as
// fases de Diretor e ADM fossem construidas). Mostra a ESTRUTURA visual e
// os planos descritos no PRD (Gratuito, Pro, Escola), mas SEM nenhuma
// logica real de cobranca, paywall ou integracao com gateway de pagamento.
//
// PARA UM BACKEND REAL:
//   - Os planos e precos abaixo sao dados fixos (hard-coded). Em producao
//     viriam de uma tabela 'planos' no backend, editavel pelo ADM.
//   - O botao "Definir como padrao" e apenas visual: precisa ser ligado a
//     services/api.js quando existir um endpoint de configuracao de planos.
//   - Nenhuma parte desta tela deve processar cartao de credito ou dados
//     de pagamento diretamente -- isso deve sempre passar por um gateway
//     de pagamento real (ex: Stripe), nunca ser feito a mao no frontend.
// ---------------------------------------------------------------------------

const PLANOS = [
  { id: 'gratuito', nome: 'Gratuito', preco: 'R$ 0', periodo: '30 dias', recursos: ['Chamada e frequencia', 'Agenda basica', '1 turma'] },
  { id: 'pro', nome: 'Pro', preco: 'R$ 29,90', periodo: '/mes', recursos: ['Turmas ilimitadas', 'IA EduFam completa', 'Boletim e relatorios em PDF'] },
  { id: 'escola', nome: 'Escola', preco: 'Sob consulta', periodo: '', recursos: ['Painel do Diretor', 'Multiplos professores', 'Suporte prioritario'] },
]

export default function AdmPlanosScreen() {
  const navigate = useNavigate()

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 8 }}>← Voltar</button>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Planos e assinaturas</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 20 }}>
          Placeholder visual (ver comentario no topo do arquivo). Nenhuma cobranca real acontece nesta tela.
        </p>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PLANOS.map(plano => (
          <div key={plano.id} className="card card-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{plano.nome}</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-primary)' }}>{plano.preco}<span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-muted)' }}>{plano.periodo}</span></span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {plano.recursos.map(r => (
                <li key={r} style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 4 }}>{r}</li>
              ))}
            </ul>
            <button className="btn" style={{ marginTop: 12, width: '100%', border: '1px solid var(--color-border)', background: 'transparent' }} disabled>
              Definir como padrao (em breve)
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

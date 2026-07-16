import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { campanhas } from '../../data/campanhas'
import { getCampanhaDoMes, getCampanhaPorId } from '../../utils/tema'

// ---------------------------------------------------------------------------
// pages/adm/AdmTemaScreen.jsx
//
// Substitui o antigo campo solto 'corPrimaria' (que nao fazia nada) por um
// painel de botoes de verdade: o ADM escolhe entre deixar a cor do app
// automatica por mes (seguindo o calendario de campanhas de conscientizacao
// em src/data/campanhas.js) ou forcar uma campanha manualmente. A cor e
// aplicada no app inteiro via variaveis CSS (ver src/utils/tema.js e o
// componente AplicarTemaGlobal em App.jsx) assim que um botao e clicado,
// sem precisar salvar ou reiniciar nada.
// ---------------------------------------------------------------------------
export default function AdmTemaScreen() {
  const navigate = useNavigate()
  const { configTema, atualizarConfigTema } = useData()
  const campanhaDoMes = getCampanhaDoMes()
  const campanhaManual = getCampanhaPorId(configTema.campanhaManualId)

  const campanhaAtiva = configTema.modo === 'padrao'
    ? null
    : configTema.modo === 'manual'
      ? campanhaManual
      : campanhaDoMes

  function escolherModo(modo) {
    atualizarConfigTema({ modo })
  }

  function escolherCampanhaManual(id) {
    atualizarConfigTema({ modo: 'manual', campanhaManualId: id })
  }

  const botaoModo = (valor, label) => (
    <button
      onClick={() => escolherModo(valor)}
      style={{
        flex: 1, padding: '10px 8px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
        border: configTema.modo === valor ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
        background: configTema.modo === valor ? 'var(--color-primary-light)' : 'var(--color-surface)',
        color: 'var(--color-text-primary)',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer', marginBottom: 8, padding: 0 }}>← Voltar</button>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Temas e campanhas</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
          Troque a cor de destaque do app com botoes, sem precisar editar codigo. Ideia do usuario: acompanhar os meses de conscientizacao (Setembro Amarelo, Outubro Rosa, Mes da Mulher, etc).
        </p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div className="card card-padding">
          <p className="section-label" style={{ marginBottom: 8 }}>PREVIA</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: campanhaAtiva ? campanhaAtiva.cor : 'var(--color-primary)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{campanhaAtiva ? campanhaAtiva.nome : 'Cor oficial do EduFam'}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{campanhaAtiva ? campanhaAtiva.tema : 'Nenhuma campanha ativa'}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <p className="section-label">MODO</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {botaoModo('automatico', 'Automatico (por mes)')}
          {botaoModo('manual', 'Manual')}
          {botaoModo('padrao', 'Padrao (sem campanha)')}
        </div>
      </div>

      {configTema.modo === 'automatico' && (
        <div style={{ padding: '16px 20px 0' }}>
          <div className="card card-padding">
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              O app segue sozinho o calendario abaixo. Neste mes, a campanha ativa e <b>{campanhaDoMes ? campanhaDoMes.nome : 'nenhuma'}</b>.
            </p>
          </div>
        </div>
      )}

      {configTema.modo === 'manual' && (
        <div style={{ padding: '16px 20px 0' }}>
          <p className="section-label">ESCOLHA A CAMPANHA</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {campanhas.map(c => (
              <button
                key={c.id}
                onClick={() => escolherCampanhaManual(c.id)}
                style={{
                  textAlign: 'left', padding: 10, borderRadius: 10, cursor: 'pointer',
                  border: configTema.campanhaManualId === c.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: c.cor }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>{c.nome}</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>{c.tema}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '16px 20px 0' }}>
        <div className="card card-padding" style={{ background: 'var(--color-ia-light)', border: '1px solid #DDD6FE' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            Calendario baseado nas principais campanhas de saude e conscientizacao reconhecidas no Brasil. Escopo focado em saude publica, sem pautas identitarias ou politico-partidarias.
          </p>
        </div>
      </div>
    </div>
  )
}

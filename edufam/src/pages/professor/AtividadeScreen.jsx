import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockTurmas, mockAtividades } from '../../data/mockData'

export default function AtividadeScreen() {
  const { turmaId } = useParams()
  const navigate = useNavigate()
  const turma = mockTurmas.find(t => t.id === turmaId)
  const atividades = mockAtividades.filter(a => a.turmaId === turmaId)

  const [showNova, setShowNova] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <button
          onClick={() => navigate(`/modo-aula/${turmaId}`)}
          style={{
            width: 36, height: 36,
            background: 'var(--color-bg)', border: '1px solid var(--color-border)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Atividades</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>{turma?.nome}</p>
        </div>
        <button
          onClick={() => setShowNova(true)}
          style={{
            background: 'var(--color-success)', color: 'white',
            border: 'none', borderRadius: 10, padding: '8px 12px',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-family)',
          }}
        >
          + Nova
        </button>
      </div>

      {/* Form nova atividade */}
      {showNova && (
        <div style={{ padding: '16px 20px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Nova Atividade</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              className="input"
              placeholder="Titulo da atividade"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
            <textarea
              className="input"
              rows={3}
              placeholder="Descricao e instrucoes..."
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              style={{ resize: 'none', borderRadius: 12 }}
            />
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Data de entrega
              </label>
              <input
                className="input"
                type="date"
                value={dataEntrega}
                onChange={e => setDataEntrega(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setShowNova(false)}>Cancelar</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setShowNova(false)}>Publicar</button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de atividades */}
      <div style={{ padding: '16px 20px 0' }}>
        {atividades.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">assignment</div>
            <div className="empty-state-title">Nenhuma atividade</div>
            <div className="empty-state-sub">Crie atividades para seus alunos</div>
            <button className="btn btn-primary" onClick={() => setShowNova(true)} style={{ marginTop: 8 }}>
              Criar atividade
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {atividades.map(at => (
              <div key={at.id} className="card card-padding">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{at.titulo}</h3>
                  <span className={"badge" + (at.status === 'aberta' ? ' badge-success' : ' badge-warning')}>
                    {at.status === 'aberta' ? 'Aberta' : 'Encerrada'}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>
                  {at.descricao}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                    Entrega: {new Date(at.dataEntrega).toLocaleDateString('pt-BR')}
                  </span>
                  <button
                    style={{
                      background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                      border: 'none', borderRadius: 8, padding: '6px 12px',
                      fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-family)',
                    }}
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

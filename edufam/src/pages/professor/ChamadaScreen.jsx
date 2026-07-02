import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockTurmas, mockAlunos } from '../../data/mockData'

const STATUS_ORDER = [null, 'presente', 'falta', 'justificado']
const STATUS_CONFIG = {
  null:        { label: '',           bg: '#F1F5F9', color: '#64748B', border: '#E2E8F0' },
  presente:    { label: 'P',          bg: '#DCFCE7', color: '#16A34A', border: '#86EFAC' },
  falta:       { label: 'F',          bg: '#FEE2E2', color: '#DC2626', border: '#FCA5A5' },
  justificado: { label: 'J',          bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
}

export default function ChamadaScreen() {
  const { turmaId } = useParams()
  const navigate = useNavigate()
  const turma = mockTurmas.find(t => t.id === turmaId)
  const alunos = mockAlunos.filter(a => a.turmaId === turmaId)

  const [registros, setRegistros] = useState({})
  const [finalizada, setFinalizada] = useState(false)
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem('edufam_tutorial_chamada')
  })

  function toggleStatus(alunoId) {
    if (finalizada) return
    setRegistros(prev => {
      const current = prev[alunoId] || null
      const idx = STATUS_ORDER.indexOf(current)
      const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
      return { ...prev, [alunoId]: next }
    })
  }

  function resetAluno(alunoId) {
    if (finalizada) return
    setRegistros(prev => ({ ...prev, [alunoId]: null }))
  }

  function marcarTodos(status) {
    if (finalizada) return
    const novos = {}
    alunos.forEach(a => { novos[a.id] = status })
    setRegistros(novos)
  }

  function finalizarChamada() {
    setFinalizada(true)
  }

  const presentes = alunos.filter(a => registros[a.id] === 'presente').length
  const faltas = alunos.filter(a => registros[a.id] === 'falta').length
  const justificados = alunos.filter(a => registros[a.id] === 'justificado').length
  const naoMarcados = alunos.filter(a => !registros[a.id]).length

  function closeTutorial() {
    localStorage.setItem('edufam_tutorial_chamada', '1')
    setShowTutorial(false)
  }

  if (!turma) return null

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Tutorial overlay */}
      {showTutorial && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 20,
        }}>
          <div style={{
            background: 'white',
            borderRadius: 24,
            padding: 24,
            width: '100%',
            maxWidth: 430,
            margin: '0 auto',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Como fazer a chamada</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                { status: 'presente',    label: 'Toque 1x para Presente' },
                { status: 'falta',       label: 'Toque 2x para Falta' },
                { status: 'justificado', label: 'Toque 3x para Justificado' },
                { status: null,          label: 'Toque 4x para Limpar' },
              ].map(s => {
                const cfg = STATUS_CONFIG[s.status]
                return (
                  <div key={String(s.status)} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: cfg.bg,
                      border: `2px solid ${cfg.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      color: cfg.color,
                      fontSize: 16,
                      flexShrink: 0,
                    }}>
                      {cfg.label || '—'}
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{s.label}</span>
                  </div>
                )
              })}
            </div>
            <button className="btn btn-primary btn-full" onClick={closeTutorial}>
              Entendi, comecar!
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => navigate(`/modo-aula/${turmaId}`)}
            style={{
              width: 36,
              height: 36,
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Chamada</h2>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
              {turma.nome} • {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'P', value: presentes, color: '#16A34A', bg: '#DCFCE7' },
            { label: 'F', value: faltas, color: '#DC2626', bg: '#FEE2E2' },
            { label: 'J', value: justificados, color: '#B45309', bg: '#FEF3C7' },
            { label: '—', value: naoMarcados, color: '#64748B', bg: '#F1F5F9' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1,
              background: s.bg,
              borderRadius: 10,
              padding: '8px 4px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: s.color, opacity: 0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      {!finalizada && (
        <div style={{ padding: '12px 20px', display: 'flex', gap: 8 }}>
          <button
            onClick={() => marcarTodos('presente')}
            style={{
              flex: 1,
              padding: '8px',
              background: '#DCFCE7',
              color: '#16A34A',
              border: '1px solid #86EFAC',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
            }}
          >
            Todos presentes
          </button>
          <button
            onClick={() => setRegistros({})}
            style={{
              flex: 1,
              padding: '8px',
              background: '#F1F5F9',
              color: '#64748B',
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
            }}
          >
            Limpar tudo
          </button>
        </div>
      )}

      {/* Lista de alunos */}
      <div style={{ padding: '0 20px' }}>
        {alunos.map((aluno, idx) => {
          const status = registros[aluno.id] || null
          const cfg = STATUS_CONFIG[status]
          return (
            <div
              key={aluno.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: idx < alunos.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              {/* Nome e perfil */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-text-primary)' }}>
                  {aluno.nome}
                </div>
                {aluno.perfilPedagogico && (
                  <div style={{ fontSize: 11, color: 'var(--color-ia)', fontWeight: 600, marginTop: 2 }}>
                    Perfil Pedagogico
                  </div>
                )}
              </div>

              {/* Botao circular */}
              <button
                onClick={() => toggleStatus(aluno.id)}
                disabled={finalizada}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: cfg.bg,
                  border: `2.5px solid ${cfg.border}`,
                  color: cfg.color,
                  fontSize: 18,
                  fontWeight: 900,
                  cursor: finalizada ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 120ms ease',
                  fontFamily: 'var(--font-family)',
                  flexShrink: 0,
                }}
              >
                {cfg.label || <span style={{ fontSize: 22, opacity: 0.3 }}>○</span>}
              </button>
            </div>
          )
        })}
      </div>

      {/* Finalizar */}
      {!finalizada && (
        <div style={{ padding: '16px 20px 0' }}>
          <button
            className="btn btn-primary btn-full"
            onClick={finalizarChamada}
            disabled={naoMarcados > 0}
            style={{ opacity: naoMarcados > 0 ? 0.5 : 1 }}
          >
            {naoMarcados > 0
              ? `Marque mais ${naoMarcados} aluno${naoMarcados !== 1 ? 's' : ''}`
              : 'Finalizar chamada'}
          </button>
        </div>
      )}

      {/* Resumo pos-chamada */}
      {finalizada && (
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{
            background: '#DCFCE7',
            border: '1px solid #86EFAC',
            borderRadius: 16,
            padding: 20,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>check_circle</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#16A34A', marginBottom: 8 }}>
              Chamada finalizada!
            </h3>
            <p style={{ fontSize: 14, color: '#166534' }}>
              {presentes} presentes • {faltas} faltas • {justificados} justificados
            </p>
            <button
              className="btn btn-primary btn-full"
              onClick={() => navigate(`/modo-aula/${turmaId}`)}
              style={{ marginTop: 16 }}
            >
              Voltar ao Modo Aula
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

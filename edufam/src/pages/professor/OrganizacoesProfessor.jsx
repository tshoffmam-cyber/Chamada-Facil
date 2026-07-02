import { useNavigate } from 'react-router-dom'
import { mockTurmas, mockAlunos } from '../../data/mockData'

export default function OrganizacoesProfessor() {
  const navigate = useNavigate()

  const escolas = [...new Set(mockTurmas.map(t => t.escola))]

  return (
    <div style={{ padding: '20px 20px 8px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Minhas Escolas</h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
        Todas as organizacoes e turmas
      </p>

      {escolas.map(escola => {
        const turmasEscola = mockTurmas.filter(t => t.escola === escola)
        return (
          <div key={escola} style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
              padding: '14px 16px',
              background: 'var(--color-primary)',
              borderRadius: 16,
            }}>
              <div style={{
                width: 40,
                height: 40,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>
                school
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: 'white' }}>{escola}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  {turmasEscola.length} turma{turmasEscola.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {turmasEscola.map(turma => {
                const alunos = mockAlunos.filter(a => a.turmaId === turma.id)
                const comPerfil = alunos.filter(a => a.perfilPedagogico).length
                return (
                  <div
                    key={turma.id}
                    className="card"
                    style={{ padding: '14px 16px', cursor: 'pointer' }}
                    onClick={() => navigate(`/modo-aula/${turma.id}`)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{turma.nome}</div>
                        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                          {turma.disciplina} • Turno {turma.turno} • Sala {turma.sala}
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                          <span className="badge badge-primary">{turma.totalAlunos} alunos</span>
                          {comPerfil > 0 && (
                            <span className="badge badge-ia">{comPerfil} Perfil Pedagogico</span>
                          )}
                        </div>
                      </div>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>

                    {/* Horarios */}
                    <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {turma.horarios.map((h, i) => {
                        const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
                        return (
                          <span key={i} style={{
                            fontSize: 11,
                            fontWeight: 600,
                            background: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 6,
                            padding: '3px 7px',
                            color: 'var(--color-text-secondary)',
                          }}>
                            {dias[h.dia]} {h.inicio}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

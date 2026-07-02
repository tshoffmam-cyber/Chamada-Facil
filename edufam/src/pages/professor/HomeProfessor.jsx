import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockTurmas, mockMensagens, mockEventos } from '../../data/mockData'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function getContextCard() {
  const h = new Date().getHours()
  if (h >= 6 && h < 12) return { emoji: 'sunrise', msg: 'Prepare-se para as aulas da manha', color: '#F59E0B' }
  if (h >= 12 && h < 14) return { emoji: 'fork_and_knife', msg: 'Hora do almoco. Descanse bem.', color: '#16A34A' }
  if (h >= 14 && h < 18) return { emoji: 'book', msg: 'Tarde de aulas em andamento', color: '#2563EB' }
  return { emoji: 'moon', msg: 'Revise o dia. Planeje o amanha.', color: '#7C3AED' }
}

export default function HomeProfessor() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const ctx = getContextCard()

  const hoje = new Date()
  const diaSemana = hoje.getDay()
  const turmasHoje = mockTurmas.filter(t =>
    t.horarios.some(h => h.dia === diaSemana)
  )
  const mensagensNaoLidas = mockMensagens.filter(m => !m.lida).length
  const proximoEvento = mockEventos[0]

  const nome = user?.name?.split(' ')[0] || 'Professor'

  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 2 }}>
              {getGreeting()},
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {nome} 👋
            </h1>
          </div>
          <button
            onClick={() => navigate('/perfil')}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-family)',
            }}
          >
            {user?.avatar || 'P'}
          </button>
        </div>
      </div>

      {/* Context Banner */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${ctx.color}15 0%, ${ctx.color}08 100%)`,
          border: `1px solid ${ctx.color}25`,
          borderRadius: 16,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            background: `${ctx.color}18`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}>
            {ctx.emoji === 'sunrise' ? 'sunrise' : ctx.emoji === 'moon' ? 'moon' : ctx.emoji === 'book' ? 'book' : 'fork_and_knife'}
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', fontWeight: 500, margin: 0 }}>
            {ctx.msg}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <div className="card card-padding" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)' }}>{turmasHoje.length}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 500, marginTop: 2 }}>Aulas hoje</div>
        </div>
        <div className="card card-padding" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: mensagensNaoLidas > 0 ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>
            {mensagensNaoLidas}
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 500, marginTop: 2 }}>Msgs novas</div>
        </div>
        <div className="card card-padding" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-success)' }}>{mockTurmas.reduce((a, t) => a + t.totalAlunos, 0)}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 500, marginTop: 2 }}>Alunos</div>
        </div>
      </div>

      {/* Aulas de Hoje */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
          Aulas de hoje
        </p>

        {turmasHoje.length === 0 ? (
          <div className="card card-padding" style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 14, padding: '24px 16px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>weekend</div>
            Sem aulas hoje. Bom descanso!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {turmasHoje.map(turma => {
              const horario = turma.horarios.find(h => h.dia === diaSemana)
              return (
                <div
                  key={turma.id}
                  className="card"
                  style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                  onClick={() => navigate(`/modo-aula/${turma.id}`)}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)' }}>{turma.nome}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                      {turma.disciplina} • {horario?.inicio} - {horario?.fim}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                      {turma.totalAlunos} alunos • Sala {turma.sala}
                    </div>
                  </div>
                  <button
                    style={{
                      background: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 12,
                      padding: '10px 16px',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-family)',
                      flexShrink: 0,
                    }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/modo-aula/${turma.id}`) }}
                  >
                    Entrar
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Todas as turmas */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
          Minhas turmas
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mockTurmas.map(turma => (
            <div
              key={turma.id}
              className="card"
              style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => navigate(`/modo-aula/${turma.id}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  background: 'var(--color-primary-light)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}>
                  school
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{turma.nome}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                    {turma.disciplina} • {turma.totalAlunos} alunos
                  </div>
                </div>
              </div>
              <div style={{ color: 'var(--color-text-muted)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proximo evento */}
      {proximoEvento && (
        <div style={{ padding: '20px 20px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Proximo evento
          </p>
          <div className="card card-padding" style={{
            borderLeft: '4px solid var(--color-primary)',
          }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)' }}>{proximoEvento.titulo}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              {new Date(proximoEvento.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            {proximoEvento.descricao && (
              <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 4 }}>{proximoEvento.descricao}</div>
            )}
          </div>
        </div>
      )}

      {/* IA Sugestao */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-ia-light) 0%, #F3E8FF 100%)',
          border: '1px solid #DDD6FE',
          borderRadius: 16,
          padding: '16px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-ia)', marginBottom: 4 }}>IA EduFam</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Voce tem {turmasHoje.length} aula{turmasHoje.length !== 1 ? 's' : ''} hoje. Quer preparar alguma atividade ou verificar o historico de presenca?
            </p>
            <button
              onClick={() => navigate('/ia')}
              style={{
                marginTop: 10,
                background: 'var(--color-ia)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
              }}
            >
              Perguntar a IA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { mockTurmas, mockAlunos } from '../../data/mockData'

const acoes = [
  { id: 'chamada', label: 'Chamada', icon: 'checklist', color: '#2563EB', path: 'chamada' },
  { id: 'atividade', label: 'Atividade', icon: 'assignment', color: '#16A34A', path: 'atividade' },
  { id: 'positivo', label: 'Reg. Positivo', icon: 'star', color: '#F59E0B', path: null },
  { id: 'ocorrencia', label: 'Ocorrencia', icon: 'warning', color: '#DC2626', path: null },
  { id: 'vida', label: 'Vida Escolar', icon: 'book', color: '#7C3AED', path: 'alunos' },
  { id: 'comunicar', label: 'Comunicar Resp.', icon: 'message', color: '#0891B2', path: 'comunicacao' },
]

export default function ModoAula() {
  const { turmaId } = useParams()
  const navigate = useNavigate()
  const turma = mockTurmas.find(t => t.id === turmaId)
  const alunos = mockAlunos.filter(a => a.turmaId === turmaId)

  if (!turma) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <p>Turma nao encontrada</p>
        <button onClick={() => navigate('/home')} className="btn btn-primary" style={{ marginTop: 16 }}>
          Voltar
        </button>
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
        padding: '20px 20px 24px',
      }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>Modo Aula</p>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, margin: 0 }}>{turma.nome}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>
          {turma.disciplina} • {alunos.length} alunos • Sala {turma.sala}
        </p>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {[
            { label: 'Presentes', value: '—', color: '#86EFAC' },
            { label: 'Faltas', value: '—', color: '#FCA5A5' },
            { label: 'Turno', value: turma.turno, color: '#C4B5FD' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 10,
              padding: '8px 12px',
              flex: 1,
              textAlign: 'center',
            }}>
              <div style={{ color: s.color, fontWeight: 800, fontSize: 18 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Acoes */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
          O que deseja fazer?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {acoes.map(acao => (
            <button
              key={acao.id}
              onClick={() => {
                if (acao.path === 'chamada') navigate(`/chamada/${turmaId}`)
                else if (acao.path === 'atividade') navigate(`/atividade/${turmaId}`)
                else if (acao.path === 'comunicacao') navigate('/comunicacao')
              }}
              style={{
                background: 'var(--color-surface)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 16,
                padding: '18px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 10,
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                textAlign: 'left',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                background: `${acao.color}15`,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: 20, height: 20, background: acao.color, borderRadius: 4, opacity: 0.8 }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {acao.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista rapida de alunos */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Alunos ({alunos.length})
          </p>
          <button
            onClick={() => navigate(`/chamada/${turmaId}`)}
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
            }}
          >
            Fazer chamada
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {alunos.map(aluno => (
            <div
              key={aluno.id}
              className="card"
              style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
              onClick={() => navigate(`/aluno/${aluno.id}`)}
            >
              <div className="avatar avatar-sm" style={{
                background: aluno.perfilPedagogico ? 'var(--color-ia-light)' : 'var(--color-primary-light)',
                color: aluno.perfilPedagogico ? 'var(--color-ia)' : 'var(--color-primary)',
              }}>
                {aluno.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{aluno.nome}</div>
                {aluno.perfilPedagogico && (
                  <div style={{ fontSize: 11, color: 'var(--color-ia)', fontWeight: 600, marginTop: 1 }}>
                    Perfil Pedagogico: {aluno.perfilPedagogico.tipo}
                  </div>
                )}
              </div>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: aluno.situacao === 'regular' ? 'var(--color-success)'
                  : aluno.situacao === 'atencao' ? 'var(--color-warning)'
                  : 'var(--color-danger)',
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

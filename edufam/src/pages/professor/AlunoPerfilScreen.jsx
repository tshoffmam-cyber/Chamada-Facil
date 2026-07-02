import { useNavigate, useParams } from 'react-router-dom'
import { mockAlunos, mockTurmas, mockVidaEscolar } from '../../data/mockData'

export default function AlunoPerfilScreen() {
  const { alunoId } = useParams()
  const navigate = useNavigate()
  const aluno = mockAlunos.find(a => a.id === alunoId)
  const turma = aluno ? mockTurmas.find(t => t.id === aluno.turmaId) : null
  const vidaEscolar = mockVidaEscolar.filter(v => v.alunoId === alunoId)

  if (!aluno) return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <p>Aluno nao encontrado</p>
      <button onClick={() => navigate(-1)} className="btn btn-primary" style={{ marginTop: 16 }}>Voltar</button>
    </div>
  )

  const presencaPct = Math.round((aluno.presencas / (aluno.presencas + aluno.faltas)) * 100)

  return (
    <div style={{ paddingBottom: 32 }}>
      {/* Header */}
      <div style={{
        background: aluno.perfilPedagogico
          ? 'linear-gradient(135deg, #7C3AED, #9333EA)'
          : 'linear-gradient(135deg, #1D4ED8, #2563EB)',
        padding: '20px 20px 28px',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginBottom: 16,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 60, height: 60,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, color: 'white',
          }}>
            {aluno.avatar}
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>{aluno.nome}</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '4px 0 0' }}>
              {turma?.nome} • Mat. {aluno.matricula}
            </p>
            {aluno.perfilPedagogico && (
              <div style={{
                marginTop: 8,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '4px 10px',
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 700,
                color: 'white',
              }}>
                Perfil Pedagogico: {aluno.perfilPedagogico.tipo}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Presencas', value: aluno.presencas, color: 'var(--color-success)' },
          { label: 'Faltas', value: aluno.faltas, color: 'var(--color-danger)' },
          { label: 'Freq.', value: presencaPct + '%', color: presencaPct >= 75 ? 'var(--color-success)' : 'var(--color-danger)' },
        ].map(s => (
          <div key={s.label} className="card card-padding" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Perfil Pedagogico */}
      {aluno.perfilPedagogico && (
        <div style={{ padding: '16px 20px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-ia)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Perfil Pedagogico
          </p>
          <div style={{
            background: 'var(--color-ia-light)',
            border: '1px solid #DDD6FE',
            borderRadius: 16,
            padding: 16,
          }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-ia)', marginBottom: 8 }}>
              {aluno.perfilPedagogico.tipo}
            </div>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.55, marginBottom: 12 }}>
              {aluno.perfilPedagogico.descricao}
            </p>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-ia)', marginBottom: 8 }}>
                Adaptacoes necessarias:
              </p>
              {aluno.perfilPedagogico.adaptacoes.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-ia)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Responsavel */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
          Responsavel
        </p>
        <div className="card card-padding" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar avatar-md">
            {aluno.responsavel.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{aluno.responsavel.nome}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              {aluno.responsavel.parentesco}
            </div>
          </div>
          <button
            onClick={() => navigate('/comunicacao')}
            style={{
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              border: 'none',
              borderRadius: 10,
              padding: '8px 12px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
            }}
          >
            Enviar msg
          </button>
        </div>
      </div>

      {/* Vida Escolar preview */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Vida Escolar
          </p>
          <button
            onClick={() => navigate(`/vida-escolar/${alunoId}`)}
            style={{
              background: 'none', border: 'none', color: 'var(--color-primary)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)',
            }}
          >
            Ver tudo
          </button>
        </div>

        {vidaEscolar.length === 0 ? (
          <div className="card card-padding" style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 14, padding: '20px' }}>
            Nenhum registro ainda
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {vidaEscolar.slice(0, 2).map(v => {
              const colors = {
                registro_positivo: { bg: '#DCFCE7', color: '#16A34A', label: 'Positivo' },
                ocorrencia: { bg: '#FEE2E2', color: '#DC2626', label: 'Ocorrencia' },
                atividade: { bg: '#DBEAFE', color: '#2563EB', label: 'Atividade' },
              }
              const c = colors[v.tipo] || { bg: '#F1F5F9', color: '#64748B', label: v.tipo }
              return (
                <div key={v.id} className="card" style={{ padding: '12px 14px', borderLeft: `3px solid ${c.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.label}</span>
                      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v.titulo}</div>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                      {new Date(v.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

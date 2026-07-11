import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { mockUsers } from '../../data/mockData'
import BannerParceiros from '../../components/BannerParceiros'

// ---------------------------------------------------------------------------
// pages/responsavel/ResponsavelHomeScreen.jsx
//
// Home do Portal do Responsavel: visao rapida do filho (frequencia,
// proximo compromisso da agenda escolar) e os recados mais recentes
// (mural da direcao + individuais). Mesma logica de banner de parceiros
// da Home do professor, controlada pela mesma feature flag do ADM.
//
// PARA UM BACKEND REAL: hoje so mostra o primeiro aluno de
// user.alunosIds; um responsavel com mais de um filho na escola
// precisaria de um seletor de aluno (igual existe hoje so no Diretor).
// ---------------------------------------------------------------------------
function getSaudacao(){const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}

export default function ResponsavelHomeScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { alunos, turmas, mensagens, eventos, parceiros, featureFlags } = useData()

  const aluno = alunos.find(a => user?.alunosIds?.includes(a.id))
  const turma = aluno ? turmas.find(t => t.id === aluno.turmaId) : null
  const professor = turma ? mockUsers.find(u => u.id === turma.professorId) : null
  const freq = aluno ? Math.round((aluno.presencas / (aluno.presencas + aluno.faltas)) * 100) : null

  const hojeISO = new Date().toISOString().slice(0, 10)
  const proximoEvento = [...eventos].filter(e => e.data >= hojeISO).sort((a, b) => a.data.localeCompare(b.data))[0]

  const recados = [...mensagens]
    .filter(m => m.para === user?.id || m.para === 'todos')
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 3)

  if (!aluno) {
    return <div style={{ padding: 20, color: 'var(--color-text-muted)' }}>Nenhum aluno vinculado a este responsável ainda.</div>
  }

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{getSaudacao()},</p>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{user?.name}</h1>

      <div className="card card-padding" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18 }}>{aluno.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{aluno.nome}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{turma?.nome} · {turma?.disciplina} · {professor?.name}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div className="card card-padding">
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-primary)' }}>{freq}%</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Frequência</div>
        </div>
        <div className="card card-padding">
          <div style={{ fontSize: 22, fontWeight: 800, color: aluno.situacao === 'atencao' ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>{aluno.faltas}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>Faltas no ano</div>
        </div>
      </div>

      {proximoEvento && (
        <div className="card card-padding" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Próximo compromisso</div>
          <div style={{ fontWeight: 700 }}>{proximoEvento.titulo}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
            {new Date(proximoEvento.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}{proximoEvento.inicio ? ' · ' + proximoEvento.inicio : ''}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Recados recentes</p>
        <button onClick={() => navigate('/responsavel/recados')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Ver todos</button>
      </div>
      {recados.length === 0 && <div className="card card-padding" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Nenhum recado ainda.</div>}
      {recados.map(m => (
        <div key={m.id} className="card card-padding" style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{m.de}</span>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{new Date(m.data).toLocaleDateString('pt-BR')}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{m.assunto}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{m.texto}</div>
        </div>
      ))}

      {/* Banner de parceiros: mesma feature flag do ADM usada na Home do
          professor. Confirmado com o cliente que faz sentido exibir para
          todos os papeis (nao atrapalha: banner clicavel no rodape, sem
          bloquear a tela). */}
      {featureFlags?.bannerParceirosAtivo && (
        <div style={{ padding: '20px 0 0' }}>
          <BannerParceiros parceiros={parceiros} />
        </div>
      )}
    </div>
  )
}

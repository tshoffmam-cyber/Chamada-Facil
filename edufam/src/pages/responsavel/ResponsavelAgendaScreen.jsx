import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { buscarMapaFeriados } from '../../utils/feriados'

// ---------------------------------------------------------------------------
// pages/responsavel/ResponsavelAgendaScreen.jsx
//
// Agenda escolar do Portal do Responsavel: horario fixo de aulas da
// turma do filho + lista de proximos eventos/compromissos (cadastrados
// pelo professor na Agenda dele) e feriados nacionais (BrasilAPI, mesmo
// utilitario usado na AgendaScreen do professor). Somente leitura aqui —
// quem cadastra evento e o professor/direcao.
// ---------------------------------------------------------------------------
const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function ResponsavelAgendaScreen() {
  const { user } = useAuth()
  const { alunos, turmas, eventos } = useData()
  const [feriados, setFeriados] = useState({})

  const aluno = alunos.find(a => user?.alunosIds?.includes(a.id))
  const turma = aluno ? turmas.find(t => t.id === aluno.turmaId) : null

  useEffect(() => {
    const ano = new Date().getFullYear()
    buscarMapaFeriados([ano, ano + 1]).then(setFeriados)
  }, [])

  const hojeISO = new Date().toISOString().slice(0, 10)
  const itensFeriados = Object.entries(feriados)
    .filter(([data]) => data >= hojeISO)
    .map(([data, nome]) => ({ id: 'feriado-' + data, titulo: nome, data, tipo: 'feriado' }))

  const itens = [...eventos, ...itensFeriados]
    .filter(e => e.data >= hojeISO)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, 20)

  return (
    <div style={{ padding: '20px 20px 24px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Agenda escolar</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 20 }}>{aluno?.nome} · {turma?.nome}</p>

      {turma && (
        <>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Horário de aulas</p>
          <div className="card" style={{ marginBottom: 24 }}>
            {turma.horarios.map((h, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: i < turma.horarios.length - 1 ? '1px solid var(--color-border)' : 'none', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{DIAS[h.dia]}</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{h.inicio} - {h.fim}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Próximos eventos e compromissos</p>
      {itens.length === 0 && <div className="card card-padding" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Nenhum evento futuro cadastrado.</div>}
      {itens.map(e => (
        <div key={e.id} className="card card-padding" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{e.titulo}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
              {new Date(e.data + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'long' })}
              {e.inicio ? ' · ' + e.inicio + (e.fim ? '–' + e.fim : '') : ''}
            </div>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap',
            background: e.tipo === 'feriado' ? 'var(--color-success-light)' : '#EEF2FF',
            color: e.tipo === 'feriado' ? 'var(--color-success)' : 'var(--color-primary)'
          }}>
            {e.tipo === 'feriado' ? 'Feriado' : e.tipo === 'compromisso' ? 'Compromisso' : 'Evento'}
          </span>
        </div>
      ))}
    </div>
  )
}

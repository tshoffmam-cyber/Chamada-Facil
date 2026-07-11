// ---------------------------------------------------------------------------
// utils/alertas.js
//
// Central de alertas do professor: junta sinais espalhados pelo sistema
// (faltas no limite, aula prestes a comecar, compromissos do dia ainda nao
// realizados e feriado hoje) num unico lugar para exibir na Home. E uma
// funcao pura (recebe dados, devolve uma lista) para ser facil de testar.
//
// PARA UM BACKEND REAL: hoje isso e recalculado no cliente a cada
// renderizacao. Em producao, o ideal e um servico de notificacoes real
// (fila de eventos no backend disparando push notification, e-mail e/ou
// notificacao in-app), com os alertas persistidos e marcados como lidos
// por usuario, nao recalculados toda hora no navegador.
// ---------------------------------------------------------------------------

import { horaParaMin } from '../data/mockData'

export function gerarAlertas({ turmas, alunos, eventos, professorId, feriadoHoje }) {
  const alertas = []
  const agora = new Date()
  const minAgora = agora.getHours() * 60 + agora.getMinutes()
  const hojeISO = agora.getFullYear() + '-' + String(agora.getMonth() + 1).padStart(2, '0') + '-' + String(agora.getDate()).padStart(2, '0')
  const diaSemana = agora.getDay()

  const minhasTurmas = turmas.filter(t => t.professorId === professorId)

  // 1. Turmas com alunos no limite de faltas (ou acima)
  minhasTurmas.forEach(t => {
    const limite = t.limiteFaltas ?? 15
    const alunosNoLimite = alunos.filter(a => a.turmaId === t.id && a.faltas >= limite)
    if (alunosNoLimite.length > 0) {
      alertas.push({
        id: 'alerta_faltas_' + t.id,
        tipo: 'faltas',
        cor: 'var(--color-danger)',
        icone: String.fromCodePoint(128680),
        titulo: alunosNoLimite.length === 1 ? '1 aluno no limite de faltas' : alunosNoLimite.length + ' alunos no limite de faltas',
        descricao: t.nome + ' — ' + alunosNoLimite.map(a => a.nome).join(', '),
        rota: '/turma/' + t.id,
      })
    }
  })

  // 2. Aula prestes a comecar (proximos 15 minutos) hoje
  minhasTurmas.forEach(t => {
    t.horarios.forEach(h => {
      if (h.dia === diaSemana) {
        const ini = horaParaMin(h.inicio)
        const diff = ini - minAgora
        if (diff > 0 && diff <= 15) {
          alertas.push({
            id: 'alerta_aula_' + t.id + '_' + h.dia,
            tipo: 'aula',
            cor: 'var(--color-primary)',
            icone: String.fromCodePoint(9200),
            titulo: 'Aula comeca em ' + diff + ' min',
            descricao: t.nome + ' — ' + t.disciplina + ' às ' + h.inicio,
            rota: '/turma/' + t.id,
          })
        }
      }
    })
  })

  // 3. Compromissos de hoje que ainda nao aconteceram
  eventos.filter(e => e.data === hojeISO).forEach(e => {
    const fimMin = horaParaMin(e.fim)
    if (fimMin > minAgora) {
      alertas.push({
        id: 'alerta_evento_' + e.id,
        tipo: 'evento',
        cor: 'var(--color-warning)',
        icone: String.fromCodePoint(128197),
        titulo: 'Compromisso hoje às ' + e.inicio,
        descricao: e.titulo,
        rota: '/agenda',
      })
    }
  })

  // 4. Feriado hoje
  if (feriadoHoje) {
    alertas.push({
      id: 'alerta_feriado_hoje',
      tipo: 'feriado',
      cor: 'var(--color-success)',
      icone: String.fromCodePoint(127881),
      titulo: 'Hoje é feriado',
      descricao: feriadoHoje,
      rota: '/agenda',
    })
  }

  return alertas
}

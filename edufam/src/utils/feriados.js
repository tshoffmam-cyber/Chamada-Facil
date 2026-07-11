// ---------------------------------------------------------------------------
// utils/feriados.js
//
// Utilitario compartilhado para buscar feriados nacionais via BrasilAPI
// (endpoint publico e gratuito: https://brasilapi.com.br/api/feriados/v1/{ano}).
//
// Usado pela AgendaScreen (mes inteiro) e pela HomeProfessor (feriado de
// hoje, para alimentar a central de alertas). Antes cada tela tinha sua
// propria copia dessa logica; foi centralizado aqui para evitar duplicacao
// e facilitar a manutencao.
//
// PARA UM BACKEND REAL: o ideal e o proprio backend do EduFam buscar e
// cachear os feriados (ex: rotina agendada uma vez por ano por estado/
// municipio, considerando tambem feriados estaduais e municipais, que a
// BrasilAPI nao cobre no endpoint nacional usado aqui), servindo para o
// app por uma rota propria. Isso evita depender de uma API externa em
// tempo real e permite customizar feriados por escola/regiao.
// ---------------------------------------------------------------------------

const cache = {}

export async function buscarFeriadosDoAno(ano) {
  if (cache[ano]) return cache[ano]
  try {
    const resp = await fetch('https://brasilapi.com.br/api/feriados/v1/' + ano)
    const lista = resp.ok ? await resp.json() : []
    cache[ano] = lista
    return lista
  } catch {
    return []
  }
}

// Recebe uma lista de anos (ex: [2026] ou [2026, 2027] quando a grade do
// calendario cruza o fim do ano) e devolve um mapa { 'AAAA-MM-DD': 'Nome do feriado' }.
export async function buscarMapaFeriados(anos) {
  const listas = await Promise.all(anos.map(buscarFeriadosDoAno))
  const mapa = {}
  listas.flat().forEach(f => { mapa[f.date] = f.name })
  return mapa
}

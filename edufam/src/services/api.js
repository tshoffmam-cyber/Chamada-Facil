// ---------------------------------------------------------------------------
// services/api.js
//
// Camada de servico "de encaixe" para o backend real (FastAPI + PostgreSQL,
// conforme o PRD). NAO esta conectada ao app ainda -- nenhum componente ou
// contexto importa este arquivo hoje. Ele existe para servir de CONTRATO
// de referencia: cada funcao aqui espelha, com o mesmo nome e a mesma
// assinatura, uma funcao equivalente hoje implementada em
// src/context/DataContext.jsx usando localStorage + dados mockados.
//
// COMO USAR QUANDO O BACKEND EXISTIR:
// 1) Trocar o corpo de cada funcao abaixo por um fetch() real para o
//    endpoint indicado no comentario (ex: fetch(`${BASE_URL}/turmas`)).
// 2) Trocar, dentro de src/context/DataContext.jsx, as chamadas que hoje
//    mexem em localStorage/estado local pelas funcoes equivalentes deste
//    arquivo (ex: em vez de 'setTurmas(prev => ...)', chamar
//    'await api.criarTurma(dados)' e atualizar o estado com a resposta).
// 3) Como os nomes e formatos de parametro foram mantidos identicos aos
//    do DataContext, a maior parte das TELAS nao deveria precisar mudar.
// 4) Autenticacao: hoje o token/sessao nao existe. Quando existir, comece
//    aqui (ver 'login' e 'getAuthHeaders' no fim do arquivo).
//
// Nenhuma URL de servidor real esta configurada -- BASE_URL e um placeholder.
// ---------------------------------------------------------------------------

const BASE_URL = 'https://api.edufam.exemplo.com' // PARA UM BACKEND REAL: trocar pela URL real da API

async function request(path, options = {}) {
  // Stub: hoje so lanca erro se for chamado, para deixar claro que esta
  // camada ainda nao esta em uso. Quando o backend existir, troque o corpo
  // desta funcao por um fetch() real com tratamento de erro/JSON.
  throw new Error(
    'services/api.js ainda nao esta conectado a um backend real. ' +
    'Path solicitado: ' + path
  )
  // Exemplo de implementacao futura:
  // const res = await fetch(BASE_URL + path, { headers: getAuthHeaders(), ...options })
  // if (!res.ok) throw new Error('Erro na API: ' + res.status)
  // return res.json()
}

// --- Autenticacao -----------------------------------------------------------
// PARA UM BACKEND REAL: POST /auth/login recebendo email/senha (ou token do
// Google/CPF, conforme o PRD), devolvendo { token, user }. Guardar o token
// (ex: em memoria + refresh via cookie httpOnly) e enviar em
// Authorization: Bearer <token> nas demais chamadas.
export async function login(email, password) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}
export function getAuthHeaders() {
  return {} // PARA UM BACKEND REAL: retornar { Authorization: 'Bearer ' + token }
}

// --- Turmas/Organizacoes/Alunos (hoje em DataContext.jsx) -------------------
export async function listarOrganizacoes() { return request('/organizacoes') }
export async function criarOrganizacao(dados) { return request('/organizacoes', { method: 'POST', body: JSON.stringify(dados) }) }
export async function editarOrganizacao(dados) { return request('/organizacoes/' + dados.id, { method: 'PATCH', body: JSON.stringify(dados) }) }
export async function removerOrganizacao(id) { return request('/organizacoes/' + id, { method: 'DELETE' }) }

export async function listarTurmas() { return request('/turmas') }
export async function criarTurma(dados) { return request('/turmas', { method: 'POST', body: JSON.stringify(dados) }) }
export async function editarTurma(dados) { return request('/turmas/' + dados.id, { method: 'PATCH', body: JSON.stringify(dados) }) }
export async function removerTurma(id) { return request('/turmas/' + id, { method: 'DELETE' }) }

export async function listarAlunos() { return request('/alunos') }
export async function adicionarAluno(dados) { return request('/alunos', { method: 'POST', body: JSON.stringify(dados) }) }
export async function editarAluno(dados) { return request('/alunos/' + dados.id, { method: 'PATCH', body: JSON.stringify(dados) }) }
export async function removerAluno(id) { return request('/alunos/' + id, { method: 'DELETE' }) }

// --- Chamada/Atividades/Notas/Vida Escolar/Mensagens/Eventos ----------------
export async function salvarChamada(turmaId, data, registros) {
  return request('/chamadas', { method: 'POST', body: JSON.stringify({ turmaId, data, registros }) })
}
export async function adicionarAtividade(atividade) { return request('/atividades', { method: 'POST', body: JSON.stringify(atividade) }) }
export async function lancarNota(atividadeId, alunoId, nota) {
  return request('/atividades/' + atividadeId + '/notas', { method: 'POST', body: JSON.stringify({ alunoId, nota }) })
}
export async function adicionarRegistroVida(alunoId, registro) {
  return request('/alunos/' + alunoId + '/vida-escolar', { method: 'POST', body: JSON.stringify(registro) })
}
export async function enviarMensagem(dados) { return request('/mensagens', { method: 'POST', body: JSON.stringify(dados) }) }
export async function marcarMensagemLida(id) { return request('/mensagens/' + id + '/lida', { method: 'PATCH' }) }
export async function listarEventos() { return request('/eventos') }
export async function adicionarEvento(evento) { return request('/eventos', { method: 'POST', body: JSON.stringify(evento) }) }
export async function editarEvento(dados) { return request('/eventos/' + dados.id, { method: 'PATCH', body: JSON.stringify(dados) }) }
export async function removerEvento(id) { return request('/eventos/' + id, { method: 'DELETE' }) }

// --- Painel ADM: parceiros, suporte e feature flags -------------------------
// PARA UM BACKEND REAL: ver comentario equivalente em DataContext.jsx --
// parceiros e feature flags viram tabelas reais; tickets de suporte passam
// a ser criados automaticamente pelo backend quando a IA EduFam falhar.
export async function listarParceiros() { return request('/adm/parceiros') }
export async function adicionarParceiro(dados) { return request('/adm/parceiros', { method: 'POST', body: JSON.stringify(dados) }) }
export async function editarParceiro(dados) { return request('/adm/parceiros/' + dados.id, { method: 'PATCH', body: JSON.stringify(dados) }) }
export async function removerParceiro(id) { return request('/adm/parceiros/' + id, { method: 'DELETE' }) }

export async function listarSuporteTickets() { return request('/adm/suporte/tickets') }
export async function resolverTicket(id) { return request('/adm/suporte/tickets/' + id + '/resolver', { method: 'PATCH' }) }

export async function obterFeatureFlags() { return request('/adm/feature-flags') }
export async function atualizarFeatureFlags(dados) { return request('/adm/feature-flags', { method: 'PATCH', body: JSON.stringify(dados) }) }

// --- Painel ADM: metricas de negocio (assinaturas, MRR, churn) --------------
// PARA UM BACKEND REAL: hoje mockAdmStats e mockIndicadoresProfessor (em
// data/mockData.js) sao numeros fixos. Aqui viriam de consultas reais ao
// banco de assinaturas/pagamentos e as tabelas de chamada/notas.
export async function obterEstatisticasAdm() { return request('/adm/estatisticas') }
export async function obterIndicadoresProfessores() { return request('/adm/indicadores-professores') }

// --- IA EduFam ---------------------------------------------------------------
// PARA UM BACKEND REAL: a IA EduFam (ver pages/professor/IAScreen.jsx) hoje
// so tem respostas mockadas na tela. Endpoints sugeridos para quando um
// provedor de IA real for integrado (ex: via um servico proprio que chama
// um modelo de linguagem no backend, nunca direto do navegador com a chave
// de API exposta):
export async function iaGerarAtividade(turmaId, instrucoes) {
  return request('/ia/gerar-atividade', { method: 'POST', body: JSON.stringify({ turmaId, instrucoes }) })
}
export async function iaGerarResumoTurma(turmaId) {
  return request('/ia/resumo-turma/' + turmaId)
}
export async function iaSugerirComunicado(contexto) {
  return request('/ia/sugerir-comunicado', { method: 'POST', body: JSON.stringify(contexto) })
}
export async function iaPerguntar(pergunta, contexto) {
  return request('/ia/perguntar', { method: 'POST', body: JSON.stringify({ pergunta, contexto }) })
}

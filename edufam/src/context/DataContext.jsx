// ---------------------------------------------------------------------------
// context/DataContext.jsx
//
// Fonte central de dados do app (fora da autenticacao, que fica no
// AuthContext). Hoje tudo e mockado e persistido em localStorage — serve
// para prototipar o produto inteiro no navegador, sem backend.
//
// PARA UM BACKEND REAL: cada 'state + funcao' abaixo deveria virar uma
// chamada de API para um backend real (ex: FastAPI + PostgreSQL, como
// planejado no PRD), com o localStorage substituido por dados vindos do
// servidor e cache local apenas para uso offline/otimista. As funcoes
// foram mantidas com nomes e assinaturas estaveis de proposito, para que
// a troca da implementacao interna (localStorage -> fetch/API) exija o
// minimo de mudanca nas telas que já consomem este contexto.
// ---------------------------------------------------------------------------
import { createContext, useContext, useState, useCallback } from 'react'
import { mockOrganizacoes, mockTurmas, mockAlunos, mockAtividades, mockVidaEscolar, mockMensagens, mockParceiros, mockSuporteTickets, mockFeatureFlags } from '../data/mockData'
const DataContext = createContext(null)
const ls = (k, d) => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : d } catch { return d } }
const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
export function DataProvider({ children }) {
const [chamadas, setChamadas] = useState(() => ls('edufam_chamadas', {}))
const [atividades, setAtividades] = useState(() => ls('edufam_atividades', mockAtividades))
const [notasAtividades, setNotasAtividades] = useState(() => ls('edufam_notas_atividades', {}))
const [vidaEscolar, setVidaEscolar] = useState(() => ls('edufam_vida_escolar', mockVidaEscolar))
const [mensagens, setMensagens] = useState(() => ls('edufam_mensagens', mockMensagens))
const [eventos, setEventos] = useState(() => ls('edufam_eventos', []))
const [organizacoes, setOrganizacoes] = useState(() => ls('edufam_organizacoes', mockOrganizacoes))
const [turmas, setTurmas] = useState(() => ls('edufam_turmas', mockTurmas))
const [alunos, setAlunos] = useState(() => ls('edufam_alunos', mockAlunos))
// Estado usado pelo painel ADM (ver pages/adm/*). Fica no mesmo contexto
// porque hoje e tudo client-side; em producao provavelmente viraria um
// contexto/servico separado com permissao restrita a usuarios 'adm'.
const [parceiros, setParceiros] = useState(() => ls('edufam_parceiros', mockParceiros))
const [suporteTickets, setSuporteTickets] = useState(() => ls('edufam_suporte_tickets', mockSuporteTickets))
const [featureFlags, setFeatureFlags] = useState(() => ls('edufam_feature_flags', mockFeatureFlags))

const salvarChamada = useCallback((turmaId, data, registros) => {
setChamadas(prev => {
const next = { ...prev, [`${turmaId}_${data}`]: registros }
sv('edufam_chamadas', next)
return next
})
}, [])

const adicionarAtividade = useCallback((atividade) => {
setAtividades(prev => {
const next = [...prev, atividade]
sv('edufam_atividades', next)
return next
})
}, [])

const lancarNota = useCallback((atividadeId, alunoId, nota) => {
setNotasAtividades(prev => {
const next = { ...prev, [atividadeId]: { ...(prev[atividadeId] || {}), [alunoId]: nota } }
sv('edufam_notas_atividades', next)
return next
})
}, [])

const adicionarRegistroVida = useCallback((alunoId, registro) => {
setVidaEscolar(prev => {
const next = { ...prev, [alunoId]: [...(prev[alunoId] || []), registro] }
sv('edufam_vida_escolar', next)
return next
})
}, [])

const marcarMensagemLida = useCallback((id) => {
setMensagens(prev => {
const next = prev.map(m => m.id === id ? { ...m, lida: true } : m)
sv('edufam_mensagens', next)
return next
})
}, [])

const enviarMensagem = useCallback((dados) => {
const nova = { id: 'm' + Date.now(), data: new Date().toISOString(), lida: false, tipo: 'direcao', ...dados }
setMensagens(prev => {
const next = [nova, ...prev]
sv('edufam_mensagens', next)
return next
})
return nova
}, [])

const adicionarEvento = useCallback((evento) => {
setEventos(prev => {
const next = [...prev, { id: 'ev' + Date.now(), ...evento }]
sv('edufam_eventos', next)
return next
})
}, [])

const editarEvento = useCallback((id, dados) => {
setEventos(prev => {
const next = prev.map(e => e.id === id ? { ...e, ...dados } : e)
sv('edufam_eventos', next)
return next
})
}, [])

const removerEvento = useCallback((id) => {
setEventos(prev => {
const next = prev.filter(e => e.id !== id)
sv('edufam_eventos', next)
return next
})
}, [])

const criarOrganizacao = useCallback((dados) => {
const nova = { id: 'org' + Date.now(), ...dados }
setOrganizacoes(prev => {
const next = [...prev, nova]
sv('edufam_organizacoes', next)
return next
})
return nova
}, [])

const editarOrganizacao = useCallback((id, dados) => {
setOrganizacoes(prev => {
const next = prev.map(o => o.id === id ? { ...o, ...dados } : o)
sv('edufam_organizacoes', next)
return next
})
}, [])

const removerOrganizacao = useCallback((id) => {
setTurmas(prev => {
const idsRemovidas = prev.filter(t => t.organizacaoId === id).map(t => t.id)
const next = prev.filter(t => t.organizacaoId !== id)
sv('edufam_turmas', next)
setAlunos(prevA => {
const nextA = prevA.filter(a => !idsRemovidas.includes(a.turmaId))
sv('edufam_alunos', nextA)
return nextA
})
return next
})
setOrganizacoes(prev => {
const next = prev.filter(o => o.id !== id)
sv('edufam_organizacoes', next)
return next
})
}, [])

const criarTurma = useCallback((dados) => {
const nova = { id: 't' + Date.now(), horarios: [], limiteFaltas: 15, ...dados }
setTurmas(prev => {
const next = [...prev, nova]
sv('edufam_turmas', next)
return next
})
return nova
}, [])

const editarTurma = useCallback((id, dados) => {
setTurmas(prev => {
const next = prev.map(t => t.id === id ? { ...t, ...dados } : t)
sv('edufam_turmas', next)
return next
})
}, [])

const removerTurma = useCallback((id) => {
setTurmas(prev => {
const next = prev.filter(t => t.id !== id)
sv('edufam_turmas', next)
return next
})
setAlunos(prev => {
const next = prev.filter(a => a.turmaId !== id)
sv('edufam_alunos', next)
return next
})
}, [])

const adicionarAluno = useCallback((dados) => {
const iniciais = (dados.nome || '').trim().split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('') || 'AL'
const novo = { id: 'a' + Date.now(), avatar: iniciais, perfilPedagogico: null, presencas: 0, faltas: 0, situacao: 'regular', ...dados }
setAlunos(prev => {
const next = [...prev, novo]
sv('edufam_alunos', next)
return next
})
return novo
}, [])

const editarAluno = useCallback((id, dados) => {
setAlunos(prev => {
const next = prev.map(a => a.id === id ? { ...a, ...dados } : a)
sv('edufam_alunos', next)
return next
})
}, [])

const removerAluno = useCallback((id) => {
setAlunos(prev => {
const next = prev.filter(a => a.id !== id)
sv('edufam_alunos', next)
return next
})
}, [])

// --- Painel ADM: parceiros do banner rotativo -----------------------------
const adicionarParceiro = useCallback((dados) => {
const novo = { id: 'pc' + Date.now(), ...dados }
setParceiros(prev => {
const next = [...prev, novo]
sv('edufam_parceiros', next)
return next
})
return novo
}, [])

const editarParceiro = useCallback((id, dados) => {
setParceiros(prev => {
const next = prev.map(p => p.id === id ? { ...p, ...dados } : p)
sv('edufam_parceiros', next)
return next
})
}, [])

const removerParceiro = useCallback((id) => {
setParceiros(prev => {
const next = prev.filter(p => p.id !== id)
sv('edufam_parceiros', next)
return next
})
}, [])

// --- Painel ADM: tickets de suporte / IA que falhou -----------------------
const resolverTicket = useCallback((id) => {
setSuporteTickets(prev => {
const next = prev.map(t => t.id === id ? { ...t, status: 'resolvido' } : t)
sv('edufam_suporte_tickets', next)
return next
})
}, [])

// --- Painel ADM: configuracoes avancadas / feature flags ------------------
// Substitui a necessidade de 'codar dentro do app': o ADM ajusta estes
// valores por um formulario (ver AdmConfigAvancadaScreen), sem precisar de
// um novo deploy. Mudancas de codigo de verdade continuam exigindo
// repositorio + revisao + pipeline de deploy, por seguranca.
const atualizarFeatureFlags = useCallback((dados) => {
setFeatureFlags(prev => {
const next = { ...prev, ...dados }
sv('edufam_feature_flags', next)
return next
})
}, [])

return (
<DataContext.Provider value={{ chamadas, atividades, notasAtividades, lancarNota, vidaEscolar, mensagens, salvarChamada, adicionarAtividade, adicionarRegistroVida, marcarMensagemLida, eventos, enviarMensagem, adicionarEvento, editarEvento, removerEvento, organizacoes, turmas, alunos, criarOrganizacao, editarOrganizacao, removerOrganizacao, criarTurma, editarTurma, removerTurma, adicionarAluno, editarAluno, removerAluno, parceiros, adicionarParceiro, editarParceiro, removerParceiro, suporteTickets, resolverTicket, featureFlags, atualizarFeatureFlags }}>
{children}
</DataContext.Provider>
)
}
export const useData = () => {
const ctx = useContext(DataContext)
if (!ctx) throw new Error('useData must be used within DataProvider')
return ctx
}

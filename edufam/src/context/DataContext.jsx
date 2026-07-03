import { createContext, useContext, useState, useCallback } from 'react'
import { mockAtividades, mockVidaEscolar, mockMensagens } from '../data/mockData'
const DataContext = createContext(null)
const ls = (k, d) => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : d } catch { return d } }
const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
export function DataProvider({ children }) {
  const [chamadas, setChamadas] = useState(() => ls('edufam_chamadas', {}))
  const [atividades, setAtividades] = useState(() => ls('edufam_atividades', mockAtividades))
  const [vidaEscolar, setVidaEscolar] = useState(() => ls('edufam_vida_escolar', mockVidaEscolar))
  const [mensagens, setMensagens] = useState(() => ls('edufam_mensagens', mockMensagens))

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

  const adicionarRegistroVida = useCallback((alunoId, registro) => {
    setVidaEscolar(prev => {
      const next = { ...prev, [alunoId]: [...(prev[alunoId] || []), registro] }
      sv('edufam_vida_escolar', next)
      return next
    })
  }, [])

  return (
    <DataContext.Provider value={{ chamadas, atividades, vidaEscolar, mensagens, salvarChamada, adicionarAtividade, adicionarRegistroVida }}>
      {children}
    </DataContext.Provider>
  )
}
export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}

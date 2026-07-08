import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const TIPOS = [
  { id: 'compromisso', label: 'Compromisso', cor: 'var(--color-primary)' },
  { id: 'reuniao', label: 'Reunião', cor: 'var(--color-ia)' },
  { id: 'lembrete', label: 'Lembrete', cor: 'var(--color-warning)' },
]

function toISO(d) { return d.toISOString().slice(0,10) }

function gerarDias(qtd) {
  const dias = []
  const hoje = new Date()
  hoje.setHours(0,0,0,0)
  for (let i = 0; i < qtd; i++) {
    const d = new Date(hoje)
    d.setDate(hoje.getDate() + i)
    dias.push(d)
  }
  return dias
}

function tipoInfo(tipoId) {
  return TIPOS.find(t => t.id === tipoId) || TIPOS[0]
}

export default function AgendaScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { eventos, adicionarEvento, removerEvento, turmas } = useData()
  const dias = gerarDias(14)
  const [selecionado, setSelecionado] = useState(toISO(dias[0]))
  const [mostrarForm, setMostrarForm] = useState(false)
  const [novo, setNovo] = useState({ titulo: '', inicio: '08:00', fim: '09:00', tipo: 'compromisso', descricao: '' })
  const minhasTurmas = turmas.filter(t => t.professorId === user?.id)
  function aulasDoDia(dataISO) {
    const diaSemana = new Date(dataISO + 'T00:00:00').getDay()
    const aulas = []
    minhasTurmas.forEach(t => {
      t.horarios.forEach(h => {
        if (h.dia === diaSemana) aulas.push({ id: 'aula_' + t.id + '_' + h.dia, tipo: 'aula', titulo: t.nome + ' - ' + t.disciplina, inicio: h.inicio, fim: h.fim })
      })
    })
    return aulas
  }

  const eventosDoDia = eventos.filter(e => e.data === selecionado)
  const itensDoDia = [...aulasDoDia(selecionado), ...eventosDoDia].sort((a,b) => a.inicio.localeCompare(b.inicio))

  function salvarNovoEvento() {
    if (!novo.titulo.trim()) return
    adicionarEvento({ ...novo, data: selecionado })
    setNovo({ titulo: '', inicio: '08:00', fim: '09:00', tipo: 'compromisso', descricao: '' })
    setMostrarForm(false)
  }

  return (
    <div style={{paddingBottom:40}}>
      <div className="page-header">
        <div className="page-header-back" onClick={()=>navigate('/home')}>‹</div>
        <div>
          <div className="page-header-title">Agenda</div>
          <div className="page-header-sub">Aulas e compromissos</div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,overflowX:'auto',padding:'0 20px 16px'}}>
        {dias.map(d => {
          const iso = toISO(d)
          const ativo = iso === selecionado
          return (
            <button key={iso} onClick={()=>setSelecionado(iso)} style={{flexShrink:0,minWidth:52,display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'10px 8px',borderRadius:16,background: ativo ? 'var(--color-primary)' : 'var(--color-surface)',border: ativo ? 'none' : '1px solid var(--color-border)',color: ativo ? '#fff' : 'var(--color-text-primary)',cursor:'pointer'}}>
              <span style={{fontSize:11,fontWeight:600}}>{DIAS_SEMANA[d.getDay()]}</span>
              <span style={{fontSize:16,fontWeight:800}}>{d.getDate()}</span>
            </button>
          )
        })}
      </div>
      <div style={{padding:'0 20px'}}>
        {itensDoDia.length===0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🗓️</div>
            <div className="empty-state-title">Nada por aqui</div>
            <div className="empty-state-sub">Sem aulas ou compromissos neste dia.</div>
          </div>
        )}
        {itensDoDia.map(item => (
          <div key={item.id} className="card card-padding" style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:13,fontWeight:700,color:'var(--color-text-secondary)'}}>{item.inicio} - {item.fim}</span>
              <span className={item.tipo==='aula' ? 'badge badge-primary' : 'badge badge-warning'}>{item.tipo==='aula' ? 'Aula' : tipoInfo(item.tipo).label}</span>
            </div>
            <div style={{fontSize:15,fontWeight:700,marginTop:4}}>{item.titulo}</div>
            {item.descricao ? <div style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>{item.descricao}</div> : null}
            {item.tipo!=='aula' ? <button onClick={()=>removerEvento(item.id)} style={{marginTop:8,background:'none',border:'none',color:'var(--color-danger)',fontSize:13,fontWeight:600,cursor:'pointer',padding:0}}>Remover</button> : null}
          </div>
        ))}
      </div>
      {!mostrarForm ? (
        <div style={{padding:'8px 20px 0'}}>
          <button className="btn btn-primary w-full" onClick={()=>setMostrarForm(true)}>+ Novo compromisso</button>
        </div>
      ) : (
        <div className="card card-padding" style={{margin:'8px 20px 0'}}>
          <div style={{fontWeight:700,marginBottom:12}}>Novo compromisso</div>
          <input className="input" placeholder="Titulo" value={novo.titulo} onChange={e=>setNovo({...novo,titulo:e.target.value})} style={{marginBottom:10}} />
          <div style={{display:'flex',gap:10,marginBottom:10}}>
            <input className="input" type="time" value={novo.inicio} onChange={e=>setNovo({...novo,inicio:e.target.value})} />
            <input className="input" type="time" value={novo.fim} onChange={e=>setNovo({...novo,fim:e.target.value})} />
          </div>
          <div style={{display:'flex',gap:8,marginBottom:10}}>
            {TIPOS.map(t => (
              <button key={t.id} onClick={()=>setNovo({...novo,tipo:t.id})} style={{flex:1,padding:'8px 4px',borderRadius:12,fontSize:12,fontWeight:700,cursor:'pointer',border: novo.tipo===t.id ? 'none' : '1px solid var(--color-border)',background: novo.tipo===t.id ? t.cor : 'var(--color-surface)',color: novo.tipo===t.id ? '#fff' : 'var(--color-text-secondary)'}}>{t.label}</button>
            ))}
          </div>
          <input className="input" placeholder="Descricao opcional" value={novo.descricao} onChange={e=>setNovo({...novo,descricao:e.target.value})} style={{marginBottom:14}} />
          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setMostrarForm(false)}>Cancelar</button>
            <button className="btn btn-primary" style={{flex:1}} onClick={salvarNovoEvento}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  )
}

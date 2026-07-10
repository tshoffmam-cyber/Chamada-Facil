import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const TIPOS = [
  { id: 'compromisso', label: 'Compromisso', cor: 'var(--color-primary)' },
  { id: 'reuniao', label: 'Reunião', cor: 'var(--color-ia)' },
  { id: 'lembrete', label: 'Lembrete', cor: 'var(--color-warning)' },
]

function toISO(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') }

function tipoInfo(tipoId) {
  return TIPOS.find(t => t.id === tipoId) || TIPOS[0]
}

function gerarGradeMes(mes) {
  const primeiro = new Date(mes.getFullYear(), mes.getMonth(), 1)
  const inicio = new Date(primeiro)
  inicio.setDate(primeiro.getDate() - primeiro.getDay())
  const dias = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(inicio)
    d.setDate(inicio.getDate() + i)
    dias.push(d)
  }
  return dias
}

export default function AgendaScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { eventos, adicionarEvento, removerEvento, turmas } = useData()
  const hoje = new Date()
  hoje.setHours(0,0,0,0)
  const [mesAtual, setMesAtual] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1))
  const [selecionado, setSelecionado] = useState(toISO(hoje))
  const [mostrarForm, setMostrarForm] = useState(false)
  const [novo, setNovo] = useState({ titulo: '', inicio: '08:00', fim: '09:00', tipo: 'compromisso', descricao: '' })
  const [feriados, setFeriados] = useState({})
  const minhasTurmas = turmas.filter(t => t.professorId === user?.id)
  const diasGrade = useMemo(() => gerarGradeMes(mesAtual), [mesAtual])

  useEffect(() => {
    const anos = [...new Set(diasGrade.map(d => d.getFullYear()))]
    Promise.all(anos.map(ano => fetch('https://brasilapi.com.br/api/feriados/v1/' + ano).then(r => r.ok ? r.json() : []).catch(() => [])))
      .then(listas => {
        const mapa = {}
        listas.flat().forEach(f => { mapa[f.date] = f.name })
        setFeriados(prev => ({ ...prev, ...mapa }))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesAtual])

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

  function temItens(dataISO) {
    return aulasDoDia(dataISO).length > 0 || eventos.some(e => e.data === dataISO)
  }

  const eventosDoDia = eventos.filter(e => e.data === selecionado)
  const itensDoDia = [...aulasDoDia(selecionado), ...eventosDoDia].sort((a,b) => a.inicio.localeCompare(b.inicio))
  const feriadoSelecionado = feriados[selecionado]

  function salvarNovoEvento() {
    if (!novo.titulo.trim()) return
    adicionarEvento({ ...novo, data: selecionado })
    setNovo({ titulo: '', inicio: '08:00', fim: '09:00', tipo: 'compromisso', descricao: '' })
    setMostrarForm(false)
  }

  function mudarMes(delta) {
    setMesAtual(m => new Date(m.getFullYear(), m.getMonth() + delta, 1))
  }

  function irParaHoje() {
    setMesAtual(new Date(hoje.getFullYear(), hoje.getMonth(), 1))
    setSelecionado(toISO(hoje))
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

      <div style={{padding:'0 20px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <button onClick={()=>mudarMes(-1)} style={{background:'var(--color-surface)',border:'1px solid var(--color-border)',borderRadius:12,width:36,height:36,fontSize:18,fontWeight:700,cursor:'pointer',color:'var(--color-text-primary)'}}>‹</button>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:16,fontWeight:800}}>{MESES[mesAtual.getMonth()]} {mesAtual.getFullYear()}</div>
            <div onClick={irParaHoje} style={{fontSize:12,fontWeight:700,color:'var(--color-primary)',cursor:'pointer',marginTop:2}}>Hoje</div>
          </div>
          <button onClick={()=>mudarMes(1)} style={{background:'var(--color-surface)',border:'1px solid var(--color-border)',borderRadius:12,width:36,height:36,fontSize:18,fontWeight:700,cursor:'pointer',color:'var(--color-text-primary)'}}>›</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:6}}>
          {DIAS_SEMANA.map(d => (
            <div key={d} style={{textAlign:'center',fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',padding:'4px 0'}}>{d}</div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:16}}>
          {diasGrade.map(d => {
            const iso = toISO(d)
            const noMes = d.getMonth() === mesAtual.getMonth()
            const ativo = iso === selecionado
            const ehHoje = iso === toISO(hoje)
            const ehFeriado = !!feriados[iso]
            const temEvento = noMes && temItens(iso)
            return (
              <button
                key={iso}
                onClick={()=> noMes && setSelecionado(iso)}
                disabled={!noMes}
                style={{
                  aspectRatio:'1',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:12,
                  border: ativo ? 'none' : (ehHoje ? '1.5px solid var(--color-primary)' : '1px solid transparent'),
                  background: ativo ? 'var(--color-primary)' : 'transparent',
                  color: !noMes ? 'var(--color-text-secondary)' : (ativo ? '#fff' : 'var(--color-text-primary)'),
                  opacity: noMes ? 1 : 0.3,
                  cursor: noMes ? 'pointer' : 'default',
                  fontSize:13,
                  fontWeight: ehHoje ? 800 : 600,
                  gap:2,
                  padding:0,
                }}>
                <span>{d.getDate()}</span>
                <div style={{display:'flex',gap:2,height:5}}>
                  {ehFeriado && <div style={{width:4,height:4,borderRadius:'50%',background: ativo ? '#fff' : 'var(--color-warning)'}}/>}
                  {temEvento && <div style={{width:4,height:4,borderRadius:'50%',background: ativo ? '#fff' : 'var(--color-primary)'}}/>}
                </div>
              </button>
            )
          })}
        </div>

        {feriadoSelecionado && (
          <div style={{background:'var(--color-warning-light)',border:'1px solid #FDE68A',borderRadius:14,padding:'12px 14px',marginBottom:12,display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:18}}>🎉</span>
            <div style={{fontSize:13,color:'#B45309',fontWeight:700}}>Feriado: {feriadoSelecionado}</div>
          </div>
        )}

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

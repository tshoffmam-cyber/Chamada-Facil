import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'

export default function NovaEscolaScreen() {
const navigate = useNavigate()
const { criarOrganizacao } = useData()
const [nome, setNome] = useState('')
const [endereco, setEndereco] = useState('')
const estiloInput = {width:'100%',padding:'10px 12px',borderRadius:10,border:'1.5px solid var(--color-border)',fontSize:14,fontFamily:'var(--font-family)'}

function salvar(){
if(!nome.trim()) return
criarOrganizacao({ nome: nome.trim(), endereco: endereco.trim() })
navigate('/organizacoes')
}

return (
<div style={{padding:'20px 20px 24px'}}>
<div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
<button onClick={()=>navigate('/organizacoes')} style={{width:36,height:36,background:'var(--color-bg)',border:'1px solid var(--color-border)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
</button>
<h1 style={{fontSize:20,fontWeight:800,margin:0}}>Nova Escola</h1>
</div>
<div style={{display:'flex',flexDirection:'column',gap:12}}>
<div>
<label style={{fontSize:13,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,display:'block'}}>Nome da escola</label>
<input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Ex: Escola Estadual Esperança" style={estiloInput} />
</div>
<div>
<label style={{fontSize:13,fontWeight:600,color:'var(--color-text-secondary)',marginBottom:6,display:'block'}}>Endereço (opcional)</label>
<input value={endereco} onChange={e=>setEndereco(e.target.value)} placeholder="Ex: Rua das Flores, 123" style={estiloInput} />
</div>
<button onClick={salvar} className="btn btn-primary" style={{width:'100%',marginTop:8}}>Salvar escola</button>
</div>
</div>
)
}

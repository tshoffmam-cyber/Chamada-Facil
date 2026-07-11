import { useState } from 'react'
import { useData } from '../../context/DataContext'

// ---------------------------------------------------------------------------
// pages/adm/AdmConfigAvancadaScreen.jsx
//
// "Configuracoes avancadas" — a forma responsavel de entregar a ideia de
// 'mexer em funcionalidades pelo painel, sem precisar chamar um
// programador para cada ajuste pequeno'.
//
// DECISAO DE ARQUITETURA (importante): isto NAO e um editor de codigo-
// fonte real rodando no navegador. E um editor de configuracao (JSON de
// feature flags) que e validado e salvo no DataContext. Um app de
// verdade, com milhoes de usuarios, nunca deve permitir que codigo
// arbitrario enviado por um cliente seja executado em producao — isso
// abriria brechas graves de seguranca e poderia derrubar o app para todo
// mundo com um unico erro de digitacao. Mudancas de codigo de verdade
// sempre devem passar por: repositorio -> revisao -> testes -> pipeline
// de deploy (CI/CD). O que este painel resolve e o ajuste de parametros
// (feature flags), que e exatamente o tipo de 'mudanca rapida sem
// deploy' que ferramentas reais de mercado (ex: LaunchDarkly, Firebase
// Remote Config) tambem oferecem, com o mesmo principio de seguranca.
// ---------------------------------------------------------------------------
export default function AdmConfigAvancadaScreen() {
const { featureFlags, atualizarFeatureFlags } = useData()
const [texto, setTexto] = useState(() => JSON.stringify(featureFlags, null, 2))
const [erro, setErro] = useState('')
const [salvo, setSalvo] = useState(false)

function salvar() {
try {
const parsed = JSON.parse(texto)
atualizarFeatureFlags(parsed)
setErro('')
setSalvo(true)
setTimeout(() => setSalvo(false), 2000)
} catch {
setErro('JSON inválido. Confira vírgulas e aspas antes de salvar.')
}
}

return (
<div style={{paddingBottom:24}}>
<div style={{padding:'20px 20px 0'}}>
<h1 style={{fontSize:20,fontWeight:800}}>Configurações avançadas</h1>
<p style={{fontSize:13,color:'var(--color-text-secondary)',marginTop:2}}>Feature flags do app, sem precisar de um novo deploy</p>
</div>

<div style={{padding:'16px 20px 0'}}>
<div className="card card-padding" style={{background:'var(--color-ia-light)',border:'1px solid #DDD6FE'}}>
<div style={{fontSize:13,fontWeight:700,color:'var(--color-ia)',marginBottom:4}}>Por que não é um editor de código?</div>
<div style={{fontSize:12,color:'var(--color-text-secondary)',lineHeight:1.5}}>
Por segurança e estabilidade, mudanças de código real sempre passam por repositório, revisão e deploy.
Este painel edita apenas parâmetros do app (feature flags), que já resolvem a maioria dos ajustes do dia a dia.
</div>
</div>
</div>

<div style={{padding:'16px 20px 0'}}>
<p className="section-label">FEATURE FLAGS (JSON)</p>
<div className="card card-padding">
<textarea
value={texto}
onChange={e=>setTexto(e.target.value)}
spellCheck={false}
style={{width:'100%',minHeight:220,fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace',fontSize:13,border:'1px solid var(--color-border)',borderRadius:12,padding:12,resize:'vertical',color:'var(--color-text-primary)',background:'var(--color-bg)'}}
/>
{erro && <div style={{color:'var(--color-danger)',fontSize:13,marginTop:10,fontWeight:600}}>{erro}</div>}
{salvo && <div style={{color:'var(--color-success)',fontSize:13,marginTop:10,fontWeight:600}}>Configurações salvas com sucesso.</div>}
<button className="btn btn-primary w-full" style={{marginTop:14}} onClick={salvar}>Salvar configurações</button>
</div>
</div>
</div>
)
}

import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
export default function AlunoPerfilScreen() {
const {alunoId}=useParams(); const navigate=useNavigate()
const {user}=useAuth()
const {vidaEscolar, alunos: todosAlunos, turmas, atividades, notasAtividades}=useData()
const aluno=todosAlunos.find(a=>a.id===alunoId)
const turma=aluno?turmas.find(t=>t.id===aluno.turmaId):null
const registros=(vidaEscolar[alunoId]||[]).sort((a,b)=>new Date(b.data)-new Date(a.data))
// Guarda de posse: o aluno so pode ser aberto se pertencer a uma turma
// do professor logado (ver ModoAula.jsx para detalhes do motivo/handoff de backend).
if(!aluno || !turma || turma.professorId !== user?.id) return <div style={{padding:24,textAlign:'center'}}><p>Aluno não encontrado</p><button onClick={()=>navigate(-1)} className="btn btn-primary" style={{marginTop:16}}>Voltar</button></div>
// ✅ Corrigido: campo correto é presencas, com proteção contra divisão por zero
const total=aluno.presencas+aluno.faltas
const presencaPct=total>0?Math.round((aluno.presencas/total)*100):0
const limiteFaltas = turma?.limiteFaltas || 15
const emAlerta = aluno.faltas >= limiteFaltas
const atividadesTurma = turma ? atividades.filter(at => at.turmaId === turma.id) : []
const notasDoAluno = atividadesTurma.map(at => ({ atividade: at, nota: notasAtividades?.[at.id]?.[aluno.id] }))
const notasValidas = notasDoAluno.filter(n => n.nota !== undefined && n.nota !== null && n.nota !== '')
const mediaNotas = notasValidas.length ? (notasValidas.reduce((s,n)=>s+parseFloat(n.nota),0) / notasValidas.length) : null
function exportarRelatorioPDF(){
const win = window.open('', '_blank')
if(!win) return
const dataHoje = new Date().toLocaleDateString('pt-BR')
let notasHTML = ''
if(atividadesTurma.length){
notasHTML = '<h3 style="margin:20px 0 8px;font-size:14px;color:#334155">Atividades e Notas</h3><table style="width:100%;border-collapse:collapse;font-size:13px"><tr style="background:#F1F5F9"><th style="padding:8px;text-align:left;border-bottom:1px solid #E2E8F0">Atividade</th><th style="padding:8px;text-align:center;border-bottom:1px solid #E2E8F0">Nota</th></tr>' +
notasDoAluno.map(function(n){
const v = (n.nota !== undefined && n.nota !== null && n.nota !== '') ? n.nota : '—'
return '<tr><td style="padding:7px 8px;border-bottom:1px solid #F1F5F9">' + n.atividade.titulo + '</td><td style="padding:7px 8px;text-align:center;border-bottom:1px solid #F1F5F9;font-weight:700">' + v + '</td></tr>'
}).join('') + '</table>' +
(mediaNotas !== null ? '<div style="margin-top:10px;font-size:13px;color:#334155"><strong>Média geral:</strong> ' + mediaNotas.toFixed(1) + '</div>' : '')
}
let vidaHTML = ''
if(registros.length){
vidaHTML = '<h3 style="margin:20px 0 8px;font-size:14px;color:#334155">Vida Escolar</h3>' + registros.slice(0,15).map(function(r){
return '<div style="padding:8px 0;border-bottom:1px solid #F1F5F9;font-size:12px"><strong>' + r.titulo + '</strong> — ' + new Date(r.data).toLocaleDateString('pt-BR') + '<br><span style="color:#64748B">' + (r.descricao||'') + '</span></div>'
}).join('')
}
win.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Relatorio - ' + aluno.nome + '</title><style>body{font-family:Inter,Arial,sans-serif;padding:28px;max-width:640px;margin:0 auto;color:#0F172A}@media print{button{display:none}}</style></head><body>' +
'<div style="border-bottom:3px solid #2563EB;padding-bottom:14px;margin-bottom:18px"><div style="font-size:11px;color:#94A3B8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">EduFam — Relatorio do Aluno</div>' +
'<h1 style="font-size:21px;font-weight:800;margin:0">' + aluno.nome + '</h1>' +
'<p style="font-size:12px;color:#64748B;margin-top:4px">' + (turma ? (turma.nome + (turma.disciplina ? ' · ' + turma.disciplina : '')) : '') + ' · Mat. ' + (aluno.matricula||'-') + '</p>' +
'<div style="display:flex;gap:8px;margin-top:10px">' +
'<span style="background:#DCFCE7;color:#16A34A;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700">' + presencaPct + '% freq.</span>' +
'<span style="background:#FEE2E2;color:#DC2626;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700">' + aluno.faltas + ' falta(s)</span>' +
(mediaNotas !== null ? '<span style="background:#DBEAFE;color:#2563EB;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700">média ' + mediaNotas.toFixed(1) + '</span>' : '') +
'</div></div>' +
(aluno.perfilPedagogico ? '<div style="background:#EDE9FE;border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px"><strong>Perfil Pedagógico:</strong> ' + aluno.perfilPedagogico.tipo + '<br>' + (aluno.perfilPedagogico.descricao||'') + '</div>' : '') +
notasHTML + vidaHTML +
'<div style="margin-top:28px;font-size:10px;color:#94A3B8;padding-top:8px;border-top:1px solid #E2E8F0">Gerado em ' + dataHoje + ' · EduFam</div>' +
'<button onclick="window.print()" style="margin-top:18px;padding:10px 22px;background:#2563EB;color:#fff;border:none;border-radius:10px;cursor:pointer;font-weight:700">Imprimir / Salvar PDF</button>' +
'</body></html>')
win.document.close()
}
return (
<div style={{paddingBottom:32}}>
<div style={{background:aluno.perfilPedagogico?'linear-gradient(135deg,#7C3AED,#9333EA)':'linear-gradient(135deg,#1D4ED8,#2563EB)',padding:'20px 20px 28px'}}>
<button onClick={()=>navigate(-1)} style={{background:'rgba(255,255,255,.15)',border:'none',borderRadius:10,width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',marginBottom:16}}>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
</button>
<div style={{display:'flex',alignItems:'center',gap:14}}>
<div style={{width:60,height:60,background:'rgba(255,255,255,.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:'white'}}>{aluno.avatar}</div>
<div>
<h1 style={{color:'white',fontSize:20,fontWeight:800,margin:0}}>{aluno.nome}</h1>
<p style={{color:'rgba(255,255,255,.75)',fontSize:13,margin:'4px 0 0'}}>{turma?.nome} · Mat. {aluno.matricula}</p>
{aluno.perfilPedagogico&&<div style={{marginTop:8,background:'rgba(255,255,255,.2)',borderRadius:8,padding:'4px 10px',display:'inline-block',fontSize:12,fontWeight:700,color:'white'}}>Perfil: {aluno.perfilPedagogico.tipo}</div>}
</div>
</div>
</div>
{emAlerta && (
<div style={{margin:'16px 20px 0',background:'var(--color-danger-light)',border:'1px solid #FCA5A5',borderRadius:14,padding:'12px 14px',display:'flex',alignItems:'center',gap:10}}>
<span style={{fontSize:18}}>⚠️</span>
<div style={{fontSize:13,color:'var(--color-danger)',fontWeight:600}}>Atingiu o limite de {limiteFaltas} faltas desta turma</div>
</div>
)}
<div style={{padding:'16px 20px 0',display:'grid',gridTemplateColumns:mediaNotas!==null?'1fr 1fr 1fr 1fr':'1fr 1fr 1fr',gap:10}}>
{[{label:'Presenças',valor:aluno.presencas,cor:'var(--color-success)'},{label:'Faltas',valor:aluno.faltas,cor:'var(--color-danger)'},{label:'Freq.',valor:presencaPct+'%',cor:presencaPct>=75?'var(--color-success)':'var(--color-danger)'}, ...(mediaNotas!==null?[{label:'Média',valor:mediaNotas.toFixed(1),cor:'var(--color-primary)'}]:[])].map(s=>(
<div key={s.label} className="card card-padding" style={{textAlign:'center'}}>
<div style={{fontSize:22,fontWeight:800,color:s.cor}}>{s.valor}</div>
<div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:2}}>{s.label}</div>
</div>
))}
</div>
<div style={{padding:'16px 20px 0'}}>
<button onClick={exportarRelatorioPDF} className="btn btn-ghost w-full" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>📄 Exportar relatório (PDF)</button>
</div>
{aluno.perfilPedagogico&&(
<div style={{padding:'16px 20px 0'}}>
<p className="section-label">Perfil Pedagógico</p>
<div style={{background:'var(--color-ia-light)',border:'1px solid #DDD6FE',borderRadius:16,padding:16}}>
<div style={{fontWeight:700,fontSize:16,color:'var(--color-ia)',marginBottom:8}}>{aluno.perfilPedagogico.tipo}</div>
<p style={{fontSize:14,color:'var(--color-text-secondary)',lineHeight:1.55,marginBottom:12}}>{aluno.perfilPedagogico.descricao}</p>
<p style={{fontSize:12,fontWeight:700,color:'var(--color-ia)',marginBottom:8}}>Adaptações:</p>
{aluno.perfilPedagogico.adaptacoes.map((a,i)=>(
<div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
<div style={{width:6,height:6,borderRadius:'50%',background:'var(--color-ia)',flexShrink:0}}/>
<span style={{fontSize:13,color:'var(--color-text-secondary)'}}>{a}</span>
</div>
))}
</div>
</div>
)}
{notasDoAluno.length>0&&(
<div style={{padding:'16px 20px 0'}}>
<p className="section-label">Desempenho em Atividades</p>
<div className="card">
{notasDoAluno.map((n,i)=>(
<div key={n.atividade.id} style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:i<notasDoAluno.length-1?'1px solid var(--color-border)':'none'}}>
<span style={{fontSize:13,color:'var(--color-text-primary)',fontWeight:600}}>{n.atividade.titulo}</span>
<span style={{fontSize:14,fontWeight:800,color:(n.nota!==undefined&&n.nota!==null&&n.nota!=='')?'var(--color-primary)':'var(--color-text-muted)'}}>{(n.nota!==undefined&&n.nota!==null&&n.nota!=='')?n.nota:'—'}</span>
</div>
))}
</div>
</div>
)}
<div style={{padding:'16px 20px 0'}}>
<p className="section-label">Responsável</p>
<div className="card card-padding">
<div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{aluno.responsavel.nome}</div>
<div style={{fontSize:13,color:'var(--color-text-secondary)'}}>{aluno.responsavel.parentesco} · {aluno.responsavel.telefone}</div>
<a href={"tel:"+aluno.responsavel.telefone} style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:12,background:'var(--color-primary)',color:'white',textDecoration:'none',borderRadius:10,padding:'8px 14px',fontSize:13,fontWeight:700}}>📞 Ligar para o responsável</a>
</div>
</div>
{registros.length>0&&(
<div style={{padding:'16px 20px 0'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
<p className="section-label" style={{marginBottom:0}}>Vida Escolar Recente</p>
</div>
<div style={{display:'flex',flexDirection:'column',gap:8}}>
{registros.slice(0,3).map(r=>(
<div key={r.id} className="card card-padding" style={{display:'flex',gap:12,alignItems:'flex-start'}}>
<div style={{fontSize:20}}>{r.tipo==='registro_positivo'?'⭐':r.tipo==='ocorrencia'?'⚠️':'📝'}</div>
<div>
<div style={{fontWeight:700,fontSize:14}}>{r.titulo}</div>
<div style={{fontSize:13,color:'var(--color-text-secondary)'}}>{r.descricao}</div>
<div style={{fontSize:11,color:'var(--color-text-muted)',marginTop:4}}>{new Date(r.data).toLocaleDateString('pt-BR')}</div>
</div>
</div>
))}
</div>
</div>
)}
</div>
)
}

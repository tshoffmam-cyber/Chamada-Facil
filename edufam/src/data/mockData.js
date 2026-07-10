// EduFam mockData.js - Fonte unica de verdade
const _creds = [
  {id:'u1',email:'professor@escola.com',password:'demo123'},
  {id:'u2',email:'diretor@escola.com',password:'demo123'},
  {id:'u3',email:'adm@edufam.com',password:'admin123'},
  ]
export function autenticar(email,password){
  const c=_creds.find(x=>x.email===email&&x.password===password)
  if(!c)return null
  const u=mockUsers.find(x=>x.id===c.id)
  if(!u)return null
  const {password:_p,...safe}=u
  return safe
}
export const mockUsers=[
  {id:'u1',name:'Prof. Carlos Silva',email:'professor@escola.com',password:'demo123',role:'professor',avatar:'CS',escola:'Escola Estadual Esperança',disciplina:'Matemática',turmas:['t1','t2']},
  {id:'u2',name:'Ana Diretora',email:'diretor@escola.com',password:'demo123',role:'diretor',avatar:'AD',escola:'Escola Estadual Esperança'},
  {id:'u3',name:'ADM Sistema',email:'adm@edufam.com',password:'admin123',role:'adm',avatar:'AS'},
  ]
export const mockOrganizacoes=[
  {id:'org1',nome:'Escola Estadual Esperança'},
  ]
export const mockTurmas=[
  {id:'t1',nome:'9º Ano A',disciplina:'Matemática',organizacaoId:'org1',turno:'Manhã',sala:'12',horarios:[{dia:1,inicio:'07:30',fim:'08:20'},{dia:3,inicio:'07:30',fim:'08:20'},{dia:5,inicio:'09:30',fim:'10:20'}],professorId:'u1'},
  {id:'t2',nome:'8º Ano B',disciplina:'Matemática',organizacaoId:'org1',turno:'Manhã',sala:'08',horarios:[{dia:2,inicio:'08:20',fim:'09:10'},{dia:4,inicio:'08:20',fim:'09:10'}],professorId:'u1'},
  ]
export const mockAlunos=[
  {id:'a1',nome:'Lucas Oliveira',turmaId:'t1',avatar:'LO',matricula:'2024001',dataNascimento:'2010-03-15',responsavel:{nome:'Maria Oliveira',telefone:'(11) 98765-4321',parentesco:'Mãe'},perfilPedagogico:null,presencas:85,faltas:3,situacao:'regular'},
  {id:'a2',nome:'Sofia Mendes',turmaId:'t1',avatar:'SM',matricula:'2024002',dataNascimento:'2010-07-22',responsavel:{nome:'Paulo Mendes',telefone:'(11) 97654-3210',parentesco:'Pai'},perfilPedagogico:{tipo:'TDAH',descricao:'Necessita de atividades curtas e dinâmicas. Prefere instruções visuais.',adaptacoes:['Tempo extra nas provas','Sentar próxima ao professor','Atividades fragmentadas']},presencas:78,faltas:6,situacao:'atencao'},
  {id:'a3',nome:'Gabriel Santos',turmaId:'t1',avatar:'GS',matricula:'2024003',dataNascimento:'2010-01-08',responsavel:{nome:'Claudia Santos',telefone:'(11) 96543-2109',parentesco:'Mãe'},perfilPedagogico:null,presencas:92,faltas:1,situacao:'regular'},
  {id:'a4',nome:'Isabella Costa',turmaId:'t1',avatar:'IC',matricula:'2024004',dataNascimento:'2010-11-30',responsavel:{nome:'Roberto Costa',telefone:'(11) 95432-1098',parentesco:'Pai'},perfilPedagogico:null,presencas:88,faltas:2,situacao:'regular'},
  {id:'a5',nome:'Pedro Alves',turmaId:'t1',avatar:'PA',matricula:'2024005',dataNascimento:'2010-05-14',responsavel:{nome:'Ana Alves',telefone:'(11) 94321-0987',parentesco:'Mãe'},perfilPedagogico:{tipo:'Altas Habilidades',descricao:'Demonstra capacidade acima da média.',adaptacoes:['Atividades complementares','Projetos de extensão']},presencas:95,faltas:0,situacao:'regular'},
  {id:'a6',nome:'Beatriz Lima',turmaId:'t2',avatar:'BL',matricula:'2024006',dataNascimento:'2011-02-20',responsavel:{nome:'Carlos Lima',telefone:'(11) 93210-9876',parentesco:'Pai'},perfilPedagogico:null,presencas:70,faltas:8,situacao:'atencao'},
  {id:'a7',nome:'Rafael Souza',turmaId:'t2',avatar:'RS',matricula:'2024007',dataNascimento:'2011-08-11',responsavel:{nome:'Fernanda Souza',telefone:'(11) 92109-8765',parentesco:'Mãe'},perfilPedagogico:null,presencas:80,faltas:4,situacao:'regular'},
  ]
export const mockAtividades=[
  {id:'av1',turmaId:'t1',titulo:'Lista de Equações do 1º Grau',descricao:'Resolver exercícios 1 ao 15, capítulo 4.',dataEntrega:'2025-05-10',status:'aberta',criadaEm:'2025-05-02T08:00:00'},
  {id:'av2',turmaId:'t1',titulo:'Trabalho sobre Frações',descricao:'Pesquisa em duplas sobre frações equivalentes.',dataEntrega:'2025-04-28',status:'encerrada',criadaEm:'2025-04-15T09:30:00'},
  {id:'av3',turmaId:'t2',titulo:'Exercícios de Geometria',descricao:'Calcular área e perímetro das figuras da apostila.',dataEntrega:'2025-05-12',status:'aberta',criadaEm:'2025-05-03T07:45:00'},
  ]
export const mockMensagens=[
  {id:'m1',de:'Responsável — Maria Oliveira',para:'u1',assunto:'Falta por motivo de saúde',texto:'Lucas ficou doente com febre. Segue atestado.',data:'2025-05-04T10:00:00',tipo:'responsavel',lida:false},
  {id:'m2',de:'Responsável — Paulo Mendes',para:'u1',assunto:'Solicitação de reunião',texto:'Gostaria de marcar reunião sobre o desempenho da Sofia.',data:'2025-05-04T09:00:00',tipo:'responsavel',lida:false},
  {id:'m3',de:'Direção — EE Esperança',para:'u1',assunto:'Reunião Pedagógica',texto:'Reunião pedagógica na sexta-feira às 18h no auditório.',data:'2025-05-03T08:00:00',tipo:'direcao',lida:true},
  ]
export const mockVidaEscolar={
  'a1':[
    {id:'ve1',alunoId:'a1',tipo:'atividade',titulo:'Nota lançada — Lista de Equações',descricao:'Nota: 8,5 / 10,0',data:'2025-05-04T09:15:00'},
    {id:'ve2',alunoId:'a1',tipo:'registro_positivo',titulo:'Elogio registrado',descricao:'Excelente participação na geometria',data:'2025-05-03T10:30:00'},
    {id:'ve3',alunoId:'a1',tipo:'ocorrencia',titulo:'Falta registrada',descricao:'Matemática — 9º Ano A',data:'2025-04-20T07:30:00'},
    ],
  'a2':[
    {id:'ve4',alunoId:'a2',tipo:'ocorrencia',titulo:'Falta registrada',descricao:'Matemática — 9º Ano A',data:'2025-05-04T07:30:00'},
    {id:'ve5',alunoId:'a2',tipo:'registro_positivo',titulo:'Registro positivo',descricao:'Ótima entrega da atividade',data:'2025-04-28T09:00:00'},
    ],
}
export function horaParaMin(hhmm){if(!hhmm)return 0;const[h,m]=hhmm.split(':').map(Number);return h*60+m}
export function fmtSeg(seg){const m=Math.floor(Math.abs(seg)/60);const s=Math.abs(seg)%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
export function proximaAulaHoje(professorId,turmasList){
  const lista=turmasList||mockTurmas
  const agora=new Date();const dia=agora.getDay();const min=agora.getHours()*60+agora.getMinutes();
  const turmas=lista.filter(t=>t.professorId===professorId);
  const cands=[];
  for(const t of turmas){for(const h of t.horarios){if(h.dia===dia){cands.push({turma:t,horario:h,ini:horaParaMin(h.inicio),fim:horaParaMin(h.fim)})}}}
  return cands.filter(c=>c.fim>min).sort((a,b)=>a.ini-b.ini)[0]||null;
}

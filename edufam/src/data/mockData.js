// EduFam mockData.js - Fonte unica de verdade
const _creds = [
  {id:'u1',email:'professor@escola.com',password:'demo123'},
  {id:'u2',email:'diretor@escola.com',password:'demo123'},
  {id:'u3',email:'adm@edufam.com',password:'admin123'},
  {id:'u6',email:'responsavel@escola.com',password:'demo123'},
  {id:'u7',email:'aluno@escola.com',password:'demo123'},
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
  // u4 e u5 nao tem senha em _creds de proposito: neste prototipo eles so
  // existem para popular as telas de acompanhamento do Diretor (nao logam
  // no sistema). Em producao, todo professor teria login real tambem.
  {id:'u4',name:'Profa. Juliana Alves',email:'juliana.alves@escola.com',role:'professor',avatar:'JA',escola:'Escola Estadual Esperança',disciplina:'Português',turmas:['t3']},
  {id:'u5',name:'Prof. Marcos Pereira',email:'marcos.pereira@escola.com',role:'professor',avatar:'MP',escola:'Escola Estadual Esperança',disciplina:'História',turmas:['t4']},
  // u6: primeiro papel 'responsavel' (pai/mae/responsavel legal). Vinculado
  // por 'alunosIds' aos filhos matriculados na escola — hoje so suporta
  // 1 escola por responsavel, o que cobre o caso comum. Reaproveita o
  // responsavel ja existente no mock do aluno a2 (Sofia Mendes) para os
  // dados baterem entre as telas do professor/diretor e o novo portal.
  {id:'u6',name:'Paulo Mendes',email:'responsavel@escola.com',password:'demo123',role:'responsavel',avatar:'PM',escola:'Escola Estadual Esperança',alunosIds:['a2']},
  // u7: primeiro papel 'aluno'. Vinculado por 'alunoId' ao proprio
  // registro em mockAlunos (reaproveita a2/Sofia Mendes, mesmo aluno ja
  // usado pelo responsavel u6, para os dados baterem entre os portais).
  {id:'u7',name:'Sofia Mendes',email:'aluno@escola.com',password:'demo123',role:'aluno',avatar:'SM',escola:'Escola Estadual Esperança',alunoId:'a2'},
  ]
export const mockOrganizacoes=[
  {id:'org1',nome:'Escola Estadual Esperança'},
  ]
export const mockTurmas=[
  {id:'t1',nome:'9º Ano A',disciplina:'Matemática',organizacaoId:'org1',turno:'Manhã',sala:'12',horarios:[{dia:1,inicio:'07:30',fim:'08:20'},{dia:3,inicio:'07:30',fim:'08:20'},{dia:5,inicio:'09:30',fim:'10:20'}],professorId:'u1'},
  {id:'t2',nome:'8º Ano B',disciplina:'Matemática',organizacaoId:'org1',turno:'Manhã',sala:'08',horarios:[{dia:2,inicio:'08:20',fim:'09:10'},{dia:4,inicio:'08:20',fim:'09:10'}],professorId:'u1'},
  {id:'t3',nome:'7º Ano C',disciplina:'Português',organizacaoId:'org1',turno:'Tarde',sala:'05',horarios:[{dia:2,inicio:'13:30',fim:'14:20'},{dia:4,inicio:'13:30',fim:'14:20'}],professorId:'u4',limiteFaltas:15,mediaGeral:7.4},
  {id:'t4',nome:'6º Ano A',disciplina:'História',organizacaoId:'org1',turno:'Tarde',sala:'03',horarios:[{dia:1,inicio:'14:20',fim:'15:10'},{dia:3,inicio:'14:20',fim:'15:10'}],professorId:'u5',limiteFaltas:15,mediaGeral:6.8},
  ]
export const mockAlunos=[
  {id:'a1',nome:'Lucas Oliveira',turmaId:'t1',avatar:'LO',matricula:'2024001',dataNascimento:'2010-03-15',responsavel:{nome:'Maria Oliveira',telefone:'(11) 98765-4321',parentesco:'Mãe'},perfilPedagogico:null,presencas:85,faltas:3,situacao:'regular'},
  {id:'a2',nome:'Sofia Mendes',turmaId:'t1',avatar:'SM',matricula:'2024002',dataNascimento:'2010-07-22',responsavel:{nome:'Paulo Mendes',telefone:'(11) 97654-3210',parentesco:'Pai'},perfilPedagogico:{tipo:'TDAH',descricao:'Necessita de atividades curtas e dinâmicas. Prefere instruções visuais.',adaptacoes:['Tempo extra nas provas','Sentar próxima ao professor','Atividades fragmentadas']},presencas:78,faltas:6,situacao:'atencao'},
  {id:'a3',nome:'Gabriel Santos',turmaId:'t1',avatar:'GS',matricula:'2024003',dataNascimento:'2010-01-08',responsavel:{nome:'Claudia Santos',telefone:'(11) 96543-2109',parentesco:'Mãe'},perfilPedagogico:null,presencas:92,faltas:1,situacao:'regular'},
  {id:'a4',nome:'Isabella Costa',turmaId:'t1',avatar:'IC',matricula:'2024004',dataNascimento:'2010-11-30',responsavel:{nome:'Roberto Costa',telefone:'(11) 95432-1098',parentesco:'Pai'},perfilPedagogico:null,presencas:88,faltas:2,situacao:'regular'},
  {id:'a5',nome:'Pedro Alves',turmaId:'t1',avatar:'PA',matricula:'2024005',dataNascimento:'2010-05-14',responsavel:{nome:'Ana Alves',telefone:'(11) 94321-0987',parentesco:'Mãe'},perfilPedagogico:{tipo:'Altas Habilidades',descricao:'Demonstra capacidade acima da média.',adaptacoes:['Atividades complementares','Projetos de extensão']},presencas:95,faltas:0,situacao:'regular'},
  {id:'a6',nome:'Beatriz Lima',turmaId:'t2',avatar:'BL',matricula:'2024006',dataNascimento:'2011-02-20',responsavel:{nome:'Carlos Lima',telefone:'(11) 93210-9876',parentesco:'Pai'},perfilPedagogico:null,presencas:70,faltas:8,situacao:'atencao'},
  {id:'a7',nome:'Rafael Souza',turmaId:'t2',avatar:'RS',matricula:'2024007',dataNascimento:'2011-08-11',responsavel:{nome:'Fernanda Souza',telefone:'(11) 92109-8765',parentesco:'Mãe'},perfilPedagogico:null,presencas:80,faltas:4,situacao:'regular'},
  {id:'a8',nome:'Beatriz Rocha',turmaId:'t3',avatar:'BR',matricula:'2024008',dataNascimento:'2012-02-10',responsavel:{nome:'Camila Rocha',telefone:'(11) 91234-5678',parentesco:'Mãe'},perfilPedagogico:null,presencas:88,faltas:2,situacao:'regular'},
  {id:'a9',nome:'Thiago Almeida',turmaId:'t3',avatar:'TA',matricula:'2024009',dataNascimento:'2012-05-19',responsavel:{nome:'Eduardo Almeida',telefone:'(11) 90123-4567',parentesco:'Pai'},perfilPedagogico:null,presencas:50,faltas:16,situacao:'atencao'},
  {id:'a10',nome:'Larissa Fernandes',turmaId:'t4',avatar:'LF',matricula:'2024010',dataNascimento:'2013-09-25',responsavel:{nome:'Patricia Fernandes',telefone:'(11) 98888-7777',parentesco:'Mãe'},perfilPedagogico:null,presencas:95,faltas:1,situacao:'regular'},
  {id:'a11',nome:'Enzo Barbosa',turmaId:'t4',avatar:'EB',matricula:'2024011',dataNascimento:'2013-12-03',responsavel:{nome:'Renata Barbosa',telefone:'(11) 97777-6666',parentesco:'Mãe'},perfilPedagogico:null,presencas:55,faltas:17,situacao:'atencao'},
  ]
export const mockAtividades=[
  {id:'av1',turmaId:'t1',titulo:'Lista de Equações do 1º Grau',descricao:'Resolver exercícios 1 ao 15, capítulo 4.',dataEntrega:'2025-05-10',status:'aberta',criadaEm:'2025-05-02T08:00:00'},
  {id:'av2',turmaId:'t1',titulo:'Trabalho sobre Frações',descricao:'Pesquisa em duplas sobre frações equivalentes.',dataEntrega:'2025-04-28',status:'encerrada',criadaEm:'2025-04-15T09:30:00'},
  {id:'av3',turmaId:'t2',titulo:'Exercícios de Geometria',descricao:'Calcular área e perímetro das figuras da apostila.',dataEntrega:'2025-05-12',status:'aberta',criadaEm:'2025-05-03T07:45:00'},
  ]
// Notas lancadas por atividade, por aluno: { atividadeId: { alunoId: nota } }.
// Serve de seed inicial (antes o estado comecava vazio {}), para o Portal
// do Responsavel (e as demais telas que leem notasAtividades) ja terem
// conteudo de exemplo mesmo num navegador novo, sem precisar o professor
// lancar nota manualmente primeiro. Cobre as atividades av1/av2 (turma t1,
// que inclui a Sofia Mendes/a2) e av3 (turma t2).
export const mockNotasAtividades={
  av1:{a1:8.5,a2:7.0,a3:9.0,a4:6.5,a5:8.0},
  av2:{a1:7.0,a2:8.5,a3:8.0,a4:7.5,a5:6.0},
  av3:{a6:7.5,a7:8.0},
  }
// Eventos da agenda escolar (compromissos/eventos gerais da escola, nao
// amarrados a uma turma especifica hoje). Serve de seed inicial (antes o
// estado comecava vazio []), para a Agenda do professor e o Portal do
// Responsavel ja mostrarem algo real num navegador novo.
export const mockEventos=[
  {id:'ev1',titulo:'Reunião de Pais e Mestres',data:'2026-07-20',inicio:'19:00',fim:'20:30',tipo:'compromisso',descricao:'Pátio da escola'},
  {id:'ev2',titulo:'Feira de Ciências',data:'2026-07-25',inicio:'08:00',fim:'12:00',tipo:'evento',descricao:'Apresentação dos projetos dos alunos, ginásio'},
  ]
export const mockMensagens=[
  {id:'m1',de:'Responsável — Maria Oliveira',para:'u1',assunto:'Falta por motivo de saúde',texto:'Lucas ficou doente com febre. Segue atestado.',data:'2025-05-04T10:00:00',tipo:'responsavel',lida:false},
  {id:'m2',de:'Responsável — Paulo Mendes',para:'u1',assunto:'Solicitação de reunião',texto:'Gostaria de marcar reunião sobre o desempenho da Sofia.',data:'2025-05-04T09:00:00',tipo:'responsavel',lida:false},
  {id:'m3',de:'Direção — EE Esperança',para:'u1',assunto:'Reunião Pedagógica',texto:'Reunião pedagógica na sexta-feira às 18h no auditório.',data:'2025-05-03T08:00:00',tipo:'direcao',lida:true},
  {id:'m4',de:'Responsável — Camila Rocha',para:'u4',assunto:'Atraso na entrega de atividade',texto:'Beatriz estava doente e vai entregar a atividade amanhã.',data:'2025-05-05T08:30:00',tipo:'responsavel',lida:false},
  {id:'m5',de:'Responsável — Renata Barbosa',para:'u5',assunto:'Falta justificada',texto:'Enzo faltou por consulta médica, segue atestado em anexo.',data:'2025-05-05T09:10:00',tipo:'responsavel',lida:false},
  {id:'m6',de:'Direção — EE Esperança',para:'todos',assunto:'Reunião de pais',texto:'Reunião de pais e mestres marcada para o dia 20/05, às 19h no pátio.',data:'2025-05-02T10:00:00',tipo:'direcao',lida:true},
  // m7/m8: recados individuais recebidos por um responsavel (u6/Paulo
  // Mendes) — resposta do professor ao pedido de reuniao (m2) e um
  // recado individual da direcao. Mostram os dois canais que o Portal
  // do Responsavel precisa: professor->responsavel e direcao->responsavel.
  {id:'m7',de:'Prof. Carlos Silva',para:'u6',assunto:'Re: Solicitação de reunião',texto:'Claro, Sr. Paulo! Podemos conversar na sexta após as 17h na sala 12.',data:'2025-05-04T14:00:00',tipo:'professor',lida:false},
  {id:'m8',de:'Direção — EE Esperança',para:'u6',assunto:'Convocação individual',texto:'Gostaríamos de conversar sobre a frequência da Sofia. Pode passar na direção nesta semana?',data:'2025-05-06T09:00:00',tipo:'direcao',lida:false},
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


// ---------------------------------------------------------------------------
// Dados mockados do painel ADM (administrador global da plataforma EduFam)
//
// Tudo abaixo e fake, apenas para prototipagem visual e funcional da area
// de administracao. Em producao, cada bloco deve virar uma fonte de dados
// real — comentado individualmente abaixo o que cada um deveria ser.
// ---------------------------------------------------------------------------

// Parceiros exibidos no banner rotativo no rodape da Home do professor.
// PRODUCAO: CRUD real gerenciado pelo ADM (tela Configuracoes), com upload
// de imagem, link, periodo de veiculacao e aprovacao. Regra fixa do PRD:
// nunca pode anunciar apostas, jogos de azar ou conteudo invasivo.
export const mockParceiros = [
  { id: 'pc1', nome: 'Editora Aprender+', mensagem: 'Materiais didaticos com 20% de desconto para professores EduFam', link: 'https://example.com', cor: '#2563EB' },
  { id: 'pc2', nome: 'Univest Cursos', mensagem: 'Pos-graduacao em Educacao com bolsa parceira EduFam', link: 'https://example.com', cor: '#7C3AED' },
  { id: 'pc3', nome: 'Papelaria Escolar Kids', mensagem: 'Kit de material escolar com frete gratis para escolas parceiras', link: 'https://example.com', cor: '#16A34A' },
]

// Indicadores do dashboard ADM: assinantes por plano, MRR dos ultimos
// meses, churn e contagens gerais.
// PRODUCAO: viria de uma tabela de assinaturas/pagamentos, provavelmente
// integrada a um gateway de cobranca (ex: Stripe), com jobs agendados
// calculando MRR e churn a partir de eventos reais de cobranca.
export const mockAdmStats = {
  assinantesPorPlano: [
    { plano: 'Gratuito', quantidade: 812, cor: 'var(--color-text-muted)' },
    { plano: 'Pro', quantidade: 341, cor: 'var(--color-primary)' },
    { plano: 'Escola', quantidade: 58, cor: 'var(--color-ia)' },
  ],
  mrrUltimosMeses: [
    { mes: 'Fev', valor: 18400 },
    { mes: 'Mar', valor: 21200 },
    { mes: 'Abr', valor: 24100 },
    { mes: 'Mai', valor: 27600 },
    { mes: 'Jun', valor: 31900 },
    { mes: 'Jul', valor: 35200 },
  ],
  churnMensal: 2.4,
  escolasAtivas: 47,
  professoresAtivos: 1211,
  alunosAtivos: 28430,
}

// Tickets de suporte, incluindo casos em que a IA EduFam nao conseguiu
// ajudar e escalou para um humano do time.
// PRODUCAO: criados automaticamente pelo backend quando a IA falhar ou
// quando o usuario pedir ajuda humana explicitamente, alimentando uma
// fila real de atendimento (com SLA, notificacoes para o time, etc).
export const mockSuporteTickets = [
  { id: 'tk1', usuario: 'Prof. Carlos Silva', assunto: 'IA não gerou a atividade de geometria corretamente', status: 'aberto', prioridade: 'alta', criadoEm: '2026-07-09T14:20:00' },
  { id: 'tk2', usuario: 'Ana Diretora', assunto: 'Dúvida sobre exportar relatório da escola', status: 'aberto', prioridade: 'media', criadoEm: '2026-07-10T09:05:00' },
  { id: 'tk3', usuario: 'Prof. Carlos Silva', assunto: 'IA sugeriu comunicado com tom inadequado', status: 'resolvido', prioridade: 'alta', criadoEm: '2026-07-05T11:40:00' },
]

// "Feature flags" / configuracoes avancadas que o ADM pode ajustar sem
// precisar de um novo deploy do app.
//
// IMPORTANTE (decisao de arquitetura): isto e a forma responsavel de
// entregar "mexer em funcionalidades pelo painel" sem ser um editor de
// codigo-fonte real rodando no navegador. Alterar codigo de verdade deve
// sempre passar por repositorio, revisao e pipeline de deploy (CI/CD) —
// nunca por execucao direta de codigo enviado pelo cliente, por seguranca
// e estabilidade da plataforma. Ver painel ADM > Configuracoes Avancadas.
export const mockFeatureFlags = {
  limiteFaltasPadrao: 15,
  bannerParceirosAtivo: true,
  nomeApp: 'EduFam',
  textoBoasVindasLogin: 'A vida escolar na palma da mão.',
}

// Indicadores usados no Painel do Diretor para acompanhar cada professor
// da escola. MOCKADO: em producao esses numeros viriam de uma consulta
// real as tabelas de chamada/notas (aulas registradas no periodo,
// percentual de chamadas em dia, percentual de atividades com notas
// lancadas), agregada no backend — nao calculada no navegador.
export const mockIndicadoresProfessor = [
  { professorId: 'u1', aulasRegistradasMes: 18, chamadaEmDia: true, notasLancadasPercent: 90 },
  { professorId: 'u4', aulasRegistradasMes: 14, chamadaEmDia: true, notasLancadasPercent: 75 },
  { professorId: 'u5', aulasRegistradasMes: 9, chamadaEmDia: false, notasLancadasPercent: 40 },
]

// Lista mockada de escolas/professores com risco de cancelamento (churn),
// usada pela tela ADM > Usuarios em risco (ver AdmChurnScreen.jsx). MOCKADO:
// em producao isso viria de um calculo real no backend (ex: baixo uso nos
// ultimos 30 dias, fatura em atraso, queda de frequencia de acesso).
export const mockChurnRisco = [
  { id: 'cr1', nome: 'Escola Colibri', tipo: 'escola', risco: 'alto', motivo: 'Sem acesso ha 24 dias', ultimoAcesso: '2026-06-22', email: 'contato@colibri.com.br' },
  { id: 'cr2', nome: 'Prof. Marcos Pereira', tipo: 'professor', risco: 'alto', motivo: 'Uso baixo (2 acessos no mes) e pendencias de notas', ultimoAcesso: '2026-07-01', email: 'marcos.pereira@escola.com' },
  { id: 'cr3', nome: 'Escola Novo Saber', tipo: 'escola', risco: 'medio', motivo: 'Fatura em atraso ha 5 dias', ultimoAcesso: '2026-07-10', email: 'financeiro@novosaber.com.br' },
  { id: 'cr4', nome: 'Profa. Juliana Alves', tipo: 'professor', risco: 'baixo', motivo: 'Queda de 30% no uso comparado ao mes anterior', ultimoAcesso: '2026-07-14', email: 'juliana.alves@escola.com' },
]

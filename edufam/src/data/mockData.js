// EduFam Mock Data

export const mockUsers = [
  {
    id: 'u1',
    name: 'Prof. Carlos Silva',
    email: 'professor@escola.com',
    password: '123456',
    role: 'professor',
    avatar: 'CS',
    escola: 'Escola Estadual Esperanca',
    disciplina: 'Matematica',
    turmas: ['t1', 't2'],
  },
  {
    id: 'u2',
    name: 'Ana Diretora',
    email: 'diretor@escola.com',
    password: '123456',
    role: 'diretor',
    avatar: 'AD',
    escola: 'Escola Estadual Esperanca',
  },
  {
    id: 'u3',
    name: 'ADM Sistema',
    email: 'adm@edufam.com',
    password: 'admin123',
    role: 'adm',
    avatar: 'AS',
  },
]

export const mockTurmas = [
  {
    id: 't1',
    nome: '9 Ano A',
    disciplina: 'Matematica',
    escola: 'Escola Estadual Esperanca',
    turno: 'Manha',
    sala: '12',
    totalAlunos: 32,
    horarios: [
      { dia: 1, inicio: '07:30', fim: '08:20' },
      { dia: 3, inicio: '07:30', fim: '08:20' },
      { dia: 5, inicio: '09:30', fim: '10:20' },
    ],
    professorId: 'u1',
  },
  {
    id: 't2',
    nome: '8 Ano B',
    disciplina: 'Matematica',
    escola: 'Escola Estadual Esperanca',
    turno: 'Manha',
    sala: '08',
    totalAlunos: 28,
    horarios: [
      { dia: 2, inicio: '08:20', fim: '09:10' },
      { dia: 4, inicio: '08:20', fim: '09:10' },
    ],
    professorId: 'u1',
  },
]

export const mockAlunos = [
  {
    id: 'a1',
    nome: 'Lucas Oliveira',
    turmaId: 't1',
    avatar: 'LO',
    matricula: '2024001',
    dataNascimento: '2010-03-15',
    responsavel: { nome: 'Maria Oliveira', telefone: '(11) 98765-4321', parentesco: 'Mae' },
    perfilPedagogico: null,
    presencas: 85,
    faltas: 3,
    situacao: 'regular',
  },
  {
    id: 'a2',
    nome: 'Sofia Mendes',
    turmaId: 't1',
    avatar: 'SM',
    matricula: '2024002',
    dataNascimento: '2010-07-22',
    responsavel: { nome: 'Paulo Mendes', telefone: '(11) 97654-3210', parentesco: 'Pai' },
    perfilPedagogico: {
      tipo: 'TDAH',
      descricao: 'Necessita de atividades curtas e dinamicas. Prefere instrucoes visuais.',
      adaptacoes: ['Tempo extra nas provas', 'Sentar proxima ao professor', 'Atividades fragmentadas'],
    },
    presencas: 78,
    faltas: 6,
    situacao: 'atencao',
  },
  {
    id: 'a3',
    nome: 'Gabriel Santos',
    turmaId: 't1',
    avatar: 'GS',
    matricula: '2024003',
    dataNascimento: '2010-01-08',
    responsavel: { nome: 'Claudia Santos', telefone: '(11) 96543-2109', parentesco: 'Mae' },
    perfilPedagogico: null,
    presencas: 92,
    faltas: 1,
    situacao: 'regular',
  },
  {
    id: 'a4',
    nome: 'Isabella Costa',
    turmaId: 't1',
    avatar: 'IC',
    matricula: '2024004',
    dataNascimento: '2010-11-30',
    responsavel: { nome: 'Roberto Costa', telefone: '(11) 95432-1098', parentesco: 'Pai' },
    perfilPedagogico: null,
    presencas: 88,
    faltas: 2,
    situacao: 'regular',
  },
  {
    id: 'a5',
    nome: 'Miguel Ferreira',
    turmaId: 't1',
    avatar: 'MF',
    matricula: '2024005',
    dataNascimento: '2010-05-18',
    responsavel: { nome: 'Ana Ferreira', telefone: '(11) 94321-0987', parentesco: 'Mae' },
    perfilPedagogico: {
      tipo: 'Dislexia',
      descricao: 'Dificuldade de leitura e escrita. Excelente compreensao oral.',
      adaptacoes: ['Provas orais', 'Leitura em voz alta pelo professor', 'Mais tempo'],
    },
    presencas: 70,
    faltas: 9,
    situacao: 'alerta',
  },
  {
    id: 'a6',
    nome: 'Laura Rodrigues',
    turmaId: 't1',
    avatar: 'LR',
    matricula: '2024006',
    dataNascimento: '2010-09-12',
    responsavel: { nome: 'Fernanda Rodrigues', telefone: '(11) 93210-9876', parentesco: 'Mae' },
    perfilPedagogico: null,
    presencas: 95,
    faltas: 0,
    situacao: 'regular',
  },
]

export const mockChamadas = [
  {
    id: 'ch1',
    turmaId: 't1',
    data: '2026-07-01',
    finalizada: true,
    registros: [
      { alunoId: 'a1', status: 'presente' },
      { alunoId: 'a2', status: 'presente' },
      { alunoId: 'a3', status: 'falta' },
      { alunoId: 'a4', status: 'presente' },
      { alunoId: 'a5', status: 'justificado' },
      { alunoId: 'a6', status: 'presente' },
    ],
  },
]

export const mockMensagens = [
  {
    id: 'm1',
    de: 'Maria Oliveira',
    para: 'u1',
    assunto: 'Lucas nao vai poder ir amanha',
    texto: 'Boa tarde professor, o Lucas teve uma consulta medica marcada para amanha cedo. Ele nao podera comparecer as primeiras aulas.',
    data: '2026-07-02T08:30:00',
    lida: false,
    tipo: 'responsavel',
  },
  {
    id: 'm2',
    de: 'Ana Diretora',
    para: 'u1',
    assunto: 'Reuniao pedagogica sexta',
    texto: 'Prezado professor, lembramos que na sexta-feira as 12h teremos reuniao pedagogica na sala dos professores.',
    data: '2026-07-01T14:00:00',
    lida: true,
    tipo: 'direcao',
  },
]

export const mockVidaEscolar = [
  {
    id: 'v1',
    alunoId: 'a2',
    tipo: 'registro_positivo',
    titulo: 'Excelente participacao',
    descricao: 'Sofia participou ativamente da aula com perguntas excelentes.',
    data: '2026-07-01',
    professorId: 'u1',
  },
  {
    id: 'v2',
    alunoId: 'a5',
    tipo: 'ocorrencia',
    titulo: 'Comportamento inadequado',
    descricao: 'Miguel interrompeu a aula diversas vezes. Conversei com ele apos a aula.',
    data: '2026-06-28',
    professorId: 'u1',
  },
  {
    id: 'v3',
    alunoId: 'a1',
    tipo: 'atividade',
    titulo: 'Nota na prova de algebra',
    descricao: 'Lucas obteve 8.5 na prova bimestral de algebra.',
    data: '2026-06-25',
    professorId: 'u1',
    nota: 8.5,
  },
]

export const mockEventos = [
  {
    id: 'ev1',
    titulo: 'Prova Bimestral - 9A',
    descricao: 'Segunda prova bimestral de matematica',
    data: '2026-07-10',
    tipo: 'avaliacao',
    turmaId: 't1',
  },
  {
    id: 'ev2',
    titulo: 'Reuniao de Pais',
    descricao: 'Reuniao de pais e mestres do 2 bimestre',
    data: '2026-07-18',
    tipo: 'reuniao',
    turmaId: null,
  },
]

export const mockAtividades = [
  {
    id: 'at1',
    titulo: 'Lista de exercicios - Equacoes',
    turmaId: 't1',
    dataEntrega: '2026-07-08',
    status: 'aberta',
    descricao: 'Resolver os exercicios 1 a 20 do capitulo 5.',
  },
]

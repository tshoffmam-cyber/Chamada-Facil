// EduFam — src/data.js
// Dados mockados + helpers compartilhados

export const turmas = [
  { id:'t1', nome:'9º Ano A', disc:'Matemática', escolaId:'c1', profId:'u3', alunos:28, freq:87, pend:2, msgs:1, sala:'12', st:'gr' },
  { id:'t2', nome:'9º Ano B', disc:'Matemática', escolaId:'c1', profId:'u3', alunos:25, freq:92, pend:0, msgs:0, sala:'14', st:'gr' },
  { id:'t3', nome:'8º Ano A', disc:'Matemática', escolaId:'c1', profId:'u3', alunos:30, freq:74, pend:3, msgs:2, sala:'08', st:'or' },
  { id:'t4', nome:'7º Ano A', disc:'Matemática', escolaId:'c2', profId:'u4', alunos:22, freq:88, pend:1, msgs:0, sala:'03', st:'gr' },
  { id:'t5', nome:'6º Ano B', disc:'Matemática', escolaId:'c2', profId:'u4', alunos:26, freq:65, pend:4, msgs:3, sala:'05', st:'re' },
];

export const alunos = [
  { id:'a1', nome:'Ana Beatriz Costa',  ini:'AB', faltas:2, media:7.8, freq:92,  perfil:'TDAH',               st:'gr', turmaId:'t1' },
  { id:'a2', nome:'Bruno Lima Santos',  ini:'BL', faltas:7, media:5.2, freq:75,  perfil:null,                 st:'re', turmaId:'t1' },
  { id:'a3', nome:'Carla Ferreira',     ini:'CF', faltas:1, media:9.1, freq:96,  perfil:null,                 st:'gr', turmaId:'t1' },
  { id:'a4', nome:'Diego Souza',        ini:'DS', faltas:4, media:6.5, freq:83,  perfil:'TEA',                st:'or', turmaId:'t2' },
  { id:'a5', nome:'Eduarda Mendes',     ini:'EM', faltas:0, media:9.8, freq:100, perfil:'Altas Habilidades',  st:'gr', turmaId:'t2' },
  { id:'a6', nome:'Felipe Rocha',       ini:'FR', faltas:3, media:7.0, freq:88,  perfil:null,                 st:'gr', turmaId:'t3' },
  { id:'a7', nome:'Gabriela Nunes',     ini:'GN', faltas:6, media:5.8, freq:77,  perfil:null,                 st:'or', turmaId:'t3' },
  { id:'a8', nome:'Henrique Alves',     ini:'HA', faltas:2, media:8.2, freq:91,  perfil:null,                 st:'gr', turmaId:'t4' },
  { id:'a9', nome:'Isabella Ramos',     ini:'IR', faltas:5, media:6.0, freq:78,  perfil:null,                 st:'or', turmaId:'t5' },
];

export const eventos = [
  { id:'ev01', tipo:'aula', titulo:'Matemática — 9º Ano A', turmaIds:['t1'], profId:'u3', escolaId:'c1', recorrencia:'semanal', diaSemana:1, horaInicio:'07:30', horaFim:'08:20', sala:'12', lembrarMin:10 },
  { id:'ev02', tipo:'aula', titulo:'Matemática — 9º Ano B', turmaIds:['t2'], profId:'u3', escolaId:'c1', recorrencia:'semanal', diaSemana:1, horaInicio:'08:30', horaFim:'09:20', sala:'14', lembrarMin:10 },
  { id:'ev03', tipo:'aula', titulo:'Matemática — 8º Ano A', turmaIds:['t3'], profId:'u3', escolaId:'c1', recorrencia:'semanal', diaSemana:3, horaInicio:'10:00', horaFim:'10:50', sala:'08', lembrarMin:10 },
  { id:'ev04', tipo:'aula', titulo:'Matemática — 7º Ano A', turmaIds:['t4'], profId:'u4', escolaId:'c2', recorrencia:'semanal', diaSemana:4, horaInicio:'11:00', horaFim:'11:50', sala:'03', lembrarMin:10 },
  { id:'ev05', tipo:'aula', titulo:'Matemática — 6º Ano B', turmaIds:['t5'], profId:'u4', escolaId:'c2', recorrencia:'semanal', diaSemana:2, horaInicio:'09:00', horaFim:'09:50', sala:'05', lembrarMin:10 },
  { id:'ev10', tipo:'prova',   titulo:'Prova de Frações',      turmaIds:['t1'],           profId:'u3', escolaId:'c1', recorrencia:null, data:'2025-04-25', horaInicio:'07:30', horaFim:'09:00', sala:'12',         lembrarMin:1440 },
  { id:'ev11', tipo:'prova',   titulo:'Prova Bimestral Mat.',            turmaIds:['t1','t2','t3'], profId:'u3', escolaId:'c1', recorrencia:null, data:'2025-05-10', horaInicio:'07:30', horaFim:'09:00', sala:null,         lembrarMin:1440 },
  { id:'ev20', tipo:'reuniao', titulo:'Reunião Pedagógica',    turmaIds:null,             profId:null, escolaId:'c1', recorrencia:null, data:'2025-04-26', horaInicio:'18:00', horaFim:'20:00', sala:'Auditório', lembrarMin:60   },
  { id:'ev21', tipo:'reuniao', titulo:'Reunião de Pais — 9ºA', turmaIds:['t1'],     profId:'u3', escolaId:'c1', recorrencia:null, data:'2025-04-30', horaInicio:'19:00', horaFim:'20:30', sala:'Auditório', lembrarMin:60   },
  { id:'ev30', tipo:'evento',  titulo:'Feira de Ciências',          turmaIds:null,             profId:null, escolaId:'c1', recorrencia:null, data:'2025-05-15', horaInicio:'08:00', horaFim:'17:00', sala:'Pátio',   lembrarMin:1440 },
  { id:'ev31', tipo:'evento',  titulo:'Festa Junina',                    turmaIds:null,             profId:null, escolaId:'c1', recorrencia:null, data:'2025-06-12', horaInicio:'17:00', horaFim:'22:00', sala:'Pátio',   lembrarMin:1440 },
  { id:'ev40', tipo:'feriado', titulo:'Tiradentes',                      turmaIds:null,             profId:null, escolaId:null, recorrencia:null, data:'2025-04-21', horaInicio:null,    horaFim:null,    sala:null,            lembrarMin:null },
  { id:'ev41', tipo:'feriado', titulo:'Dia do Trabalho',                 turmaIds:null,             profId:null, escolaId:null, recorrencia:null, data:'2025-05-01', horaInicio:null,    horaFim:null,    sala:null,            lembrarMin:null },
  { id:'ev50', tipo:'lembrete',titulo:'Entregar relatórios',        turmaIds:null,             profId:'u3', escolaId:'c1', recorrencia:null, data:'2025-04-30', horaInicio:'08:00', horaFim:null,    sala:null,            lembrarMin:120  },
];

export const mensagens = [
  { id:'m1', nm:'Responsável — Ana B.',   tx:'Ana ficou doente e não vai à aula amanhã.',          t:'10min', lida:false, tp:'Recado'     },
  { id:'m2', nm:'Responsável — Bruno L.', tx:'Gostaria de marcar uma reunião sobre o desempenho.',            t:'1h',    lida:false, tp:'Reunião'    },
  { id:'m3', nm:'Responsável — Carla F.', tx:'Obrigada pelo retorno sobre a atividade!',                           t:'2h',    lida:true,  tp:'Recado'     },
  { id:'m4', nm:'Direção — E.E. Demo',    tx:'Reunião pedagógica na sexta-feira às 18h.',     t:'1d',    lida:true,  tp:'Comunicado' },
  { id:'m5', nm:'Coordenação',            tx:'Relatórios de frequência devem ser entregues até 30.',t:'2d',    lida:true,  tp:'Comunicado' },
];

export const vidaEscolar = [
  { ico:'📝', titulo:'Nota lançada — Prova de Frações', desc:'Nota: 8.5 / 10.0',                   data:'Hoje, 09:15'  },
  { ico:'⭐',       titulo:'Elogio registrado',              desc:'Excelente participação na geometria',             data:'Ontem, 10:30' },
  { ico:'📅', titulo:'Falta registrada',               desc:'Matemática — 9º Ano A',                     data:'20/04, 07:30' },
  { ico:'💬', titulo:'Comunicado enviado',             desc:'Reunião de pais — 30/04',                        data:'18/04, 14:00' },
  { ico:'⚠️', titulo:'Ocorrência registrada',     desc:'Esqueceu o material escolar',                              data:'15/04, 09:00' },
];

// --- HELPERS ---

/** "07:30" → 450 (minutos desde meia-noite) */
export function horaParaMin(hhmm) {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** 125 → "02:05" */
export function fmtSeg(seg) {
  const m = Math.floor(Math.abs(seg) / 60);
  const s = Math.abs(seg) % 60;
  return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

/** Retorna o próximo evento de aula do professor hoje, ou null */
export function proximaAulaHoje(profId) {
  const agora         = new Date();
  const diaSemanaHoje = agora.getDay();
  const minAgora      = agora.getHours() * 60 + agora.getMinutes();

  return eventos
    .filter(ev =>
      ev.tipo === 'aula' &&
      ev.profId === profId &&
      ev.recorrencia === 'semanal' &&
      ev.diaSemana === diaSemanaHoje &&
      ev.horaInicio
    )
    .sort((a, b) => horaParaMin(a.horaInicio) - horaParaMin(b.horaInicio))
    .find(ev => horaParaMin(ev.horaFim || ev.horaInicio) + 50 > minAgora)
    || null;
}

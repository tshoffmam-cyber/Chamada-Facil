// ---------------------------------------------------------------------------
// data/campanhas.js
//
// Calendario oficial das principais campanhas nacionais de saude e
// conscientizacao no Brasil (uma por mes, as mais reconhecidas / adotadas
// pelo Ministerio da Saude e por orgaos de saude publica). Usado pelo
// tema de cores automatico do app (ver src/utils/tema.js e a tela
// ADM > Temas e Campanhas).
//
// Escopo intencional: campanhas de saude publica e datas civicas amplas
// (ex: Marco - Mes da Mulher), sem pautas identitarias ou politico-
// partidarias, para manter o recurso neutro e focado em conscientizacao
// de saude.
// ---------------------------------------------------------------------------

export const campanhas = [
  { id: 'jan-branco', mes: 1, nome: 'Janeiro Branco', tema: 'Saude mental', cor: '#60A5FA', corLight: '#DBEAFE' },
  { id: 'fev-laranja', mes: 2, nome: 'Fevereiro Laranja', tema: 'Combate a hanseniase', cor: '#FB923C', corLight: '#FFEDD5' },
  { id: 'mar-lilas', mes: 3, nome: 'Marco Lilas - Mes da Mulher', tema: 'Prevencao do cancer de colo do utero e valorizacao da mulher', cor: '#C084FC', corLight: '#F3E8FF' },
  { id: 'abr-azul', mes: 4, nome: 'Abril Azul', tema: 'Conscientizacao do Autismo', cor: '#38BDF8', corLight: '#E0F2FE' },
  { id: 'mai-amarelo', mes: 5, nome: 'Maio Amarelo', tema: 'Combate a acidentes de transito', cor: '#FACC15', corLight: '#FEF9C3' },
  { id: 'jun-vermelho', mes: 6, nome: 'Junho Vermelho', tema: 'Incentivo a doacao de sangue', cor: '#EF4444', corLight: '#FEE2E2' },
  { id: 'jul-amarelo', mes: 7, nome: 'Julho Amarelo', tema: 'Combate as hepatites virais', cor: '#EAB308', corLight: '#FEF9C3' },
  { id: 'ago-dourado', mes: 8, nome: 'Agosto Dourado', tema: 'Incentivo ao aleitamento materno', cor: '#D4A017', corLight: '#FEF3C7' },
  { id: 'set-amarelo', mes: 9, nome: 'Setembro Amarelo', tema: 'Prevencao ao suicidio', cor: '#FDE047', corLight: '#FEFCE8' },
  { id: 'out-rosa', mes: 10, nome: 'Outubro Rosa', tema: 'Prevencao do cancer de mama', cor: '#EC4899', corLight: '#FCE7F3' },
  { id: 'nov-azul', mes: 11, nome: 'Novembro Azul', tema: 'Prevencao do cancer de prostata', cor: '#1D4ED8', corLight: '#DBEAFE' },
  { id: 'dez-vermelho', mes: 12, nome: 'Dezembro Vermelho', tema: 'Prevencao da Aids e outras ISTs', cor: '#B91C1C', corLight: '#FEE2E2' },
]

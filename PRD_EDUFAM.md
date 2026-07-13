# EduFam - PRD, Diagnostico e Roadmap

Documento de continuidade do projeto. Deve ser lido no inicio de qualquer nova sessao de trabalho, caso a conversa anterior se perca. Ultima atualizacao: 07/07/2026.

## Visao do produto
EduFam, slogan "A vida escolar na palma da mao", e pensada como um sistema operacional da vida escolar, nao apenas um sistema de chamada ou diario eletronico. Publico alvo: professor, diretor, organizacao, responsavel, aluno e administrador global.

Cobre escolas publicas e particulares, faculdades, cursos tecnicos, preparatorios, cursos livres, igrejas e empresas. Modelo de assinatura para professor, diretor e escola, com 30 dias gratuitos, login via Google, e-mail ou CPF.

Arquitetura alvo do frontend: React 19, Vite, React Router, Framer Motion, Lucide Icons, Tailwind CSS e Context API. No futuro, backend com FastAPI, PostgreSQL, Docker e VPS na Hostinger.

Filosofia de UX: cada tela deve responder o que o usuario precisa fazer agora, nunca existir so para mostrar informacao, com no maximo tres toques para tarefas importantes. A home do professor e um workspace inteligente que muda conforme o horario do dia, nao um dashboard estatico. O menu inferior tem no maximo cinco itens: Home, Organizacoes, IA EduFam, Comunicacao e Perfil.

A IA EduFam e o centro da plataforma, funcionando como assistente pedagogica que cria atividades e avaliacoes, gera resumos e relatorios, analisa turmas e alunos, escreve comunicados e sugere acoes, sem nunca interromper o professor.

O workspace agrupa turmas por organizacao, cada turma com um card mostrando disciplina, horario, alunos, frequencia, pendencias e status da chamada. A agenda mostra as proximas aulas em uma timeline com contagem regressiva.

O modo aula prioriza chamada, atividade, registro positivo, ocorrencia, vida escolar, arquivos e comunicacao com responsaveis, com botoes grandes para uso de uma mao so.

A chamada usa um fluxo simples por aluno: nao marcado, presente, falta, justificado, limpar, bloqueando edicao apos finalizada. A vida escolar e uma timeline permanente de notas, ocorrencias, elogios, atividades e comunicacoes.

O termo usado para alunos com necessidades especificas e sempre perfil pedagogico, nunca aluno atipico, cobrindo TEA, TDAH, dislexia, discalculia e outras condicoes, com estrategias e sugestoes da IA.

A comunicacao com responsaveis nunca usa WhatsApp ou telefone pessoal do professor, e feita por comunicados, recados, conversas e reunioes dentro do proprio app. O diretor visualiza professores, turmas, indicadores e relatorios, sem poder alterar registros do professor.

O ADM visualiza assinaturas, receita, churn, usuarios e configuracoes de publicidade, que nunca pode ser invasiva nem promover apostas ou jogos.

O design se inspira em Apple, Notion, Linear, Nubank e Google: muito espaco em branco, cards grandes com radius de 24px, fonte Inter, icones Lucide e animacoes discretas em Framer Motion.

Paleta de cores: azul principal 2563EB, roxo da IA 7C3AED, verde 16A34A, laranja F59E0B, vermelho DC2626, fundo F8FAFC e cards em branco.

O roadmap de publico preve evoluir do professor para diretor, responsavel, aluno, ADM, IA, marketplace, academy, analytics e API publica. A metodologia de desenvolvimento exige concluir arquitetura, UX, wireframes e fluxo de navegacao antes de implementar qualquer coisa, sempre priorizando experiencia do usuario e pensando em escala para milhoes de usuarios nos proximos dez anos.

## Diagnostico tecnico atual
Levantado em 07/07/2026 no repositorio Chamada-Facil, do usuario tshoffmam-cyber no GitHub. A stack hoje e React 18, Vite e react-router-dom, ainda sem Tailwind, sem Framer Motion e sem backend real.

O app publicado cobre apenas o fluxo do professor: login, home, organizacoes, modo aula, chamada, atividade, perfil do aluno, vida escolar, comunicacao, IA e perfil. Nao existem telas para diretor, responsavel, aluno ou ADM.

Autenticacao e dados vem de um arquivo de dados mockados dentro da pasta do app, e a sessao fica salva no localStorage do navegador via um contexto de autenticacao. Outro contexto guarda chamadas, atividades, vida escolar e mensagens, tambem no localStorage, partindo dos dados mock.

O app ja esta publicado gratuitamente em dois lugares que atualizam a cada push na branch principal: GitHub Pages e Vercel, nos enderecos ja compartilhados nas conversas anteriores com o time.

Cinco problemas foram confirmados testando o app. Primeiro, o roteador do React nao tem a propriedade basename apontando para a pasta do repositorio, entao a URL perde esse prefixo ao navegar e quebra o F5 no GitHub Pages.

Segundo, existe um arquivo de dados solto e duplicado que nenhuma tela mais usa, restante de uma versao anterior. Terceiro, o modo aula so tem quatro acoes hoje, faltando registro positivo, ocorrencia e arquivos como itens proprios.

Quarto, nao existe nenhuma agenda ou calendario no app: a home so mostra um resumo estatico, sem lugar para o professor cadastrar compromissos ou receber alertas de aulas e pendencias. Quinto, o visual atual e funcional porem generico, sem a paleta de cores, tipografia e animacoes descritas na visao do produto.

## Roadmap priorizado
Fase concluida: prototipo do fluxo do professor publicado gratuitamente e testavel.

Proxima fase, prioridade atual: corrigir o basename do roteador, construir a agenda com cadastro de compromissos e alertas de faltas e pendencias, remover o arquivo de dados morto, e completar as acoes do modo aula com registro positivo, ocorrencia e arquivos.

Fase seguinte: aplicar o design system oficial, com a paleta de cores, fonte Inter, cards arredondados e animacoes suaves, migrando para Tailwind CSS e Framer Motion.

Depois: construir os fluxos de diretor, responsavel, aluno e administrador global descritos na visao do produto.

Por fim: substituir os dados mockados por um backend real com FastAPI e PostgreSQL, autenticacao verdadeira e o modelo de assinaturas com periodo gratuito, seguido da expansao para IA completa, marketplace, academy e analytics.

## Como retomar se a conversa se perder
Abrir uma nova conversa, apontar para o repositorio Chamada-Facil do usuario tshoffmam-cyber e pedir para ler este arquivo PRD EDUFAM antes de continuar. As secoes de diagnostico e roadmap acima mostram exatamente o que ja foi encontrado e o que falta fazer, na ordem certa.

## Atualizacao de progresso (07/07/2026)

Foram concluidas as correcoes do Fase 1 do roadmap: o BrowserRouter passou a usar basename Chamada-Facil, o que corrige o F5 e os links diretos no GitHub Pages. Os doze arquivos de codigo morto foram removidos, incluindo o data.js duplicado da raiz, o DashboardProfessor.jsx orfao e toda a pasta components antiga.

A agenda pedida pelo usuario foi construida e publicada: existe agora uma tela Agenda em src/pages/professor/AgendaScreen.jsx, acessivel por um card na Home, com selecao de dia, lista de aulas geradas automaticamente a partir dos horarios das turmas e compromissos que o professor pode cadastrar, editar e remover. Os compromissos ficam salvos no DataContext, em localStorage, com as novas funcoes adicionarEvento, editarEvento e removerEvento, e a Home mostra quantos compromissos existem no dia atual.

Proximo passo do roadmap: completar as acoes do Modo Aula que ainda faltam, Registro Positivo, Ocorrencia e Arquivos, e depois iniciar a fase de aplicar o design system oficial.


## Atualizacao de progresso (10/07/2026)

Nesta sessao foi analisado um segundo prototipo standalone (HTML/JS puro, sem React) que o usuario havia desenvolvido em paralelo, chamado 'Chamada Facil v2'. Apos comparacao tecnica, decidiu-se manter a arquitetura React/Vite/DataContext ja em andamento como base do app oficial (por ser mais sustentavel e escalavel), mas incorporar as melhores ideias funcionais e visuais desse prototipo ao EduFam, evitando duplicar o que ja existia.

Foram adicionadas as seguintes funcionalidades novas, mantendo a paleta oficial (azul 2563EB, roxo IA 7C3AED, Inter, radius 24px) em vez da paleta verde do prototipo de referencia:

- Limite de faltas configuravel por turma (campo ao criar turma em NovaTurmaScreen, com alerta visual em ModoAula e no Perfil do Aluno quando o limite e atingido).
- Busca por nome nas listas de turmas (Organizacoes) e de alunos (Modo Aula), exibida automaticamente quando ha mais itens que cabem confortavelmente na tela.
- Cores de avatar variadas para alunos (rotacao entre azul, verde, roxo, ambar e vermelho da paleta oficial), substituindo o gradiente unico anterior.
- Notas por atividade: o professor agora pode lancar uma nota (0-10) por aluno em cada atividade da aba Atividades, ver a media da turma, e o aluno passa a ter um card de 'Desempenho em Atividades' e uma estatistica de media no seu perfil.
- Exportar relatorio do aluno em PDF: novo botao no Perfil do Aluno que abre uma janela formatada (presencas, faltas, frequencia, perfil pedagogico, notas de atividades e vida escolar recente) pronta para impressao ou salvar como PDF via o navegador.
- Feriados nacionais reais na Agenda, via integracao com a BrasilAPI (endpoint publico e gratuito), marcando visualmente os dias de feriado no seletor de datas com um aviso destacado.

Foi identificada e descartada uma ideia do prototipo de referencia por contrariar a visao de produto ja definida: comunicacao via WhatsApp/telefone pessoal do professor. O PRD determina que toda comunicacao com responsaveis deve ocorrer dentro do proprio app, entao nenhuma integracao de WhatsApp foi adicionada.

Ideias identificadas mas deliberadamente adiadas para quando as fases de Diretor e ADM forem construidas (fazem parte do roadmap de 'usuarios: diretor, responsavel, aluno, administrador global' ja descrito acima), registradas aqui para nao se perderem:

- Modelo de planos pagos com paywall (ex: recursos como boletim liberados apenas em planos superiores).
- Painel administrativo com MRR, grafico de distribuicao de assinantes por plano e deteccao de risco de churn.
- Pesquisa de satisfacao (NPS) com avaliacao por emoji e comentarios dos professores.
- Banner de patrocinadores/anuncios rotativo (visivel apenas em planos gratuitos).
- Configuracao de marca pelo ADM (nome do app, cor principal, texto de login, limite padrao de faltas).

Tambem foi observado, durante os testes no site publicado, que a navegacao direta por URL (digitar o endereco ou dar F5 em uma rota aninhada como /turma/t1) ainda retorna 404 no GitHub Pages, pois falta um arquivo 404.html de fallback para SPAs. A navegacao funciona normalmente quando feita por cliques dentro do app. Fica registrado como proximo ajuste tecnico a fazer.

Proximo passo do roadmap: continuar completando as acoes do Modo Aula (Arquivos) e avaliar a migracao para Tailwind CSS e Framer Motion conforme a visao de design ja definida.


Atualizacao de progresso (10/07/2026, parte 2)

Foram corrigidos os dois proximos itens do roteiro tecnico. Primeiro, o 404 em navegacao direta/F5 em rotas aninhadas do GitHub Pages: foi criado o arquivo edufam/public/404.html com a tecnica padrao de fallback para SPA (redireciona a rota nao encontrada de volta para a raiz do app, codificando o caminho original), e o edufam/index.html passou a ter um script que decodifica esse redirecionamento e restaura a URL certa via history.replaceState. Testado e confirmado: acessar diretamente uma rota como /turma/t1 agora carrega a tela correta em vez do 404 do GitHub Pages.

Segundo, a pedido do usuario, a Agenda deixou de usar a tira horizontal de 14 dias e passou a usar uma grade de mes completo (calendario visual), com navegacao por mes (setas e atalho 'Hoje'), mantendo tudo que ja existia: selecao de dia mostrando aulas e compromissos, feriados nacionais via BrasilAPI marcados com um ponto laranja diferenciado dos dias com aula/compromisso (ponto azul), e o formulario de novo compromisso inalterado. Dias fora do mes atual aparecem esmaecidos e desabilitados. Testado navegando entre meses (Julho e Setembro de 2026) e confirmando o aviso de feriado (Independencia do Brasil, 7 de setembro).

Proximo passo do roadmap: continue completando as acoes do Modo Aula (Arquivos) e avalie a migracao para Tailwind CSS e Framer Motion conforme a visao de design ja definida.


Atualizacao de progresso (11/07/2026)

A pedido do usuario, foram construidas quatro frentes novas: atalho de Modo Aula na Home com contagem regressiva ao vivo, central de alertas do professor, banner de parceiros no rodape, e o primeiro recorte do painel ADM (administrador global da plataforma), que ate aqui so existia como visao no roadmap.

Home do professor: a tira "Agenda" virou uma grade de dois atalhos (Agenda e Modo Aula), o segundo mostrando contagem regressiva ao vivo para a proxima aula (atualiza a cada segundo). O card grande de proxima aula ganhou o mesmo contador. Foi adicionado tambem um card de "Proximo compromisso" (o mais proximo evento firmado na Agenda), com sua propria contagem regressiva. Uma nova central de alertas junta, num so lugar, tudo que precisa da atencao do professor: turma com aluno no limite de faltas, aula comecando em ate 15 minutos, compromisso do dia ainda nao realizado, e feriado hoje. A logica de juntar esses sinais fica isolada em src/utils/alertas.js (funcao pura, facil de testar), e a busca de feriados foi centralizada em src/utils/feriados.js (usada tanto pela Agenda quanto pela Home, eliminando duplicacao).

Banner de parceiros: componente novo src/components/BannerParceiros.jsx, que roda automaticamente entre os parceiros cadastrados (mockados por enquanto, geridos pelo ADM). Sempre com o rotulo "Publicidade · Parceiro EduFam" visivel, nunca leva a apostas ou jogos de azar (regra fixa do PRD), e pode ser desativado inteiro por uma feature flag.

Painel ADM: passou a existir de fato, com layout e navegacao propria (src/layouts/AppLayoutAdm.jsx) e cinco telas em src/pages/adm/: AdmHomeScreen (dashboard com assinantes por plano, MRR dos ultimos 6 meses e churn, tudo com graficos simples em CSS, sem biblioteca externa), AdmUsuariosScreen (lista de usuarios e escolas com busca), AdmSuporteScreen (central de suporte, incluindo tickets abertos quando a IA EduFam nao consegue ajudar o professor e precisa de um humano), AdmConfiguracoesScreen (nome do app, texto de boas-vindas do login, paleta oficial como referencia fixa, e gestao completa dos parceiros do banner) e AdmConfigAvancadaScreen (feature flags em formato JSON). O login com adm@edufam.com (credencial que ja existia mockada) agora realmente leva para /adm/home, e o App.jsx passou a proteger as rotas por papel: quem nao e ADM e redirecionado de volta para /home ao tentar acessar qualquer rota /adm/*, e vice-versa.

Decisao de arquitetura registrada explicitamente (importante para quem for continuar o projeto): o pedido do usuario de poder "codar dentro do proprio app para mexer em alguma funcionalidade" foi resolvido como um painel de feature flags (configuracao-como-codigo), e nao como um editor de codigo-fonte real executando no navegador. Um app pronto para virar empresa grande nunca deve permitir execucao de codigo arbitrario vindo do cliente em producao — isso e um risco serio de seguranca e estabilidade (um erro de digitacao poderia derrubar o app para todos os usuarios). Mudanca de codigo de verdade deve sempre passar por repositorio, revisao, testes e pipeline de deploy (CI/CD). O painel de feature flags entrega a necessidade pratica (ajustar parametros sem esperar um novo deploy) com o mesmo principio de seguranca usado por ferramentas reais de mercado (ex: LaunchDarkly, Firebase Remote Config).

Todos os arquivos novos foram comentados extensivamente no topo, explicando o que e mock e o que precisaria virar backend real, para facilitar a transferencia do prototipo para um programador dar continuidade. Um resumo consolidado desse guia de handoff esta na secao seguinte.

Guia de handoff para o proximo programador

Arquitetura atual: React 19 + Vite + React Router, sem Tailwind/Framer Motion ainda (ver style.css para o design system manual). Toda a dado fica em src/data/mockData.js (seed inicial) e src/context/DataContext.jsx (estado em memoria + localStorage). Nao ha backend, nao ha autenticacao real, nao ha banco de dados.

Para tirar do papel de prototipo: (1) construir o backend (FastAPI + PostgreSQL, conforme o PRD original) com endpoints equivalentes a cada funcao do DataContext (ex: POST /turmas, GET /alunos, etc), mantendo os mesmos nomes/formatos quando possivel para minimizar mudancas nas telas; (2) trocar a autenticacao mockada (data/mockData.js autenticar()) por login real com token/sessao, mantendo o formato do objeto 'user' (name, email, role, avatar) para nao quebrar as telas; (3) mover os calculos do painel ADM (mockAdmStats) para consultas reais num banco de assinaturas/pagamentos, provavelmente integrado a um gateway de cobranca; (4) implementar de verdade os tickets de suporte (hoje mockSuporteTickets) como uma fila criada automaticamente pelo backend quando a IA falhar; (5) o banner de parceiros e as feature flags ja estao estruturados para virar tabelas reais com o minimo de mudanca de UI.

Proximo passo do roadmap: continuar completando a acao "Arquivos" do Modo Aula, avaliar a migracao para Tailwind CSS e Framer Motion, e iniciar os fluxos de responsavel e aluno quando o usuario priorizar.


## Atualização de progresso (11/07/2026) — Painel do Diretor

Nesta rodada, o papel **Diretor** deixou de compartilhar telas com o Professor e
ganhou area propria, separada e com navegacao inferior propria (max. 5 itens,
regra do PRD): **Painel, Professores, Recados, Alunos, Perfil** (rotas `/diretor/*`,
layout em `layouts/AppLayoutDiretor.jsx`).

Motivacao: o Diretor tem um papel de **gestao da escola**, nao de sala de aula.
Na maioria dos casos ele nao da aula (nao faz chamada); quando tiver uma turma
propria (campo opcional `turmas` no usuario, como o professor), o Painel exibe
um atalho "Minha Turma" que reaproveita o mesmo fluxo de chamada do professor
(`/turma/:turmaId`) — nao foi necessario duplicar essa tela.

### O que foi construido
- **Painel do Diretor** (`DiretorPainelScreen.jsx`): KPIs da escola (alunos,
  frequencia media, professores ativos, alunos em alerta de falta), resultados
  por turma (frequencia real, calculada a partir de presencas/faltas dos
  alunos, + media geral mockada) e resultados por professor (indicadores
  mockados em `mockIndicadoresProfessor`: aulas registradas no mes, chamada em
  dia, % de notas lancadas). Alertas de falta agora sao calculados para a
  **escola inteira**, nao so para as turmas de 1 professor.
- **Professores** (`DiretorProfessoresScreen.jsx`): lista com busca, indicadores
  e turmas de cada professor da escola.
- **Recados** (`DiretorRecadosScreen.jsx`): 3 abas — Mural (aviso publicado pelo
  Diretor e visivel a TODOS os professores, usando `para:'todos'` no array de
  `mensagens`), Mensagens (conversa individual Diretor↔professor) e Recados dos
  pais (visao agregada, somente leitura, de todos os recados que responsaveis
  mandaram aos professores da escola — reaproveita a mesma fonte de dados que
  `ComunicacaoScreen.jsx` usa por professor).
- **Alunos** (`DiretorAlunosScreen.jsx` + `DiretorAlunoDetalheScreen.jsx`): lista
  de todos os alunos da escola com busca, e historico completo por aluno
  (frequencia, responsavel, perfil pedagogico, linha do tempo de `vidaEscolar`).
- `DataContext.jsx` ganhou `enviarMensagem()` para o Diretor postar no mural ou
  mandar mensagem individual (mesmo array `mensagens` usado pelo professor).
- `mockData.js` ganhou 2 professores extras (`u4`, `u5`), 2 turmas extras
  (`t3`, `t4`) e alunos correspondentes, so para o Painel do Diretor ter mais de
  1 professor pra mostrar — **eles nao tem senha em `_creds`** (nao logam no
  prototipo, so existem para popular as telas de gestao).

### Decisao de arquitetura confirmada com o usuario: comunicacao com os pais
Ficou reconfirmado que o EduFam **nao usa WhatsApp nem telefone pessoal** para
falar com os pais/responsaveis — mesma regra ja valida para o professor. A
ideia de negocio original (pais assinando um plano pago para acompanhar o
filho) continua valida, mas o canal tecnico deve ser **sempre dentro do
proprio app** (ex: um futuro Portal dos Pais, com login e assinatura), nunca
por API externa de WhatsApp. Hoje isso e representado apenas pelo campo
`tipo:'responsavel'` em `mensagens` (recados que os pais mandaram, exibidos
para o professor e agregados para o Diretor) — nao existe ainda um login real
para os pais neste prototipo.

### Para um backend real (handoff)
- Filtrar `turmas`/`alunos`/`mensagens` por escola/organizacao real do usuario
  logado (hoje so existe 1 escola mockada, entao nenhuma tela filtra de fato
  por `organizacaoId`).
- Trocar `mockIndicadoresProfessor` por uma consulta agregada real as tabelas
  de chamada/notas.
- Modelar "turmas passadas"/matriculas por ano letivo, para o historico do
  aluno (`DiretorAlunoDetalheScreen.jsx`) mostrar anos anteriores de verdade.
- Construir o Portal dos Pais real (login, assinatura, visualizacao de dados
  do filho e recebimento de recados) quando o negocio decidir priorizar isso.


## Desenho de acesso por papel (auditoria de escopo de dados) — 11/07/2026

Antes de expandir o produto, fizemos uma auditoria de todas as telas de cada papel (Professor, Diretor, Responsavel, ADM) para checar se os dados exibidos realmente pertencem a quem esta logado.

### Professor
| Tela | Rota | Escopo esperado | Status |
|---|---|---|---|
| Home | /home | somente turmas do professor logado | OK - ja filtra por `turma.professorId === user.id` |
| Agenda | /agenda | somente turmas do professor logado | OK - mesmo filtro |
| Minhas Escolas | /organizacoes | somente turmas do professor logado | INCONSISTENTE - mostra todas as turmas da escola, inclusive de outros professores |
| Modo Aula | /turma/:turmaId | so deveria abrir se a turma for do professor logado | INCONSISTENTE - sem verificacao, abre a turma de qualquer professor via URL |
| Chamada | /turma/:turmaId/chamada | mesma turma acima | INCONSISTENTE - mesmo problema |
| Atividade | /turma/:turmaId/atividade | mesma turma acima | INCONSISTENTE - mesmo problema |
| Aluno (perfil) | /turma/:turmaId/aluno/:alunoId | aluno de uma turma do professor | INCONSISTENTE - mesmo problema |
| Vida Escolar | /turma/:turmaId/vida-escolar | mesma turma acima | INCONSISTENTE - mesmo problema |
| Comunicacao | /comunicacao | mensagens onde para === user.id ou mural | OK - ja filtra por usuario |
| Perfil | /perfil | "meus alunos"/"minhas turmas" | INCONSISTENTE - mostra total da escola inteira (alunos.length, turmas.length), nao so do professor |

### Diretor
Todas as telas mostram dados da escola inteira por design - e o papel de gestao. Ja existe comentario no codigo reconhecendo que hoje so ha 1 escola mockada e que um backend real filtraria por organizacaoId.

| Painel | Professores | Alunos | Recados | Perfil (compartilhado) |
|---|---|---|---|---|
| OK (limitacao do mock documentada no codigo) | OK (idem) | OK (idem) | OK (idem) | OK - faz sentido o diretor ver o total da escola |

### Responsavel (Portal criado nesta sessao)
Todas as 5 telas ja filtram pelos alunosIds do responsavel logado - nenhuma inconsistencia encontrada.

### ADM
Todas as telas sao intencionalmente globais (visao da plataforma inteira) - correto por design.

### Causa raiz das inconsistencias do Professor
O campo `professorId` ja existe em cada turma no mock, mas 3 pontos do professor nao usam esse filtro: `OrganizacoesProfessor.jsx` (lista todas as turmas da escola, nao so as do professor), as 5 telas de dentro de uma turma (`ModoAula`, `ChamadaScreen`, `AtividadeScreen`, `AlunoPerfilScreen`, `VidaEscolarScreen` - nenhuma verifica se a turma pertence ao professor logado) e `PerfilScreen.jsx` (mostra total da escola ao inves do total do professor). Na pratica, isso permite que um professor acesse e ate edite a chamada e as notas da turma de outro professor digitando a URL diretamente.

### Proximo passo (aguardando aprovacao para iniciar as correcoes)
1. Filtrar turmas por professorId em OrganizacoesProfessor.jsx.
2. Adicionar verificacao de posse da turma (redirecionar se turma.professorId !== user.id) em ModoAula.jsx, ChamadaScreen.jsx, AtividadeScreen.jsx, AlunoPerfilScreen.jsx e VidaEscolarScreen.jsx.
3. Ajustar o PerfilScreen para mostrar "minhas turmas/meus alunos" quando o papel for professor, mantendo o total da escola para Diretor/ADM.


### Atualizacao (11/07/2026) — correcoes aplicadas

As 3 inconsistencias do Professor listadas acima foram corrigidas:
1. `OrganizacoesProfessor.jsx` agora filtra turmas por `professorId === user.id` (so mostra escolas/turmas onde o professor de fato leciona).
2. `ModoAula.jsx`, `ChamadaScreen.jsx`, `AtividadeScreen.jsx`, `AlunoPerfilScreen.jsx` e `VidaEscolarScreen.jsx` agora tem guarda de posse: se a turma (ou o aluno) nao pertencer ao professor logado, a tela redireciona/bloqueia em vez de abrir os dados.
3. `PerfilScreen.jsx` agora mostra "Minhas Turmas"/"Meus Alunos" com os numeros corretos quando o papel e professor, e mantem o total da escola para Diretor/ADM (que e o comportamento correto para esses papeis).

IMPORTANTE para o programador que for plugar um backend real: todas essas guardas hoje sao só uma camada de UX no frontend (comparando `professorId` no mock). Em producao, a API precisa fazer a mesma checagem de autorizacao no servidor (nunca confiar so no frontend), e nem deveria retornar dados de uma turma/aluno que nao pertence ao usuario autenticado.

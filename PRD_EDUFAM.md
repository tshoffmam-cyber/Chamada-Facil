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

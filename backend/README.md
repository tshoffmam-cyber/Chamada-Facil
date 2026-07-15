# EduFam - Backend (esqueleto de referencia)

Este diretorio NAO esta implantado em nenhum servidor e NAO roda hoje em producao.
E um esqueleto de codigo (FastAPI + Pydantic) pensado para servir de ponto de
partida quando o time decidir construir o backend real descrito no
`PRD_EDUFAM.md` (raiz do repositorio).

## Por que existe

O app publicado hoje (pasta `edufam/`) e 100% frontend: todos os dados vivem
em `edufam/src/data/mockData.js` e no `localStorage` do navegador, via
`edufam/src/context/DataContext.jsx`. Isso e otimo para prototipar rapido,
mas nao serve para dados reais entre usuarios/dispositivos, autenticacao de
verdade ou cobranca de assinaturas.

Este esqueleto espelha, rota por rota, as mesmas operacoes que ja existem no
`DataContext.jsx` e em `edufam/src/services/api.js` (a camada de stub do
frontend), para que a integracao final seja o mais direta possivel.

## O que falta para isto virar um backend real

1. Escolher e configurar um banco de dados (PostgreSQL, conforme o PRD) e
   trocar os dados em memoria deste esqueleto por modelos reais com um ORM
   (ex: SQLAlchemy ou SQLModel).
2. Implementar autenticacao de verdade (JWT ou sessao), incluindo login via
   Google, e-mail ou CPF conforme o PRD, e checagem de autorizacao por
   papel/organizacao em CADA rota (nunca confiar so no frontend).
3. Adicionar as migracoes de banco (ex: Alembic).
4. Contratar/configurar hospedagem (o PRD menciona Docker + VPS na
   Hostinger) e variaveis de ambiente/segredos fora do codigo-fonte.
5. Conectar o frontend trocando `edufam/src/services/api.js` (hoje so
   lanca erro de "nao implementado") pelas chamadas reais a este backend, e
   trocar o `DataContext.jsx` para usar essa camada em vez do localStorage.

## Como rodar este esqueleto localmente (apenas para desenvolvimento)

```
cd backend
python -m venv .venv
.venv/Scripts/activate  # ou source .venv/bin/activate no Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Isso sobe uma API local em `http://localhost:8000` com dados em memoria
(reiniciam a cada restart) só para validar o formato das rotas. Nao ha banco
de dados real configurado.

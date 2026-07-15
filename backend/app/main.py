# ---------------------------------------------------------------------------
# backend/app/main.py
#
# ESQUELETO DE REFERENCIA -- nao esta implantado em nenhum servidor. Ver
# backend/README.md para o contexto completo e o que falta para virar um
# backend real.
#
# Este arquivo sobe uma API FastAPI com dados em memoria (uma lista Python
# por recurso, perdida a cada reinicio), so para validar o FORMATO das
# rotas que o frontend (edufam/src/services/api.js) espera encontrar.
# Nao ha banco de dados, autenticacao real, nem checagem de autorizacao.
#
# PARA UM BACKEND REAL, nesta ordem sugerida:
#   1. Trocar as listas em memoria por tabelas reais (SQLModel/SQLAlchemy).
#   2. Adicionar autenticacao (JWT) e proteger cada rota abaixo, checando
#      se o usuario logado tem permissao para aquele recurso/organizacao
#      (nunca confiar apenas no que o frontend envia).
#   3. Adicionar validacao completa nos modelos Pydantic (hoje minimos).
#   4. Substituir os stubs de IA por uma integracao real com um provedor
#      de linguagem, chamado sempre do servidor (nunca do navegador).
# ---------------------------------------------------------------------------

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="EduFam API (esqueleto, nao productivo)")

# --- "Banco de dados" em memoria, apenas para desenvolvimento local ---------
db = {
    "organizacoes": [],
    "turmas": [],
    "alunos": [],
    "atividades": [],
    "eventos": [],
    "mensagens": [],
    "parceiros": [],
    "suporte_tickets": [],
    "feature_flags": {
        "limiteFaltasPadrao": 15,
        "bannerParceirosAtivo": True,
        "nomeApp": "EduFam",
        "corPrimaria": "#2563EB",
        "textoBoasVindasLogin": "A vida escolar na palma da mao.",
    },
}


def _next_id(prefixo, colecao):
    return prefixo + str(len(colecao) + 1)


# --- Modelos minimos (expandir com validacao real depois) -------------------
class LoginPayload(BaseModel):
    email: str
    password: str


class Organizacao(BaseModel):
    nome: str


class Turma(BaseModel):
    nome: str
    disciplina: str
    organizacaoId: str
    professorId: str
    limiteFaltas: Optional[int] = None


class Aluno(BaseModel):
    nome: str
    turmaId: str
    matricula: Optional[str] = None


class Evento(BaseModel):
    titulo: str
    data: str
    inicio: Optional[str] = None
    fim: Optional[str] = None
    tipo: Optional[str] = "evento"


class FeatureFlags(BaseModel):
    limiteFaltasPadrao: Optional[int] = None
    bannerParceirosAtivo: Optional[bool] = None
    nomeApp: Optional[str] = None
    corPrimaria: Optional[str] = None
    textoBoasVindasLogin: Optional[str] = None


# --- Autenticacao (stub) -----------------------------------------------------
# PARA UM BACKEND REAL: comparar hash de senha, emitir JWT, nunca devolver a
# senha em texto puro nem comparar em memoria como abaixo.
@app.post("/auth/login")
def login(payload: LoginPayload):
    raise HTTPException(status_code=501, detail="Autenticacao real ainda nao implementada neste esqueleto.")


# --- Organizacoes -------------------------------------------------------------
@app.get("/organizacoes")
def listar_organizacoes():
    return db["organizacoes"]


@app.post("/organizacoes")
def criar_organizacao(dados: Organizacao):
    nova = {"id": _next_id("org", db["organizacoes"]), **dados.dict()}
    db["organizacoes"].append(nova)
    return nova


# --- Turmas --------------------------------------------------------------------
@app.get("/turmas")
def listar_turmas():
    return db["turmas"]


@app.post("/turmas")
def criar_turma(dados: Turma):
    nova = {"id": _next_id("t", db["turmas"]), **dados.dict()}
    db["turmas"].append(nova)
    return nova


# --- Alunos ---------------------------------------------------------------------
@app.get("/alunos")
def listar_alunos():
    return db["alunos"]


@app.post("/alunos")
def adicionar_aluno(dados: Aluno):
    novo = {"id": _next_id("a", db["alunos"]), "presencas": 0, "faltas": 0, **dados.dict()}
    db["alunos"].append(novo)
    return novo


# --- Eventos/Agenda ---------------------------------------------------------------
@app.get("/eventos")
def listar_eventos():
    return db["eventos"]


@app.post("/eventos")
def criar_evento(dados: Evento):
    novo = {"id": _next_id("ev", db["eventos"]), **dados.dict()}
    db["eventos"].append(novo)
    return novo


# --- Painel ADM: feature flags -----------------------------------------------------
@app.get("/adm/feature-flags")
def obter_feature_flags():
    return db["feature_flags"]


@app.patch("/adm/feature-flags")
def atualizar_feature_flags(dados: FeatureFlags):
    db["feature_flags"].update({k: v for k, v in dados.dict().items() if v is not None})
    return db["feature_flags"]


# --- IA EduFam (stubs) ---------------------------------------------------------------
# PARA UM BACKEND REAL: chamar aqui um provedor de LLM real, nunca do
# navegador (para nao expor a chave de API), e registrar em suporte_tickets
# quando a IA nao conseguir responder.
@app.post("/ia/perguntar")
def ia_perguntar(pergunta: str):
    raise HTTPException(status_code=501, detail="Integracao real de IA ainda nao implementada neste esqueleto.")


@app.get("/")
def raiz():
    return {"status": "ok", "aviso": "Esqueleto de referencia, sem dados reais. Ver backend/README.md"}

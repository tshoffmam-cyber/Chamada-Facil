import { useState } from "react";
import {
  ClipboardCheck,
  FileText,
  Star,
  AlertTriangle,
  BookOpen,
  Paperclip,
  MessageCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

import FirstAccessTip from "./FirstAccessTip";

const alunosIniciais = [
  { id: 1, nome: "Ana Beatriz Costa", faltas: 2, status: null },
  { id: 2, nome: "Bruno Lima Santos", faltas: 5, status: null },
  { id: 3, nome: "Carla Ferreira", faltas: 7, status: null },
  { id: 4, nome: "Diego Souza", faltas: 1, status: null },
  { id: 5, nome: "Eduarda Mendes", faltas: 0, status: null },
];

const acoes = [
  { titulo: "Chamada", subtitulo: "Registrar presenca", nivel: "Essencial", icon: <ClipboardCheck size={20} /> },
  { titulo: "Atividade / Avaliacao", subtitulo: "Registrar atividade da aula", nivel: "Essencial", icon: <FileText size={20} /> },
  { titulo: "Registro positivo", subtitulo: "Elogio ou destaque", nivel: "Frequente", icon: <Star size={20} /> },
  { titulo: "Ocorrencia", subtitulo: "Registrar situacao importante", nivel: "Frequente", icon: <AlertTriangle size={20} /> },
  { titulo: "Vida Escolar", subtitulo: "Historico da turma", nivel: "Frequente", icon: <BookOpen size={20} /> },
  { titulo: "Anexos", subtitulo: "Foto, documento ou arquivo", nivel: "Eventual", icon: <Paperclip size={20} /> },
  { titulo: "Comunicar responsaveis", subtitulo: "Uso eventual e registrado", nivel: "Eventual", icon: <MessageCircle size={20} /> },
];

function proximoStatus(status) {
  if (status === null) return "P";
  if (status === "P") return "F";
  if (status === "F") return "J";
  return null;
}

function labelStatus(status) {
  if (status === "P") return "V";
  if (status === "F") return "F";
  if (status === "J") return "J";
  return "";
}

function textoStatus(status) {
  if (status === "P") return "Presente";
  if (status === "F") return "Falta";
  if (status === "J") return "Justificado";
  return "Nao marcado";
}

export default function ClassMode() {
  const [aba, setAba] = useState("acoes");
  const [mostrarTip, setMostrarTip] = useState(true);
  const [chamadaFinalizada, setChamadaFinalizada] = useState(false);
  const [alunos, setAlunos] = useState(alunosIniciais);

  const presentes = alunos.filter((a) => a.status === "P").length;
  const faltas = alunos.filter((a) => a.status === "F").length;
  const justificados = alunos.filter((a) => a.status === "J").length;
  const marcados = presentes + faltas + justificados;

  function alternarStatus(id) {
    if (chamadaFinalizada) return;
    setAlunos((lista) =>
      lista.map((aluno) =>
        aluno.id === id ? { ...aluno, status: proximoStatus(aluno.status) } : aluno
      )
    );
  }

  function finalizarChamada() {
    if (marcados === 0) return;
    setChamadaFinalizada(true);
  }

  return (
    <section className="section">
      <div className="class-mode-card">
        <div className="class-mode-header">
          <div>
            <span className="mode-label">Modo Aula</span>
            <h2>9 Ano A</h2>
            <p>Matematica - Escola Estadual Esperanca</p>
          </div>
          <div className="mode-time">
            <Clock size={18} />
            <span>07:30 - 08:20</span>
          </div>
        </div>

        <div className="mode-status-row">
          <span className={chamadaFinalizada ? "status-pill done" : "status-pill pending"}>
            {chamadaFinalizada ? "Chamada finalizada" : "Chamada pendente"}
          </span>
          <span className="status-pill soft">Tempo restante: 32 min</span>
        </div>

        <div className="mode-tabs">
          <button className={aba === "acoes" ? "active" : ""} onClick={() => setAba("acoes")}>
            Acoes
          </button>
          <button className={aba === "chamada" ? "active" : ""} onClick={() => setAba("chamada")}>
            Chamada
          </button>
        </div>

        {aba === "acoes" && (
          <div className="mode-actions-grid">
            {acoes.map((acao) => (
              <button
                key={acao.titulo}
                className="mode-action"
                onClick={() => acao.titulo === "Chamada" && setAba("chamada")}
              >
                <div className="mode-action-icon">{acao.icon}</div>
                <div>
                  <strong>{acao.titulo}</strong>
                  <span>{acao.subtitulo}</span>
                  <small>{acao.nivel}</small>
                </div>
              </button>
            ))}
          </div>
        )}

        {aba === "chamada" && (
          <div className="attendance-panel">
            {mostrarTip && <FirstAccessTip onClose={() => setMostrarTip(false)} />}

            {chamadaFinalizada && (
              <div className="info-card blue-soft">
                <CheckCircle2 size={22} />
                <div>
                  <strong>Chamada ja finalizada</strong>
                  <span>Esta aula ja possui chamada registrada.</span>
                </div>
              </div>
            )}

            <div className="attendance-summary">
              <div><strong>{presentes}</strong><span>Presentes</span></div>
              <div><strong>{faltas}</strong><span>Faltas</span></div>
              <div><strong>{justificados}</strong><span>Justificados</span></div>
            </div>

            <div className="students-list">
              {alunos.map((aluno) => (
                <div className="student-attendance-card" key={aluno.id}>
                  <div className="student-avatar">
                    {aluno.nome.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                  </div>
                  <div className="student-info">
                    <strong>{aluno.nome}</strong>
                    <span>{aluno.faltas} falta{aluno.faltas === 1 ? "" : "s"} - {textoStatus(aluno.status)}</span>
                  </div>
                  <button
                    className={"attendance-toggle" + (aluno.status === "P" ? " present" : aluno.status === "F" ? " absent" : aluno.status === "J" ? " justified" : "")}
                    onClick={() => alternarStatus(aluno.id)}
                    disabled={chamadaFinalizada}
                  >
                    {labelStatus(aluno.status)}
                  </button>
                </div>
              ))}
            </div>

            {!chamadaFinalizada ? (
              <button className="primary-button" onClick={finalizarChamada} disabled={marcados === 0}>
                <ClipboardCheck size={18} />
                Finalizar chamada
              </button>
            ) : (
              <button className="secondary-button">Visualizar resumo da chamada</button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

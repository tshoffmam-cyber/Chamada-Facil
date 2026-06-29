import {
  CalendarDays,
  Clock,
  ClipboardCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";

const aulas = [
  {
    horario: "07:30 - 08:20",
    organizacao: "Escola Estadual Esperanca",
    turma: "9 Ano A",
    materia: "Matematica",
    status: "Em andamento",
    chamada: "Pendente",
  },
  {
    horario: "08:30 - 09:20",
    organizacao: "Escola Estadual Esperanca",
    turma: "8 Ano B",
    materia: "Portugues",
    status: "Proxima aula",
    chamada: "Aguardando",
  },
  {
    horario: "10:00 - 10:50",
    organizacao: "Preparatorio PM",
    turma: "PMES Soldado",
    materia: "Legislacao",
    status: "Mais tarde",
    chamada: "Aguardando",
  },
];

export default function SmartAgenda() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Agenda Inteligente</h2>
        <span>Hoje</span>
      </div>

      <div className="agenda-main-card">
        <div className="agenda-main-top">
          <div className="agenda-icon">
            <CalendarDays size={22} />
          </div>
          <div>
            <strong>Sua aula em andamento</strong>
            <span>O EduFam organiza sua rotina automaticamente.</span>
          </div>
        </div>

        <div className="agenda-current">
          <div>
            <p>9 Ano A</p>
            <span>Matematica - Escola Estadual Esperanca</span>
          </div>
          <button>Modo Aula</button>
        </div>

        <div className="agenda-warning">
          <TimerReset size={18} />
          <span>Chamada pendente. Ao final da aula, o EduFam lembrara voce de finalizar.</span>
        </div>
      </div>

      <div className="lesson-list">
        {aulas.map((aula) => (
          <div className="lesson-card" key={aula.turma + aula.horario}>
            <div className="lesson-time">
              <Clock size={17} />
              <span>{aula.horario}</span>
            </div>
            <div className="lesson-info">
              <strong>{aula.turma}</strong>
              <span>{aula.materia}</span>
              <small>{aula.organizacao}</small>
            </div>
            <div className="lesson-status">
              <span>{aula.status}</span>
              <small>{aula.chamada}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-summary-card">
        <div className="ai-summary-head">
          <Sparkles size={20} />
          <strong>Resumo de aula com IA</strong>
        </div>
        <p>Ao final da aula, a EduFam podera sugerir um resumo para registrar na Vida Escolar da turma.</p>
        <div className="summary-preview">
          <ClipboardCheck size={18} />
          <span>Hoje a turma teve dificuldade em fracoes. Recomendo revisar o conteudo na proxima aula.</span>
        </div>
        <button>Gerar resumo da aula</button>
      </div>
    </section>
  );
}

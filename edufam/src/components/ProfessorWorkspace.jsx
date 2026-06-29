import {
  Building2,
  Users,
  Clock,
  ClipboardCheck,
  AlertCircle,
  Brain,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const organizacoes = [
  {
    nome: "Escola Estadual Esperanca",
    tipo: "Escola",
    turmas: [
      {
        nome: "9 Ano A",
        disciplina: "Matematica",
        horario: "07:30",
        alunos: 28,
        perfilPedagogico: 3,
        chamada: "Pendente",
        notasPendentes: 2,
        frequencia: "96%",
        status: "atencao",
      },
      {
        nome: "8 Ano B",
        disciplina: "Portugues",
        horario: "09:10",
        alunos: 31,
        perfilPedagogico: 1,
        chamada: "Realizada",
        notasPendentes: 0,
        frequencia: "98%",
        status: "ok",
      },
    ],
  },
  {
    nome: "Preparatorio PM",
    tipo: "Curso Preparatorio",
    turmas: [
      {
        nome: "PMES Soldado",
        disciplina: "Legislacao",
        horario: "19:00",
        alunos: 42,
        perfilPedagogico: 0,
        chamada: "Sem aula agora",
        notasPendentes: 4,
        frequencia: "91%",
        status: "neutro",
      },
    ],
  },
];

function statusClass(status) {
  if (status === "ok") return "ok";
  if (status === "atencao") return "warning";
  return "neutral";
}

export default function ProfessorWorkspace() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Minhas turmas</h2>
        <span>Por organizacao</span>
      </div>

      <div className="workspace-hero">
        <div>
          <span>Proxima aula</span>
          <strong>9 Ano A comeca em 12 min</strong>
          <p>Matematica · Escola Estadual Esperanca</p>
        </div>

        <button>Entrar no Modo Aula</button>
      </div>

      <div className="organizations-list">
        {organizacoes.map((org) => (
          <div className="organization-group" key={org.nome}>
            <div className="organization-head">
              <div className="organization-icon">
                <Building2 size={20} />
              </div>

              <div>
                <strong>{org.nome}</strong>
                <span>{org.tipo}</span>
              </div>
            </div>

            <div className="class-workspace-list">
              {org.turmas.map((turma) => (
                <div
                  className={`workspace-class-card ${statusClass(turma.status)}`}
                  key={turma.nome}
                >
                  <div className="class-card-main">
                    <div>
                      <strong>{turma.nome}</strong>
                      <span>{turma.disciplina}</span>
                    </div>

                    <button>
                      Entrar <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="class-indicators">
                    <div>
                      <Clock size={16} />
                      <span>{turma.horario}</span>
                    </div>

                    <div>
                      <Users size={16} />
                      <span>{turma.alunos} alunos</span>
                    </div>

                    <div>
                      <Brain size={16} />
                      <span>{turma.perfilPedagogico} perfis</span>
                    </div>

                    <div>
                      <ClipboardCheck size={16} />
                      <span>{turma.chamada}</span>
                    </div>

                    <div>
                      <AlertCircle size={16} />
                      <span>{turma.notasPendentes} pendencias</span>
                    </div>

                    <div>
                      <BarChart3 size={16} />
                      <span>{turma.frequencia} freq.</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

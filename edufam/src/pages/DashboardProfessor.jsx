import {
  BookOpen,
  Users,
  ClipboardCheck,
  CalendarDays,
  MessageCircle,
  FileText,
  BarChart3,
  GraduationCap,
} from "lucide-react";

import StatCard from "../components/StatCard";
import QuickAction from "../components/QuickAction";
import CommunicationPanel from "../components/CommunicationPanel";
import VidaEscolarTimeline from "../components/VidaEscolarTimeline";
import SmartAgenda from "../components/SmartAgenda";
import ClassMode from "../components/ClassMode";
import ProfessorWorkspace from "../components/ProfessorWorkspace";

export default function DashboardProfessor() {
  const stats = [
    { icon: "BookOpen", label: "Aulas hoje", value: "4", sub: "2 concluidas" },
    { icon: "Users", label: "Alunos ativos", value: "127", sub: "3 turmas" },
    { icon: "ClipboardCheck", label: "Chamadas feitas", value: "3/4", sub: "1 pendente" },
    { icon: "BarChart3", label: "Media frequencia", value: "94%", sub: "Este mes" },
  ];

  const actions = [
    { icon: "ClipboardCheck", label: "Fazer Chamada" },
    { icon: "FileText", label: "Lancar Notas" },
    { icon: "MessageCircle", label: "Avisos" },
    { icon: "CalendarDays", label: "Agenda" },
    { icon: "BarChart3", label: "Relatorios" },
    { icon: "GraduationCap", label: "Alunos" },
  ];

  const proximasAulas = [
    { turma: "9 Ano A", disciplina: "Matematica", horario: "07:30", sala: "Sala 12" },
    { turma: "8 Ano B", disciplina: "Portugues", horario: "09:10", sala: "Lab Info" },
    { turma: "7 Ano C", disciplina: "Matematica", horario: "10:50", sala: "Sala 08" },
  ];

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="header-left">
          <div className="avatar">JP</div>
          <div>
            <strong>Joao Pedro</strong>
            <span>Professor de Matematica</span>
          </div>
        </div>
        <button className="notif-btn">
          <span>3</span>
        </button>
      </header>

      <div className="hero-card">
        <div>
          <p className="hero-greeting">Bom dia, Professor!</p>
          <h1 className="hero-title">Proxima aula em 12 min</h1>
          <p className="hero-sub">9 Ano A · Matematica · Sala 12</p>
        </div>
        <button className="hero-btn">Iniciar Aula</button>
      </div>

      <SmartAgenda />
      <ClassMode />
      <ProfessorWorkspace />

      <section className="section">
        <div className="section-header">
          <h2>Resumo do dia</h2>
        </div>
        <div className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Acoes rapidas</h2>
        </div>
        <div className="actions-grid">
          {actions.map((a) => (
            <QuickAction key={a.label} {...a} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Proximas aulas</h2>
          <span>Hoje</span>
        </div>
        <div className="classes-list">
          {proximasAulas.map((aula) => (
            <div className="class-item" key={aula.turma}>
              <div className="class-time">{aula.horario}</div>
              <div className="class-info">
                <strong>{aula.turma}</strong>
                <span>{aula.disciplina} · {aula.sala}</span>
              </div>
              <button className="class-btn">Entrar</button>
            </div>
          ))}
        </div>
      </section>

      <CommunicationPanel />
      <VidaEscolarTimeline />
    </main>
  );
}

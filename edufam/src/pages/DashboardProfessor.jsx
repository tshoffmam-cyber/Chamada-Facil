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

export default function DashboardProfessor() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">EduFam</p>
          <h1>Bom dia, Professor</h1>
          <p className="subtitle">A vida escolar na palma da mao.</p>
        </div>

        <div className="profile-badge">
          <GraduationCap size={24} />
        </div>
      </section>

      <SmartAgenda />

      <section className="stats-grid">
        <StatCard icon={<BookOpen />} title="Turmas" value="4" highlight />
        <StatCard icon={<Users />} title="Alunos" value="126" />
        <StatCard icon={<ClipboardCheck />} title="Avaliacoes" value="2" />
        <StatCard icon={<BarChart3 />} title="Frequencia" value="97%" />
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Acoes rapidas</h2>
          <span>Ate 3 toques</span>
        </div>

        <div className="actions-grid">
          <QuickAction icon={<ClipboardCheck />} title="Iniciar chamada" subtitle="Registrar presenca" />
          <QuickAction icon={<FileText />} title="Lancar notas" subtitle="Avaliacoes e trabalhos" />
          <QuickAction icon={<BookOpen />} title="Vida Escolar" subtitle="Historico do aluno" />
          <QuickAction icon={<MessageCircle />} title="Comunicacao" subtitle="Enviar aos pais" />
          <QuickAction icon={<CalendarDays />} title="Agenda" subtitle="Aulas e reunioes" />
          <QuickAction icon={<BarChart3 />} title="Relatorios" subtitle="Turma e aluno" />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Proximas aulas</h2>
          <span>Hoje</span>
        </div>

        <div className="class-card">
          <div>
            <strong>9 Ano A</strong>
            <span>Matematica - 08:00</span>
          </div>
          <button>Entrar</button>
        </div>

        <div className="class-card">
          <div>
            <strong>8 Ano B</strong>
            <span>Portugues - 10:00</span>
          </div>
          <button>Entrar</button>
        </div>
      </section>

      <CommunicationPanel />
      <VidaEscolarTimeline />
    </main>
  );
}

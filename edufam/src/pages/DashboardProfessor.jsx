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

export default function DashboardProfessor() {
    return (
          <main className="app-shell">
                <section className="hero-card">
                        <div>
                                  <p className="eyebrow">EduFam</p>p>
                                  <h1>Bom dia, Professor 👋</h1>h1>
                                  <p className="subtitle">A vida escolar na palma da mão.</p>p>
                        </div>div>
                
                        <div className="profile-badge">
                                  <GraduationCap size={24} />
                        </div>div>
                </section>section>
          
                <section className="stats-grid">
                        <StatCard icon={<BookOpen />} title="Turmas" value="4" highlight />
                        <StatCard icon={<Users />} title="Alunos" value="126" />
                        <StatCard icon={<ClipboardCheck />} title="Avaliações" value="2" />
                        <StatCard icon={<BarChart3 />} title="Frequência" value="97%" />
                </section>section>
          
                <section className="section">
                        <div className="section-header">
                                  <h2>Ações rápidas</h2>h2>
                                  <span>Até 3 toques</span>span>
                        </div>div>
                
                        <div className="actions-grid">
                                  <QuickAction
                                                icon={<ClipboardCheck />}
                                                title="Iniciar chamada"
                                                subtitle="Registrar presença"
                                              />
                                  <QuickAction
                                                icon={<FileText />}
                                                title="Lançar notas"
                                                subtitle="Avaliações e trabalhos"
                                              />
                                  <QuickAction
                                                icon={<BookOpen />}
                                                title="Vida Escolar"
                                                subtitle="Histórico do aluno"
                                              />
                                  <QuickAction
                                                icon={<MessageCircle />}
                                                title="Comunicação"
                                                subtitle="Enviar aos pais"
                                              />
                                  <QuickAction
                                                icon={<CalendarDays />}
                                                title="Agenda"
                                                subtitle="Aulas e reuniões"
                                              />
                                  <QuickAction
                                                icon={<BarChart3 />}
                                                title="Relatórios"
                                                subtitle="Turma e aluno"
                                              />
                        </div>div>
                </section>section>
          
                <section className="section">
                        <div className="section-header">
                                  <h2>Próximas aulas</h2>h2>
                                  <span>Hoje</span>span>
                        </div>div>
                
                        <div className="class-card">
                                  <div>
                                              <strong>9º Ano A</strong>strong>
                                              <span>Matemática · 08:00</span>span>
                                  </div>div>
                                  <button>Entrar</button>button>
                        </div>div>
                
                        <div className="class-card">
                                  <div>
                                              <strong>8º Ano B</strong>strong>
                                              <span>Português · 10:00</span>span>
                                  </div>div>
                                  <button>Entrar</button>button>
                        </div>div>
                </section>section>
          </main>main>
        );
}</main>

import { Star, ClipboardCheck, MessageCircle, BookOpen } from "lucide-react";

const eventos = [
  {
        tipo: "Elogio",
        aluno: "João Pedro",
        texto: "Ajudou um colega durante a atividade de Matemática.",
        data: "Hoje, 09:20",
        icon: <Star size={18} />,
  },
  {
        tipo: "Chamada",
        aluno: "9º Ano A",
        texto: "Chamada registrada com 28 presentes e 2 faltas.",
        data: "Hoje, 07:42",
        icon: <ClipboardCheck size={18} />,
  },
  {
        tipo: "Comunicação",
        aluno: "Maria Clara",
        texto: "Comunicado de reunião enviado aos responsáveis.",
        data: "Ontem, 16:10",
        icon: <MessageCircle size={18} />,
  },
  {
        tipo: "Atividade",
        aluno: "8º Ano B",
        texto: "Nova atividade avaliativa cadastrada.",
        data: "Ontem, 10:30",
        icon: <BookOpen size={18} />,
  },
  ];

export default function VidaEscolarTimeline() {
    return (
          <section className="section">
                <div className="section-header">
                        <h2>Vida Escolar</h2>h2>
                        <span>Histórico permanente</span>span>
                </div>div>
          
                <div className="timeline">
                  {eventos.map((evento, index) => (
                      <div className="timeline-item" key={index}>
                                  <div className="timeline-icon">{evento.icon}</div>div>
                      
                                  <div className="timeline-content">
                                                <div className="timeline-head">
                                                                <strong>{evento.tipo}</strong>strong>
                                                                <span>{evento.data}</span>span>
                                                </div>div>
                                  
                                                <p>{evento.texto}</p>p>
                                                <small>{evento.aluno}</small>small>
                                  </div>div>
                      </div>div>
                    ))}
                </div>div>
          </section>section>
        );
}</section>

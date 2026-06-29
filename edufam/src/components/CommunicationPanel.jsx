import { MessageCircle, ShieldCheck, AlertTriangle } from "lucide-react";

const conversas = [
  {
        aluno: "João Pedro",
        tipo: "Recado",
        status: "Atenção",
        limite: "3 de 5 mensagens usadas",
        mensagem: "Responsável informou que o aluno ficou doente.",
  },
  {
        aluno: "Maria Clara",
        tipo: "Comunicado",
        status: "Enviado",
        limite: "Sem resposta permitida",
        mensagem: "Reunião de pais enviada para os responsáveis.",
  },
  ];

export default function CommunicationPanel() {
    return (
          <section className="section">
                <div className="section-header">
                        <h2>Comunicação</h2>h2>
                        <span>Canal oficial</span>span>
                </div>div>
          
                <div className="info-card blue-soft">
                        <ShieldCheck size={22} />
                        <div>
                                  <strong>Conversa protegida</strong>strong>
                                  <span>
                                              O professor conversa com os responsáveis pela EduFam, sem usar seu número pessoal.
                                  </span>span>
                        </div>div>
                </div>div>
          
            {conversas.map((item) => (
                    <div className="communication-card" key={item.aluno}>
                              <div className="communication-top">
                                          <div>
                                                        <strong>{item.aluno}</strong>strong>
                                                        <span>{item.tipo}</span>span>
                                          </div>div>
                              
                                          <span className={item.status === "Atenção" ? "badge warning" : "badge success"}>
                                            {item.status}
                                          </span>span>
                              </div>div>
                    
                              <p>{item.mensagem}</p>p>
                    
                              <div className="communication-footer">
                                          <span>{item.limite}</span>span>
                                          <button>Ver conversa</button>button>
                              </div>div>
                    </div>div>
                  ))}
          
                <div className="info-card warning-soft">
                        <AlertTriangle size={22} />
                        <div>
                                  <strong>Limite inteligente</strong>strong>
                                  <span>
                                              Quando a conversa ficar longa, a EduFam orienta o responsável a procurar a escola.
                                  </span>span>
                        </div>div>
                </div>div>
          
                <button className="primary-button">
                        <MessageCircle size={18} />
                        Novo comunicado
                </button>button>
          </section>section>
        );
}</section>

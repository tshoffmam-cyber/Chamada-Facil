import { X, Lightbulb } from "lucide-react";

export default function FirstAccessTip({ onClose }) {
  return (
    <div className="tip-overlay">
      <div className="tip-card">
        <button className="tip-close" onClick={onClose} aria-label="Fechar tutorial">
          <X size={18} />
        </button>

        <div className="tip-icon">
          <Lightbulb size={24} />
        </div>

        <h3>Como fazer a chamada</h3>

        <p>
          Toque no botao ao lado do aluno para alternar o status da presenca.
        </p>

        <div className="tip-steps">
          <span>1 toque: Presente</span>
          <span>2 toques: Falta</span>
          <span>3 toques: Justificado</span>
          <span>4 toques: Limpar</span>
        </div>

        <button className="primary-button" onClick={onClose}>
          Entendi, nao mostrar agora
        </button>
      </div>
    </div>
  );
}

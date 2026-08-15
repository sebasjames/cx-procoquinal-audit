import React from 'react';
import { X, Cpu, Calculator, Lightbulb, Code2 } from 'lucide-react';
import './TechModal.css';
import type { ModuleDetail } from './ModuleDetailsData';

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleData: ModuleDetail | null;
  theme?: 'blue' | 'purple';
}

const TechModal: React.FC<TechModalProps> = ({ isOpen, onClose, moduleData, theme = 'blue' }) => {
  if (!isOpen || !moduleData) return null;

  const isPurple = theme === 'purple';
  const themeClass = isPurple ? 'theme-purple' : 'theme-blue';

  return (
    <div className="tech-modal-overlay" onClick={onClose}>
      <div className={`tech-modal-content ${themeClass}`} onClick={(e) => e.stopPropagation()}>
        
        <button className="tech-modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="tech-modal-header">
          <h2>{moduleData.title}</h2>
          <div className="tech-badge">Deep Dive Técnico</div>
        </div>

        <div className="tech-modal-body">
          {/* Description Section */}
          <div className="tech-section">
            <div className="section-title">
              <Lightbulb size={20} />
              <h3>¿Qué hace? (Lógica de Negocio)</h3>
            </div>
            <p>{moduleData.description}</p>
          </div>

          {/* Architecture Section */}
          <div className="tech-section">
            <div className="section-title">
              <Cpu size={20} />
              <h3>Arquitectura & Stack</h3>
            </div>
            <p>{moduleData.architecture}</p>
          </div>

          {/* Logic/Math Section */}
          <div className="tech-section">
            <div className="section-title">
              <Calculator size={20} />
              <h3>Lógica Matemática / Flujo</h3>
            </div>
            <pre className="tech-code-block">
              <code>{moduleData.logic}</code>
            </pre>
          </div>

          {/* Example Section */}
          <div className="tech-section">
            <div className="section-title">
              <Code2 size={20} />
              <h3>Caso de Uso (Ejemplo Operativo)</h3>
            </div>
            <div className="tech-example-box">
              <p>{moduleData.example}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechModal;

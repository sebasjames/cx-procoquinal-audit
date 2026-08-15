import React from 'react';
import './ProjectTimelines.css';

const ProjectTimelines = () => {
  return (
    <div className="gantt-container">
      <div className="gantt-header">
        <h3>Cronograma de Ejecución (Diagrama de Gantt)</h3>
        <p>Visión cronológica unificada del desarrollo desde el Día 0 hasta el Cierre.</p>
      </div>

      <div className="gantt-chart">
        {/* Left Labels */}
        <div className="gantt-labels">
          <div className="gantt-row-label">
            <h4>Etapa 1</h4>
            <span>Cerebro Operativo</span>
          </div>
          <div className="gantt-row-label">
            <h4>Etapa 2</h4>
            <span>Inteligencia & Decisión</span>
          </div>
        </div>

        {/* Tracks Area */}
        <div className="gantt-tracks-container">
          
          {/* Axis Labels */}
          <div className="gantt-axis">
            <span style={{ left: '0%', transform: 'translateX(0)' }}>18 Mar</span>
            <span style={{ left: '24.0%' }}>May</span>
            <span style={{ left: '41.3%' }}>Jun</span>
            <span style={{ left: '58.1%' }}>Jul</span>
            <span style={{ left: '75.4%' }}>Ago</span>
            <span style={{ left: '92.7%' }}>Sep</span>
            <span style={{ left: '100%', transform: 'translateX(-100%)', color: '#10b981' }}>13 Sep</span>
          </div>

          {/* Grid Lines */}
          <div className="gantt-grid-line" style={{ left: '24.0%' }}></div>
          <div className="gantt-grid-line" style={{ left: '41.3%' }}></div>
          <div className="gantt-grid-line" style={{ left: '58.1%' }}></div>
          <div className="gantt-grid-line" style={{ left: '75.4%' }}></div>
          <div className="gantt-grid-line" style={{ left: '92.7%' }}></div>

          {/* Today Line */}
          <div className="gantt-today-line" style={{ left: '82.7%' }}>
            <div className="today-label">Hoy (14 Ago)</div>
          </div>

          {/* Track 1: Etapa 1 */}
          <div className="gantt-row">
            <div className="gantt-track-area">
              {/* Etapa 1 bar: Starts at 0%, spans to 100%. Progress is at 82.7% */}
              <div className="gantt-bar phase1" style={{ left: '0%', width: '100%' }}>
                  <span className="bar-progress" style={{ width: '82.7%' }}></span>
              </div>
            </div>
          </div>

          {/* Track 2: Etapa 2 */}
          <div className="gantt-row">
            <div className="gantt-track-area">
              {/* Etapa 2 bar: Starts June 11 (46.9%), ends Sept 13. Width is 53.1%. 
                  Current progress inside this specific bar is 67.4% */}
              <div className="gantt-bar phase2" style={{ left: '46.9%', width: '53.1%' }}>
                  <span className="bar-progress" style={{ width: '67.4%' }}></span>
              </div>
              {/* Milestone to indicate the start date of Etapa 2 */}
              <div className="gantt-milestone" style={{ left: '46.9%' }}>
                 <div className="milestone-dot"></div>
                 <span className="milestone-text">11 Jun</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="timeline-context">
        <strong>* Nota Estratégica:</strong> La Etapa 2 fue iniciada de forma anticipada en paralelo a la Etapa 1 (11 de Junio) ante la necesidad urgente de implementar modelos de Inteligencia Artificial para procesos contables, lectura de documentos (OCR) y cruces automatizados de inventario.
      </div>
    </div>
  );
};

export default ProjectTimelines;

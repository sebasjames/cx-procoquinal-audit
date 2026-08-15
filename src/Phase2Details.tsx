import React, { useState } from 'react';
import { 
  LineChart, 
  Target, 
  ShoppingCart, 
  TrendingDown, 
  DollarSign, 
  BrainCircuit, 
  BellRing, 
  Network 
} from 'lucide-react';
import './Phase1Details.css';
import TechModal from './TechModal';
import { moduleDetailsData } from './ModuleDetailsData';
import type { ModuleDetail } from './ModuleDetailsData';

const modulesPhase2 = [
  {
    icon: <LineChart size={24} />,
    title: "Forecast & Planning",
    description: "Proyección basada en el Event Log de la Etapa 1. Identifica patrones de comportamiento por producto, canal y cliente. Reduce la incertidumbre operativa en lugar de adivinar matemáticamente."
  },
  {
    icon: <Target size={24} />,
    title: "Planning Operativo",
    description: "Traduce proyecciones en preparación concreta. Permite simular escenarios aislados (ej. crecimiento del 15% en demanda) para pensar antes de actuar sin afectar la operación real."
  },
  {
    icon: <ShoppingCart size={24} />,
    title: "Purchasing Intelligence",
    description: "Recomendaciones de compra basadas en lead times reales y consumo histórico. Cada sugerencia incluye una explicación explícita de su riesgo y el impacto de no ejecutarla."
  },
  {
    icon: <TrendingDown size={24} />,
    title: "Inventory Drain",
    description: "Análisis del desgaste invisible del stock. Identifica productos aparentemente sanos que entrarán en riesgo de quiebre en el corto plazo bajo ciertas combinaciones de producción."
  },
  {
    icon: <DollarSign size={24} />,
    title: "Impacto Financiero Proyectado",
    description: "Capa de traducción financiera. Conecta decisiones con capital inmovilizado, ventas perdidas evitables y presión de caja, alineando operación y finanzas bajo un lenguaje común."
  },
  {
    icon: <BrainCircuit size={24} />,
    title: "IA Contextual y Explainability",
    description: "Inteligencia causal que no actúa como caja negra. Explica por qué ocurrió un quiebre y qué señales previas existían. Genera confianza interna justificando siempre el porqué."
  },
  {
    icon: <BellRing size={24} />,
    title: "Auto-Insights y Alertas Proactivas",
    description: "Alertas diseñadas para interrumpir solo cuando importa. Advierte proactivamente sobre combinaciones de pedidos peligrosas o capital inmovilizado sin rotación efectiva."
  },
  {
    icon: <Network size={24} />,
    title: "Decision Memory y Gobierno",
    description: "Memoria histórica de recomendaciones. Registra si una recomendación de IA fue aceptada o rechazada por el humano, permitiendo auditar y mejorar el modelo constantemente."
  }
];

const Phase2Details = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);

  return (
    <section className="phase1-details-section">
      <div className="phase1-header">
        <h2>Detalles Técnicos: Etapa 2</h2>
        <p>Evolución Natural (System 2.0): Inteligencia, Predicción y Decisión basada en datos.</p>
        <p className="dummy-description" style={{ marginTop: '12px', fontSize: '15px', color: '#4b5563', backgroundColor: '#eff6ff', padding: '12px', borderRadius: '8px', display: 'inline-block', maxWidth: '800px', borderLeft: '4px solid #3b82f6' }}>
          <strong>En palabras sencillas:</strong> Esta es la parte "inteligente" o el "cerebro matemático". Aquí verás cómo el programa dejará de ser solo una herramienta de registro para convertirse en un asistente que te avisa cuándo comprar, qué productos se van a agotar pronto y cómo evitar perder dinero.
        </p>
      </div>
      <div className="phase1-grid">
        {modulesPhase2.map((mod, index) => (
          <div key={index} className="module-card" onClick={() => setSelectedModule(moduleDetailsData[mod.title])} style={{ cursor: 'pointer' }}>
            <div className="module-icon-wrapper" style={{ background: '#eff6ff', color: '#3b82f6' }}>
              {mod.icon}
            </div>
            <h3 className="module-title">{mod.title}</h3>
            <p className="module-desc">{mod.description}</p>
          </div>
        ))}
      </div>
      <TechModal 
        isOpen={!!selectedModule} 
        onClose={() => setSelectedModule(null)} 
        moduleData={selectedModule} 
        theme="purple" 
      />
    </section>
  );
};

export default Phase2Details;

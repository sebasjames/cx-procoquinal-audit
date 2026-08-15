import React, { useState } from 'react';
import { 
  Database, 
  Layers, 
  Settings, 
  ListChecks, 
  MonitorSmartphone, 
  FileClock, 
  Cloud, 
  Cpu, 
  Link 
} from 'lucide-react';
import './Phase1Details.css';
import TechModal from './TechModal';
import { moduleDetailsData } from './ModuleDetailsData';
import type { ModuleDetail } from './ModuleDetailsData';

const modules = [
  {
    icon: <Database size={24} />,
    title: "Inventario Maestro (UI)",
    description: "Definición semántica inequívoca del SKU. Elimina la ambigüedad, definiendo unidades, conversiones y presentaciones formales. Existe un solo número de verdad operativo."
  },
  {
    icon: <Layers size={24} />,
    title: "Control de Inventario Profundo (UI)",
    description: "Registro de cada entrada, salida o traslado como un evento explícito (con actor y timestamp). Elimina las fricciones y correcciones 'silenciosas' post-facto."
  },
  {
    icon: <Settings size={24} />,
    title: "Producción y Lotes (UI)",
    description: "Gestión de flujos de trazabilidad validados. Manejo de colas de asignación para la transformación de materias primas a producto terminado."
  },
  {
    icon: <ListChecks size={24} />,
    title: "ATP y Asignación Explicable (UI)",
    description: "Available To Promise calculado de forma explicable (inventario físico menos compromisos). Asignación por colas priorizadas según margen y SLA."
  },
  {
    icon: <MonitorSmartphone size={24} />,
    title: "UI Operativa (Punto de Venta)",
    description: "Interfaz guiada tipo 'McDonald's Digital' donde el sistema piensa por el empleado. Generación de eventos claros, impidiendo avanzar sin pasos previos para reducir errores."
  },
  {
    icon: <FileClock size={24} />,
    title: "Event Log / Activity Stream (UI)",
    description: "Memoria forense y columna vertebral inmutable. Registra qué cambió, quién actuó y el estado previo/nuevo para futuras implementaciones de IA y auditoría."
  },
  {
    icon: <Cloud size={24} />,
    title: "Arquitectura Serverless y Base de Datos",
    description: "Entorno sin servidores físicos críticos. Modelo desacoplado y de alta disponibilidad donde los componentes individuales no detienen la operación global si uno falla."
  },
  {
    icon: <Cpu size={24} />,
    title: "Núcleo Operativo (State Engine)",
    description: "Capa lógica Event-Driven que modela la realidad física en eventos explícitos. Única fuente de autoridad operativa, desplazando a herramientas genéricas."
  },
  {
    icon: <Link size={24} />,
    title: "DIAN Adapter (Integración SIIGO)",
    description: "Desacople total de la facturación. El evento se envía de forma asíncrona a SIIGO. Si el proveedor falla, el sistema reintenta silenciosamente sin bloquear la venta ni la operación logística."
  }
];

const Phase1Details = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);

  return (
    <section className="phase1-details-section">
      <div className="phase1-header">
        <h2>Detalles Técnicos: Etapa 1</h2>
        <p>A continuación se detalla la arquitectura y el cerebro operativo del núcleo de Avalon (System 1.0).</p>
        <p className="dummy-description" style={{ marginTop: '12px', fontSize: '15px', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', display: 'inline-block', maxWidth: '800px', borderLeft: '4px solid #3b82f6' }}>
          <strong>En palabras sencillas:</strong> Aquí verás las piezas fundamentales del "motor" del sistema. Son los módulos que hacen que la empresa funcione sin depender de hojas de cálculo, abarcando desde el control exacto de qué hay en la bodega, hasta cómo se procesan las ventas en las cajas.
        </p>
      </div>
      <div className="phase1-grid">
        {modules.map((mod, index) => (
          <div key={index} className="module-card" onClick={() => setSelectedModule(moduleDetailsData[mod.title])} style={{ cursor: 'pointer' }}>
            <div className="module-icon-wrapper">
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
        theme="blue" 
      />
    </section>
  );
};

export default Phase1Details;

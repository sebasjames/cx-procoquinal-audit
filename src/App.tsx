import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import CalendarCarousel from './CalendarCarousel';
import EquipmentTracker from './EquipmentTracker';
import Phase1Details from './Phase1Details';
import Phase2Details from './Phase2Details';
import EngineeringMetrics from './EngineeringMetrics';
import ProjectTimelines from './ProjectTimelines';
import AvalonGallery from './AvalonGallery';
import BillingTimeline from './BillingTimeline';
import MasterGantt from './MasterGantt';
import NextSteps from './NextSteps';
import FinalBook from './FinalBook';
import './index.css';

const dataEtapa1 = [
  { name: 'Módulos Construidos (UI & Backend)', value: 90 },
  { name: 'Integración SIIGO Faltante', value: 10 },
];

const dataEtapa2 = [
  { name: 'Módulos Construidos (UI)', value: 85 },
  { name: 'Lógica/Backend Faltante', value: 15 },
];

const COLORS = ['#2563eb', '#e5e7eb'];
const COLORS2 = ['#16a34a', '#e5e7eb'];

const tasksEtapa1 = [
  { name: 'Inventario Maestro (UI)', status: 'done' },
  { name: 'Control de Inventario profundo (UI)', status: 'done' },
  { name: 'Producción y Lotes (UI)', status: 'done' },
  { name: 'ATP y Asignación explicable (UI)', status: 'done' },
  { name: 'UI Operativa (Punto de Venta)', status: 'done' },
  { name: 'Event Log / Activity Stream (UI)', status: 'done' },
  { name: 'Arquitectura Serverless y Base de Datos', status: 'done' },
  { name: 'Núcleo Operativo (State Engine Backend)', status: 'done' },
  { name: 'DIAN Adapter (Integración SIIGO)', status: 'pending' },
];

const tasksEtapa2 = [
  { name: 'Forecast y Planning (UI)', status: 'done' },
  { name: 'Purchasing Intelligence (UI)', status: 'done' },
  { name: 'Inventory Drain & Simulación (UI)', status: 'done' },
  { name: 'Impacto financiero proyectado (UI)', status: 'done' },
  { name: 'Data Governance (UI)', status: 'done' },
  { name: 'IA Contextual (Integración básica Gemini)', status: 'done' },
  { name: 'Decision Memory (Base de datos IA)', status: 'pending' },
  { name: 'Auto-insights y alertas automáticas', status: 'done' },
];

const TaskList = ({ tasks }: { tasks: any[] }) => (
  <ul className="task-list">
    {tasks.map((task, i) => (
      <li key={i} className={task.status === 'done' ? 'task-done' : 'task-pending'}>
        {task.status === 'done' ? (
          <CheckCircle2 className="icon-done" size={20} />
        ) : (
          <CircleDashed className="icon-pending" size={20} />
        )}
        <span>{task.name}</span>
      </li>
    ))}
  </ul>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('avalon_auth') === 'true'
  );
  const [password, setPassword] = useState('');

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', padding: '1rem' }}>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '0.5rem', color: '#0f172a', fontSize: '1.5rem' }}>Acceso Restringido</h2>
          <p style={{ marginBottom: '2rem', color: '#64748b', fontSize: '0.95rem' }}>Ingrese la contraseña para visualizar la auditoría.</p>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (password === 'Avalon_2028!') {
                  setIsAuthenticated(true);
                  localStorage.setItem('avalon_auth', 'true');
                } else {
                  alert('Contraseña incorrecta');
                }
              }
            }}
            style={{ padding: '0.75rem', width: '100%', marginBottom: '1.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem' }}
            placeholder="Contraseña"
          />
          <button 
            onClick={() => {
              if (password === 'Avalon_2028!') {
                setIsAuthenticated(true);
                localStorage.setItem('avalon_auth', 'true');
              } else {
                alert('Contraseña incorrecta');
              }
            }}
            style={{ padding: '0.75rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="container">
      <header className="header">
        <h1>Auditoria Ejecutiva: Procoquinal - Avalon AI</h1>
      </header>

      <section className="intro">
        <h2>Resumen del Proyecto</h2>
        <p>
          Este panel evalúa el estado real del desarrollo del sistema <strong>Procoquinal OS</strong>. 
          A continuación, comparamos lo que se prometió en las etapas iniciales de la cotización 
          frente al avance real en código, midiendo la brecha ("gap") entre la Interfaz construida y el Backend restante.
        </p>
      </section>

      <section className="charts-section">
        <div className="chart-card">
          <h3>Avance: Etapa 1 (Cerebro Operativo)</h3>
          <p className="chart-desc">Estado de módulos base como Inventario Maestro, ATP y Control Profundo.</p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataEtapa1}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Label value={`${dataEtapa1[0].value}%`} position="center" fill="#000000" style={{ fontSize: '28px', fontWeight: 'bold' }} />
                  {dataEtapa1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="task-container">
            <h4>Detalle de Tareas (Según Cotización)</h4>
            <TaskList tasks={tasksEtapa1} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Avance: Etapa 2 (Inteligencia y Decisión)</h3>
          <p className="chart-desc">Estado de módulos avanzados como Forecast, Purchasing y Financiero.</p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataEtapa2}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Label value={`${dataEtapa2[0].value}%`} position="center" fill="#000000" style={{ fontSize: '28px', fontWeight: 'bold' }} />
                  {dataEtapa2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="task-container">
            <h4>Detalle de Tareas (Según Cotización)</h4>
            <TaskList tasks={tasksEtapa2} />
          </div>
        </div>
      </section>
      
      <ProjectTimelines />

      <EngineeringMetrics />

      <section className="tech-details-section">
        <Phase1Details />
        <Phase2Details />
      </section>

      <AvalonGallery />

    </div>
    <div className="full-width-section">
      <CalendarCarousel />
    </div>
    <div className="full-width-section" style={{ backgroundColor: '#ffffff', padding: '1px 0 40px 0' }}>
      <EquipmentTracker />
    </div>
    <div className="full-width-section" style={{ padding: '40px 0' }}>
      <MasterGantt />
    </div>
    <div className="container">
      <NextSteps />
    </div>
    <div className="full-width-section" style={{ backgroundColor: '#f8fafc', padding: '40px 0' }}>
      <BillingTimeline />
    </div>
    {/* 
    <div className="full-width-section" style={{ backgroundColor: '#ffffff', padding: '40px 0' }}>
      <FinalBook />
    </div>
    */}

    <footer style={{ backgroundColor: '#f8fafc', padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px', marginBottom: '20px' }}>
        <img src={`${import.meta.env.BASE_URL}logos/Scarpian%20Logo.webp`} alt="Scarpian AI" style={{ height: '45px', objectFit: 'contain' }} />
        <div style={{ width: '2px', height: '40px', backgroundColor: '#cbd5e1' }}></div>
        <img src={`${import.meta.env.BASE_URL}logos/Eficia%20Logo.webp`} alt="Eficia" style={{ height: '55px', objectFit: 'contain' }} />
      </div>
      <p style={{ margin: 0, fontSize: '16px', color: '#1e293b', letterSpacing: '1px', fontWeight: 600 }}>
        contacto@scarpianai.com
      </p>
      <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#475569' }}>
        © 2026 Reservados todos los derechos.
      </p>
    </footer>

    </>
  );
}

export default App;

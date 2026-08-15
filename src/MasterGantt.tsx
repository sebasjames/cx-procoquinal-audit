import React, { useState, useRef, useEffect } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import type { Task } from 'gantt-task-react';
import { Maximize, Minimize } from 'lucide-react';
import 'gantt-task-react/dist/index.css';
import './MasterGantt.css';

// Helper to easily create dates
const d = (year: number, month: number, day: number) => new Date(year, month - 1, day);

const MasterGantt: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      // Trigger a resize to fix canvas rendering after fullscreen animation
      setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      if (wrapperRef.current) {
        await wrapperRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      await document.exitFullscreen();
    }
  };

  const tasks: Task[] = [
    // ==========================================
    // GRUPO 1: COTIZACIÓN (Promesa Comercial)
    // ==========================================
    {
      start: d(2026, 3, 13),
      end: d(2026, 8, 28),
      name: 'PROYECTO ORIGINAL (PLAN DE 24 SEMANAS)',
      id: 'Promesa',
      type: 'project',
      progress: 100,
      hideChildren: false,
    },
    {
      start: d(2026, 3, 13),
      end: d(2026, 3, 27),
      name: 'Fundaciones y alineación',
      id: 'Promesa_1',
      project: 'Promesa',
      type: 'task',
      progress: 100,
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 3, 27),
      end: d(2026, 4, 10),
      name: 'Núcleo operativo (state engine)',
      id: 'Promesa_2',
      project: 'Promesa',
      type: 'task',
      progress: 100,
      dependencies: ['Promesa_1'],
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 4, 10),
      end: d(2026, 4, 24),
      name: 'Inventario Maestro y Control Profundo',
      id: 'Promesa_3',
      project: 'Promesa',
      type: 'task',
      progress: 100,
      dependencies: ['Promesa_2'],
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 4, 24),
      end: d(2026, 5, 8),
      name: 'Producción, Lotes y ATP',
      id: 'Promesa_4',
      project: 'Promesa',
      type: 'task',
      progress: 100,
      dependencies: ['Promesa_3'],
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 5, 8),
      end: d(2026, 5, 22),
      name: 'UI Operativa y Event Log',
      id: 'Promesa_5',
      project: 'Promesa',
      type: 'task',
      progress: 100,
      dependencies: ['Promesa_4'],
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 5, 22),
      end: d(2026, 6, 5),
      name: 'Integración fiscal y estabilización',
      id: 'Promesa_6',
      project: 'Promesa',
      type: 'task',
      progress: 0,
      dependencies: ['Promesa_5'],
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 6, 5),
      end: d(2026, 7, 3),
      name: 'Go-live y acompañamiento (System 1.0)',
      id: 'Promesa_7',
      project: 'Promesa',
      type: 'task',
      progress: 0,
      dependencies: ['Promesa_6'],
      styles: { backgroundColor: '#3b82f6', progressColor: '#1d4ed8' },
    },
    {
      start: d(2026, 7, 3),
      end: d(2026, 8, 28),
      name: 'Etapa 2 - System 2.0 (Inteligencia Artificial)',
      id: 'Promesa_8',
      project: 'Promesa',
      type: 'task',
      progress: 0,
      dependencies: ['Promesa_7'],
      styles: { backgroundColor: '#8b5cf6', progressColor: '#6d28d9' },
    },

    // ==========================================
    // GRUPO 2: REALIDAD (MÓDULOS DESARROLLADOS)
    // ==========================================
    {
      start: d(2026, 3, 13),
      end: d(2026, 8, 14),
      name: 'TRABAJO REAL EJECUTADO',
      id: 'Realidad',
      type: 'project',
      progress: 85,
      hideChildren: false,
    },
    {
      start: d(2026, 3, 13),
      end: d(2026, 3, 30),
      name: 'Módulo: Inventario Maestro y Control',
      id: 'Real_1',
      project: 'Realidad',
      type: 'task',
      progress: 100,
      styles: { backgroundColor: '#10b981', progressColor: '#047857' },
    },
    {
      start: d(2026, 3, 20),
      end: d(2026, 4, 15),
      name: 'Módulo: Producción y Lotes',
      id: 'Real_2',
      project: 'Realidad',
      type: 'task',
      progress: 100,
      styles: { backgroundColor: '#10b981', progressColor: '#047857' },
    },
    {
      start: d(2026, 4, 1),
      end: d(2026, 4, 30),
      name: 'Módulo: UI Operativa (Punto Venta)',
      id: 'Real_3',
      project: 'Realidad',
      type: 'task',
      progress: 100,
      styles: { backgroundColor: '#10b981', progressColor: '#047857' },
    },
    {
      start: d(2026, 5, 1),
      end: d(2026, 6, 15),
      name: 'Módulo: Forecast y Purchasing Intelligence',
      id: 'Real_4',
      project: 'Realidad',
      type: 'task',
      progress: 100,
      styles: { backgroundColor: '#10b981', progressColor: '#047857' },
    },
    {
      start: d(2026, 6, 10),
      end: d(2026, 7, 20),
      name: 'Módulo: IA Contextual y Decision Memory',
      id: 'Real_5',
      project: 'Realidad',
      type: 'task',
      progress: 50,
      styles: { backgroundColor: '#10b981', progressColor: '#047857' },
    },
    {
      start: d(2026, 7, 10),
      end: d(2026, 8, 14),
      name: 'Estabilización, Auditoría y Preparación de Pruebas',
      id: 'Real_6',
      project: 'Realidad',
      type: 'task',
      progress: 40,
      styles: { backgroundColor: '#10b981', progressColor: '#047857' },
    },

    // ==========================================
    // GRUPO 3: BITÁCORA Y EVENTOS
    // ==========================================
    {
      start: d(2026, 3, 18),
      end: d(2026, 7, 11),
      name: 'BITÁCORA DE INCIDENCIAS',
      id: 'Eventos',
      type: 'project',
      progress: 100,
      hideChildren: false,
    },
    {
      start: d(2026, 3, 18),
      end: d(2026, 3, 18),
      name: 'Reunión Presencial de Arquitectura',
      id: 'Ev_1',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },
    {
      start: d(2026, 5, 6),
      end: d(2026, 5, 6),
      name: 'Alerta: Servidores Locales Caídos',
      id: 'Ev_2',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },
    {
      start: d(2026, 5, 14),
      end: d(2026, 5, 14),
      name: 'Reunión SIIGO (Evaluación API)',
      id: 'Ev_3',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },
    {
      start: d(2026, 5, 18),
      end: d(2026, 5, 18),
      name: 'Entrega de Máquina (Impresión)',
      id: 'Ev_4',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },
    {
      start: d(2026, 6, 2),
      end: d(2026, 6, 2),
      name: 'Ajuste de Requerimiento (Lotes)',
      id: 'Ev_5',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },
    {
      start: d(2026, 7, 2),
      end: d(2026, 7, 2),
      name: 'Incidencia Hardware Escáneres',
      id: 'Ev_6',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },
    {
      start: d(2026, 7, 11),
      end: d(2026, 7, 11),
      name: 'Reunión Contabilidad (Desfase)',
      id: 'Ev_7',
      project: 'Eventos',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#ef4444', progressColor: '#b91c1c' },
    },

    // ==========================================
    // GRUPO 4: FACTURACIÓN
    // ==========================================
    {
      start: d(2026, 3, 13),
      end: d(2026, 9, 13),
      name: 'FLUJO DE CAJA (FACTURACIÓN)',
      id: 'Finanzas',
      type: 'project',
      progress: 100,
      hideChildren: false,
    },
    {
      start: d(2026, 3, 13),
      end: d(2026, 3, 13),
      name: 'Pago Inicial (A y B)',
      id: 'Fin_1',
      project: 'Finanzas',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#f59e0b', progressColor: '#d97706' },
    },
    {
      start: d(2026, 5, 5),
      end: d(2026, 5, 5),
      name: 'Pago 2 - A',
      id: 'Fin_2',
      project: 'Finanzas',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#f59e0b', progressColor: '#d97706' },
    },
    {
      start: d(2026, 5, 7),
      end: d(2026, 5, 7),
      name: 'Pago 2 - B',
      id: 'Fin_3',
      project: 'Finanzas',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#f59e0b', progressColor: '#d97706' },
    },
    {
      start: d(2026, 5, 28),
      end: d(2026, 5, 28),
      name: 'Tercer Pago A',
      id: 'Fin_4',
      project: 'Finanzas',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#f59e0b', progressColor: '#d97706' },
    },
    {
      start: d(2026, 7, 3),
      end: d(2026, 7, 3),
      name: 'Tercer Pago B (Remanente)',
      id: 'Fin_5',
      project: 'Finanzas',
      type: 'milestone',
      progress: 100,
      styles: { backgroundColor: '#f59e0b', progressColor: '#d97706' },
    },
    {
      start: d(2026, 7, 13),
      end: d(2026, 7, 13),
      name: 'Factura Julio (Pendiente)',
      id: 'Fin_6',
      project: 'Finanzas',
      type: 'milestone',
      progress: 0,
      styles: { backgroundColor: '#9ca3af', progressColor: '#4b5563' },
    },
    {
      start: d(2026, 8, 13),
      end: d(2026, 8, 13),
      name: 'Factura Agosto (Pendiente)',
      id: 'Fin_7',
      project: 'Finanzas',
      type: 'milestone',
      progress: 0,
      styles: { backgroundColor: '#9ca3af', progressColor: '#4b5563' },
    },
    {
      start: d(2026, 9, 13),
      end: d(2026, 9, 13),
      name: 'Entrega Final (Pendiente)',
      id: 'Fin_8',
      project: 'Finanzas',
      type: 'milestone',
      progress: 0,
      styles: { backgroundColor: '#9ca3af', progressColor: '#4b5563' },
    },

    // ==========================================
    // GRUPO 5: SIGUIENTES PASOS (ROADMAP DE CIERRE)
    // ==========================================
    {
      start: d(2026, 8, 14),
      end: d(2026, 9, 15),
      name: 'ROADMAP DE CIERRE (PRÓXIMOS PASOS)',
      id: 'Roadmap',
      type: 'project',
      progress: 0,
      hideChildren: false,
    },
    {
      start: d(2026, 8, 14),
      end: d(2026, 8, 18),
      name: 'Paso 1: Sinergia Contable y Laboratorio',
      id: 'Road_1',
      project: 'Roadmap',
      type: 'task',
      progress: 0,
      styles: { backgroundColor: '#0ea5e9', progressColor: '#0284c7' },
    },
    {
      start: d(2026, 8, 19),
      end: d(2026, 8, 23),
      name: 'Paso 2: Infraestructura y Capacitación',
      id: 'Road_2',
      project: 'Roadmap',
      type: 'task',
      progress: 0,
      dependencies: ['Road_1'],
      styles: { backgroundColor: '#a855f7', progressColor: '#7e22ce' },
    },
    {
      start: d(2026, 8, 24),
      end: d(2026, 8, 29),
      name: 'Paso 3: Pruebas y Migración de Datos',
      id: 'Road_3',
      project: 'Roadmap',
      type: 'task',
      progress: 0,
      dependencies: ['Road_2'],
      styles: { backgroundColor: '#f59e0b', progressColor: '#d97706' },
    },
    {
      start: d(2026, 8, 30),
      end: d(2026, 9, 8),
      name: 'Paso 4: Despliegue Escalonado (Go-Live)',
      id: 'Road_4',
      project: 'Roadmap',
      type: 'task',
      progress: 0,
      dependencies: ['Road_3'],
      styles: { backgroundColor: '#22c55e', progressColor: '#15803d' },
    },
    {
      start: d(2026, 9, 9),
      end: d(2026, 9, 15),
      name: 'Paso 5: Post-Entrega y Seguimiento',
      id: 'Road_5',
      project: 'Roadmap',
      type: 'task',
      progress: 0,
      dependencies: ['Road_4'],
      styles: { backgroundColor: '#64748b', progressColor: '#475569' },
    },
  ];

  return (
    <section ref={wrapperRef} className="master-gantt-wrapper">
      <div className="master-gantt-header">
        <div className="master-gantt-header-text">
          <h2>Cronograma Maestro (Macro-Diagrama)</h2>
          <p>Unificación de la propuesta comercial, desarrollo real, hitos logísticos y facturación.</p>
        </div>
        
        <div className="gantt-controls">
          <button 
            className={`gantt-btn ${viewMode === ViewMode.Day ? 'active' : ''}`} 
            onClick={() => setViewMode(ViewMode.Day)}
          >
            Días
          </button>
          <button 
            className={`gantt-btn ${viewMode === ViewMode.Week ? 'active' : ''}`} 
            onClick={() => setViewMode(ViewMode.Week)}
          >
            Semanas
          </button>
          <button 
            className={`gantt-btn ${viewMode === ViewMode.Month ? 'active' : ''}`} 
            onClick={() => setViewMode(ViewMode.Month)}
          >
            Meses
          </button>
          <button 
            className="gantt-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '20px', backgroundColor: '#0f172a', color: 'white' }}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <><Minimize size={16} /> Salir de Pantalla Completa</>
            ) : (
              <><Maximize size={16} /> Pantalla Completa (F11)</>
            )}
          </button>
        </div>
      </div>

      <div className="gantt-container-box">
        <Gantt 
          tasks={tasks} 
          viewMode={viewMode} 
          listCellWidth={isFullscreen ? "300px" : "250px"}
          columnWidth={viewMode === ViewMode.Week ? 150 : viewMode === ViewMode.Month ? 200 : 60}
          ganttHeight={isFullscreen ? window.innerHeight - 80 : 750}
          locale="es"
          projectProgressColor="#1e293b"
          projectProgressSelectedColor="#0f172a"
          projectBackgroundColor="#e2e8f0"
          projectBackgroundSelectedColor="#cbd5e1"
        />
      </div>
    </section>
  );
};

export default MasterGantt;

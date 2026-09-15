import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import './Pruebas.css';

const testData = [
  {
    session: 1,
    title: "Núcleo Operativo y Control de Inventarios",
    focus: "Validar la columna vertebral física de la operación, asegurando que no existan desfases entre existencias reales, movimientos de bodega y los registros en SIIGO.",
    groups: [
      {
        groupTitle: "Revisión de parametrización y catálogo",
        tasks: [
          "Estructura de bodegas, ubicaciones y control de referencias (materias primas vs. producto terminado).",
          "Validación de unidades de medida, lotes y trazabilidad operativa."
        ]
      },
      {
        groupTitle: "Pruebas de movimientos en bodega",
        tasks: [
          "Entradas de mercancía, traslados entre bodegas y salidas por consumo o despacho.",
          "Ajustes de inventario y validación del stock en tiempo real."
        ]
      },
      {
        groupTitle: "Integración y flujo con SIIGO",
        tasks: [
          "Verificación de impacto contable/operativo del inventario hacia SIIGO.",
          "Revisión de alertas de stock mínimo y control de existencias para evitar inventarios fantasma."
        ]
      }
    ]
  },
  {
    session: 2,
    title: "Gestión Comercial y CRM",
    focus: "Probar la agilidad de la fuerza de ventas, el control de prospectos/clientes y la trazabilidad de cotizaciones desde dispositivos comerciales.",
    groups: [
      {
        groupTitle: "Administración de cuentas y clientes",
        tasks: [
          "Ficha integral de cliente (datos comerciales, condiciones asignadas y estado).",
          "Segmentación, estados de cuenta y visualización de cupos/cartera básica antes de la venta."
        ]
      },
      {
        groupTitle: "Ciclo de prospección y cotización",
        tasks: [
          "Creación y seguimiento de cotizaciones en el sistema.",
          "Automatización de alertas comerciales (seguimientos pendientes, cotizaciones sin respuesta).",
          "Verificación de consulta de inventario disponible en tiempo real por parte del comercial durante la cotización."
        ]
      }
    ]
  },
  {
    session: 3,
    title: "Ciclo Transaccional (Venta, Facturación y Mezcla)",
    focus: "Ejecutar el flujo de punta a punta: desde la aprobación del pedido hasta la transformación de producto y la generación de la factura.",
    groups: [
      {
        groupTitle: "Procesamiento de órdenes y pedidos",
        tasks: [
          "Conversión de cotización a pedido en firme.",
          "Validación de listas de precios, descuentos y políticas comerciales."
        ]
      },
      {
        groupTitle: "Módulo de formulación / mezcla (producción ligera)",
        tasks: [
          "Configuración y descarga de componentes para mezclas o productos combinados.",
          "Explosión de insumos: verificar el descuento automático de materias primas e ingreso del producto terminado resultante."
        ]
      },
      {
        groupTitle: "Facturación y cierre de venta",
        tasks: [
          "Emisión de factura y validación de enlace transaccional con SIIGO.",
          "Validación de afectación simultánea: descuento definitivo de inventario + registro de cartera/facturación."
        ]
      }
    ]
  },
  {
    session: 4,
    title: "Analítica, Datos, Informes y Proyección",
    focus: "Probar la visibilidad gerencial, la integridad de los datos generados durante las pruebas y los tableros de control para la toma de decisiones.",
    groups: [
      {
        groupTitle: "Reportes operativos y comerciales",
        tasks: [
          "Informes de ventas por línea, rentabilidad preliminar por cliente/producto y desempeño comercial.",
          "Reportes de rotación de inventarios, valorización y mermas."
        ]
      },
      {
        groupTitle: "Dashboards y Business Intelligence",
        tasks: [
          "Visualización de indicadores clave (KPIs) en tiempo real para gerencia comercial y operativa.",
          "Modelado de datos históricos y proyecciones de demanda para abastecimiento y ventas."
        ]
      },
      {
        groupTitle: "Cierre de ciclo y retroalimentación",
        tasks: [
          "Consolidación de hallazgos, ajustes finales requeridos en el sistema y plan de empalme con el equipo contable tras su capacitación con SIIGO."
        ]
      }
    ]
  }
];

const Pruebas = () => {
  const [taskState, setTaskState] = useState<Record<string, { checked: boolean; date: string; notes: string }>>({});
  const [expandedSessions, setExpandedSessions] = useState<number[]>([1, 2, 3, 4]);

  const toggleSession = (sessionNum: number) => {
    setExpandedSessions(prev => 
      prev.includes(sessionNum) ? prev.filter(s => s !== sessionNum) : [...prev, sessionNum]
    );
  };

  const updateTask = (id: string, field: 'checked' | 'date' | 'notes', value: any) => {
    setTaskState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const getTask = (id: string) => {
    return taskState[id] || { checked: false, date: '', notes: '' };
  };

  return (
    <div className="pruebas-container">
      <div className="pruebas-header">
        <h2 className="pruebas-title">Plan de Pruebas y Validación</h2>
        <div className="pruebas-meta-cards">
          <div className="meta-card">
            <h3>Objetivo Principal</h3>
            <p>Validar en entorno de pruebas la parametrización del sistema, evaluar las mejoras y sugerencias implementadas, y verificar la sincronización e interacción práctica con SIIGO antes de la salida en vivo.</p>
          </div>
          <div className="meta-card">
            <h3>Participantes</h3>
            <p>Gerencia Operativa, Gerencia Comercial y Equipo de Arquitectura de Scarpian.</p>
          </div>
        </div>
      </div>

      <div className="sessions-list">
        {testData.map((session, sIndex) => {
          const isExpanded = expandedSessions.includes(session.session);
          
          return (
            <div key={session.session} className="session-card">
              <div className="session-header" onClick={() => toggleSession(session.session)}>
                <div className="session-header-left">
                  <span className="session-badge">Sesión {session.session}</span>
                  <h3>{session.title}</h3>
                </div>
                {isExpanded ? <ChevronUp size={24} color="#64748b" /> : <ChevronDown size={24} color="#64748b" />}
              </div>
              
              {isExpanded && (
                <div className="session-body">
                  <div className="session-focus">
                    <strong>Enfoque:</strong> {session.focus}
                  </div>
                  
                  {session.groups.map((group, gIndex) => (
                    <div key={gIndex} className="task-group">
                      <h4 className="group-title">{group.groupTitle}</h4>
                      <div className="task-list">
                        {group.tasks.map((task, tIndex) => {
                          const taskId = `${session.session}-${gIndex}-${tIndex}`;
                          const state = getTask(taskId);
                          
                          return (
                            <div key={taskId} className={`task-item ${state.checked ? 'completed' : ''}`}>
                              <div className="task-checkbox" onClick={() => updateTask(taskId, 'checked', !state.checked)}>
                                {state.checked ? <CheckCircle2 size={24} color="#16a34a" /> : <Circle size={24} color="#cbd5e1" />}
                              </div>
                              <div className="task-content">
                                <p className="task-text">{task}</p>
                                <div className="task-controls">
                                  <div className="control-group">
                                    <Calendar size={16} color="#64748b" />
                                    <input 
                                      type="date" 
                                      value={state.date}
                                      onChange={(e) => updateTask(taskId, 'date', e.target.value)}
                                      className="task-input date-input"
                                    />
                                  </div>
                                  <div className="control-group notes-group">
                                    <MessageSquare size={16} color="#64748b" />
                                    <input 
                                      type="text" 
                                      placeholder="Agregar notas o resultados..."
                                      value={state.notes}
                                      onChange={(e) => updateTask(taskId, 'notes', e.target.value)}
                                      className="task-input notes-input"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pruebas;

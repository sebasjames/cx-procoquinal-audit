import React from 'react';
import { Network, MonitorPlay, Users, Database, Rocket, ShieldCheck } from 'lucide-react';
import './NextSteps.css';

const stepsData = [
  {
    phase: "Paso 1: Sinergia Contable y Laboratorio",
    icon: <Network size={24} />,
    color: "blue",
    activities: [
      "Establecer la conexión definitiva con Siigo y realizar pruebas integrales en entorno de laboratorio.",
      "Socialización técnica entre Dpto. Contable y Scarpian (pormenores, cambios y roadmap).",
      "Reunión oficial de parametrización contable (Contadora + Scarpian + Representantes de Siigo)."
    ]
  },
  {
    phase: "Paso 2: Infraestructura y Capacitación",
    icon: <Users size={24} />,
    color: "purple",
    activities: [
      "Instalación de equipos físicos de hardware en las 3 sedes.",
      "Jornada de Capacitación de Personal (3 días):",
      "• Presencial Staff: Operaciones + Administrador del Punto.",
      "• Presencial Comercial: Gerente Comercial + Vendedores.",
      "• Virtual: Personal de sedes Barranquilla y Gaitán.",
      "*Nota: El equipo contable no asiste; su inducción se realiza durante el Paso 1.*"
    ]
  },
  {
    phase: "Paso 3: Pruebas y Migración de Datos",
    icon: <Database size={24} />,
    color: "amber",
    activities: [
      "Auditoría y conteo maestro de inventarios físicos.",
      "Cargue inicial en línea a la base de datos de Avalon.",
      "Set de Pruebas de Estrés en entorno real:",
      "• Ventas directas en punto.",
      "• Interfaz de sincronización contable.",
      "• Afectación de inventarios (movimientos positivos y negativos).",
      "• Ciclo de Órdenes de Compra y comportamiento contable."
    ]
  },
  {
    phase: "Paso 4: Despliegue Escalonado (Go-Live)",
    icon: <Rocket size={24} />,
    color: "green",
    activities: [
      "Día 0: Habilitación en Producción Punto Centenario (Inicio oficial operaciones Avalon).",
      "Día 8: Habilitación oficial Punto Gaitán.",
      "Día 16: Instalación, habilitación y entrada a Producción Sede Barranquilla."
    ]
  },
  {
    phase: "Paso 5: Post-Entrega y Seguimiento",
    icon: <ShieldCheck size={24} />,
    color: "slate",
    activities: [
      "Auditoría en tiempo real del comportamiento global del Software.",
      "Calibración y seguimiento de las funcionalidades de Inteligencia Artificial.",
      "Evaluación continua de informes gerenciales y predicciones IA.",
      "Validación de alta transaccionalidad y operatividad de los cajeros/vendedores."
    ]
  }
];

const NextSteps: React.FC = () => {
  return (
    <section className="next-steps-wrapper">
      <div className="next-steps-header">
        <h2>Siguientes Pasos (Roadmap de Cierre)</h2>
        <p>Cronograma estructurado para la recta final de implementación, salida a producción y seguimiento.</p>
      </div>

      <div className="next-steps-table-container">
        <table className="next-steps-table">
          <thead>
            <tr>
              <th className="col-phase">Paso de Ejecución</th>
              <th className="col-activities">Actividades y Hitos Clave</th>
            </tr>
          </thead>
          <tbody>
            {stepsData.map((step, index) => (
              <tr key={index}>
                <td className="phase-cell">
                  <div className={`phase-badge badge-${step.color}`}>
                    <span className="phase-icon">{step.icon}</span>
                    <h3>{step.phase}</h3>
                  </div>
                </td>
                <td className="activities-cell">
                  <ul className="activities-list">
                    {step.activities.map((act, i) => {
                      const isSubitem = act.startsWith('•') || act.startsWith('*');
                      return (
                        <li key={i} className={isSubitem ? 'sub-activity' : 'main-activity'}>
                          {act}
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default NextSteps;

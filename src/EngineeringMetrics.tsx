import React, { useState, useEffect } from 'react';
import { Code, Clock, Users } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './EngineeringMetrics.css';

const AnimatedCounter = ({ end, duration, decimals = 0, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * end);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return <span>{prefix}{formattedCount}{suffix}</span>;
};

const humanHoursData = [
  { name: 'Reuniones & Visitas', value: 55 },
  { name: 'Soporte y Comunicación', value: 85 },
  { name: 'Planeación de Negocio', value: 120 },
  { name: 'UX/UI & Flujos', value: 107 },
];

const techHoursData = [
  { name: 'Desarrollo Core', value: 380 },
  { name: 'Arquitectura DB', value: 120 },
  { name: 'Pruebas & QA', value: 95 },
  { name: 'DevOps & Servidores', value: 65 },
];

const COLORS_HUMAN = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'];
const COLORS_TECH = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

const EngineeringMetrics = () => {
  return (
    <section className="engineering-metrics-wrapper">
      <div className="metrics-header">
        <h2>Métricas de Ingeniería (ROI Tecnológico)</h2>
        <p>Análisis del esfuerzo, tamaño y retorno de inversión del desarrollo</p>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card light-card">
          <div className="metric-icon blue-icon">
            <Code size={36} />
          </div>
          <h3 className="metric-value">
            <AnimatedCounter end={49.9} duration={2500} decimals={1} suffix="k+" />
          </h3>
          <p className="metric-label">Líneas de Código</p>
          <div className="metric-subtext">Lógica pura escrita desde cero en TypeScript y React</div>
        </div>
        
        <div className="metric-card light-card">
          <div className="metric-icon purple-icon">
            <Clock size={36} />
          </div>
          <h3 className="metric-value">
            <AnimatedCounter end={2850} duration={2500} suffix="+" />
          </h3>
          <p className="metric-label">Horas Ahorradas (ROI)</p>
          <div className="metric-subtext">Equivalente al trabajo ininterrumpido de 3 ingenieros Senior por 6 meses</div>
        </div>
        
        <div className="metric-card light-card">
          <div className="metric-icon pink-icon" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', color: '#db2777' }}>
            <Users size={36} />
          </div>
          <h3 className="metric-value">
            <AnimatedCounter end={1027} duration={2500} prefix="~" />
          </h3>
          <p className="metric-label">Horas Humano (Labor)</p>
          <div className="metric-subtext">Esfuerzo equivalente a reuniones, planeación, y meses de ingeniería continua</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h4 className="chart-title">Distribución de Horas Técnicas</h4>
          <p className="chart-subtitle">660 Horas Totales</p>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={techHoursData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {techHoursData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_TECH[index % COLORS_TECH.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} hrs`, name]} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-box">
          <h4 className="chart-title">Distribución de Horas Humanas</h4>
          <p className="chart-subtitle">367 Horas Totales</p>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={humanHoursData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {humanHoursData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_HUMAN[index % COLORS_HUMAN.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} hrs`, name]} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringMetrics;

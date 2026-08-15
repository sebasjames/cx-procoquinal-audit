import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, XCircle, AlertTriangle, Users, DollarSign, Flag } from 'lucide-react';
import './CalendarCarousel.css';

// monthIndex is 0-based for JS Date. Feb = 1, Dec = 11
const monthData = [
  { name: 'Febrero', year: 2026, monthIndex: 1 },
  { name: 'Marzo', year: 2026, monthIndex: 2 },
  { name: 'Abril', year: 2026, monthIndex: 3 },
  { name: 'Mayo', year: 2026, monthIndex: 4 },
  { name: 'Junio', year: 2026, monthIndex: 5 },
  { name: 'Julio', year: 2026, monthIndex: 6 },
  { name: 'Agosto', year: 2026, monthIndex: 7 },
  { name: 'Septiembre', year: 2026, monthIndex: 8 },
  { name: 'Octubre', year: 2026, monthIndex: 9 },
  { name: 'Noviembre', year: 2026, monthIndex: 10 },
  { name: 'Diciembre', year: 2026, monthIndex: 11 },
];

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const projectEvents = [
  { date: "2026-03-18", type: "cancelled", title: "Arranque Pausado", description: "Se aplazó el arranque porque Sebastián estaba enfermo (viral)." },
  { date: "2026-03-19", type: "meeting", title: "Reunión de Inicio", description: "Reunión de inicio (Meet)." },
  { date: "2026-03-25", type: "meeting", title: "Reunión de Seguimiento", description: "Se efectúa la reunión agendada del equipo mediante Meet a las 3:00 PM." },
  { date: "2026-03-27", type: "meeting", title: "Capacitación SIIGO", description: "Capacitación virtual a las 11:15 AM. Hubo inconvenientes de registro con Ingrid." },
  { date: "2026-03-30", type: "meeting", title: "Visita Presencial", description: "Llegada de Omar a la empresa para revisar avances." },
  { date: "2026-03-31", type: "milestone", title: "Entrega Lectores", description: "Llegada de los primeros lectores de código de barras (3 cajas y 3 internos)." },
  { date: "2026-04-20", type: "meeting", title: "Avance Virtual", description: "La reunión virtual se llevó a cabo a las 10:15 a. m. a través de Google Meet (meet.google.com/uay-dkfm-mgm)." },
  { date: "2026-04-21", type: "milestone", title: "Actualización de Catálogo", description: "Subida del catálogo (1.500 - 3.000 SKUs) por bloques para garantizar exactitud." },
  { date: "2026-05-05", type: "payment", title: "Facturación", description: "Facturación enviada (división 70% y 30%)." },
  { date: "2026-05-06", type: "meeting", title: "Reunión de Seguimiento", description: "Reunión virtual a las 4:00 PM. Se propone cena post-feria." },
  { date: "2026-05-18", type: "milestone", title: "Entrega física de equipos", description: "Sebastián asistió presencialmente a las instalaciones para entregar una máquina térmica de impresión de referencias con su respectivo ticket de entrega." },
  { date: "2026-05-18", type: "meeting", title: "Reunión Presencial", description: "Se lleva a cabo la reunión a las 10:30 AM en oficinas Procoquinal Centenario." },
  { date: "2026-05-21", type: "cancelled", title: "Reprogramación de Reunión de Avance", description: "Ocurrió el intercambio donde Andrés comentó que tenía una cita a las 11:00 a. m. y se la cancelaron 15 minutos antes, reprogramándose la sesión debido a los compromisos del equipo y la asistente de Luis Carlos." },
  { date: "2026-05-22", type: "meeting", title: "Reunión Inventario", description: "Reunión virtual con Lizeth a las 11:00 AM para optimización de inventario." },
  { date: "2026-05-28", type: "payment", title: "Pago Exitoso", description: "Se concretó y confirmó el pago exitoso en la plataforma tras superar los inconvenientes bancarios con la tarjeta ('Casi que no, ya se pudo')." },
  { date: "2026-06-02", type: "cancelled", title: "Reprogramación por Calamidad", description: "Luis Carlos solicita aplazar la reunión debido a que Lizeth se encuentra en la clínica con su hija." },
  { date: "2026-06-03", type: "cancelled", title: "Reprogramación", description: "Sebastián solicita mover la reunión debido a compromisos institucionales extensos." },
  { date: "2026-06-09", type: "meeting", title: "Reunión Consultoría", description: "Reunión con Family Firm Consulting. Soporte técnico de Avalon por la tarde." },
  { date: "2026-06-11", type: "meeting", title: "Sesión Inventario", description: "Sesión de trabajo intensiva para dejar el inventario a punto con Lizeth." },
  { date: "2026-06-12", type: "meeting", title: "Sesión Contable", description: "Primera sesión formal de trabajo contable con Ingrid Gómez." },
  { date: "2026-06-16", type: "cancelled", title: "Pausa Solicitada (Procoquinal)", description: "Luis Carlos informa agenda de viajes en Armenia." },
  { date: "2026-06-18", type: "cancelled", title: "Reprogramación", description: "Se postergan las revisiones conjuntas con Lizeth e Ingrid para el día viernes." },
  { date: "2026-06-22", type: "meeting", title: "Reunión de Avance", description: "Sesión de seguimiento a las 11:00 AM para evaluar plataforma web." },
  { date: "2026-06-24", type: "meeting", title: "Reunión Contable", description: "Espacio virtual a las 9:00 AM para revisar módulo contable con Ingrid." },
  { date: "2026-07-03", type: "payment", title: "Pago Final", description: "Se resolvió dividiendo en USD 3,450 vía link y enviando USD 480 por 'Amigo Littio'." },
  { date: "2026-07-14", type: "meeting", title: "Reunión de Avance & Entrega Excel", description: "Sebastián compartió y entregó al chat el archivo con la auditoría de inventario (Auditoria_Inventario_2026-07-14Sebas.xlsx) a la 1:28 p. m." },
  { date: "2026-07-16", type: "meeting", title: "Reunión CRM", description: "Revisión del módulo comercial y CRM con Omar Valderrama." },
  { date: "2026-07-24", type: "meeting", title: "Reunión Contable", description: "Reunión con Ingrid a las 3:00 PM para testear avances del sistema." },
  { date: "2026-07-29", type: "cancelled", title: "Fallecimiento madre de Ingrid", description: "Luis Carlos informó la lamentable noticia a las 12:45 p. m., indicando que Ingrid estaría atendiendo su calamidad personal." },
  { date: "2026-08-04", type: "cancelled", title: "Reprogramación General (Día Procoquinal)", description: "Sebastián cancela reunión por citación imprevista de Siigo. Se reprograma todo para el jueves." },
  { date: "2026-08-06", type: "meeting", title: "Sesión Tardía", description: "Retraso de 20 min por fallas de internet. Reunión desplazada a las 12:00 PM." },
  { date: "2026-08-11", type: "meeting", title: "Sincronización General", description: "Evaluación de la base de datos maestra limpia con 5.881 clientes." },
  { date: "2026-08-12", type: "meeting", title: "Revisión OCR Pedidos", description: "Evaluación de la automatización OCR para órdenes de compra." },
  { date: "2026-08-13", type: "meeting", title: "Llamado de Atención", description: "Omar y Luis Carlos solicitan cronograma tipo Gantt y mayor formalidad." },
  { date: "2026-08-14", type: "milestone", title: "Emisión de Informe", description: "Scarpian emite respuesta formal detallando metodología y avances del proyecto." }
];

const blockPeriods = [
  { start: "2026-05-13", end: "2026-05-16", title: "Feria (Corferias)", description: "Procoquinal en feria. Disponibilidad reducida para revisiones.", color: "#fef08a" },
  { start: "2026-06-16", end: "2026-07-05", title: "Pausa Solicitada (Procoquinal)", description: "Viaje de Luis K (Armenia/Bquilla) y Vacaciones de Omar.", color: "#fed7aa" },
  { start: "2026-06-21", end: "2026-06-30", title: "Salud Familiar (Ingrid)", description: "La madre de Ingrid (Contadora) enferma. Dificultades para cuadrar reuniones.", color: "#fca5a5" },
  { start: "2026-07-29", end: "2026-08-05", title: "Fuerza Mayor Contable", description: "Fallecimiento de la madre de la contadora (Ingrid). Pausa obligada por luto.", color: "#fca5a5" }
];

const isDateInPeriod = (dateStr: string, start: string, end: string) => {
  return dateStr >= start && dateStr <= end;
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'payment': return '#10b981'; // Green
    case 'milestone': return '#8b5cf6'; // Purple
    case 'meeting': return '#3b82f6'; // Blue
    case 'cancelled': return '#ef4444'; // Red
    default: return '#6b7280';
  }
}

const getEventIcon = (type: string, size = 16) => {
  switch (type) {
    case 'payment': return <DollarSign size={size} />;
    case 'milestone': return <Flag size={size} />;
    case 'meeting': return <Users size={size} />;
    case 'cancelled': return <XCircle size={size} />;
    case 'block': return <AlertTriangle size={size} />;
    default: return null;
  }
}

const generateCalendarGrid = (year: number, monthIndex: number) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const grid = [];
  // Empty cells for days before the 1st
  for (let i = 0; i < startDay; i++) {
    grid.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(i);
  }
  return grid;
};

const CalendarCarousel = () => {
  // Empezar en Mayo (index 3) o Junio para que se vean eventos
  const [activeIndex, setActiveIndex] = useState(3);

  const handleNext = () => {
    setActiveIndex((prev) => (prev < monthData.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <h2>Bitácora Forense del Proyecto</h2>
        <p>Historial detallado de reuniones, pagos, hitos y ausencias prolongadas extraído del Event Log.</p>
        
        <div className="legend-container">
          <span className="legend-item"><Users size={16} color="#3b82f6" style={{marginRight: 6}}/> Reuniones</span>
          <span className="legend-item"><DollarSign size={16} color="#10b981" style={{marginRight: 6}}/> Pagos</span>
          <span className="legend-item"><Flag size={16} color="#8b5cf6" style={{marginRight: 6}}/> Hitos</span>
          <span className="legend-item"><XCircle size={16} color="#ef4444" style={{marginRight: 6}}/> Canceladas</span>
          <span className="legend-item"><AlertTriangle size={16} color="#f59e0b" style={{marginRight: 6}}/> Bloqueos de Agenda</span>
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-btn" onClick={handlePrev} disabled={activeIndex === 0}>
          <ChevronLeft size={32} />
        </button>

        <div className="carousel-track">
          {monthData.map((data, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            
            // Adjust physics for wider, full-page cards
            const scale = 1 - absOffset * 0.05; // Less scaling down so they stay large
            const translateX = offset * 450; // Larger distance to accommodate 1000px width
            const zIndex = 10 - absOffset;
            const opacity = absOffset > 1 ? 0.3 : 1; // Only show immediate neighbors semi-transparently
            
            const grid = generateCalendarGrid(data.year, data.monthIndex);

            return (
              <div
                key={data.name}
                className={`carousel-card ${offset === 0 ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  pointerEvents: absOffset > 2 ? 'none' : 'auto'
                }}
              >
                <div className="card-content">
                  <div className="card-header-cal">
                    <span className="card-month">{data.name}</span>
                    <span className="card-year">{data.year}</span>
                  </div>
                  
                  <div className="calendar-grid">
                    {daysOfWeek.map(day => (
                      <div key={day} className="cal-day-name">{day}</div>
                    ))}
                    {grid.map((dayNum, i) => {
                      let dayEvents: any[] = [];
                      let matchedPeriods: any[] = [];

                      if (dayNum) {
                        const dateString = `${data.year}-${(data.monthIndex + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
                        dayEvents = projectEvents.filter(e => e.date === dateString);
                        matchedPeriods = blockPeriods.filter(p => isDateInPeriod(dateString, p.start, p.end));
                      }

                      const combinedTooltipEvents = [
                        ...dayEvents,
                        ...matchedPeriods.map(p => ({ type: 'block', title: `Bloqueo: ${p.title}`, description: p.description }))
                      ];

                      const cellStyle = matchedPeriods.length > 0 
                        ? { backgroundColor: matchedPeriods[matchedPeriods.length - 1].color, borderColor: 'rgba(0,0,0,0.1)' } 
                        : {};

                      return (
                        <div 
                          key={i} 
                          className={`cal-day-cell ${dayNum ? 'has-date' : 'empty'} ${dayEvents.length > 0 ? 'has-events' : ''} ${matchedPeriods.length > 0 ? 'is-blocked' : ''}`}
                          style={cellStyle}
                        >
                          {dayNum && (
                            <div className="day-content">
                              <span className="day-number">{dayNum}</span>
                              {dayEvents.length > 0 && (
                                <div className="event-markers">
                                  {dayEvents.map((evt, idx) => (
                                    <div key={idx} className="event-icon" style={{ color: getEventColor(evt.type) }} title={evt.title}>
                                      {getEventIcon(evt.type, 14)}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {combinedTooltipEvents.length > 0 && (
                                <div className="event-tooltip">
                                  {combinedTooltipEvents.map((evt: any, idx: number) => (
                                    <div key={idx} className="tooltip-item">
                                      <strong style={{ 
                                        color: evt.type === 'block' ? '#b45309' : getEventColor(evt.type),
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '6px'
                                      }}>
                                        {getEventIcon(evt.type, 16)} {evt.title}
                                      </strong>
                                      <p>{evt.description}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-btn" onClick={handleNext} disabled={activeIndex === monthData.length - 1}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default CalendarCarousel;
